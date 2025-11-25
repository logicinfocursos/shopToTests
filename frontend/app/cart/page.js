'use client';

import { useCart } from '../../context/CartContext';
import Link from 'next/link';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <h1 style={{ marginBottom: '20px' }}>Your Cart is Empty</h1>
                <p style={{ marginBottom: '40px', color: '#888' }}>Looks like you haven't added anything yet.</p>
                <Link href="/" className="btn btn-primary">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '40px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>Shopping Cart</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {cart.map((item) => (
                    <div key={item.id} className="card" style={{ display: 'flex', padding: '20px', alignItems: 'center', gap: '20px' }}>
                        <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <div style={{ flex: 1 }}>
                            <h3 style={{ marginBottom: '5px' }}>{item.name}</h3>
                            <p style={{ color: 'var(--primary)' }}>${item.price.toFixed(2)}</p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="btn btn-secondary"
                                style={{ padding: '5px 10px' }}
                                disabled={item.quantity <= 1}
                            >
                                -
                            </button>
                            <span style={{ width: '30px', textAlign: 'center' }}>{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="btn btn-secondary"
                                style={{ padding: '5px 10px' }}
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={() => removeFromCart(item.id)}
                            style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', padding: '10px' }}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '40px', padding: '30px', backgroundColor: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.2rem' }}>
                    <span>Total</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>${cartTotal.toFixed(2)}</span>
                </div>

                <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end' }}>
                    <button onClick={clearCart} className="btn btn-secondary">
                        Clear Cart
                    </button>
                    <Link href="/checkout" className="btn btn-primary">
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
}
