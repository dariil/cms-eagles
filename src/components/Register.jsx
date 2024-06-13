import Header from './Header'
import Footer from './Footer'
import React, { useState, useEffect, useRef } from 'react';
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

function Register(){
    //UPLOAD HANDLING COMPONENTS
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [requiredMark, setRequiredMarkType] = useState('customize');

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

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
                                        <Radio.Button value>Single</Radio.Button>
                                        <Radio.Button value="optional">Married</Radio.Button>
                                        <Radio.Button value={false}>Separated</Radio.Button>
                                        <Radio.Button value="customize">Widowed</Radio.Button>
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
                                                <Input placeholder="Birthdate" />
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
                                        name="Special Skills"
                                        label="special_skills"
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
                                <Button htmlType='submit' type="primary" >
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

export default Register;