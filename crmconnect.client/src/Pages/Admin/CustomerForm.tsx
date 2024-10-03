import Sidebar from "../../Components/Admin/SideBar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomerFormContent from "../../Components/Admin/CustomerFormContent";

function CustomerForm() {
  return (
      <div className="flex">
          <ToastContainer />
          <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
              <Sidebar />
          </div>

          <div className="container mx-auto flex ml-64">
              <div className="w-full">
                  <CustomerFormContent />
              </div>
          </div>
      </div>
  );
}

export default CustomerForm;