import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Radio, Space, Table, ConfigProvider, message, Upload } from 'antd';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Image, Select, Popconfirm, Tag } from 'antd';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import moment from 'moment';
import {
    EditOutlined,
    EyeOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    PrinterOutlined,
    MinusCircleOutlined,
    DownOutlined,
} from '@ant-design/icons';
  
// HANDLE IMAGE PREVIEW
const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

function GeneralMemberApplicationsMaintenance(){

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

  // ADD COMPONENTS
  const [confirmLoading, setConfirmLoading] = useState(false);

  //HANDLE FORM DATA
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    dateOfBirth: null,
    height: '',
    weight: '',
    civil_status: '',
    citizenship: '',
    religion: '',
    bloodType: '',
    street_number: '',
    barangay: '',
    municipality: '',
    province: '',
    zip_code: '',
    cellphone_number: '',
    telephone_number: '',
    email: '',
    name_of_company: '',
    position: '',
    office_address: '',
    business_telephone_number: '',
    fax_number: '',
    spouse_name: '',
    spouse_date_of_birth: null,
    spouse_age: '',
    name_of_children: [],
    attended_elementary: '',
    year_graduated_elementary: null,
    attended_hs: '',
    year_graduated_hs: null,
    attended_college: '',
    year_graduated_college: null,
    course: '',
    hobbies: '',
    special_skills: '',
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
  const viewApplicationClick = (fileLink) => {
    // setOpenViewDrawer(true);
    const linkToFile = `http://127.0.0.1:8000/${fileLink}`;
    const trimmedFileLink = linkToFile.replace("magiting_laguna/", "");
    window.open(`${trimmedFileLink}`, '_blank');
  }

  //UPLOAD HANDLING COMPONENTS
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [applicantImage, setApplicantImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length > 0) {
        const file = newFileList[0].originFileObj;
        const base64 = await getBase64(file);
        // setPreviewImage(base64);
        setApplicantImage(base64);
    }
}
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
                onConfirm={() => archiveConfirm(record.member_application_id)}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: 'red',
                    }}
                  />
                }
              >
                <Button type='primary' className='action-del1' size='medium' icon={<DownOutlined />}></Button>
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
            <Button type='primary' onClick={() => showDrawer(record.member_application_id)} className='action-edit1' size='medium' icon={<EditOutlined />}>
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
  const archiveConfirm = async (applicationID) => {
    setSelectedApplicationID(applicationID);
    await axios.post('http://localhost:8000/api/archiveMemberApplication/'+applicationID).then(function(response){
            console.log(response.data);
            message.success(response.data.messages.message);
    });

    const fetchData = async () => {
      if (clubId !== null) {
        console.log(`Fetching data for clubId: ${clubId}`);
        try {
          setLoading(true);
          const response = await axios.get(`http://127.0.0.1:8000/api/getMemberApplications/${clubId}`);
          const applicant = response.data.map((applicant) => ({
            ...applicant,
            // created_at: projects.created_at.split('T')[0],
            // updated_at: projects.updated_at.split('T')[0]
          }));
          setData(applicant);
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
          const response = await axios.get(`http://127.0.0.1:8000/api/getMemberApplications/${clubId}`);
          const applicant = response.data.map((applicant) => ({
            ...applicant,
          }));
          setData(applicant);
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
            const response = await axios.get(`http://127.0.0.1:8000/api/getMemberApplications/${clubId}`);
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
        key: item.member_application_id,
      }));
      setData(dataWithKeys);
    }
  };

  const dataWithKeys = data.map((item) => ({
    ...item,
    key: item.member_application_id,
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

  // EDIT COMPONENTS (KILL ME PLEASE THIS IS EXTREMELY HARD TO HANDLE)
  const customizeRequiredMark = (label, { required }) => (
    <>
        {required ? <Tag color="warning">Required</Tag> : <Tag color="orange">Optional</Tag>}
        {label}
    </>
  );

  const [requiredMark, setRequiredMarkType] = useState('customize');

  const dateOfBirthOnChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleInputChange = (changedValues) => {
    setFormData((prevData) => ({
      ...prevData,
      ...changedValues,
    }));
};

  const handleEditFinish = async (values) => {
      try {
          const pdfBytes = await generatePDF(values, applicantImage);
          const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
          // const values = await formRef.current.validateFields();
          const Formdata = new FormData();
          Formdata.append('firstname', values.firstname);
          Formdata.append('middlename', values.middlename);
          Formdata.append('lastname', values.lastname);
        //   Formdata.append('email', values.email);
          Formdata.append('number', values.cellphone_number);
          Formdata.append('application_file', pdfBlob);
          Formdata.append('club_id', clubId);
          Formdata.append('position', values.position);

          // Perform API call
          const response = await fetch(`http://127.0.0.1:8000/api/updateMemberApplication/${selectedApplicationID}`, {
              method: 'POST',
              body: Formdata,
          });

          const data = await response.json();

          if (response.ok) {
              message.success(data.messages.message);

              const fetchData = async () => {
                if (clubId !== null) {
                  console.log(`Fetching data for clubId: ${clubId}`);
                  try {
                    setLoading(true);
                    const response = await axios.get(`http://127.0.0.1:8000/api/getMemberApplications/${clubId}`);
                    const applicant = response.data.map((applicant) => ({
                      ...applicant,
                      // created_at: projects.created_at.split('T')[0],
                      // updated_at: projects.updated_at.split('T')[0]
                    }));
                    setData(applicant);
                    setLoading(false);
                  } catch (error) {
                    console.error('Error: ', error);
                    setLoading(false);
                  }
                }
              };
          
              fetchData();

              formRef.current.resetFields();
              setFileList([]);
              setOpen(false);
          } else {
              message.error(data.messages.message);
              formRef.current.resetFields();
          }
      } catch (error) {
          console.error('Error generating PDF:', error);
          message.error('Failed to edit application form.');
      }
  };

  const generatePDF = async (data, imageBase64) => {
    const linkToFile = `http://127.0.0.1:8000/api/getMemberPdf/${selectedApplicationID}`;
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

        let image;
        if (imageBase64) {
            if (imageBase64.startsWith('data:image/png')) {
                image = await pdfDoc.embedPng(imageBase64);
            } else if (imageBase64.startsWith('data:image/jpeg') || imageBase64.startsWith('data:image/jpg')) {
                image = await pdfDoc.embedJpg(imageBase64);
            } else {
                throw new Error('Unsupported image format');
            }

            const pngDims = image.scale(1);

            // Draw the image at a specific location on the page (e.g., top-right corner)
            firstPage.drawImage(image, {
                x: 230,
                y: 485,
                width: 2 * 72, // 2 inches in points (1 inch = 72 points)
                height: 2 * 72,
            });
          }

        // Populate PDF form fields
        form.getTextField('first_name').setText(data.firstname);
            form.getTextField('middle_name').setText(data.middlename);
            form.getTextField('last_name').setText(data.lastname);
        
            // Example for date fields, adjust as per your DatePicker implementation
            if (data.dateOfBirth) {
                form.getTextField('date_of_birth').setText(data.dateOfBirth.format('MM/DD/YYYY'));
            }

            form.getTextField('height').setText(data.height);
            form.getTextField('weight').setText(data.weight);
        
            // Handle Radio.Group field
            form.getTextField('religion').setText(data.religion);
            form.getTextField('blood_type').setText(data.bloodType);
        
            form.getTextField('address').setText(data.complete_address);
            form.getTextField('contact_number').setText(data.cellphone_number);
            form.getTextField('name_icoe').setText(data.name_of_contact_person);
            form.getTextField('contact_num_icoe').setText(data.number_of_contact_person);
            form.getTextField('sss_number').setText(data.sss_num);
            form.getTextField('philhealth_number').setText(data.philhealth_num);
            form.getTextField('pagibig_number').setText(data.pagibig_num);
            form.getTextField('tin_number').setText(data.tin_num);
            form.getTextField('region').setText(data.club_region);
            form.getTextField('chartered_governor_name').setText(data.chartered_governor);
            form.getTextField('member_control_number').setText(data.member_control_number);
            form.getTextField('position').setText(data.position);
            const currentYear = new Date().getFullYear();
            form.getTextField('chartered_governor_ey').setText(currentYear.toString());
    
        // Save PDF and return bytes
        const pdfBytes = await pdfDoc.save();
        return pdfBytes;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};



  //GET DEFAULT TEXTS
  const [isLoading, setIsLoading] = useState(false);
  const [selectedApplicationID, setSelectedApplicationID] = useState(null);
  const { Option } = Select;
  const [open, setOpen] = useState(false);
  const [defaultFirstName, setDefaultFirstName] = useState("");
  const [defaultMiddleName, setDefaultMiddleName] = useState("");
  const [defaultLastName, setDefaultLastName] = useState("");
  const [defaultBirthDate, setDefaultBirthDate] = useState("");
  const [defaultHeight, setDefaultHeight] = useState("");
  const [defaultWeight, setDefaultWeight] = useState("");
  const [defaultReligion, setDefaultReligion] = useState("");
  const [defaultBloodType, setDefaultBloodType] = useState("");
  const [defaultCellphoneNumber, setDefaultCellphoneNumber] = useState("");
  const [defaultCompleteAddress, setDefaultCompleteAddress] = useState("");
  const [defaultEmail, setDefaultEmail] = useState("");
  const [defaultSSSNum, setDefaultSSSNum] = useState("");
  const [defaultPhilHealthNum, setDefaultPhilHealthNum] = useState("");
  const [defaultPagibigNum, setDefaultPagibigNum] = useState("");
  const [defaultTinNum, setDefaultTinNum] = useState("");
  const [defaultNameOfContactPerson, setDefaultNameOfContactPerson] = useState("");
  const [defaultNumberOfContactPerson, setDefaultNumberOfContactPerson] = useState("");
  const [defaultClubRegion, setDefaultClubRegion] = useState("");
  const [defaultCharteredGovernor, setDefaultCharteredGovernor] = useState("");
  const [defaultMemberControlNumber, setDefaultMemberControlNumber] = useState("");
  const [defaultPosition, setDefaultPosition] = useState("");

  const showDrawer = async (applicationID) => {
    setIsLoading(true);
    const fetchData = async () => {
      const result = await axios.get("http://127.0.0.1:8000/api/getOneMemberApplication/" + applicationID);
      setSelectedApplicationID(applicationID);
      const application = result.data;
      const applicationFile = application.map(application_data => application_data.application_file);
      const trimAppLink = applicationFile[0].replace("magiting_laguna", "");
      console.log(trimAppLink);

      const linkToFile = `http://127.0.0.1:8000/api/getMemberPdf/${applicationID}`;

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
        setDefaultMiddleName(form.getTextField('middle_name').getText());
        setDefaultLastName(form.getTextField('last_name').getText());
        setDefaultBirthDate(form.getTextField('date_of_birth').getText());
        setDefaultWeight(form.getTextField('weight').getText());
        setDefaultHeight(form.getTextField('height').getText());
        setDefaultReligion(form.getTextField('religion').getText());
        setDefaultBloodType(form.getTextField('blood_type').getText());
        setDefaultCompleteAddress(form.getTextField('address').getText());
        setDefaultCellphoneNumber(form.getTextField('contact_number').getText());
        setDefaultSSSNum(form.getTextField('sss_number').getText());
        setDefaultPhilHealthNum(form.getTextField('philhealth_number').getText());
        setDefaultPagibigNum(form.getTextField('pagibig_number').getText());
        setDefaultTinNum(form.getTextField('tin_number').getText());
        setDefaultNameOfContactPerson(form.getTextField('name_icoe').getText());
        setDefaultNumberOfContactPerson(form.getTextField('contact_num_icoe').getText());
        setDefaultClubRegion(form.getTextField('region').getText());
        setDefaultCharteredGovernor(form.getTextField('chartered_governor_name').getText());
        setDefaultMemberControlNumber(form.getTextField('member_control_number').getText());
        setDefaultPosition(form.getTextField('position').getText());
        // setDefaultEmail(form.getTextField('email').getText());

      } catch (error) {
        console.error("Error fetching PDF:", error);
      } finally {
        setIsLoading(false);
      }
    }
     fetchData();
     setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Drawer
        title="Edit Applicant Details"
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
        <Form layout="vertical"
                        initialValues={{
                            requiredMarkValue: requiredMark,
                            firstname: defaultFirstName,
                            middlename: defaultMiddleName,
                            lastname: defaultLastName,
                            dateOfBirth: moment(defaultBirthDate, 'MM/DD/YYYY'),
                            height: defaultHeight,
                            weight: defaultWeight,
                            religion: defaultReligion,
                            bloodType: defaultBloodType,
                            complete_address: defaultCompleteAddress,
                            cellphone_number: defaultCellphoneNumber,
                            sss_num: defaultSSSNum,
                            philhealth_num: defaultPhilHealthNum,
                            pagibig_num: defaultPagibigNum,
                            tin_num: defaultTinNum,
                            name_of_contact_person: defaultNameOfContactPerson,
                            number_of_contact_person: defaultNumberOfContactPerson,
                            club_region: defaultClubRegion,
                            chartered_governor: defaultCharteredGovernor,
                            member_control_number: defaultMemberControlNumber,
                            position: defaultPosition,
                          }}
                        requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}  
                        onFinish={handleEditFinish}
                        onValuesChange={handleInputChange}
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

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="sss_num"
                                        label="GSIS/SSS"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your GSIS/SSS',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your GSIS/SSS" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="philhealth_num"
                                        label="PhilHealth"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your PhilHealth',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your PhilHealth" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="pagibig_num"
                                        label="PAG-IBIG"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your PAG-IBIG',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your PAG-IBIG" />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="tin_num"
                                        label="Tin"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your Tin',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter your PAG-IBIG" />
                                    </Form.Item>
                                </div>
                                <br></br>
                                <h3>Address</h3>
                                <div className=''>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="complete_address"
                                        label="Complete Address"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the complete address',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the complete address" />
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
                                {/*
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
                                    </Form.Item> */}
                                </div> 
                                <br></br>
                                <h3>Contact Person In Case of Emergency</h3>
                                <div>
                                <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="name_of_contact_person"
                                        label="Name of contact person"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the name of contact person',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the name of contact person." />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="number_of_contact_person"
                                        label="Mobile Number"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the number of contact person',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the number of contact person" />
                                    </Form.Item>
                                </div>
                                <br></br>
                                <h3>Other Club Information</h3>
                                <div>
                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="club_region"
                                        label="Club Region"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the region of club you belong to.',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the region of club you belong to." />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="chartered_governor"
                                        label="Chartered Governor"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter the name of your club\'s chartered governor.',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter the name of your club\'s chartered governor." />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="member_control_number"
                                        label="Member Control Number"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your control number.',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter enter your control number." />
                                    </Form.Item>

                                    <Form.Item
                                        tooltip="This is a required field"
                                        className='form-item-snap-1'
                                        name="position"
                                        label="Position"
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please enter your position.',
                                            },
                                        ]}
                                    >
                                        <Input name="title" placeholder="Enter enter your position." />
                                    </Form.Item>
                                </div>
                                
                                <Form.Item
                                name={"2_by_2"}
                                valuePropName='fileList'
                                getValueFromEvent={(event)=>{
                                    return event?.fileList;
                                }}
                                label="2x2 Picture"
                                rules={[
                                    {
                                    required: false,
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
                                    Update
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

export default GeneralMemberApplicationsMaintenance;