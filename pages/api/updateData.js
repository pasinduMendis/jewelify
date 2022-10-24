import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51LKNLnBZCQ2Q2AwNpNjawBO1Io9O0y9MxxoGL6OZ5mqxhPKA1NsYhjhgzCY8HOyDZoRzWNH1gnJ8furlLKS6omkS008dUaWbyW"
);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { customer_id, name, email, payment_method, old_payment_method } =
        req.body;
      console.log(email);

      const customer = await stripe.customers.update(customer_id, {
        email: email,
        name: name,
      });
      const paymentMethod1 = await stripe.paymentMethods.detach(
        old_payment_method
      );
      const paymentMethod = await stripe.paymentMethods.attach(payment_method, {
        customer: customer_id,
      });
      console.log(paymentMethod);

      res.status(200).send(paymentMethod);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
