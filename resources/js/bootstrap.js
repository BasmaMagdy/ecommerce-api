import axios from 'axios';

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true; // Important for Sanctum SPA authentication

// Get CSRF token from meta tag if available (for traditional forms, not strictly needed for SPA login if CSRF cookie is handled)
// Or, more commonly for SPAs, first hit the /sanctum/csrf-cookie endpoint
axios.get('/sanctum/csrf-cookie').then(response => {
    // CSRF cookie is now set, subsequent requests will send it
}).catch(error => {
    console.error('Failed to get CSRF cookie:', error);
});