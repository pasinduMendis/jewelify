import Stripe from "stripe";

const stripe = new Stripe('sk_test_51LKNLnBZCQ2Q2AwNpNjawBO1Io9O0y9MxxoGL6OZ5mqxhPKA1NsYhjhgzCY8HOyDZoRzWNH1gnJ8furlLKS6omkS008dUaWbyW');

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const amount = req.body.amount;
     //console.log(amount)

      const paymentIntent = await stripe.paymentIntents.create({
        amount:amount,
        currency: "usd"
      });
      console.log(paymentIntent)
      res.status(200).send(paymentIntent.client_secret);
      
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
