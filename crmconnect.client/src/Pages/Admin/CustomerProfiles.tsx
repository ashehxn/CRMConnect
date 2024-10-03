import CustomerTable from "../../Components/Admin/CustomerTable";
import Sidebar from "../../Components/Admin/SideBar";

function CustomerProfiles() {
  return (
      <div className="flex">
          <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
              <Sidebar />
          </div>

          <div className="container mx-auto flex ml-64">
              <div className="w-full">
                  <CustomerTable />
              </div>
          </div>
      </div>
  );
}

export default CustomerProfiles;