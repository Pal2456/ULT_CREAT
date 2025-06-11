'use client'; // ✅ ทำให้ Component นี้ใช้ Client-side rendering ใน Next.js 13+

// 🧩 Import UI Components และ Hook ต่าง ๆ
import { Button, Col, DatePicker, Form, Input, Row, Select, ConfigProvider, Modal } from 'antd';
import { useState } from 'react';
import 'antd/dist/reset.css'; // ✅ รีเซ็ต CSS สำหรับ Ant Design ให้สะอาด
import Link from 'next/link';

const { Option } = Select; // 👉 สร้าง alias สำหรับ Select.Option

export default function Home() {
  // ✅ สร้าง form instance สำหรับควบคุมค่าฟอร์ม
  const [form] = Form.useForm();

  // 🔁 สร้าง state เพื่อเช็คว่าฟอร์มกรอกครบหรือยัง
  const [isFormValid, setIsFormValid] = useState(false);

  // 💾 เก็บค่าฟอร์มที่ผู้ใช้กรอกไว้ใน state
  const [formValues, setFormValues] = useState({});

  // 📦 State สำหรับแสดง Modal (สามารถใช้โชว์ preview ได้ ถ้าต้องการ)
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 🎨 Custom Theme สำหรับเปลี่ยนสีหลักของ Ant Design
  const customTheme = {
    token: {
      colorPrimary: '#7B41B3', // สีม่วงหลัก
      fontSize: 16
    },
    components: {
      Select: {
        colorBorder: '#d9d9d9',
        colorBorderHover: '#7B41B3',
        colorPrimary: '#7B41B3',
        colorPrimaryHover: '#9966CC'
      }
    }
  };

  // 📌 ฟิลด์ที่จำเป็นต้องกรอก
  const requiredFields = [
    'carType', 'plate', 'driver', 'datetime', 'mileage',
    'fuelType', 'liters', 'pricePerLiter', 'total', 'station'
  ];

  // ✅ ตรวจสอบว่าแต่ละฟิลด์มีค่าครบไหม
  const validateForm = (values) => {
    const isValid = requiredFields.every(field => values[field] !== undefined && values[field] !== null && values[field] !== '');
    setIsFormValid(isValid);
  };

  // 📦 เมื่อมีการเปลี่ยนแปลงค่าฟอร์ม
  const onValuesChange = (changedValues, allValues) => {
    // 🔁 ถ้าเปลี่ยนค่า liters หรือ pricePerLiter => คำนวณ total ใหม่อัตโนมัติ
    if (changedValues.liters || changedValues.pricePerLiter) {
      const liters = parseFloat(allValues.liters) || 0;
      const pricePerLiter = parseFloat(allValues.pricePerLiter) || 0;
      if (liters && pricePerLiter) {
        const total = liters * pricePerLiter;
        form.setFieldsValue({ total: total.toFixed(2) }); // ใส่ค่าที่คำนวณกลับเข้าไปในฟอร์ม
        allValues.total = total.toFixed(2); // อัปเดตใน allValues เพื่อ validate
      }
    }
    setFormValues(allValues);     // เก็บค่าล่าสุดไว้ใน state
    validateForm(allValues);      // ตรวจสอบความถูกต้อง
  };

  // ✅ เมื่อกดปุ่ม "สร้าง"
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields(); // ตรวจสอบความถูกต้องของฟอร์ม
      const liters = parseFloat(values.liters) || 0;
      const pricePerLiter = parseFloat(values.pricePerLiter) || 0;
      values.total = (liters * pricePerLiter).toFixed(2); // คำนวณจำนวนเงินรวม
      setFormValues(values); // เก็บข้อมูลสุดท้ายไว้
      setIsModalVisible(true); // 🔔 เปิด Modal (กรณีต้องการยืนยัน)
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <ConfigProvider theme={customTheme}>
      <div
        style={{
          width: '600px', height: '852px', margin: '40px auto',
          background: '#fff', padding: 24, borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflowY: 'auto',
          display: 'flex', flexDirection: 'column'
        }}
      >
        {/* 🔰 หัวเรื่อง */}
        <Row justify="space-between" align="middle" style={{ marginBottom: 15, width: '100%' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#000' }}>สร้างรายการน้ำมัน</div>
          <Button type="text" style={{ color: '#000', fontSize: '90px', fontWeight: 'bold', lineHeight: 1 }}>X</Button>
        </Row>

        {/* 🔻 เส้นคั่น */}
        <div style={{ height: '1px', backgroundColor: '#e0e0e0', width: '100%', marginBottom: 20 }} />

        {/* ✅ ฟอร์มหลัก */}
        <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
          
          {/* 🔹 ส่วนที่ 1: ข้อมูลรถและคนขับ */}
          <div style={{ backgroundColor: '#7B41B31A', color: '#8000b3', padding: '12px 20px', borderRadius: '999px', fontWeight: '600', marginBottom: '24px', fontSize: '16px' }}>ข้อมูลรถและคนขับ</div>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={<span style={{ fontWeight: 'bold' }}>ประเภทรถ</span>} name="carType">
                <Select placeholder="ประเภทรถ" allowClear>
                  <Option value="4ล้อ">4 ล้อ</Option>
                  <Option value="6ล้อ">6 ล้อ</Option>
                  <Option value="10ล้อ">10 ล้อ</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<span style={{ fontWeight: 'bold' }}>ทะเบียน</span>} name="plate">
                <Select placeholder="ทะเบียน" allowClear>
                  <Option value="1กข1234">1กข1234</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label={<span style={{ fontWeight: 'bold' }}>ชื่อคนขับ</span>} name="driver">
                <Select placeholder="ชื่อคนขับ" allowClear>
                  <Option value="สมชาย">สมชาย</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* 🔹 ส่วนที่ 2: ข้อมูลการเติมน้ำมัน */}
          <div style={{ backgroundColor: '#7B41B31A', color: '#8000b3', padding: '12px 20px', borderRadius: '999px', fontWeight: '600', marginBottom: '24px', fontSize: '16px' }}>ข้อมูลการเติมน้ำมัน</div>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={<span style={{ fontWeight: 'bold' }}>วันเวลาที่เติม</span>} name="datetime">
                <DatePicker showTime style={{ width: '100%' }} placeholder="วันที่เติม" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<span style={{ fontWeight: 'bold' }}>เลขไมล์</span>} name="mileage">
                <Input placeholder="เลขไมล์" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<span style={{ fontWeight: 'bold' }}>ประเภทน้ำมัน</span>} name="fuelType">
                <Select placeholder="ประเภทน้ำมัน" allowClear>
                  <Option value="ดีเซล">ดีเซล</Option>
                  <Option value="เบนซิน">เบนซิน</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<span style={{ fontWeight: 'bold' }}>จำนวนลิตร</span>} name="liters">
                <Input placeholder="จำนวนลิตร" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<span style={{ fontWeight: 'bold' }}>ราคาน้ำมัน / ลิตร</span>} name="pricePerLiter">
                <Input placeholder="ราคาน้ำมัน / ลิตร" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<span style={{ fontWeight: 'bold' }}>จำนวนเงินที่เติม</span>} name="total">
                <Input readOnly placeholder="จำนวนเงินที่เติม (คำนวณอัตโนมัติ)" style={{ backgroundColor: '#f5f5f5', color: '#000', fontWeight: 'bold' }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label={<span style={{ fontWeight: 'bold' }}>สถานีบริการน้ำมัน</span>} name="station">
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

          {/* 🔘 ปุ่มกดด้านล่าง */}
          <Row justify="center" gutter={16} style={{ marginTop: 32 }}>
            <Col>
              <Button size="large" style={{ padding: '12px 47px', fontSize: '16px', height: '48px', borderRadius: '8px' }}>ยกเลิก</Button>
            </Col>
            <Col>
              <Button
                size="large"
                type="primary"
                disabled={!isFormValid}
                onClick={handleSubmit}
                style={{
                  padding: '12px 47px',
                  fontSize: '16px',
                  height: '48px',
                  borderRadius: '8px',
                  opacity: isFormValid ? 1 : 0.5,
                  cursor: isFormValid ? 'pointer' : 'not-allowed'
                }}
              >
                สร้าง
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </ConfigProvider>
  );
}
