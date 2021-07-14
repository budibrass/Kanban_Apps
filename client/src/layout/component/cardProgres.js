import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { EditTwoTone, InfoCircleTwoTone, DeleteTwoTone } from '@ant-design/icons';

const App = (props) => {
    const { title, style, bordered, headStyle, extra, content, className } = props;
    const dataKanban = props.dataKanban;

    const handleDetail = (id) =>{
        props.handleDetail(id);
    };

    const handleEdit = (id) => {
        props.handleEdit(id);
    };

    const handleDelete = (id) => {
        props.handleDelete(id)
    };

    const toDone = (id) => {
        props.toDone(id)
    };

    return(
        <>
        <div className={className}>
            <Card title={title} bordered={bordered} headStyle={headStyle} style={style} extra={extra} content={content}>
                {dataKanban.map((e) => {
                    if(e.category === "on progres") {
                        return (
                            <Row key={e.id}>
                                <Col span={24}>
                                    <Card className="progres-card" headStyle={{ fontSize: "20px", backgroundColor: "#30e53f", borderRadius: "10px" }} title={e.title} >
                                        Tenggat Waktu : {e.due_date.slice(0, 10)} 
                                        <Button onClick={()=> toDone(e.id)} style={{ marginTop: 3, marginLeft: 3, backgroundColor: "gray" }} size="small">next</Button>
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
        </>
    )
};

export default App;