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
  QuestionCircleOutlined
} from '@ant-design/icons';

// const columns = [
//     {
//       title: 'First Name',
//       dataIndex: 'firstname',
//     },
//     {
//         title: 'Last Name',
//         dataIndex: 'lastname',
//       },
//     {
//       title: 'Age',
//       dataIndex: 'age',
//       sorter: (a, b) => a.age - b.age,
//     },
//     {
//       title: 'Address',
//       dataIndex: 'address',
//       filters: [
//         {
//           text: 'London',
//           value: 'London',
//         },
//         {
//           text: 'New York',
//           value: 'New York',
//         },
//       ],
//       onFilter: (value, record) => record.address.indexOf(value) === 0,
//     },
//     {
//         title: 'Status',
//         dataIndex: 'status',
//         // sorter: (a, b) => a.age - b.age,
//       },
//     {
//       title: 'Action',
//       key: 'action',
//       render: () => (
//         <Space size="middle">
//           <a>Delete</a>
//           <a>
//             <Space>
//               More actions
//               <DownOutlined />
//             </Space>
//           </a>
//         </Space>
//       ),
//     },
//   ];

const defaultTitle = () => 'Here is title';
const defaultFooter = () => 'Here is footer';

function GeneralUsersMaintenance(){
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
    const [modalText, setModalText] = useState('Content of the modal');
    const [inputs, setInputs] = useState({ access_level: '0' });
    const navigate = useNavigate();
    const formRef = useRef(null);
    const showModal = () => {
      setOpen(true);
    };

    // const handleOk = () => {
    //   setModalText('The modal will be closed after two seconds');
    //   setConfirmLoading(true);
    //   setTimeout(() => {
    //     setOpen(false);
    //     setConfirmLoading(false);
    //   }, 2000);
    // };

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
      // {
      //     title: 'Access Level',
      //     dataIndex: 'access_level',
      // },
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
        // key: 'action',
        // sorter: true,
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
                    {/* <EditOutlined className='action-edit' /> */}
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
                <Button type='primary' onClick={() => showDrawer(record.user_id)} className='action-edit1' size='medium' icon={<EditOutlined />}></Button>
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
        const response = await axios.get('http://127.0.0.1:8000/api/getUsers/0');
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
      const result = await axios.get("http://127.0.0.1:8000/api/getOneUser/"+userID);
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
  const showDrawer = (userID) => {
    const fetchData = async () => {
      const result = await axios.get("http://127.0.0.1:8000/api/getOneUser/"+userID);
      const users = result.data;
      const firstName = users.map(user => user.first_name);
      const middleName = users.map(user => user.middle_name);
      const lastName = users.map(user => user.last_name);
      const number = users.map(user => user.number);
      const clubMember = users.map(user => user.club_id);
      const accessLevel = users.map(user => user.access_level);
      const email = users.map(user => user.email);
      // setDe
      setDefaultFirstName(firstName);
      setDefaultMiddleName(middleName);
      setDefaultLastName(lastName);
      setDefaultNumber(number);
      setDefaultEmail(email);
      setDefaultClub(clubMember);
      setDefaultAccess(accessLevel);
    };
    setSelectedUserID(userID);
    fetchData();
    setOpenDrawer(true);
  };

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
            const response = await axios.get(`http://127.0.0.1:8000/api/getUsers/0`);
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
        const response = await axios.get(`http://127.0.0.1:8000/api/getUsers/0`);
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

  const handleLoadingChange = (enable) => {
    setLoading(enable);
  };
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handleTableLayoutChange = (e) => {
    setTableLayout(e.target.value);
  };

  const handleEllipsisChange = (enable) => {
    setEllipsis(enable);
  };
  const handleTitleChange = (enable) => {
    setShowTitle(enable);
  };
  const handleHeaderChange = (enable) => {
    setShowHeader(enable);
  };
  const handleFooterChange = (enable) => {
    setShowFooter(enable);
  };
  const handleRowSelectionChange = (enable) => {
    setRowSelection(enable ? {} : undefined);
  };
  const handleYScrollChange = (enable) => {
    setYScroll(enable);
  };
  const handleXScrollChange = (e) => {
    setXScroll(e.target.value);
  };
  const handleDataChange = (newHasData) => {
    setHasData(newHasData);
  };
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

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Please fill in all the required fields',
    });
  };

  const handleOk = async (event) => {
    event.preventDefault();

    const requiredFields = ['first_name', 'last_name', 'number', 'club_member', 'access_level', 'email', 'password'];
    const emptyFields = requiredFields.filter(field => !inputs[field]);

    if (emptyFields.length > 0) {
      message.error(`Please fill in the following fields: ${emptyFields.join(', ')}`);
      return;
    }

    setConfirmLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/addUser', inputs);
      message.success(response.data.messages.message);
      console.log(response.data);

      // Reset the form
      setInputs({
        first_name: '',
        middle_name: '',
        last_name: '',
        number: '',
        club_member: '',
        access_level: '0',
        email: '',
        password: ''
      });

      // Fetch and update user data
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get('http://127.0.0.1:8000/api/getUsers/0');
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


      navigate('/admin/general-users');
      // openNotification();
    } catch (error) {
      console.error('Error registering:', error);
      message.error('Failed to add user.');
    } finally {
      setConfirmLoading(false);
      setOpen(false);
    }
  };

  // HANDLE SUBMIT
  const onFinish = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      // formData.append('image', fileList[0]?.originFileObj);
      formData.append('first_name', defaultFirstName);
      formData.append('middle_name', defaultMiddleName);
      formData.append('last_name', defaultLastName);
      formData.append('number', defaultNumber);
      formData.append('access_level', defaultAccess);
      formData.append('club_member', defaultClub);
      formData.append('email', defaultEmail);

      const response = await fetch(`http://127.0.0.1:8000/api/updateUser/${selectedUserID}?_method=POST`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        message.success(data.messages.message);
        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await axios.get('http://127.0.0.1:8000/api/getUsers/0');
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
        setOpenDrawer(false);
        
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
      <Drawer
        title="Edit User"
        width={500}
        onClose={onClose}
        open={openDrawer}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form className='' layout="vertical"  onSubmit={() => onFinish(event)} ref={formRef}>
        <div className='test-cont'>
            <Col className='form-col'>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="first_name" className=''>First Name</Form.Label>
                <Form.Control className='' type="text" name="first_name" id="first_name" onChange={(e) => setDefaultFirstName(e.target.value)} value={defaultFirstName} required placeholder="Enter first name" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="middle_name" className=''>Middle Name</Form.Label>
                <Form.Control className='' type="text" name="middle_name" id="middle_name" onChange={(e) => setDefaultMiddleName(e.target.value)} value={defaultMiddleName} placeholder="Enter middle name" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="last_name" className=''>Last Name</Form.Label>
                <Form.Control className='' type="text" name="last_name" id="last_name" onChange={(e) => setDefaultLastName(e.target.value)} value={defaultLastName} placeholder="Enter last name" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="number" className=''>Number</Form.Label>
                <Form.Control className='' type="number" name="number" id="number" onChange={(e) => setDefaultNumber(e.target.value)} value={defaultNumber} placeholder="Enter number" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="club_member" className=''>Select Club</Form.Label>
                <Form.Select name="club_member" id="club_member" onChange={(e) => setDefaultClub(e.target.value)} value={defaultClub} aria-label="Default select example">
                  <option>Open this select menu</option>
                  <option value="1">RMMEC</option>
                  <option value="2">MMEC</option>
                  <option value="3">LBAEC</option>
                  <option value="4">RMMLEC</option>
                  <option value="5">MBEAC</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="access_level" className=''>Access Level</Form.Label>
                <Form.Select name="access_level" id="access_level" onChange={(e) => setDefaultAccess(e.target.value)} value={defaultAccess} aria-label="Default select example">
                  <option>Open this select menu</option>
                  <option value="0">Member</option>
                  <option value="1">Admin</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="email" className=''>Email</Form.Label>
                <Form.Control className='' type="text" name="email" id="email" onChange={(e) => setDefaultEmail(e.target.value)} value={defaultEmail} placeholder="Enter email" />
              </Form.Group>
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
      <div className='search-container'>
        <Search placeholder="input search text" className='search' size='large' onSearch={onSearch} enterButton />
        <Button size='large' type="primary" onClick={showModal}>
          Add User
        </Button>
        <Modal
          title="Add User"
          open={open}
          centered
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Divider />
          <Form className=''>
            <Col className='form-col'>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="first_name" className=''>First Name</Form.Label>
                <Form.Control className='' type="text" name="first_name" id="first_name" onChange={handleChange} value={inputs.first_name} required placeholder="Enter first name" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="middle_name" className=''>Middle Name</Form.Label>
                <Form.Control className='' type="text" name="middle_name" id="middle_name" onChange={handleChange} value={inputs.middle_name} placeholder="Enter middle name" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="last_name" className=''>Last Name</Form.Label>
                <Form.Control className='' type="text" name="last_name" id="last_name" onChange={handleChange} value={inputs.last_name} placeholder="Enter last name" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="number" className=''>Number</Form.Label>
                <Form.Control className='' type="number" name="number" id="number" onChange={handleChange} value={inputs.number} placeholder="Enter number" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="club_member" className=''>Select Club</Form.Label>
                <Form.Select name="club_member" id="club_member" onChange={handleChange} value={inputs.club_member} aria-label="Default select example">
                  <option>Open this select menu</option>
                  <option value="1">RMMEC</option>
                  <option value="2">MMEC</option>
                  <option value="3">LBAEC</option>
                  <option value="4">RMMLEC</option>
                  <option value="5">MBEAC</option>
                </Form.Select>
              </Form.Group>

              {/* <Form.Group className="mb-3">
                <Form.Label htmlFor="access_level" className=''>Access Level</Form.Label>
                <Form.Select name="access_level" id="access_level" onChange={handleChange} value={inputs.access_level} aria-label="Default select example">
                  <option>Open this select menu</option>
                  <option value="0">Member</option>
                  <option value="1">Admin</option>
                </Form.Select>
              </Form.Group> */}

              <Form.Group className="mb-3">
                <Form.Label htmlFor="email" className=''>Email</Form.Label>
                <Form.Control className='' type="text" name="email" id="email" onChange={handleChange} value={inputs.email} placeholder="Enter email" />
              </Form.Group>
                                        
              <Form.Group className="mb-3">
                <Form.Label htmlFor="password" className=''>Password</Form.Label>
                <Form.Control className='' type="password" name="password" id="password" onChange={handleChange} value={inputs.password} placeholder="Password" />
              </Form.Group>
            </Col>
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
            // height: '100vh',
        }}
      />
    </>
  );
}

export default GeneralUsersMaintenance;