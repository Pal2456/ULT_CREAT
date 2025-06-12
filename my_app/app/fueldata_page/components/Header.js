'use client';

import { Input, Select, DatePicker, Button, Row, Col, Typography, Card } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Text } = Typography;

export default function Header({ onSearch, onFuelTypeChange, onDateChange, onClear, searchTerm, fuelType, dataKey }) {
  const handleDateChange = (_, dateStrings) => {
    onDateChange(dateStrings);
  };

  return (
    <Card style={{ marginBottom: 24 }}>
      <Row gutter={[16, 16]} align="bottom">
        <Col xs={24} sm={12} md={5}>
          <Text style={{ display: 'block', marginBottom: 4 }}>ค้นหา</Text>
          <Input
            placeholder="ทะเบียน"
            prefix={<SearchOutlined style={{ color: 'rgba(43, 44, 48, 0.5)' }} />}
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            allowClear
          />
        </Col>

        <Col xs={24} sm={12} md={4}>
          <Text style={{ display: 'block', marginBottom: 4 }}>ประเภทน้ำมัน</Text>
          <Select
            placeholder="ทั้งหมด"
            value={fuelType || undefined}
            onChange={onFuelTypeChange}
            allowClear
            style={{
              width: '100%',
              color: 'ยฟเ#2B2C30',           // สีข้อความ
              borderColor: '#2B2C30',     // สีขอบ
            }}
            dropdownStyle={{
              color: '#2B2C30',           // สีข้อความใน dropdown
            }}
          >
            <Option value="ดีเซล">ดีเซล</Option>
            <Option value="เบนซิน">เบนซิน</Option>
          </Select>
        </Col>

        <Col xs={24} sm={12} md={5}>
          <Text style={{ display: 'block', marginBottom: 4 }}>วันที่</Text>
          <RangePicker
            key={dataKey} 
            placeholder={['วันที่เริ่มต้น', 'วันที่สิ้นสุด']}
            onChange={handleDateChange}
            style={{ width: '100%' }}
          />
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Text style={{ display: 'block', marginBottom: 4, visibility: 'hidden' }}>placeholder</Text>
          <Button icon={<ReloadOutlined />} onClick={onClear}>
          </Button>
        </Col>
      </Row>
    </Card>
  );
}