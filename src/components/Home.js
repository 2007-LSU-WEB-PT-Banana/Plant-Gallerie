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
		"https://images.squarespace-cdn.com/content/v1/59e32f0f268b9625f4269485/1572201569715-K68FA2CFUAHBP7M6U2EQ/ke17ZwdGBToddI8pDm48kG87Sfbgg29A4BYEDq3OXvgUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcf4OxbJOyh_wHUnyc4kQLQ6SBshRGOku7c30Y_IRDNPta8R2IY5BHMaEj1zOWoDTZ/how-to-create-a-plant-loving-home.jpg?format=1000w",
		"https://www.plantz.com/wp-content/uploads/2019/07/decorating-with-plants-1024x682.jpeg",
		"https://i.ytimg.com/vi/31wyZbPARfU/maxresdefault.jpg",
	];
	//<a href="https://lh3.googleusercontent.com/c-GJQ6AT3utlu85lgFP6EwkcR6hc1hatrrPDOxtOMK2k7BUfx92yxuS1YifdfL2dpURLTeR2woiImMg7qIDgGr7X_qNAcmXUg4fUxj_0kxJJFAO-A7RKG2IEqqrUQVvFELJDpJhOvQ=w2400?source=screenshot.guru">
	//<img src="https://lh3.googleusercontent.com/c-GJQ6AT3utlu85lgFP6EwkcR6hc1hatrrPDOxtOMK2k7BUfx92yxuS1YifdfL2dpURLTeR2woiImMg7qIDgGr7X_qNAcmXUg4fUxj_0kxJJFAO-A7RKG2IEqqrUQVvFELJDpJhOvQ=w600-h315-p-k" /> </a>
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
									backgroundImage: `url(${slideImages[5]})`,
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
									backgroundImage: `url(${slideImages[6]})`,
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
