'use client';

import { useState } from 'react';
import { Button, Row, Col, Drawer, Typography, Card, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
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
                fontWeight: 500,
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
                fontSize: '12px',
                fontFamily: 'Prompt, sans-serif',
                fontWeight: 500,
                color: '#FFFFFF',
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
          style={{ fontFamily: 'Prompt, sans-serif', fontSize: '12px', color: '#2B2C30' }}
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
          styles={{
            header: { fontFamily: 'Prompt, sans-serif', fontSize: '16px', color: '#2B2C30' },
            body: { fontFamily: 'Prompt, sans-serif' },
          }}
        >
          <FuelForm onSubmit={handleFormSubmit} onCancel={handleCloseDrawer} />
        </Drawer>
      </Card>

      <style jsx>{`
        .plus-circle {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 20px;
          height: 20px;
          border: 2px solid white;
          border-radius: 50%;
          color: white;
          font-size: 10px;
        }
      `}</style>
    </>
  );
}