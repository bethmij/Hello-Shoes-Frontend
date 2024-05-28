import { useState } from 'react';
import emailjs from 'emailjs-com';

// Define the message as a variable
const msg =
    `
        We hope this message finds you well and in great spirits. On behalf of everyone at Hello Shoes Shop,
        we want to wish you a very happy birthday! 🎂🎉

        As a token of our appreciation for being a loyal customer, we have a special birthday gift just for you.
        Enjoy 20% off your next purchase! Use the promo code BIRTHDAY20 at checkout.
        This offer is valid for the entire month of your birthday,
        so take your time to find the perfect pair of shoes to celebrate your special day.

        Here are a few reasons to treat yourself:

        Exclusive Styles    :  Check out our latest arrivals and find the perfect match for your wardrobe.
        Comfort Guaranteed  :  Step into comfort with our meticulously designed footwear.
        Free Shipping       :  Enjoy free shipping on all orders over $50.

        We are incredibly grateful for your continued support and trust in Hello Shoes Shop.
        Your loyalty means the world to us, and we are committed to providing you with the best shopping experience possible.

        Wishing you a fantastic birthday filled with joy, love, and of course, amazing shoes!

        Warmest wishes,

        The Hello Shoes Shop Team 🛍️
    `;

// Define the Email component
export const  sendEmail = () => {
    const formData ={
        name: 'Bethmi Jayamila',
        email: 'bjayamila@gmail.com',
        message: msg
    }

    // Execute alert when the component is rendered
    alert("dfsdfs");

    // Log form data to console
    console.log(formData);

    // Uncomment the following code to send the email
    /*
    emailjs.send(
        'service_surspqz',
        'template_0srh5oe',
        formData,
        'HkiYU1Au24nrY6uOT'
    ).then((response) => {
        console.log('SUCCESS!', response.status, response.text);
    }).catch((error) => {
        console.log('FAILED...', error);
    });

    setFormData({ name: '', email: '', message: '' });
    */
}
