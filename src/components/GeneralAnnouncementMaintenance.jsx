import React, { useState, useEffect, useRef } from 'react';
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
import Announcements from './Announcements';

// HANDLE IMAGE PREVIEW
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function GeneralAnnouncementMaintenance() {
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
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState(null);

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
        formData.append('title', values.title);
        formData.append('description', values.announcement_content);
        formData.append('cover_image', fileList[0]?.originFileObj);
        formData.append('created_by', userId);
  
        // Perform API call
        const response = await fetch(`http://127.0.0.1:8000/api/addAnnouncement/${clubId}`, {
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
                const response = await axios.get(`http://127.0.0.1:8000/api/getAnnouncementsInClub/${clubId}`);
                const announcement = response.data.map((announcement) => ({
                  ...announcement,
                  created_at: announcement.created_at.split('T')[0],
                  updated_at: announcement.updated_at.split('T')[0]
                }));
                setData(announcement);
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

  const [isLoading, setIsLoading] = useState(false);
  const [defaultAnnouncementTitle, setDefaultAnnouncementTitle] = useState('');
  const [defaultDescription, setDefaultDescription] = useState('');
  
  // DRAWER ITEMS
  const { Option } = Select;
  const [open, setOpen] = useState(false);

  const showDrawer = (announcementId) => {
    setIsLoading(true);
    setSelectedAnnouncementId(announcementId);
    const fetchData = async () => {
      try{
        if (clubId !== null) {
          const response = await axios.get(`http://127.0.0.1:8000/api/getOneAnnouncement/${announcementId}`);
          const home = response.data;
          const title = home.map(heroTitle => heroTitle.title);
          const content = home.map(content => content.description);
          const imgName = home.map(image => image.cover_image);
          setDefaultAnnouncementTitle(title[0]);
          setDefaultDescription(content);
          setFileList([
            {
              uid: announcementId,
              name: imgName,
              status: 'done',
              url: `http://127.0.0.1:8000/${imgName}`
            }
          ]);
          
        }
      } catch (error) {
        console.error("An error occured:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
      title: 'Announcement Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Announcement Image',
      dataIndex: 'cover_image',
      render: (announcementImage) => <img src={"http://localhost:8000/" + announcementImage} alt="Announcement Image" style={{ maxWidth: '70px' }} />
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
      render: (record) => (
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
                onConfirm={() => archiveConfirm(record.announcement_id)}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: 'red',
                    }}
                  />
                }
              >
                <Button type='primary' className='action-del1' size='large' icon={<DownOutlined />}>
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
            <Button type='primary' onClick={() => showDrawer(record.announcement_id)} className='action-edit1' size='large' icon={<EditOutlined />}>
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
  const archiveConfirm = async (announcementID) => {
    setSelectedAnnouncementId(announcementID);
    await axios.post('http://localhost:8000/api/archiveAnnouncement/'+announcementID).then(function(response){
            console.log(response.data);
            message.success(response.data.messages.message);
    });
    
    const fetchData = async () => {
      if (clubId !== null) {
        console.log(`Fetching data for clubId: ${clubId}`);
        try {
          setLoading(true);
          const response = await axios.get(`http://127.0.0.1:8000/api/getAnnouncementsInClub/${clubId}`);
          const announcements = response.data.map((announcement) => ({
            ...announcement,
            created_at: announcement.created_at.split('T')[0],
            updated_at: announcement.updated_at.split('T')[0]
          }));
          setData(announcements);
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
          const response = await axios.get(`http://127.0.0.1:8000/api/getAnnouncementsInClub/${clubId}`);
          const announcements = response.data.map((announcement) => ({
            ...announcement,
            created_at: announcement.created_at.split('T')[0],
            updated_at: announcement.updated_at.split('T')[0]
          }));
          setData(announcements);
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
            const response = await axios.get(`http://127.0.0.1:8000/api/getAnnouncementsInClub/${clubId}`);
            const announcements = response.data.map((announcement) => ({
              ...announcement,
              created_at: announcement.created_at.split('T')[0],
              updated_at: announcement.updated_at.split('T')[0]
            }));
            setData(announcements);
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
        key: item.announcement_id,
      }));
      setData(dataWithKeys);
    }
  };

  const dataWithKeys = data.map((item) => ({
    ...item,
    key: item.announcement_id,
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
      formData.append('description', values.announcement_content);
      formData.append('title', values.title);
  
      const response = await fetch(`http://127.0.0.1:8000/api/updateAnnouncement/${selectedAnnouncementId}?_method=POST`, {
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
              const response = await axios.get(`http://127.0.0.1:8000/api/getAnnouncementsInClub/${clubId}`);
              const announcements = response.data.map((announcement) => ({
                ...announcement,
                created_at: announcement.created_at.split('T')[0],
                updated_at: announcement.updated_at.split('T')[0]
              }));
              setData(announcements);
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
      message.error('Failed to update announcement.');
    }
  };  

  return (
    <>
    <Drawer
        // title="Admin Details"
        width={'100%'}
        onClose={onClose}
        open={openViewDrawer}
        loading={isLoading}
      >
        <Announcements></Announcements>
    </Drawer>
      <Drawer
        title="Edit Announcement Contents"
        width={500}
        onClose={onClose}
        open={open}
        loading={isLoading}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form 
          layout="vertical" 
          onFinish={onFinish}
          ref={formRef} 
          initialValues={{
            title: defaultAnnouncementTitle,
            announcement_content: defaultDescription,
            image: fileList,
          }}
        >
          <div className='test-cont'>
          <Col span={24}>
            <Form.Item
              name="title"
              label="Announcement Title"
              rules={[
                {
                  required: true,
                  message: 'Please enter an announcement title content',
                },
              ]}
            >
              <Input name="title" placeholder="Enter post title" />
            </Form.Item>
          
            <Form.Item
              name="announcement_content"
              label="Announcement Content"
              rules={[
                {
                  required: true,
                  message: 'Please enter an announcement description content',
                },
              ]}
            >
              <Input.TextArea rows={12} name="description" placeholder="Enter announcement content" />
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
          Add Announcement
        </Button>
        <Modal
          title="Add Announcement"
          open={modalOpen}
          centered
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Form layout="vertical" onFinish={onFinish} ref={formRef} >
          <div className='test-cont'>
          <Col span={24}>
            <Form.Item
              name="title"
              label="Announcement Title"
              rules={[
                {
                  required: true,
                  message: 'Please enter an announcement title content',
                },
              ]}
            >
              <Input name="title" placeholder="Enter post title" />
            </Form.Item>
          
            <Form.Item
              name="announcement_content"
              label="Announcement Content"
              rules={[
                {
                  required: true,
                  message: 'Please enter an announcement description content',
                },
              ]}
            >
              <Input.TextArea rows={12} name="description" placeholder="Enter announcement content" />
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

export default GeneralAnnouncementMaintenance;
