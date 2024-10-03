import Sidebar from "../../Components/Sales Rep/SideBar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SalesFormContent from "../../Components/Sales Rep/SalesFormContent";

function SalesForm() {
    return (
        <div className="flex">
            <ToastContainer />
            <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
                <Sidebar />
            </div>

            <div className="container mx-auto flex ml-64">
                <div className="w-full">
                    <SalesFormContent />
                </div>
            </div>
        </div>
    );
}

export default SalesForm;