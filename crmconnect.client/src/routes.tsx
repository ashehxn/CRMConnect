import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom";
import CustomerProfiles from "./Pages/Admin/CustomerProfiles";
import CustomerForm from "./Pages/Admin/CustomerForm";
import Sales from "./Pages/Sales Rep/Sales";
import SalesForm from "./Pages/Sales Rep/SalesForm";
import SalesHome from "./Pages/Sales Rep/SalesHome";
import AdminHome from "./Pages/Admin/AdminHome";
import Login from "./Pages/Common/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/customerProfiles",
        element: <CustomerProfiles />,
    },
    {
        path: "/customerForm",
        element: <CustomerForm />,
    },
    {
        path: "/adminHome",
        element: <AdminHome />,
    },
    {
        path: "/sales",
        element: <Sales />,
    },
    {
        path: "/salesForm",
        element: <SalesForm />,
    },
    {
        path: "/salesHome",
        element: <SalesHome />,
    }
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
