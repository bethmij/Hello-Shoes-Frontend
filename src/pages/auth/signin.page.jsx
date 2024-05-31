import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";




const SignInPage = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { email, password } = data;

        try {
            const response = await axios.post(
                "http://localhost:8080/app/user/signin",
                JSON.stringify(data),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);
                localStorage.setItem("accessToken", response.data.token);
                localStorage.setItem("role", response.data.role);
                localStorage.setItem("profilePic", response.data.profilePic);
                localStorage.setItem("name", response.data.name);
                navigate("/");
                console.log(
                    "User SignIn Successfully " + response.data.token,
                    email,
                    password
                );
            } else {
                await swal("Error", response.error || "Invalid username or password\n Try Again!", "error");
            }
        } catch (error) {
            const errorMsg = "Invalid username or password";
            await swal("Error", errorMsg, "error");
        }
    };




    return (
        <>
            <div className="relative h-screen">
                <div
                    id="signPage"
                    className="absolute inset-0 h-full w-full bg-cover bg-center opacity-35 z-0"
                ></div>
                <div className="relative flex justify-start ms-20 items-center h-full z-10">
                    <Card className="w-[30vw] h-[70vh] bg-transparent border-transparent">
                        <CardHeader>
                            <CardTitle className="text-4xl">Login</CardTitle>
                            <CardDescription className="text-lg mb-16">
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleSubmit((data) => {
                                    onSubmit(data);
                                })}
                            >
                                <div className="grid gap-5 mt-10">
                                    <div className="grid gap-2 mb-10">
                                        <Label htmlFor="email" className="text-xl">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            {...register("email")}
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password" className="text-xl">
                                                Password
                                            </Label>
                                            <Link to="#" className="ml-auto inline-block text-sm underline">
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <Input
                                            id="password"
                                            name="password"
                                            {...register("password")}
                                            type="password"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full mt-14 text-lg">
                                        Login
                                    </Button>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <Link to="#" className="underline">
                                        Sign up
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default SignInPage;
