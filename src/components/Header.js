import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { CenterFocusStrong } from "@material-ui/icons";
import './Header.css';

const headerStyling = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: '#c0c0c0',
  position: "fixed",
  top: "0",
  width: "100%",
  zIndex: "100",
  padding: "10px",
  fontFamily: 'Alegreya Sans SC, sans-serif',
  borderBottom: "4px solid #607848",
  fontWeight: 'bold',
  fontSize: '20px',
  textDecoration: 'none',
  color: 'black',
  marginBottom: '20px'
};

const headerLink = {
  marginRight: "35px",
  justifyContent: 'space-between',
  fontWeight: 'normal',
  backgroundColor: "#c0c0c0",
  padding: '6px',
  textDecoration: 'none',
  color: 'black',
  borderRadius: '.25rem',
  textAlign: 'center',
  transition: 'all .3s', 
  textTransform: 'uppercase',
  fontFamily: 'Alegreya Sans SC, sans-serif',
}


const Header = () => {
  return (
    <nav className="header" style={headerStyling}>
      <Link to="/" className='header-link' style={headerLink}>
          Plant Gallerie
         </Link>
      <div className="header-nav" id="header-center">
        <Link to="/products" className="header-link" style={headerLink}>All Plants</Link>

        <Link to="/houseplants" className="header-link" style={headerLink}>
          House Plants
        </Link>
        <Link to="/floweringplants" className="header-link" style={headerLink}>
          Flowering Plants
        </Link>
        <Link to="/bonsaiplants" className="header-link" style={headerLink}>
          Bonsai Plants
        </Link>
      </div>
      <div id="header-right">
        <SearchIcon className="header-searchIcon" />
      </div>
      <div className="log-in">
        <Link to="/login" className="header-link">
          <div>
            <PersonOutlineIcon />
          </div>
        </Link>
      </div>
      <div className="shopping-cart">
        <Link to="/cart" className="header-link">
          <div>
            <ShoppingCartIcon />
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default Header
