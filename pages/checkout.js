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
import { createImageFromInitials } from "../custom/createprofilePic";
import Dropdown from 'react-bootstrap/Dropdown';

const stripePromise = loadStripe(
  "pk_test_51LKNLnBZCQ2Q2AwNSFVBJ1ypYRGARlLRilbTGgO4xgNgU8YexXg1BFckqqstRijsSk9JlmHXni6PCIgzaCFRUh5M00FbkevBFe"
);

const MyComponent = ({ price, packageName }, props) => {
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
      setCheckoutError("success");
      setProcessingTo(false);
      setTimeout(() => router.push('/inventory'), 1500);
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

export default function Layer4({ paymentIntent }, props) {
  const { data: session,status } = useSession();
  const [isSbscription, setisSbscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageloading, setPageLoding] = useState(true);
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
            router.push('/update-payinfo')
          }else{
            setPageLoding(false);
          }
        });
    }
  };

  return (
    <>
      
        <div>
          <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <title>Jewelify</title>
            <meta name="description" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          {pageloading ? (
        <div className=" d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="div-block-323">
          <div className="div-block-324"><img src="images/bx_menu.svg" loading="lazy" alt="" /></div><img src="images/Jewelify.svg" loading="lazy" alt="" className="image-84" />
        </div>
        <div className="">
          <div className="">
          <div className="div-block-314" style={{width:'100%',marginTop:'0'}}>
              <div className="div-block-315 " style={{width:'90%'}}>
              <div className='col-10'>
                <a aria-current="page" className="w-nav-brand w--current">
                  <img src="img/Jewelify-blue.png" loading="lazy" alt="" className="image-73" />
                  </a>
              </div>
                {session?
                <>
                <a  className="w-inline-block">
                  <img
                    src="images/Notification-Bell.svg"
                    loading="lazy"
                    alt=""
                  />
                </a>

                <Dropdown>
                  <Dropdown.Toggle variant="white" id="dropdown-custom-1">
                    <img
                      src={session.profilePicture?session.profilePicture:createImageFromInitials(
                        500,
                        session.id,
                        "#1E90FF"
                      )}
                      style={{ width: "50px", borderRadius: "50px" }}
                      loading="lazy"
                      alt=""
                      className="image-81"
                    />
                    {/*  <div className="text-block-31">{session.id}</div>*/}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="super-colors bg-primary text-center">
                    <Dropdown.Item className="bg-primary" variant="primary" active onClick={signOut}>
                    SIGN-OUT
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
              </>:
                <>
                 <a
                        onClick={() => {
                          localStorage.setItem(
                            "redirect",
                            "/displayProducts-online"
                          );
                          signIn();
                        }}
                        className="btn-cta-header2 w-button float-right"
                      >
                        Sign In
                      </a>
                </>
                }
                
              </div>
            </div>
            <div className="" style={{backgroundColor:'#F4FBFF'}}>
                <div className="div-block-300 pb-5 px-3 pt-3" style={{width:'100%',marginTop:'0'}}>
                  <h1 className="heading-134-copy">Enter Your Payment Details Below</h1>
                  <div className="card-123456">
                    <div className="div-block-302 px-5">
                      <div className="text-block-27 mb-5">Payment Information</div>
                      <Elements stripe={stripePromise}>
                        <MyComponent
                          price={router.query.package}
                          packageName={router.query.packageName}
                          {...props}
                        />
                      </Elements>
                      
                    </div>
                    <div className="div-block-301">
                      <div className="wrap-card lol">
                        <h1 className="heading-card1 dddd">You have to pay</h1>
                        <h1 className="heading-14 aaa">${router.query.package}/mo</h1>
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
            <div className="spacer" />
          </div>
        </div>
      </div>)}
        </div>
      
    </>
  );
}
