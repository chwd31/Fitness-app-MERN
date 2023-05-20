import React from 'react';
import { createRoot } from 'react-dom/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './index.css';
import App from './App';

const stripePromise = loadStripe('pk_test_51N9GI3HfMu1TGSRk8pzPyHlcjvLSKxBPFBCabnywcWvobZQaU2FAzw2dub59w55XDbSeEA5oA143x1PVaHXnxmpq00xTYUKWlb');

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);
