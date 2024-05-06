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

const router = createBrowserRouter([
    {
        element: <RootLayout/>,
        children: [
            {
                path:"/form/:id",
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
    // {
    //     path: "/page",
    //     element: <HomePage/>
    // }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
