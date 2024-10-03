import { useEffect, useState } from 'react';
import Sidebar from "../../Components/Sales Rep/SideBar";
import StatCard from "../../Components/Common/StatCard";
import HomeTable from "../../Components/Common/HomeTable";
import SalesBarChart from "../../Components/Common/BarChart";
import { FaShoppingCart, FaUserFriends, FaDollarSign } from 'react-icons/fa';
import dayjs from 'dayjs'; // Use dayjs for date manipulation and formatting

interface Sale {
    saleId: number;
    productName: string;
    saleAmount: number;
    saleDate: string;
    salesRepId: number;
    customerId: number;
}

interface ChartData {
    date: string;
    totalSales: number;
}

const isWithinLast7Days = (saleDate: string): boolean => {
    const today = dayjs();
    const saleDateObj = dayjs(saleDate);
    const diffInDays = today.diff(saleDateObj, 'day');
    return diffInDays <= 7;
};

function SalesHome() {
    const [salesData, setSalesData] = useState<Sale[]>([]);
    const [weeklySalesData, setWeeklySalesData] = useState<ChartData[]>([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await fetch('http://localhost:31616/api/sale');
                if (!response.ok) {
                    throw new Error('Failed to fetch sales data');
                }
                const data: Sale[] = await response.json();
                setSalesData(data);

                const last7DaysSales = data.filter(sale => isWithinLast7Days(sale.saleDate));

                const salesByDate = last7DaysSales.reduce((acc: { [key: string]: number }, sale: Sale) => {
                    const saleDate = dayjs(sale.saleDate).format('YYYY-MM-DD');
                    if (!acc[saleDate]) {
                        acc[saleDate] = 0;
                    }
                    acc[saleDate] += sale.saleAmount;
                    return acc;
                }, {});
                
                const formattedData: ChartData[] = Object.keys(salesByDate)
                    .map(date => ({
                        date,
                        totalSales: salesByDate[date],
                    }))
                    .sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));

                setWeeklySalesData(formattedData);

            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchSalesData();
    }, []);

    const cardsData = [
        { title: "Total Sales", value: "LKR 200000", icon: <FaDollarSign /> },
        { title: "Total Customers", value: "150", icon: <FaUserFriends /> },
        { title: "Sales Today", value: "LKR 30000", icon: <FaShoppingCart /> },
        { title: "Sales Representatives", value: "21", icon: <FaUserFriends /> },
    ];

    return (
        <div className="flex">
            <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
                <Sidebar />
            </div>

            <div className="container mx-auto flex ml-64">
                <div className="w-full">
                    <div className="flex w-full justify-between p-4">
                        {cardsData.map((card, index) => (
                            <div key={index} className="w-1/4 mx-2">
                                <StatCard
                                    title={card.title}
                                    value={card.value}
                                    icon={card.icon}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex mx-6">
                        <div className="w-1/2 p-4 bg-white rounded-lg shadow-lg mr-4">
                            <h2 className="text-lg font-semibold mb-4">Recent Sales</h2>
                            <HomeTable sales={salesData} />
                        </div>
                        <div className="w-1/2 p-4 bg-white rounded-lg shadow-lg ml-4">
                            <h2 className="text-lg font-semibold mb-16">Sales Analysis</h2>
                            <SalesBarChart data={weeklySalesData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesHome;
