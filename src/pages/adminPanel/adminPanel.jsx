// import Card from "../../components/shared/card.jsx";
import {Card, CardContent, CardHeader, CardTitle} from "../../components/ui/card.jsx";
import {DollarSign, Activity, CreditCard} from "lucide-react";
import CardItem from "../../components/shared/card.jsx";
import React, {useEffect, useState} from "react";
import {fetchData, getDetails} from "../cart/cardDetail/fetchData.jsx";
import {CardDetail} from "./panelDetail/cardDetail.jsx";
import Tables from "../../components/shared/table.jsx";
import {panelColumns} from "./panelDetail/panelTableData.jsx";
import {ScrollArea} from "../../components/ui/scroll-area.jsx";
import noImageAvailable from '../../assets/img/no-image-available.jpg';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/ui/tabs.jsx";
import {CgFormatRight} from "react-icons/cg";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger} from "../../components/ui/dialog.jsx";
import {Button} from "../../components/ui/button.jsx";
import {CardPayment} from "../../components/shared/CardPayment.jsx";
import {CashPayment} from "../../components/shared/CashPayment.jsx";

import {Chart as ChartJS, defaults} from "chart.js/auto";
import {Bar} from "react-chartjs-2";
// const CartItem = () => {
//
// }
const formatDate = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = parseInt(dateString.substring(6, 8))+1;
    return `${year}-${month}-${day}`;
};
function AdminPanel() {

    const [profitToday, setProfitToday] = useState()
    const [saleToday, setSaleToday] = useState()
    const [profitWeek, setProfitWeek] = useState()
    const [saleWeek, setSaleWeek] = useState()
    const [profitData, setProfitData] = useState([])
    const [saleData, setSaleData] = useState([])
    const [dates, setDates] = useState([])
    const [dataWeek, setDataWeek] = useState([])
    const [dataMonth, setDataMonth] = useState([])
    const [data, setData] = useState([])
    const [itemToday, setItemToday] = useState()
    const [itemWeek, setItemWeek] = useState()
    const [itemPictureToday, setItemPictureToday] = useState()
    const [itemPictureWeek, setItemPictureWeek] = useState()

    useEffect(() => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayFormatted = `${year}-${month}-${day}`;
        getDetails("admin", todayFormatted).then(panel => {
            setProfitToday(panel.totalProfit)
            setSaleToday(panel.totalSales)
            setItemToday(panel.mostSaleItem)
            setItemPictureToday(panel.mostSaleItemPic || noImageAvailable)
        })
        getDetails("admin", "week-profit").then(data => {
            setProfitWeek(data)
        })
        getDetails("admin", "week-sale").then(data => {
            setSaleWeek(data)
        })
        fetchData("http://localhost:8080/app/admin/getAll").then(panel => {
            setData(panel)
        })
        getDetails("admin", "week").then(panel => {
            setItemWeek(panel.mostSaleItem)
            setItemPictureWeek(panel.mostSaleItemPic || noImageAvailable)
        })
        getDetails("admin", "week-data").then(panel => {
            setDataWeek(panel)
            const profit = []
            const dates = []
            const sales = []
            panel.map(data => {
                profit.push(data.totalProfit)
                sales.push(data.totalSales)
                dates.push(formatDate(data.date))
            })
            setProfitData(profit)
            setDates(dates)
            setSaleData(sales)
            console.log(sales)

        })
        getDetails("admin", "month-data").then(panel => {
            setDataMonth(panel)
        })
    }, []);


    const cardDetails = CardDetail(profitToday, saleToday, profitWeek, saleWeek)
    // console.log(data)
    // console.log(panelColumns)
    defaults.plugins.title.display = true;
    defaults.plugins.title.align = "start";
    defaults.plugins.title.font.size = 20;
    defaults.plugins.title.color = "black";


    return (
        <>
            <div className="absolute top-0 left-1/2 flex gap-x-5 -ms-32 mt-4 opacity-80">
                <CgFormatRight size="40"/>
                <h1 className="text-3xl ">Admin Panel</h1>
            </div>

            <div className="flex flex-col items-center">
                {/*<h1>dfsdfsdf</h1>*/}
                <div className="flex flex-row z-50 gap-x-20 mt-24 ms-20">

                    {cardDetails.map(data => {
                        return <CardItem key={data.title} title={data.title} content={data.content}
                                         description={data.description}
                                         icon={data.icon}/>
                    })}

                </div>



            <div className="flex flex-row gap-x-32  w-[85vw] h-[68vh] ms-36 ">
                <div className="w-[55vw] h-10  z-50 mt-10  flex flex-row  ">
                    <Tabs defaultValue="week" className="w-[400px] z-50 ">
                        <TabsList className="bg-purple">
                            <TabsTrigger value="week">Week</TabsTrigger>
                            <TabsTrigger value="month">Month</TabsTrigger>
                            <TabsTrigger value="all">All</TabsTrigger>
                        </TabsList>
                        <TabsContent value="week">
                            <ScrollArea className="w-[55vw] mt-16 h-[50vh]  rounded-3xl z-0">
                                <div className="w-full h-full  z-50">
                                    <Tables columns={panelColumns} data={dataWeek}/>
                                </div>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="month">
                            <ScrollArea className="w-[55vw] mt-16 h-[50vh]  rounded-3xl z-0">
                                <div className="w-full h-full  z-50">
                                    <Tables columns={panelColumns} data={dataMonth}/>
                                </div>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="all">
                            <ScrollArea className="w-[55vw] mt-16 h-[50vh]  rounded-3xl z-0">
                                <div className="w-full h-full  z-50">
                                    <Tables columns={panelColumns} data={data}/>
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>

                    <Dialog className="max-w-screen-lg w-full">
                        <DialogTrigger className="z-50">
                            <Button className="w-[10vw] -ms-56 text-lg">Graph View</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-screen-lg w-full">
                            <DialogHeader className="max-w-screen-lg w-full">
                                <DialogDescription className="max-w-screen-lg w-full">
                                    <div className="dataCard customerCard w-full h-[50vh]">
                                        <Bar
                                            data={{
                                                labels: dates,
                                                datasets: [
                                                    {
                                                        label: "Total Profit",
                                                        data: profitData,
                                                        backgroundColor: '#5d013a',
                                                        borderWidth: 10,
                                                    },
                                                    {
                                                        label: "Total Sales",
                                                        data: saleData,
                                                        backgroundColor: '#9c0284',
                                                        borderWidth: 10,
                                                    },
                                                ],
                                            }}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                                plugins: {
                                                    title: {
                                                        display: true,
                                                        text: "Revenue Source",
                                                        font: {
                                                            size: 24,
                                                        },
                                                        color: 'white',
                                                    },
                                                    legend: {
                                                        labels: {
                                                            font: {
                                                                size: 25, // Legend font size
                                                            },
                                                        },
                                                    },
                                                    tooltip: {
                                                        bodyFont: {
                                                            size: 15, // Tooltip font size
                                                        },
                                                        titleFont: {
                                                            size: 15, // Tooltip title font size
                                                        },
                                                    },
                                                },
                                                scales: {
                                                    x: {
                                                        ticks: {
                                                            font: {
                                                                size: 20, // X-axis labels font size
                                                            },
                                                        },
                                                    },
                                                    y: {
                                                        ticks: {
                                                            font: {
                                                                size: 20, // Y-axis labels font size
                                                            },
                                                        },
                                                    },
                                                },
                                                layout: {
                                                    padding: 0,
                                                },
                                            }}
                                        />
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex flex-col">
                    <div
                        className="w-[20vw] h-[30vh] z-50 mt-10 ms-10 bg-dark-purple  mb-10 flex flex-col justify-center items-center">
                        <img src={itemPictureToday} alt="This is a image" width="210px" className="mt-3"/>
                        <p className="w-full h-1/6 bg-violet bottom-0 text-white text-xl text-center mt-5"> Most
                            Sold Item - Daily - {itemToday}</p>
                    </div>
                    <div
                        className="w-[20vw] h-[30vh] z-50  ms-10 bg-dark-purple  mb-10 flex flex-col justify-center items-center">
                        <img src={itemPictureWeek} alt="This is a image" width="210px" className="mt-3"/>
                        <p className="w-full h-1/6 bg-violet bottom-0 text-white text-xl text-center mt-5"> Most
                            Sold Item - Weekly - {itemWeek}</p>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default AdminPanel