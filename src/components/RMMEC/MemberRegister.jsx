import Header from './Header'
import Footer from './Footer'
import React, { useState, useRef } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { 
    PlusOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Radio, Tag } from 'antd';
import { message, DatePicker, Upload } from 'antd';
import { Col, Row, Image} from 'antd';

// HANDLE IMAGE PREVIEW
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

const customizeRequiredMark = (label, { required }) => (
    <>
        {required ? <Tag color="warning">Required</Tag> : <Tag color="orange">Optional</Tag>}
        {label}
    </>
);

function RMMECMemberRegister(){
    //UPLOAD HANDLING COMPONENTS
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [applicantImage, setApplicantImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [requiredMark, setRequiredMarkType] = useState('customize');

    const [formData, setFormData] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        dateOfBirth: null,
        height: '',
        weight: '',
        religion: '',
        bloodType: '',
        sss_num: '',
        philhealth_num: '',
        pagibig_num: '',
        tin_num: '',
        complete_address: '',
        cellphone_number: '',
        email: '',
        name_of_contact_person: '',
        number_of_contact_person: '',
        club_region: '',
        chartered_governor: '',
        member_control_number: '',
        position: '',
    });
    const formRef = useRef(null);

    const handleInputChange = (changedValues) => {
        setFormData((prevData) => ({
          ...prevData,
          ...changedValues,
        }));
    };

    const handleFinish = async (values) => {
        try {
            const pdfBytes = await generatePDF(values, applicantImage);
            const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
            const Formdata = new FormData();
            Formdata.append('firstname', formData.firstname);
            Formdata.append('middlename', formData.middlename);
            Formdata.append('lastname', formData.lastname);
            Formdata.append('email', formData.email);
            Formdata.append('number', formData.cellphone_number);
            Formdata.append('application_file', pdfBlob);
            Formdata.append('club_id', "CLB-000002");
            Formdata.append('position', formData.position);

            // Perform API call
            const response = await fetch(`http://127.0.0.1:8000/api/addMemberApplication`, {
                method: 'POST',
                body: Formdata,
            });
    
            const data = await response.json();

            saveAs(pdfBlob, `KUYA_${formData.lastname}_MEMBER_FORM`);

            if (response.ok) {
                message.success(data.messages.message);
                formRef.current.resetFields();
                setFileList([]);
            } else {
                message.error(data.messages.message);
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
            message.error('Failed to generate PDF.');
        }
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    
    const handleChange = async ({ fileList: newFileList }) => {
        setFileList(newFileList);

        if (newFileList.length > 0) {
            const file = newFileList[0].originFileObj;
            const base64 = await getBase64(file);
            setApplicantImage(base64);
        }
    }

    const uploadButton = (
        <button
          style={{
            border: 0,
            background: 'none',
          }}
          type="button"
        >
          <PlusOutlined />
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </button>
      );

    const dateOfBirthOnChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const generatePDF = async (data, imageBase64) => {
        try {
            const existingPdfBytes = await fetch('../Member_Form.pdf').then((res) => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const form = pdfDoc.getForm();
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];

            let image;
            if (imageBase64.startsWith('data:image/png')) {
                
            } else if (imageBase64.startsWith('data:image/jpeg') || imageBase64.startsWith('data:image/jpg')) {
                image = await pdfDoc.embedJpg(imageBase64);
            } else {
                throw new Error('Unsupported image format');
            }

            const pngDims = image.scale(1);

            firstPage.drawImage(image, {
                x: 230,
                y: 485,
                width: 2 * 72, // 2 inches in points (1 inch = 72 points)
                height: 2 * 72,
            });
    
            // Populate PDF form fields
            form.getTextField('first_name').setText(data.firstname);
            if(data.middlename){
                form.getTextField('middle_name').setText(data.middlename);
            }
            form.getTextField('last_name').setText(data.lastname);
        
            // Example for date fields, adjust as per your DatePicker implementation
            if (data.dateOfBirth) {
                form.getTextField('date_of_birth').setText(data.dateOfBirth.format('MM/DD/YYYY'));
            }

            if(data.height){
                form.getTextField('height').setText(data.height);
            }

            if(data.weight){
                form.getTextField('weight').setText(data.weight);
            }
        
            // Handle Radio.Group field
            form.getTextField('religion').setText(data.religion);

            if(data.bloodType){
                form.getTextField('blood_type').setText(data.bloodType);
            }
        
            form.getTextField('address').setText(data.complete_address);
            form.getTextField('contact_number').setText(data.cellphone_number);
            form.getTextField('name_icoe').setText(data.name_of_contact_person);
            form.getTextField('contact_num_icoe').setText(data.number_of_contact_person);

            if(data.sss_num){
                form.getTextField('sss_number').setText(data.sss_num);
            }

            if(data.philhealth_num){
                form.getTextField('philhealth_number').setText(data.philhealth_num);
            }

            if(data.pagibig_num){
                form.getTextField('pagibig_number').setText(data.pagibig_num);
            }

            if(data.tin_num){
                form.getTextField('tin_number').setText(data.tin_num);
            }
            
            form.getTextField('region').setText(data.club_region);
            form.getTextField('chartered_governor_name').setText(data.chartered_governor);
            form.getTextField('member_control_number').setText(data.member_control_number);
            form.getTextField('position').setText(data.position);
            const currentYear = new Date().getFullYear();
            form.getTextField('chartered_governor_ey').setText(currentYear.toString());
        
            // Save PDF and return bytes
            const pdfBytes = await pdfDoc.save();
            return pdfBytes;
        } catch (error) {
            console.error('Error generating PDF:', error);
            throw error;
        }
    };

    return(
        <>
            <Header />
                <div className='about-main-container'> 
                    <div className='register-texts'>
                        <h1 className='register-text-title'>MEMBER REGISTRATION FORM</h1>
                        <h4 className='register-sub-title'>Fill out the form below to...</h4>
                    </div>
                    <br />
                    <hr />
                    <br />  
                    <Form layout="vertical"
                        initialValues={{
                            requiredMarkValue: requiredMark,
                          }}
                        requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}  
                        onFinish={handleFinish}
                        onValuesChange={handleInputChange}
                        ref={formRef}
                    >
                        <div className='register-formfields-main-container'>
                            <Col span={24}>
                                <h3>Personal Information</h3>
                                <br></br>
                                <div className='form-snap-2'>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="firstname"
                                        label="First name"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your first name',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your first name" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="middlename"
                                        label="Middle name"
                                        rules={[
                                            {
                                            required: false,
                                            message: 'Please enter your middle name',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your middle name" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="lastname"
                                        label="Last name"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your last name',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your last name" />
                                    </Form.Item>
                                    
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="dateOfBirth"
                                        label="Date of Birth"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your date of birth',
                                            },
                                        ]}
                                    >
                                        <DatePicker onChange={dateOfBirthOnChange} />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="height"
                                        label="Height"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please enter your height in feet',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your height" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="weight"
                                        label="Weight"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please enter your weight in kilograms',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your weight" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="religion"
                                        label="Religion"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your religion',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your religion" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="bloodType"
                                        label="Blood Type"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please enter your blood type',
                                            },
                                        ]}
                                    >
                                        <Radio.Group>
                                            <Radio.Button value="O-">O-</Radio.Button>
                                            <Radio.Button value="O+">O+</Radio.Button>
                                            <Radio.Button value="A-">A-</Radio.Button>
                                            <Radio.Button value="A+">A+</Radio.Button>
                                            <Radio.Button value="B+">B+</Radio.Button>
                                            <Radio.Button value="B-">B-</Radio.Button>
                                            <Radio.Button value="AB-">AB-</Radio.Button>
                                            <Radio.Button value="AB+">AB+</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="sss_num"
                                        label="GSIS/SSS"
                                        rules={[
                                            {
                                            required: false,
                                            message: 'Please enter your GSIS/SSS',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your GSIS/SSS" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="philhealth_num"
                                        label="PhilHealth"
                                        rules={[
                                            {
                                            required: false,
                                            message: 'Please enter your PhilHealth',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your PhilHealth" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="pagibig_num"
                                        label="PAG-IBIG"
                                        rules={[
                                            {
                                            required: false,
                                            message: 'Please enter your PAG-IBIG',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your PAG-IBIG" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="tin_num"
                                        label="Tin"
                                        rules={[
                                            {
                                            required: false,
                                            message: 'Please enter your Tin',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your PAG-IBIG" />
                                    </Form.Item>
                                </div>
                                <br></br>
                                <h3>Address</h3>
                                <div className='form-snap-2'>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="complete_address"
                                        label="Complete Address"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your complete address',
                                            },
                                        ]}
                                    >
                                        <Input name="complete_address" placeholder="Enter your complete address" />
                                    </Form.Item>

                                </div>
                                <br></br>
                                <h3>Contact Information</h3>
                                <div className='form-snap-2'>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="cellphone_number"
                                        label="Mobile Number"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your mobile number',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your mobile number" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="email"
                                        label="Email"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your email',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your email" />
                                    </Form.Item>
                                </div>
                                <br></br>
                                
                                <h3>Contact Person In Case of Emergency</h3>
                                <div className='form-snap-2'>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="name_of_contact_person"
                                        label="Name of contact person"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the name of contact person',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the name of contact person." />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="number_of_contact_person"
                                        label="Mobile Number"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the number of contact person',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the number of contact person" />
                                    </Form.Item>
                                </div>
                                <br></br>

                                <h3>Other Club Information</h3>
                                <div className='form-snap-2'>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="club_region"
                                        label="Club Region"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the region of club you belong to.',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the region of club you belong to." />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="chartered_governor"
                                        label="Chartered Governor"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the name of your club\'s chartered governor.',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the name of your club\'s chartered governor." />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="member_control_number"
                                        label="Member Control Number"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your control number.',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter enter your control number." />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="position"
                                        label="Position"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your position.',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter enter your position." />
                                    </Form.Item>
                                </div>
                                <br></br>

                                <Form.Item
                                name={"2_by_2"}
                                valuePropName='fileList'
                                getValueFromEvent={(event)=>{
                                    return event?.fileList;
                                }}
                                label="2x2 Picture"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please upload an image',
                                    },
                                    {
                                    validator(_,fileList){
                                        return new Promise((resolve, reject) =>{
                                        if(fileList && fileList[0].size > 900000){
                                            reject('File size exceeded the accepted limit');
                                        } else{
                                            resolve("Success");
                                        }
                                        });
                                    }
                                    }
                                ]}
                                >
                                <Upload
                                    maxCount={1}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    beforeUpload={(file) => {
                                    return new Promise((resolve, reject) => {
                                        if (file.size > 900000) {
                                        reject('File size exceeded the accepted limit');
                                        } else {
                                        resolve();
                                        }
                                    });
                                    }}
                                    customRequest={({ file, onSuccess }) => {
                                    // Call handleChange to update fileList state
                                    handleChange({ file });

                                    // Call onSuccess to inform Ant Design that upload is successful
                                    onSuccess();
                                    }}
                                >
                                    {uploadButton}
                                </Upload>
                                </Form.Item>
                                {previewImage && (
                                    <Image
                                    wrapperStyle={{
                                        display: 'none',
                                    }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                    />
                                )}
                            </Col>
                            <Row gutter={16} className=''>
                                <Col span={12}>
                                <Button htmlType='submit' type="primary">
                                    Register
                                </Button>
                                </Col>
                                <Col span={12}>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </div>
            <Footer />
        </>
    )
}

export default RMMECMemberRegister;