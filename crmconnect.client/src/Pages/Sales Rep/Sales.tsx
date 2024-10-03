import SalesTable from "../../Components/Sales Rep/SalesTable";
import Sidebar from "../../Components/Sales Rep/SideBar";

function Sales() {
    return (
        <div className="flex">
            <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
                <Sidebar />
            </div>

            <div className="container mx-auto flex ml-64">
                <div className="w-full">
                    <SalesTable />
                </div>
            </div>
        </div>
    );
}

export default Sales;