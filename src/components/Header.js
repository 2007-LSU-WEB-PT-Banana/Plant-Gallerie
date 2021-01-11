import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";


const Header = () => {
  return (
    <nav className="header">
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
          <PersonOutlineIcon />
      </div>
      <div className="shopping-cart">
        <ShoppingCartIcon />
      </div>
    </nav>
  );
};

export default Header;
