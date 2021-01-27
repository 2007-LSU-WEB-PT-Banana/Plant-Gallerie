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
		throw error;
	}
};

//this function is working - do not edit this code!
const getAllUsers = async () => {
	try {
		const { rows: allUsers } = await client.query(`
    SELECT * 
    FROM users;
 `);
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

		return user;
	} catch (error) {
		throw error;
	}
};

//this function is working - do not edit!
const getUserById = async (id) => {
	try {
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
		delete user.password;
		return user;
	} catch (error) {
		throw error;
	}
};

//this function is working - do not edit!
const updateUser = async (
	userId,
	firstName,
	lastName,
	email,
	username,
	isAdmin
) => {
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
    "isAdmin"=$5
    WHERE id=$6
    RETURNING *;
    `,
			[firstName, lastName, email, username, isAdmin, userId]
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

		return product;
	} catch (error) {
		throw error;
	}
};

//this function is working - do not edit this code!
const createOrder = async ({ status, userId, products }) => {
	const datePlaced = new Date();

	try {
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

//this function works - do not edit code!
const getCartByUser = async (userId) => {
	try {
		const { rows: orders } = await client.query(
			`
    SELECT *
    FROM orders
    WHERE "userId"=$1 AND status='created';
    `,
			[userId]
		);

		const openOrders = await Promise.all(
			orders.map((order) => getOrderById(order.id))
		);

		return { openOrders: orders, openOrdersWithProduct: openOrders };
	} catch (error) {
		throw error;
	}
};

//this function is working - do not edit this code!
const createOrderProducts = async ({ productId, orderId, price, quantity }) => {
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
		const allProducts = ordersIds.map((order) => {
			return getOrdersByUser(order.id);
		});
		return allProducts;
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

//this function first deletes the order_products where the order.status is not "completed"
//then it removes the reference to the productId for the order_products that remain
//then it deletes the product
const deleteOrderProductsAndProduct = async (productId) => {
	try {
		const { rows: orderProducts } = await client.query(
			`
      DELETE
      FROM order_products
      WHERE order_products."productId"=$1
      AND order_products."orderId"
      IN (SELECT orders.id FROM orders WHERE orders.status!='completed');
    `,
			[productId]
		);

		const { rows: remainingOrderProducts } = await client.query(
			`
      UPDATE order_products
      SET "productId"=null
      WHERE "productId"=$1;
      `,
			[productId]
		);

		const { rows: product } = await client.query(
			`
      DELETE
      FROM products
      WHERE products.id=$1
      `,
			[productId]
		);

		return {
			message:
				"The product has been deleted from the system and all associated open or cancelled orders.",
		};
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

async function updateProduct(productId, fields = {}) {
	console.log("beginning update product");
	const setString = Object.keys(fields)
		.map((key, index) => `"${key}"=$${index + 1}`)
		.join(", ");

	console.log("the set string is", setString);
	try {
		const { rows: product } = await client.query(
			`
      UPDATE products
      SET ${setString}
      WHERE products.id=${productId}
    `,
			Object.values(fields)
		);

		return product;
	} catch (error) {
		throw error;
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
	deleteOrderProductsAndProduct,
	updateUser,
	updateProduct,
};
