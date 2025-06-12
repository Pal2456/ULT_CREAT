'use client'; // ✅ ระบุว่า Component นี้จะรันฝั่ง client (Next.js 13+)

// ⛓️ Import Components ที่จำเป็น
import { Button, Row, Col, Drawer, Modal } from 'antd';
import { useState } from 'react';
import FuelForm from './FuelForm';


export default function FuelTable({ data, pagination, onAdd }) {
  // 📦 state สำหรับควบคุม Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // ✅ ฟังก์ชันเปิด Drawer
  const handleCreateNew = () => {
    setIsDrawerOpen(true);
  };

  // ✅ ฟังก์ชันปิด Drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // ✅ ฟังก์ชันเมื่อ form ส่งข้อมูลสำเร็จ
  const handleFormSubmit = (newItem) => {
    onAdd(newItem);            // 👉 ส่งข้อมูลกลับไปยัง `Home` page (ผ่าน props)
    setIsDrawerOpen(false);    // ✅ ปิด Drawer
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* 🔰 Header */}
      <Row justify="space-between" align="middle" className="mb-4">
        <Col>
          <h2 className="text-lg font-bold text-black">รายการน้ำมันทั้งหมด</h2>
        </Col>
        <Col>
          {/* ✅ ปุ่มสร้างรายการน้ำมัน */}
          <Button
            type="primary"
            onClick={handleCreateNew}
            style={{ backgroundColor: '#7B41B3' }}
          >
            + สร้างรายการน้ำมันใหม่
          </Button>
        </Col>
      </Row>

      {/* 🧾 ตารางรายการน้ำมัน */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* 🔻 หัวตาราง */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่เติม</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ทะเบียน</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ประเภทรถ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อคนขับ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ประเภทน้ำมัน</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จำนวนลิตร</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ราคาน้ำมัน/ลิตร</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จำนวนเงินที่เติม</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานี</th>
            </tr>
          </thead>

          {/* 🔽 เนื้อหาตาราง */}
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.licensePlate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.vehicleType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.driverName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.fuelType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.liters}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.pricePerLiter}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.totalCost.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination component (ส่งมาจากหน้า Home) */}
      <div className="mt-4 border-t pt-4">
        {pagination}
      </div>

      {/* ✅ Drawer popup สำหรับสร้างฟอร์ม */}
      <Drawer
        placement="right"
        onClose={handleCloseDrawer}
        open={isDrawerOpen}
        width={640}
        height={852}
         bodyStyle={{
          overflow: 'hidden',
          height: '100vh',
        }}

      >
        {/* 📋 ส่ง function onSubmit ไปยัง FuelForm */}
        <FuelForm onSubmit={handleFormSubmit} onCancel={handleCloseDrawer} />
      </Drawer>
    </div>
  );
}
