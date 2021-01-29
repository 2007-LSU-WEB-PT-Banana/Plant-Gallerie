// import { v4 as uuid_v4 } from 'uuid'

const apiRouter = require('express').Router()

const bcrypt = require('bcrypt')
// const { uuid } = require('uuidv4')
const { v4: uuid_v4 } = require('uuid')

const {
	createProduct,
	getProductById,
	getAllProducts,
	createUser,
	getAllUsers,
	getUserById,
	getUserByUsername,
	createOrder,
	getOrdersByProduct,
	getAllOrders,
	getOrderById,
	getCartByUser,
	getOrderProductsById,
	getOrdersByUser,
	getUser,
	addProductsToOrder,
	updateOrderProduct,
	deleteOrderProductsAndProduct,
	updateUser,
	updateProduct,
	destroyOrderProduct,
	updateOrder,
	cancelOrder,
	completeOrder,
	getOrderByORDERID,
} = require("../db/index");

require("dotenv").config();
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const { request } = require("express");
const stripe = require("stripe")(`${process.env.REACT_APP_MYSKEY}`);

const requireUser = (req, res, next) => {
  if (!req.user) {
    next({
      name: 'MissingUserError',
      message: 'You must be logged in to perform this action',
    })
  }

  next()
}

const requireActiveUser = (req, res, next) => {
	if (!req.user.active) {
		next({
			name: "UserNotActive",
			message: "You must be active to perform this action",
		});
	}
	next();
};

apiRouter.get("/", async (req, res, next) => {
	try {
		res.send("Plant Gallerie Main Page");
	} catch (error) {
		next(error);
	}
});

apiRouter.get("/users", async (req, res, next) => {
	try {
		const allUsers = await getAllUsers();
		res.send(allUsers);
	} catch (error) {
		next(error);
	}
});

apiRouter.post("/login", async (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		throw "Please enter a username and password";
	}

	try {
		const user = await getUser(req.body);

		if (user && user.password == password) {
			await bcrypt.compare(password, user.password);

			const token = jwt.sign(
				{
					id: user.id,
					username: user.username,
				},
				`${process.env.JWT_SECRET}`,
				{
					expiresIn: "6w",
				}
			);

			delete user.password;

			res.send({
				user: user,
				token: token,
			});
		} else {
			throw "Please re-enter your username and password";
		}
	} catch (error) {
		throw error;
	}
});

//this route works - do not edit this code!
apiRouter.post("/register", async (req, res, next) => {
	const {
		firstName,
		lastName,
		email,
		imageURL,
		username,
		password,
		isAdmin,
	} = req.body;

	try {
		const _user = await getUserByUsername(username);
		if (_user) {
			next({
				name: "UserExistsError",
				message: "A user by that username already exists",
			});
		}
		const user = await createUser({
			firstName,
			lastName,
			imageURL,
			email,
			username,
			password,
		});

		if (user.password < 8) {
			throw "Password should 8 or more characters";
		}
		delete user.password;

		await createOrder({ status: "created", userId: user.id, products: [] });

		res.send({
			user: user,
		});
	} catch (error) {
		next(error);
	}
});

apiRouter.get("/users/me", async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decoded = jwt.decode(token, `${process.env.JWT_SECRET}`);
		req.userData = decoded;
		const userId = req.userData.id;
		const user = await getUserById(userId);
		res.send({ user });
	} catch (error) {
		next(error);
	}
});

apiRouter.get("/users/:id", async (req, res, next) => {
	try {
		const oneUser = await getUserById(req.params.id);
		res.send(oneUser);
	} catch (error) {
		next(error);
	}
});

apiRouter.patch("/users/:userId", async (req, res, next) => {
	const { adminId, firstName, lastName, email, username, isAdmin } = req.body;
	//the adminID needs to be in the body so we can ensure the updater is an admin
	try {
		const requestor = await getUserById(adminId);

		if (requestor.isAdmin) {
			const completedUpdate = await updateUser(
				req.params.userId,
				firstName,
				lastName,
				email,
				username,
				isAdmin
			);
			res.send(completedUpdate);
		} else {
			res.send({
				message: "You must be an administrator to perform this function",
			});
		}
	} catch (error) {
		throw error;
	}
});

apiRouter.get("/products/:id", async (req, res, next) => {
	const id = req.params.id;
	try {
		const requestedProduct = await getProductById(id);
		res.send(requestedProduct);
	} catch (error) {
		next(error);
	}
});

apiRouter.post("/createproduct", async (req, res, next) => {
	const { name, description, price, imageURL, inStock, category } = req.body;
	try {
		const newProduct = await createProduct({
			name,
			description,
			price,
			imageURL,
			inStock,
			category,
		});
		res.send(newProduct);
	} catch (error) {
		throw error;
	}
});

apiRouter.get("/products", async (req, res, next) => {
	try {
		const allProducts = await getAllProducts();
		res.send(allProducts);
	} catch (error) {
		next(error);
	}
});

