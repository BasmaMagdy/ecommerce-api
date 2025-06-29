import { Box, Typography, List, ListItem, ListItemText, Divider, Button, TextField } from '@mui/material';

function OrderSummary({ cart, onRemoveItem, onQuantityChange, onSubmitOrder }) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
                Order Summary
            </Typography>
            {cart.length === 0 ? (
                <Typography>Your cart is empty</Typography>
            ) : (
                <>
                    <List>
                        {cart.map((item) => (
                            <ListItem key={item.id} sx={{ py: 1 }}>
                                <ListItemText
                                    primary={item.name}
                                    secondary={`$${item.price.toFixed(2)}`}
                                />
                                <TextField
                                    size="small"
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        onQuantityChange(item.id, parseInt(e.target.value))
                                    }
                                    inputProps={{ min: 1 }}
                                    sx={{ width: 60, mr: 1 }}
                                />
                                <Button
                                    size="small"
                                    color="error"
                                    onClick={() => onRemoveItem(item.id)}
                                >
                                    Remove
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Total: ${total.toFixed(2)}
                    </Typography>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={onSubmitOrder}
                    >
                        Place Order
                    </Button>
                </>
            )}
        </Box>
    );
}

export default OrderSummary;