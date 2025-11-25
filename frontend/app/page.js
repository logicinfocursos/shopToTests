import { getProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';

export default async function Home() {
  let products = [];
  let error = null;

  try {
    products = await getProducts();
  } catch (e) {
    error = "Failed to load products. Please ensure the backend is running.";
    console.error(e);
  }

  return (
    <div>
      <header style={{ textAlign: 'center', margin: '40px 0' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '10px', background: 'linear-gradient(to right, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          New Arrivals
        </h1>
        <p style={{ color: '#888', fontSize: '1.2rem' }}>Discover our latest premium collection.</p>
      </header>

      {error ? (
        <div style={{ textAlign: 'center', color: 'var(--error)', padding: '40px' }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
