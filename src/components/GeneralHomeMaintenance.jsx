import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Radio, Space, Switch, Table, ConfigProvider, Divider, message, Upload } from 'antd';
import { Button, Col, DatePicker, Drawer, Form, Modal, Input, Row, Image, Select, notification } from 'antd';
import {
  SmileOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  InboxOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import Home from './Home';

// HANDLE IMAGE PREVIEW
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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
  const [selectedHomeID, setSelectedHomeID] = useState('');

  const formRef = useRef(null);

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
  const [defaultHeroTitle, setDefaultHeroTitle] = useState('');
  const [defaultTagline, setDefaultTagline] = useState('');
  const [defaultHomeContent, setDefaultHomeContent] = useState('');

  // DRAWER ITEMS
  const { Option } = Select;
  const [open, setOpen] = useState(false);
  const showDrawer = (home_ID) => {
    setIsLoading(true);
    setSelectedHomeID(home_ID);
    const fetchData = async () => {
      try{
        if (clubId !== null) {
          const response = await axios.get(`http://127.0.0.1:8000/api/getHome/${clubId}`);
          const home = response.data;
          const title = home.map(heroTitle => heroTitle.hero_title);
          const tagline = home.map(tagline => tagline.hero_tagline);
          const content = home.map(content => content.description);
          const imgName = home.map(image => image.logo);
          const vidName = home.map(video => video.hero_video);
          setDefaultHeroTitle(title[0]);
          setDefaultTagline(tagline);
          setDefaultHomeContent(content);
          setFileList([
            {
              uid: home_ID,
              name: imgName,
              status: 'done',
              url: `http://127.0.0.1:8000/${imgName}`
            }
          ]);
          setFileListVid([
            {
              uid: home_ID,
              name: vidName,
              status: 'done',
              url: `http://127.0.0.1:8000/${vidName}`
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
  const [previewVideo, setPreviewVideo] = useState('');
  const [fileList, setFileList] = useState([]);
  const [fileListVid, setFileListVid] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const handleChangeVid = ({ fileList: newFileListVid }) => setFileListVid(newFileListVid);

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
      title: 'Hero Title',
      dataIndex: 'hero_title',
    },
    {
      title: 'Tagline',
      dataIndex: 'hero_tagline',
    },
    {
      title: 'Hero Video',
      dataIndex: 'hero_video',
      render: (hero_video) => <video src={"http://localhost:8000/" + hero_video} autoPlay loop muted alt="Hero Video" style={{ maxWidth: '70px' }} />
    },
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
      render: (record) => (
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
            <Button type='primary' onClick={() => showDrawer(record.home_id)} className='action-edit1' size='large' icon={<EditOutlined />}></Button>
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
            <Button type='primary'  onClick={() => showViewDrawer()} className='action-view1' size='large' icon={<EyeOutlined />}></Button>
          </ConfigProvider>

        </Space>
      ),
    },
  ]

  // RETRIEVE CLUB ID ON LOAD
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

  // RETRIEVE DATA ON LOAD
  useEffect(() => {
    const fetchData = async () => {
      if (clubId !== null) {
        console.log(`Fetching data for clubId: ${clubId}`);
        try {
          setLoading(true);
          const response = await axios.get(`http://127.0.0.1:8000/api/getHome/${clubId}`);
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

  // SEARCH FUNCTIONALITIES
  const { Search } = Input;
  const onSearch = (value) => {
    if (value.trim() === '') {

        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/getHome/${clubId}`);
            setData(response.data);
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
        key: item.home_id,
      }));
      setData(dataWithKeys);
    }
  };

  // INSERT THE DATA WITH KEYS
  const dataWithKeys = data.map((item) => ({
    ...item,
    key: item.home_id,
  }));

  // TABLE ATTRIBUTES
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

  // INITIALIZE TABLE COLUMNS
  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = false;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }

  // HANDLE SUBMIT
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('home_title', values.title_home);
      formData.append('home_tagline', values.tagline_home);
      if (fileListVid[0]?.originFileObj) {
        formData.append('video', fileListVid[0].originFileObj);
      }
      
      if (fileList[0]?.originFileObj) {
        formData.append('image', fileList[0].originFileObj);
      }
      formData.append('description', values.home_content);

      const response = await fetch(`http://127.0.0.1:8000/api/updateHome/${selectedHomeID}?_method=POST`, {
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
              const response = await axios.get(`http://127.0.0.1:8000/api/getHome/${clubId}`);
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
        formRef.current.resetFields();
        setFileList([]);
        setFileListVid([]);
    
        fetchData();
        setOpen(false);
        
      } else {
        message.error(data.messages.message);
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to update home contents.');
    }
  };

  return (
    <>
      <Drawer
        width={'100%'}
        onClose={onClose}
        open={openViewDrawer}
      >
        <Home></Home>
      </Drawer>
      <Drawer
        title="Edit Home Contents"
        width={500}
        onClose={onClose}
        loading={isLoading}
        open={open}
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
            title_home: defaultHeroTitle,
            tagline_home: defaultTagline,
            home_content: defaultHomeContent,
            image: fileList,
            video: fileListVid,
          }}
        
        >
          <div className='test-cont-1'>
          <Col span={24}>
          
            <Form.Item
              name="title_home"
              label="Hero Title"
              rules={[
                {
                  required: true,
                  message: 'Please enter a home title content',
                },
              ]}
            >
              <Input name="home_title" placeholder="Enter home title content" />
            </Form.Item>

            <Form.Item
              name="tagline_home"
              label="Hero Tagline"
              rules={[
                {
                  required: true,
                  message: 'Please enter a home title content',
                },
              ]}
            >
              <Input name="home_tagline" placeholder="Enter home title content" />
            </Form.Item>

            <Form.Item
              name={"video"}
              valuePropName='fileListVid'
              getValueFromEvent={(event)=>{
                return event?.fileList;
              }}
              label="Hero Video"
              rules={[
                {
                  required: true,
                  message: 'Please upload a video',
                },
                {
                  validator(_,fileListVid){
                    return new Promise((resolve, reject) =>{
                      if(fileListVid && fileListVid[0].size > 999999999){
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
                fileList={fileListVid}
                // onPreview={handlePreview}
                onChange={handleChangeVid}
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
                  handleChangeVid({ file });
                  onSuccess();
                }}
              >
                {uploadButton}
                {/* {fileListVid[0]?.name} */}
              </Upload>
            </Form.Item>

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
              <Input.TextArea rows={12} name="description" placeholder="Enter home content" />
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
              {/* <Upload> //THIS WORKS
                <Button>Upload File</Button>
              </Upload> */}
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
                {/* {fileList[0]?.name} */}
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
            {previewVideo && (
                <Image
                  wrapperStyle={{
                    display: 'none',
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewVideo(''),
                  }}
                  src={previewVideo}
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

export default GeneralHomeMaintenance;
