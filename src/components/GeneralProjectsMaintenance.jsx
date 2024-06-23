import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Radio, Space, Switch, Table, ConfigProvider, Divider, message, Upload } from 'antd';
import { useParams } from 'react-router-dom';
import { Button, Col, DatePicker, Drawer, Form, Modal, Input, Row, Image, Select, notification, Popconfirm } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  DownOutlined,
} from '@ant-design/icons';
import Projects from './Projects';

// HANDLE IMAGE PREVIEW
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function GeneralProjectsMaintenance() {
  const defaultTitle = () => 'Here is title';
  const defaultFooter = () => 'Here is footer';
  const [bordered, setBordered] = useState(true);
  const [loading, setLoading] = useState(false); /////   IMPORTANT    //////
  const [clubId, setClubId] = useState(null); /////   IMPORTANT    //////
  const [userId, setUserId] = useState(null); /////   IMPORTANT    //////
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
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  //ADD COMPONENTS
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setModalOpen(false);
  };

  const showModal = () => {
    setModalOpen(true);
  };

  const handleOk = async (event) => {
    event.preventDefault();
    setConfirmLoading(true);
    try {
        const values = await formRef.current.validateFields();
        // Create form data to send file and other inputs
        const formData = new FormData();
        formData.append('club_id', clubId);
        formData.append('project_title', values.project_title);
        formData.append('project_description', values.project_description);
        formData.append('cover_image', fileList[0]?.originFileObj);
        formData.append('created_by', userId);
  
        // Perform API call
        const response = await fetch(`http://127.0.0.1:8000/api/addProjects`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
  
        if (response.ok) {
          message.success(data.messages.message);
          setModalOpen(false);
          formRef.current.resetFields();
          setFileList([]);
        } else {
          message.error(data.messages.message);
        }
      } catch (error) {
        console.error('Error:', error);
        message.error('Validation failed or API error');
      } finally {
        const fetchData = async () => {
            if (clubId !== null) {
              console.log(`Fetching data for clubId: ${clubId}`);
              try {
                setLoading(true);
                const response = await axios.get(`http://127.0.0.1:8000/api/getProjectsInClub/${clubId}`);
                const project = response.data.map((project) => ({
                  ...project,
                  // created_at: projects.created_at.split('T')[0],
                  // updated_at: projects.updated_at.split('T')[0]
                }));
                setData(project);
                setLoading(false);
              } catch (error) {
                console.error('Error: ', error);
                setLoading(false);
              }
            }
          };
      
          fetchData();
        setConfirmLoading(false);
      }

  };

  const formRef = useRef(null);

  //HANDLE FORM DATA
  const [formData, setFormData] = useState({
    description: '',
    image: null,
  });

  /////////////////////////////////////////////////

  const scroll = {};
  if (yScroll) {
    scroll.y = 390;
  }
  if (xScroll) {
    scroll.x = '80vw';
  }

  //VIEW DRAWER
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const showViewDrawer = () => {
    setOpenViewDrawer(true);
  }


  // DRAWER ITEMS
  const { Option } = Select;
  const [open, setOpen] = useState(false);
  const showDrawer = (projectID) => {
    setSelectedProjectId(projectID);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setOpenViewDrawer(false);
  };

  //UPLOAD HANDLING COMPONENTS
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

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
  

  // TABLE ITEMS
  const columns = [
    {
      title: 'Project Title',
      dataIndex: 'project_title',
    },
    {
      title: 'Description',
      dataIndex: 'project_description',
    },
    {
      title: 'Project Image',
      dataIndex: 'cover_image',
      render: (projectImage) => <img src={"http://localhost:8000/" + projectImage} alt="Project Image" style={{ maxWidth: '70px' }} />
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
    },
    {
      title: 'Updated at',
      dataIndex: 'updated_at',
    },
    {
      title: 'Action',
      render: (text, record) => (
        <Space size="middle">
          <ConfigProvider
                theme={{
                    components:{
                        Button:{
                            colorPrimaryHover: '#C40C0C',
                        }
                    }
                }}
            >
                <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => deleteConfirm(record.project_id)}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: 'red',
                    }}
                  />
                }
              >
                <Button type='primary' className='action-del1' size='large' icon={<DownOutlined />}>
                    {/* <EditOutlined className='action-edit' /> */}
                </Button>
              </Popconfirm>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimaryHover: '#7ABA78',
                }
              }
            }}
          >
            <Button type='primary' onClick={() => showDrawer(record.project_id)} className='action-edit1' size='large' icon={<EditOutlined />}>
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
            <Button type='primary'  onClick={() => showViewDrawer()} className='action-view1' size='large' icon={<EyeOutlined />}>
              {/* <EyeOutlined className='action-view' /> */}
            </Button>
          </ConfigProvider>

        </Space>
      ),
    },
  ]

  //DELETE FUNCTION
  const deleteConfirm = async (projectID) => {
    setSelectedProjectId(projectID);
    await axios.delete('http://localhost:8000/api/deleteProject/'+projectID).then(function(response){
            console.log(response.data);
            message.success(response.data.messages.message);
            // getUsers();
    });

    const fetchData = async () => {
      if (clubId !== null) {
        console.log(`Fetching data for clubId: ${clubId}`);
        try {
          setLoading(true);
          const response = await axios.get(`http://127.0.0.1:8000/api/getProjectsInClub/${clubId}`);
          const projects = response.data.map((projects) => ({
            ...projects,
            created_at: projects.created_at.split('T')[0],
            updated_at: projects.updated_at.split('T')[0]
          }));
          setData(projects);
          setLoading(false);
        } catch (error) {
          console.error('Error: ', error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('user-info');

    if (storedUserInfo) {
      try {
        const userInfo = JSON.parse(storedUserInfo);

        if (userInfo.response && userInfo.response.club_id !== undefined && userInfo.response.user_id !== undefined) {
          setClubId(userInfo.response.club_id);
          setUserId(userInfo.response.user_id);
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
          const response = await axios.get(`http://127.0.0.1:8000/api/getProjectsInClub/${clubId}`);
          const projects = response.data.map((projects) => ({
            ...projects,
            created_at: projects.created_at.split('T')[0],
            updated_at: projects.updated_at.split('T')[0]
          }));
          setData(projects);
          setLoading(false);
        } catch (error) {
          console.error('Error: ', error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [clubId]);

  // SEARCH FUNCTIONALITIES
  const { Search } = Input;
  const onSearch = (value) => {
    if (value.trim() === '') {

        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/getProjectsInClub/${clubId}`);
            const projects = response.data.map((projects) => ({
              ...projects,
              created_at: projects.created_at.split('T')[0],
              updated_at: projects.updated_at.split('T')[0]
            }));
            setData(projects);
            setLoading(false);
          } catch (error) {
            console.error('Error: ', error);
            setLoading(false);
          }
        };
        fetchData();
    } else {
      // Filter the data based on the search value
      const filteredData = data.filter((item) =>
        Object.values(item)
          .join('')
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      const dataWithKeys = filteredData.map((item) => ({
        ...item,
        key: item.project_id,
      }));
      setData(dataWithKeys);
    }
  };

  const dataWithKeys = data.map((item) => ({
    ...item,
    key: item.project_id,
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

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('image', fileList[0]?.originFileObj);
      formData.append('project_description', values.project_content);
      formData.append('project_title', values.project_title);
  
      const response = await fetch(`http://127.0.0.1:8000/api/updateProjects/${selectedProjectId}?_method=POST`, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        message.success(data.messages.message);
        const fetchData = async () => {
          if (clubId !== null) {
            console.log(`Fetching data for clubId: ${clubId}`);
            try {
              setLoading(true);
              const response = await axios.get(`http://127.0.0.1:8000/api/getProjectsInClub/${clubId}`);
              const projects = response.data.map((projects) => ({
                ...projects,
                created_at: projects.created_at.split('T')[0],
                updated_at: projects.updated_at.split('T')[0]
              }));
              setData(projects);
              setLoading(false);
            } catch (error) {
              console.error('Error: ', error);
              setLoading(false);
            }
          }
        };
        setOpen(false);
    
        fetchData();
        formRef.current.resetFields();
        setFileList([]);
      } else {
        message.error(data.messages.message);
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to update project.');
    }
  };  

  return (
    <>
    <Drawer
        // title="Admin Details"
        width={'100%'}
        onClose={onClose}
        open={openViewDrawer}
        
      >
        <Projects></Projects>
      </Drawer>
      <Drawer
        title="Edit Project Contents"
        width={500}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form layout="vertical" onFinish={onFinish} ref={formRef} >
          <div className='test-cont'>
          <Col span={24}>
            <Form.Item
              name="project_title"
              label="Project Title"
              rules={[
                {
                  required: true,
                  message: 'Please enter a project title content',
                },
              ]}
            >
              <Input name="title" placeholder="Enter post title" />
            </Form.Item>
          
            <Form.Item
              name="project_content"
              label="Project Content"
              rules={[
                {
                  required: true,
                  message: 'Please enter a project description content',
                },
              ]}
            >
              <Input.TextArea rows={12} name="project_description" placeholder="Enter project content" />
            </Form.Item>
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
                  handleChange({ file });
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
          <Row gutter={16} className='mt-4'>
            <Col span={12}>
              <Button htmlType='submit' type="primary" block>
                Update
              </Button>
            </Col>
            <Col span={12}>
              <Button onClick={onClose} block>
                Cancel
              </Button>
            </Col>
          </Row>
          </div>
        </Form>
      </Drawer>
      
      <div className='search-container2'>
        <Search placeholder="input search text" className='search2' size='large' onSearch={onSearch} enterButton />
        <Button size='large' type="primary" onClick={showModal}>
          Add Project
        </Button>
        <Modal
          title="Add Project"
          open={modalOpen}
          centered
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Form layout="vertical" onFinish={onFinish} ref={formRef} >
          <div className='test-cont'>
          <Col span={24}>

            <Input type='hidden' name="club_id" defaultValue={clubId} />


            <Form.Item
              name="project_title"
              label="Project Title"
              rules={[
                {
                  required: true,
                  message: 'Please enter a project title content',
                },
              ]}
            >
              <Input name="title" placeholder="Enter post title" />
            </Form.Item>
          
            <Form.Item
              name="project_description"
              label="Project Content"
              rules={[
                {
                  required: true,
                  message: 'Please enter a project description content',
                },
              ]}
            >
              <Input.TextArea rows={12} name="project_description" placeholder="Enter project content" />
            </Form.Item>
            <Form.Item
              name={"cover_image"}
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
                  handleChange({ file });
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
          {/* <Row gutter={16} className='mt-4'>
            <Col span={12}>
              <Button htmlType='submit' type="primary" block>
                Update
              </Button>
            </Col>
            <Col span={12}>
              <Button onClick={onClose} block>
                Cancel
              </Button>
            </Col>
          </Row> */}
          </div>
        </Form>
        </Modal>
      </div>

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

export default GeneralProjectsMaintenance;
