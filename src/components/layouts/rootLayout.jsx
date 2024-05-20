// import { useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import CurrentTime from "../shared/time.jsx";
// import { CiHome } from "react-icons/ci";
// import { PiHighHeelThin, PiShoppingCartLight } from "react-icons/pi";
// import { BsPersonBadge, BsPersonDown } from "react-icons/bs";
// import { GoPackageDependencies } from "react-icons/go";
// import { VscGraph } from "react-icons/vsc";
// import { CgProfile } from "react-icons/cg";
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu.jsx"; // Ensure you import these from your dropdown menu library
// import { Button } from "../ui/button.jsx";
// import {MoreHorizontal} from "lucide-react"; // Ensure you import your Button component
//
// const menuItem = [
//     { to: "/", icon: <CiHome size="45" color="#78045B" /> },
//     { to: "/cart", icon: <PiShoppingCartLight size="45" color="#78045B" />, dropdown: true },
//     { to: "/inventory", icon: <PiHighHeelThin size="45" color="#78045B" />, dropdown: true },
//     { to: "/customer.jsx", icon: <BsPersonDown size="45" color="#78045B" />, dropdown: true },
//     { to: "/supplier", icon: <GoPackageDependencies size="45" color="#78045B" /> },
//     { to: "/employee", icon: <BsPersonBadge size="45" color="#78045B" /> },
//     { to: "/admin", icon: <VscGraph size="45" color="#78045B" /> },
//     { to: "/1", icon: "" },
//     { to: "/2", icon: "" },
//     { to: "/4", icon: "" },
//     { to: "/5", icon: "" },
//     { to: "/6", icon: "" },
//     { to: "/7", icon: "" },
//     { to: "/8", icon: "" },
//     { to: "/9", icon: "" },
//     { to: "/10", icon: "" },
//     { to: "/user", icon: <CgProfile size="45" color="#78045B" /> }
// ];
//
// function RootLayout() {
//     const [dropdownOpen, setDropdownOpen] = useState(null);
//
//     const handleDropdownToggle = (index) => {
//         if (dropdownOpen === index) {
//             setDropdownOpen(null);
//         } else {
//             setDropdownOpen(index);
//         }
//     };
//
//     return (
//         <>
//             <div id="rootPage" className="h-screen w-full absolute opacity-50 "></div>
//             <div className="w-full h-20 absolute bg-black opacity-50"></div>
//
//             <div className="w-full h-20 absolute flex justify-between">
//                 <div id="nameTag" className="h-full w-60 ms-28 mt-3"></div>
//                 <div className="me-5 opacity-70">
//                     <CurrentTime />
//                 </div>
//             </div>
//
//             <div className="flex">
//                 <nav className="h-screen w-20 flex justify-center items-center ">
//                     <div className="h-screen flex flex-col justify-around items-center relative">
//                         {menuItem.map((item, index) => (
//                             <div key={item.to} className="relative">
//                                 <Link className="no-underline" to={item.to} style={{ zIndex: "1" }}>
//                                     <div className="mt-4 cursor-pointer opacity-50">
//                                         {item.icon}
//                                     </div>
//                                 </Link>
//                                 {item.dropdown && (
//                                     <DropdownMenu>
//                                         <DropdownMenuTrigger asChild>
//                                             <Button variant="ghost" className="h-8 w-8 p-0">
//                                                 <span className="sr-only">Open menu</span>
//                                                 <MoreHorizontal className="h-4 w-4" />
//                                             </Button>
//                                         </DropdownMenuTrigger>
//                                         <DropdownMenuContent align="end">
//                                             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                                             <DropdownMenuItem onClick={() => navigator.clipboard.writeText("Employee Code")}>
//                                                 Copy Employee Code
//                                             </DropdownMenuItem>
//                                             <DropdownMenuSeparator />
//                                             <Link to={`/form/employee/update-employeeCode`}>
//                                                 <DropdownMenuItem>Update Employee</DropdownMenuItem>
//                                             </Link>
//                                             <DropdownMenuItem onClick={() => console.log("Delete Employee")}>
//                                                 Delete Employee
//                                             </DropdownMenuItem>
//                                             <DropdownMenuItem onClick={() => console.log("View Image")}>
//                                                 View Image
//                                             </DropdownMenuItem>
//                                         </DropdownMenuContent>
//                                     </DropdownMenu>
//                                 )}
//                             </div>
//                         ))}
//                         <div className="h-screen w-20 bg-purple opacity-40 absolute"></div>
//                     </div>
//                 </nav>
//                 <Outlet />
//             </div>
//         </>
//     );
// }
//
// export default RootLayout;


