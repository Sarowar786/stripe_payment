// This is your test secret API key.
import Stripe from 'stripe';
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
const app = express();
const port = (process.env.port || 8000)
app.use(cors())

const MY_DOMAIN = (process.env.MY_DOMAIN);
const STRIPE_SECRET_KEY = (process.env.STRIPE_SECRET_KEY)

// for test the server
app.get('/',(req,res)=>{
    res.send(' Hello form server')
})

app.post('/create-checkout-session', async (req, res) => {
    try {
        const stripe = new Stripe(STRIPE_SECRET_KEY )
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        
        price: 'price_1Q0SOh2MZV3T6mnfpPKvW0T8',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${MY_DOMAIN}?success=true`,
    cancel_url: `${MY_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
    } catch (error) {
        console.log(error);
        
    }
});

app.listen(port, () => console.log(`server is running on port ${port}`));