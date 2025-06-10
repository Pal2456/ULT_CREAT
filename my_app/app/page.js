'use client';

import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, Typography } from 'antd';
import { useState, useEffect } from 'react';
import 'antd/dist/reset.css';

const { Title } = Typography;
const { Option } = Select;

export default function Home() {
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);
  const [formValues, setFormValues] = useState({});

  // กำหนดช่องที่จำเป็นต้องกรอก
  const requiredFields = [
    'carType',
    'plate', 
    'driver',
    'datetime',
    'mileage',
    'fuelType',
    'liters',
    'pricePerLiter',
    'total',
    'station'
  ];

  // ตรวจสอบความถูกต้องของฟอร์ม
  const validateForm = (values) => {
    const isValid = requiredFields.every(field => {
      const value = values[field];
      return value !== undefined && value !== null && value !== '';
    });
    setIsFormValid(isValid);
  };

  // เมื่อมีการเปลี่ยนแปลงใน form
  const onValuesChange = (changedValues, allValues) => {
    // คำนวณจำนวนเงินที่เติม ถ้ามีการเปลี่ยนแปลงจำนวนลิตรหรือราคาต่อลิตร
    if (changedValues.liters || changedValues.pricePerLiter) {
      const liters = parseFloat(allValues.liters) || 0;
      const pricePerLiter = parseFloat(allValues.pricePerLiter) || 0;
      const total = liters * pricePerLiter;
      
      if (liters && pricePerLiter) {
        form.setFieldsValue({
          total: total.toFixed(2)
        });
        allValues.total = total.toFixed(2);
      }
    }
    
    setFormValues(allValues);
    validateForm(allValues);
  };

  // เมื่อกดปุ่มสร้าง
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);
      // ส่งข้อมูลไปยัง API หรือประมวลผลต่อไป
      alert('สร้างรายการน้ำมันสำเร็จ!');
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 0 }}>
        
        <>
          <Row justify="space-between" align="middle" style={{ marginBottom: 15, width: '100%' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#000' }}>
              สร้างรายการน้ำมัน
            </div>

            <Button type="text" danger>X</Button>
          </Row>

          <div
            style={{
              height: '1px',
              backgroundColor: '#e0e0e0',
              width: '100%',
              marginBottom: 20, // space after the line
            }}
          />
        </>

        
      </Row>

      <Form 
        form={form} 
        layout="vertical"
        onValuesChange={onValuesChange}
      >
        <div
          style={{
            backgroundColor: '#7B41B31A', // soft light purple
            color: '#8000b3',           // dark purple text
            padding: '12px 20px',
            borderRadius: '999px',
            fontWeight: '500',
            marginBottom: '24px',
            fontSize: '14px',
            width: '100%',
          }}
        >
          ข้อมูลรถและคนขับ
        </div>


        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
              label="ประเภทรถ" 
              name="carType"
              rules={[{  message: 'กรุณาเลือกประเภทรถ' }]}
            >
              <Select placeholder="ประเภทรถ" allowClear>
                <Option value="4ล้อ">4 ล้อ</Option>
                <Option value="6ล้อ">6 ล้อ</Option>
                <Option value="10ล้อ">10 ล้อ</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="ทะเบียน" 
              name="plate"
              rules={[{  message: 'กรุณาเลือกทะเบียน' }]}
            >
              <Select placeholder="ทะเบียน" allowClear>
                <Option value="1กข1234">1กข1234</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item 
              label="ชื่อคนขับ" 
              name="driver"
              rules={[{  message: 'กรุณาเลือกชื่อคนขับ' }]}
            >
              <Select placeholder="ชื่อคนขับ" allowClear>
                <Option value="สมชาย">สมชาย</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <div
          style={{
            backgroundColor: '#7B41B31A', // soft light purple
            color: '#8000b3',           // dark purple text
            padding: '12px 20px',
            borderRadius: '999px',
            fontWeight: '500',
            marginBottom: '24px',
            fontSize: '14px',
            width: '100%',
          }}
        >
          ข้อมูลการเติมน้ำมัน
        </div>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
              label="วันเวลาที่เติม" 
              name="datetime"
              rules={[{  message: 'กรุณาเลือกวันเวลาที่เติม' }]}
            >
              <DatePicker showTime style={{ width: '100%' }} placeholder="วันที่เติม" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="เลขไมล์" 
              name="mileage"
              rules={[
                {  message: 'กรุณากรอกเลขไมล์' },
                { pattern: /^\d+$/, message: 'กรุณากรอกตัวเลขเท่านั้น' }
              ]}
            >
              <Input placeholder="เลขไมล์" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="ประเภทน้ำมัน" 
              name="fuelType"
              rules={[{  message: 'กรุณาเลือกประเภทน้ำมัน' }]}
            >
              <Select placeholder="ประเภทน้ำมัน" allowClear>
                <Option value="ดีเซล">ดีเซล</Option>
                <Option value="เบนซิน">เบนซิน</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="จำนวนลิตร" 
              name="liters"
              rules={[
                {  message: 'กรุณากรอกจำนวนลิตร' },
                { pattern: /^\d+(\.\d+)?$/, message: 'กรุณากรอกตัวเลขเท่านั้น' }
              ]}
            >
              <Input placeholder="จำนวนลิตร" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="ราคาน้ำมัน / ลิตร" 
              name="pricePerLiter"
              rules={[
                {  message: 'กรุณากรอกราคาน้ำมัน / ลิตร' },
                { pattern: /^\d+(\.\d+)?$/, message: 'กรุณากรอกตัวเลขเท่านั้น' }
              ]}
            >
              <Input placeholder="ราคาน้ำมัน / ลิตร" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="จำนวนเงินที่เติม" 
              name="total"
              rules={[
                {  message: 'กรุณากรอกจำนวนลิตรและราคาน้ำมัน' },
                { pattern: /^\d+(\.\d+)?$/, message: 'กรุณากรอกตัวเลขเท่านั้น' }
              ]}
            >
              <Input 
                placeholder="จำนวนเงินที่เติม (คำนวณอัตโนมัติ)" 
                readOnly
                style={{ 
                  backgroundColor: '#f5f5f5',
                  color: '#1890ff',
                  fontWeight: 'bold'
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item 
              label="สถานีบริการน้ำมัน" 
              name="station"
              rules={[{  message: 'กรุณาเลือกสถานีบริการน้ำมัน' }]}
            >
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
            <Button 
              type="primary" 
              disabled={!isFormValid}
              onClick={handleSubmit}
              style={{
                opacity: isFormValid ? 1 : 0.5,
                cursor: isFormValid ? 'pointer' : 'not-allowed'
              }}
            >
              สร้าง
            </Button>
          </Col>
        </Row>

        {/* แสดงสถานะของฟอร์ม */}
        <Row justify="center" style={{ marginTop: 16 }}>
          <Col>
            <div style={{ 
              textAlign: 'center', 
              fontSize: '14px',
              color: isFormValid ? '#52c41a' : '#8c8c8c'
            }}>
              
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}