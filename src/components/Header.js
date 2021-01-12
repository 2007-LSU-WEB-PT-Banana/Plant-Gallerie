import React, { Fragment } from "react";
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
};

const Header = () => {
  return (
    <nav className="header" style={headerStyling}>
      <Link to="/">
        <div className="home-icon">
          <HomeIcon />
        </div>
      </Link>
      <div className="header-nav">
        <Link to="/houseplants" className="header-link">
          House Plants
        </Link>
      </div>
      <div className="header-nav">
        <Link to="/floweringplants" className="header-link">
          Flowering Plants
        </Link>
      </div>
      <div className="header-nav">
        <Link to="/bonsaiplants" className="header-link">
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
