import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, 'data', 'products.json');
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');

// Helper to read data
async function readData(file) {
    try {
        const data = await fs.readFile(file, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') return []; // Return empty array if file doesn't exist
        throw error;
    }
}

// Helper to ensure directory exists
async function ensureDirectoryExists(file) {
    const dir = path.dirname(file);
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

// Helper to write data
async function writeData(file, data) {
    await ensureDirectoryExists(file);
    await fs.writeFile(file, JSON.stringify(data, null, 2));
}

// Initialize data files if they don't exist
async function initData() {
    try {
        await fs.access(DATA_FILE);
    } catch {
        // Create initial products if not exists
        const initialProducts = [
            { id: 1, name: 'Smartphone X', price: 999.99, description: 'Latest model with high-res camera.', image: 'https://placehold.co/300x300?text=Phone' },
            { id: 2, name: 'Laptop Pro', price: 1499.99, description: 'Powerful laptop for professionals.', image: 'https://placehold.co/300x300?text=Laptop' },
            { id: 3, name: 'Wireless Earbuds', price: 199.99, description: 'Noise cancelling earbuds.', image: 'https://placehold.co/300x300?text=Earbuds' },
            { id: 4, name: 'Smart Watch', price: 299.99, description: 'Track your fitness and notifications.', image: 'https://placehold.co/300x300?text=Watch' },
            { id: 5, name: '4K Monitor', price: 399.99, description: 'Ultra HD display for immersive viewing.', image: 'https://placehold.co/300x300?text=Monitor' },
            { id: 6, name: 'Mechanical Keyboard', price: 129.99, description: 'Tactile switches for great typing experience.', image: 'https://placehold.co/300x300?text=Keyboard' },
        ];
        await writeData(DATA_FILE, initialProducts);
    }

    try {
        await fs.access(ORDERS_FILE);
    } catch {
        await writeData(ORDERS_FILE, []);
    }
}

initData();

// Routes
app.get('/api/products', async (req, res) => {
    try {
        const products = await readData(DATA_FILE);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const products = await readData(DATA_FILE);
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

app.post('/api/checkout', async (req, res) => {
    try {
        const { items, customer } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        const orders = await readData(ORDERS_FILE);
        const newOrder = {
            id: Date.now(),
            date: new Date().toISOString(),
            customer,
            items,
            status: 'pending'
        };

        orders.push(newOrder);
        await writeData(ORDERS_FILE, orders);

        res.status(201).json({ message: 'Order placed successfully', orderId: newOrder.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process order' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
