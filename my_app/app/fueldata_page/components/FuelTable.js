import { Button, Row, Col } from 'antd';

export default function FuelTable({ data, pagination }) { //เอา components จาก PageBreak มาใส
    // ไว้ใส่ฟังก์ชันสำหรับปุ่มคลิก
    const handleCreateNew = () => {
        console.log("Create New Item button clicked from FuelTable!");
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <Row justify="space-between" align="middle" className="mb-4">
                <Col>
                    <h2 className="text-lg font-bold text-black">รายการน้ำมันทั้งหมด</h2>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        onClick={handleCreateNew}
                        style={{ backgroundColor: '#7B41B3' }}
                    >
                        + สร้างรายการน้ำมันใหม่
                    </Button>
                </Col>
            </Row>

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
                        {data.map((item) => ( //to loop through the 'data' array and สร้างแถวสำหรับแต่ละรายการ(tr)
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
            {/* //to render the 'pagination' components ที่ส่งผ่าน prop จาก page.js */}
            <div className="mt-4 border-t pt-4">
                {pagination} 
            </div>
        </div>
    );
}