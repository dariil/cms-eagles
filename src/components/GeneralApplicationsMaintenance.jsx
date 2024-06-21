import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Radio, Space, Switch, Table, ConfigProvider, Divider, message, Upload } from 'antd';
import { Button, Col, DatePicker, Drawer, Form, Modal, Input, Row, Image, Select, Popconfirm, Tag, notification } from 'antd';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import moment from 'moment';
import {
    SmileOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    InboxOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    PrinterOutlined,
    MinusCircleOutlined,
} from '@ant-design/icons';
import About from './About';
  
// HANDLE IMAGE PREVIEW
const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

function GeneralApplicationsMaintenance(){

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
  const viewApplicationClick = (fileLink) => {
    // setOpenViewDrawer(true);
    const linkToFile = `http://127.0.0.1:8000/${fileLink}`;
    const trimmedFileLink = linkToFile.replace("magiting_laguna/", "");
    window.open(`${trimmedFileLink}`, '_blank');
  }

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
      title: 'First Name',
      dataIndex: 'firstname',
    },
    {
      title: 'Middle Name',
      dataIndex: 'middlename',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastname',
    },
    {
        title: 'Mobile Number',
        dataIndex: 'number',
    },
    {
        title: 'Email',
        dataIndex: 'email',
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
                onConfirm={() => deleteConfirm(record.application_id)}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: 'red',
                    }}
                  />
                }
              >
                <Button type='primary' className='action-del1' size='medium' icon={<DeleteOutlined />}>
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
            <Button type='primary' onClick={() => showDrawer(record.application_id)} className='action-edit1' size='medium' icon={<EditOutlined />}>
              {/* <EditOutlined className='action-edit' /> */}
            </Button>
          </ConfigProvider>

          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimaryHover: '#F2C18D',
                }
              }
            }}
          >
            <Button type='primary' className='action-print1' size='medium' icon={<PrinterOutlined />}>
              {/* <EyeOutlined className='action-view' /> */}
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
            <Button type='primary'  onClick={() => viewApplicationClick(record.application_file)} className='action-view1' size='medium' icon={<EyeOutlined />}>
              {/* <EyeOutlined className='action-view' /> */}
            </Button>
          </ConfigProvider>

        </Space>
      ),
    },
  ]

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
          const response = await axios.get(`http://127.0.0.1:8000/api/getApplications/${clubId}`);
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
          const response = await axios.get(`http://127.0.0.1:8000/api/getApplications/${clubId}`);
          const officer = response.data.map((officer) => ({
            ...officer,
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
            const response = await axios.get(`http://127.0.0.1:8000/api/getApplications/${clubId}`);
            const applicants = response.data.map((applicants) => ({
              ...applicants,
            }));
            setData(applicants);
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
        key: item.application_id,
      }));
      setData(dataWithKeys);
    }
  };

  const dataWithKeys = data.map((item) => ({
    ...item,
    key: item.application_id,
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
      formData.append('official_name', values.official_name);
      formData.append('official_position', values.official_position);
      formData.append('official_image', fileList[0]?.originFileObj);
      formData.append('official_description', values.official_description);
  
      const response = await fetch(`http://127.0.0.1:8000/api/updateOfficer/${selectedOfficerId}?_method=POST`, {
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
              const response = await axios.get(`http://127.0.0.1:8000/api/getApplications/${clubId}`);
              const applicants = response.data.map((applicants) => ({
                ...applicants,
              }));
              setData(applicants);
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
      message.error('Failed to update officer.');
    }
  };  

  // EDIT COMPONENTS (KILL ME PLEASE THIS IS EXTREMELY HARD TO HANDLE)
  const customizeRequiredMark = (label, { required }) => (
    <>
        {required ? <Tag color="warning">Required</Tag> : <Tag color="orange">Optional</Tag>}
        {label}
    </>
  );

  const [requiredMark, setRequiredMarkType] = useState('customize');

  const handleInputChange = (changedValues) => {
    setFormData((prevData) => ({
      ...prevData,
      ...changedValues,
    }));
  };

  const dateOfBirthOnChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleEditFinish = async (values) => {
      try {
          const pdfBytes = await generatePDF(values, previewImage);
          const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
          // const values = await formRef.current.validateFields();
          const Formdata = new FormData();
          Formdata.append('firstname', formData.firstname);
          Formdata.append('middlename', formData.middlename);
          Formdata.append('lastname', formData.lastname);
          Formdata.append('email', formData.email);
          Formdata.append('number', formData.cellphone_number);
          Formdata.append('application_file', pdfBlob);
          Formdata.append('club_id', 0);

          // Perform API call
          const response = await fetch(`http://127.0.0.1:8000/api/addApplication`, {
              method: 'POST',
              body: Formdata,
          });

          const data = await response.json();

          saveAs(pdfBlob, `${formData.lastname}_Application_File`);

          if (response.ok) {
              message.success(data.messages.message);
              // formRef.current.resetFields();
              setFileList([]);
          } else {
              message.error(data.messages.message);
          }
          // formRef.current.resetFields();
      } catch (error) {
          console.error('Error generating PDF:', error);
          message.error('Failed to generate PDF.');
      }
  };



  //GET DEFAULT TEXTS
  const [selectedApplicationID, setSelectedApplicationID] = useState(null);
  const { Option } = Select;
  const [open, setOpen] = useState(false);
  const [defaultFirstName, setDefaultFirstName] = useState("");
  const [defaultNickName, setDefaultNickName] = useState("");
  const [defaultMiddleName, setDefaultMiddleName] = useState("");
  const [defaultLastName, setDefaultLastName] = useState("");
  const [defaultBirthplace, setDefaultBirthPlace] = useState("");
  const [defaultBirthDate, setDefaultBirthDate] = useState("");
  const [defaultHeight, setDefaultHeight] = useState("");
  const [defaultWeight, setDefaultWeight] = useState("");
  const [defaultCivilStatus, setDefaultCivilStatus] = useState("");
  const [defaultCitizenship, setDefaultCitizenship] = useState("");
  const [defaultReligion, setDefaultReligion] = useState("");
  const [defaultBloodType, setDefaultBloodType] = useState("");
  const [defaultStreetNumber, setDefaultStreetNumber] = useState("");
  const [defaultBarangay, setDefaultBarangay] = useState("");
  const [defaultMunicipality, setDefaultMunicipality] = useState("");
  const [defaultProvince, setDefaultProvince] = useState("");
  const [defaultZipCode, setDefaultZipCode] = useState("");
  const [defaultCellphoneNumber, setDefaultCellphoneNumber] = useState("");
  const [defaultTelephoneNumber, setDefaultTelephoneNumber] = useState("");
  const [defaultEmail, setDefaultEmail] = useState("");
  const [defaultCompanyName, setDefaultCompanyName] = useState("");
  const [defaultPosition, setDefaultPosition] = useState("");
  const [defaultCompanyAddress, setDefaultCompanyAddress] = useState("");
  const [defaultCompanyTelephoneNumber, setDefaultCompanyTelephoneNumber] = useState("");
  const [defaultCompanyFaxNumber, setDefaultCompanyFaxNumber] = useState("");
  const [defaultSpouseName, setDefaultSpouseName] = useState("");
  const [defaultSpouseBirthDate, setDefaultSpouseBirthDate] = useState("");
  const [defaultSpouseAge, setDefaultSpouseAge] = useState("");
  const [defaultDependents, setDefaultDependents] = useState(null);
  const [defaultElementarySchool, setDefaultElementarySchool] = useState("");
  const [defaultHighSchool, setDefaultHighSchool] = useState("");
  const [defaultCollege, setDefaultCollege] = useState("");
  const [defaultElementaryYear, setDefaultElementaryYear] = useState("");
  const [defaultHSYear, setDefaultHSYear] = useState("");
  const [defaultCollegeYear, setDefaultCollegeYear] = useState("");
  const [defaultCollegeCourse, setDefaultCollegeCourse] = useState("");
  const [defaultHobbies, setDefaultHobbies] = useState("");
  const [defaultSpecialSkills, setDefaultSpecialSkills] = useState("");

  const showDrawer = (applicationID) => {
    const fetchData = async () => {
      const result = await axios.get("http://127.0.0.1:8000/api/getOneApplication/" + applicationID);
      const application = result.data;
      const applicationFile = application.map(application_data => application_data.application_file);
      const trimAppLink = applicationFile[0].replace("magiting_laguna", "");
      console.log(trimAppLink);

      const linkToFile = `http://127.0.0.1:8000/api/get-pdf/${applicationID}`;

      try {
        const response = await fetch(linkToFile);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const existingPdfBytes = await response.arrayBuffer();
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const form = pdfDoc.getForm();
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        const dependentsData = [];

        setDefaultFirstName(form.getTextField('first_name').getText());
        setDefaultNickName(form.getTextField('nickname').getText());
        setDefaultMiddleName(form.getTextField('middle_name').getText());
        setDefaultLastName(form.getTextField('last_name').getText());
        setDefaultBirthPlace(form.getTextField('birthplace').getText());
        setDefaultBirthDate(form.getTextField('birthdate').getText());
        setDefaultWeight(form.getTextField('weight').getText());
        setDefaultHeight(form.getTextField('height').getText());
        setDefaultCivilStatus(form.getRadioGroup('civil_status').getSelected());
        setDefaultCitizenship(form.getTextField('citizenship').getText());
        setDefaultReligion(form.getTextField('religion').getText());
        setDefaultBloodType(form.getTextField('blood_type').getText());
        setDefaultStreetNumber(form.getTextField('street_number').getText());
        setDefaultBarangay(form.getTextField('barangay').getText());
        setDefaultMunicipality(form.getTextField('municipality').getText());
        setDefaultProvince(form.getTextField('province').getText());
        setDefaultZipCode(form.getTextField('zip_code').getText());
        setDefaultCellphoneNumber(form.getTextField('cellphone_number').getText());
        setDefaultTelephoneNumber(form.getTextField('telephone_number').getText());
        setDefaultEmail(form.getTextField('email').getText());
        setDefaultCompanyName(form.getTextField('name_of_company').getText());
        setDefaultPosition(form.getTextField('position').getText());
        setDefaultCompanyAddress(form.getTextField('company_address').getText());
        setDefaultCompanyTelephoneNumber(form.getTextField('company_telephone_number').getText());
        setDefaultCompanyFaxNumber(form.getTextField('fax_number').getText());
        setDefaultSpouseName(form.getTextField('spouse_name').getText());
        setDefaultSpouseBirthDate(form.getTextField('spouse_birthdate').getText());
        setDefaultSpouseAge(form.getTextField('spouse_age').getText());

        const dependent1Name = form.getTextField('dependent1_name').getText();
        const dependent1Birthdate = form.getTextField('dependent1_birthdate').getText();
        const dependent1Age = form.getTextField('dependent1_age').getText();

        if (dependent1Name || dependent1Birthdate || dependent1Age) {
          dependentsData.push({
            name_of_dependent: dependent1Name,
            birth_date_of_dependent: dependent1Birthdate ? moment(dependent1Birthdate, 'MM/DD/YYYY') : null,
            age_of_dependent: dependent1Age,
          });
        }

        const dependent2Name = form.getTextField('dependent2_name').getText();
        const dependent2Birthdate = form.getTextField('dependent2_birthdate').getText();
        const dependent2Age = form.getTextField('dependent2_age').getText();

        if (dependent2Name || dependent2Birthdate || dependent2Age) {
          dependentsData.push({
            name_of_dependent: dependent2Name,
            birth_date_of_dependent: dependent2Birthdate ? moment(dependent2Birthdate, 'MM/DD/YYYY') : null,
            age_of_dependent: dependent2Age,
          });
        }

        const dependent3Name = form.getTextField('dependent3_name').getText();
        const dependent3Birthdate = form.getTextField('dependent3_birthdate').getText();
        const dependent3Age = form.getTextField('dependent3_age').getText();

        if (dependent3Name || dependent3Birthdate || dependent3Age) {
          dependentsData.push({
            name_of_dependent: dependent3Name,
            birth_date_of_dependent: dependent3Birthdate ? moment(dependent3Birthdate, 'MM/DD/YYYY') : null,
            age_of_dependent: dependent3Age,
          });
        }

        const dependent4Name = form.getTextField('dependent4_name').getText();
        const dependent4Birthdate = form.getTextField('dependent4_birthdate').getText();
        const dependent4Age = form.getTextField('dependent4_age').getText();

        if (dependent4Name || dependent4Birthdate || dependent4Age) {
          dependentsData.push({
            name_of_dependent: dependent4Name,
            birth_date_of_dependent: dependent4Birthdate ? moment(dependent4Birthdate, 'MM/DD/YYYY') : null,
            age_of_dependent: dependent4Age,
          });
        }

        const dependent5Name = form.getTextField('dependent5_name').getText();
        const dependent5Birthdate = form.getTextField('dependent5_birthdate').getText();
        const dependent5Age = form.getTextField('dependent5_age').getText();

        if (dependent5Name || dependent5Birthdate || dependent5Age) {
          dependentsData.push({
            name_of_dependent: dependent5Name,
            birth_date_of_dependent: dependent5Birthdate ? moment(dependent5Birthdate, 'MM/DD/YYYY') : null,
            age_of_dependent: dependent5Age,
          });
        }

        const dependent6Name = form.getTextField('dependent6_name').getText();
        const dependent6Birthdate = form.getTextField('dependent6_birthdate').getText();
        const dependent6Age = form.getTextField('dependent6_age').getText();

        if (dependent6Name || dependent6Birthdate || dependent6Age) {
          dependentsData.push({
            name_of_dependent: dependent6Name,
            birth_date_of_dependent: dependent6Birthdate ? moment(dependent6Birthdate, 'MM/DD/YYYY') : null,
            age_of_dependent: dependent6Age,
          });
        }

        setDefaultDependents(dependentsData);

        setDefaultElementarySchool(form.getTextField('elementary').getText());
        setDefaultElementaryYear(form.getTextField('elementary_year').getText());
        setDefaultHighSchool(form.getTextField('high_school').getText());
        setDefaultHSYear(form.getTextField('hs_year').getText());
        setDefaultCollege(form.getTextField('college').getText());
        setDefaultCollegeYear(form.getTextField('college_year').getText())
        setDefaultCollegeCourse(form.getTextField('course').getText());
        setDefaultHobbies(form.getTextField('hobbies').getText());
        setDefaultSpecialSkills(form.getTextField('special_skills').getText());

        setOpen(true);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    }
    fetchData();
  };
  const onClose = () => {
    setOpen(false);
    setOpenViewDrawer(false);
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
        title="Edit Applicant Details"
        width={500}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form layout="vertical"
                        initialValues={{
                            requiredMarkValue: requiredMark,
                            firstname: defaultFirstName,
                            nickname: defaultNickName,
                            middlename: defaultMiddleName,
                            lastname: defaultLastName,
                            birthplace: defaultBirthplace,
                            dateOfBirth: moment(defaultBirthDate, 'MM/DD/YYYY'),
                            height: defaultHeight,
                            weight: defaultWeight,
                            civil_status: defaultCivilStatus,
                            citizenship: defaultCitizenship,
                            religion: defaultReligion,
                            bloodType: defaultBloodType,
                            street_number: defaultStreetNumber,
                            barangay: defaultBarangay,
                            municipality: defaultMunicipality,
                            province: defaultProvince,
                            zip_code: defaultZipCode,
                            cellphone_number: defaultCellphoneNumber,
                            telephone_number: defaultTelephoneNumber,
                            email: defaultEmail,
                            name_of_company: defaultCompanyName,
                            position: defaultPosition,
                            office_address: defaultCompanyAddress,
                            business_telephone_number: defaultCompanyTelephoneNumber,
                            fax_number: defaultCompanyFaxNumber,
                            spouse_name: defaultSpouseName,
                            spouse_date_of_birth: moment(defaultSpouseBirthDate, 'MM/DD/YYYY'),
                            spouse_age: defaultSpouseAge,
                            name_of_children: defaultDependents,
                            attended_elementary: defaultElementarySchool,
                            year_graduated_elementary: moment(defaultElementaryYear, 'YYYY'),
                            attended_hs: defaultHighSchool,
                            year_graduated_hs: moment(defaultHSYear, 'YYYY'),
                            attended_college: defaultCollege,
                            year_graduated_college: moment(defaultCollegeYear, 'YYYY'),
                            course: defaultCollegeCourse,
                            hobbies: defaultHobbies,
                            special_skills: defaultSpecialSkills,
                          }}
                        requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}  
                        onFinish={handleEditFinish}
                        // onValuesChange={handleInputChange}
                        ref={formRef}
                    >
                        <div className=''>
                            <Col span={24}>
                                <h3>Personal Information</h3>
                                <br></br>
                                <div className=''>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="firstname"
                                        label="First name"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your first name',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your first name" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="nickname"
                                        label="Nickname"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your nickname',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your nickname" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="middlename"
                                        label="Middle name"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your middle name',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your middle name" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="lastname"
                                        label="Last name"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your last name',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your last name" />
                                    </Form.Item>
                                    
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="birthplace"
                                        label="Birthplace"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your birthplace',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your birthplace" />
                                    </Form.Item>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="dateOfBirth"
                                        label="Date of Birth"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your date of birth',
                                            },
                                        ]}
                                    >
                                        <DatePicker onChange={dateOfBirthOnChange} />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="height"
                                        label="Height"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your height in feet',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your height" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="weight"
                                        label="Weight"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your weight in kilograms',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your weight" />
                                    </Form.Item>

                                    <Form.Item 
                                        className='form-item-snap-1'
                                        tooltip="This is a required field"
                                        label="Civil Status"
                                        name="civil_status"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please select your current civil status',
                                            },
                                        ]}
                                    >
                                        <Radio.Group>
                                        <Radio.Button value="single">Single</Radio.Button>
                                        <Radio.Button value="married">Married</Radio.Button>
                                        <Radio.Button value="separated">Separated</Radio.Button>
                                        <Radio.Button value="widowed">Widowed</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="citizenship"
                                        label="Citizenship"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your citizenship',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your citizenship" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="religion"
                                        label="Religion"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your religion',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your religion" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="bloodType"
                                        label="Blood Type"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please enter your blood type',
                                            },
                                        ]}
                                    >
                                        <Radio.Group>
                                            <Radio.Button value="O-">O-</Radio.Button>
                                            <Radio.Button value="O+">O+</Radio.Button>
                                            <Radio.Button value="A-">A-</Radio.Button>
                                            <Radio.Button value="A+">A+</Radio.Button>
                                            <Radio.Button value="B+">B+</Radio.Button>
                                            <Radio.Button value="B-">B-</Radio.Button>
                                            <Radio.Button value="AB-">AB-</Radio.Button>
                                            <Radio.Button value="AB+">AB+</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                                <br></br>
                                <h3>Address</h3>
                                <div className=''>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="street_number"
                                        label="Street Number"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your street number',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your street number" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="barangay"
                                        label="Barangay"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your barangay',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your barangay" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="municipality"
                                        label="Municipality/City"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your municipality/city',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your municipality/city" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="province"
                                        label="Province"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your province',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your province" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="zip_code"
                                        label="Zip Code"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your zip code',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your zip code" />
                                    </Form.Item>
                                </div>
                                <br></br>
                                <h3>Contact Information</h3>
                                <div className=''>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="cellphone_number"
                                        label="Cellphone Number"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your cell number',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your cell number" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="telephone_number"
                                        label="Telephone Number"
                                        rules={[
                                            {
                                            required: false,
                                            message: 'Please enter your telephone number',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your telephone number" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="email"
                                        label="Email"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your email',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your email" />
                                    </Form.Item>
                                </div>
                                <br></br>
                                <h3>Employment/Profession</h3>
                                <div className=''>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="name_of_company"
                                        label="Name of Office Line of Business"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your name of business',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your name of business" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="position"
                                        label="Position/Designation"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your title/designation',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your title/designation" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="office_address"
                                        label="Address"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter office address',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter office address" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="business_telephone_number"
                                        label="Telephone Number"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter business telephone number',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter business telephone number" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="fax_number"
                                        label="Fax Number"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter fax number',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter fax number" />
                                    </Form.Item>
                                </div>
                                <br></br>

                                <h3>List of Legal Dependents</h3>
                                <div className=''>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="spouse_name"
                                        label="Name of Spouse"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the name fo your spouse.',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the name of your spouse." />
                                    </Form.Item>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="spouse_date_of_birth"
                                        label="Spouse's Date of Birth"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your spouse\'s date of birth',
                                            },
                                        ]}
                                    >
                                        <DatePicker onChange={dateOfBirthOnChange} />
                                    </Form.Item>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="spouse_age"
                                        label="Age of Spouse"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the age of your spouse.',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the age of your spouse." />
                                    </Form.Item>
                                </div>
                                
                                <Form.List name="name_of_children">
                                    {(fields, { add, remove }) => (
                                        <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space
                                            key={key}
                                            style={{
                                                display: 'flex',
                                                marginBottom: 8,
                                            }}
                                            align="baseline"
                                            >
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'name_of_dependent']}
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing name',
                                                },
                                                ]}
                                            >
                                                <Input placeholder="Name" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'birth_date_of_dependent']}
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing date of birth',
                                                },
                                                ]}
                                            >
                                                <DatePicker onChange={dateOfBirthOnChange} />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'age_of_dependent']}
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing age',
                                                },
                                                ]}
                                            >
                                                <Input placeholder="Age" />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add field
                                            </Button>
                                        </Form.Item>
                                        </>
                                    )}
                                    </Form.List>
                                <br></br>

                                <h3>Educational Attainment</h3>
                                <div className=''>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="attended_elementary"
                                        label="Elementary"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the name of attended elementary school',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the name of attended elementary school" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="year_graduated_elementary"
                                        label="Year Graduated"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the year you graduated (elementary',
                                            },
                                        ]}
                                    >
                                        <DatePicker onChange={dateOfBirthOnChange} picker="year" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="attended_hs"
                                        label="High School"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the name of attended high school',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the name of attended high school" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="year_graduated_hs"
                                        label="Year Graduated"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the year you graduated (high school',
                                            },
                                        ]}
                                    >
                                        <DatePicker onChange={dateOfBirthOnChange} picker="year" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="attended_college"
                                        label="College"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the name of attended college',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the name of attended college" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="year_graduated_college"
                                        label="Year Graduated"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the year you graduated (college)',
                                            },
                                        ]}
                                    >
                                        <DatePicker onChange={dateOfBirthOnChange} picker="year" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="course"
                                        label="Course"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the name of your college course',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the name of your college course" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="hobbies"
                                        label="Hobbies"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your hobbies',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your hobbies" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="special_skills"
                                        label="Special Skills"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your special skills',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your special skills" />
                                    </Form.Item>
                                </div>
                                <br></br>

                                <Form.Item
                                name={"2_by_2"}
                                valuePropName='fileList'
                                getValueFromEvent={(event)=>{
                                    return event?.fileList;
                                }}
                                label="2x2 Picture"
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
                            <Row gutter={16} className=''>
                                <Col span={12}>
                                <Button htmlType='submit' type="primary">
                                    Register
                                </Button>
                                </Col>
                                <Col span={12}>
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

export default GeneralApplicationsMaintenance;