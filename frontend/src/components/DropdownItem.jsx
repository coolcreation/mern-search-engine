import { Link } from 'react-router-dom';

function DropdownItem(props) {
 

  return (
    <li className="nav-item" >
      <Link className="nav-link link" to={props.link}>{props.text}</Link>
    </li>
  );
}

export default DropdownItem;