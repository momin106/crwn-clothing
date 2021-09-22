import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import './stripe-button.styles.scss';

const StripeCheckoutButton = ({ price }) => {
const priceForStripe = price * 100;
const publishableKey = 'pk_test_51JYmzaFupWkJLcrlFyqFAYXKv52IL34kxpiA3o7D5kt1fZCKAqA1JGiT7EgmsNqvyeIFLbO6ZnvpIGBWlYXwUv1z00f2FKfNz2';

const onToken = token => {
    alert("Payment Successfuk")
}

return (
    <StripeCheckout
        label='Pay Now'
        name='CRWN Clothing Ltd.'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description = { `Your total is $${price}` }
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
    />
)}
export default StripeCheckoutButton;