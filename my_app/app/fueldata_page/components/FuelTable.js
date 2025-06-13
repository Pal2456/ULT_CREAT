'use client';

import { useState } from 'react';
import { Button, Row, Col, Drawer, Typography, Card, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import FuelForm from './FuelForm';
import FuelDetailDrawer from './FuelDetailDrawer';

const { Title } = Typography;

export default function FuelTable({ data, pagination, onAdd }) {
  // 🔧 สร้างรายการใหม่
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleCreateNew = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);
  const handleFormSubmit = (newItem) => {
    onAdd(newItem);
    setIsDrawerOpen(false);
  };

  // 🔎 ดูรายละเอียดรายการ
  const [selectedFuel, setSelectedFuel] = useState(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);

  const columns = [
    { title: 'วันที่เติม', dataIndex: 'date', key: 'date' },
    { title: 'ทะเบียน', dataIndex: 'licensePlate', key: 'licensePlate' },
    { title: 'ประเภทรถ', dataIndex: 'vehicleType', key: 'vehicleType' },
    { title: 'ชื่อคนขับ', dataIndex: 'driverName', key: 'driverName' },
    { title: 'ประเภทน้ำมัน', dataIndex: 'fuelType', key: 'fuelType' },
    { title: 'จำนวนลิตร', dataIndex: 'liters', key: 'liters' },
    { title: 'ราคาน้ำมัน/ลิตร', dataIndex: 'pricePerLiter', key: 'pricePerLiter' },
    {
      title: 'จำนวนเงินที่เติม',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (value) => value.toLocaleString(),
    },
    { title: 'สถานี', dataIndex: 'status', key: 'status' },
  ];

  return (
    <>
      <Card style={{ fontFamily: 'Prompt, sans-serif' }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Title
              level={5}
              style={{
                margin: 0,
                color: '#2B2C30',
                fontSize: '16px',
                fontFamily: 'Prompt, sans-serif',
                fontWeight: 400,
              }}
            >
              รายการน้ำมันทั้งหมด
            </Title>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={handleCreateNew}
              style={{
                backgroundColor: '#7B41B3',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '36px',
                padding: '0 12px',
              }}
              icon={
                <PlusCircleOutlined
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    strokeWidth: 3,
                    color: 'white',
                  }}
                />
              }
            >
              <span style={{ fontWeight: 400, fontFamily: 'Prompt, sans-serif', fontSize: '12px' }}>
                สร้างรายการน้ำมัน
              </span>
            </Button>
          </Col>
        </Row>

        {/* 🔄 ตาราง */}
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          className="custom-table"
          style={{ fontSize: '12px', color: '#2B2C30' }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedFuel(record);
              setIsDetailDrawerOpen(true);
            },
          })}
        />

        {/* 🔢 Pagination */}
        <div style={{ marginTop: 24, borderTop: '1px solid #f0f0f0', paddingTop: 16 }}>
          {pagination}
        </div>

        {/* ➕ Drawer: สร้างรายการ */}
        <Drawer
          placement="rightleft"
          open={isDrawerOpen}
          onClose={handleCloseDrawer}
          width={640}
          title={null}
          closable={false}
          headerStyle={{ display: 'none' }}
          style={{
            background: '#fff',
            boxShadow: 'none'
          }}
          bodyStyle={{
            padding: 24,
            paddingTop: 16,
            height: '100vh',
            overflowY: 'auto'
          }}
        >
          {/* Custom Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8
          }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#000' }}>
              สร้างรายการน้ำมัน
            </div>
            <Button
              type="text"
              onClick={handleCloseDrawer}
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#000',
                lineHeight: 1,
                padding: 0
              }}
            >
              ✕
            </Button>
          </div>

          <div style={{ height: '1px', backgroundColor: '#e0e0e0', width: '100%', marginBottom: 20 }} />

          <FuelForm onSubmit={handleFormSubmit} onCancel={handleCloseDrawer} />
        </Drawer>

        {/* 👁️‍🗨️ Drawer: ดูรายละเอียด */}
        <FuelDetailDrawer
          open={isDetailDrawerOpen}
          onClose={() => setIsDetailDrawerOpen(false)}
          data={selectedFuel}
        />
      </Card>

      <style jsx global>{`
        .custom-table .ant-table-thead > tr > th {
          font-family: 'Prompt', sans-serif !important;
          font-size: 14px;
          color: #2B2C30;
          font-weight: 500;
        }

        .custom-table .ant-table-tbody > tr > td {
          font-family: 'Prompt', sans-serif !important;
          font-size: 14px;
          color: #2B2C30;
          font-weight: 400;
        }
      `}</style>
    </>
  );
}