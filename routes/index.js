const apiRouter = require("express").Router();
const bcrypt = require("bcrypt");

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
  getOrderProductsByOrderId,
  getUser,
} = require("../db/index");

require("dotenv").config();
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

// const requireUser = (req, res, next) => {
// 	if (!req.user) {
// 		next({
// 			name: "MissingUserError",
// 			message: "You must be logged in to perform this action",
// 		});
// 	}

// 	next();
// };

// const requireActiveUser = (req, res, next) => {
// 	if (!req.user.active) {
// 		next({
// 			name: "UserNotActive",
// 			message: "You must be active to perform this action",
// 		});
// 	}
// 	next();
// };

apiRouter.get("/", async (req, res, next) => {
	console.log("hitting api");
	try {
		console.log("inside main page try");
		res.send("Plant Gallerie Main Page");
	} catch (error) {
		next(error);
	}
});

apiRouter.get("/users", async (req, res, next) => {
	try {
		const allUsers = await getAllUsers();
		console.log("api try users", allUsers);
		res.send(allUsers);
	} catch (error) {
		next(error);
	}
});

apiRouter.post("/login", async (req, res, next) => {
	const { username, password } = req.body;
	console.log("this is req.body", req.body);

	if (!username || !password) {
		throw "u need user name and password";
	}

	try {
		const user = await getUser(req.body);
		console.log("this is user", user);

		if (user && user.password == password) {
			// console.log('users token is ', token)
			await bcrypt.compare(password, user.password);

			const token = jwt.sign(
				{
					id: user.id,
					password: user.password,
					username: user.username,
				},
				`${process.env.JWT_SECRET}`,
				{
					expiresIn: "6w",
				}
			);
			res.send({
				user: user,
				token: token,
			});
		} else {
			throw "u need user name and password again";
		}
	} catch (error) {
		throw error;
	}
});

apiRouter.post("/register", async (req, res, next) => {
	console.log("here in register");
	const { firstName, lastName, email, imageURL, username, password } = req.body;

	console.log("here in register 1");
	console.log(req.body, "this is body");
	try {
		console.log("here in register 6");
		const _user = await getUserByUsername(username);
		console.log(_user, "this is user");
		if (_user) {
			console.log("inside user try");
			next({
				name: "UserExistsError",
				message: "A user by that username already exists",
			});
		}
		console.log("here in register 7");
		const user = await createUser({
			firstName,
			lastName,
			email,
			imageURL,
			username,
			password,
		});

		res.send({
			user: user,
		});
	} catch (error) {
		next(error);
	}
});

apiRouter.get("/users/me", async (req, res) => {
	console.log("this is username", req.body);
	try {
		const user = await getUserByUsername(req.body);

		if (user) {
			jwt.verify({
				id: user.id,
				password: user.password,
				username: user.username,
			});
		}
		res.send(user);
	} catch (error) {
		throw error;
	}
});

apiRouter.get("/users/:id", async (req, res, next) => {
	console.log("getting user by id");
	try {
		console.log("getting user by id inside try");
		const oneUser = await getUserById(req.params.id);
		console.log("user is", oneUser);
		res.send(oneUser);
	} catch (error) {
		next(error);
	}
});

apiRouter.get("/products", async (req, res, next) => {
	try {
		console.log("inside try for getting all products");
		const allProducts = await getAllProducts();
		res.send(allProducts);
	} catch (error) {
		next(error);
	}
});
apiRouter.get('/products/:productId', async (req, res, next) => {
  // const id = req.body.productId
   //console.log('the product id is', id)
   try {
     const {productId} = req.params
     console.log('inside the try for getting product by ID')
     const requestedProduct = await getProductById(productId)
     res.send(requestedProduct)
     next()
   } catch (error) {
     next(error)
   }
 })
apiRouter.post("/createproduct", async (req, res, next) => {
	const { name, description, price, imageURL, inStock, category } = req.body;
	console.log("The req.body is", req.body);
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

apiRouter.get('/orders/cart', async (req,res,next) => {
  try {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    
    if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    if (token){
    const { id } = jwt.verify(token, `${process.env.JWT_SECRET}`);
      if (id) {
        const user = await getUserById(id)
        if (user){
            const orders = await getCartByUser({id})
            res.send( orders )
        } else {
            res.send({message:'You must be logged in to view your cart'})
        }
      }
    }
}
} catch (error) {
    console.error(error)
}
});

apiRouter.get("/orders/:orderId", async (req, res) => {
	try {
		console.log("getting one order");
		const getOneOrder = await getOrderById(req.params.id);
		console.log("this is one order", getOneOrder);

		res.send(getOneOrder);
	} catch (error) {
		throw error;
	}
});

apiRouter.post("/orders", async (req, res, next) => {
	console.log("hitting create order");

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
		console.log(allOrders);
		res.send(allOrders);
	} catch (error) {
		throw error;
	}
});

apiRouter.get("/users/:userId/orders", async (req, res) => {
	console.log("inside getting products by id");
	console.log("this is id", req.params.userId);
	try {
		const orders = await getOrdersByProduct(req.params.userId);
		console.log(orders);
		res.send(orders);
	} catch (error) {
		throw error;
	}
});

module.exports = apiRouter;