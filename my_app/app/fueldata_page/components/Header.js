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
    <>
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="bottom">
          <Col xs={24} sm={12} md={6}>
            <Text style={{ display: 'block', marginBottom: 4 }}>ค้นหา</Text>
            <Input
              placeholder="ทะเบียน"
              prefix={<SearchOutlined style={{ color: 'rgba(43, 44, 48, 0.5)' }} />}
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              allowClear
              className="uniform-height custom-placeholder"
            />
          </Col>

          <Col xs={24} sm={12} md={5}>
            <Text style={{ display: 'block', marginBottom: 4 }}>ประเภทน้ำมัน</Text>
            <Select
              placeholder="ทั้งหมด"
              value={fuelType || undefined}
              onChange={onFuelTypeChange}
              allowClear
              className="uniform-height custom-select"
              dropdownStyle={{ color: '#2B2C30' }}
              style={{ width: '100%' }}
            >
              <Option value="ดีเซล">ดีเซล</Option>
              <Option value="เบนซิน">เบนซิน</Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={7}>
            <Text style={{ display: 'block', marginBottom: 4 }}>วันที่</Text>
            <RangePicker
              key={dataKey}
              placeholder={['วันที่เริ่มต้น', 'วันที่สิ้นสุด']}
              onChange={handleDateChange}
              className="uniform-height custom-datepicker"
              style={{ width: '100%' }}
            />
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Text style={{ display: 'block', marginBottom: 4, visibility: 'hidden' }}>placeholder</Text>
            <Button
              icon={
                <ReloadOutlined
                  style={{
                    fontSize: 20,
                    strokeWidth: 3,
                    color: '#2B2C30',
                  }}
                />
              }
              onClick={onClear}
              style={{
                width: 40,
                height: 40,
                border: '1px solid #D9D9D9',
                borderRadius: 8,
                padding: 0,
              }}
            />
          </Col>
        </Row>
      </Card>

      <style jsx global>{`
        .uniform-height {
          height: 40px !important;
        }

        .uniform-height input {
          height: 40px !important;
          line-height: 40px !important;
          padding-top: 6px !important; /* ปรับแนวตั้งของ placeholder */
        }

        

        .custom-placeholder input::placeholder {
          color: rgba(43, 44, 48, 0.5) !important;
        }

        .custom-select .ant-select-selection-placeholder {
          color: rgba(43, 44, 48, 0.5) !important;
        }

        .custom-datepicker .ant-picker-input > input::placeholder {
          color: rgba(43, 44, 48, 0.5) !important;
        }

        .ant-select-selector,
        .ant-picker {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
}