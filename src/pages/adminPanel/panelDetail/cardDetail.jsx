import {Activity, CreditCard, DollarSign} from "lucide-react";


export const CardDetail = (profitToday,saleToday,profitWeek,saleWeek) => [


    {
        title: "Total Profit",
        content: `$${profitToday}`,
        description: "from this day",
        icon: <DollarSign className='h-7 w-7 text-muted-foreground'/>
    },
    {
        title: "Total Sale",
        content: saleToday,
        description: "from this day",
        icon: <CreditCard className='h-7 w-7 text-muted-foreground'/>
    },
    {
        title: "Weekly Profit ",
        content: `$${profitWeek}`,
        description: "from last week",
        icon: <DollarSign className='h-7 w-7 text-muted-foreground'/>
    },
    {
        title: "Weekly Sales",
        content: saleWeek,
        description: "from last week",
        icon: <Activity className='h-7 w-7 text-muted-foreground'/>
    }
]

