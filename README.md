# Direwolf Pet Store

A full-featured MERN stack e-commerce application for a specialty pet store focusing on direwolves.

![Direwolf Pet Store](frontend/public/images/sample.jpg)

## Features

- Full featured shopping cart
- Direwolf reviews and ratings
- Top direwolves carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin direwolf management
- Admin user management
- Admin order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (direwolves & users)

## Technology Stack

### Frontend
- React.js with functional components
- Redux for state management
- React Router for navigation
- React Bootstrap for UI components
- Axios for API requests
- PayPal API integration

### Backend
- Node.js with Express
- MongoDB database with Mongoose ODM
- JWT Authentication
- RESTful API architecture
- Custom middleware for error handling, authentication, etc.

## Installation

### Prerequisites
- Node.js and npm
- MongoDB

### Setup
1. Clone the repository:
```bash
git clone https://github.com/LewChew/direwolf-pet-store.git
cd direwolf-pet-store
```

2. Install server dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

4. Create a `.env` file in the root directory with the following variables:
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```

5. Seed the database (optional):
```bash
npm run data:import
```

6. Run the development server:
```bash
npm run dev
```

This will start both the backend server and the frontend client.

## Usage

### Regular User Functions
- Browse available direwolves
- Search for specific direwolves
- View direwolf details, including ratings and reviews
- Add direwolves to cart
- Proceed through checkout process
- Pay via PayPal or credit card
- View order history
- Write reviews for purchased direwolves

### Admin Functions
- Access admin dashboard
- Manage users (create, read, update, delete)
- Manage direwolves (create, read, update, delete)
- Manage orders (view, mark as delivered)

## API Endpoints

### Direwolves
- `GET /api/direwolves` - Get all direwolves
- `GET /api/direwolves/:id` - Get direwolf by ID
- `POST /api/direwolves` - Create a direwolf (admin only)
- `PUT /api/direwolves/:id` - Update a direwolf (admin only)
- `DELETE /api/direwolves/:id` - Delete a direwolf (admin only)
- `POST /api/direwolves/:id/reviews` - Create a direwolf review
- `GET /api/direwolves/top` - Get top rated direwolves

### Users
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Authenticate user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PUT /api/users/:id` - Update user (admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/deliver` - Update order to delivered (admin only)
- `GET /api/orders/myorders` - Get logged in user orders
- `GET /api/orders` - Get all orders (admin only)

## License

This project is licensed under the MIT License.

## Acknowledgements

- Direwolf names and descriptions inspired by George R.R. Martin's "A Song of Ice and Fire" series
- Special thanks to all contributors and supporters of this project