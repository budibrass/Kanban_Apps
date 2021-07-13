import React, { useEffect, useState } from 'react';
import { Layout, Typography, Row, Col, Card, Modal, Input, Form, Button } from 'antd';
import { PlusCircleTwoTone, EditTwoTone, InfoCircleTwoTone, DeleteTwoTone } from '@ant-design/icons';
import axios from 'axios';
import './home.css';
import moment from  'moment';

const { Title } = Typography;
const baseUrl = `http://localhost:3000`;

const App = () => {
    const [form] = Form.useForm();
    const { Header, Content, Footer } = Layout;
    const [dataKanban, setDataKanban] = useState([]);
    const [modal, setModal] = useState({ visible: false, title: '', data: {} });
    const [modalDetail, setModalDetail] = useState({ visible: false, title: '', data: {} })

    const handleModalAdd = () => {
        form.resetFields()
        setModal({ ...modal, visible: true, title: "Add Task" });
    };

    const toOnProgres = (id) => {
        axios({
            url : `http://localhost:3000/kanban/${id}`,
            method: `PUT`,
            headers : {
                token: localStorage.token
            },
            data : {
                category : "on progres"
            }
        })
        .then(data => {
            loadDataSource();
        })
        .catch(err => {
            console.log(err, `<<<<<<<<< err add task`);
        })
    };

    const toDone = (id) => {
        axios({
            url : `http://localhost:3000/kanban/${id}`,
            method: `PUT`,
            headers : {
                token: localStorage.token
            },
            data : {
                category : "done"
            }
        })
        .then(data => {
            loadDataSource();
        })
        .catch(err => {
            console.log(err, `<<<<<<<<< err add task`);
        })
    };

    const handleDelete = (id) => {
        axios({
            url: `${baseUrl}/kanban/${id}`,
            method: `DELETE`,
            headers: {
                token: localStorage.token
            }
        })
        .then(data => {
            loadDataSource();
        })
        .catch(err => {
            console.log(err, `<<<<<<<<<< error delete`);
        })
    };

    const handleOk = () => {
        const data = form.getFieldValue();

        if(modal.data.id) {
            setModal({ ...modal, title: 'Edit Task'})
            let id = modal.data.id;

            axios({
                url: `${baseUrl}/kanban/${id}`,
                method: `PUT`,
                headers: {
                    token: localStorage.token
                },
                data: {
                    title: data.title,
                    due_date: data.due_date
                }
            })
            .then((data) => {
                loadDataSource()
            })
            .catch((err) => {
                console.log(err, `<<<<<<<<<<<<< err edit data`);
            })
        } else {            
            axios({
                url : `http://localhost:3000/kanban`,
                method: `POST`,
                headers : {
                    token: localStorage.token
                },
                data : data
            })
            .then(data => {
                loadDataSource();
            })
            .catch(err => {
                console.log(err, `<<<<<<<<< err add task`);
            })
        }
        setModal({ ...modal, visible : false});
    };

    const handleEdit = (id) => {
        const myForm = form;

        axios({
            url: `${baseUrl}/kanban/${id}`,
            method: `GET`,
            headers: {
                token: localStorage.token
            }
        })
        .then((data) => {
            let payload = {
                ... data.data.data,
                due_date: moment(data.data.data.due_date).format(`yyyy-MM-DD`)
            }
            myForm.setFieldsValue(payload);
            setModal({ ...modal, visible: true, data: payload, title: "Edit Task" });
        })
        .catch((err) => {
            console.log(err, `<<<<<<<<<<<<<< error get One edit`);
        })
    };  

    const handleDetail = (id) => {
        axios({
            url: `${baseUrl}/kanban/${id}`,
            method: `GET`,
            headers: {
                token: localStorage.token
            }
        })
        .then((data) => {
            let payload = {
                ...data.data.data,
                due_date: data.data.data.due_date.slice(0, 10)
            }
            setModalDetail({ ...modalDetail, visible: true, title: "Data Detail", data: payload })
        })
        .catch((err) => {
            console.log(err, `<<<<<<<< error detail data`);
        })
    };

    const handleCancel = () => {
        setModal({ ...modal, visible : false});
    };

    const handleCncelModalDetail = () => {
        setModalDetail({ ...modalDetail, visible: false })
    };

    const loadDataSource = () => {
        axios({
            url: `http://localhost:3000/kanban`,
            method: `GET`,
        })
        .then(data => {
            setDataKanban(data.data.kanban);
        })
        .catch(err => {
            console.log(err, `<<<<<<<list kanban`);
        })
    };

    useEffect(() => {
        loadDataSource();
    }, [])
    return(
        <>
        <Layout style={{ height: "100vh" }}>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <Title level={1} style={{ textAlign: "center", color: "white" }}>Kanban Board</Title>
                </Header>
                {/* <Card style={{ height: "100%"}}> */}
                    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        <Row>
                            <Col span={8} style={{ padding: "0 10px" }}>
                                <div className="site-card-border-less-wrapper">
                                    <Card headStyle={{ backgroundColor: "#f7dce5" }} style={{ borderRadius: "5px", backgroundColor: "white", overflowY: "scroll", height: "75vh", boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"  }} title="Backlog" bordered={false} extra={ <PlusCircleTwoTone onClick={handleModalAdd} style={{ fontSize : "25px", backgroundColor: "#f7dce5" }} />}>
                                    {dataKanban.map((e) => {
                                        if(e.category === `backlog`) {
                                            return (
                                                <Row key={e.id} style={{ margin: "2px 0"}}>
                                                    <Col span={24}>
                                                        <Card style={{ textAlign: "center", borderRadius: "10px", backgroundColor: '#f8c3d5', marginTop: "10px" }} headStyle={{ fontSize: "20px", backgroundColor: "#f69aba", borderRadius: "10px" }} title={e.title} >
                                                            Tenggat Waktu : {e.due_date.slice(0, 10)} 
                                                            <Button onClick={()=> toOnProgres(e.id)} style={{ marginTop: 3, marginLeft: 3, backgroundColor: "gray"}} size="small">next</Button>
                                                            <Col span={24} style={{ paddingTop: 10 }}>
                                                                <EditTwoTone onClick={()=> handleEdit(e.id)} /> || <DeleteTwoTone onClick={()=> handleDelete(e.id)} /> || <InfoCircleTwoTone onClick={()=> handleDetail(e.id)} />
                                                            </Col>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            )
                                        }
                                    })}
                                    </Card>
                                </div>
                            </Col>
                            <Col span={8} style={{ padding: "0 10px" }}>
                                <div className="site-card-border-less-wrapper">
                                    <Card headStyle={{ backgroundColor: "#c9f2cc" }} title="On Progress" style={{ borderRadius: "5px", overflowY: "scroll", height: "75vh", boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"  }} bordered={false}>
                                    {dataKanban.map((e) => {
                                        if(e.category === `on progres`) {
                                            return (
                                                <Row key={e.id} style={{ margin: "2px 0"}}>
                                                    <Col span={24}>
                                                        <Card style={{ textAlign: "center", borderRadius: "10px", backgroundColor: "#abfcb1", marginTop: "10px" }} headStyle={{ fontSize: "20px", backgroundColor: "#30e53f", borderRadius: "10px" }} title={e.title}>
                                                            Tenggat Waktu : {e.due_date.slice(0, 10)}
                                                            <Button onClick={()=> toDone(e.id)} style={{ marginTop: 3, marginLeft: 3, backgroundColor: "gray"}} size="small">next</Button>
                                                            <Col span={24} style={{ paddingTop: 10}}>
                                                                <EditTwoTone onClick={()=> handleEdit(e.id)} /> || <DeleteTwoTone onClick={()=> handleDelete(e.id)} /> || <InfoCircleTwoTone onClick={()=> handleDetail(e.id)} />
                                                            </Col>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            )
                                        }
                                    })}
                                    </Card>
                                </div>
                            </Col>
                            <Col span={8} style={{ padding: "0 10px" }}>
                                <div className="site-card-border-less-wrapper">
                                    <Card headStyle={{ backgroundColor: "#feecbb" }} title="Done" bordered={false} style={{ borderRadius: "5px", overflowY: "scroll", height: "75vh", boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"  }} >
                                    {dataKanban.map((e) => {
                                        if(e.category === `done`) {
                                            return (
                                                <Row key={e.id} style={{ margin: "2px 0"}}>
                                                    <Col span={24}>
                                                        <Card style={{ textAlign: "center", borderRadius: "10px", backgroundColor: "#fcd771", marginTop: "10px" }} headStyle={{ fontSize: "20px", borderRadius: "10px", backgroundColor: "#f1b920" }} title={e.title}>
                                                            Tenggat Waktu : {e.due_date.slice(0, 10)}
                                                            <Col span={24} style={{ paddingTop: 10}}>
                                                                <EditTwoTone onClick={()=> handleEdit(e.id)} /> || <DeleteTwoTone onClick={()=> handleDelete(e.id)} /> || <InfoCircleTwoTone onClick={()=> handleDetail(e.id)} />
                                                            </Col>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            )
                                        }
                                    })}
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {/* Modal Add */}
                    <Modal title={modal.title} visible={modal.visible} onOk={handleOk} onCancel={handleCancel}>
                        <Form name="basic"
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            form={form}
                            layout="vertical"
                        >
                            <Form.Item label="Title" name="title" >
                                <Input width="100%" />
                            </Form.Item>
                            <Form.Item label="Batas Waktu" name="due_date" >
                                <Input type="date" />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal title={modalDetail.title} visible={modalDetail.visible} onCancel={handleCncelModalDetail} footer={null}>
                        <Card headStyle={{ backgroundColor: "gray"}} title={modalDetail.data.title}>
                            <Row>
                                <Col span={8}>ID</Col>
                                <Col span={4}>:</Col>
                                <Col>{modalDetail.data.id}</Col>
                            </Row>
                            <Row>
                                <Col span={8}>Category</Col>
                                <Col span={4}>:</Col>
                                <Col>{modalDetail.data.category}</Col>
                            </Row>
                            <Row>
                                <Col span={8}>Tenggat Waktu</Col>
                                <Col span={4}>:</Col>
                                <Col>{modalDetail.data.due_date}</Col>
                            </Row>
                        </Card>
                    </Modal>
                    </Content>
                {/* </Card> */}
                <Footer style={{ textAlign: 'center', backgroundColor: "gray", height: "10px" }}>Kanban Web Apps created By @budibrass</Footer>
        </Layout>
        </>
    )
};

export default App;