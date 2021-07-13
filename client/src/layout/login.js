import React from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Card, Form, Button, Input, Image, Divider } from 'antd';
import Gbr from '../assests/login.svg';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";

const App = () => {
    const { Content } = Layout;
    const [form] = Form.useForm();
    const history = useHistory()
    
    const login = async () => {
        const data = await form.getFieldValue();

        axios({
            url : `http://localhost:3000/user/login`,
            method: `POST`,
            data : data
        })
        .then((res) => {
            if(res.data.token) {
                history.push("/")
                localStorage.setItem('token', res.data.token)
            }
        })
        .catch((err) => {
            console.log(err, `<<<<<<<< error login`);
        })
    };
    
    return(
        <>
        <Layout>
            <Content className="site-layout">
                <div className="site-layout-background" style={{ minHeight: '100vh' }}>
                <h1 style={{
                        textAlign: "center",
                        paddingTop: "10vh",
                        fontSize: "50px",
                        color: "black",
                        fontFamily: "Tourney",
                        marginBottom: "1vh"
                    }}
                >
                    Welcome to Kanban APPS
                </h1>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Divider style={{ borderColor: "black", width: "60%"}} />
                    </Col>
                </Row>
                <Row style={{paddingTop: '5vh'}} justify="center">
                    <Col span={8}>
                    <Image src={Gbr} style={{ paddingRight: "10px" }} />
                    </Col>
                    <Col span={8}>
                        <Card 
                            style={{ 
                                borderRadius : "15px", 
                                borderColor: "gray", 
                                textAlign: "center", 
                                fontFamily: 'cursive',
                                fontSize: "26px" 
                            }} 
                            title="Login"
                        >
                        <Form
                            // name="basic"
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            form={form}
                            onFinish={login}
                        >
                            <Form.Item
                                label="email"
                                name="email"
                            >
                            <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                            >
                            <Input.Password />
                            </Form.Item>

                            <Form.Item
                                // wrapperCol={{
                                // offset: 8,
                                // span: 16,
                                // }}
                            >
                                <Button style={{width : "150%"}} type="primary" htmlType="submit">
                                Submit
                                </Button>
                            </Form.Item>
                                <label>Don't have account ? <Link to="/register">Register</Link></label>
                            </Form>
                        </Card>
                    </Col>
                </Row>
                </div>
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Content>
        </Layout>
        </>
    )
};

export default App;