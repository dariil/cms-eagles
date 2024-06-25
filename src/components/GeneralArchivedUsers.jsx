import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Image } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import { Radio, Space, Switch, Table, Divider, message, ConfigProvider, Select } from 'antd';
import { Input } from 'antd';
import { Button, Modal, Drawer, notification, Popconfirm } from 'antd';
import {
  SmileOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
  UpOutlined,
} from '@ant-design/icons';

const defaultTitle = () => 'Here is title';
const defaultFooter = () => 'Here is footer';

function GeneralArchivedUsers(){
    const [bordered, setBordered] = useState(true);
    const [data, setData] = useState([]); /////   IMPORTANT    //////
    const [loading, setLoading] = useState(false); /////   IMPORTANT    //////
    const [clubId, setClubId] = useState(null); /////   IMPORTANT    //////
    const [accessLevel, setAccessLevel] = useState(null); /////   IMPORTANT    //////
    const [size, setSize] = useState('large');
    const [expandable, setExpandable] = useState(false);
    const [showTitle, setShowTitle] = useState(true);
    const [showHeader, setShowHeader] = useState(true);
    const [showFooter, setShowFooter] = useState(true);
    const [rowSelection, setRowSelection] = useState({});
    const [hasData, setHasData] = useState(true);
    const [tableLayout, setTableLayout] = useState('fixed');
    const [top, setTop] = useState('topLeft');
    const [bottom, setBottom] = useState('bottomLeft');
    const [ellipsis, setEllipsis] = useState(true);
    const [yScroll, setYScroll] = useState(true);
    const [xScroll, setXScroll] = useState('fixed');
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedUserID, setSelectedUserID] = useState(null);
    const [inputs, setInputs] = useState({ access_level: '0' });
    const navigate = useNavigate();
    const formRef = useRef(null);
    const showModal = () => {
      setOpen(true);
    };

    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };

    const handleBorderChange = (enable) => {
        setBordered(enable);
    };

    const columns = [
      {
        title: 'Full Name',
        dataIndex: 'full_name',
      },
      {
          title: 'Number',
          dataIndex: 'number',
      },
      {
          title: 'Email',
          dataIndex: 'email',
      },
      {
          title: 'Club',
          dataIndex: 'club_name',
      },
      {
          title: 'Date Created',
          dataIndex: 'date_created',
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
                onConfirm={() => deleteConfirm(record.user_id)}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: 'red',
                    }}
                  />
                }
              >
                <Button type='primary' className='action-del1' size='middle' icon={<DeleteOutlined />}>
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
                description="Are you sure to restore this user?"
                onConfirm={() => restoreConfirm(record.user_id)}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: '#7ABA78',
                    }}
                  />
                }
              >
                <Button type='primary' className='action-edit' size='medium' icon={<UpOutlined />}>
                    {/* <EditOutlined className='action-edit' /> */}
                </Button>
              </Popconfirm>
            </ConfigProvider>
            <ConfigProvider
                theme={{
                    components:{
                        Button:{
                            colorPrimaryHover: '#5755FE',
                        }
                    }
                }}
            >
                <Button type='primary'  onClick={() => showViewDrawer(record.user_id)} className='action-view1' size='middle' icon={<EyeOutlined />}>
                    {/* <EyeOutlined className='action-view' /> */}
                </Button>
            </ConfigProvider>
          </Space>
        ),
      },
  ];

  //RESTORE FUNCTION
  const restoreConfirm = async (userID) => {
    setSelectedUserID(userID);
      await axios.post('http://localhost:8000/api/restoreUser/'+userID).then(function(response){
        console.log(response.data);
        message.success(response.data.messages.message);
    });

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/api/getAllArchivedUsers');
        const users = response.data.map((user) => ({
          ...user,
          full_name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
        }));
        setData(users);
      } catch (error) {
        console.error('Error: ', error);
        message.error(response.data.messages.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }

  //DELETE FUNCTION
  const deleteConfirm = async (userID) => {
    setSelectedUserID(userID);
    await axios.delete('http://localhost:8000/api/deleteUser/'+userID).then(function(response){
            console.log(response.data);
            message.success(response.data.messages.message);
            // getUsers();
    });
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/api/getAllArchivedUsers');
        const users = response.data.map((user) => ({
          ...user,
          full_name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
        }));
        setData(users);
      } catch (error) {
        console.error('Error: ', error);
        message.error(response.data.messages.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }

  //VIEW DRAWER
  const [viewFirstName, setViewFirstName] = useState('');
  const [viewMiddleName, setViewMiddleName] = useState('');
  const [viewLastName, setViewLastName] = useState('');
  const [viewNumber, setViewNumber] = useState('');
  const [viewEmail, setViewEmail] = useState('');
  const [viewClub, setViewClub] = useState('');
  const [viewAccessLevel, setViewAccessLevel] = useState('');

  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const showViewDrawer = (userID) => {
    const fetchData = async () => {
      const result = await axios.get("http://127.0.0.1:8000/api/getOneArchivedUser/"+userID);
      const users = result.data;
      const firstName = users.map(user => user.first_name);
      const middleName = users.map(user => user.middle_name);
      const lastName = users.map(user => user.last_name);
      const number = users.map(user => user.number);
      const clubMember = users.map(user => user.club_id);
      const accessLevel = users.map(user => user.access_level);
      const email = users.map(user => user.email);

      setViewFirstName(firstName);
      setViewMiddleName(middleName);
      setViewLastName(lastName);
      setViewNumber(number);
      setViewEmail(email);
      setViewClub(clubMember);
      setViewAccessLevel(accessLevel);

    };
    setSelectedUserID(userID);
    fetchData();
    setOpenViewDrawer(true);
  }

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

  //EDIT DRAWER
  const [defaultFirstName, setDefaultFirstName] = useState("");
  const [defaultMiddleName, setDefaultMiddleName] = useState("");
  const [defaultLastName, setDefaultLastName] = useState("");
  const [defaultNumber, setDefaultNumber] = useState("");
  const [defaultEmail, setDefaultEmail] = useState("");
  const [defaultClub, setDefaultClub] = useState("");
  const [defaultAccess, setDefaultAccess] = useState("");

  const { Option } = Select;
  const [openDrawer, setOpenDrawer] = useState(false);

  const onClose = () => {
    setOpenDrawer(false);
    setOpenViewDrawer(false)
  };

  const { Search } = Input;
  const onSearch = (value) => {
    if (value.trim() === '') {

        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/getAllArchivedUsers`);
            const users = response.data.map((user) => ({
              ...user,
              full_name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
            }));
            setData(users);
            
            setLoading(false);
          } catch (error) {
            console.error('Error: ', error);
            setLoading(false);
          }
        };
    
        if (accessLevel) {
          fetchData();
        }

        
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
        key: item.user_id,
      }));
      setData(dataWithKeys);
    }
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('user-info');
    if (storedUserInfo) {
        try {
            const userInfo = JSON.parse(storedUserInfo);

            if (userInfo.response && userInfo.response.access_level) {
              setAccessLevel(userInfo.response.access_level)
            // setClubId(userInfo.response.club_id);
            console.log(accessLevel);
            }
        } catch (error) {
            console.error("Failed to parse user info from localStorage:", error);
        }
      }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/api/getAllArchivedUsers`);
        const users = response.data.map((user) => ({
          ...user,
          full_name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
        }));
        
        setData(users);
        setLoading(false);
      } catch (error) {
        console.error('Error: ', error);
        setLoading(false);
      }
    };
  
    if (accessLevel) {
      fetchData();
    }
  }, [accessLevel]);
  

  const dataWithKeys = data.map((item) => ({
    ...item,
    key: item.user_id,
  }));

  const scroll = {};
  if (yScroll) {
    scroll.y = 390;
  }
  if (xScroll) {
    scroll.x = '80vw';
  }
  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = false;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }
  const tableProps = {
    bordered,
    loading,
    size,
    expandable,
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    footer: showFooter ? defaultFooter : undefined,
    rowSelection,
    scroll,
    tableLayout,
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const [api, contextHolder] = notification.useNotification();
  const [messageApi, contextHolderMsg] = message.useMessage();
  const openNotification = () => {
    api.open({
      message: 'User Added Successfully',
      description:
        'A new user has been added to the system.',
      icon: (
        <SmileOutlined
          style={{
            color: '#ebca24',
          }}
        />
      ),
    });
  };

  return (
    <>
      {contextHolder}
      {contextHolderMsg}
      <Drawer
        title="User Details"
        width={550}
        onClose={onClose}
        open={openViewDrawer}
      >
        <p className="site-description-item-profile-p">Personal</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="First Name" content={viewFirstName} />
          </Col>

          <Col span={12}>
            <DescriptionItem title="Contact Number" content={viewNumber}/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Middle Name" content={viewMiddleName} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Email" content={viewEmail} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Last Name" content={viewLastName} />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Club Membership</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Club" content={viewClub} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Access Level" content={viewAccessLevel} />
          </Col>
        </Row>
        <Divider />
      </Drawer>
      <div className='search-container'>
        <Search placeholder="input search text" className='search' size='large' onSearch={onSearch} enterButton />
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
            // height: '100vh',
        }}
      />
    </>
  );
}

export default GeneralArchivedUsers;