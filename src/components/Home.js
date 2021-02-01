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
		// "https://modernize.com/wp-content/uploads/2016/02/Decorating-with-Plants-11.jpg",
		"https://cdn.vox-cdn.com/uploads/chorus_asset/file/19834627/zoom13.jpg",
		"https://cdn.vox-cdn.com/uploads/chorus_asset/file/19238547/190802_Curbed_Pires_2.jpg",
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
									<p
										style={{
											fontSize: "30px",
											fontFamily: "Alegreya Sans SC, sans-serif",
										}}
									>
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
									backgroundImage: `url(${slideImages[4]} )`,
									// height: "100vh",
									// width: "100wh",
									// backgroundRepeat: "no-repeat",
									// backgroundPosition: "center center",
									backgroundSize: "contain",
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
									backgroundImage: `url(${slideImages[5]})`,
									backgroundSize: "contain",
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
									backgroundImage: `url(${slideImages[6]})`,
									backgroundSize: "contain",
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
