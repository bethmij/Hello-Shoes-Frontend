import {Link} from "react-router-dom";

import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useForm} from "react-hook-form";
import {SelectItems} from "../../components/shared/selectItem.jsx";
import axios from "axios";

const onSubmit = async (data) => {
    const {email, password} = data;

    try {
        const response = await axios.post("http://localhost:8080/app/user/signup", JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            alert('Data posted to backend successfully!');
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('accessToken', response.data.token);
            localStorage.setItem('role', response.data.role);
        }
    } catch (error) {
        alert('Error posting data to backend:');
    }
}


    function SignUpPage() {

    const {register, handleSubmit,setValue} = useForm()

    return (
        <>

            <div className="relative h-screen">

                <div id="signPage" className="absolute inset-0 h-full w-full bg-cover bg-center opacity-35 z-0"></div>

                <div className="relative flex justify-start ms-20 items-center h-full z-10 mb-32">
                    <Card className="w-[30vw] h-[70vh] bg-transparent border-transparent">
                        <CardHeader>
                            <CardTitle className="text-4xl">Sign Up</CardTitle>
                            <CardDescription className="text-lg">
                                Enter your information to create an account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(data => onSubmit(data))}>
                                <div className="grid gap-4 mt-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="first-name" className="text-xl">First name</Label>
                                            <Input id="first-name" placeholder="Max" required/>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="last-name" className="text-xl">Last name</Label>
                                            <Input id="last-name" placeholder="Robinson" required/>
                                        </div>
                                    </div>
                                    <div className="grid gap-2 mt-6">
                                        <Label htmlFor="email" className="text-xl">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            {...register('email')}
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2 mt-6">
                                        <Label htmlFor="password" className="text-xl">Password</Label>
                                        <Input id="password"
                                               name="password"
                                               {...register('password')}
                                               type="password"
                                               required
                                        />
                                    </div>

                                    <SelectItems id="role" title="Role" setValue={setValue} list={["ADMIN","USER"]}></SelectItems>

                                    <Button type="submit" className="w-full text-lg mt-10">
                                        Create an account
                                    </Button>

                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Already have an account?{" "}
                                    <Link to="#" className="underline">
                                        Sign in
                                    </Link>
                                </div>

                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </>
    )
}

export default SignUpPage