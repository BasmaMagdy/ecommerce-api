import { Grid, Card, CardContent, CardActions, Typography, Button, TextField } from '@mui/material';

function ProductList({ products, onAddToCart }) {
    return (
        <Grid container spacing={3}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                ${product.price.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Stock: {product.stock}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                variant="contained"
                                onClick={() => onAddToCart(product)}
                            >
                                Add to Cart
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default ProductList;