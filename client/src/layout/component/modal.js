import React from 'react';
import { Modal, Form, Input, Button, DatePicker } from 'antd';

const App = ({ title, visible, onOk, onCancel, form, handleDisableDate}) => {

    return(
        <>
        <Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel} footer={null}>
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
                onFinish={onOk}
            >
                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Title wajib diisi' }]}>
                    <Input width="100%" />
                </Form.Item>
                <Form.Item label="Batas Waktu" name="due_date" rules={[{ required: true, message: 'Tanggal wajib diisi' }]} >
                    {/* <Input type="date" /> */}
                    <DatePicker style={{ width: "100%"}}  disabledDate={handleDisableDate} />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
        </>
    )
};

export default App;