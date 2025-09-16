const { db, insertShop, insertFlower } = require('./db');


db.exec(`
	DROP TABLE IF EXISTS flowers;
	DROP TABLE IF EXISTS shops;
	DROP TABLE IF EXISTS orders;

    CREATE TABLE shops (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );

    CREATE TABLE flowers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        price REAL NOT NULL,
        date_added TEXT NOT NULL DEFAULT (date('now')),
        image_url TEXT NOT NULL,
        shop_id INTEGER NOT NULL,
        FOREIGN KEY (shop_id) REFERENCES shops(id)
    );

	CREATE TABLE orders (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		email TEXT NOT NULL,
		phone TEXT NOT NULL,
		address TEXT NOT NULL,
		cart TEXT NOT NULL,
		created_at TEXT DEFAULT (datetime('now'))
	);
`);

const formatSQLiteDateTime = (date) => {
	return date.toISOString().replace('T', ' ').substring(0, 19);
};

const generateImageUrl = (name) => `${name.toLowerCase().replace(" ", "_")}.png`;

insertShop("MyShop1");
insertShop("MyShop2");
insertShop("MyShop3");

const flowerNames = ["Lily", "Daisy", "Orchid", "Sunflower", "Lavender", "Peony"];

let date = new Date("2025-01-01");
flowerNames.forEach((name, index) => {
	let imageUrl = generateImageUrl(name);
	let type = "flower";

	date.setDate(1 + index);

	insertFlower({
		name,
		imageUrl,
		type,
		price: 15 + index * 1.25,
		dateAdded: formatSQLiteDateTime(date),
		shopId: 1,
	});

	insertFlower({
		name,
		imageUrl,
		type,
		price: 15 + index * 2.5,
		dateAdded: formatSQLiteDateTime(date),
		shopId: 2,
	});

	insertFlower({
		name,
		imageUrl,
		type,
		price: 20 + index * 1,
		dateAdded: formatSQLiteDateTime(date),
		shopId: 3,
	});
});


const bouquetNames = ["Rose bouquet", "Lily bouquet", "Orchid bouquet"];

date.setMonth(2);
bouquetNames.forEach((name, index) => {
	let imageUrl = generateImageUrl(name);
	let type = "bouquet";

	date.setDate(1 + index);

	insertFlower({
		name,
		imageUrl,
		type,
		price: 50 + index * 8,
		dateAdded: formatSQLiteDateTime(date),
		shopId: 1,
	});

	insertFlower({
		name,
		imageUrl,
		type,
		price: 40 + index * 10,
		dateAdded: formatSQLiteDateTime(date),
		shopId: 2,
	});

	insertFlower({
		name,
		imageUrl,
		type,
		price: 60 + index * 5,
		dateAdded: formatSQLiteDateTime(date),
		shopId: 3,
	});
});

