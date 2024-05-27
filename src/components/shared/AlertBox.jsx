import {Alert, AlertDescription, AlertTitle} from "../ui/alert.jsx";
import PropTypes from "prop-types";


export function AlertBox(props) {
    return (
        <>
            <Alert >
                {props.icon}
                <AlertTitle>{props.title}</AlertTitle>
                <AlertDescription>
                    {props.desc}
                </AlertDescription>
            </Alert>
        </>
    )
}

AlertBox.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    icon:PropTypes.object
};
