// import { DomainDisabledTwoTone } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import {
	fetchAPI,
	BASE_URL,
	getToken,
	clearToken,
	getActiveUser,
} from "../api";
import "./Home.css";
import {
	AllProducts,
	SingleProduct,
	Header,
	Login,
	FloweringPlants,
	BonsaiPlants,
	HousePlants,
	Home,
	Register,
	Payment,
	Cart,
	Users,
	SingleUser,
	AdminPortal,
	AddProduct,
	SingleUserAdmin,
	AddSingleUser,
	UpdateProduct,
	MultipleOrders,
	SuccessMessage,
	Failure,
	SingleUserUpdate,
} from "./index";

const App = () => {
	const history = useHistory();

	const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
	const [productList, setProductList] = useState([]);
	const [activeProduct, setActiveProduct] = useState("");
	const [cartData, setCartData] = useState([]);
	const [count, setCount] = useState(1);
	const [activeUser, setActiveUser] = useState("");
	const [orderId, setOrderId] = useState("");
	const [usersList, setUsersList] = useState([]);
	const [grandTotal, setGrandTotal] = useState(0);
	const [userToUpdate, setUserToUpdate] = useState({});

	useEffect(() => {
		fetchAPI(BASE_URL + "/products")
			.catch(console.error)
			.then((data) => {
				if (data) {
					data.map((product) => {
						let newPrice = product.price / 100;
						product.price = newPrice;
					});
					setProductList(data);
				}
			});
	}, []);

	useEffect(() => {
		if (!isLoggedIn) {
			const data = localStorage.getItem("cartData");
			if (data) {
				setCartData(JSON.parse(data));
			}
		}
	}, []);

	useEffect(() => {
		if (!isLoggedIn) {
			localStorage.setItem("cartData", JSON.stringify(cartData));
		}
	}, [cartData]);

	useEffect(() => {
		if (isLoggedIn) {
			getActiveUser()
				.then((data) => {
					setActiveUser(data);
				})
				.catch(console.error);
		}
	}, [isLoggedIn]);

	useEffect(() => {
		let total = 0;
		if (activeUser) {
			fetchAPI(BASE_URL + `/orders/cart/${activeUser.id}`)
				.then((data) => {
					if (data.message) {
						if (localStorage.getItem("cartData")) {
							localStorage.removeItem("cartData");
							setCartData(data.openOrders[0]);
						}
						setOrderId(data.openOrders[0].id);
						return;
					}
					data.openOrdersWithProduct[0].map((product) => {
						let newPrice = product.price / 100;
						product.price = newPrice;
						total = newPrice * product.quantity + total;
					});
					if (localStorage.getItem("cartData")) {
						localStorage.removeItem("cartData");
					}
					setCartData(data.openOrdersWithProduct[0]);
					setOrderId(data.openOrders[0]?.id);
					setGrandTotal(total);
				})
				.catch(console.error);
		}
	}, [activeUser]);

	useEffect(() => {
		fetchAPI(BASE_URL + "/users")
			.then((data) => {
				setUsersList(data);
			})
			.catch(console.error);
	}, []);

	return (
		<>
			<Header
				activeUser={activeUser}
				setActiveUser={setActiveUser}
				setIsLoggedIn={setIsLoggedIn}
				isLoggedIn={isLoggedIn}
				history={history}
				clearToken={clearToken}
				setCartData={setCartData}
				cartData={cartData}
			/>
			<main className="wrapper">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path={`/products/:productId`}>
						<SingleProduct
							activeProduct={activeProduct}
							setActiveProduct={setActiveProduct}
							history={history}
							count={count}
							setCount={setCount}
							cartData={cartData}
							setCartData={setCartData}
							orderId={orderId}
							activeUser={activeUser}
							setProductList={setProductList}
						/>
					</Route>
					<Route exact path="/success">
						<SuccessMessage activeUser={activeUser} history={history} />
					</Route>
					<Route exact path="/failure">
						<Failure activeUser={activeUser} history={history} />
					</Route>

					<Route path="/payment">
						<Payment
							productList={productList}
							setProductList={setProductList}
							cartData={cartData}
							setCartData={setCartData}
							isLoggedIn={isLoggedIn}
							grandTotal={grandTotal}
							setGrandTotal={setGrandTotal}
							orderId={orderId}
							activeUser={activeUser}
							history={history}
						/>
					</Route>
					<Route exact path="/products">
						<AllProducts
							productList={productList}
							history={history}
							setActiveProduct={setActiveProduct}
						/>
					</Route>
					<Route exact path="/updateProduct">
						<UpdateProduct
							activeUser={activeUser}
							activeProduct={activeProduct}
							history={history}
							setProductList={setProductList}
							setActiveProduct={setActiveProduct}
						/>
					</Route>
					<Route exact path="/findorders">
						<MultipleOrders activeUser={activeUser} history={history} />
					</Route>
					<Route exact path="/houseplants">
						<HousePlants
							productList={productList}
							setActiveProduct={setActiveProduct}
							history={history}
						/>
					</Route>
					<Route exact path="/floweringplants">
						<FloweringPlants
							productList={productList}
							setActiveProduct={setActiveProduct}
							history={history}
						/>
					</Route>
					<Route exact path="/bonsaiplants">
						<BonsaiPlants
							productList={productList}
							setActiveProduct={setActiveProduct}
							history={history}
						/>
					</Route>
					<Route exact path="/login">
						<Login
							setIsLoggedIn={setIsLoggedIn}
							history={history}
							setCartData={setCartData}
							setOrderId={setOrderId}
						/>
					</Route>
					<Route exact path="/register">
						<Register setIsLoggedIn={setIsLoggedIn} />
					</Route>
					<Route exact path="/users">
						<Users
							usersList={usersList}
							history={history}
							activeUser={activeUser}
							setUserToUpdate={setUserToUpdate}
						/>
					</Route>
					<Route exact path="/users/me">
						<SingleUser activeUser={activeUser} />
					</Route>
					<Route path="/cart">
						<Cart
							cartData={cartData}
							setCartData={setCartData}
							isLoggedIn={isLoggedIn}
							grandTotal={grandTotal}
							setGrandTotal={setGrandTotal}
							orderId={orderId}
							activeUser={activeUser}
							history={history}
						/>
					</Route>
					<Route exact path="/adminportal">
						<AdminPortal activeUser={activeUser} />
					</Route>
					<Route exact path="/addnewproduct">
						<AddProduct
							activeUser={activeUser}
							history={history}
							setProductList={setProductList}
						/>
					</Route>
					<Route exact path="/users/add">
						<AddSingleUser
							history={history}
							setUsersList={setUsersList}
							activeUser={activeUser}
						/>
					</Route>
					<Route exact path={`/users/:userId`}>
						<SingleUserAdmin
							userToUpdate={userToUpdate}
							activeUser={activeUser}
							history={history}
							setUsersList={setUsersList}
						/>
					</Route>
					<Route exact path="/editmyinfo">
						<SingleUserUpdate
							history={history}
							activeUser={activeUser}
							setUsersList={setUsersList}
							setActiveUser={setActiveUser}
						/>
					</Route>
					<Route path="/payment">
						<Payment
							productList={productList}
							setProductList={setProductList}
							setUsersList={setUsersList}
							activeUser={activeUser}
						/>
					</Route>
				</Switch>
			</main>
		</>
	);
};

export default App;
