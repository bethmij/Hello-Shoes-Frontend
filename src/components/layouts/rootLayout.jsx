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
import {ProfilePic} from "../shared/Avartar.jsx";




const menuItem = [
    {
        id:"home",
        to: "/",
        icon: (color) => <CiHome size="43" color={color}/>,
        title: "Home"
    },
    {
        id:"cart",
        to: "/cart",
        icon: (color) => <PiShoppingCartLight size="43" color={color}/>,
        title: "Sale"
    },
    {
        id:"item",
        toForm: "/form/inventory/save",
        toPreview: "/preview/inventory",
        icon: (color) => <PiHighHeelThin size="43" color={color}/>,
        dropdown: true,
        title: "Inventory"
    },
    {
        id:"customer",
        toForm: "/form/customer/save",
        toPreview: "/preview/customer",
        dropdown: true,
        icon: (color) => <BsPersonDown size="43" color={color}/>,
        title: "Customer"
    },
    {
        id:"supplier",
        toForm: "/form/supplier/save",
        toPreview: "/preview/supplier",
        dropdown: true,
        icon: (color) => <GoPackageDependencies size="43" color={color}/>,
        title: "Supplier"
    },
    {
        id:"employee",
        toForm: "/form/employee/save",
        toPreview: "/preview/employee",
        dropdown: true,
        icon: (color) => <BsPersonBadge size="43" color={color}/>,
        title: "Employee"
    },
    {
        id:"admin",
        to: "/admin",
        icon: (color) => <VscGraph size="43" color={color}/>,
        isAdmin: true
    },

    // {id: 1, icon: () => ""},
    // {id: 2, icon: () => ""},
    // {id: 3, icon: () => ""},
    // {id: 4, icon: () => ""},
    // {id: 5, icon: () => ""},
    // {id: 6, icon: () => ""},
    // {id: 7, icon: () => ""},
    // {id: 8, icon: () => ""},
    // {id: 9, icon: () => ""},
    // {id: 10, icon: () => ""},
    // {id: 11, icon: () => ""},
    // {id: 12, icon: () => ""},
    // {id: 13, icon: () => ""},
    // {id: 14, icon: () => ""},
    // {
    //     id:"user",
    //     to: "/user",
    //     icon: (color) => <CgProfile size="43" color={color}/>
    // }
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

            <div className="flex ">
                <nav className="h-[99vh] w-16 flex flex-col justify-between pb-8 items-start  ">
                    <div className="h-[50vh] z-50 -ms-3 w-24 flex flex-col justify-around items-center relative">
                        {menuItem.map(item => {
                            if (item.isAdmin && !isAdmin()) {
                                return null;
                            }
                            const isActive = location.pathname === item.to || location.pathname === item.toForm || location.pathname === item.toPreview;
                            const iconColor = isActive ? '#eda1d4' : '#78045B'; // Change '#FF0000' to the desired active color

                            return (
                                <Link key={item.id} className="no-underline" to={item.to} style={{zIndex: "1"}}>
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


                    </div>
                    <div className="ms-2 -mt-5 w-14 h-14">
                      <ProfilePic/>
                    </div>

                    <div className="h-[99vh]  w-20 bg-purple opacity-40 absolute"></div>
                </nav>

                <Outlet/>
                {/*<Preview/>*/}
            </div>
        </>
    )
}

export default RootLayout;
