import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './index.css';
import './App.css';
import App from './App';

const stripePromise = loadStripe('pk_test_51N9GI3HfMu1TGSRk8pzPyHlcjvLSKxBPFBCabnywcWvobZQaU2FAzw2dub59w55XDbSeEA5oA143x1PVaHXnxmpq00xTYUKWlb');

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </ApolloProvider>
  </React.StrictMode>
);
