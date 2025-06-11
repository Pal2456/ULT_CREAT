'use client';

import { Input, Select, DatePicker, Button, Row, Col } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function Header({ onSearch, onFuelTypeChange, onDateChange, onClear, searchTerm, fuelType, dataKey }) {
    const handleDateChange = ( dateStrings ) => {
        onDateChange(dateStrings);
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            <Row gutter={[16, 16]} align="bottom">
                <Col xs={24} sm={12} md={5}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ค้นหา</label>
                    <Input
                        placeholder="ทะเบียน"
                        prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} //icon
                        value={searchTerm} //from page.js
                        onChange={(e) => onSearch(e.target.value)} //from page.js
                        allowClear //ปุ่มลบ
                    />
                </Col>

                <Col xs={24} sm={12} md={4}>
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

                <Col xs={24} sm={12} md={5}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">วันที่</label>
                    <RangePicker
                        datakey={dataKey}
                        placeholder={['วันที่เริ่มต้น', 'วันที่สิ้นสุด']}
                        onChange={handleDateChange}
                        style={{ width: '100%' }}
                    />
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <label className="mr-auto flex items-center"></label>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={onClear} //from page.js
                        style={{ width: '10%' }}
                    >
                    </Button>
                </Col>
            </Row>
            
        </div>
    );
}