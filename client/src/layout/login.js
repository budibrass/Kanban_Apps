import React from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Card, Form, Button, Input, Image, Divider } from 'antd';
import Gbr from '../assests/login.svg';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./style/login.scss";

const App = () => {
    const { Content, Footer } = Layout;
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
                <div className="site-layout-background">
                <h1>Welcome to Kanban APPS</h1>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Divider style={{ borderColor: "black", width: "60%"}} />
                    </Col>
                </Row>
                <Row className="body-login">
                    <Col span={8}>
                    <Image className="img-login" src={Gbr}/>
                    </Col>
                    <Col span={8}>
                        <Card className="card-form" title="Login">
                        <Form
                            name="basic"
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

                            <Form.Item>
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
                <Footer style={{ textAlign: 'center' }}>Kanban Apps By Budibrass</Footer>
            </Content>
        </Layout>
        </>
    )
};

export default App;