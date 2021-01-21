const apiRouter = require("express").Router();
const bcrypt = require("bcrypt");
const uuid = require("uuid/v4");

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

require('dotenv').config()
const jwt = require('jsonwebtoken')
const { token } = require('morgan')
const stripe = require('stripe')(`${process.env.mySKey}`)

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
      name: 'UserNotActive',
      message: 'You must be active to perform this action',
    })
  }
  next()
}

apiRouter.get('/', async (req, res, next) => {
  console.log('hitting api')
  try {
    console.log('inside main page try')
    res.send('Plant Gallerie Main Page')
  } catch (error) {
    next(error)
  }
})

apiRouter.get('/users', async (req, res, next) => {
  try {
    const allUsers = await getAllUsers()
    console.log('api try users', allUsers)
    res.send(allUsers)
  } catch (error) {
    next(error)
  }
})

apiRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  console.log('this is req.body', req.body)

  if (!username || !password) {
    throw 'u need user name and password'
  }

  try {
    const user = await getUser(req.body)

    console.log('this is users id insdie route', user.id)

    if (user && user.password == password) {
      await bcrypt.compare(password, user.password)

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        `${process.env.JWT_SECRET}`,
        {
          expiresIn: '6w',
        },
      )

      delete user.password
      res.send({
        user: user,
        token: token,
      })
    } else {
      throw 'u need user name and password again'
    }
  } catch (error) {
    throw error
  }
})

apiRouter.post('/register', async (req, res, next) => {
  console.log('here in register')

  const { firstName, lastName, email, imageURL, username, password } = req.body

  console.log('here in register 1')
  console.log(req.body, 'this is body')
  try {
    console.log('here in register 6')
    const _user = await getUserByUsername(username)
    console.log(_user, 'this is user')
    if (_user) {
      console.log('inside user try')
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists',
      })
    }
    console.log('here in register 7')
    const user = await createUser({
      firstName,
      lastName,
      email,
      imageURL,
      username,
      password,
    })

    if (user.password < 8) {
      throw 'Password should 8 or more characters'
    }

    delete user.password
    res.send({
      user: user,
    })
  } catch (error) {
    next(error)
  }
})

apiRouter.get('/users/me', async (req, res, next) => {
  console.log('inside users/me in database')
  try {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)

    const decoded = jwt.decode(token, `${process.env.JWT_SECRET}`)

    req.userData = decoded
    console.log('this is username', req.userData.username)
    console.log(req.userData)
    const userId = req.userData.id
    console.log(userId)

    const user = await getUserById(userId)
    console.log(user)
    res.send({ user })
  } catch (error) {
    next(error)
  }
})

apiRouter.get('/users/:id', async (req, res, next) => {
  console.log('getting user by id')
  try {
    console.log('getting user by id inside try')
    const oneUser = await getUserById(req.params.id)
    console.log('user is', oneUser)
    res.send(oneUser)
  } catch (error) {
    next(error)
  }
})



apiRouter.get("/products/:id", async (req, res, next) => {
	const id = req.params.id;
	try {
		console.log("inside the try for getting product by ID");
		const requestedProduct = await getProductById(id);
		res.send(requestedProduct);
	} catch (error) {
		next(error);
	}
});

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

apiRouter.get("/products", async (req, res, next) => {
	try {
		console.log("inside try for getting all products");
		const allProducts = await getAllProducts();
		res.send(allProducts);
	} catch (error) {
		next(error);
	}
});

apiRouter.get("/products/:productId", async (req, res, next) => {
	const id = req.body.productId;
	console.log("the product id is", id);
	try {
		console.log("inside the try for getting product by ID");
		const requestedProduct = await getProductById(id);
		res.send(requestedProduct);
	} catch (error) {
		next(error);
	}
});

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

//this route works - do not edit this code!
apiRouter.get("/orders/cart", async (req, res, next) => {
	try {
		const user = await getUserById(req.body.userId);

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

apiRouter.get("/orders/:orderId", async (req, res) => {
	try {
		console.log("getting one order");
		const getOneOrder = await getOrderById(req.body.id);
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

apiRouter.post("/payment", async (req, res) => {
	console.log(req.body);
	let error;
	let status;
	try {
		const { product, token } = req.body;
		console.log("product", product);
		console.log("this is price", product.price);
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
		console.log("charge", { charge });

		res.json({
			status: "success",
		});
	} catch (error) {
		throw error;
	}
});


apiRouter.post('/payment', async (req, res) => {
  console.log(req.body)

  try {
    const { product, token } = req.body
    console.log('product', product)
    console.log('this is price', product.price)
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    })

    const idempotencyKey = uuid()
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: 'usd',
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
      },
    )
    console.log('charge', { charge })

    res.json({
      status: 'success',
    })
  } catch (error) {
    throw error
  }
})

module.exports = apiRouter;
