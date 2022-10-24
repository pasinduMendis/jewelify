import Stripe from "stripe";

const stripe = new Stripe('sk_test_51LKNLnBZCQ2Q2AwNpNjawBO1Io9O0y9MxxoGL6OZ5mqxhPKA1NsYhjhgzCY8HOyDZoRzWNH1gnJ8furlLKS6omkS008dUaWbyW');

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === "POST") {
    //console.log(req.query.packageName)
    const {email, payment_method,name} = req.body;

  const customer = await stripe.customers.create({
    payment_method: payment_method,
    email: email,
    name:name,
    invoice_settings: {
      default_payment_method: payment_method,
    },
  });

  //console.log(customer)
  var subscription=""
if(req.query.packageName=='basic'){
  subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: 'price_1LLgzvBZCQ2Q2AwNsfX7jzgQ' }],
    //expand: ['latest_invoice.payment_intent']
  });
}else if(req.query.packageName=='plus'){
  subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: 'price_1LLh0qBZCQ2Q2AwNUTiaE6de' }],
    //expand: ['latest_invoice.payment_intent']
  });
}else if(req.query.packageName=='premium'){
  subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: 'price_1LLh2KBZCQ2Q2AwNk3nUVlXr' }],
    //expand: ['latest_invoice.payment_intent']
  });
}else if(req.query.packageName=='growth'){
  subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: 'price_1LLh3ABZCQ2Q2AwNKXMiZa9L' }],
    //expand: ['latest_invoice.payment_intent']
  });
}
  console.log("***********")
  console.log(subscription)

  res.json({customer_id:customer.id,subscription_id:subscription.id});
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
