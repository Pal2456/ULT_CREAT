'use client';

import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, Typography, ConfigProvider, Modal } from 'antd';
import { useState, useEffect } from 'react';
import 'antd/dist/reset.css';
import Link from 'next/link';

const { Title } = Typography;
const { Option } = Select;

export default function Home() {
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  // กำหนดธีมสีสำหรับ Select
  const customTheme = {
    token: {
      colorPrimary: '#7B41B3', // สีหลัก
    },
    components: {
      Select: {
        colorBorder: '#d9d9d9', // สีกรอบปกติ (สีเทาเริ่มต้น)
        colorBorderHover: '#7B41B3', // สีกรอบเมื่อ hover (สีม่วง)
        colorPrimary: '#7B41B3', // สีเมื่อ focus
        colorPrimaryHover: '#9966CC', // สีเมื่อ hover และ focus
      },
    },
  };

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

    // คำนวณ total อีกครั้ง (เผื่อผู้ใช้ไม่ขยับตัวเลขหลัง input)
    const liters = parseFloat(values.liters) || 0;
    const pricePerLiter = parseFloat(values.pricePerLiter) || 0;
    values.total = (liters * pricePerLiter).toFixed(2);

    // log ข้อมูลลง console
    console.log('📦 ข้อมูลที่ถูกส่ง:', values);

    // บันทึกค่าเข้า state เพื่อเอาไปใช้ใน popup
    setFormValues(values);

    // แสดง popup
    setIsModalVisible(true);

  } catch (error) {
    console.error('Validation failed:', error);
  }
};



  return (
    <ConfigProvider theme={customTheme}>
      <div
        style={{
          width: '600px',               // ความกว้างตามภาพ
          height: '852px',              // ความสูงตามภาพ
          margin: '40px auto',
          background: '#fff',
          padding: 24,
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          overflowY: 'auto',           // ✅ เลื่อน scroll ได้หากเกินความสูง
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Row justify="space-between" align="middle" style={{ marginBottom: 0 }}>
          
          <>
            <Row justify="space-between" align="middle" style={{ marginBottom: 15, width: '100%' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#000' }}>
                สร้างรายการน้ำมัน
              </div>

              <Button
                type="text"
                style={{
                  color: '#000',        // Black color
                  fontSize: '90px',     // Bigger size
                  fontWeight: 'bold',   // Optional for thicker X
                  lineHeight: 1
                }}
              >
                X
              </Button>

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

                <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
            <div style={{ backgroundColor: '#7B41B31A', color: '#8000b3', padding: '12px 20px', borderRadius: '999px', fontWeight: '600', marginBottom: '24px', fontSize: '16px' }}>ข้อมูลรถและคนขับ</div>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="ประเภทรถ" name="carType" rules={[{ message: 'กรุณาเลือกประเภทรถ' }]}>
                  <Select placeholder="ประเภทรถ" allowClear style={{ backgroundColor: '#fff' }}>
                    <Option value="4ล้อ">4 ล้อ</Option>
                    <Option value="6ล้อ">6 ล้อ</Option>
                    <Option value="10ล้อ">10 ล้อ</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="ทะเบียน" name="plate" rules={[{ message: 'กรุณาเลือกทะเบียน' }]}>
                  <Select placeholder="ทะเบียน" allowClear style={{ backgroundColor: '#fff' }}>
                    <Option value="1กข1234">1กข1234</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="ชื่อคนขับ" name="driver" rules={[{ message: 'กรุณาเลือกชื่อคนขับ' }]}>
                  <Select placeholder="ชื่อคนขับ" allowClear style={{ backgroundColor: '#fff' }}>
                    <Option value="สมชาย">สมชาย</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <div style={{ backgroundColor: '#7B41B31A', color: '#8000b3', padding: '12px 20px', borderRadius: '999px', fontWeight: '600', marginBottom: '24px', fontSize: '16px' }}>ข้อมูลการเติมน้ำมัน</div>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="วันเวลาที่เติม" name="datetime">
                  <DatePicker showTime style={{ width: '100%', backgroundColor: '#fff' }} placeholder="วันที่เติม" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="เลขไมล์"
                  name="mileage"
                  rules={[
                    { message: 'กรุณากรอกเลขไมล์' },
                    { pattern: /^\d+$/, message: 'กรุณากรอกตัวเลขเท่านั้น' }
                  ]}
                >
                  <Input placeholder="เลขไมล์" autoComplete="off" style={{ backgroundColor: '#fff' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="ประเภทน้ำมัน" name="fuelType" rules={[{ message: 'กรุณาเลือกประเภทน้ำมัน' }]}>
                  <Select placeholder="ประเภทน้ำมัน" allowClear style={{ backgroundColor: '#fff' }}>
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
                    { message: 'กรุณากรอกจำนวนลิตร' },
                    { pattern: /^\d+(\.\d+)?$/, message: 'กรุณากรอกตัวเลขเท่านั้น' }
                  ]}
                >
                  <Input placeholder="จำนวนลิตร" autoComplete="off" style={{ backgroundColor: '#fff' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="ราคาน้ำมัน / ลิตร"
                  name="pricePerLiter"
                  rules={[
                    { message: 'กรุณากรอกราคาน้ำมัน / ลิตร' },
                    { pattern: /^\d+(\.\d+)?$/, message: 'กรุณากรอกตัวเลขเท่านั้น' }
                  ]}
                >
                  <Input placeholder="ราคาน้ำมัน / ลิตร" autoComplete="off" style={{ backgroundColor: '#fff' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="จำนวนเงินที่เติม"
                  name="total"
                  rules={[
                    { message: 'กรุณากรอกจำนวนลิตรและราคาน้ำมัน' },
                    { pattern: /^\d+(\.\d+)?$/, message: 'กรุณากรอกตัวเลขเท่านั้น' }
                  ]}
                >
                  <Input
                    placeholder="จำนวนเงินที่เติม (คำนวณอัตโนมัติ)"
                    readOnly
                    style={{
                      backgroundColor: '#f5f5f5',
                      color: '#000000',
                      fontWeight: 'bold'
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="สถานีบริการน้ำมัน" name="station" rules={[{ message: 'กรุณาเลือกสถานีบริการน้ำมัน' }]}>
                  <Select placeholder="สถานีบริการน้ำมัน" allowClear style={{ backgroundColor: '#fff' }}>
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
          
            <Modal
              title="สร้างรายการสำเร็จ"
              open={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              footer={[
                <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                  ปิด
                </Button>,
                <Link key="info" href="/info">
                  <Button type="primary">ไปที่หน้า Info</Button>
                </Link>
              ]}
            >
              <p><strong>ประเภทรถ:</strong> {formValues.carType}</p>
              <p><strong>ทะเบียน:</strong> {formValues.plate}</p>
              <p><strong>ชื่อคนขับ:</strong> {formValues.driver}</p>
              <p><strong>วันเวลาที่เติม:</strong> {formValues.datetime?.format?.("YYYY-MM-DD HH:mm:ss") || String(formValues.datetime)}</p>
              <p><strong>เลขไมล์:</strong> {formValues.mileage}</p>
              <p><strong>ประเภทน้ำมัน:</strong> {formValues.fuelType}</p>
              <p><strong>จำนวนลิตร:</strong> {formValues.liters}</p>
              <p><strong>ราคาน้ำมัน / ลิตร:</strong> {formValues.pricePerLiter}</p>
              <p><strong>จำนวนเงินที่เติม:</strong> {formValues.total}</p>
              <p><strong>สถานีบริการน้ำมัน:</strong> {formValues.station}</p>
            </Modal>

          

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
    </ConfigProvider>
  );
}