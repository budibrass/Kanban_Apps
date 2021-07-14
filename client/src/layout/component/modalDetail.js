import React from 'react';
import { Row, Col, Modal, Card } from 'antd';

const App = ({ title, visible, onCancel, modalDetail }) => {

    return(
        <>
        <Modal title={title} visible={visible} onCancel={onCancel} footer={null}>
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
        </>
    )
};

export default App;