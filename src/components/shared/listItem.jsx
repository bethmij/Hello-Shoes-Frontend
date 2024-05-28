import {NavigationMenuLink} from "../ui/navigation-menu.jsx";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

function ListItem(props) {
    return (
        // <li key={props.key}>
        <li>
            <NavigationMenuLink asChild>
                <Link to={props.to}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-l font-medium leading-none">{props.title}</div>
                    <p className="line-clamp-2 text-m leading-snug text-muted-foreground">
                        {props.description}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

ListItem.propTypes = {
    // key: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    to:PropTypes.string
};

export default ListItem