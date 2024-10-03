import { Sale } from '../../models/Sale';

interface HomeTableProps {
    sales: Sale[];
}

const HomeTable: React.FC<HomeTableProps> = ({ sales }) => {
    return (
        <div className="overflow-x-auto p-4">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Sale Amount</th>
                        <th>Sale Date</th>
                        <th>Rep Id</th>
                        <th>Customer Id</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale.saleId}>
                            <td>{sale.productName}</td>
                            <td>{sale.saleAmount.toFixed(2)}</td>
                            <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                            <td>{sale.salesRepId}</td>
                            <td>{sale.customerId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HomeTable;
