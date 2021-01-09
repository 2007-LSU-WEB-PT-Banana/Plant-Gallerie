import React, { Fragment} from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
      <nav className="header">
        <Link to="/">Home Icon</Link>
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
      </nav>
    );
}

export default Header