apiRouter.get("/products/:productId", async (req, res, next) => {
	const id = req.body.productId;
	try {
		const requestedProduct = await getProductById(id);
		res.send(requestedProduct);
	} catch (error) {
		next(error);
	}
});

//this route works - do not edit this code!
apiRouter.get("/orders/cart/:userId", async (req, res, next) => {
	try {
		const user = await getUserById(req.params.userId);
		if (user) {
			const userOrders = await getCartByUser(user.id);
			res.send(userOrders);
		} else {
			res.send({ message: "there are no orders here" });
		}
	} catch (error) {
		throw error;
	}
});

//this route works - do not edit this code!
apiRouter.post("/orders/:orderId/products", async (req, res, next) => {
	const productList = [req.body];

	try {
		const changedOrder = await addProductsToOrder(
			req.params.orderId,
			productList
		);
		res.send(changedOrder);
	} catch (error) {
		throw error;
	}
});

apiRouter.patch("/products/:productId", async (req, res, next) => {
	const product = req.params.productId;

	const {
		adminId,
		name,
		description,
		price,
		inStock,
		category,
		imageURL,
	} = req.body;

	const fields = {
		name: name,
		description: description,
		price: price,
		inStock: inStock,
		category: category,
		imageURL: imageURL,
	};

	if (adminId && name && description && price && category && imageURL) {
		try {
			const user = await getUserById(adminId);

			if (user.isAdmin) {
				const updatedProduct = await updateProduct(product, fields);

				res.send(updatedProduct);
			} else {
				res.send({ message: "You must be an admin to perform this function." });
			}
		} catch (error) {
			throw error;
		}
	} else {
		res.send({ message: "You must supply all the required fields." });
	}
});

apiRouter.delete("/products/:productId", async (req, res, next) => {
	try {
		const user = await getUserById(req.body.id);

		if (user.isAdmin) {
			const deletedConfirmation = await deleteOrderProductsAndProduct(
				req.params.productId
			);

			res.send(deletedConfirmation);
		} else {
			res.send({ message: "You must be an admin to perform this function." });
		}
	} catch (error) {
		throw error;
	}
});

apiRouter.delete("/order_products/:orderId", async (req, res, next) => {
	//this will be written to remove one product from an existing order with status 'created'
	try {
		const changedOrder = await destroyOrderProduct(
			req.body.productId,
			req.params.orderId
		);
		res.send(changedOrder);
	} catch (error) {
		throw error;
	}
});

//this route works - do not edit this code!
apiRouter.patch("/order_products/:orderId", async (req, res, next) => {
	const { productId, price, quantity } = req.body;
	try {
		const updatedOrder = await updateOrderProduct(req.params.orderId, {
			productId,
			price,
			quantity,
		});
		res.send(updatedOrder);
	} catch (error) {
		throw error;
	}
});

apiRouter.get("/orders/:orderId", async (req, res) => {
	try {
		const getOneOrder = await getOrderById(req.params.orderId);
		res.send(getOneOrder);
	} catch (error) {
		throw error;
	}
});

apiRouter.post("/orders", async (req, res, next) => {
	try {
		const newOrder = await createOrder(req.body);
		res.send(newOrder);
	} catch (error) {
		next(error);
	}
});

apiRouter.get("/orders", async (req, res) => {
	try {
		const allOrders = await getAllOrders();
		res.send(allOrders);
	} catch (error) {
		throw error;
	}
});

apiRouter.get("/users/:userId/orders", async (req, res) => {
	try {
		//I think this should be getOrdersByUserId since you're passing in the UserID here
		//const orders = await getOrdersByProduct(req.params.userId);
		const orders = await getOrdersByUser(req.params.userId);
		res.send(orders);
	} catch (error) {
		throw error;
	}
});

apiRouter.post("/payment", async (req, res) => {
	try {
		const { product, token } = req.body;
		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id,
		});

		const idempotencyKey = uuid();
		const charge = await stripe.charges.create(
			{
				amount: product.price * 100,
				currency: "usd",
				customer: customer.id,
				receipt_email: token.email,
				description: `Purchased the ${product.productName}`,
				shipping: {
					name: token.card.name,
					address: {
						line1: token.card.address_line1,
						line2: token.card.address_line2,
						city: token.card.address_city,
						country: token.card.address_country,
						postal_code: token.card.address_zip,
					},
				},
			},
			{
				idempotencyKey,
			}
		);

		res.json({
			status: "success",
		});
	} catch (error) {
		throw error;
	}
});

apiRouter.delete("/order_products/:orderProductId", async (req, res, next) => {
	const { orderProductId } = req.params.orderProductId;

	try {
		const user = await getUserById(id);
		const userOrder = await getCartByUser(user);
		const orderProduct = await getOrderProductById(orderProductId);

		if (orderProduct.orderId === userOrder.id) {
			const deletedOrderProduct = await destroyOrderProduct(orderProduct.id);
			res.send(deletedOrderProduct);
		} else {
			res.send({ message: "You must be the owner of this order to delete it" });
		}
	} catch (error) {
		next(error);
	}
});
module.exports = apiRouter;
