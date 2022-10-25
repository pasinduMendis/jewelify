/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createImageFromInitials } from "../custom/createprofilePic";
import Dropdown from "react-bootstrap/Dropdown";
import Layer4 from "../custom/checkOut/checkOut";
import PricingLoading from "../custom/loadingPages/pricing";
import Accordion from "react-bootstrap/Accordion";

export default function Pricing() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [pageloading, setPageLoding] = useState(true);
  const [dispCheckout, setDispcheckout] = useState(false);
  const [packageName, setPackage] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [dispOnline, setDispOnline] = useState(true);
  const [mode, setMode] = useState("monthly");

  useEffect(() => {
    localStorage.setItem("redirect", "/");
    if (status != "loading" && !session) {
      localStorage.setItem("redirect", "/pricing");
      setPageLoding(false);
      //setPageLoding(false);
    } else if (status == "authenticated") {
      if (session.isPayment) {
        console.log(session)
        router.push("/inventory");
        //setPageLoding(false);
      } else {
        setDispcheckout(
          localStorage.getItem("isCheckoutPage") == "checkout" ? true : false
        );
        setPackage(
          localStorage.getItem("package") ? localStorage.getItem("package") : ""
        );
        setPackagePrice(
          localStorage.getItem("packagePrice")
            ? localStorage.getItem("packagePrice")
            : ""
        );
        if(localStorage.getItem("package")||localStorage.getItem("packagePrice")||localStorage.getItem("isCheckoutPage")){
          localStorage.setItem("packagePrice", null);
          localStorage.setItem("package", null);
          localStorage.setItem("isCheckoutPage", null);
        }
        setPageLoding(false);
      }
    }
  }, [session]);

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>Jewelify</title>
        <meta name="description" content />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Add your site or application content here */}
      {pageloading ? (
        <PricingLoading />
      ) : (
        <div>
          <div className="">
            <div className="">
              <div className="div-block-314" style={{ width: "100%" }}>
                <div className="div-block-315 " style={{ width: "90%" }}>
                  <div className="col-10">
                    <a aria-current="page" className="w-nav-brand w--current">
                      <img
                        src="img/Jewelify-blue.png"
                        loading="lazy"
                        alt=""
                        className="image-73"
                      />
                    </a>
                  </div>
                  {session ? (
                    <>
                      <a className="w-inline-block">
                        <img
                          src="images/Notification-Bell.svg"
                          loading="lazy"
                          alt=""
                        />
                      </a>

                      <Dropdown>
                        <Dropdown.Toggle variant="white" id="dropdown-custom-1">
                          <img
                            src={
                              session.profilePicture
                                ? session.profilePicture
                                : createImageFromInitials(
                                    500,
                                    session.id,
                                    "#1E90FF"
                                  )
                            }
                            style={{ width: "50px", borderRadius: "50px" }}
                            loading="lazy"
                            alt=""
                            className="image-81"
                          />
                          {/*  <div className="text-block-31">{session.id}</div>*/}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="super-colors bg-primary text-center">
                          <Dropdown.Item
                            className="bg-primary"
                            variant="primary"
                            active
                            onClick={signOut}
                          >
                            SIGN-OUT
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </>
                  ) : (
                    <>
                      <a
                        onClick={() => {
                          localStorage.setItem(
                            "redirect",
                            "/pricing"
                          );
                          signIn();
                        }}
                        className="btn-cta-header2 w-button float-right"
                      >
                        Sign In
                      </a>
                    </>
                  )}
                </div>
              </div>
              {dispCheckout ? (
                <Layer4 packageName={packageName} packagePrice={packagePrice} />
              ) : (
                <div
                  id="pricing-area"
                  className="m-5 d-flex justify-content-center"
                  style={{
                    background:
                      "linear-gradient(to bottom,#f3fbfe 50% ,white 50%)",
                    height: "40%",
                    width: "95%",
                    alignContent: "center",
                  }}
                >
                  <div className="div-block-9">
                    <h1 className="heading-pricing">Pricing</h1>
                    <div
                      className=""
                      style={{
                        borderRadius: "10px",
                        backgroundColor: "#DBF2FD",
                        padding: "0.5%",
                      }}
                    >
                      <button
                        className="px-5 py-2 field-label-11"
                        style={{
                          width: "auto",
                          height: "auto",
                          backgroundColor: dispOnline ? "#0288F7" : "#DBF2FD",
                          borderRadius: "40px",
                          color: dispOnline ? "white" : "black",
                        }}
                        onClick={() => {
                          router.push("/pricing", "/pricing?page=monthly", {
                            shallo: true,
                          });
                          setDispOnline(true);
                          setMode("monthly");
                        }}
                      >
                        MONTHLY
                      </button>
                      <button
                        className="px-5 py-2 field-label-11"
                        style={{
                          width: "auto",
                          height: "auto",
                          backgroundColor: !dispOnline ? "#0288F7" : "#DBF2FD",
                          color: !dispOnline ? "white" : "black",
                          borderRadius: "40px",
                        }}
                        onClick={() => {
                          router.push("/pricing", "/pricing?page=yearly", {
                            shallo: true,
                          });
                          setDispOnline(false);
                          setMode("yearly");
                        }}
                      >
                        YEARLY
                      </button>
                    </div>
                    <div style={{ paddingTop: "5%" }}>
                      <div>
                        <div className="div-block-313">
                          <div className="card-1-111">
                            <div className="wrap-card">
                              <h1 className="heading-card1">Connect</h1>
                              {mode == "monthly" ? (
                                <h1 className="heading-14">$90/mo</h1>
                              ) : (
                                <h1 className="heading-14  ">
                                  <a
                                    className="text-muted"
                                    style={{
                                      textDecoration: "line-through",
                                      textDecorationColor: "gray",
                                      fontSize: "18px",
                                    }}
                                  >
                                    $90/mo
                                  </a>
                                  $81/mo
                                </h1>
                              )}
                              <p className="paragraph-4">
                                For small jewelry stores wanting to manage their
                                inventory more succintly between In-Store &
                                Online.
                              </p>
                              <div className="line" />
                            </div>
                            <div className="wrap2-card">
                              <h1 className="list-title">What’s included</h1>
                              <div className="list-wrap">
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">Sku’s</div>
                                  <div className="ms-auto list-text">250</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">Orders</div>
                                  <div className="ms-auto list-text">50</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">Integrations</div>
                                  <div className="ms-auto list-text">1</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">
                                    Stores Per Channel
                                  </div>
                                  <div className="ms-auto list-text">1</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">Storage</div>
                                  <div className="ms-auto list-text">1gb</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">
                                    Additional Channels
                                  </div>
                                  <div className="ms-auto list-text">N/A</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">
                                    Multiple Admins
                                  </div>
                                  <div className="ms-auto list-text">1</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">
                                    Monthly Analytics reports
                                  </div>
                                  <div className="ms-auto list-text ">Yes</div>
                                </div>
                              </div>
                              <button
                                className="price-btn card1-cta w-inline-block"
                                onClick={() => {
                                  setPageLoding(true)
                                  setPackage(
                                    mode == "monthly" ? "m-Connect" : "y-Connect"
                                  );
                                  setPackagePrice(
                                    mode == "monthly" ? "90" : "972"
                                  );
                                  if (!session) {
                                    localStorage.setItem(
                                      "isCheckoutPage",
                                      "checkout"
                                    );
                                    localStorage.setItem(
                                      "package",
                                      mode == "monthly"
                                        ? "m-Connect"
                                        : "y-Connect"
                                    );
                                    localStorage.setItem(
                                      "packagePrice",
                                      mode == "monthly" ? "90" : "972"
                                    );
                                    router.push("/sign-in");
                                  } else {
                                    setDispcheckout(true);
                                    window.scrollTo(0, 0);
                                    router.push(
                                      "/pricing",
                                      "/pricing?mode=checkout",
                                      {
                                        shallo: true,
                                      }
                                    );
                                    setPageLoding(false)
                                  }
                                }}
                              >
                                <a className="heading-12">Start free trial</a>
                              </button>
                            </div>
                          </div>
                          <div className="card-1-111">
                            <div className="wrap-card">
                              <h1 className="heading-card1">Grow</h1>
                              {mode == "monthly" ? (
                                <h1 className="heading-14">$150/mo</h1>
                              ) : (
                                <h1 className="heading-14  ">
                                  <a
                                    className="text-muted"
                                    style={{
                                      textDecoration: "line-through",
                                      textDecorationColor: "gray",
                                      fontSize: "18px",
                                    }}
                                  >
                                    $150/mo
                                  </a>
                                  $135/mo
                                </h1>
                              )}
                              <p className="paragraph-4">
                                For growing jewelry stores with more than one
                                location and want to showcase beyond website
                              </p>
                              <div className="line" />
                            </div>
                            <div className="wrap2-card">
                              <h1 className="list-title">What’s included</h1>
                              <div className="list-wrap">
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">Sku’s</div>
                                  <div className="ms-auto list-text">500</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">Orders</div>
                                  <div className="ms-auto list-text">100</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">Integrations</div>
                                  <div className="ms-auto list-text">2</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">
                                    Stores Per Channel
                                  </div>
                                  <div className="ms-auto list-text">2</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">Storage</div>
                                  <div className="ms-auto list-text">2gb</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">
                                    Additional Channels
                                  </div>
                                  <div className="ms-auto list-text">N/A</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">
                                    Multiple Admins
                                  </div>
                                  <div className="ms-auto list-text">2</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">
                                    Monthly Analytics reports
                                  </div>
                                  <div className="ms-auto list-text ">Yes</div>
                                </div>
                              </div>
                              <button
                                className="price-btn card1-cta w-inline-block"
                                onClick={() => {
                                  setPageLoding(true)
                                  setPackage(
                                    mode == "monthly" ? "m-Grow" : "y-Grow"
                                  );
                                  setPackagePrice(
                                    mode == "monthly" ? "150" : "1620"
                                  );
                                  if (!session) {
                                    localStorage.setItem(
                                      "isCheckoutPage",
                                      "checkout"
                                    );
                                    localStorage.setItem(
                                      "package",
                                      mode == "monthly" ? "m-Grow" : "y-Grow"
                                    );
                                    localStorage.setItem(
                                      "packagePrice",
                                      mode == "monthly" ? "150" : "1620"
                                    );
                                    router.push("/sign-in");
                                  } else {
                                    setDispcheckout(true);
                                    window.scrollTo(0, 0);
                                    router.push(
                                      "/pricing",
                                      "/pricing?mode=checkout",
                                      {
                                        shallo: true,
                                      }
                                    );
                                    setPageLoding(false)
                                  }
                                }}
                              >
                                <a className="heading-12">Start free trial</a>
                              </button>
                            </div>
                          </div>
                          <div className="card-1-111">
                            <div className="wrap-card">
                              <h1 className="heading-card1">Scale</h1>
                              {mode == "monthly" ? (
                                <h1 className="heading-14">$250/mo</h1>
                              ) : (
                                <h1 className="heading-14  ">
                                  <a
                                    className="text-muted"
                                    style={{
                                      textDecoration: "line-through",
                                      textDecorationColor: "gray",
                                      fontSize: "18px",
                                    }}
                                  >
                                    $250/mo
                                  </a>
                                  $225/mo
                                </h1>
                              )}
                              <p className="paragraph-4">
                                For growing jewelry stores with multiple
                                locations and multiple sales channels
                              </p>
                              <div className="line" />
                            </div>
                            <div className="wrap2-card">
                              <h1 className="list-title">What’s included</h1>
                              <div className="list-wrap">
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">Sku’s</div>
                                  <div className="ms-auto list-text">2000</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">Orders</div>
                                  <div className="ms-auto list-text">300</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">Integrations</div>
                                  <div className="ms-auto list-text">4</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">
                                    Stores Per Channel
                                  </div>
                                  <div className="ms-auto list-text">3</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">Storage</div>
                                  <div className="ms-auto list-text">5gb</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">
                                    Additional Channels
                                  </div>
                                  <div className="ms-auto list-text">
                                    100/channel
                                  </div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">
                                    Multiple Admins
                                  </div>
                                  <div className="ms-auto list-text">3</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">
                                    Monthly Analytics reports
                                  </div>
                                  <div className="ms-auto list-text ">Yes</div>
                                </div>
                              </div>
                              <button
                                className="price-btn card1-cta w-inline-block"
                                onClick={() => {
                                  setPageLoding(true)
                                  setPackage(
                                    mode == "monthly" ? "m-Scale" : "y-Scale"
                                  );
                                  setPackagePrice(
                                    mode == "monthly" ? "250" : "2700"
                                  );
                                  if (!session) {
                                    
                                    localStorage.setItem(
                                      "isCheckoutPage",
                                      "checkout"
                                    );
                                    localStorage.setItem(
                                      "package",
                                      mode == "monthly" ? "m-Scale" : "y-Scale"
                                    );
                                    localStorage.setItem(
                                      "packagePrice",
                                      mode == "monthly" ? "250" : "2700"
                                    );
                                    router.push("/sign-in");
                                  } else {
                                    setDispcheckout(true);
                                    window.scrollTo(0, 0);
                                    router.push(
                                      "/pricing",
                                      "/pricing?mode=checkout",
                                      {
                                        shallo: true,
                                      }
                                    );
                                    
                                    setPageLoding(false)
                                  }
                                }}
                              >
                                <a className="heading-12">Start free trial</a>
                              </button>
                            </div>
                          </div>
                          <div className="card-1-111">
                            <div className="wrap-card">
                              <h1 className="heading-card1">Supercharge</h1>
                              {mode == "monthly" ? (
                                <h1 className="heading-14">$480/mo</h1>
                              ) : (
                                <h1 className="heading-14  ">
                                  <a
                                    className="text-muted"
                                    style={{
                                      textDecoration: "line-through",
                                      textDecorationColor: "gray",
                                      fontSize: "18px",
                                    }}
                                  >
                                    $480/mo
                                  </a>
                                  $432/mo
                                </h1>
                              )}
                              <p className="paragraph-4">
                                For super-charged businesses who need
                                flexibility
                              </p>
                              <div className="line" />
                            </div>
                            <div className="wrap2-card">
                              <h1 className="list-title">What’s included</h1>
                              <div className="list-wrap">
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">Sku’s</div>
                                  <div className="ms-auto list-text">10000</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">Orders</div>
                                  <div className="ms-auto list-text">1000</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">Integrations</div>
                                  <div className="ms-auto list-text">4+</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">
                                    Stores Per Channel
                                  </div>
                                  <div className="ms-auto list-text">4+</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">Storage</div>
                                  <div className="ms-auto list-text">10gb</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">
                                    Additional Channels
                                  </div>
                                  <div className="ms-auto list-text">
                                    100/channel
                                  </div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">
                                    Multiple Admins
                                  </div>
                                  <div className="ms-auto list-text">5+</div>
                                </div>
                                <div className="card-list-item">
                                  <img
                                    src="images/Ellipse-2.svg"
                                    loading="lazy"
                                    alt=""
                                  />
                                  <div className="list-text">
                                    Monthly Analytics reports
                                  </div>
                                  <div className="ms-auto list-text ">Yes</div>
                                </div>
                              </div>
                              <button
                                className="price-btn card1-cta w-inline-block"
                                onClick={() => {
                                  setPageLoding(true)
                                  setPackage(
                                    mode == "monthly"
                                      ? "m-Supercharge"
                                      : "y-Supercharge"
                                  );
                                  setPackagePrice(
                                    mode == "monthly" ? "480" : "5184"
                                  );
                                  if (!session) {
                                    localStorage.setItem(
                                      "isCheckoutPage",
                                      "checkout"
                                    );
                                    localStorage.setItem(
                                      "package",
                                      mode == "monthly"
                                        ? "m-Supercharge"
                                        : "y-Supercharge"
                                    );
                                    localStorage.setItem(
                                      "packagePrice",
                                      mode == "monthly" ? "480" : "5184"
                                    );
                                    router.push("/sign-in");
                                  } else {
                                    setDispcheckout(true);
                                    window.scrollTo(0, 0);
                                    router.push(
                                      "/pricing",
                                      "/pricing?mode=checkout",
                                      {
                                        shallo: true,
                                      }
                                    );
                                    setPageLoding(false)
                                  }
                                }}
                              >
                                <a className="heading-12">Start free trial</a>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="list-text p-5">
                      * Add more orders to any plan for just $20/100 orders.
                    </div>
                    <hr />
                    <h1 style={{ padding: "6%", alignContent: "center" }}>
                      FAQ's
                    </h1>
                    <div>
                      <Accordion
                        defaultActiveKey="0"
                        style={{ width: "1250px" }}
                      >
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            What if I have an existing ecommerce store?
                          </Accordion.Header>
                          <Accordion.Body>
                            Most Jewelify customers already have an existing
                            ecommerce store. When onboarding, Jewelify
                            intelligently matches products in your POS to your
                            existing site with no danger to your site. Your
                            Onboarding Specialist can provide a detailed
                            matching report of your products to ensure
                            everything will sync successfully.
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>
                            I’ve signed up. What’s next?
                          </Accordion.Header>
                          <Accordion.Body>
                            After signing up, you’ll receive a welcome email
                            with getting started steps. A Jewelify Onboarding
                            Specialist will contact you within 24 hours.
                            Onboarding is complimentary with all plans.
                          </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="2">
                          <Accordion.Header>
                            How long does it take to set up?
                          </Accordion.Header>
                          <Accordion.Body>
                            Jewelify Connect takes about 20 minutes to setup.
                            Scale plan has more options, so your Onboarding
                            Specialist will work with you to tailor to your
                            needs.
                            <br /> The initial sync with your POS usually takes
                            a few hours. If you have a large number of SKUs, the
                            initial sync may take 24-48 hours. Once this initial
                            sync completes, you’ll be able to connect to other
                            platforms.
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                          <Accordion.Header>
                            Can I change my point of sale or ecommerce platform?
                          </Accordion.Header>
                          <Accordion.Body>
                            Yes! Jewelify is designed to give your business
                            flexibility and choice. You can change platforms or
                            upgrade. Our team will assist you in making any
                            transitions. We even offer data migrations and
                            training on many of the systems we support.
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                          <Accordion.Header>
                            Do you offer discounts?
                          </Accordion.Header>
                          <Accordion.Body>
                            Yes, Jewelify offers discounts on multi-year
                            commitments. Contact our team to learn more.
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                          <Accordion.Header>
                            Can I pay monthly?
                          </Accordion.Header>
                          <Accordion.Body>
                            All Jewelify plans require an annual commitment. We
                            offer a monthly billing option for our Connect Plan
                            for an additional $20 per month. This enables us to
                            invest in providing our customers the best possible
                            service, including complimentary onboarding and
                            ongoing support. Order volume on monthly plans is
                            billed monthly.
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="6">
                          <Accordion.Header>
                            What if I go over my allotted Orders?
                          </Accordion.Header>
                          <Accordion.Body>
                            Our hope is that your order volume grows and you
                            sell way more than expected. If you have a massive
                            volume increase one month because you were featured
                            on Google or volume is up consistently for a few
                            months, a Customer Success representative will reach
                            out.
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="7">
                          <Accordion.Header>
                            Are there more plans?
                          </Accordion.Header>
                          <Accordion.Body>
                            We don’t offer partial plans or feature-only
                            options. If you have custom or special needs, they
                            will generally fall under our Supercharge Plan.{" "}
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="8">
                          <Accordion.Header>
                            Can I change my point of sale or ecommerce platform?
                          </Accordion.Header>
                          <Accordion.Body>
                            Yes! Jewelify is designed to give your business
                            flexibility and choice. You can change platforms or
                            upgrade. Our team will assist you in making any
                            transitions. We even offer data migrations and
                            training on many of the systems we support.
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="9">
                          <Accordion.Header
                            style={{ fontSize: "30px", color: "red" }}
                          >
                            Customizations
                          </Accordion.Header>
                          <Accordion.Body>
                            Custom integrations and integration customizations
                            require our Supercharge plan. Just let us know what
                            you are looking for.
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  </div>
                </div>
              )}
              <div className="divider hide" />

              <div className="spacer" />
            </div>
          </div>
          {/* [if lte IE 9]><![endif] */}
        </div>
      )}
    </div>
  );
}
