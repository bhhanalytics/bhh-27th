import { Card, Col, Form, Row ,Typography,Tabs,Button, Input, Radio ,Flex,InputNumber, Divider,Select,message } from "antd";
import { useState,useEffect } from "react";
import bhh27Icon from '../assets/img/BHH27icon.png'
import gw from '../assets/img/gw.png'
import FooterComponent from "../components/FooterComponent";
import bgimg from "../assets/img/Mesa de trabajo 1.png"
import Tree from "../components/Tree";
import treeimg from "../assets/img/forest/tree.svg";
import ThankCard from "./ThankCard";
const {Title,Text,Paragraph} = Typography;
const {TextArea} = Input;
import gsblogo from "../assets/img/Logo_GSB_Thailand.svg.png"
export default function DonateForm(){

    const [type,setType] =useState(0);
    const [allValues,setallvalue] =useState({});
    const [loadingform,setLoadingform] = useState(false);
    const [page,setPage] = useState(0);
    const [data,setData] = useState([]);
    const [newData,setNewData] = useState([]);
    const [values, setValues] = useState();
    const [height, setHeight] = useState(window.innerHeight);
    const [form] = Form.useForm();
    const api_url = import.meta.env.VITE_BASE_URL;
    const [messageApi, contextHolder] = message.useMessage();
    
    useEffect(()=>{
        fetchdonate(); 
    },[])
    const warning = (massage) => {
        messageApi.open({
          type: 'warning',
          content: massage,
        });
      };

    useEffect(() => {
      
      const handleResize = () => {
        setHeight(window.innerHeight);
      };
  
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [height]);




    const onFinish = async(values) => {
        var data = values;
        
        setLoadingform(true);
        if(values.organization_name == undefined){
            data.organization_name = ''
            data.organization_address = ''
            data.organization_phone = ''
            data.donate_type = ''

        }
        setallvalue(data);
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
            setPage(2);
            setType(0);
        }
    };

    const fetchdonate = async (newValue)=>{
        if(newValue !== '' && newValue !== undefined){
            const response = await fetch(api_url+'/form/search/data',{
                method:"POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({value:newValue})
               });
    
            if(response.status==200){
                const json = await response.json();
                var data = json.data;
                
                if(data.length !== 0){
                   var newdata =  data.map((item,index)=>{
                        if(item.organization_name !== ''){
                            // var text = `${item.organization_name}(${item.contact_name})`
                            return {
                                key: index,
                                value : item.organization_name,
                                label : item.organization_name,
                                name :item.organization_name ,
                                organization_name : item.organization_name,
                                contact_name : item.contact_name,
                                donate_total:item.donate_total
                            }
                        }else{
                            return {
                                key: index,
                                value : item.contact_name,
                                label : item.contact_name,
                                name : item.contact_name,
                                organization_name : '',
                                contact_name : item.contact_name ,
                                donate_total:item.donate_total
                            }
                        }
                    })

                    setData(newdata);
                }else{
                    setData([]);
                }
                
            }
        }else{
            setData([]);
        }

    }


    const handleSearch = (newValue) => {
        fetchdonate(newValue);
    };

    const handleChange = (newValue) => {
        setValues(newValue);
    };

    const showCard = ()=>{

        if(values !== undefined){
            var isData = data.filter(data => data.value == values);
            if(isData.length === 0){
                warning('ไม่พบข้อมูล')
            }else{
                setPage(2);
            }
            
            setallvalue(isData[0]);
            setValues(null);
        }else{
            warning('กรุณาค้นหาและเลือกรายชื่อ')
        }

    }

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
    ];

    const handleDropdownVisibleChange = (open) => {

        if (open) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
      };
    

    return(
        <>
            {contextHolder}
            <div  
                className=' text-black w-full min-h-screen flex items-center justify-start flex-col gap-2 form-img-bg zoomed-element ' 
                style={{
                    // backgroundColor:'#478018'
                }}
            >
               <Row style={{maxWidth:'630px'}}>
                {
                    page !== 2 ?
                        <Col span={24} style={{display:'flex',justifyContent:'center',marginBottom:'10vh'}}>
                            <Card 
                                style={{
                                            width:'90%',
                                            // boxShadow:' rgba(99, 99, 99, 0.1) 2px 2px 10px 2px',
                                            marginTop:'2em',
                                            // minHeight:'300px',
                                            // minWidth:'375px',
                                        }}
                                title={<Title level={4} style={{paddingTop:'10px',textAlign:'center',color:'#7c9d41'}}  >โครงการกล้าดีพิทักษ์สิ่งแวดล้อม </Title>}
                            >
                                {/* <Title level={4} style={{fontFamily:'Sarabun',fontWeight:'600',color:'#133C7B'}}>โครงการกล้าดีพิทักษ์สิ่งแวดล้อม</Title> */}
                                <div className="icon-set flex gap-5 w-full items-center justify-center "> 
                                    <div className="w-full max-w-[120px]">
                                        <img src={bhh27Icon} className='object-contain w-full h-full mt-4 mb-4' alt="bhh27icon" />
                                    </div>
                                    {/* <div className="w-full max-w-[120px]">
                                        <img src={gw} className='object-contain mt-4 mb-4' alt="bhh27icon" />
                                    </div> */}
                                </div>
                                <div className="icon-set flex gap-5 w-full items-center justify-center "> 
                                    <div className="w-full mt-10 flex item-center justify-center">
                                        <img src={treeimg} width="300px"  />
                                    </div>
                                </div>
                                <Divider />
                                {
                                    page === 0 || page === 1  ?
                                    <>
                                        <Title level={5} style={{paddingTop:'10px'}} >แบบฟอร์มแจ้งความจำนงค์บริจาคเพื่อปลูกป่าชายเลน </Title>
                                        <p> ร่วมกันปลูกป่าชายเลน หรือ บริจาค 1 บาท = ต้นกล้า 1 ต้น = คาร์บอนครดิต 9.5  kgCO2eq เท่ากับเราได้ออกซิเจนต่อมนุษย์ถึง 2 คน </p>
                                    </>
                                    :
                                    <>
                                        <div>
                                            <Title level={4} style={{fontFamily:'Sarabun',fontWeight:'600',color:'#133C7B'}}  >ขอขอบคุณ</Title>
                                                {
                                                    allValues != null ?
                                                    <Title level={4} style={{fontFamily:'Sarabun',fontWeight:'600',color:'#133C7B',textAlign:'center'}}>
                                                        {
                                                            allValues.organization_name != '' ?   allValues.organization_name : allValues.contact_name
                                                        }
                                                    </Title>
                                                    :
                                                    null
                                                }
                                            <Title level={5} style={{fontFamily:'Sarabun',fontWeight:'600',color:'#133C7B',textAlign:'center'}}>
                                                สำหรับการร่วมสนับสนุนโครงการกล้าดีพิทักษ์สิ่งแวดล้อม ต่อลมหายใจป่าชายเลน 
                                            </Title>
                                        </div>
                                    </>
                                }
                                {
                                    page === 0 ?
                                    <>  
                                        <Row>

                                            <Col span={24} className="flex item-center justify-center mt-6">
                                                <Button type="default" style={{width:'100%'}} onClick={()=>{setPage(1)}} className="btn-donate" >คลิก! ร่วมสนับสนุน</Button>
                                            </Col>
                                            <Col span={24} >
                                                <Divider className="my-4" ></Divider>
                                            </Col>
                                            <Col span={24}>
                                                <Text style={{margin:'16px',marginLeft:'1.2rem'}} >ค้นหาผู้ร่วมสนับสนุน</Text>
                                            </Col>
                                            <Col md={18} sm={18} xs={16} className="flex item-center justify-center mt-4 " >
                                                <Select
                                                    showSearch
                                                    value={values}
                                                    placeholder="ค้นหาโดย(ชื่อองค์กร,ชื่อ-สกุล)"
                                                    style={{width:'90%'}}
                                                    defaultActiveFirstOption={false}
                                                    suffixIcon={null}
                                                    filterOption={false}
                                                    onSearch={handleSearch}
                                                    onChange={handleChange}
                                                    notFoundContent={null}
                                                    options={data}
                                                    onDropdownVisibleChange={handleDropdownVisibleChange} 
                                                /> 

                                            </Col>
                                            <Col md={6} sm={6} xs={8} className="flex item-center justify-center mt-4 " >
                                                <Button type="default" style={{width:'90%',margin:0}} onClick={()=>{showCard()}}  >แสดง</Button>
                                            </Col>
                                        </Row>
                                        {/* <div className="flex item-center justify-center my-5 ">
                                            <Button type="primary" style={{width:'90%'}} onClick={()=>{setPage(1)}}  >ร่วมสนับสนุน</Button>
                                        </div>
                                        <Divider style={{margin:'0px'}}/>
                                        <div className="flex item-center justify-center my-5 ">

                                            <Button type="primary" style={{width:'90%'}} onClick={()=>{setPage(1)}}  >ค้นหาผู้ร่วมสนับสนุนโครงการ</Button>
                                        </div> */}
                                    </>
                                    : 
                                    page === 1 ?
                                    <>
                                    <div style={{width:'100%',display:'flex',justifyContent:'center',margin:'auto',marginBottom:'3rem',marginTop:'2rem'}} >
                                        <Flex vertical gap="middle" style={{width:'90%'}} >
                                            <Radio.Group defaultValue={0} buttonStyle="solid" className="flex m-auto " onChange={(e)=>{setType(e.target.value)}} >
                                                <Radio.Button value={0}  className={type === 0 ? "text-center w-32 btn-green ":"text-center w-32 btn-none "} >บริษัท</Radio.Button>
                                                <Radio.Button value={1}  className={type === 1 ? "text-center w-32 btn-green " : "text-center w-32 btn-none "} >บุคคลทั่วไป</Radio.Button>
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
                                            // setallvalue(allValues);
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
                                                    rules={[
                                                        // { required: true, message: 'Please input the organization address!' }
                                                    ]}
                                                >
                                                    <TextArea />
                                                </Form.Item>

                                                <Form.Item
                                                    name="organization_phone"
                                                    label="หมายเลขโทรศัพท์องค์กร"
                                                    rules={[
                                                        // { required: true, message: 'Please input the organization phone number!' }
                                                    ]}
                                                >
                                                    <Input 
                                                        maxLength={10} 
                                                        onKeyPress={(event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        }}
                                                        inputMode="decimal"
                                                    />
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
                                            label={type === 1 ? 'หมายเลขโทรศัพท์' : 'หมายเลขโทรศัพท์ผู้ประสานงาน'}
                                            rules={[
                                                { required: true, message: 'Please input the contact phone number!' },
                                                // // {
                                                // // pattern: /^\d{3}-\d{3}-\d{4}$/,
                                                // // message: 'Please enter a valid phone number in the format xxx-xxx-xxxx!',
                                                // // },
                                            ]}
                                        >
                                            <Input 
                                                maxLength={10} 
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                    }}
                                                inputMode="decimal"
                                            />
                                         </Form.Item>

                                        <Form.Item
                                            name="contact_email"
                                            label={type == 1 ? 'E-mail': 'E-mail ผู้ประสานงาน'}
                                            rules={[
                                            { type: 'email', message: 'The input is not valid E-mail!' },
                                            // { required: true, message: 'Please input the contact email!' },
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
                                                max={1000000}
                                                formatter={(value) => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={(value) => value.replace(/\฿\s?|(,*)/g, '')}
                                                inputMode="decimal"
                                            />
                                        </Form.Item>
                                        {/* <Form.Item>
                                            <Card
                                                title="ช่องทางบริจาค"
                                            >
                                               
                                                <img src={gsblogo} style={{width:'150px',margin:'auto'}} />
                                                <Title level={5} style={{paddingBottom:'6px',paddingTop:'20px'}} >ธนาคารออมสิน </Title> 
                                                <Paragraph 
                                                      copyable={{
                                                        text: '020416626974',
                                                    }}
                                                    style={{fontSize:'16px',fontWeight:'600'}}
                                                    
                                                >
                                                    เลขที่บัญชี : 020416626974
                                                </Paragraph>
                                                <Title level={5}>ชื่อบัญชี : กลุ่มอนุรักษ์ป่าชายเลน ต.หัวเขา</Title> 
                                            </Card>
                                           
                                        </Form.Item> */}

                                        {/* <Form.Item
                                            name="donate_type"
                                            label="รูปแบบการชำระเงิน"
                                            rules={[{ required: true, message: 'Please input the donation total!' }]}
                                        >
                                            <Radio.Group >
                                                <Radio value={'ชำระเงินสด กับ โรงพยาบาลกรุงเทพหาดใหญ่ วันที่ 31 สค. 67'}>ชำระเงินสด กับ โรงพยาบาลกรุงเทพหาดใหญ่ วันที่ 31 สค. 67 </Radio>
                                                <Radio value={'ชำระเงินสด หรือโอน โดยตรงกับ ชมรมปลูกป่าชายเลนฯ วันที่ 31 สค. 67'}>ชำระเงินสด หรือโอน โดยตรงกับ ชมรมปลูกป่าชายเลนฯ วันที่ 31 สค. 67 </Radio>
                                            </Radio.Group>
                                        </Form.Item> */}
                                        <Divider />
                                        <Form.Item>
                                            <Button 
                                                type="default" 
                                                style={{margin:'0px 0px 0px 0px',fontSize:'14px',color:'#133C7B',float:'right',textDecoration:'underline'}} 
                                                onClick={()=>{form.resetFields();}} 
                                                ghost  
                                                className="btn-clear"
                                            >
                                                    เคลียร์แบบฟอร์ม
                                            </Button>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="default" onClick={()=>{setPage(0);setType(0);}} style={{float:'left'}} >
                                                ย้อนกลับ
                                            </Button>
                                            <Button type="primary" htmlType="submit" loading={loadingform} style={{float:'right',paddingLeft:'20px',paddingRight:'20px'}} className="btn-donate">
                                                {loadingform ? 'กำลังบันทึก...' : 'บันทึก'}
                                            </Button>
                                        </Form.Item>
                                        <Divider />
                                        <Form.Item>
                                            <Text >สอบถามเพื่อเติม คุณโซเฟียนา ฝ่ายการตลาด โทร. 074-272-800  หรือ Line@BangkokHatyai</Text>
                                        </Form.Item>
                                    </Form>
                                    </>
                                    :null
                                }

                            </Card>      
                        </Col>
                    :
                        <Col span={24} style={{display:'flex',justifyContent:'center',marginTop:'10px',position:'inherit'}}>
                            <ThankCard data={allValues} page={page} setpage={setPage} />
                        </Col>
                }
                </Row>
                <div 
                    style={ 
                        page === 1 ? 
                        {marginTop:'20px',padding:'20px',backgroundColor:'rgba(255,255,255,0.5)',width:'100%'} 
                        : height < '1300'  ? 
                            {marginTop:'20px',padding:'20px',backgroundColor:'rgba(255,255,255,0.5)',width:'100%'}
                            :
                            {marginTop:'20px',padding:'20px',backgroundColor:'rgba(255,255,255,0.5)',width:'100%',position:'fixed',bottom:0}}
                    >
                    <FooterComponent color={'while'} />
                </div> 
            </div>
            
        </>
    )
}