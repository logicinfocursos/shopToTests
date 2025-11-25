'use client';

import { useCart } from '../../context/CartContext';
import { checkout } from '../../utils/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (cart.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <h2>Cart is empty</h2>
                <p>Redirecting...</p>
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await checkout({
                items: cart,
                customer: formData,
            });
            clearCart();
            alert('Order placed successfully!');
            router.push('/');
        } catch (err) {
            setError('Failed to place order. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '30px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>Checkout</h1>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', padding: '20px', backgroundColor: 'var(--card-bg)', borderRadius: '8px' }}>
                <span>Total Amount</span>
                <span style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.2rem' }}>${cartTotal.toFixed(2)}</span>
            </div>

            {error && <div style={{ color: 'var(--error)', marginBottom: '20px' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px' }}>City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px' }}>ZIP Code</label>
                        <input
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ marginTop: '20px', padding: '16px', fontSize: '1.1rem' }}
                >
                    {loading ? 'Processing...' : 'Place Order'}
                </button>
            </form>
        </div>
    );
}
