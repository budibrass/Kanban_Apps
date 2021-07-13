// import React, { useState } from 'react';
// import { Modal, Button, Form, Input } from 'antd';
// import { useForm } from 'antd/lib/form/Form';

// const App = () => {
//     const [form] = Form.useForm();
//     const [isModalVisible, setIsModalVisible] = useState(false);

//     const showModal = () => {
//         setIsModalVisible(true);
//     };

//     const handleOk = () => {
//         setIsModalVisible(false);
//     };

//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };

//     return (
//         <>
//         <Button type="primary" onClick={showModal}>
//             Open Modal
//         </Button>
//         <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//         <Form
//             name="basic"
//             labelCol={{
//                 span: 6,
//             }}
//             wrapperCol={{
//                 span: 16,
//             }}
//             form={form}
//             onFinish={login}
//             >
//             <Form.Item
//                 label="email"
//                 name="email"
//             >
//             <Input />
//             </Form.Item>

//             <Form.Item
//                 label="Password"
//                 name="password"
//             >
//             <Input.Password />
//             </Form.Item>

//             <Form.Item
//                 // wrapperCol={{
//                 // offset: 8,
//                 // span: 16,
//                 // }}
//             >
//                 <Button style={{width : "150%"}} type="primary" htmlType="submit">
//                 Submit
//                 </Button>
//             </Form.Item>
//                 <label>Don't have account ? <Link to="/register">Register</Link></label>
//             </Form>
//         </Modal>
//         </>
//     );
// };

// export default App;