'use client';

import 'antd/dist/reset.css';

import {
  Layout,
  Menu,
  Table,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
  Typography,
  Badge,
  Avatar,
  theme,
  message,
  Pagination,
} from 'antd';

import {
  BarChartOutlined,
  CarOutlined,
  TeamOutlined,
  UserOutlined,
  EnvironmentOutlined,
  ShareAltOutlined,
  SolutionOutlined,
  FileDoneOutlined,
  ToolOutlined,
  DatabaseOutlined,
  BellFilled,
  MessageFilled,
  GlobalOutlined,
} from '@ant-design/icons';

import { useState } from 'react';
import dayjs from 'dayjs';



const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;


const sampleData = [
  {
    key: '1',
    fillDate: '25/02/67 15:00',
    license: '3ก1212',
    vehicleType: '4 ล้อจิ๋ว',
    driver: 'พรรสิทธิ์ ชำนาญการ',
    fuelType: 'ดีเซล',
    litres: 20,
    pricePer: 32,
    amount: 640,
    station: 'ปตท.',
  },
  {
    key: '2',
    fillDate: '25/02/67 15:00',
    license: 'กน6789',
    vehicleType: '4 ล้อตู้ทึบ',
    driver: 'ธนกรณ์ สุขเกษม',
    fuelType: 'ดีเซล',
    litres: 40,
    pricePer: 28,
    amount: 1120,
    station: 'บางจาก',
  },
  {
    key: '3',
    fillDate: '25/02/67 15:00',
    license: 'กน6789',
    vehicleType: '6 ล้อตู้ทึบ',
    driver: 'ธนกรณ์ สุขเกษม',
    fuelType: 'ดีเซล',
    litres: 40,
    pricePer: 32,
    amount: 1280,
    station: 'ตาลเท็กซ์',
  },
  {
    key: '4',
    fillDate: '25/02/67 15:00',
    license: 'กน6789',
    vehicleType: '4 ล้อตู้ทึบ',
    driver: 'ธนกรณ์ สุขเกษม',
    fuelType: 'ดีเซล',
    litres: 60,
    pricePer: 28,
    amount: 1680,
    station: 'บางจาก',
  },
  {
    key: '5',
    fillDate: '25/02/67 15:00',
    license: 'กน6789',
    vehicleType: 'ล้อ',
    driver: 'ธนกรณ์ สุขเกษม',
    fuelType: 'ดีเซล',
    litres: 100,
    pricePer: 32,
    amount: 3200,
    station: 'คาลเท็กซ์',
  },
  {
    key: '6',
    fillDate: '25/02/67 15:00',
    license: 'กน6789',
    vehicleType: 'ล้อ',
    driver: 'ธนกรณ์ สุขเกษม',
    fuelType: 'ดีเซล',
    litres: 20,
    pricePer: 28,
    amount: 260,
    station: 'บางจาก',
  },
  {
    key: '7',
    fillDate: '25/02/67 15:00',
    license: 'กน6789',
    vehicleType: 'ล้อ',
    driver: 'ธนกรณ์ สุขเกษม',
    fuelType: 'ดีเซล',
    litres: 32,
    pricePer: 32,
    amount: 1024,
    station: 'ปตท.',
  },
  {
    key: '8',
    fillDate: '25/02/67 15:00',
    license: 'กน6789',
    vehicleType: 'ล้อ',
    driver: 'ธนกรณ์ สุขเกษม',
    fuelType: 'ดีเซล',
    litres: 40,
    pricePer: 32,
    amount: 1280,
    station: 'ปตท.',
  },
  {
    key: '9',
    fillDate: '25/02/67 15:00',
    license: 'กน6789',
    vehicleType: 'ล้อ',
    driver: 'ธนกรณ์ สุขเกษม',
    fuelType: 'ดีเซล',
    litres: 100,
    pricePer: 28,
    amount: 2800,
    station: 'บางจาก',
  },
  {
    key: '10',
    fillDate: '25/02/67 15:00',
    license: 'กน6789',
    vehicleType: 'ล้อ',
    driver: 'ธนกรณ์ สุขเกษม',
    fuelType: 'ดีเซล',
    litres: 10,
    pricePer: 32,
    amount: 3200,
    station: 'คาลเท็กซ์',
  },
];

const columns = [
  { title: 'วันที่เติม', dataIndex: 'fillDate', key: 'fillDate' },
  { title: 'ทะเบียน', dataIndex: 'license', key: 'license' },
  { title: 'ประเภทรถ', dataIndex: 'vehicleType', key: 'vehicleType' },
  { title: 'ชื่อคนขับ', dataIndex: 'driver', key: 'driver' },
  { title: 'ประเภทน้ำมัน', dataIndex: 'fuelType', key: 'fuelType' },
  { title: 'จำนวนลิตร', dataIndex: 'litres', key: 'litres', align: 'right' },
  { title: 'ราคาน้ำมัน/ลิตร', dataIndex: 'pricePer', key: 'pricePer', align: 'right' },
  { title: 'จำนวนเงินที่เติม', dataIndex: 'amount', key: 'amount', align: 'right' },
  { title: 'สถานี', dataIndex: 'station', key: 'station' },
];



