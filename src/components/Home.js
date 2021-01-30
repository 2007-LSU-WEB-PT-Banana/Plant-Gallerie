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
		"https://lh3.googleusercontent.com/HrY8bVBiw2gfjueqOAdwk5VpQ_a0elPvuo6KNtVvKlLeT7YnzJTmJzpScOCHk5g5WN5_LdxCExB946dKjhMePAxqiMRfXudOuVSld4kUtQIQ9ij8uy_PPQssxfvtG8i5Hyz0NNSeW2yJYlkDsVt10KYTxWaN9ovNdj0wL_Ev040qLgfbmdKqxKH7ggTZJGMiZx9XdO21fWO5Jr-PjDDgCQ4HRXGkXova8Swz--D2NegN3hwdFXKB8raMSYfg0ZJpCCNzGgM9oeE-sFrzVvDLMk929LRYRmgeDjVc0ollh5HPHskRC-xOvzLK3_X4L812tpOfe_V1mSR4_x9iRuAFHho25qvvTD-_zn8l_PmSzVn7TVSipOlGPDX6_m78PDEPVBpXeCrgIpaWVoo52gSZaKap9dccTNUMQ-pSac18j9q7OpA14j5MZF7oPYxY28TaM3EC6A0QKg08IOXELXITSEper51P1PT4zazBrU_kmnlFc4Y5Utrl_93Rm1Btdy_MR-Rx_fh1txt6zNfJCoCifpqBWKhMpM6Y9VyR8LhTmrpLmH8KC0TG8y0cI1iH5m9KKYQ7CcpGL88KhGdBXLVQjzBOHPNGSfmYILHCe94JfytfwZ9-GLUuW6YQwOaKYGbTfJEX0J2SYLo4XH_Zckzw65HX7hu6pyyUwCksYmN8S8Vx9rAdkJsoZiVUTQMjLPI8fJSF0rLC0Tlw00r2S4ZLjJBd=w582-h873-no?authuser=0",
		"https://lh3.googleusercontent.com/EoarZ5nLeuCTZ6uyH4riJMPQcRxv5U9wkdk7-cBZ-7RUX6W7GP3b4HILrZavxHroIheATKhQEBlT048JMLjMCUVHPY1EefcF3V4e0mSHr0ZKaOodJJoesqSZqNnfV53QFyl2dr3rVEDVbpGdFj1eMWCNxLJXqNBAIOScvKDECtQl-ePbzbgt34WwWEuIUcu0ic4XrcoHnCjFCrpBWMIr4kYckhVGHqq66Vejv3j-TGLlMm08hdvZu0u8g21k-Hcl4OSMnj4gr1IrWEybLfiwnEJgqHoNbsZytTOS3RJOlN6TgjRTkmJShuYq_dqDc2Ky7RHN6t9wOwImoKxsN_hnNMtNDsWrMqHx_b0jnXeAhyPLx_uabGygN9gwGkwT3-0oOtSO38hs_WGBV1DbI8URw9Y1ES54UwKbe7Z4O9hlhsZWq47cqO5YM2fRVEcf03woCHHi4amsdgAOgMSdYbtJyoH3eiYMQJRDn9EnfEkFdusNGUuvMLj6KAYyjJjVWIlx2H9dj_C37d7DyZ3smHv3oITCaZhYgOkELBUiXHtgr3ovNEWZpe7WOesTSOIEDcWCpnsOObzVczyDBJgXWPK4qsdYDIArUsPnxmYU0CLxO0dSVILO8lsZLciD30rqKHgpHOozs2NiajJhLxFr6qlCndgogvjR-2zaPtrs-nbI-049R8PJ29K1jbeGo4nuhdCAOvejdKtKAypK-2QPitRC4_gQ=w1024-h682-no?authuser=0",
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
