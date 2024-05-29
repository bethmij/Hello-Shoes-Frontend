import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar.jsx";
import {IoMdSettings} from "react-icons/io";
import {RiLogoutCircleRFill} from "react-icons/ri";



export function ProfilePic() {

    const profilePic = localStorage.getItem("profilePic")
    const email = localStorage.getItem("email")
    const name = localStorage.getItem("name")

    const getName = () => {
        const name = localStorage.getItem("name")
        if (!name) return '';
        const nameParts = name.split(' ');
        if (nameParts.length < 2) return '';
        const firstInitial = nameParts[0][0].toUpperCase();
        const secondInitial = nameParts[1][0].toUpperCase();
        return firstInitial + secondInitial;
    };

    return (
        <>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Avatar className="w-full h-full cursor-pointer z-50">
                        <AvatarImage
                            src={profilePic}
                            alt="@shadcn"/>
                        <AvatarFallback>{getName()}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent  className="w-[15vw] mt-5">
                    <DropdownMenuLabel className="text-xl font-normal text-center">{name}</DropdownMenuLabel>
                    <DropdownMenuLabel className="text-sm -mt-3 font-normal text-center">{email}</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className="text-lg">
                        <IoMdSettings className="me-5"/>
                        Setting
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-lg">
                        <RiLogoutCircleRFill className="me-5"/>
                        Log out
                    </DropdownMenuItem>
                    {/*<DropdownMenuSeparator/>*/}
                    {/*<Link to={`/form/customer/update-${data.customerCode}`}>*/}
                    {/*    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.customerCode)}>Update*/}
                    {/*        customer</DropdownMenuItem>*/}
                    {/*</Link>*/}
                    {/*{isAdmin() &&  <DropdownMenuItem onClick={() => deleteCustomer(data.customerCode)}>Delete Customer</DropdownMenuItem>}*/}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}