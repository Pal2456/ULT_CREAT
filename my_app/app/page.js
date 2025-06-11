'use client';

import { Button, Col, DatePicker, Form, Input, Row, Select, Typography, ConfigProvider, Modal } from 'antd';
import { useState } from 'react';
import 'antd/dist/reset.css';
import Link from 'next/link';

const { Option } = Select;

export default function Home() {
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const customTheme = {
    token: {
      colorPrimary: '#7B41B3',
      fontSize: 16,
    },
    components: {
      Select: {
        colorBorder: '#d9d9d9',
        colorBorderHover: '#7B41B3',
        colorPrimary: '#7B41B3',
        colorPrimaryHover: '#9966CC',
      },
    },
  };

  const requiredFields = [
    'carType', 'plate', 'driver', 'datetime', 'mileage',
    'fuelType', 'liters', 'pricePerLiter', 'total', 'station'
  ];

  const validateForm = (values) => {
    const isValid = requiredFields.every(field => values[field] !== undefined && values[field] !== null && values[field] !== '');
    setIsFormValid(isValid);
  };

  const onValuesChange = (changedValues, allValues) => {
    if (changedValues.liters || changedValues.pricePerLiter) {
      const liters = parseFloat(allValues.liters) || 0;
      const pricePerLiter = parseFloat(allValues.pricePerLiter) || 0;
      if (liters && pricePerLiter) {
        const total = liters * pricePerLiter;
        form.setFieldsValue({ total: total.toFixed(2) });
        allValues.total = total.toFixed(2);
      }
    }
    setFormValues(allValues);
    validateForm(allValues);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const liters = parseFloat(values.liters) || 0;
      const pricePerLiter = parseFloat(values.pricePerLiter) || 0;
      values.total = (liters * pricePerLiter).toFixed(2);
      setFormValues(values);
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
        <Row justify="space-between" align="middle" style={{ width: '100%' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#000' }}>
            สร้างรายการน้ำมัน
          </div>
          <Button
            type="text"
            style={{
              color: '#000',
              fontSize: '24px',
              fontWeight: 'bold',
              lineHeight: 1,
              padding: 0,
            }}
          >
            X
          </Button>
        </Row>

        {/* Force-visible separator line */}
        <div
          style={{
            borderBottom: '1px solid #e0e0e0',
            width: '100%',
            marginTop: '12px',
            marginBottom: '20px',
          }}
        />


        <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
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

          <div style={{ backgroundColor: '#7B41B31A', color: '#8000b3', padding: '12px 20px', borderRadius: '999px', fontWeight: '600', marginBottom: '24px', fontSize: '16px' }}>ข้อมูลการเติมน้ำมัน</div>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={<span style={{ fontWeight: 'bold' }}>วันเวลาที่เติม</span>} name="datetime">
                <DatePicker showTime style={{ width: '100%' }} placeholder="วันที่เติม" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<span style={{ fontWeight: 'bold' }}>เลขไมล์</span>} name="mileage">
                <Input placeholder="เลขไมล์" style={{ width: '100%', height: '32px' }} />


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
                
                <Input placeholder="จำนวนลิตร" style={{ width: '100%', height: '32px' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<span style={{ fontWeight: 'bold' }}>ราคาน้ำมัน / ลิตร</span>} name="pricePerLiter">
                
                <Input placeholder="ราคาน้ำมัน / ลิตร" style={{ width: '100%', height: '32px' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<span style={{ fontWeight: 'bold' }}>จำนวนเงินที่เติม</span>} name="total">
                <Input
                  readOnly
                  placeholder="จำนวนเงินที่เติม (คำนวณอัตโนมัติ)"
                  style={{
                    backgroundColor: '#f5f5f5',
                    color: '#000',
                    fontWeight: 'bold',
                    height: '32px',
                    width: '100%'
                  }}
                />

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

          {/* Line above buttons */}
          <div style={{ height: '1px', backgroundColor: '#e0e0e0', width: '100%', marginTop: 24, marginBottom: 24 }} />

          <Row justify="center" gutter={16}>
            <Col>
              <Button
                size="large"
                style={{
                  padding: '12px 47px',
                  fontSize: '16px',
                  height: '48px',
                  borderRadius: '8px',
                }}
              >
                ยกเลิก
              </Button>
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
                  cursor: isFormValid ? 'pointer' : 'not-allowed',
                }}
              >
                สร้าง
              </Button>
            </Col>
          </Row>


          <Modal
            title={
              <div>
                <div style={{ fontSize: '18px', fontWeight: 600 }}>รายละเอียด</div>
                <div style={{ height: '1px', backgroundColor: '#e0e0e0', marginTop: 8 }} />
              </div>
            }
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={[
              <Button key="cancel" onClick={() => setIsModalVisible(false)}>ปิด</Button>,
              <Link key="info" href="/info">
                <Button type="primary">ไปที่หน้า Info</Button>
              </Link>
            ]}
          >
            <div style={{ marginBottom: 24 }}>
              <div style={{ backgroundColor: '#F3E8FF', fontWeight: 600, padding: '6px 12px', borderRadius: 8, marginBottom: 16, color: '#7B41B3' }}>
                ข้อมูลรถและคนขับ
              </div>
              <Row gutter={[16, 8]}>
                <Col span={12}><strong>ประเภทรถ:</strong></Col>
                <Col span={12}>{formValues.carType}</Col>

                <Col span={12}><strong>ทะเบียน:</strong></Col>
                <Col span={12}>{formValues.plate}</Col>

                <Col span={12}><strong>ชื่อคนขับ:</strong></Col>
                <Col span={12}>{formValues.driver}</Col>
              </Row>
            </div>

            <div>
              <div style={{ backgroundColor: '#F3E8FF', fontWeight: 600, padding: '6px 12px', borderRadius: 8, marginBottom: 16, color: '#7B41B3' }}>
                ข้อมูลการเติมน้ำมัน
              </div>
              <Row gutter={[16, 8]}>
                <Col span={12}><strong>วันเวลาที่เติม:</strong></Col>
                <Col span={12}>{formValues.datetime?.format?.("DD/MM/YY HH:mm") || String(formValues.datetime)}</Col>

                <Col span={12}><strong>เลขไมล์:</strong></Col>
                <Col span={12}>{formValues.mileage} KM</Col>

                <Col span={12}><strong>ประเภทน้ำมัน:</strong></Col>
                <Col span={12}>{formValues.fuelType}</Col>

                <Col span={12}><strong>จำนวนลิตร:</strong></Col>
                <Col span={12}>{formValues.liters} liter</Col>

                <Col span={12}><strong>ราคาน้ำมัน / ลิตร:</strong></Col>
                <Col span={12}>{parseFloat(formValues.pricePerLiter).toFixed(2)} บาท</Col>

                <Col span={12}><strong>จำนวนเงินที่เติม:</strong></Col>
                <Col span={12}>{parseFloat(formValues.total).toLocaleString()} บาท</Col>

                <Col span={12}><strong>สถานีบริการน้ำมัน:</strong></Col>
                <Col span={12}>{formValues.station}</Col>
              </Row>
            </div>
          </Modal>


        </Form>
      </div>
    </ConfigProvider>
  );
}
