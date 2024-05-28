import {Link, Outlet, useLocation} from 'react-router-dom';
import CurrentTime from "../shared/time.jsx";
import {CiHome} from "react-icons/ci";
import {PiHighHeelThin, PiShoppingCartLight} from "react-icons/pi";
import {BsPersonBadge, BsPersonDown} from "react-icons/bs";
import {GoPackageDependencies} from "react-icons/go";
import {VscGraph} from "react-icons/vsc";
import {CgProfile} from "react-icons/cg";
import Preview from "../../pages/preview/preview.page.jsx"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.jsx";
import {Button} from "../ui/button.jsx";
import {MoreHorizontal} from "lucide-react";
import swal from 'sweetalert';
import {isAuthenticated, isAdmin} from "../../pages/auth/authentication.jsx";
import {Notifications} from "../shared/Notifications.jsx";



const menuItem = [
    {
        to: "/",
        icon: (color) => <CiHome size="45" color={color}/>,
        title: "Home"
    },
    {
        to: "/cart",
        icon: (color) => <PiShoppingCartLight size="45" color={color}/>,
        title: "Sale"
    },
    {
        toForm: "/form/inventory/save",
        toPreview: "/preview/inventory",
        icon: (color) => <PiHighHeelThin size="45" color={color}/>,
        dropdown: true,
        title: "Inventory"
    },
    {
        toForm: "/form/customer/save",
        toPreview: "/preview/customer",
        dropdown: true,
        icon: (color) => <BsPersonDown size="45" color={color}/>,
        title: "Customer"
    },
    {
        toForm: "/form/supplier/save",
        toPreview: "/preview/supplier",
        dropdown: true,
        icon: (color) => <GoPackageDependencies size="45" color={color}/>,
        title: "Supplier"
    },
    {
        toForm: "/form/employee/save",
        toPreview: "/preview/employee",
        dropdown: true,
        icon: (color) => <BsPersonBadge size="45" color={color}/>,
        title: "Employee"
    },
    {
        to: "/admin",
        icon: (color) => <VscGraph size="45" color={color}/>,
        isAdmin: true
    },

    {to: "/1", icon: () => ""},
    {to: "/1", icon: () => ""},
    {to: "/1", icon: () => ""},
    {to: "/1", icon: () => ""},
    {to: "/1", icon: () => ""},
    {to: "/1", icon: () => ""},
    {to: "/1", icon: () => ""},
    {to: "/1", icon: () => ""},
    {to: "/1", icon: () => ""},
    {to: "/1", icon: () => ""},
    {to: "/1", icon: () => ""},
    {to: "/1", icon: () => ""},
    {to: "/1", icon: () => ""},
    {to: "/1", icon: () => ""},
    {
        to: "/user",
        icon: (color) => <CgProfile size="45" color={color}/>
    }
];

function RootLayout() {
    const location = useLocation();


    if (!isAuthenticated()) {
        return null;
    }

    return (
        <>
            <div id="rootPage" className="h-screen w-full absolute opacity-50 "></div>
            <div className="w-full h-20 absolute bg-black opacity-50"></div>



            <div className=" w-full h-20 absolute flex justify-between">
                <div id="nameTag" className="h-full w-60 ms-28 mt-3"></div>

                <div className="flex flex-row justify-center align-middle gap-x-10">
                    <div className="mt-3 opacity-80">
                        <Notifications/>
                    </div>

                    <div className="me-5 opacity-70">
                        <CurrentTime/>
                    </div>
                </div>
            </div>

            <div className="flex">
                <nav className="h-[99vh] w-20 flex justify-center items-center py-10">
                    <div className="h-screen w-24 flex flex-col justify-around items-center relative">
                        {menuItem.map(item => {
                            if (item.isAdmin && !isAdmin()) {
                                return null;
                            }
                            const isActive = location.pathname === item.to || location.pathname === item.toForm || location.pathname === item.toPreview;
                            const iconColor = isActive ? '#eda1d4' : '#78045B'; // Change '#FF0000' to the desired active color

                            return (
                                <Link key={item.to} className="no-underline" to={item.to} style={{zIndex: "1"}}>
                                    <div className={`mt-4 cursor-pointer opacity-60`}>
                                        {item.dropdown ? (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="w-full h-full">
                                                        {item.icon(iconColor)}
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                                    <Link to={item.toForm}>
                                                        <DropdownMenuItem>{item.title} form</DropdownMenuItem>
                                                    </Link>

                                                    <Link to={item.toPreview}>
                                                        <DropdownMenuItem>{item.title} preview</DropdownMenuItem>
                                                    </Link>

                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        ) : item.icon(iconColor)}
                                    </div>
                                </Link>
                            )
                        })}

                        <div className="h-screen w-20 bg-purple opacity-40 absolute"></div>
                    </div>
                </nav>

                <Outlet/>
                {/*<Preview/>*/}
            </div>
        </>
    )
}

export default RootLayout;
