import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Card, Form, Button, Input, Image, Divider } from 'antd';
import Gbr from '../assests/register.svg';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import "./style/register.scss"

const App = () => {
    const { Content, Footer } = Layout;
    const [form] = Form.useForm();
    const history = useHistory();

    const register = async () => {
        const data = await form.getFieldValue();
        
        axios({
            url: `http://localhost:3000/user/register`,
            method: 'POST',
            data : data
        })
        .then((res) => {
            console.log(res, `<<<<<<<< resp`);
            if(res.status === 201) {
                history.push("/login")
            }
        })
        .catch((err) => {
            console.log(err, `<<<<<<<< error register`);
        })
    };
    
    return(
        <>
        <Layout>
            <Content className="site-layout">
                <div className="site-layout-background">
                <h1>Welcome to Kanban APPS</h1>
                <Row className="head-title">
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Divider style={{ borderColor: "black", width: "60%"}} />
                    </Col>
                </Row>
                <Row className="body-register">
                    <Col span={8}>
                        <Image className="img-register" src={Gbr} />
                    </Col>
                    <Col span={8}>
                        <Card className="card-form" title="Register">
                        <Form
                            name="basic"
                            form={form}
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            onFinish={register}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
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
                                    message: 'Please input your password!',
                                },
                                ]}
                            >
                            <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button style={{width : "150%"}} type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                                <label>Don't have account ? <Link to="/login">Login</Link></label>
                            </Form>
                        </Card>
                    </Col>
                </Row>
                </div>
            <Footer style={{ textAlign: 'center' }}>Kanban Apps By Budibrass</Footer>
            </Content>
        </Layout>
        </>
    )
};

export default App;