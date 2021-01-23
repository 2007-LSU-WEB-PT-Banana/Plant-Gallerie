import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import DehazeIcon from '@material-ui/icons/Dehaze'
import SearchBar from 'material-ui-search-bar'
import './Header.css'

const headerLink = {
	marginRight: "35px",
	justifyContent: "space-between",
	fontWeight: "normal",
	backgroundColor: "#c0c0c0",
	padding: "6px",
	textDecoration: "none",
	color: "black",
	borderRadius: ".25rem",
	textAlign: "center",
	transition: "all .3s",
	textTransform: "uppercase",
	fontFamily: "Alegreya Sans SC, sans-serif",
};

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

	const handleSignOut = () => {
		clearToken();
		setIsLoggedIn(false);
		setActiveUser({});
		setCartData([]);
		history.push("/");
	};

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 812px)");
		mediaQuery.addEventListener("change", handleMediaQueryChange);
		handleMediaQueryChange(mediaQuery);

		return () => {
			mediaQuery.removeEventListener("change", handleMediaQueryChange);
		};
	}, []);

	const toggleNav = () => {
		setIsNavVisible(!isNavVisible);
	};

	const handleMediaQueryChange = (mediaQuery) => {
		if (mediaQuery.matches) {
			setIsSmallScreen(true);
			toggleNav();
		} else {
			setIsSmallScreen(false);
		}
	};

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
					<Link to="/search" className="header-link" style={headerLink}>
						<SearchIcon className="header-searchIcon" />
					</Link>
					<Link to="/users" className="header-link" style={headerLink}>
						All Users(Only Admin)
					</Link>
					<Link to="/login" className="header-link" style={headerLink}>
						{!isLoggedIn ? (
							<>
							<div className="log-in">
								<Link to="/login" className="header-link" style={headerLink}>
									Login
								</Link>
							</div>
							 <div className="register">
               					<Link to="/register" className="header-link" style={headerLink}>
                 					Register
               					</Link>
             				</div>
			 				</>
						) : (
							<>
								<Link to="/users/me" className="header-link" style={headerLink}>
									My Account
								</Link>
								<h6 className="loginMessage">Welcome Back!</h6>
								<button className="logOut" onClick={handleSignOut}>
									Log Out
								</button>
							</>
						)}
					</Link>
					<Link to="/cart" className="header-link" style={headerLink}>
						<ShoppingCartIcon /> ({cartData.length})
					</Link>
				</nav>
			)}
			<button className="Burger" onClick={toggleNav}>
				<DehazeIcon id="burger-icon"></DehazeIcon>
			</button>
		</header>
	);
};

export default Header;
