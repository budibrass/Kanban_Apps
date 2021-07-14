import React from 'react';
import { Modal, Form, Input } from 'antd';

const App = ({ title, visible, onOk, onCancel, form}) => {
    // const [form] = Form.useForm();

    return(
        <>
        <Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
            <Form 
                name="basic"
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
        </>
    )
};

export default App;