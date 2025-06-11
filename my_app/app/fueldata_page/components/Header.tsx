'use client';
import { Search } from 'lucide-react';
interface HeaderProps {
    onSearch: (term: string) => void;
    onFuelTypeChange: (fuelType: string) => void;
    onDateChange: (date: string) => void;
    onClear: () => void;
    searchTerm: string;
    fuelType: string;
    date: string;
}

export default function Header({ onSearch, onFuelTypeChange, onDateChange, onClear, searchTerm, fuelType, date }: HeaderProps) {
    const handleCreateNew = () => {
        console.log("Create New Item button clicked!");
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700">ค้นหา</label>
                    <div className="relative mt-1"></div>
                    <Search className="absolute left-15 top-34 text-gray-400" size={20} />
                    <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => onSearch(e.target.value)}
                        placeholder="ทะเบียน"
                        className="mt-1 block w-full pl-10 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-gray-900"
                    />
                </div>
                <div>
                    <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">ประเภทน้ำมัน</label>
                    <select
                        id="fuelType"
                        value={fuelType}
                        onChange={(e) => onFuelTypeChange(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-14 py-2 text-base border border-black focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md text-gray-900"
                    >
                        <option value="">ทั้งหมด</option>
                        <option value="ดีเซล">ดีเซล</option>
                        <option value="เบนซิน">เบนซิน</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">วันที่</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => onDateChange(e.target.value)}
                        placeholder="วันที่เริ่มต้น - วันที่สิ้นสุด"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-gray-900"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={onClear}
                        className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V4a1 1 0 011-1zm10 15a1 1 0 01-1-1v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v4a1 1 0 01-1 1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    onClick={handleCreateNew}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                    + สร้างรายการน้ำมันใหม่
                </button>
            </div>
        </div>
    );
}