const menuItems = [
  { key: 'stats', icon: <BarChartOutlined />, label: 'สถิติ' },
  { key: 'vehicles', icon: <CarOutlined />, label: 'ยานพาหนะ' },
  { key: 'drivers', icon: <TeamOutlined />, label: 'พนักงาน' },
  { key: 'customers', icon: <UserOutlined />, label: 'ลูกค้า' },
  { key: 'locations', icon: <EnvironmentOutlined />, label: 'สถานที่' },
  { key: 'routes', icon: <ShareAltOutlined />, label: 'เส้นทาง' },
  { key: 'orders', icon: <SolutionOutlined />, label: 'คำสั่งซื้อ' },
  { key: 'jobs', icon: <FileDoneOutlined />, label: 'งานขนส่ง' },
  { key: 'fuel', icon: <ToolOutlined />, label: 'น้ำมัน' },
  { key: 'incidents', icon: <DatabaseOutlined />, label: 'รายงานเหตุการณ์' },
  { key: 'safety', icon: <ToolOutlined />, label: 'ผู้จัดการด้านความปลอดภัย' },
  { key: 'maintenance', icon: <ToolOutlined />, label: 'บำรุงรักษา' },
  { key: 'contractors', icon: <DatabaseOutlined />, label: 'ข้อมูลผู้ประกอบการ' },
];


export default function FuelListPage() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Form state
  const [searchPlate, setSearchPlate] = useState('');
  const [fuelFilter, setFuelFilter] = useState('ทั้งหมด');
  const [dateRange, setDateRange] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Derived filtered data (very basic filter logic)
  const filtered = sampleData.filter((row) => {
    const plateMatch = row.license.includes(searchPlate);
    const fuelMatch = fuelFilter === 'ทั้งหมด' || row.fuelType === fuelFilter;
    let dateMatch = true;
    if (dateRange && dateRange.length === 2 && dateRange[0] && dateRange[1]) {
      const [start, end] = dateRange;
      const d = dayjs(row.fillDate, 'DD/MM/YY HH:mm');
      dateMatch = d.isAfter(start.startOf('day')) && d.isBefore(end.endOf('day'));
    }
    return plateMatch && fuelMatch && dateMatch;
  });


  const onSearch = () => {
    message.success('Filters applied');
    setPage(1);
  };

  const onReset = () => {
    setSearchPlate('');
    setFuelFilter('ทั้งหมด');
    setDateRange(null);
    setPage(1);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider
        width={220}
        style={{ background: colorBgContainer }}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div
          style={{
            height: 64,
            margin: 16,
            background: '#d9d9d9',
            borderRadius: borderRadiusLG,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
          }}
        >
          กรมการขนส่งทางบก
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['fuel']}
          style={{ borderRight: 0 }}
          items={menuItems}
        />
      </Sider>

      {/* Main layout wrapper */}
      <Layout>
        {/* Header */}
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Title level={5} style={{ margin: 0 }}>
            Fuel – list
          </Title>
          <Space size="large">
            <Badge count={9} overflowCount={99} showZero>
              <BellFilled style={{ fontSize: 18 }} />
            </Badge>
            <Badge dot>
              <MessageFilled style={{ fontSize: 18 }} />
            </Badge>
            <GlobalOutlined style={{ fontSize: 18 }} />
            <Space>
              <Avatar size="small" src={`https://i.pravatar.cc/40?img=5`} />
              Tony Danza
            </Space>
          </Space>
        </Header>


        <Content style={{ margin: 24 }}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >

            <Title level={5} style={{ marginBottom: 24 }}>
              ค้นหา
            </Title>
            <Space style={{ marginBottom: 24 }} wrap>
              <Input
                placeholder="ทะเบียน"
                value={searchPlate}
                onChange={(e) => setSearchPlate(e.target.value)}
                allowClear
                style={{ width: 200 }}
              />
              <Select
                value={fuelFilter}
                onChange={setFuelFilter}
                style={{ width: 160 }}
              >
                <Option value="ทั้งหมด">ทั้งหมด</Option>
                <Option value="ดีเซล">ดีเซล</Option>
                <Option value="เบนซิน">เบนซิน</Option>
              </Select>
              <RangePicker value={dateRange} onChange={setDateRange} />
              <Button onClick={onSearch} type="primary">
                ค้นหา
              </Button>
              <Button onClick={onReset}>รีเซ็ต</Button>
            </Space>


            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <Title level={5}>รายการน้ำมันทั้งหมด</Title>
              <Button type="primary">สร้างรายการน้ำมัน</Button>
            </div>

            <Table
              columns={columns}
              dataSource={filtered.slice((page - 1) * pageSize, page * pageSize)}
              pagination={false}
              size="small"
              scroll={{ x: 'max-content' }}
            />

            <div style={{ marginTop: 16, textAlign: 'right' }}>
              <Pagination
                current={page}
                pageSize={pageSize}
                total={filtered.length}
                showSizeChanger={false}
                onChange={setPage}
              />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
