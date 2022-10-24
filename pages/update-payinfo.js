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

export default function Layer4({ paymentIntent }, props) {
  const { data: session , status} = useSession();
  const router = useRouter();
  console.log(router.query);
  const [pageloading, setPageLoding] = useState(true);


  useEffect(() => {
    localStorage.setItem("redirect", "/");
    if (status != "loading" && !session) {
      localStorage.setItem("redirect", "/update-payinfo");
      router.push("/sign-in");
    } else if (status == "authenticated") {
      setPageLoding(false);
    }
  }, [session]);

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>Jewelify</title>
        <meta name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {pageloading ? (
        <div className=" d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
      <div className="wrapper">
        <header className="header-area">
          {/* Menu Area
          ============================================ */}
          <div id="main-menu" className="sticker white-bg">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-xs-12">
                  <div className="logo float-left navbar-header">
                    <h2 className="logo">
                      <a href="index.html">Jewelify</a>
                    </h2>
                    <button
                      className="navbar-toggle collapsed"
                      data-toggle="collapse"
                      data-target="#main-menu-2"
                    >
                      <img src="/img/menu.svg" className="menu-open" alt="" />
                    </button>
                  </div>
                  <div
                    className="main-menu text-center collapse navbar-collapse"
                    id="main-menu-2"
                  >
                    <nav>
                      <ul className="menu one-page">
                        <li className="active">
                          <a href="#home-area">Home</a>
                        </li>
                        <li>
                          <a href="#about-area">Services</a>
                        </li>
                        <li>
                          <a href="#features-area">Price</a>
                        </li>
                        <li>
                          <a href="#screenshort-area">About Us</a>
                        </li>
                        <li>
                          <a href="#pricing-area">Contact</a>
                        </li>
                        {!session && (
                          <>
                            <a
                              href="#about"
                              onClick={signIn}
                              className="get-started-btn scrollto float-right"
                            >
                              Sign In
                            </a>
                          </>
                        )}

                        {session && (
                          <>
                            <a
                              href="#about"
                              onClick={signOut}
                              className="get-started-btn scrollto float-right"
                            >
                              Sign Out
                            </a>
                          </>
                        )}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <section className="pay-info-sec bg-lightblue pt-20 pb-60 custom-border">
          <div className="container">
            
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <h3 className="sec-head white-color mb-20">
                  Update Your Payment Details Below
                </h3>
              </div>
            </div>
          </div>
        </section>
        <section className="pay-info-wrap">
          <div className="container">
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
        </section>
      </div>
      {/* contact area
      ============================================ */}
      <div className="contact-area">
        <div className="container">
          <div className="row">
            <div className="conatct-info fix">
              <div className="col-md-5 col-sm-4 text-style">
                <h2>Jewelify</h2>
                <p>
                  Copyright © 2021
                  <a href="http://bootexperts.com/" target=" _blank">
                    Jewelify
                  </a>
                  <br />
                  .All right reserved.
                </p>
              </div>
              <div className="col-md-2 col-sm-4 footer-links text-style t-m-res">
                <h3 className="mb-30">Services</h3>
                <ul>
                  <li>
                    <a >service - 1</a>
                  </li>
                  <li>
                    <a >service - 2</a>
                  </li>
                  <li>
                    <a >service - 3</a>
                  </li>
                  <li>
                    <a >service - 4</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-2 col-sm-4 footer-links text-style t-m-res">
                <h3 className="mb-30">Company</h3>
                <ul>
                  <li>
                    {" "}
                    <a >Work</a>
                  </li>
                  <li>
                    <a >About</a>
                  </li>
                  <li>
                    <a >Resources</a>
                  </li>
                  <li>
                    <a >Pricing</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 col-sm-4 text-style t-m-res">
                <h3 className="mb-30">Useful Links</h3>
                <div className="footer-icon">
                  <ul>
                    <li>
                      <a>
                        <img src="/img/facebook.svg" alt="" width="20px" />
                      </a>{" "}
                    </li>
                    <li>
                      <a>
                        <img src="/img/instagram.svg" alt="" width="20px" />
                      </a>{" "}
                    </li>
                    <li>
                      <a>
                        <img src="/img/twitter.svg" alt="" width="20px" />
                      </a>{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* start scrollUp
      ============================================ */}
      {/*<div id="toTop">
          <i class="fa fa-chevron-up"></i>
      </div>
  </div>*/}
      {/* jquery
		============================================ */}
      {/* bootstrap JS
		============================================ */}
      {/* plugins JS
		============================================ */}
      {/* main JS
		============================================ */}
    </>)}
    </div>
  );
}
