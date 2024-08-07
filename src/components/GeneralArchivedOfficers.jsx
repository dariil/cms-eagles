import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Radio, Space, Switch, Table, ConfigProvider, Divider, message, Upload } from 'antd';
import { Button, Col, DatePicker, Drawer, Form, Modal, Input, Row, Image, Select, Popconfirm, notification } from 'antd';
import {
  SmileOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  InboxOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  UpOutlined
} from '@ant-design/icons';
import About from './About';

// HANDLE IMAGE PREVIEW
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function GeneralArchivedOfficers() {
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
  const [selectedOfficerId, setSelectedOfficerId] = useState(null);

  // ADD COMPONENTS
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
        formData.append('official_name', values.official_name);
        formData.append('official_position', values.official_position);
        formData.append('official_description', values.official_description);
        formData.append('official_image', fileList[0]?.originFileObj);
  
        // Perform API call
        const response = await fetch(`http://127.0.0.1:8000/api/addOfficers/${clubId}`, {
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
                const response = await axios.get(`http://127.0.0.1:8000/api/getOfficials/${clubId}`);
                const officer = response.data.map((officer) => ({
                  ...officer,
                  // created_at: projects.created_at.split('T')[0],
                  // updated_at: projects.updated_at.split('T')[0]
                }));
                setData(officer);
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

  //HANDLE FORM DATA
  const formRef = useRef(null);

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
  const showDrawer = (officerID) => {
    setSelectedOfficerId(officerID);
    console.log(selectedOfficerId);
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
      title: 'Officer\'s Full Name',
      dataIndex: 'official_name',
    },
    {
      title: 'Position',
      dataIndex: 'official_position',
    },
    {
      title: 'Official Image',
      dataIndex: 'official_image',
      render: (officialImage) => <img src={"http://localhost:8000/" + officialImage} alt="Officer Image" style={{ maxWidth: '70px' }} />
    },
    {
      title: 'Description',
      dataIndex: 'official_description',
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
                onConfirm={() => deleteConfirm(record.official_id)}
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
                description="Are you sure to restore this officer?"
                onConfirm={() => restoreConfirm(record.official_id)}
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
  const restoreConfirm = async (officerID) => {
    setSelectedOfficerId(officerID);
      await axios.post('http://localhost:8000/api/restoreOfficer/'+officerID).then(function(response){
        console.log(response.data);
        message.success(response.data.messages.message);
    });

    const fetchData = async () => {
      if (clubId !== null) {
        console.log(`Fetching data for clubId: ${clubId}`);
        try {
          setLoading(true);
          const response = await axios.get(`http://127.0.0.1:8000/api/getArchivedOfficers/${clubId}`);
          const officer = response.data.map((officer) => ({
            ...officer,
            // created_at: projects.created_at.split('T')[0],
            // updated_at: projects.updated_at.split('T')[0]
          }));
          setData(officer);
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
  const deleteConfirm = async (officialID) => {
    setSelectedOfficerId(officialID);
    await axios.delete('http://localhost:8000/api/deleteOfficer/'+officialID).then(function(response){
            console.log(response.data);
            message.success(response.data.messages.message);
    });

    const fetchData = async () => {
      if (clubId !== null) {
        console.log(`Fetching data for clubId: ${clubId}`);
        try {
          setLoading(true);
          const response = await axios.get(`http://127.0.0.1:8000/api/getArchivedOfficers/${clubId}`);
          const officer = response.data.map((officer) => ({
            ...officer,
            // created_at: projects.created_at.split('T')[0],
            // updated_at: projects.updated_at.split('T')[0]
          }));
          setData(officer);
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
          const response = await axios.get(`http://127.0.0.1:8000/api/getArchivedOfficers/${clubId}`);
          const officer = response.data.map((officer) => ({
            ...officer,
            // created_at: projects.created_at.split('T')[0],
            // updated_at: projects.updated_at.split('T')[0]
          }));
          setData(officer);
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
            const response = await axios.get(`http://127.0.0.1:8000/api/getArchivedOfficers/${clubId}`);
            const officer = response.data.map((officer) => ({
              ...officer,
            //   created_at: officer.created_at.split('T')[0],
            //   updated_at: officer.updated_at.split('T')[0]
            }));
            setData(officer);
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
        key: item.official_id,
      }));
      setData(dataWithKeys);
    }
  };

  const dataWithKeys = data.map((item) => ({
    ...item,
    key: item.official_id,
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
        // title="Admin Details"
        width={'100%'}
        onClose={onClose}
        open={openViewDrawer}
        
      >
        <About></About>
      </Drawer>
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

export default GeneralArchivedOfficers;
