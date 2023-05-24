
# Fitness App

The Fitness App is a web application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to track their exercise routines, view weekly stats, and make contributions to the project using a test mode payment integration with Stripe.

## Features

- User authentication: Users can sign up, log in, and log out.
- Exercise tracking: Users can add exercise details such as type, time, and date.
- Weekly stats: Users can view their exercise statistics for each week.
- Contribution: Users can contribute to the project using the test mode payment integration with Stripe.

## Technologies Used

- Front-end:
  - React: JavaScript library for building user interfaces.
  - Apollo Client: GraphQL client for managing state and executing queries/mutations.
  - Stripe: Payment processing integration for handling contributions.
  - React Router: Library for handling client-side routing.
  - HTML and CSS: Markup and styling for the user interface.

- Back-end:
  - Node.js: JavaScript runtime environment.
  - Express: Web application framework for Node.js.
  - Apollo Server: GraphQL server for handling API requests.
  - MongoDB: NoSQL database for storing user and exercise data.
  - Mongoose: Object Data Modeling (ODM) library for MongoDB.
  - JWT: JSON Web Tokens for user authentication.
  - Stripe: Payment processing integration for handling contributions.

## Getting Started

### Prerequisites

- Node.js: Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository:


2. Navigate to the project root folder:


3. Install dependencies for the server:


4. Install dependencies for the client:


### Configuration

1. Create a `.env` file in the `server` directory and provide the following environment variables:


Replace `<your-mongodb-uri>` with the MongoDB connection URI and `<your-stripe-secret-key>` with your Stripe secret key.

2. Create a `.env` file in the `client` directory and provide the following environment variables:


Replace `<your-stripe-public-key>` with your Stripe public key.

### Running the Application

1. Start the server:


2. Start the client:


3. Open your browser and visit `http://localhost:3000` to access the Fitness App.

## License

This project is licensed under the [MIT License](LICENSE).
