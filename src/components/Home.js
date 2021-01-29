import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Home = () => {
	const slideImages = [
		"https://www.plants.com/images/vday-hp-hero_20210126-1611688063331.jpg",
		"https://cdn-yotpo-images-production.yotpo.com/instagram/26/17845191269080826/standard_resolution.jpg",
		"https://cdn-yotpo-images-production.yotpo.com/instagram/19/18079210213196619/standard_resolution.jpg",
		"https://i.pinimg.com/564x/f8/1d/4b/f81d4b822d3d4f2651a66b621db61de7.jpg",
		"http://www.looselab.nl/wp-content/uploads/2015/08/The-Loft-Amsterdam-8.jpg",
		"http://www.looselab.nl/wp-content/uploads/2015/08/The-Loft-Amsterdam-6.jpg",
		"http://www.looselab.nl/wp-content/uploads/2015/08/The-Loft-Amsterdam-9.jpg",
		"https://i.ytimg.com/vi/31wyZbPARfU/maxresdefault.jpg",
	];
	return (
		<>
			<section className="homepage">
				<div className="slide-container">
					<Slide>
						<div className="each-slide">
							<div
								className="slideImage"
								style={{
									backgroundImage: `url(${slideImages[0]} )`,
									backgroundRepeat: "no-repeat",
									height: "100vh",
									backgroundSize: "cover",
								}}
							>
								<h1 className="header-heading">Plant Gallerie</h1>
								<article style={{ color: "white" }} className="article-heder">
									<p style={{ fontSize: "30px" }}>
										Free Shipping With Orders Over $100
									</p>
									<button className="main-image-button" id="shopButton">
										<Link to="/products" className="allProdLink">
											Shop Now
										</Link>
									</button>
								</article>
							</div>
						</div>
						<div className="each-slide">
							<div
								className="slideImage"
								style={{
									backgroundImage: `url(${slideImages[5]} )`,
									height: "100vh",
									width: "100wh",
									backgroundRepeat: "no-repeat",
									backgroundPosition: "center center",
								}}
							>
								<h1 className="header-heading" style={{ color: "white" }}>
									Plant Gallerie
								</h1>
								<article className="article-heder">
									<p style={{ fontSize: "30px", color: "white" }}>
										Free Shipping With Orders Over $100
									</p>
									<button className="main-image-button" id="shopButton">
										<Link to="/products" className="allProdLink">
											Shop Now
										</Link>
									</button>
								</article>
							</div>
						</div>
						<div className="each-slide">
							<div
								className="slideImage"
								style={{
									backgroundImage: `url(${slideImages[4]})`,
									backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
									backgroundPosition: "center top",
								}}
							>
								<h1 className="header-heading">Plant Gallerie</h1>
								<article className="article-heder">
									<p style={{ fontSize: "30px" }}>
										Free Shipping With Orders Over $100
									</p>
									<button className="main-image-button" id="shopButton">
										<Link to="/products" className="allProdLink">
											Shop Now
										</Link>
									</button>
								</article>
							</div>
						</div>
						<div className="each-slide">
							<div
								className="slideImage"
								style={{
									backgroundImage: `url(${slideImages[7]})`,
									backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
									backgroundPosition: "center top",
								}}
							>
								<h1 className="header-heading">Plant Gallerie</h1>
								<article className="article-heder">
									<p style={{ fontSize: "30px", color: "white" }}>
										Free Shipping With Orders Over $100
									</p>
									<button className="main-image-button" id="shopButton">
										<Link to="/products" className="allProdLink">
											Shop Now
										</Link>
									</button>
								</article>
							</div>
						</div>
					</Slide>
				</div>
			</section>
		</>
	);
};

export default Home;
