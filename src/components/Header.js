import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const headerStyling = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: '#c0c0c0',
  position: "fixed",
  top: "0",
  width: "100%",
  zIndex: "100",
  border: "2px solid rgb(208, 211, 214)",
  boxShadow: "2px -1px 2px 0px rgb(108, 184, 108)",
  padding: "10px",
  fontFamily: 'Alegreya Sans SC, sans-serif',
  fontWeight: 'bold',
  fontSize: '20px',
  textDecoration: 'none',
  color: 'black',
};

const headerLink = {
  marginRight: "35px",
  justifyContent: 'space-between',
  // color: "black",
  fontFamily: 'sans-serif',
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
      <div className="header-nav" >
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
      <div>
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
