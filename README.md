# MERN Ecommerce

# Description

An ecommerce store built with MERN stack

1.Buyers browse the store products  
2.Admin manages and control the entire store components

- features:
  - Node provides the backend environment for this application
  - Express middleware is used to handle requests, routes
  - Mongoose schemas to model the application data
  - React for displaying UI components
  - Redux to manage application's state
  - Redux Thunk middleware to handle asynchronous redux actions

## Installation

For Backend -`npm install`

For Frontend - `cd frontend` `npm install`

frontend (React app) runs on port 3000

backend (Node api) runs on port 5000

(MongoDB server) runs on port 27017

## Create .env file

and name `.env`  
In `.env` file create variables shown below and enter data into fields

- PORT=
- NODE_ENV=development
- MONGO_URI=mongodb://localhost:27017/shopping
- JWT_KEY=

## To Run application

- import Products - `npm run data:import`

- `npm run dev` in new terminal
- remove Products - `npm run data:destroy `

## App Features

- **Login/Signup system**
- **Admin dashBoard**
- **Products filtered by price**
- **Product Search**
- **Shopping cart**

## Technologies & Tools

### Frontend :

- React
- Redux

### Backend :

- Node
- Express
- MongoDB
- Mongoose
