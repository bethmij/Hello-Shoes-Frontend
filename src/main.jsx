import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import RootLayout from "./components/layouts/rootLayout.jsx";
import HomePage from "./pages/home/home.page.jsx";
import './App.css'
import Page from "./pages/page.jsx";

const router = createBrowserRouter([
    {
        element: <RootLayout/>,
        children: [
            {
                path:"/pagezxc",
                element:<HomePage/>
            }
        ]
    },
    {
        path: "/",
        element: <RootLayout/>
    },
    {
        path: "/page",
        element: <HomePage/>
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
