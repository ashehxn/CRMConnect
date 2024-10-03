import {
    IoMdHome,
    IoIosPeople,
    IoIosPerson,
    IoIosCheckmarkCircle,
} from "react-icons/io";

export interface NavItem {
    icon: React.ReactNode;
    text: string;
    path: string;
}

export const NAV_ITEMS: NavItem[] = [
    { icon: <IoMdHome />, text: "Home", path: "/adminHome" },
    { icon: <IoIosPeople />, text: "Customers", path: "/customerProfiles" },
    { icon: <IoIosPerson />, text: "Sales Representatives", path: "/adminHome" },
    { icon: <IoIosCheckmarkCircle />, text: "Tasks", path: "/adminHome" }
];
