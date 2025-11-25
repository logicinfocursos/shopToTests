import { getProduct } from '../../../utils/api';
import ProductDetailClient from './ProductDetailClient';

export default async function ProductPage({ params }) {
    const { id } = await params;
    let product = null;
    let error = null;

    try {
        product = await getProduct(id);
    } catch (e) {
        error = "Product not found";
    }

    if (error || !product) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <h2>Error</h2>
                <p>{error || "Something went wrong"}</p>
            </div>
        );
    }

    return <ProductDetailClient product={product} />;
}
