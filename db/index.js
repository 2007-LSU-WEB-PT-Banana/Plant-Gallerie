// // Connect to DB
const { Client } = require("pg");
const bcrypt = require("bcrypt");
const { isUuid, uuid } = require("uuidv4");

const DB_NAME = "plantgallery";

const DB_URL =
	process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL, { username: "postgres" });

//this function is working - do not edit this code!
const createUser = async ({
	firstName,
	lastName,
	email,
	imageURL,
	username,
	password,
}) => {
	try {
		console.log("creating users");

		const {
			rows: [user],
		} = await client.query(
			`
    INSERT INTO users("firstName","lastName" ,email,"imageURL", username , password )
    VALUES($1,$2,$3,$4,$5,$6)
    RETURNING *; 
    `,
			[firstName, lastName, email, imageURL, username, password]
		);

		const hashPassword = await bcrypt.hash(user.password, 5);

		user.password = hashPassword;

		return user;
	} catch (error) {
		console.log("cant create user");
		throw error;
	}
};

//this function is working - do not edit this code!
const getAllUsers = async () => {
	console.log("users live here");
	try {
		const { rows: allUsers } = await client.query(`
    SELECT * 
    FROM users;
 `);
		console.log("these are users", allUsers);
		allUsers.map((user) => {
			return delete user.password;
		});
		return allUsers;
	} catch (error) {
		throw error;
	}
};

//this function is working - do not edit this code!
const getUser = async ({ username, password }) => {
	try {
		console.log("inside get user");
		const {
			rows: [user],
		} = await client.query(
			`
    SELECT username, password,id
    FROM users
    WHERE username=$1 AND password=$2;
    `,
			[username, password]
		);

		console.log("this is username", username);
		console.log("this is password", password);
		console.log("this is user ", user.id);

		return user;
	} catch (error) {
		throw error;
	}
};

const getUserById = async (id) => {
	try {
		console.log("inside try for getUserById");
		const {
			rows: [user],
		} = await client.query(
			`
    SELECT *
    FROM users
    WHERE id=$1;
    `,
			[id]
		);
		console.log("made it through the try");
		console.log("the user is", user);
		delete user.password;
		return user;
	} catch (error) {
		throw error;
	}
};

const updateUser = async (
	userId,
	firstName,
	lastName,
	email,
	username,
	imageURL,
	isAdmin
) => {
	console.log(
		"the passed in info is:",
		userId,
		firstName,
		lastName,
		email,
		username,
		imageURL,
		isAdmin
	);
	try {
		const {
			rows: [updatedUser],
		} = await client.query(
			`
    UPDATE users
    SET "firstName"=$1,
    "lastName"=$2,
    email=$3,
    username=$4,
    "imageURL"=$5,
    "isAdmin"=$6
    WHERE id=$7
    RETURNING *;
    `,
			[firstName, lastName, email, username, imageURL, isAdmin, userId]
		);

		return updatedUser;
	} catch (error) {
		throw error;
	}
};

//this function is working - do not edit this code!
const getUserByUsername = async ({ username }) => {
	try {
		const {
			rows: [user],
		} = await client.query(
			`
    SELECT *
    FROM users 
    WHERE username=$1;
    `,
			[username]
		);
		return user;
	} catch (error) {
		throw error;
	}
};

//this function is working - do not edit this code!
const createProduct = async ({
	name,
	description,
	price,
	imageURL,
	inStock,
	category,
}) => {
	try {
		const {
			rows: [product],
		} = await client.query(
			`
  INSERT INTO products (name, description, price,"imageURL", "inStock",category)
  VALUES($1,$2,$3,$4,$5,$6)
  RETURNING *;
  `,
			[name, description, price, imageURL, inStock, category]
		);

		return product;
	} catch (error) {
		throw error;
	}
};

const getAllProducts = async () => {
	try {
		const { rows: allProducts } = await client.query(`
    SELECT *
    FROM products;
    `);
		return allProducts;
	} catch (error) {
		throw error;
	}
};

const getProductById = async (id) => {
	try {
		const {
			rows: [product],
		} = await client.query(
			`
    SELECT * 
    FROM products
    WHERE id=$1;
    `,
			[productId]
		);

		if (!product) {
			throw {
				message: "Could not find a product with that name/id",
			};
		}

		console.log("product is here", product);

		return product;
	} catch (error) {
		throw error;
	}
};

//this function is working - do not edit this code!
const createOrder = async ({ status, userId, products }) => {
	datePlaced = new Date();

	try {
		console.log("creating order");
		const {
			rows: [order],
		} = await client.query(
			`
      INSERT INTO orders(status,"userId", "datePlaced")
      VALUES($1, $2, $3)
      RETURNING *;
    `,
			[status, userId, datePlaced]
		);

		const newOrder = await addProductsToOrder(order.id, products);

		return newOrder;
	} catch (error) {
		throw error;
	}
};

