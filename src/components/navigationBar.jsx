import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle
} from "./ui/navigation-menu.jsx";

import {Link} from "react-router-dom";
import ListItem from "./shared/listItem.jsx";
// import * as React from "react";

const components = [
    {
        title: "Customers +",
        to: "/docs/primitives/alert-dialog",
        description:
            "Add a new Customer",
    },
    {
        title: "Customer",
        to: "/docs/primitives/hover-card",
        description:
            "Preview all customer.jsx",
    },
    {
        title: "Employees +",
        to: "/docs/primitives/progress",
        description:
            "Add a new employee",
    },
    {
        title: "Employee",
        to: "/docs/primitives/scroll-area",
        description: "Preview all employees",
    },
    {
        title: "Suppliers + +",
        to: "/docs/primitives/progress",
        description:
            "Add a new supplier",
    },
    {
        title: "Suppliers ",
        to: "/docs/primitives/tabs",
        description:
            "Preview all suppliers",
    },
    {
        title: "Add Inventories",
        to: "/docs/primitives/tooltip",
        description:
            "Add a new inventory",
    },

]

function NavigationBar() {

    return (
        <NavigationMenu >
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger >Purchase</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
                            <li id="navPic" className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link to={"/"}
                                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                                        <div className="mb-2 mt-4 text-xl font-medium">
                                            Item Preview
                                        </div>
                                        <p className="text-m leading-tight text-muted-foreground">
                                            Visit our all products
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <ListItem key={1} title="Purchase" description="Save Order Details"/>
                            <ListItem key={1} title="Refund" description="Refund Customer Order"/>
                            <ListItem key={1} title="Previes" description="Previes Sales"/>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Customization</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    to={component.to}
                                    description={component.description}>
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/docs" legacyBehavior passHref >
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Admin Panel
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default NavigationBar