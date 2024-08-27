import { Button, Card, Col, Divider, Row ,Typography} from "antd";
import treeimg from "../assets/img/forest/tree.svg";
import bhh27Icon from '../assets/img/BHH27icon.png'
import gw from '../assets/img/gw.png'
import { useEffect, useRef, useState } from "react";
import { toPng } from 'html-to-image';
import { DownloadOutlined } from '@ant-design/icons';
const {Title,Text} = Typography;

export default function ThankCard(props){

    const [data,setData] = useState({});
    const [height,setHeight] = useState(0);
    // const data ={organization_name:'chalermwat building',contact_name:'เฉลิมวัฒน์ ตั้งหิรัญเสถียร'}
    const cardRef = useRef();

    useEffect(()=>{
        if(props.data ){
            setData(props.data);
        }
    },[props]);

    const handleExport = () => {
      if (cardRef.current) {
        toPng(cardRef.current)
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'card-image.png';
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.error('Failed to export card as image:', err);
          });
      }
    };

    return(
        <>
            <Row                        
                style={{
                            width:'90%',
                            // boxShadow:' rgba(99, 99, 99, 0.1) 2px 2px 10px 2px',
                            marginTop:'2em',
                            // minHeight:'300px',
                            textAlign:'center',
                        }}>
                <Col span={24}  style={{backgroundColor:'rgba(250,250,0,0.0)',paddingTop:'20px',paddingBottom:'20px'}} >
                    <Card
                        className="thank-card"
                        style={{                            

                            margin:'auto'
                        }}
                    >
                        <Row>
                            {/* <Col span={24} >   
                                <Title level={3} style={{fontFamily:'Sarabun',fontWeight:'600',color:'#133C7B'}}>โครงการกล้าดีพิทักษ์สิ่งแวดล้อม</Title>
                            </Col> */}
                            <Col span={24} >
                                <div className="icon-set flex gap-5 w-full items-center justify-center "> 
                                        <div className="w-full max-w-[100px]">
                                            <img src={bhh27Icon} className='object-contain w-full h-full mt-4 mb-4' alt="bhh27icon" />
                                        </div>
                                        <div className="w-full max-w-[100px]">
                                            <img src={gw} className='object-contain mt-4 mb-4' alt="bhh27icon" />
                                        </div>

                                </div>
                            </Col>
                            <Col span={24}  >

                                <div className="icon-set flex gap-5 w-full items-center justify-center">
                                    <div className="w-full mt-10 flex item-center justify-center">
                                        <img src={treeimg} width="200px"  />
                                    </div>
                                </div>
                                
                                <Divider/>
                            </Col>
                            <Col span={24} >
                            <Title level={5} style={{fontFamily:'Sarabun',fontWeight:'600',color:'#000',margin:'0px 0px 0px 0px'}}  >โรงพยาบาลกรุงเทพหาดใหญ่</Title>
                                <Title level={5} style={{fontFamily:'Sarabun',fontWeight:'600',color:'#000',margin:'0px 0px 15px 0px' }}  >ขอขอบคุณ</Title>
                                {
                                    data != null ?
                                    <Text level={4} style={{fontFamily:'Sarabun',fontWeight:'600',color:'#133C7B',textAlign:'center',fontSize:'1.3rem'}}>
                                        {
                                            data.organization_name != '' ?   data.organization_name : data.contact_name
                                        }
                                    </Text>
                                    :
                                    null
                                }
                                <Title level={5} style={{fontFamily:'Sarabun',fontWeight:'600',color:'#000',textAlign:'center'}}>
                                    สำหรับการร่วมสนับสนุน<span style={{fontWeight:'800',fontSize:'18px'}}>โครงการกล้าดีพิทักษ์สิ่งแวดล้อม</span> ต่อลมหายใจป่าชายเลน 
                                </Title>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={24} className="mt-5 ">
                    {/* <Button type="default"  shape="round" size="large" onClick={handleExport} style={{width:'100%',fontSize:'16px'}} className="custom-button"  > 
                        <DownloadOutlined className="custom-button-icon" /> 
                        บันทึกการ์ด
                    </Button> */}
                    <button className="custom-button" onClick={handleExport} >
                        บันทึกการ์ด
                    </button>
                </Col>
                <Col span={24} className="mt-5 ">
                    {/* <button className="custom-button"  >
                        ย้อนกลับ
                    </button> */}
                    <Button 
                        // type="primary" 
                        shape="round" 
                        style={{width:'100%',margin:0}} 
                        className="btn-none-outline"
                        size="large" 
                        // danger 
                        onClick={()=>{props.setpage(0)}}
                    >
                        ย้อนกลับ
                    </Button>
                </Col>

                {/* --------Card Download------- */}
                <Col span={24}  style={{paddingTop:'20px',paddingBottom:'20px'} }  >
                    <div
                    style={{                            
                        maxWidth:'100vh',
                        minWidth:'100vh',
                        height:'100vh',
                        zIndex:-1 ,
                        position:'fixed',
                        top:0,
                        left:0,
                        backgroundColor:'#fff'
                    }}
                    >

                    </div>
                    <Card
                        className="thank-card"
                        style={{                            
                            maxWidth:'320px',
                            minWidth:'300px',
                            zIndex:-9999 ,
                            position:'fixed',
                            top:0,
                            left:0,
                        }}
                        
                        ref={cardRef}
                    >
                        <Row>
                            {/* <Col span={24} >   
                                <Title level={3} style={{fontFamily:'Sarabun',fontWeight:'600',color:'#133C7B'}}>โครงการกล้าดีพิทักษ์สิ่งแวดล้อม</Title>
                            </Col> */}
                            <Col span={24} >
                                <div className="icon-set flex gap-5 w-full items-center justify-center "> 
                                        <div className="w-full max-w-[100px]">
                                            <img src={bhh27Icon} className='object-contain w-full h-full mt-4 mb-4' alt="bhh27icon" />
                                        </div>
                                        <div className="w-full max-w-[100px]">
                                            <img src={gw} className='object-contain mt-4 mb-4' alt="bhh27icon" />
                                        </div>

                                </div>
                            </Col>
                            <Col span={24}  >

                                <div className="icon-set flex gap-5 w-full items-center justify-center">
                                    <div className="w-full mt-10 flex item-center justify-center">
                                        <img src={treeimg} width="200px"  />
                                    </div>
                                </div>
                                
                                <Divider/>
                            </Col>
                            <Col span={24} >
                            <Title level={5} style={{fontFamily:'Sarabun',fontWeight:'600',color:'#000',margin:'0px 0px 0px 0px'}}  >โรงพยาบาลกรุงเทพหาดใหญ่</Title>
                                <Title level={5} style={{fontFamily:'Sarabun',fontWeight:'600',color:'#000',margin:'0px 0px 15px 0px' }}  >ขอขอบคุณ</Title>
                                {
                                    data != null ?
                                    <Text level={4} style={{fontFamily:'Sarabun',fontWeight:'600',color:'#133C7B',textAlign:'center',fontSize:'1.3rem'}}>
                                        {
                                            data.organization_name != '' ?   data.organization_name : data.contact_name
                                        }
                                    </Text>
                                    :
                                    null
                                }
                                <Title level={5} style={{fontFamily:'Sarabun',fontWeight:'600',color:'#000',textAlign:'center',margin:'20px 0px 0px 0px'}}>
                                    สำหรับการร่วมสนับสนุน
                                </Title>
                                <Title level={5} style={{fontFamily:'Sarabun',fontWeight:'600',color:'#000',textAlign:'center',margin:'0px'}}>
                                    <span style={{fontWeight:'800',fontSize:'18px'}}>"โครงการกล้าดีพิทักษ์สิ่งแวดล้อม"</span> <br/>ต่อลมหายใจป่าชายเลน 
                                </Title>

                            </Col>
                        </Row>
                    </Card>
                </Col>

            </Row>
            

               
            
        </>
    )
}