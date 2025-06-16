'use client';

import { Drawer, Typography, Button, Divider } from 'antd';

export default function FuelDetailDrawer({ open, onClose, data }) {
  if (!data) return null;

  return (
    <Drawer
      title={null}
      placement="right"
      open={open}
      onClose={onClose}
      width={600}
      closable={false}
      headerStyle={{ display: 'none' }}
      bodyStyle={{ padding: 24, height: '100vh', overflowY: 'auto', background: '#fff' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <Typography.Text style={{ fontSize: 16, fontWeight: 600, color: '#2B2C30', fontFamily: 'Prompt' }}>
          รายละเอียด
        </Typography.Text>
        <Button type="text" onClick={onClose} style={{ fontSize: 20, fontWeight: 'bold', color: '#000', lineHeight: 1, padding: 0 }}>
          ✕
        </Button>
      </div>

      {/* Divider */}
      <Divider style={{ margin: '8px 0', borderColor: '#F0F0F0' }} />

      {/* Section 1 */}
      <SectionTitle title="ข้อมูลรถและคนขับ" />
      <DetailItem label="ประเภทรถ" value={data.vehicleType} />
      <DetailItem label="ทะเบียน" value={data.licensePlate} />
      <DetailItem label="ชื่อคนขับ" value={data.driverName} />

      {/* Section 2 */}
      <SectionTitle title="ข้อมูลการเติมน้ำมัน" style={{ marginTop: 24 }} />
      <DetailItem label="วันเวลาที่เติม" value={data.date} />
      <DetailItem label="เลขไมล์" value={`${data.mileage || '-'} KM`} />
      <DetailItem label="ประเภทน้ำมัน" value={data.fuelType} />
      <DetailItem label="จำนวนลิตร" value={`${data.liters} liter`} />
      <DetailItem label="ราคาน้ำมัน / ลิตร" value={`${data.pricePerLiter} บาท`} />
      <DetailItem label="จำนวนเงินที่เติม" value={`${Number(data.totalCost).toLocaleString()} บาท`} />
      <DetailItem label="สถานีบริการน้ำมัน" value={data.status} />
    </Drawer>
  );
}

// 🔹 Section Title Block
function SectionTitle({ title, style }) {
  return (
    <div
      style={{
        background: '#F3E9F9',
        padding: '8px 16px',
        borderRadius: 8,
        marginBottom: 16,
        ...style,
      }}
    >
      <Typography.Text style={{ color: '#76108F', fontFamily: 'Prompt', fontSize: 14 }}>
        {title}
      </Typography.Text>
    </div>
  );
}

// 🔹 Key-Value Pair Row
function DetailItem({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingLeft: '16px'}}>
      <Typography.Text style={{ fontFamily: 'Prompt', fontSize: 14, fontWeight: 400, color: '#2B2C30',  }}>{label}</Typography.Text>
      <Typography.Text style={{ fontFamily: 'Prompt', fontSize: 14, fontWeight: 500, color: '#2B2C30' }}>
        {value || '-'}
      </Typography.Text>
    </div>
  );
}