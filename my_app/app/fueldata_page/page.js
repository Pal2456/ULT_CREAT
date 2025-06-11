'use client';

import { useState } from 'react';
import Header from './components/Header';
import FuelTable from './components/FuelTable';
import PageBreak from './components/PageBreak';
import { fueldata } from './data/fueldata';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [date, setDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [dateKey, setDateKey] = useState(Date.now());

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

    const filteredData = fueldata.filter(item => {
        const datePart = item.date.split(' ')[0];
        const [day, month, shortYear] = datePart.split('/');

        const buddhistYear = parseInt(shortYear, 10) + 2500; // 67 -> 2567
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
            (searchTerm === '' || item.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (fuelType === '' || item.fuelType === fuelType) &&
            isDateInRange
        );
    });

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <main className="min-h-screen bg-gray-100 p-3">
            <h1 className="text-2xl font-bold mb-6 text-black">น้ำมัน</h1>
            <Header
                onSearch={setSearchTerm}
                onFuelTypeChange={setFuelType}
                onDateChange={setDate}
                onClear={handleClearFilters}
                searchTerm={searchTerm}
                fuelType={fuelType}
                dateKey={dateKey}
            />
            <FuelTable data={paginatedData}
                pagination={
                    <PageBreak
                        totalItems={filteredData.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                }
            />
        </main>
    );
}