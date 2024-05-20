import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { DownOutlined } from '@ant-design/icons';
import { Radio, Space, Switch, Table, ConfigProvider, Divider, message, Upload } from 'antd';
import { useParams } from 'react-router-dom';
import { Button, Col, DatePicker, Drawer, Form, Modal, Input, Row, Select, notification } from 'antd';
import {
  SmileOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  InboxOutlined,
} from '@ant-design/icons';

function GeneralHomeMaintenance() {
  const defaultTitle = () => 'Here is title';
  const defaultFooter = () => 'Here is footer';
  const [bordered, setBordered] = useState(true);
  const [loading, setLoading] = useState(false); /////   IMPORTANT    //////
  const [clubId, setClubId] = useState(null); /////   IMPORTANT    //////
  const [size, setSize] = useState('large');
  const [expandable, setExpandable] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [rowSelection, setRowSelection] = useState({});
  const [tableLayout, setTableLayout] = useState('fixed');
  const [yScroll, setYScroll] = useState(true);
  const [xScroll, setXScroll] = useState('fixed');
  const [top, setTop] = useState('topLeft');
  const [bottom, setBottom] = useState('bottomLeft');
  const [ellipsis, setEllipsis] = useState(true);
  const [data, setData] = useState([]); /////   IMPORTANT    //////
  const [fileList, setFileList] = useState([]);

  //HANDLE FORM DATA
  const [formData, setFormData] = useState({
    description: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = ({ file }) => {
    setFormData((prevState) => ({
      ...prevState,
      image: file.originFileObj,
    }));
  };

  const handleSubmit = async () => {
    const formDataObj = new FormData();
    formDataObj.append('description', formData.description);
    formDataObj.append('image', formData.image);
  
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/updateHome/${clubId}`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.messages.status === 1) {
        notification.success({
          message: 'Success',
          description: response.data.messages.message,
        });
        // Optionally, you can refresh the data or perform any other necessary actions
      } else {
        notification.error({
          message: 'Error',
          description: response.data.messages.message,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while updating the home content.',
      });
    }
  };

  /////////////////////////////////////////////////

  const scroll = {};
  if (yScroll) {
    scroll.y = 390;
  }
  if (xScroll) {
    scroll.x = '80vw';
  }

  // DRAWER ITEMS
  const { Option } = Select;
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  //UPLOAD COMPONENTS
  const { Dragger } = Upload;
  const props = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    showUploadList: true,
    onChange(info) {
      handleImageUpload(info);
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  // TABLE ITEMS
  const columns = [
    {
      title: 'Image',
      dataIndex: 'logo',
      render: (logo) => <img src={"http://localhost:8000/" + logo} alt="Home Logo" style={{ maxWidth: '70px' }} />
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      render: () => (
        <Space size="middle">
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimaryHover: '#7ABA78',
                }
              }
            }}
          >
            <Button type='primary' onClick={showDrawer} className='action-edit1' size='large' icon={<EditOutlined />}>
              {/* <EditOutlined className='action-edit' /> */}
            </Button>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimaryHover: '#5755FE',
                }
              }
            }}
          >
            <Button type='primary' className='action-view1' size='large' icon={<EyeOutlined />}>
              {/* <EyeOutlined className='action-view' /> */}
            </Button>
          </ConfigProvider>

        </Space>
      ),
    },
  ]

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('user-info');

    if (storedUserInfo) {
      try {
        const userInfo = JSON.parse(storedUserInfo);

        if (userInfo.response && userInfo.response.club_id !== undefined) {
          setClubId(userInfo.response.club_id);
        } else {
          console.log('club_id not found in userInfo.response');
        }
      } catch (error) {
        console.error('Failed to parse user info from localStorage:', error);
      }
    } else {
      console.log('No user-info found in localStorage');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (clubId !== null) {
        console.log(`Fetching data for clubId: ${clubId}`);
        try {
          setLoading(true);
          const response = await axios.get(`http://127.0.0.1:8000/api/getHome/${clubId}?_method=POST`);
          const users = response.data.map((user) => ({
            ...user,
          }));
          setData(users);
          setLoading(false);
        } catch (error) {
          console.error('Error: ', error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [clubId]);

  const dataWithKeys = data.map((item) => ({
    ...item,
    key: item.home_id,
  }));

  const tableProps = {
    bordered,
    loading,
    size,
    expandable,
    title: defaultTitle,
    showHeader,
    footer: defaultFooter,
    rowSelection,
    scroll,
    tableLayout,
  };

  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = false;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }

  return (
    <>
      <Drawer
        title="Edit Home Contents"
        width={500}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit} type="primary">
              Save
            </Button>
          </Space>
        }
      >
        <Form layout="vertical">
          <Col span={24}>
            <Form.Item
              name="home_content"
              label="Home Content"
              rules={[
                {
                  required: true,
                  message: 'Please enter a home description content',
                },
              ]}
            >
              <Input.TextArea rows={12} name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter home content" />
            </Form.Item>
            <Form.Item
              name="image"
              label="Image"
              rules={[
                {
                  required: true,
                  message: 'Please upload an image',
                },
              ]}
            >
              <Dragger {...props} onChange={handleImageUpload} fileList={fileList}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single image file upload. Strictly prohibited from uploading sensitive data or other
                  banned files.
                </p>
              </Dragger>
            </Form.Item>
          </Col>
        </Form>
      </Drawer>

      <Table
        {...tableProps}
        pagination={{
          position: [top, bottom],
        }}
        columns={tableColumns}
        dataSource={dataWithKeys}
        scroll={scroll}
        style={{
          width: '100%',
        }}
      />
    </>
  )
}

export default GeneralHomeMaintenance;
