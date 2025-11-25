'use client';

import { useCart } from '../../../context/CartContext';
import { useState } from 'react';

export default function ProductDetailClient({ product }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </div>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{product.name}</h1>
                    <p style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '20px', fontWeight: 'bold' }}>
                        ${product.price.toFixed(2)}
                    </p>
                    <p style={{ fontSize: '1.1rem', color: '#ccc', marginBottom: '40px', lineHeight: '1.8' }}>
                        {product.description}
                    </p>

                    <button
                        onClick={handleAdd}
                        className="btn btn-primary"
                        style={{ padding: '16px 32px', fontSize: '1.1rem', width: '100%' }}
                    >
                        {added ? 'Added to Cart ✓' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}
