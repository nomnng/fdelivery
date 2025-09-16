const express = require("express");
const path = require("path");
const { getShops, getShopFlowers, getFlowersById, insertOrder } = require("./db");

const app = express();
const port = 30001;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/get_shops', (req, res) => {
    res.json(getShops());
});

app.post('/api/get_flowers', (req, res) => {
    const { shop_id } = req.body;
    res.json(getShopFlowers(shop_id));
});

app.post('/api/get_flowers_by_id', (req, res) => {
    const { flower_ids } = req.body;
    res.json(getFlowersById(flower_ids));
});

app.post('/api/create_order', (req, res) => {
    const { name, email, phone, address, cart } = req.body;
    insertOrder({name, email, phone, address, cart});
    res.json({status: "OK"});
});


app.get('*url', (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});