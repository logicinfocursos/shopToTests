const API_BASE_URL = 'http://localhost:3001/api';

export async function getProducts() {
    const res = await fetch(`${API_BASE_URL}/products`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}

export async function getProduct(id) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
}

export async function checkout(orderData) {
    const res = await fetch(`${API_BASE_URL}/checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });
    if (!res.ok) throw new Error('Failed to checkout');
    return res.json();
}