const getAllOrders = async () => {
	try {
		const { rows: allOrders } = await client.query(`
    SELECT *
    FROM orders;
    `);
		const orders = await Promise.all(
			allOrders.map((order) => {
				return getOrdersByProduct(order.id);
			})
		);

		return orders;
	} catch (error) {
		throw error;
	}
};

const getOrdersByUser = async (userId) => {
	try {
		const { rows: OrderIds } = await client.query(`
    SELECT id
    FROM orders
    WHERE "userId"=${userId};
    `);
		const orders = await Promise.all(
			OrderIds.map((order) => getOrderById(order.id))
		);
		return orders;
	} catch (error) {
		throw error;
	}
};

//this function is working - do not edit this code!
const getOrderById = async (orderId) => {
	try {
		console.log("inside get order by id.  the id is:", orderId);
		const { rows: order } = await client.query(
			`
      SELECT *
      FROM orders
      JOIN order_products ON order_products."orderId"=orders.id
      JOIN products ON products.id=order_products."productId"
      WHERE "orderId"=$1;    
      `,
			[orderId]
		);
		console.log("logging inside getorderbyid");
		console.log("the order is", order);
		// if (order === []) {
		// 	const { rows: emptyOrder } = await client.query(
		// 		`
		//     SELECT *
		//     FROM orders
		//     WHERE "orderId"=$1;
		//     `,
		// 		[orderId]
		// 	);
		// 	return emptyOrder;
		// }
		if (!order) {
			throw {
				name: "OrderNotFoundError",
				message: "Could not find an order with that order ID",
			};
		} else {
			return order;
		}
	} catch (error) {
		throw error;
	}
};

const getOrderProductsById = async (orderId) => {
	try {
		const { rows: products } = await client.query(
			`
      SELECT *
      FROM order_products
      WHERE "orderId"=$1;
    `,
			orderId
		);

		return products;
	} catch (error) {
		throw error;
	}
};

//this function works - do not edit this code!
// const getCartByUser = async (userId) => {
// 	try {
// 		const { rows: userCart } = await client.query(
// 			`
//     SELECT *
//     FROM orders
//     JOIN products ON
//     WHERE "userId"=$1 AND status='created';
//     `,
// 			[userId]
// 		);
// 		const orders = await Promise.all(
// 			userCart.map((order) => getOrderById(order.id))
// 		);
// 		return orders;
// 	} catch (error) {
// 		throw error;
// 	}
// };

//this function works - do not edit code!
const getCartByUser = async (userId) => {
	console.log("beginning get cart by user");
	try {
		const { rows: orders } = await client.query(
			`
    SELECT *
    FROM orders
    WHERE "userId"=$1 AND status='created';
    `,
			[userId]
		);
		console.log("the orders are", orders);

		const openOrders = await Promise.all(
			orders.map((order) => getOrderById(order.id))
		);
		console.log("the Open Orders from getCartByUser are", openOrders);
		return { openOrders: orders, openOrdersWithProduct: openOrders };
	} catch (error) {
		throw error;
	}
};

//this function is working - do not edit this code!
const createOrderProducts = async ({ productId, orderId, price, quantity }) => {
	console.log("productId", productId);
	console.log("orderId", orderId);
	console.log("price", price);
	console.log("quantity", quantity);
	try {
		const {
			rows: [orderProduct],
		} = await client.query(
			`
      INSERT INTO order_products("productId","orderId", price, quantity)
      VALUES($1,$2,$3,$4)
      RETURNING *;
    `,
			[productId, orderId, price, quantity]
		);
		console.log("order-products are:", orderProduct);
		return orderProduct;
	} catch (error) {
		throw error;
	}
};

//this function is working - do not edit this code!
const addProductsToOrder = async (orderId, productList) => {
	try {
		const createOrderProductsPromises = productList.map((product) =>
			createOrderProducts({
				productId: product.id,
				orderId,
				price: product.price,
				quantity: product.quantity,
			})
		);

		await Promise.all(createOrderProductsPromises);
		return await getOrderById(orderId);
	} catch (error) {
		throw error;
	}
};

const getOrdersByProduct = async (id) => {
	try {
		const { rows: order } = await client.query(
			`

      SELECT *
      FROM order_products
      JOIN orders ON order_products."orderId" = orders.id
      JOIN products ON order_products."productId"=$1;
    `,
			[id]
		);
		console.log("this is product id", ordersIds.productId);
		const allProducts = ordersIds.map((order) => {
			return getOrdersByUser(order.id);
		});
		return allProducts;
	} catch (error) {
		throw error;
	}
};

//i don't think this is going to work because this is selecting from
//order_products not orders.
const getOrderByProductId = async (id) => {
	try {
		const {
			rows: [orderProduct],
		} = await client.query(
			`
SELECT * 
FROM order_products
WHERE id=$1;
`,
			[id]
		);
		return orderProduct;
	} catch (error) {
		throw error;
	}
};

