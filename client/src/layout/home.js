import React, { useEffect, useState } from 'react';
import { Layout, Typography, Row, Col, Form} from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';
import axios from 'axios';
import './home.css';
import './style/home.scss';
import CardBacklog from './component/cardBacklog';
import CardProgres from './component/cardProgres';
import CardDone from './component/cardDone';
import moment from  'moment';
import ModalForm from './component/modal';
import ModalDetail from './component/modalDetail';

const { Title } = Typography;
const baseUrl = `http://localhost:3000`;

const App = () => {
    const [form] = Form.useForm();
    const { Header, Content, Footer } = Layout;
    const [dataKanban, setDataKanban] = useState([]);
    const [modal, setModal] = useState({ visible: false, title: '', data: {} });
    const [modalDetail, setModalDetail] = useState({ visible: false, title: '', data: {} });

    const loadDataSource = async () => {
        try {
            const data = await axios({
                url: `${baseUrl}/kanban`,
                method: `GET`,
            })
            if(data) setDataKanban(data.data.kanban);
        } catch (error) {
            console.log(error, `<<<<<< error fetch kanban`);
        }
    };

    const handleModalAdd = () => {
        form.resetFields()
        setModal({ ...modal, visible: true, title: "Add Task" });
    };

    const toOnProgres = async (id) => {
        try {
            const data = await axios({
                url : `http://localhost:3000/kanban/${id}`,
                method: `PUT`,
                headers : {
                    token: localStorage.token
                },
                data : {
                    category : "on progres"
                }
            })
            if(data) loadDataSource()
        } catch (error) {
            console.log(error, `<<<<<<<<< error next to on progress`);
        }
    };

    const toDone = async (id) => {
        try {
            const data = await axios({
                url : `http://localhost:3000/kanban/${id}`,
                method: `PUT`,
                headers : {
                    token: localStorage.token
                },
                data : {
                    category : "done"
                }
            })
            if(data) loadDataSource()
        } catch (error) {
            console.log(error, `<<<<<<<<<< error next to done`);
        }
    };

    const handleDelete = async (id) => {
        try {
            const data =  await axios({
                url: `${baseUrl}/kanban/${id}`,
                method: `DELETE`,
                headers: {
                    token: localStorage.token
                }
            })
            
            if(data) loadDataSource();
        } catch (error) {
            console.log(error, `<<<<<<<<<< error delete data`);
        }
    };

    const handleOk = async () => {
        try {
            const dataForm = await form.getFieldValue();
    
            if(modal.data.id) {
                setModal({ ...modal, title: 'Edit Task'})
                let id = modal.data.id;
    
                let data = await axios({
                    url: `${baseUrl}/kanban/${id}`,
                    method: `PUT`,
                    headers: {
                        token: localStorage.token
                    },
                    data: {
                        title: dataForm.title,
                        due_date: dataForm.due_date
                    }
                })

                if(data) loadDataSource();
            } else {            
                let data = await axios({
                    url : `http://localhost:3000/kanban`,
                    method: `POST`,
                    headers : {
                        token: localStorage.token
                    },
                    data : dataForm
                })
                
                if(data) loadDataSource();
            }
        } catch (error) {
            console.log(error, `<<<<<<<<<<< error handle OK`);
        }
        setModal({ ...modal, visible : false});
    };

    const handleEdit = async (id) => {
        try {
            const myForm = form;
    
            const data =  await axios({
                url: `${baseUrl}/kanban/${id}`,
                method: `GET`,
                headers: {
                    token: localStorage.token
                }
            })
            if(data) {
                let payload = {
                    ...data.data.data,
                    due_date: moment(data.data.data.due_date).format(`yyyy-MM-DD`)
                }
                myForm.setFieldsValue(payload);
                setModal({ ...modal, visible: true, data: payload, title: "Edit Task" });
            }
        } catch (error) {
            console.log(error, `<<<<<<<<<<< error edit data`);
        }
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

    const handleCancelModalDetail = () => {
        setModalDetail({ ...modalDetail, visible: false })
    };
    
    useEffect(()=> {
        loadDataSource();
    }, [])

    return(
        <>
        <Layout className="main-layout">
            <Header className="header">
                <Title className="title" level={1}>Kanban Board</Title>
            </Header>
            <Content className="site-layout">
                <div className="site-layout-background">
                    <Row>
                        <Col span={8}>
                            <CardBacklog
                                toOnProgres={toOnProgres}
                                handleDetail={handleDetail}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                dataKanban={dataKanban}
                                className="site-card-border-less-wrapper"
                                headStyle={{ backgroundColor: "#f7dce5" }}
                                bordered={false}
                                title="Backlog"
                                extra={<PlusCircleTwoTone onClick={handleModalAdd} style={{ fontSize : "25px", backgroundColor: "#f7dce5" }}/>}
                            />
                        </Col>
                        <Col span={8}>
                            <CardProgres
                                toDone={toDone}
                                handleDetail={handleDetail}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                dataKanban={dataKanban}
                                className="site-card-border-less-wrapper"
                                headStyle={{ backgroundColor: "#c9f2cc" }}
                                bordered={false}
                                title="On Progress"
                            />
                        </Col>
                        <Col span={8}>
                            <CardDone
                                handleDetail={handleDetail}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                dataKanban={dataKanban}
                                className="site-card-border-less-wrapper"
                                headStyle={{ backgroundColor: "#feecbb" }}
                                bordered={false}
                                title="Done"
                            />
                        </Col>
                    </Row>
                </div>
            <Footer className="footer">Kanban Web Apps created by @budibrass</Footer>
            </Content>
            <ModalForm
                title={modal.title} 
                visible={modal.visible} 
                onOk={handleOk} 
                onCancel={handleCancel} 
                form={form}
            />
            <ModalDetail 
                title={modalDetail.title}
                visible={modalDetail.visible}
                onCancel={handleCancelModalDetail}
                modalDetail={modalDetail}
            />
        </Layout>
        </>
    )
};

export default App;