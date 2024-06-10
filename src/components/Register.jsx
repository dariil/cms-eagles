import Header from './Header'
import Footer from './Footer'
import React, { useState, useEffect, useRef } from 'react';
import { 
    InfoCircleOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Radio, Tag } from 'antd';
import { Space, Table, ConfigProvider, message, Upload } from 'antd';
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
        {required ? <Tag color="warning">Required</Tag> : <Tag color="warning">optional</Tag>}
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
                                <h3>Name</h3>
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
                                </div>
                                <br></br>
                                <div className='form-cat-snap-2'>
                                    <div className='form-cat-item-snap-1'>
                                        <h3>Place of Birth</h3>
                                        <br></br>
                                        <div className='form-snap-2'>
                                            <Form.Item
                                            tooltip="This is a required field"
                                            className='form-item-snap-2'
                                            name="birthplace"
                                            label="Birthplace"
                                            rules={[
                                                {
                                                required: true,
                                                message: 'Please enter your birthplace',
                                                },
                                            ]}
                                            >
                                                <Input name="title" placeholder="Enter your borthplace" />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className='form-cat-item-snap-1'>
                                        <h3>Civil Status</h3>
                                        <br></br>
                                        <div className='form-snap-2'>
                                        <Form.Item 
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
                                        </div>
                                    </div>
                                </div>
                                <Form.Item
                                name={"image"}
                                valuePropName='fileList'
                                getValueFromEvent={(event)=>{
                                    return event?.fileList;
                                }}
                                label="Image"
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