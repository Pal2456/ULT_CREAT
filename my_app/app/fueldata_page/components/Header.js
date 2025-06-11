'use client';

import { Input, Select, DatePicker, Button, Row, Col } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function Header({ onSearch, onFuelTypeChange, onDateChange, onClear, searchTerm, fuelType, date }) {
    const handleCreateNew = () => {
        console.log("Create New Item button clicked!");
    };

    const handleDateChange = (date, dateString) => {
        onDateChange(dateString);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <Row gutter={[16, 16]} align="bottom">
                <Col xs={24} sm={12} md={6}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ค้นหา</label>
                    <Input
                        placeholder="ทะเบียน"
                        prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={searchTerm}
                        onChange={(e) => onSearch(e.target.value)}
                        allowClear
                    />
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ประเภทน้ำมัน</label>
                    <Select
                        placeholder="ทั้งหมด"
                        value={fuelType || null}
                        onChange={onFuelTypeChange}
                        style={{ width: '100%' }}
                        allowClear
                    >
                        <Option value="ดีเซล">ดีเซล</Option>
                        <Option value="เบนซิน">เบนซิน</Option>
                    </Select>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">วันที่</label>
                    <DatePicker
                        placeholder="วันที่เริ่มต้น - วันที่สิ้นสุด"
                        onChange={handleDateChange}
                        style={{ width: '100%' }}
                    />
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={onClear}
                        style={{ width: '10%' }}
                    >
                    </Button>
                </Col>
            </Row>
            
        </div>
    );
}