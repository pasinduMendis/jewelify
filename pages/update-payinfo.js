import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
  "pk_test_51LKNLnBZCQ2Q2AwNSFVBJ1ypYRGARlLRilbTGgO4xgNgU8YexXg1BFckqqstRijsSk9JlmHXni6PCIgzaCFRUh5M00FbkevBFe"
);

const MyComponent = ({ price, packageName }, props) => {
  const { data: session,status } = useSession();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    const billingDetails = {
      name: name,
      email: email,
    };

    setProcessingTo(true);

    const cardElement = elements.getElement("card");
    console.log(cardElement);

    try {
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });
      console.log(paymentMethodReq);
      const user = await axios.get(
        "https://api.jewelify.ai/.netlify/functions/profile",
        {
          headers: {
            Authorization: session.authToken,
          },
        }
      );

      const res = await axios.post("/api/updateData", {
        name: name,
        payment_method: paymentMethodReq.paymentMethod.id,
        email: email,
        customer_id: user.data.user.customer_id,
        old_payment_method:user.data.user.payment_method?user.data.user.payment_method:""
      });

      await axios
        .post(
          "https://api.jewelify.ai/.netlify/functions/payment",
          {
            subscription_email: email,
            payment_method: paymentMethodReq.paymentMethod.id
          },
          {
            headers: {
              Authorization: session.authToken,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        });

      console.log("success");
      setCheckoutError("success");
      setProcessingTo(false);
    } catch (err) {
      setCheckoutError(err.message);
      setProcessingTo(false);
    }
  };



  // rest of the component
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Name *</label>
          <div className="c_input-group">
            <input
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Email *</label>
          <div className="c_input-group">
            <input
              type="text"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Card Details *</label>

          <CardElement onChange={handleCardDetailsChange} />
        </div>
        {checkoutError && <p>{checkoutError}</p>}
        <button className="btn btn-primary" disabled={isProcessing || !stripe}>
          {isProcessing ? "Processing..." : "update details"}
        </button>
      </form>
    </>
  );
};

export default function Layer4({ paymentIntent,leftBar }, props) {
  const { data: session , status} = useSession();
  const router = useRouter();
  console.log(router.query);
  const [pageloading, setPageLoding] = useState(true);


  useEffect(() => {
    localStorage.setItem("redirect", "/");
    leftBar("setting")
    if (status != "loading" && !session) {
      localStorage.setItem("redirect", "/update-payinfo");
      router.push("/sign-in");
    } else if (status == "authenticated") {
      setPageLoding(false);
    }
  }, [session]);

  return (
    <div>
      {pageloading ? (
        <div className=" d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
      <div className="div-block-343">
        
        
          <div className="mb-5">
            
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <h3 className="sec-head white-color mb-20">
                  Update Your Payment Details Below
                </h3>
              </div>
            </div>
          </div>
       
          <div className="">
            <div className="row justify-content-center">
              <div className="col-md-7 col-lg-7 col-12 col-sm-12">
                <div className="c_card">
                  <h3 className="head">Payment Information</h3>
                  <Elements stripe={stripePromise}>
                    <MyComponent
                      price={router.query.package}
                      packageName={router.query.packageName}
                      {...props}
                    />
                  </Elements>
                </div>
              </div>
              
            </div>
          </div>
        
      </div>
      </>
      )}
      
    </div>
  );
}