import {Link, Outlet} from 'react-router-dom'
import CurrentTime from "../shared/time.jsx";
import {CiHome} from "react-icons/ci";
import {PiHighHeelThin, PiShoppingCartLight} from "react-icons/pi";
import {BsPersonBadge, BsPersonDown} from "react-icons/bs";
import {GoPackageDependencies} from "react-icons/go";
import {VscGraph} from "react-icons/vsc";
import {CgProfile} from "react-icons/cg";
// import TableDashboard from "../shared/table.jsx";
import Preview from "../../pages/preview/preview.page.jsx"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.jsx";
import {Button} from "../ui/button.jsx";
import {MoreHorizontal} from "lucide-react";


const menuItem = [
    {
        to: "/",
        icon: <CiHome size="45" color="#78045B"/>,
        title:"Home"
    },
    {
        to: "/cart",
        icon: <PiShoppingCartLight size="45" color="#78045B"/>,
        title:"Sale"
    },
    {
        toForm: "/form/inventory/save",
        toPreview:"/preview/inventory",
        icon: <PiHighHeelThin size="45" color="#78045B"/>,
        dropdown: true,
        title: "Inventory"
    },
    {
        toForm: "/form/customer/save",
        toPreview:"/preview/customer",
        dropdown: true,
        icon: <BsPersonDown size="45" color="#78045B"/>,
        title:"Customer"
    },
    {
        toForm: "/form/supplier/save",
        toPreview:"/preview/supplier",
        dropdown: true,
        icon: <GoPackageDependencies size="45" color="#78045B"/>,
        title:"Supplier"
    },
    {
        toForm: "/form/employee/save",
        toPreview:"/preview/employee",
        dropdown: true,
        icon: <BsPersonBadge size="45" color="#78045B"/>,
        title:"Employee"
    },
    {
        to: "/admin",
        icon: <VscGraph size="45" color="#78045B"/>
    },
    {to: "/1", icon:""},
    {to: "/1", icon:""},
    {to: "/1", icon:""},
    {to: "/1", icon:""},
    {to: "/1", icon:""},
    {to: "/1", icon:""},
    {to: "/1", icon:""},
    {to: "/1", icon:""},
    {to: "/1", icon:""},
    {to: "/1", icon:""},
    {to: "/1", icon:""},
    {to: "/1", icon:""},
    {to: "/1", icon:""},
    {to: "/1", icon:""},

    {
        to: "/user",
        icon: <CgProfile size="45" color="#78045B"/>
    }


]


function RootLayout() {

    return (
        <>

            <div id="rootPage" className="h-screen w-full absolute opacity-50 "></div>
            <div className="w-full h-20 absolute bg-black opacity-50"></div>

            <div className=" w-full h-20 absolute flex justify-between">
                <div id="nameTag" className="h-full w-60 ms-28 mt-3"></div>

                <div className="me-5 opacity-70">
                    <CurrentTime/>
                </div>
            </div>

            <div className="flex">

                <nav className="h-[99vh] w-20 flex  justify-center items-center py-10">
                    <div className="h-screen w-24 flex flex-col justify-around items-center relative">
                        {menuItem.map(item => {
                            return (
                                <Link key={item.to} className="no-underline" to={item.to} style={{zIndex: "1"}}>
                                    <div className={`mt-4 cursor-pointer opacity-50`}>
                                        {item.dropdown ? (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="w-full h-full">
                                                        {item.icon}
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
                                        ) : item.icon}
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

export default RootLayout