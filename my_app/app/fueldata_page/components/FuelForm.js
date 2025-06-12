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
          width: '100%',          // full width of drawer
          maxWidth: '600px',      // optional limit
          
          
          background: '#fff',
          
          
          
          
        }}
      >
        
        


        



        {/* ✅ ฟอร์มหลัก */}
        <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
          
          {/* 🔹 ส่วนที่ 1: ข้อมูลรถและคนขับ */}
          <div
            style={{
              backgroundColor: '#EBDDFF',      // softer purple for clarity
              color: '#7B41B3',                // text color
              padding: '10px 20px',           // increase vertical + horizontal padding
              borderRadius: '10px',           // rounder corners
              fontWeight: 600,
              fontSize: '16px',               // bigger font
              marginBottom: '16px',
              width: '100%',                  // full width
              boxSizing: 'border-box',        // prevent overflow
            }}
          >
            ข้อมูลรถและคนขับ
          </div>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label={<span style={{ fontWeight: 'bold', fontSize: 14 }}>ประเภทรถ</span>} name="carType">
                  <Select placeholder="ประเภทรถ" allowClear style={{ width: 268, height: 40, fontSize: 14 }}>
                    <Option value="4ล้อ">4 ล้อ</Option>
                    <Option value="6ล้อ">6 ล้อ</Option>
                    <Option value="10ล้อ">10 ล้อ</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span style={{ fontWeight: 'bold', fontSize: 14 }}>ทะเบียน</span>} name="plate">
                  <Select placeholder="ทะเบียน" allowClear style={{ width: 268, height: 40, fontSize: 14 }}>
                    <Option value="1กข1234">1กข1234</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={<span style={{ fontWeight: 'bold', fontSize: 14 }}>ชื่อคนขับ</span>} name="driver">
                  <Select placeholder="ชื่อคนขับ" allowClear style={{ width: 268, height: 40, fontSize: 14 }}>
                    <Option value="สมชาย">สมชาย</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>


          {/* 🔹 ส่วนที่ 2: ข้อมูลการเติมน้ำมัน */}
          <div
            style={{
              backgroundColor: '#EBDDFF',      // softer purple for clarity
              color: '#7B41B3',                // text color
              padding: '10px 20px',           // increase vertical + horizontal padding
              borderRadius: '10px',           // rounder corners
              fontWeight: 600,
              fontSize: '16px',               // bigger font
              marginBottom: '16px',
              width: '100%',                  // full width
              boxSizing: 'border-box',        // prevent overflow
            }}
          >
            ข้อมูลการเติมน้ำมัน
          </div>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label={<span style={{ fontWeight: 'bold', fontSize: 14 }}>วันเวลาที่เติม</span>} name="datetime">
                  <DatePicker showTime style={{ width: 268, height: 40, fontSize: 14 }} placeholder="วันที่เติม" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span style={{ fontWeight: 'bold', fontSize: 14 }}>เลขไมล์</span>} name="mileage">
                  <Input placeholder="เลขไมล์" style={{ width: 268, height: 40, fontSize: 14 }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span style={{ fontWeight: 'bold', fontSize: 14 }}>ประเภทน้ำมัน</span>} name="fuelType">
                  <Select placeholder="ประเภทน้ำมัน" allowClear style={{ width: 268, height: 40, fontSize: 14 }}>
                    <Option value="ดีเซล">ดีเซล</Option>
                    <Option value="เบนซิน">เบนซิน</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span style={{ fontWeight: 'bold', fontSize: 14 }}>จำนวนลิตร</span>} name="liters">
                  <Input placeholder="จำนวนลิตร" style={{ width: 268, height: 40, fontSize: 14 }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span style={{ fontWeight: 'bold', fontSize: 14 }}>ราคาน้ำมัน / ลิตร</span>} name="pricePerLiter">
                  <Input placeholder="ราคาน้ำมัน / ลิตร" style={{ width: 268, height: 40, fontSize: 14 }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span style={{ fontWeight: 'bold', fontSize: 14 }}>จำนวนเงินที่เติม</span>} name="total">
                  <Input
                    readOnly
                    placeholder="จำนวนเงินที่เติม (คำนวณอัตโนมัติ)"
                    style={{
                      backgroundColor: '#f5f5f5',
                      color: '#000',
                      fontWeight: 'bold',
                      width: 268,
                      height: 40,
                      fontSize: 14
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={<span style={{ fontWeight: 'bold', fontSize: 14 }}>สถานีบริการน้ำมัน</span>} name="station">
                  <Select placeholder="สถานีบริการน้ำมัน" allowClear style={{ width: 268, height: 40, fontSize: 14 }}>
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



          {/* 🔘 ปุ่มกดด้านล่าง แบบติดขอบล่างและมีเส้นคั่น */}
          </Form>

          {/* Footer Actions */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              borderTop: '1px solid #e0e0e0',
              backgroundColor: '#f5f5f5',
              padding: '16px 0',
              display: 'flex',
              justifyContent: 'center',
              gap: '16px'
            }}
          >
            <Button
              size="large"
              style={{
                width: '120px',
                height: '40px',
                fontSize: '14px',
                borderRadius: '8px'
              }}
            >
              ยกเลิก
            </Button>
            <Button
              size="large"
              type="primary"
              disabled={!isFormValid}
              onClick={handleSubmit}
              style={{
                width: '120px',
                height: '40px',
                fontSize: '14px',
                borderRadius: '8px',
                opacity: isFormValid ? 1 : 0.5,
                cursor: isFormValid ? 'pointer' : 'not-allowed'
              }}
            >
              สร้าง
            </Button>
          </div>

          </div> {/* close main form container */}
          </ConfigProvider>

  );
}
