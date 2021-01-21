import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import DehazeIcon from '@material-ui/icons/Dehaze'
import './Header.css'

const headerLink = {
  marginRight: '35px',
  justifyContent: 'space-between',
  fontWeight: 'normal',
  backgroundColor: '#c0c0c0',
  padding: '6px',
  textDecoration: 'none',
  color: 'black',
  borderRadius: '.25rem',
  textAlign: 'center',
  transition: 'all .3s',
  textTransform: 'uppercase',
  fontFamily: 'Alegreya Sans SC, sans-serif',
}

const Header = (props) => {
  const {
    setIsLoggedIn,
    history,
    clearToken,
    activeUser,
    setActiveUser,
  } = props
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [visible, setVisible] = useState(null)

  const handleVisibility = () => {
    setVisible(!visible)
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 812px)')
    mediaQuery.addEventListener('change', handleMediaQueryChange)
    handleMediaQueryChange(mediaQuery)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  const handleSignOut = () => {
    console.log('hitting signout')
    clearToken()
    setIsLoggedIn(false)
  }

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible)
  }

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true)
      toggleNav()
    } else {
      setIsSmallScreen(false)
    }
  }

  return (
    <header className="Header">
      <Link to="/" className="logo" style={headerLink}>
        Plant Gallerie
      </Link>
      {(!isSmallScreen || isNavVisible) && (
        <nav className="Nav">
          <Link to="/products" className="header-link" style={headerLink}>
            All Plants
          </Link>
          <Link to="/houseplants" className="header-link" style={headerLink}>
            House Plants
          </Link>
          <Link
            to="/floweringplants"
            className="header-link"
            style={headerLink}
          >
            Flowering Plants
          </Link>
          <Link to="/bonsaiplants" className="header-link" style={headerLink}>
            Bonsai Plants
          </Link>
          <Link to="/" className="header-link" style={headerLink}>
            <div className="search-bar">
              <input
                className={visible ? 'open' : 'close'}
                className="search-bar_input"
                placeholder="Enter your query..."
                aria-label="search"
                display="none"
                type="text"
              />

              <button
                style={{ outline: 'none' }}
                id="toggle-search"
                aria-label="submit search"
                className="search-bar_submit"
                onClick={handleVisibility}
              >
                <SearchIcon className="search-header" />
              </button>
            </div>
          </Link>

          {!setActiveUser ? (
            <Link to="/" className="header-link" style={headerLink}>
              <span onClick={handleSignOut}>
                Hello {activeUser.username} Signout
              </span>
            </Link>
          ) : (
            <Link to="/login" className="header-link" style={headerLink}>
              <PersonOutlineIcon />
            </Link>
          )}

          <Link to="/cart" className="header-link" style={headerLink}>
            <ShoppingCartIcon />
          </Link>
        </nav>
      )}
      <button className="Burger" onClick={toggleNav}>
        <DehazeIcon id="burger-icon"></DehazeIcon>
      </button>
    </header>
  )
}

export default Header
