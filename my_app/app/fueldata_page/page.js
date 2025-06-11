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

    const handleClearFilters = () => {
        setSearchTerm('');
        setFuelType('');
        setDate('');
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (size) => {
        setItemsPerPage(size);
        setCurrentPage(1);
    };

    const filteredData = fueldata.filter(item => {
        const itemDate = new Date(item.date.split(' ')[0].split('/').reverse().join('-'));
        const filterDate = date ? new Date(date) : null;
        
        return (
            (searchTerm === '' || item.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (fuelType === '' || item.fuelType === fuelType) &&
            (!filterDate || (itemDate.toDateString() === filterDate.toDateString()))
        );
    });

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-6 text-black">น้ำมัน</h1>
            <Header
                onSearch={setSearchTerm}
                onFuelTypeChange={setFuelType}
                onDateChange={setDate}
                onClear={handleClearFilters}
                searchTerm={searchTerm}
                fuelType={fuelType}
                date={date}
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