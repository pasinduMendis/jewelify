import Head from "next/head";
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
import Dropdown from 'react-bootstrap/Dropdown';
import CheckoutrSuccess from "./checkout-success";

const stripePromise = loadStripe(
  "pk_test_51LKNLnBZCQ2Q2AwNSFVBJ1ypYRGARlLRilbTGgO4xgNgU8YexXg1BFckqqstRijsSk9JlmHXni6PCIgzaCFRUh5M00FbkevBFe"
);

const MyComponent = ({ price, packageName,respones }, props) => {
  const { data: session, status } = useSession();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  //console.log(process.env)


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

      const res = await axios.post(
        `/api/create-subs?packageName=${packageName}`,
        {
          name: name,
          payment_method: paymentMethodReq.paymentMethod.id,
          email: email,
        }
      );

      //console.log(res);
      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      await axios
        .post(
          "https://api.jewelify.ai/.netlify/functions/payment",
          {
            isPayment: true,
            package: packageName,
            customer_id: res.data.customer_id,
            subscription_id: res.data.subscription_id,
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
          //console.log(res.data);
        });
      //console.log("success");
      if(res.data.subscription_id){
        respones("success")
      }
      //console.log(res)
      //setCheckoutError(res.message?res.message:"success");
      setProcessingTo(false);
      //setTimeout(() => router.push('/inventory'), 1500);
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
            className='form-control'
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Email *</label>
          <div className="c_input-group ">
            <input
            className='form-control'
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Card Details *</label>

          <CardElement onChange={handleCardDetailsChange} className='form-control' />
        </div>
        {checkoutError && <p className="text-danger">{checkoutError}</p>}
        <button className="button-8 w-button" disabled={isProcessing || !stripe}>
          {isProcessing ? <div className=' d-flex justify-content-center'>
            <div className='spinner-border' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div> : `SUBMIT`}
        </button>
      </form>
    </>
  );
};

export default function Layer4( props) {
  const { data: session,status } = useSession();
  const [isSbscription, setisSbscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageloading, setPageLoding] = useState(true);
  const [response,setResponse]=useState("")
  const router = useRouter();
  
  useEffect(() => {
    localStorage.setItem("redirect", "/");
    if (status != "loading" && !session) {
      localStorage.setItem("redirect", "/pricing");
      router.push("/sign-in");
      //setPageLoding(false);
    } else if (status == "authenticated") {
      getUser();
      //setPageLoding(false);
    }
  }, [session]);
 

  const getUser = async () => {
    setPageLoding(true);
    if (session) {
      await axios
        .get("https://api.jewelify.ai/.netlify/functions/profile", {
          headers: {
            Authorization: session.authToken,
          },
        })
        .then((res) => {
          if(res.data.user.isPayment){
           // router.push('/update-payinfo')
          }else{
            setPageLoding(false);
          }
        });
    }
  };

  return (
    <>{
      response=='success' &&
      <>
      <CheckoutrSuccess />
      </>
    }
      <div className="" style={{backgroundColor:'#F4FBFF'}}>
                <div className="div-block-300 pb-5 px-3 pt-3" style={{width:'100%',marginTop:'0'}}>
                  <h1 className="heading-134-copy">Enter Your Payment Details Below</h1>
                  <div className="card-123456">
                    <div className="div-block-302 px-5">
                      <div className="text-block-27 mb-5">Payment Information</div>
                      <Elements stripe={stripePromise}>
                        <MyComponent
                          price={props.packagePrice}
                          packageName={props.packageName}
                          respones={(val)=>setResponse(val)}
                          {...props}
                        />
                      </Elements>
                      
                    </div>
                    <div className="div-block-301">
                      <div className="wrap-card lol">
                        <h1 className="heading-card1 dddd">You have to pay</h1>
                        <h1 className="heading-14 aaa">${props.packagePrice}/mo</h1>
                        <div className="line" />
                      </div>
                      <div className="wrap2-card">
                        <h1 className="list-title">What’s included</h1>
                        <div className="list-wrap">
                          <div className="card-list-item"><img src="images/Ellipse-2.svg" loading="lazy" alt="" />
                            <h1 className="list-text">Eget nunc scelerisque viverra</h1>
                          </div>
                          <div className="card-list-item"><img src="images/Ellipse-2.svg" loading="lazy" alt="" />
                            <h1 className="list-text">Eget nunc scelerisque viverra</h1>
                          </div>
                          <div className="card-list-item"><img src="images/Ellipse-2.svg" loading="lazy" alt="" />
                            <h1 className="list-text">Eget nunc scelerisque viverra</h1>
                          </div>
                          <div className="card-list-item"><img src="images/Ellipse-2.svg" loading="lazy" alt="" />
                            <h1 className="list-text">Eget nunc scelerisque viverra</h1>
                          </div>
                          <div className="card-list-item"><img src="images/Ellipse-2.svg" loading="lazy" alt="" />
                            <h1 className="list-text">Eget nunc scelerisque viverra</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
      
    </>
  );
}
