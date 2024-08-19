import { Card, Col, Form, Row ,Typography,Tabs,Button, Input, Radio ,Flex,InputNumber, Divider } from "antd";
import { useState } from "react";
import bhh27Icon from '../assets/img/BHH27icon.png'
import gw from '../assets/img/gw.png'
import FooterComponent from "../components/FooterComponent";
import bgimg from "../assets/img/Mesa de trabajo 1.png"
import Tree from "../components/Tree";
import treeimg from "../assets/img/forest/tree.svg";
const {Title} = Typography;
const {TextArea} = Input;
export default function DonateForm(){

    const [type,setType] =useState(0);
    const [allValues,setallvalue] =useState({});
    const [loadingform,setLoadingform] = useState(false);
    const [page,setPage] = useState(0);
    const [form] = Form.useForm();
    const api_url = import.meta.env.VITE_BASE_URL;



    const onFinish = async(values) => {
        var data = values;
        setLoadingform(true);
        if(values.organization_name == undefined){
            data.organization_name = ''
            data.organization_address = ''
            data.organization_phone = ''

        }
        const response = await fetch(api_url+'/form/insert/donate',{
            method:"POST",
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
           });

        if(response.status==200){
            form.resetFields();
            setLoadingform(false);
        }
    };

    // const FormType = ({ type }) => {
       
        
    //     const [allValues,setallvalue] =useState({});
    //     const onFormChange = (value) => {
    //        console.log(value)
    //     };
    
   
    
    //     return (
    //         <>
    //             <Form
    //                 form={form}
    //                 layout="vertical"
    //                 onFinish={onFinish}
    //                 initialValues={{
    //                     // donate_total: 0,
    //                 }}

    //                 onValuesChange={(changedValues, allValues) => {
    //                     setallvalue(allValues);
    //                   }}
    //                 style={{width:'90%'}}
    //                 >
    //                 {
    //                     type == 0
    //                     ?
    //                     <>
    //                         <Form.Item
    //                             name="organization_name"
    //                             label="ชื่อองค์กร"
    //                             rules={[{ required: true, message: 'Please input the organization name!' }]}
    //                         >
    //                             <Input />
    //                         </Form.Item>

    //                         <Form.Item
    //                             name="organization_address"
    //                             label="ที่อยู่องค์กร(เพื่อออกจดหมายขอบคุณ) "
    //                             rules={[{ required: true, message: 'Please input the organization address!' }]}
    //                         >
    //                             <Input />
    //                         </Form.Item>

    //                         <Form.Item
    //                             name="organization_phone"
    //                             label="หมายเลขโทรศัพท์องค์กร"
    //                             rules={[{ required: true, message: 'Please input the organization phone number!' }]}
    //                         >
    //                             <Input />
    //                         </Form.Item>
    //                         </>
    //                     : null
    //                 }


    //                 <Form.Item
    //                     name="contact_name"
    //                     label={type == 1 ?'ชื่อ-สกุลผู้ประสานงาน': 'ชื่อ-สกุล'}
    //                     rules={[{ required: true, message: 'Please input the contact name!' }]}
    //                 >
    //                     <Input />
    //                 </Form.Item>

    //                 <Form.Item
    //                     name="contact_phone"
    //                     label={type == 1 ?'หมายเลขโทรศัพท์ผู้ประสานงาน': 'หมายเลขโทรศัพท์'}
    //                     rules={[{ required: true, message: 'Please input the contact phone number!' }]}
    //                 >
    //                     <Input />
    //                 </Form.Item>

    //                 <Form.Item
    //                     name="contact_email"
    //                     label={type == 1 ?'E-mail ผู้ประสานงาน': 'E-mail'}
    //                     rules={[
    //                     { type: 'email', message: 'The input is not valid E-mail!' },
    //                     { required: true, message: 'Please input the contact email!' },
    //                     ]}
    //                 >
    //                     <Input />
    //                 </Form.Item>

    //                 <Form.Item
    //                     name="donate_total"
    //                     label="จำนวนยอดบริจาค (1 บาท = 1 ต้น)"
    //                     rules={[{ required: true, message: 'Please input the donation total!' }]}
    //                 >
    //                     <InputNumber
    //                         style={{ width: '100%' }}
    //                         min={0}
    //                         formatter={(value) => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    //                         parser={(value) => value.replace(/\฿\s?|(,*)/g, '')}
    //                     />
    //                 </Form.Item>

    //                 <Form.Item>
                        
    //                 </Form.Item>

    //                 <Form.Item>
    //                     <Button type="primary" htmlType="submit">
    //                     Submit
    //                     </Button>
    //                 </Form.Item>
    //                 </Form>
    //         </>
    //     );
    // };

    const tabItems = [
        {
            key: '1',
            label: 'บริษัท',
            children: <>
              {/* <FormType /> */}
            </>,
        },
        {
            key: '2',
            label: 'บุคคลทั่วไป',
            children: 'Content of Tab Pane 1',
        }
    ]

    return(
        <>
            <div  
                className=' text-black w-full min-h-screen flex items-center justify-start flex-col gap-2 form-img-bg ' 
                style={{
                    // backgroundColor:'#478018'
                }}
            >
               <Row style={{maxWidth:'630px'}}>
                    <Col span={24}>
                        {/* <div className="icon-set flex gap-5 w-full items-center justify-center "> 
                            <div className="w-full max-w-[120px]">
                                <img src={bhh27Icon} className='object-contain w-full h-full mt-4 mb-4' alt="bhh27icon" />
                            </div>
                            <div className="w-full max-w-[120px]">
                                <img src={gw} className='object-contain mt-4 mb-4' alt="bhh27icon" />
                            </div>
                        </div> */}
                    </Col>
                    <Col span={24} style={{display:'flex',justifyContent:'center'}}>
                        <Card 
                            style={{
                                        width:'90%',
                                        // boxShadow:' rgba(99, 99, 99, 0.1) 2px 2px 10px 2px',
                                        marginTop:'2em',
                                        // minHeight:'300px',
                                        // minWidth:'375px',
                                    }}
                            // title={<Title level={5} style={{paddingTop:'10px'}} >แบบฟอร์มแจ้งความจำนงค์บริจาคเพื่อปลูกป่าชายเลน </Title>}
                        >
                            <div className="icon-set flex gap-5 w-full items-center justify-center "> 
                                <div className="w-full max-w-[120px]">
                                    <img src={bhh27Icon} className='object-contain w-full h-full mt-4 mb-4' alt="bhh27icon" />
                                </div>
                                <div className="w-full max-w-[120px]">
                                    <img src={gw} className='object-contain mt-4 mb-4' alt="bhh27icon" />
                                </div>

                            </div>
                            <div className="icon-set flex gap-5 w-full items-center justify-center "> 
                                <div className="w-full mt-10 flex item-center justify-center">
                                    <img src={treeimg} width="300px"  />
                                </div>
                            </div>

                            <Divider />
                            <Title level={5} style={{paddingTop:'10px'}} >แบบฟอร์มแจ้งความจำนงค์บริจาคเพื่อปลูกป่าชายเลน </Title>
                            <p> ร่วมกันปลูกป่าชายเลน หรือ บริจาค 1 บาท = ต้นกล้า1ต้น = คาร์บอนครดิต 9.5  tCO2eq เท่ากับเราได้ออกซิเจนต่อมนุษย์ถึง 2 คน </p>
                            {
                                page === 0 ?
                                <div className="flex item-center justify-center my-5 ">
                                    <Button type="primary" style={{width:'90%'}} onClick={()=>{setPage(1)}}  >ร่วมบริจาค</Button>
                                </div>
                                : 
                                <>
                                <div style={{width:'100%',display:'flex',justifyContent:'center',margin:'auto',marginBottom:'3rem',marginTop:'2rem'}} >
                                    <Flex vertical gap="middle" style={{width:'90%'}} >
                                        <Radio.Group defaultValue={0} buttonStyle="solid" className="flex m-auto" onChange={(e)=>{setType(e.target.value)}} >
                                            <Radio.Button value={0}  className="text-center w-36 " >บริษัท</Radio.Button>
                                            <Radio.Button value={1}  className="text-center w-36 " >บุคคลทั่วไป</Radio.Button>
                                        </Radio.Group>
                                    </Flex>
                                </div>
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinish}
                                    initialValues={{
                                        // donate_total: 0,
                                    }}

                                    onValuesChange={(changedValues, allValues) => {
                                        setallvalue(allValues);
                                    }}
                                >
                                    {
                                        type == 0
                                        ?
                                        <>
                                            <Form.Item
                                                name="organization_name"
                                                label="ชื่อองค์กร"
                                                rules={[{ required: true, message: 'Please input the organization name!' }]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                name="organization_address"
                                                label="ที่อยู่องค์กร(เพื่อออกจดหมายขอบคุณ) "
                                                rules={[{ required: true, message: 'Please input the organization address!' }]}
                                            >
                                                <TextArea />
                                            </Form.Item>

                                            <Form.Item
                                                name="organization_phone"
                                                label="หมายเลขโทรศัพท์องค์กร"
                                                rules={[{ required: true, message: 'Please input the organization phone number!' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            </>
                                        : null
                                    }

                                    <Form.Item
                                        name="contact_name"
                                        label={type == 1 ?'ชื่อ-สกุล' :'ชื่อ-สกุลผู้ประสานงาน' }
                                        rules={[{ required: true, message: 'Please input the contact name!' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="contact_phone"
                                        label={type == 1 ?'หมายเลขโทรศัพท์' :'หมายเลขโทรศัพท์ผู้ประสานงาน' }
                                        rules={[{ required: true, message: 'Please input the contact phone number!' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="contact_email"
                                        label={type == 1 ? 'E-mail': 'E-mail ผู้ประสานงาน'}
                                        rules={[
                                        { type: 'email', message: 'The input is not valid E-mail!' },
                                        { required: true, message: 'Please input the contact email!' },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="donate_total"
                                        label="จำนวนยอดบริจาค (1 บาท = 1 ต้น)"
                                        rules={[{ required: true, message: 'Please input the donation total!' }]}
                                    >
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            min={0}
                                            formatter={(value) => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value) => value.replace(/\฿\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="donate_type"
                                        label="รูปแบบการชำระเงิน"
                                        rules={[{ required: true, message: 'Please input the donation total!' }]}
                                    >
                                        <Radio.Group >
                                            <Radio value={'ชำระเงินสด กับ โรงพยาบาลกรุงเทพหาดใหญ่ วันที่ 31 สค. 67'}>ชำระเงินสด กับ โรงพยาบาลกรุงเทพหาดใหญ่ วันที่ 31 สค. 67 </Radio>
                                            <Radio value={'ชำระเงินสด หรือโอน โดยตรงกับ ชมรมปลูกป่าชายเลนฯ วันที่ 31 สค. 67'}>ชำระเงินสด หรือโอน โดยตรงกับ ชมรมปลูกป่าชายเลนฯ วันที่ 31 สค. 67 </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Divider/>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loadingform}>
                                            {loadingform ? 'Submitting...' : 'Submit'}
                                        </Button>
                                        <Button type="primary" style={{marginLeft:'10px'}} onClick={()=>{form.resetFields();}} ghost >
                                            Clear
                                        </Button>
                                    </Form.Item>
                                </Form>
                                </>
                            }

                        </Card>    
                       
                    </Col>
                    {/* <Col span={24} style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>
                        <Tabs
                            // onChange={onChange}
                            type="card"
                            centered
                            style={{width:'90%'}}
                            items={tabItems}
                        />
                    </Col> */}
                    <Col span={24} style={{display:'flex',justifyContent:'center',marginTop:'30px'}}>
                        {/* <div style={{width:'100%',display:'flex',justifyContent:'center',margin:'auto'}} >
                            <Flex vertical gap="middle" style={{width:'90%'}} >
                                <Radio.Group defaultValue={0} buttonStyle="solid" className="flex m-auto" onChange={(e)=>{setType(e.target.value)}} >
                                    <Radio.Button value={0}  className="text-center w-36 " >บริษัท</Radio.Button>
                                    <Radio.Button value={1}  className="text-center w-36 " >บุคคลทั่วไป</Radio.Button>
                                </Radio.Group>
                            </Flex>
                        </div> */}
                    </Col>
                    {/* <Col span={24} style={{marginTop:'20px',display:'flex',justifyContent:'center'}} >

                        <div style={{width:'90%'}}>
                                
                            <Card>                        
                                <div style={{width:'100%',display:'flex',justifyContent:'center',margin:'auto',marginBottom:'3rem',marginTop:'2rem'}} >
                                    <Flex vertical gap="middle" style={{width:'90%'}} >
                                        <Radio.Group defaultValue={0} buttonStyle="solid" className="flex m-auto" onChange={(e)=>{setType(e.target.value)}} >
                                            <Radio.Button value={0}  className="text-center w-36 " >บริษัท</Radio.Button>
                                            <Radio.Button value={1}  className="text-center w-36 " >บุคคลทั่วไป</Radio.Button>
                                        </Radio.Group>
                                    </Flex>
                                </div>
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinish}
                                    initialValues={{
                                        // donate_total: 0,
                                    }}

                                    onValuesChange={(changedValues, allValues) => {
                                        setallvalue(allValues);
                                    }}
                                >
                                    {
                                        type == 0
                                        ?
                                        <>
                                            <Form.Item
                                                name="organization_name"
                                                label="ชื่อองค์กร"
                                                rules={[{ required: true, message: 'Please input the organization name!' }]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                name="organization_address"
                                                label="ที่อยู่องค์กร(เพื่อออกจดหมายขอบคุณ) "
                                                rules={[{ required: true, message: 'Please input the organization address!' }]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                name="organization_phone"
                                                label="หมายเลขโทรศัพท์องค์กร"
                                                rules={[{ required: true, message: 'Please input the organization phone number!' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            </>
                                        : null
                                    }


                                    <Form.Item
                                        name="contact_name"
                                        label={type == 1 ?'ชื่อ-สกุล' :'ชื่อ-สกุลผู้ประสานงาน' }
                                        rules={[{ required: true, message: 'Please input the contact name!' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="contact_phone"
                                        label={type == 1 ?'หมายเลขโทรศัพท์' :'หมายเลขโทรศัพท์ผู้ประสานงาน' }
                                        rules={[{ required: true, message: 'Please input the contact phone number!' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="contact_email"
                                        label={type == 1 ? 'E-mail': 'E-mail ผู้ประสานงาน'}
                                        rules={[
                                        { type: 'email', message: 'The input is not valid E-mail!' },
                                        { required: true, message: 'Please input the contact email!' },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="donate_total"
                                        label="จำนวนยอดบริจาค (1 บาท = 1 ต้น)"
                                        rules={[{ required: true, message: 'Please input the donation total!' }]}
                                    >
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            min={0}
                                            formatter={(value) => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value) => value.replace(/\฿\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="donate_type"
                                        label="รูปแบบการชำระเงิน"
                                        rules={[{ required: true, message: 'Please input the donation total!' }]}
                                    >
                                        <Radio.Group >
                                            <Radio value={'ชำระเงินสด กับ โรงพยาบาลกรุงเทพหาดใหญ่ วันที่ 31 สค. 67'}>ชำระเงินสด กับ โรงพยาบาลกรุงเทพหาดใหญ่ วันที่ 31 สค. 67 </Radio>
                                            <Radio value={'ชำระเงินสด หรือโอน โดยตรงกับ ชมรมปลูกป่าชายเลนฯ วันที่ 31 สค. 67'}>ชำระเงินสด หรือโอน โดยตรงกับ ชมรมปลูกป่าชายเลนฯ วันที่ 31 สค. 67 </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Divider/>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loadingform}>
                                            {loadingform ? 'Submitting...' : 'Submit'}
                                        </Button>
                                        <Button type="primary" style={{marginLeft:'10px'}} onClick={()=>{form.resetFields();}} ghost >
                                            Clear
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>

                        </div>
                    </Col> */}
                </Row>
                {/* <div style={{marginTop:'20px',marginBottom:'10px'}}>
                    <FooterComponent color={'while'} />
                </div> */}
            </div>
            
        </>
    )
}