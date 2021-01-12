import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const headerStyling = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "rgb(230, 233, 237)",
  position: "sticky",
  top: "0",
  zIndex: "100",
  border: "2px solid rgb(208, 211, 214)",
  boxShadow: "2px -1px 2px 0px rgb(108, 184, 108)",
  padding: "10px",
  fontFamily: 'sans-serif',
  fontWeight: 'bold',
};

const headerLink = {
  marginRight: "15px",
  color: "black",
  fontFamily: 'sans-serif',
  fontWeight: 'normal',
  padding: '10px'
}

const Header = () => {
  return (
    <nav className="header" style={headerStyling}>
      Plant Gallerie
      <Link to="/">
        <div className="home-icon">
          <HomeIcon />
        </div>
      </Link>
      <div className="header-nav" style={headerLink}>
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
  );
};

export default Header;
