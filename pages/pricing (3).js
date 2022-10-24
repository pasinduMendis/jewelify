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

export default function Pricing() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [pageloading, setPageLoding] = useState(true);
  const [dispCheckout, setDispcheckout] = useState(false);
  const [packageName, setPackage] = useState("");
  const [packagePrice, setPackagePrice] = useState("");

  useEffect(() => {
    localStorage.setItem("redirect", "/");
    if (status != "loading" && !session) {
      localStorage.setItem("redirect", "/pricing");
      router.push("/sign-in");
      //setPageLoding(false);
    } else if (status == "authenticated") {
      if (session.isPayment) {
        router.push("/inventory");
        //setPageLoding(false);
      } else {
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
        <PricingLoading  />
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
                            "/displayProducts-online"
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
                  className="wrap-pricing lll"
                  style={{ backgroundColor: "#F4FBFF" }}
                >
                  <div className="div-block-9">
                    <h1 className="heading-pricing">Pricing</h1>

                    <div className="div-block-313">
                      <div className="card-1-111">
                        <div className="wrap-card">
                          <h1 className="heading-card1">Basic</h1>
                          <h1 className="heading-14">$99/mo</h1>
                          <p className="paragraph-4">
                            Lorem ipsum dolor sit amet consecr.
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
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                            <div className="card-list-item">
                              <img
                                src="images/Ellipse-2.svg"
                                loading="lazy"
                                alt=""
                              />
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                            <div className="card-list-item">
                              <img
                                src="images/Ellipse-2.svg"
                                loading="lazy"
                                alt=""
                              />
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                            <div className="card-list-item">
                              <img
                                src="images/Ellipse-2.svg"
                                loading="lazy"
                                alt=""
                              />
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                            <div className="card-list-item">
                              <img
                                src="images/Ellipse-2.svg"
                                loading="lazy"
                                alt=""
                              />
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                          </div>
                          <button
                            className="price-btn card1-cta w-inline-block"
                            onClick={() => {
                              setPackage("basic");
                              setPackagePrice("99");
                              setDispcheckout(true);
                              window.scrollTo(0, 0);
                              router.push('/pricing','/pricing?mode=checkout',{shallo:true})
                              
                            }}
                          >
                            <a className="heading-12">Start free trial</a>
                          </button>
                        </div>
                      </div>
                      <div className="card-1-111">
                        <div className="wrap-card">
                          <h1 className="heading-card1">Plus</h1>
                          <h1 className="heading-14">$499/mo</h1>
                          <p className="paragraph-4">
                            Lorem ipsum dolor sit amet consecr.
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
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                            <div className="card-list-item">
                              <img
                                src="images/Ellipse-2.svg"
                                loading="lazy"
                                alt=""
                              />
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                            <div className="card-list-item">
                              <img
                                src="images/Ellipse-2.svg"
                                loading="lazy"
                                alt=""
                              />
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                            <div className="card-list-item">
                              <img
                                src="images/Ellipse-2.svg"
                                loading="lazy"
                                alt=""
                              />
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                            <div className="card-list-item">
                              <img
                                src="images/Ellipse-2.svg"
                                loading="lazy"
                                alt=""
                              />
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                          </div>
                          <button
                            className="price-btn card1-cta w-inline-block"
                            onClick={() => {
                              setPackage("plus");
                              setPackagePrice("499");
                              
                              setDispcheckout(true);
                              window.scrollTo(0, 0);
                              router.push('/pricing','/pricing?mode=checkout',{shallo:true})
                            }}
                          >
                            <a className="heading-12">Start free trial</a>
                          </button>
                        </div>
                      </div>
                      <div className="card-1-111">
                        <div className="wrap-card">
                          <h1 className="heading-card1">Premium</h1>
                          <h1 className="heading-14">$499/mo</h1>
                          <p className="paragraph-4">
                            Lorem ipsum dolor sit amet consecr.
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
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                            <div className="card-list-item">
                              <img
                                src="images/Ellipse-2.svg"
                                loading="lazy"
                                alt=""
                              />
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                            <div className="card-list-item">
                              <img
                                src="images/Ellipse-2.svg"
                                loading="lazy"
                                alt=""
                              />
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                            <div className="card-list-item">
                              <img
                                src="images/Ellipse-2.svg"
                                loading="lazy"
                                alt=""
                              />
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                            <div className="card-list-item">
                              <img
                                src="images/Ellipse-2.svg"
                                loading="lazy"
                                alt=""
                              />
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                          </div>
                          <button
                            className="price-btn card1-cta w-inline-block"
                            onClick={() => {
                              setPackage("Premium");
                              setPackagePrice("499");
                              setDispcheckout(true);
                              window.scrollTo(0, 0);
                              router.push('/pricing','/pricing?mode=checkout',{shallo:true})
                            }}
                          >
                            <a className="heading-12">Start free trial</a>
                          </button>
                        </div>
                      </div>
                      <div className="card-1-111">
                        <div className="wrap-card">
                          <h1 className="heading-card1">Growth</h1>
                          <h1 className="heading-14">$499/mo</h1>
                          <p className="paragraph-4">
                            Lorem ipsum dolor sit amet consecr.
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
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                            <div className="card-list-item">
                              <img
                                src="images/Ellipse-2.svg"
                                loading="lazy"
                                alt=""
                              />
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                            <div className="card-list-item">
                              <img
                                src="images/Ellipse-2.svg"
                                loading="lazy"
                                alt=""
                              />
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                            <div className="card-list-item">
                              <img
                                src="images/Ellipse-2.svg"
                                loading="lazy"
                                alt=""
                              />
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                            <div className="card-list-item">
                              <img
                                src="images/Ellipse-2.svg"
                                loading="lazy"
                                alt=""
                              />
                              <h1 className="list-text">
                                Eget nunc scelerisque viverra
                              </h1>
                            </div>
                          </div>
                          <button
                            className="price-btn card1-cta w-inline-block"
                            onClick={() => {
                              setPackage("Growth");
                              setPackagePrice("499");
                              setDispcheckout(true);
                              window.scrollTo(0, 0);
                              router.push('/pricing','/pricing?mode=checkout',{shallo:true})
                            }}
                          >
                            <a className="heading-12">Start free trial</a>
                          </button>
                        </div>
                      </div>
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
