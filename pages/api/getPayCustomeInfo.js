import Stripe from "stripe";

const stripe = new Stripe(
    'sk_test_51LKNLnBZCQ2Q2AwNpNjawBO1Io9O0y9MxxoGL6OZ5mqxhPKA1NsYhjhgzCY8HOyDZoRzWNH1gnJ8furlLKS6omkS008dUaWbyW'
    )
  ;

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { customer_id } =
        req.body;

        const customer = await stripe.customers.retrieve(
            customer_id
          );
          const paymentMethods = await stripe.customers.listPaymentMethods(
            customer_id,
            {type: 'card'}
          );
          const paymentIntents = await stripe.paymentIntents.list({
            customer: customer_id,
          });

          const resData={
            customer:customer,
            payHistory:paymentIntents,
            cardInfo:paymentMethods,
          }
          //console.log(paymentIntents)
      res.status(200).send(resData);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } /* else if (req.method === "POST" && req.quer) {
    const customer = await stripe.customers.retrieve(
      'cus_MNeF9BnNuoLnu8'
    );
  } */
  else{
    res.setHeader("Allow", "POST");
    res.status(405).send("Method Not Allowed");
  }
};
