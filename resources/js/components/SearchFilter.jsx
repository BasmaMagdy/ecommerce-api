import { useState } from 'react';
import { TextField, Grid, Button, Box } from '@mui/material';

function SearchFilter({ onFilterChange }) {
    const [name, setName] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange({ name, minPrice, maxPrice, category });
    };

    const handleReset = () => {
        setName('');
        setMinPrice('');
        setMaxPrice('');
        setCategory('');
        onFilterChange({ name: '', minPrice: '', maxPrice: '', category: '' });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="Search by name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                    <TextField
                        label="Min price"
                        type="number"
                        fullWidth
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                    <TextField
                        label="Max price"
                        type="number"
                        fullWidth
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                    <TextField
                        label="Category"
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                    <Button type="submit" variant="contained" fullWidth sx={{ height: '100%' }}>
                        Apply Filters
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleReset}
                        sx={{ height: '100%' }}
                    >
                        Reset
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SearchFilter;