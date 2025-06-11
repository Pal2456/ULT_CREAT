import { FuelDataTable } from '../data/fueldata';

interface FuelTableProps {
    data: FuelDataTable[];
}

export default function FuelTable({ data }: FuelTableProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4 text-black">รายการน้ำมันทั้งหมด</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
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
        </div>
    );
}