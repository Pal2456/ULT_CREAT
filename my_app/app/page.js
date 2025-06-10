'use client';

import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, Typography } from 'antd';
import 'antd/dist/reset.css';

const { Title } = Typography;
const { Option } = Select;

export default function Home() {
  const [form] = Form.useForm();

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0 }}>สร้างรายการน้ำมัน</Title>
        <Button type="text" danger>X</Button>
      </Row>

      <Form form={form} layout="vertical">
        <Divider orientation="left" orientationMargin="0">ข้อมูลรถและคนขับ</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="ประเภทรถ" name="carType">
              <Select placeholder="ประเภทรถ" allowClear>
                <Option value="4ล้อ">4 ล้อ</Option>
                <Option value="6ล้อ">6 ล้อ</Option>
                <Option value="10ล้อ">10 ล้อ</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="ทะเบียน" name="plate">
              <Select placeholder="ทะเบียน" allowClear>
                <Option value="1กข1234">1กข1234</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="ชื่อคนขับ" name="driver">
              <Select placeholder="ชื่อคนขับ" allowClear>
                <Option value="สมชาย">สมชาย</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left" orientationMargin="0">ข้อมูลการเติมน้ำมัน</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="วันเวลาที่เติม" name="datetime">
              <DatePicker showTime style={{ width: '100%' }} placeholder="วันที่เติม" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="เลขไมล์" name="mileage">
              <Input placeholder="เลขไมล์" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="ประเภทน้ำมัน" name="fuelType">
              <Select placeholder="ประเภทน้ำมัน" allowClear>
                <Option value="ดีเซล">ดีเซล</Option>
                <Option value="เบนซิน">เบนซิน</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="จำนวนลิตร" name="liters">
              <Input placeholder="จำนวนลิตร" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="ราคาน้ำมัน / ลิตร" name="pricePerLiter">
              <Input placeholder="ราคาน้ำมัน / ลิตร" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="จำนวนเงินที่เติม" name="total">
              <Input placeholder="จำนวนเงินที่เติม"  />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="สถานีบริการน้ำมัน" name="station">
              <Select placeholder="สถานีบริการน้ำมัน" allowClear>
                <Option value="ptt">ปตท.</Option>
                <Option value="บางจาก">บางจาก</Option>
                <Option value="เชลล์">เชลล์</Option>
                <Option value="เเอสโซ่">เอสโซ่</Option>
                <Option value="คาลเท็กซ์">คาลเท็กซ์</Option>
                <Option value="พีที">พีที</Option>
                <Option value="ซัลโก้">ซัลโก้</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center" gutter={16} style={{ marginTop: 32 }}>
          <Col>
            <Button>ยกเลิก</Button>
          </Col>
          <Col>
            <Button type="primary" >สร้าง</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
