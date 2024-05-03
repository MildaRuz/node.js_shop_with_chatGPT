const express = require('express');
const app = express();
const port = 3000;

let shops = [
  { id: 1, name: 'Shop A', location: 'Location A' },
  { id: 2, name: 'Shop B', location: 'Location B' },
];

let items = [
  { id: 1, name: 'Item A', price: 10, shopId: 1 },
  { id: 2, name: 'Item B', price: 20, shopId: 1 },
  { id: 3, name: 'Item C', price: 15, shopId: 2 },
  { id: 4, name: 'Item D', price: 25, shopId: 1 },
  { id: 5, name: 'Item E', price: 35, shopId: 2 },
  { id: 6, name: 'Item F', price: 15, shopId: 2 },
];

// Middleware
app.use(express.json());

// Get all shops
app.get('/shops', (req, res) => {
  res.json(shops);
});

// Get a shop by ID
app.get('/shops/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const shop = shops.find((shop) => shop.id === id);
  if (!shop) {
    res.status(404).send('Shop not found');
    return;
  }
  res.json(shop);
});

// Get all items for a shop
app.get('/shops/:shopId/items', (req, res) => {
  const shopId = parseInt(req.params.shopId);
  const shopItems = items.filter((item) => item.shopId === shopId);
  res.json(shopItems);
});

// Get an item by ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((item) => item.id === id);
  if (!item) {
    res.status(404).send('Item not found');
    return;
  }
  res.json(item);
});

// Create a new shop
app.post('/shops', (req, res) => {
  const { name, location } = req.body;
  const id = shops.length + 1;
  const newShop = { id, name, location };
  shops.push(newShop);
  res.status(201).json(newShop);
});

// Create a new item
app.post('/items', (req, res) => {
  const { name, price, shopId } = req.body;
  const id = items.length + 1;
  const newItem = { id, name, price, shopId };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Delete a shop by ID
app.delete('/shops/:id', (req, res) => {
  const id = parseInt(req.params.id);
  shops = shops.filter((shop) => shop.id !== id);
  res.status(204).send();
});

// Update a shop by ID
app.put('/shops/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, location } = req.body;
  const index = shops.findIndex((shop) => shop.id === id);
  if (index !== -1) {
    shops[index] = { id, name, location };
    res.status(200).json(shops[index]);
  } else {
    res.status(404).send('Shop not found');
  }
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter((item) => item.id !== id);
  res.status(200).send('Item deleted successfully');
});

// Update an item by ID
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, shopId } = req.body;
  const index = items.findIndex((item) => item.id === id);
  if (index !== -1) {
    items[index] = { id, name, price, shopId };
    res.status(200).json(items[index]);
  } else {
    res.status(404).send('Item not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
