import React from "react";
import { Form, Input, Button, Row, Col,Typography ,message } from "antd";
import { useNavigate } from "react-router-dom";
import bhh27Icon from '../assets/img/BHH27icon.png'
import gw from '../assets/img/gw.png'
import FooterComponent from "../components/FooterComponent";

// import Cookies from 'js-cookie';
// import Isicon from './../image/01-logo-full.png' 
const {Text,Title} = Typography;



const formatDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month is zero-based
    const year = currentDate.getFullYear();
  
    // Pad single-digit day or month with leading zero
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

export default function Login() {

    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const username ='admin'
    const password = 'password'
    const onFinish = async (data)=>{
       if(data.username == username && data.password == password){
            navigate('/admin');
            localStorage.setItem('userdata','admin');
       }
    }

    const warning = () => {
        messageApi.open({
          type: 'warning',
          content: 'ชื่อผู้ใช้หรือรหัสผ่านผิดพลาด',
        });
      };

  return (
    <>
        {contextHolder}
        <div 
            // style={{height:'100vh',width:'100%'}} 
            className=' bg-white text-black w-full min-h-screen flex items-center justify-start flex-col gap-2  ' 
        >
        <Row>
            <Col span={24} style={{display:'flex',justifyContent:'center',marginTop:'5%'}} >
                {/* <img src={Isicon} style={{borderRadius:'20px',width:'450px',transform:'translate(10px, 40%)'}}  /> */}
                <div className="icon-set flex gap-5 w-full items-center justify-center "> 
                    <div className="w-full max-w-[120px]">
                        <img src={bhh27Icon} className='object-contain w-full h-full mt-4 mb-4' alt="bhh27icon" />
                    </div>
                    <div className="w-full max-w-[120px]">
                        <img src={gw} className='object-contain mt-4 mb-4' alt="bhh27icon" />
                    </div>
                </div>
            </Col>
            {/* <Col span={24} style={{display:'flex',justifyContent:'center',marginTop:'2%'}} >
                <Title level={2} >
                    Login
                </Title>
            </Col> */}
            <Col span={24} style={{display:'flex',justifyContent:'center',transform:'translate(0px, 40%)'}} >
                <Form
                    name="login-form"
                    onFinish={onFinish}
                    labelCol={{ span: 6 }}
                    // wrapperCol={{ span: 16 }}
                    style={{width:'500px'}}
                    form={form}
                    layout="vertical"
                    
                >
                    <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                        required: true,
                        message: "Please input your username!",
                        },
                    ]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: "Please input your password!",
                        },
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
                    <Button type="primary" htmlType="submit" shape="round" style={{width:'70%',marginTop:'20px'}} >
                        Login
                    </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={24}  >

                </Col>      
        </Row>
        </div>
        <div 
            style={{
                // position: 'fixed',
                // bottom: 10,
                // left: '50%',
                // transform: 'translateX(-50%)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
                
            }}
            className="bg-white"
        >
            <FooterComponent />
        </div>
    </>
  );
}
