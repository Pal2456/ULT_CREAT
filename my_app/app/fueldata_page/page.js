'use client';

import { useState } from 'react';
import { Layout, Typography, Drawer } from 'antd';
import Header from './components/Header';
import FuelTable from './components/FuelTable';
import PageBreak from './components/PageBreak';
import FuelForm from './components/FuelForm';
import { fueldata as initialFuelData } from './data/fueldata';

const { Content } = Layout;
const { Title } = Typography;

export default function Home() {
  const [fuelList, setFuelList] = useState(initialFuelData);
  const [searchTerm, setSearchTerm] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [date, setDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dateKey, setDateKey] = useState(Date.now());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClearFilters = () => {
    setSearchTerm('');
    setFuelType('');
    setDate('');
    setCurrentPage(1);
    setDateKey(Date.now());
  };

  const handleItemsPerPageChange = (size) => {
    setItemsPerPage(size);
    setCurrentPage(1);
  };

  const handleAddFuel = (newItem) => {
    const newId = fuelList.length ? fuelList[fuelList.length - 1].id + 1 : 1;
    const formattedItem = {
      id: newId,
      date: formatDateTime(newItem.datetime),
      licensePlate: newItem.plate,
      vehicleType: newItem.carType,
      driverName: newItem.driver,
      fuelType: newItem.fuelType,
      liters: Number(newItem.liters),
      pricePerLiter: Number(newItem.pricePerLiter),
      totalCost: Number(newItem.total),
      status: newItem.station,
    };
    setFuelList(prev => [...prev, formattedItem]);
    console.log('เพิ่มรายการใหม่:', formattedItem);
  };

  const filteredData = fuelList.filter(item => {
    const datePart = item.date.split(' ')[0];
    const [day, month, shortYear] = datePart.split('/');
    const buddhistYear = parseInt(shortYear, 10) + 2500;
    const gregorianYear = buddhistYear - 543;
    const itemDate = new Date(gregorianYear, parseInt(month, 10) - 1, parseInt(day, 10));

    const [startDateString, endDateString] = date || [];
    const startDate = startDateString ? new Date(startDateString) : null;
    const endDate = endDateString ? new Date(endDateString) : null;

    let isDateInRange = true;
    if (startDate && endDate) {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      isDateInRange = itemDate >= startDate && itemDate <= endDate;
    }

    return (
      (!searchTerm || item.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!fuelType || item.fuelType === fuelType) &&
      isDateInRange
    );
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5', padding: 24 }}>
      <Content>
        <Title level={3} style={{ marginBottom: 24, color: '#2B2C30' }}>น้ำมัน</Title>

        <Header
          onSearch={setSearchTerm}
          onFuelTypeChange={setFuelType}
          onDateChange={setDate}
          onClear={handleClearFilters}
          searchTerm={searchTerm}
          fuelType={fuelType}
          dateKey={dateKey}
        />

        <FuelTable
          data={paginatedData}
          pagination={
            <PageBreak
              totalItems={filteredData.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          }
          onAddClick={() => setIsDrawerOpen(true)}
        />

        <Drawer
          title="สร้างรายการน้ำมัน"
          placement="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          width={600}
        >
          <FuelForm
            onSubmit={(newItem) => {
              handleAddFuel(newItem);
              setIsDrawerOpen(false);
            }}
            onCancel={() => setIsDrawerOpen(false)}
          />
        </Drawer>
      </Content>
    </Layout>
  );
}