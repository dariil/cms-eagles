import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Radio, Space, Switch, Table, ConfigProvider, Divider, message, Upload } from 'antd';
import { Button, Col, DatePicker, Drawer, Form, Modal, Input, Row, Image, Select, notification, Popconfirm } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  UpOutlined,
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

function GeneralArchivedProjects() {
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
                <Button type='primary' className='action-del1' size='large' icon={<DeleteOutlined />}>
                </Button>
              </Popconfirm>
          </ConfigProvider>
          <ConfigProvider
                theme={{
                    components:{
                        Button:{
                            colorPrimaryHover: '#7ABA78',
                        }
                    }
                }}
            >
                <Popconfirm
                title="Restore the task"
                description="Are you sure to restore this project?"
                onConfirm={() => restoreConfirm(record.project_id)}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: '#7ABA78',
                    }}
                  />
                }
              >
              <Button type='primary' className='action-edit' size='large' icon={<UpOutlined />}></Button>
            </Popconfirm>
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

  //RESTORE FUNCTION
  const restoreConfirm = async (projectID) => {
    setSelectedProjectId(projectID);
      await axios.post('http://localhost:8000/api/restoreProject/'+projectID).then(function(response){
        console.log(response.data);
        message.success(response.data.messages.message);
    });

    const fetchData = async () => {
      if (clubId !== null) {
        console.log(`Fetching data for clubId: ${clubId}`);
        try {
          setLoading(true);
          const response = await axios.get(`http://127.0.0.1:8000/api/getArchivedProjects/${clubId}`);
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
          const response = await axios.get(`http://127.0.0.1:8000/api/getArchivedProjects/${clubId}`);
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
          const response = await axios.get(`http://127.0.0.1:8000/api/getArchivedProjects/${clubId}`);
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
            const response = await axios.get(`http://127.0.0.1:8000/api/getArchivedProjects/${clubId}`);
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

  return (
    <>
      <div className='search-container2'>
        <Search placeholder="input search text" className='search2' size='large' onSearch={onSearch} enterButton />
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

export default GeneralArchivedProjects;
