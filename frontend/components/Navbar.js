'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const { cartCount } = useCart();

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link href="/" className="logo">
                    ShopPremium
                </Link>
                <div className="nav-links">
                    <Link href="/">Home</Link>
                    <Link href="/cart" className="cart-icon">
                        🛒
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
