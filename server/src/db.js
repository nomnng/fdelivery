const Database = require('better-sqlite3');
const db = new Database('database.db');

const insertShop = (name) => {
	const s = db.prepare('INSERT INTO shops (name) VALUES (?)');
	s.run(name);
};

const insertFlower = ({name, type, price, dateAdded, shopId, imageUrl}) => {
	const s = db.prepare(`
		INSERT INTO flowers (
			name, type, price, date_added, shop_id, image_url
		) VALUES (?, ?, ?, ?, ?, ?)
	`);
	s.run(name, type, price, dateAdded, shopId, imageUrl);
};

const getShops = () => {
	const s = db.prepare(`SELECT * FROM shops`);
	return s.all();
};

const getShopFlowers = (shopId) => {
	const s = db.prepare(`SELECT * FROM flowers WHERE shop_id = ?`);
	return s.all(shopId);
};

const getFlowersById = (flowerIds) => {
	if (!Array.isArray(flowerIds) || flowerIds.length === 0) {
		return [];
	}

    const placeholders = flowerIds.map(() => '?').join(', ');
    const query = `SELECT * FROM flowers WHERE id IN (${placeholders})`;

	const s = db.prepare(query);
	return s.all(...flowerIds);
};

const insertOrder = ({name, email, phone, address, cart}) => {
	const s = db.prepare(`
		INSERT INTO orders (
			name, email, phone, address, cart
		) VALUES (?, ?, ?, ?, ?)
	`);
	s.run(name, email, phone, address, cart);
};

module.exports = {
	db,
	insertShop,
	insertFlower,
	getShops,
	getShopFlowers,
	getFlowersById,
	insertOrder,
};