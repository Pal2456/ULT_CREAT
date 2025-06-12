'use client';

import { useState } from 'react';
import { Button, Row, Col, Drawer, Typography, Card, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FuelForm from './FuelForm';

const { Title } = Typography;

export default function FuelTable({ data, pagination, onAdd }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCreateNew = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  const handleFormSubmit = (newItem) => {
    onAdd(newItem);
    setIsDrawerOpen(false);
  };

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
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Title level={5} style={{ margin: 0, color: '#2B2C30' }}>
              รายการน้ำมันทั้งหมด
            </Title>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={handleCreateNew}
              style={{
                backgroundColor: '#7B41B3',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 16px',
              }}
              icon={
                <span className="plus-circle">
                  <PlusOutlined />
                </span>
              }
            >
              สร้างรายการน้ำมัน
            </Button>
          </Col>
        </Row>

        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          rowKey="id"
          scroll={{ x: 'max-content' }}
        />

        <div style={{ marginTop: 24, borderTop: '1px solid #f0f0f0', paddingTop: 16 }}>
          {pagination}
        </div>

        <Drawer
          placement="right"
          onClose={handleCloseDrawer}
          open={isDrawerOpen}
          width={600}
          title="สร้างรายการน้ำมันใหม่"
        >
          <FuelForm onSubmit={handleFormSubmit} onCancel={handleCloseDrawer} />
        </Drawer>
      </Card>

      <style jsx>{`
        .plus-circle {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 24px;
          height: 24px;
          border: 2px solid white;
          border-radius: 50%;
          color: white;
          font-size: 12px;
        }
      `}</style>
    </>
  );
}