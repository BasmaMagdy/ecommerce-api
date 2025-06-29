import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import OrderPage from './pages/OrderPage';
import { AuthContext } from './context/AuthContext';

function App() {
    const { user } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
            <Route path="/" element={<Layout />}>
                <Route index element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
                <Route path="/orders/:id" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
            </Route>
        </Routes>
    );
}

export default App;