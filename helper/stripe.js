require('dotenv').config({});
const stripe = require('stripe')("sk_live_3w9JlTDKWtNFdY6Rk5RHBp1c")
//sk_live_3w9JlTDKWtNFdY6Rk5RHBp1c
//sk_test_67flIc3NjtO2tkdx50oR63DG
const stripePay = async (quantity, domain) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Sponsor',
                images: ['https://rhapsodybible.org/wp-content/uploads/2020/03/Rhapsody-Bible-logo.png'],
              },
              unit_amount: 2000,
            },
            quantity,
          },
        ],
        mode: 'payment',
        success_url: `${domain}?success=true`,
        cancel_url: `${domain}?canceled=true`,
      }); 
      return session.id;

}

module.exports = stripePay