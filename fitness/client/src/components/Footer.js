import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useMutation } from '@apollo/client';
import { PROCESS_PAYMENT } from '../schema/resolvers';

const Footer = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleContribute = async (event) => {
        event.preventDefault();
    };

    return (
        <footer>
            <p>© 2023 Fitness App.  Created by ??? and ???</p>
            <p>
                Please contribute to this project by clicking&nbsp;
                <button onClick={handleContribute}>Here</button>
            </p>
        </footer>
    );
};

export default Footer;