const getOrderProductByOrderId = async (orderId) => {
	try {
		const {
			rows: [orderProduct],
		} = await client.query(
			`
SELECT * 
FROM order_products
WHERE "orderId"=$1;
`,
			[orderId]
		);
		return orderProduct;
	} catch (error) {
		throw error;
	}
};

const addProductToOrder = async ({ orderId, productId, price, quantity }) => {
	try {
		const orderProduct = await getOrderProductByOrderId(id);

		if (orderProduct.length < 1) {
			const {
				rows: [productOrdered],
			} = await client.query(
				`
      INSERT INTO order_products ("productId", "orderId", price, quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
				[[productId, orderId, price, quantity]]
			);
			return productOrdered;
		} else {
			for (let i = 0; i < orderProduct.length; i++) {
				if (orderProduct[i].productId === productId) {
					const {
						rows: [productOrder],
					} = await client.query(
						`
                    UPDATE order_products SET (price, quantity) = 
                    ($1, $2) WHERE "productId" = $3 AND "orderId" = $4
                    RETURNING *
                `,
						[price, quantity, productId, orderId]
					);

					return productOrder;
				} else if (
					orderProduct[orderProducts.length - 1].productId !== productId &&
					i === orderProduct.length - 1
				) {
					const {
						rows: [productOrder],
					} = await client.query(
						`
          INSERT INTO order_products ("productId", "orderId", price, quantity)
          VALUES ($1, $2, $3, $4)
          RETURNING *`,
						[productId, orderId, price, quantity]
					);
					return productOrder;
				}
			}
		}
	} catch (error) {
		throw error;
	}
};

//this function works - do not edit this code!
const updateOrderProduct = async (orderId, { productId, price, quantity }) => {
	try {
		const originalOrderProduct = await getOrderProductsByOrderId(orderId);

		let index = originalOrderProduct.findIndex(
			(x) => x.productId === productId
		);
		let itemToUpdate = originalOrderProduct[index];
		itemToUpdate.price = price;
		itemToUpdate.quantity = quantity;

		const {
			rows: [orderProduct],
		} = await client.query(
			`
      UPDATE order_products
      SET price=$2,
      quantity=$3
      WHERE id=$1
      RETURNING *;
    `,
			[itemToUpdate.id, itemToUpdate.price, itemToUpdate.quantity]
		);

		const updatedOrder = await getOrderById(orderId);
		return updatedOrder;
	} catch (error) {
		throw error;
	}
};

const findOrderProductsToDelete = async (productId) => {
	console.log("beginning findOrderProductToDelete");
	try {
		const {
			rows: [orderProducts],
		} = await client.query(
			`
      SELECT order_products.id, "productId", "orderId", status
      FROM order_products, orders
      WHERE "productId"=$1
      RETURNING *;
    `,
			[productId]
		);
		console.log("the order_products are", orderProducts);
		const orders = await Promise.all(
			orderProducts.map((orderProduct) => {
				if (orderProduct.status !== completed) {
					destroyAllOrderProductsById(orderProduct.id);
				}
			})
		);
		return orders;
	} catch (error) {
		throw error;
	}
};

const destroyAllOrderProductsById = async (orderProductId) => {
	try {
		const {
			rows: [orderProduct],
		} = await client.query(
			`
      DELETE FROM order_products
      WHERE id=$1
      RETURNING *; 
    `,
			[orderProductId]
		);
		return { message: "Order Products have been deleted" };
	} catch (error) {
		throw error;
	}
};

const destroyOrderProduct = async (productId, orderId) => {
	console.log("the id is ", productId);
	try {
		const {
			rows: [orderProduct],
		} = await client.query(
			`
      DELETE FROM order_products
      WHERE "productId"=$1 AND "orderId"=$2
      RETURNING *
      `,
			[productId, orderId]
		);

		return await getOrderById(orderId);
	} catch (error) {
		throw error;
	}
};

//this function works - do not edit this code!
async function getOrderProductsByOrderId(orderId) {
	try {
		const { rows: orderProducts } = await client.query(
			`
          SELECT * FROM order_products
          WHERE "orderId" = $1
      `,
			[orderId]
		);
		return orderProducts;
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	client,
	createUser,
	getAllUsers,
	getUserById,
	getUserByUsername,
	createProduct,
	getProductById,
	getAllProducts,
	getCartByUser,
	createOrder,
	getOrdersByProduct,
	getAllOrders,
	getOrderById,
	getUser,
	getOrderProductsById,
	getOrdersByUser,
	addProductsToOrder,
	updateOrderProduct,
	destroyOrderProduct,
	findOrderProductsToDelete,
	updateUser,
};
