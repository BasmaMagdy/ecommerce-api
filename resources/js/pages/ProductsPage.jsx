import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import useApi from '../hooks/useApi';
import ProductList from '../components/ProductList';
import OrderSummary from '../components/OrderSummary';
import SearchFilter from '../components/SearchFilter';
import { Box, Container, Grid, CircularProgress, Alert } from '@mui/material';

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        name: '',
        minPrice: '',
        maxPrice: '',
        category: '',
        page: 1,
    });

    const navigate = useNavigate();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.name) params.append('name', filters.name);
            if (filters.minPrice) params.append('min_price', filters.minPrice);
            if (filters.maxPrice) params.append('max_price', filters.maxPrice);
            if (filters.category) params.append('category', filters.category);
            params.append('page', filters.page);

            const response = await api.get(`/products?${params.toString()}`);
            setProducts(response.data.data);
        } catch (err) {
            setError('Failed to fetch products');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const handleAddToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const handleRemoveFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const handleQuantityChange = (productId, quantity) => {
        if (quantity <= 0) {
            handleRemoveFromCart(productId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const handleSubmitOrder = async () => {
        try {
            const orderItems = cart.map((item) => ({
                product_id: item.id,
                quantity: item.quantity,
            }));

            const response = await api.post('/orders', { items: orderItems });
            navigate(`/orders/${response.data.id}`);
        } catch (err) {
            setError('Failed to place order');
            console.error('Order error:', err);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters, page: 1 });
    };

    const handlePageChange = (newPage) => {
        setFilters({ ...filters, page: newPage });
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <SearchFilter onFilterChange={handleFilterChange} />
                    {loading ? (
                        <Box display="flex" justifyContent="center" mt={4}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Alert severity="error">{error}</Alert>
                    ) : (
                        <ProductList
                            products={products}
                            onAddToCart={handleAddToCart}
                        />
                    )}
                </Grid>
                <Grid item xs={12} md={4}>
                    <OrderSummary
                        cart={cart}
                        onRemoveItem={handleRemoveFromCart}
                        onQuantityChange={handleQuantityChange}
                        onSubmitOrder={handleSubmitOrder}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProductsPage;