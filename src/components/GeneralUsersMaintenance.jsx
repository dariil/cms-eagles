import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Image } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import { DownOutlined } from '@ant-design/icons';
import { Radio, Space, Switch, Table, Divider, message, ConfigProvider } from 'antd';
import { useParams } from 'react-router-dom';
import { Input } from 'antd';
import { Button, Modal, notification } from 'antd';
import {
  SmileOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined
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
    const [modalText, setModalText] = useState('Content of the modal');
    const [inputs, setInputs] = useState({ access_level: '0' });
    const navigate = useNavigate();
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
          dataIndex: 'club_id',
      },
      {
          title: 'Date Created',
          dataIndex: 'date_created',
      },
      {
        title: 'Action',
        // key: 'action',
        // sorter: true,
        render: () => (
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
                <Button type='primary' className='action-del1' size='middle' icon={<DeleteOutlined />}>
                    {/* <EditOutlined className='action-edit' /> */}
                </Button>
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
                <Button type='primary' className='action-edit1' size='middle' icon={<EditOutlined />}>
                    {/* <EditOutlined className='action-edit' /> */}
                </Button>
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
                <Button type='primary' className='action-view1' size='middle' icon={<EyeOutlined />}>
                    {/* <EyeOutlined className='action-view' /> */}
                </Button>
            </ConfigProvider>
          </Space>
        ),
      },
  ]

  const { Search } = Input;
  const onSearch = (value) => {
    if (value.trim() === '') {

        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/getUsers/0`);
            setData(response.data);
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

  useEffect(() => {
      if(localStorage.getItem('user-info')){
          navigate('/admin')
      }
  }, []);

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
      // Display an error message or do something else to inform the user
      console.log(`Please fill in the following fields: ${emptyFields.join(', ')}`);
      error();
      return;
    }

    setConfirmLoading(true);

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/addUser', inputs);
        console.log(response.data);
        // localStorage.setItem("user-info", JSON.stringify(response.data));
        
    } catch (error) {
        console.error('Error registering:', error);
        // Handle error here if needed
    } finally {
      setConfirmLoading(false);
      setOpen(false);
      navigate('/admin/general-users');
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
      openNotification();
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

      if (accessLevel) {
        fetchData();
      }
    }
  }
  return (
    <>
      {contextHolder}
      {contextHolderMsg}
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
                <Form.Control className='' type="text" name="email" id="email" onChange={handleChange} defaultValue='' value={inputs.email} placeholder="Enter email" />
              </Form.Group>
                                        
              <Form.Group className="mb-3">
                <Form.Label htmlFor="password" className=''>Password</Form.Label>
                <Form.Control className='' type="password" name="password" id="password" onChange={handleChange} defaultValue='' value={inputs.password} placeholder="Password" />
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