import Header from './Header'
import Footer from './Footer'
import React, { useState, useEffect, useRef } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { 
    InfoCircleOutlined,
    PlusOutlined,
    MinusCircleOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Radio, Tag } from 'antd';
import { Space, Table, ConfigProvider, message, DatePicker, Upload } from 'antd';
import { Col, Drawer, Modal, Row, Image, Select, Popconfirm } from 'antd';

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

function RMMECRegister(){
    //UPLOAD HANDLING COMPONENTS
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [applicantImage, setApplicantImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [requiredMark, setRequiredMarkType] = useState('customize');
    // const [form] = Form.useForm();
    const [formData, setFormData] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        birthplace: '',
        dateOfBirth: null,
        height: '',
        weight: '',
        civil_status: '',
        citizenship: '',
        religion: '',
        bloodType: '',
        street_number: '',
        barangay: '',
        municipality: '',
        province: '',
        zip_code: '',
        cellphone_number: '',
        telephone_number: '',
        email: '',
        name_of_company: '',
        position: '',
        office_address: '',
        business_telephone_number: '',
        fax_number: '',
        spouse_name: '',
        spouse_date_of_birth: null,
        spouse_age: '',
        name_of_children: [],
        attended_elementary: '',
        year_graduated_elementary: null,
        attended_hs: '',
        year_graduated_hs: null,
        attended_college: '',
        year_graduated_college: null,
        course: '',
        hobbies: '',
        special_skills: '',
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
            // const values = await formRef.current.validateFields();
            const Formdata = new FormData();
            Formdata.append('firstname', formData.firstname);
            Formdata.append('middlename', formData.middlename);
            Formdata.append('lastname', formData.lastname);
            Formdata.append('email', formData.email);
            Formdata.append('number', formData.cellphone_number);
            Formdata.append('application_file', pdfBlob);
            Formdata.append('club_id', 1);

            // Perform API call
            const response = await fetch(`http://127.0.0.1:8000/api/addApplication`, {
                method: 'POST',
                body: Formdata,
            });
    
            const data = await response.json();

            saveAs(pdfBlob, `${formData.lastname}_Application_File`);

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
            // setPreviewImage(base64);
            setApplicantImage(base64);
        }
    }

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
    });

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
            const existingPdfBytes = await fetch('MagitingLaguna_EAGLES.pdf').then((res) => res.arrayBuffer());
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

            // Draw the image at a specific location on the page (e.g., top-right corner)
            firstPage.drawImage(image, {
                x: 437,
                y: 715,
                width: 2 * 72, // 2 inches in points (1 inch = 72 points)
                height: 2 * 72,
            });
    
            // Populate PDF form fields
            form.getTextField('first_name').setText(data.firstname);
            form.getTextField('nickname').setText(data.nickname);
            form.getTextField('middle_name').setText(data.middlename);
            form.getTextField('last_name').setText(data.lastname);
            form.getTextField('birthplace').setText(data.birthplace);
        
            // Example for date fields, adjust as per your DatePicker implementation
            if (data.dateOfBirth) {
                form.getTextField('birthdate').setText(data.dateOfBirth.format('MM/DD/YYYY'));
            }

            form.getTextField('height').setText(data.height);
            form.getTextField('weight').setText(data.weight);
        
            // Handle Radio.Group field
            form.getRadioGroup('civil_status').select(data.civil_status);
        
            form.getTextField('citizenship').setText(data.citizenship);
            form.getTextField('religion').setText(data.religion);
            form.getTextField('blood_type').setText(data.bloodType);
        
            form.getTextField('street_number').setText(data.street_number);
            form.getTextField('barangay').setText(data.barangay);
            form.getTextField('municipality').setText(data.municipality);
            form.getTextField('province').setText(data.province);
            form.getTextField('zip_code').setText(data.zip_code);
            form.getTextField('cellphone_number').setText(data.cellphone_number);
            form.getTextField('telephone_number').setText(data.telephone_number);
            form.getTextField('email').setText(data.email);
            form.getTextField('name_of_company').setText(data.name_of_company);
            form.getTextField('position').setText(data.position);
            form.getTextField('company_address').setText(data.office_address);
            form.getTextField('company_telephone_number').setText(data.business_telephone_number);
            form.getTextField('fax_number').setText(data.fax_number);
            form.getTextField('spouse_name').setText(data.spouse_name);
            if (data.spouse_date_of_birth) {
                form.getTextField('spouse_birthdate').setText(data.spouse_date_of_birth.format('MM/DD/YYYY'));
            }
            form.getTextField('spouse_age').setText(data.spouse_age);
        
            const maxDependents = 6;
            for (let i = 0; i < maxDependents; i++) {
                const nameField = form.getTextField(`dependent${i + 1}_name`);
                const birthdateField = form.getTextField(`dependent${i + 1}_birthdate`);
                const ageField = form.getTextField(`dependent${i + 1}_age`);
                
                if (data.name_of_children && data.name_of_children[i]) {
                    const child = data.name_of_children[i];
                    nameField.setText(child.name_of_dependent || '');
                    birthdateField.setText(child.birth_date_of_dependent ? child.birth_date_of_dependent.format('MM/DD/YYYY') : '');
                    ageField.setText(child.age_of_dependent || '');
                } else {
                    nameField.setText('');
                    birthdateField.setText('');
                    ageField.setText('');
                }
            }
    
            // Handle educational attainment fields
            form.getTextField('elementary').setText(data.attended_elementary);
            if (data.year_graduated_elementary) {
                form.getTextField('elementary_year').setText(data.year_graduated_elementary.format('YYYY'));
            }
            form.getTextField('high_school').setText(data.attended_hs);
            if (data.year_graduated_hs) {
                form.getTextField('hs_year').setText(data.year_graduated_hs.format('YYYY'));
            }
            form.getTextField('college').setText(data.attended_college);
            if (data.year_graduated_college) {
                form.getTextField('college_year').setText(data.year_graduated_college.format('YYYY'));
            }
            form.getTextField('course').setText(data.course);
            form.getTextField('hobbies').setText(data.hobbies);
            form.getTextField('special_skills').setText(data.special_skills);
        
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
                        <h1 className='register-text-title'>REGISTRATION</h1>
                        <h4 className='register-sub-title'>Fill out the form below to become an aspirant.</h4>
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
                                        name="nickname"
                                        label="Nickname"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your nickname',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your nickname" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="middlename"
                                        label="Middle name"
                                        rules={[
                                            {
                                            required: true,
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
                                        name="birthplace"
                                        label="Birthplace"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your birthplace',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your birthplace" />
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
                                                required: true,
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
                                                required: true,
                                                message: 'Please enter your weight in kilograms',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your weight" />
                                    </Form.Item>

                                    <Form.Item 
                                        className='form-item-snap-1'
                                        tooltip="This is a required field"
                                        label="Civil Status"
                                        name="civil_status"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please select your current civil status',
                                            },
                                        ]}
                                    >
                                        <Radio.Group>
                                        <Radio.Button value="single">Single</Radio.Button>
                                        <Radio.Button value="married">Married</Radio.Button>
                                        <Radio.Button value="separated">Separated</Radio.Button>
                                        <Radio.Button value="widowed">Widowed</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="citizenship"
                                        label="Citizenship"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your citizenship',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your citizenship" />
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
                                </div>
                                <br></br>
                                <h3>Address</h3>
                                <div className='form-snap-2'>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="street_number"
                                        label="Street Number"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your street number',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your street number" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="barangay"
                                        label="Barangay"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your barangay',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your barangay" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="municipality"
                                        label="Municipality/City"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your municipality/city',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your municipality/city" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="province"
                                        label="Province"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your province',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your province" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="zip_code"
                                        label="Zip Code"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your zip code',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your zip code" />
                                    </Form.Item>
                                </div>
                                <br></br>
                                <h3>Contact Information</h3>
                                <div className='form-snap-2'>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="cellphone_number"
                                        label="Cellphone Number"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your cell number',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your cell number" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="telephone_number"
                                        label="Telephone Number"
                                        rules={[
                                            {
                                            required: false,
                                            message: 'Please enter your telephone number',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your telephone number" />
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
                                <h3>Employment/Profession</h3>
                                <div className='form-snap-2'>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="name_of_company"
                                        label="Name of Office Line of Business"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your name of business',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your name of business" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="position"
                                        label="Position/Designation"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your title/designation',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your title/designation" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="office_address"
                                        label="Address"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter office address',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter office address" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="business_telephone_number"
                                        label="Telephone Number"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter business telephone number',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter business telephone number" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="fax_number"
                                        label="Fax Number"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter fax number',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter fax number" />
                                    </Form.Item>
                                </div>
                                <br></br>

                                <h3>List of Legal Dependents</h3>
                                <div className='form-snap-2'>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="spouse_name"
                                        label="Name of Spouse"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the name fo your spouse.',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the name of your spouse." />
                                    </Form.Item>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="spouse_date_of_birth"
                                        label="Spouse's Date of Birth"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your spouse\'s date of birth',
                                            },
                                        ]}
                                    >
                                        <DatePicker onChange={dateOfBirthOnChange} />
                                    </Form.Item>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="spouse_age"
                                        label="Age of Spouse"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the age of your spouse.',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the age of your spouse." />
                                    </Form.Item>
                                </div>
                                
                                <Form.List name="name_of_children">
                                    {(fields, { add, remove }) => (
                                        <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space
                                            key={key}
                                            style={{
                                                display: 'flex',
                                                marginBottom: 8,
                                            }}
                                            align="baseline"
                                            >
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'name_of_dependent']}
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing name',
                                                },
                                                ]}
                                            >
                                                <Input placeholder="Name" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'birth_date_of_dependent']}
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing date of birth',
                                                },
                                                ]}
                                            >
                                                <DatePicker onChange={dateOfBirthOnChange} />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'age_of_dependent']}
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing age',
                                                },
                                                ]}
                                            >
                                                <Input placeholder="Age" />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add field
                                            </Button>
                                        </Form.Item>
                                        </>
                                    )}
                                    </Form.List>
                                <br></br>

                                <h3>Educational Attainment</h3>
                                <div className='form-snap-2'>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="attended_elementary"
                                        label="Elementary"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the name of attended elementary school',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the name of attended elementary school" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="year_graduated_elementary"
                                        label="Year Graduated"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the year you graduated (elementary',
                                            },
                                        ]}
                                    >
                                        <DatePicker onChange={dateOfBirthOnChange} picker="year" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="attended_hs"
                                        label="High School"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the name of attended high school',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the name of attended high school" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="year_graduated_hs"
                                        label="Year Graduated"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the year you graduated (high school',
                                            },
                                        ]}
                                    >
                                        <DatePicker onChange={dateOfBirthOnChange} picker="year" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="attended_college"
                                        label="College"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the name of attended college',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the name of attended college" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="year_graduated_college"
                                        label="Year Graduated"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the year you graduated (college)',
                                            },
                                        ]}
                                    >
                                        <DatePicker onChange={dateOfBirthOnChange} picker="year" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="course"
                                        label="Course"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the name of your college course',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the name of your college course" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="hobbies"
                                        label="Hobbies"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your hobbies',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your hobbies" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="special_skills"
                                        label="Special Skills"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your special skills',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your special skills" />
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

export default RMMECRegister;