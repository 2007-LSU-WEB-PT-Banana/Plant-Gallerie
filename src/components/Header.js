import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import DehazeIcon from '@material-ui/icons/Dehaze'
import SearchBar from 'material-ui-search-bar'
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
    setActiveUser,
    cartData,
    isLoggedIn,
    setCartData,
    activeUser,
    searchTerm,
    setSearchTerm,
    search,
    setSearch,
  } = props
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const handleSignOut = () => {
    clearToken()
    setIsLoggedIn(false)
    setActiveUser({})
    setCartData([])
    history.push('/')
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 812px)')
    mediaQuery.addEventListener('change', handleMediaQueryChange)
    handleMediaQueryChange(mediaQuery)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible)
  }

  const logout = () => {
    setIsLoggedIn(false)
    clearToken()
    setActiveUser({})
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
            Bonsai and Bamboo
          </Link>

          <div className="header-link">
            <SearchBar
              className="serach-bar"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
              }}
              placeholder="filter plants"
              style={{
                margin: '0 auto',
                maxWidth: 500,
                height: '30px',
                backgroundColor: 'lightgrey',
              }}
            />
          </div>

          <Link to="/login" className="header-link" style={headerLink}>
            {!isLoggedIn ? (
              <PersonOutlineIcon />
            ) : (
              <>
                <h6 className="loginMessage">
                  Welcome Back! {activeUser?.username}
                </h6>
                <button className="logOut" onClick={logout}>
                  Log Out
                </button>
              </>
            )}
          </Link>
          <Link to="/cart" className="header-link" style={headerLink}>
            <ShoppingCartIcon />
            {cartData ? cartData.length : '0'}
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
