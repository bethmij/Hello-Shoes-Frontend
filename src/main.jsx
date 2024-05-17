import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import RootLayout from "./components/layouts/rootLayout.jsx";
// import HomePage from "./pages/home/home.page.jsx";
import './App.css'
// import Page from "./pages/page.jsx";
import FormPage from "./pages/form/form.page.jsx";
import HomePage from "./pages/home/home.page.jsx";
import PreviewPage from "./pages/preview/preview.page.jsx";
import CartPage from "./pages/cart/cart.page.jsx";
import SignInPage from "./pages/auth/signin.page.jsx";
import SignUpPage from "./pages/auth/signup.page.jsx";

const router = createBrowserRouter([

    {
        element: <RootLayout/>,
        children: [
            {
                path:"/form/:id/:action",
                element:<FormPage/>
            },
            {
                path:"/preview/:id",
                element:<PreviewPage/>
            },
            {
                path:"/cart",
                element:<CartPage/>
            }

        ]
    },
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/signin",
        element: <SignInPage/>
    },
    {
        path: "/signup",
        element: <SignUpPage/>
    },

])

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <HomePage/>
//     },
//     {
//         path: "/signin",
//         element: <SignInPage/>
//     },
//     {
//         path: "/signup",
//         element: <SignUpPage/>
//     },
//     {
//         path: "/app",
//         element: <RootLayout />,
//         children: [
//             {
//                 path: "form/:id/:action",
//                 element: <FormPage/>
//             },
//             {
//                 path: "preview/:id",
//                 element: <PreviewPage/>
//             },
//             {
//                 path: "cart",
//                 element: <CartPage/>
//             }
//         ]
//     }
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
