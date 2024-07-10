import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { DownOutlined } from '@ant-design/icons';
import { Radio, Space, Switch, Table, ConfigProvider, Divider, message, Upload } from 'antd';
import { useParams } from 'react-router-dom';
import { Button, Col, DatePicker, Drawer, Form, Modal, Input, Row, Image, Select, notification } from 'antd';
import {
  SmileOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  InboxOutlined,
  PlusOutlined,
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

function GeneralAboutUsMaintenance() {
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
  const [selectedAboutId, setSelectedAboutId] = useState(null);

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
  const [defaultClubName, setDefaultdefaultClubName] = useState('');
  const [defaultVision, setDefaultVision] = useState('');
  const [defaultMission, setDefaultMission] = useState('');

  // DRAWER ITEMS
  const { Option } = Select;
  const [open, setOpen] = useState(false);
  const showDrawer = (aboutID) => {
    setSelectedAboutId(aboutID);
    setIsLoading(true);
    const fetchData = async () => {
      try{
        if (clubId !== null) {
          const response = await axios.get(`http://127.0.0.1:8000/api/getAboutClub/${aboutID}`);
          const club = response.data;
          const clubName = club.map(clubName => clubName.club_name);
          const vision = club.map(vision => vision.vision_content);
          const mission = club.map(mission => mission.mission_content);
          const logo = club.map(logo => logo.club_logo);
          const postImage = club.map(postImage => postImage.club_post_image);
          setDefaultdefaultClubName(clubName);
          setDefaultVision(vision);
          setDefaultMission(mission);
          setLogoFileList([
            {
              uid: aboutID,
              name: logo,
              status: 'done',
              url: `http://127.0.0.1:8000/${logo}` 
            }
          ]);
          setFileList([
            {
              uid: aboutID,
              name: postImage,
              status: 'done',
              url: `http://127.0.0.1:8000/${postImage}`
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
    setCoverImageFileList([]);
    setLogoFileList([]);
    setPostImageFileList([]);
    setOpenViewDrawer(false);
  };

  // useEffect(() => {
  //   console.log(selectedAboutId);
  // })

  //UPLOAD HANDLING COMPONENTS
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [coverImageFileList, setCoverImageFileList] = useState([]);
  const [logoFileList, setLogoFileList] = useState([]);
  const [postImageFileList, setPostImageFileList] = useState([]);

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
      title: 'Club Name',
      dataIndex: 'club_name',
    },
    // {
    //   title: 'Cover Image',
    //   dataIndex: 'cover_image',
    //   render: (club_cover) => <img src={"http://localhost:8000/" + club_cover} alt="About Cover Image" style={{ maxWidth: '70px' }} />
    // },
    {
      title: 'Vision Content',
      dataIndex: 'vision_content',
    },
    {
      title: 'Logo',
      dataIndex: 'club_logo',
      render: (club_logo) => <img src={"http://localhost:8000/" + club_logo} alt="Club Logo" style={{ maxWidth: '70px' }} />
    },
    {
      title: 'Mission Content',
      dataIndex: 'mission_content',
    },
    {
      title: 'Post Image',
      dataIndex: 'club_post_image',
      render: (post_image) => <img src={"http://localhost:8000/" + post_image} alt="About Post Image" style={{ maxWidth: '70px' }} />
    },
    {
      title: 'Action',
      render: (text, record) => (
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
            <Button type='primary' onClick={() => showDrawer(record.club_id)} className='action-edit1' size='large' icon={<EditOutlined />}>
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
          const response = await axios.get(`http://127.0.0.1:8000/api/getAboutClub/${clubId}`);
          const about = response.data.map((about) => ({
            ...about,
            // date_created: about.date_created.split('T')[0],
            // updated_at: projects.updated_at.split('T')[0]
          }));
          setData(about);
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
            const response = await axios.get(`http://127.0.0.1:8000/api/getAboutClub/${clubId}`);
            const about = response.data.map((about) => ({
              ...about,
              created_at: about.created_at.split('T')[0],
              updated_at: about.updated_at.split('T')[0]
            }));
            setData(about);
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
        key: item.club_id,
      }));
      setData(dataWithKeys);
    }
  };

  const dataWithKeys = data.map((item) => ({
    ...item,
    key: item.club_id,
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
      formData.append('club_name', values.club_name);
      // formData.append('cover_image', coverImageFileList[0]?.originFileObj);
      formData.append('vision_content', values.vision_content);
      formData.append('logo', logoFileList[0]?.originFileObj);
      formData.append('mission_content', values.mission_content);
      formData.append('post_image', postImageFileList[0]?.originFileObj);
  
      const response = await fetch(`http://127.0.0.1:8000/api/updateAbout/${selectedAboutId}?_method=POST`, {
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
              const response = await axios.get(`http://127.0.0.1:8000/api/getAboutClub/${clubId}`);
              const about = response.data.map((about) => ({
                ...about,
                // created_at: about.created_at.split('T')[0],
                // updated_at: about.updated_at.split('T')[0]
              }));
              setData(about);
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
        setCoverImageFileList([]);
        setLogoFileList([]);
        setPostImageFileList([]);
      } else {
        message.error(data.messages.message);
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to update about contents.');
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
        <About></About>
      </Drawer>
      <Drawer
        title="Edit About Contents"
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
            club_name: defaultClubName,
            vision_content: defaultVision,
            mission_content: defaultMission,
            logo: logoFileList,
            post_image: fileList,
          }}
        >
          <div className='test-cont-1'>
          <Col span={24}>
            <Form.Item
              name="club_name"
              label="Club Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter the club name',
                },
              ]}
            >
              <Input name="title" placeholder="Enter club name" />
            </Form.Item>
          
            {/* <Form.Item
              name={"cover_image"}
              valuePropName='fileList'
              getValueFromEvent={(event)=>{
                return event?.fileList;
              }}
              label="Cover Image"
              rules={[
                {
                  required: true,
                  message: 'Please upload an image',
                },
                {
                  validator(_,fileList){
                    return new Promise((resolve, reject) =>{
                      if(fileList && fileList[0].size > 9999999){
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
                fileList={coverImageFileList}
                onPreview={handlePreview}
                onChange={({ fileList: newFileList }) => setCoverImageFileList(newFileList)}
                beforeUpload={(file) => {
                  return new Promise((resolve, reject) => {
                    if (file.size > 9999999) {
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
            </Form.Item> */}

            <Form.Item
              name="vision_content"
              label="Vision Content"
              rules={[
                {
                  required: true,
                  message: 'Please enter a vision content',
                },
              ]}
            >
              <Input.TextArea rows={12} name="vision_content" placeholder="Enter vision content" />
            </Form.Item>
            <Form.Item
              name={"logo"}
              valuePropName='fileList'
              getValueFromEvent={(event)=>{
                return event?.fileList;
              }}
              label="Logo"
              rules={[
                {
                  required: true,
                  message: 'Please upload an image',
                },
                {
                  validator(_,fileList){
                    return new Promise((resolve, reject) =>{
                      if(fileList && fileList[0].size > 9999999){
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
                fileList={logoFileList}
                onPreview={handlePreview}
                onChange={({ fileList: newFileList }) => setLogoFileList(newFileList)}
                beforeUpload={(file) => {
                  return new Promise((resolve, reject) => {
                    if (file.size > 9999999) {
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
              <Form.Item
              name="mission_content"
              label="Mission Content"
              rules={[
                {
                  required: true,
                  message: 'Please enter a mission content',
                },
              ]}
            >
              <Input.TextArea rows={12} name="mission_content" placeholder="Enter mission content" />
            </Form.Item>
            <Form.Item
              name={"post_image"}
              valuePropName='fileList'
              getValueFromEvent={(event)=>{
                return event?.fileList;
              }}
              label="Post Image"
              rules={[
                {
                  required: true,
                  message: 'Please upload an image',
                },
                {
                  validator(_,fileList){
                    return new Promise((resolve, reject) =>{
                      if(fileList && fileList[0].size > 9999999){
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
                fileList={postImageFileList}
                onPreview={handlePreview}
                onChange={({ fileList: newFileList }) => setPostImageFileList(newFileList)}
                beforeUpload={(file) => {
                  return new Promise((resolve, reject) => {
                    if (file.size > 9999999) {
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

export default GeneralAboutUsMaintenance;
