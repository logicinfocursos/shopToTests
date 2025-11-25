'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="card">
            <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#333' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <div style={{ padding: '20px' }}>
                <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>{product.name}</h3>
                <p style={{ color: '#aaa', marginBottom: '15px', height: '48px', overflow: 'hidden' }}>
                    {product.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        ${product.price.toFixed(2)}
                    </span>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Link href={`/product/${product.id}`} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                            View
                        </Link>
                        <button
                            onClick={() => addToCart(product)}
                            className="btn btn-primary"
                            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
