import {Card,CardContent, CardHeader, CardTitle} from "../ui/card.jsx";
import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu,
    Package2,
    Search,
    Users,
} from "lucide-react"
import PropTypes from "prop-types";

function CardItem(props) {

    return (
        <>
            <Card  className="w-[15vw] h-[20vh] z-50 flex flex-col justify-center bg-transparent">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-3xl font-medium">
                        {props.title}
                    </CardTitle>
                    {/*<DollarSign className="h-7 w-7 text-muted-foreground" />*/}
                    {props.icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{props.content}</div>
                    <p className="text-lg text-muted-foreground">
                        {props.description}
                    </p>
                </CardContent>
            </Card>
        </>
    )

}

export default CardItem

CardItem.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
    icon:PropTypes.object
};
