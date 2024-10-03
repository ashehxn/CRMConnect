import {
    IoMdHome,
    IoLogoEuro,
    IoIosChatbubbles
} from "react-icons/io";

export interface NavItem {
    icon: React.ReactNode;
    text: string;
    path: string;
}

export const NAV_ITEMS: NavItem[] = [
    { icon: <IoMdHome />, text: "Home", path: "/salesHome" },
    { icon: <IoLogoEuro />, text: "Sales", path: "/sales" },
    { icon: <IoIosChatbubbles />, text: "Communication", path: "/salesHome" }
];
