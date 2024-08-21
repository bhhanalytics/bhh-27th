import { Row,Typography,Image,Col } from "antd";
// import sbllogo from '../image/SBL logo png.png'
const {Text} = Typography;


export default function FooterComponent(props){
    
    return(
        <>
            <div style={{display:'flex',justifyContent:'center',textAlign:'center'}} >
                <Row style={{width:'95%',display:'flex',justifyContent:'center'}}>
                    <Col span={24} >
                        <Text style={{fontSize:'12px'}}>
                            Currently {import.meta.env.VITE_VERSION} Copyright © 2024 Anniversary 27<sup>th</sup> Bangkokhatyai <br/> 
                            Data Analytics and Innovation Centre, Bangkok Hospital Hatyai. All rights reserved.<br/>
                            {/* Admin: Chalermwat Tanghiransatian, Contact Email:chalermwat.ta@bdms.co.th Tel: 074-27-2800 Ext. 2355 <br/> */}
                        </Text>
                    </Col>
                    {/* <Col span={24} style={{marginTop:'1em'}}>
                        <Image  src={sbllogo} style={{width:'150px'}} />
                    </Col> */}
                </Row>
            </div>
        </>
    )
}