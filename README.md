# Full Stack E-Commerce System

## Setup Instructions
1. Clone repo & run `composer install && npm install`
2. Create `.env` file and set DB credentials
3. Run migrations: `php artisan migrate`
4. Start backend: `php artisan serve`
5. Start frontend: `npm run dev`

## API Endpoints
- `POST /api/login`
- `GET /api/products`
- `POST /api/orders` (auth required)
- `GET /api/orders/{id}` (auth required)

## Authentication
- Sanctum used
- Login returns bearer token
- Use `Authorization: Bearer <token>` in requests
