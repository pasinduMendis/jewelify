/* eslint-disable @next/next/no-html-link-for-pages */
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createImageFromInitials } from "../custom/createprofilePic";
import Dropdown from 'react-bootstrap/Dropdown';

export default function Pricing() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [pageloading, setPageLoding] = useState(true);

  useEffect(() => {
    localStorage.setItem("redirect", "/");
    if (status != "loading" && !session) {
      localStorage.setItem("redirect", "/pricing");
      router.push("/sign-in");
      setPageLoding(false);
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
        <meta name="description" content />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Add your site or application content here */}
      {pageloading ? (
        <div className=" d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
        <div className="div-block-314 tab">
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
                            "/pricing"
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
        <div className="div-block-320">
          <div className="div-block-321"><img src="images/bx_menu.svg" loading="lazy" alt="" /></div><img src="images/Jewelify.svg" loading="lazy" alt="" className="image-83" />
        </div>
        <div className="div-block-310">
          <div className="div-block-311">
            <div className="div-block-316">
              <div className="div-block-317"><img src="images/Jewelify.svg" loading="lazy" alt="" /></div>
              <div className="div-block-319">
                {/* <a  className="link-block-31 w-inline-block">
                  <div className="div-block-318"><img src="images/Vector_4.svg" loading="lazy" alt="" className="image-82" />
                    <div className="text-block-33">Dashboard</div>
                  </div>
                </a> */}
                <a onClick={()=>router.push('/inventory')} className="link-block-31 w-inline-block">
                  <div className="div-block-318"><img src="images/mdi_monetization_on.svg" loading="lazy" alt="" className="image-82" />
                    <div className="text-block-33">Inventory</div>
                  </div>
                </a>
                {/* <a  className="link-block-31 w-inline-block">
                  <div className="div-block-318"><img src="images/mdi_assessment.svg" loading="lazy" alt="" className="image-82" />
                    <div className="text-block-33">Analytics</div>
                  </div>
                </a> */}
                <a href="/e-commerce" className="link-block-31 highlight w-inline-block">
                  <div className="div-block-318"><img src="images/mdi_monetization_on-1.svg" loading="lazy" width={18} alt="" className="image-82" />
                    <div className="text-block-33 highlight">Integrations</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="div-block-316">
              <a onClick={()=>router.push('/setting')} className="link-block-31 w-inline-block">
                <div className="div-block-318"><img src="images/outline-settings-1.svg" loading="lazy" alt="" className="image-82" />
                  <div className="text-block-33">Settings</div>
                </div>
              </a>
            </div>
          </div>
          <div className="div-block-312">
            <div className="div-block-314">
              <div className="div-block-315">
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
            <div className="wrap-pricing lll">
              <div className="div-block-9">
                <h1 className="heading-pricing">Pricing</h1>
                <h3 className="heading-107">Connecting your retail is<br />as easy as 1-2-3</h3>
                <p className="text-pricing">Setup is intuitive using our step-by-step process that helps ensure you’ll be up and syncing in no time! And in case you need a little help, we’re always here to give an extra hand.</p>
                <div className="div-block-299 hide" />
                <div className="div-block-175">
                  <div className="div-block-176">
                    <div className="div-block-178 li-1"><img src="images/Group-33670.png" loading="lazy" alt="" className="image-54" />
                      <h1 className="heading-108">Connect</h1>
                    </div>
                    <p className="paragraph-27">Connect your POS system and eCommerce platformS to Jewelify with just a few clicks.</p>
                  </div>
                  <div className="div-block-176">
                    <div className="div-block-178"><img src="images/Group-33670-1.png" loading="lazy" alt="" className="image-54" />
                      <h1 className="heading-108">LINK</h1>
                    </div>
                    <p className="paragraph-27">Run a link report to resolve any data duplicates found between your POS and eCom inventories. This can be a real time-saver when checking for inaccuracies</p>
                  </div>
                  <div className="div-block-176">
                    <div className="div-block-178"><img src="images/Group-33670-2.png" loading="lazy" alt="" className="image-54" />
                      <h1 className="heading-108">SYNC</h1>
                    </div>
                    <p className="paragraph-27">Now Jewelify is running in the background, automatically updating your online and physical inventory in real-time. Stay updated via the Jewelify dashboard or by receiving a daily sync report via email. Be notified when stock limits are low.</p>
                  </div>
                </div>
                <div data-current="Tab 2" data-easing="ease" data-duration-in={300} data-duration-out={100} className="tabs-3 w-tabs">
                  <div className="tabs-menu w-tab-menu">
                    <a data-w-tab="Tab 1" className="tab-link-tab-1 w-inline-block w-tab-link">
                      <div>Monthly</div>
                    </a>
                    <a data-w-tab="Tab 2" className="tab-link-tab-2 w-inline-block w-tab-link w--current">
                      <div>Yearly</div>
                    </a>
                  </div>
                  <div className="w-tab-content">
                    <div data-w-tab="Tab 1" className="w-tab-pane">
                      <div className="content-wrap">
                        <div className="card-1">
                          <div className="wrap-card">
                            <h1 className="heading-card1">Basic 1234</h1>
                            <h1 className="heading-14">$99/mon</h1>
                            <p className="paragraph-4">Lorem ipsum dolor sit amet consecr.</p>
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
                            
                            <button className="price-btn card1-cta w-inline-block">
                                 
                                 <Link
                                   href={{
                                     pathname: "/checkout",
                                     query: {package:'99',packageName:'basic'},
                                   }}
                                 >
                                  <h1 className="heading-12">Start free trial</h1>
                                 </Link>
                               
                             </button>
                            
                          </div>
                        </div>
                        <div className="card-2">
                          <div className="wrap-card">
                            <h1 className="heading-card1">Plus</h1>
                            <h1 className="heading-14">$499/mo</h1>
                            <p className="paragraph-4">Lorem ipsum dolor sit amet consecr.</p>
                            <div className="line" />
                          </div>
                          <div className="wrap2-card">
                            <h1 className="list-title">Everything in basic +</h1>
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
                            <button className="price-btn card1-cta w-inline-block">
                                 
                                 <Link
                                   href={{
                                     pathname: "/checkout",
                                     query: {package:'499',packageName:'Plus'},
                                   }}
                                 >
                                  <h1 className="heading-12">Start free trial</h1>
                                 </Link>
                               
                             </button>
                          </div>
                        </div>
                        <div className="card-3">
                          <div className="wrap-card">
                            <h1 className="heading-card1">Growth</h1>
                            <h1 className="heading-14">$499/mo</h1>
                            <p className="paragraph-4">Lorem ipsum dolor sit amet consecr.</p>
                            <div className="line" />
                          </div>
                          <div className="wrap2-card">
                            <h1 className="list-title">Everything in Pro +</h1>
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
                            <button className="price-btn card1-cta w-inline-block">
                                 
                                 <Link
                                   href={{
                                     pathname: "/checkout",
                                     query: {package:'499',packageName:'Growth'},
                                   }}
                                 >
                                  <h1 className="heading-12">Start free trial</h1>
                                 </Link>
                               
                             </button>
                          </div>
                        </div>
                        <div className="card-3">
                          <div className="wrap-card">
                            <h1 className="heading-card1">Premium</h1>
                            <h1 className="heading-14">$499/mo</h1>
                            <p className="paragraph-4">Lorem ipsum dolor sit amet consecr.</p>
                            <div className="line" />
                          </div>
                          <div className="wrap2-card">
                            <h1 className="list-title">Everything in Pro +</h1>
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
                            <button className="price-btn card1-cta w-inline-block">
                                 
                                 <Link
                                   href={{
                                     pathname: "/checkout",
                                     query: {package:'499',packageName:'Premium'},
                                   }}
                                 >
                                  <h1 className="heading-12">Start free trial</h1>
                                 </Link>
                               
                             </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-w-tab="Tab 2" className="w-tab-pane w--tab-active">
                      <div className="content-wrap hide">
                        <div className="card-1">
                          <div className="wrap-card">
                            <h1 className="heading-card1">Basic</h1>
                            <h1 className="heading-14">$99/mo</h1>
                            <p className="paragraph-4">Lorem ipsum dolor sit amet consecr.</p>
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
                            <button className="price-btn card1-cta w-inline-block">
                                 
                                 <Link
                                   href={{
                                     pathname: "/checkout",
                                     query: {package:'99',packageName:'basic'},
                                   }}
                                 >
                                  <h1 className="heading-12">Start free trial</h1>
                                 </Link>
                               
                             </button>
                          </div>
                        </div>
                        <div className="card-2">
                          <div className="wrap-card">
                            <h1 className="heading-card1">Plus</h1>
                            <h1 className="heading-14">$499/mo</h1>
                            <p className="paragraph-4">Lorem ipsum dolor sit amet consecr.</p>
                            <div className="line" />
                          </div>
                          <div className="wrap2-card">
                            <h1 className="list-title">Everything in basic +</h1>
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
                            <button className="price-btn card1-cta w-inline-block">
                                 
                                 <Link
                                   href={{
                                     pathname: "/checkout",
                                     query: {package:'499',packageName:'Plus'},
                                   }}
                                 >
                                  <h1 className="heading-12">Start free trial</h1>
                                 </Link>
                               
                             </button>
                          </div>
                        </div>
                        <div className="card-3">
                          <div className="wrap-card">
                            <h1 className="heading-card1">Growth</h1>
                            <h1 className="heading-14">$499/mo</h1>
                            <p className="paragraph-4">Lorem ipsum dolor sit amet consecr.</p>
                            <div className="line" />
                          </div>
                          <div className="wrap2-card">
                            <h1 className="list-title">Everything in Pro +</h1>
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
                            <button className="price-btn card1-cta w-inline-block">
                                 
                                 <Link
                                   href={{
                                     pathname: "/checkout",
                                     query: {package:'499',packageName:'Growth'},
                                   }}
                                 >
                                  <h1 className="heading-12">Start free trial</h1>
                                 </Link>
                               
                             </button>
                          </div>
                        </div>
                        <div className="card-3">
                          <div className="wrap-card">
                            <h1 className="heading-card1">Premium</h1>
                            <h1 className="heading-14">$499/mo</h1>
                            <p className="paragraph-4">Lorem ipsum dolor sit amet consecr.</p>
                            <div className="line" />
                          </div>
                          <div className="wrap2-card">
                            <h1 className="list-title">Everything in Pro +</h1>
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
                            <button className="price-btn card1-cta w-inline-block">
                                 
                                 <Link
                                   href={{
                                     pathname: "/checkout",
                                     query: {package:'499',packageName:'Premium'},
                                   }}
                                 >
                                  <h1 className="heading-12">Start free trial</h1>
                                 </Link>
                               
                             </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="div-block-313">
                  <div className="card-1-111">
                    <div className="wrap-card">
                      <h1 className="heading-card1">Basic</h1>
                      <h1 className="heading-14">$99/mo</h1>
                      <p className="paragraph-4">Lorem ipsum dolor sit amet consecr.</p>
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
                      <button className="price-btn card1-cta w-inline-block">
                                 
                                    <Link
                                      href={{
                                        pathname: "/checkout",
                                        query: {package:'99',packageName:'basic'},
                                      }}
                                    >
                                     <h1 className="heading-12">Start free trial</h1>
                                    </Link>
                                  
                                </button>
                    </div>
                  </div>
                  <div className="card-1-111">
                    <div className="wrap-card">
                      <h1 className="heading-card1">Plus</h1>
                      <h1 className="heading-14">$499/mo</h1>
                      <p className="paragraph-4">Lorem ipsum dolor sit amet consecr.</p>
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
                      <button className="price-btn card1-cta w-inline-block">
                                 
                                 <Link
                                   href={{
                                     pathname: "/checkout",
                                     query: {package:'499',packageName:'Plus'},
                                   }}
                                 >
                                  <h1 className="heading-12">Start free trial</h1>
                                 </Link>
                               
                             </button>
                    </div>
                  </div>
                  <div className="card-1-111">
                    <div className="wrap-card">
                      <h1 className="heading-card1">Premium</h1>
                      <h1 className="heading-14">$499/mo</h1>
                      <p className="paragraph-4">Lorem ipsum dolor sit amet consecr.</p>
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
                       <button className="price-btn card1-cta w-inline-block">
                                 
                                    <Link
                                      href={{
                                        pathname: "/checkout",
                                        query: {package:'499',packageName:'Premium'},
                                      }}
                                    >
                                     <h1 className="heading-12">Start free trial</h1>
                                    </Link>
                                  
                                </button>
                    </div>
                  </div>
                  <div className="card-1-111">
                    <div className="wrap-card">
                      <h1 className="heading-card1">Growth</h1>
                      <h1 className="heading-14">$499/mo</h1>
                      <p className="paragraph-4">Lorem ipsum dolor sit amet consecr.</p>
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
                      <button className="price-btn card1-cta w-inline-block">
                                 
                                 <Link
                                   href={{
                                     pathname: "/checkout",
                                     query: {package:'499',packageName:'Growth'},
                                   }}
                                 >
                                  <h1 className="heading-12">Start free trial</h1>
                                 </Link>
                               
                             </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="divider hide" />
            <div className="section2-pricing">
              <h1 className="section2-pricing-title">Some of our trusted clients</h1><img src="images/Frame-16.png" loading="lazy" srcSet="images/Frame-16-p-500.png 500w, images/Frame-16-p-800.png 800w, images/Frame-16.png 1010w" sizes="(max-width: 767px) 100vw, (max-width: 991px) 84vw, (max-width: 1439px) 74vw, 950px" alt="" className="img-brands" /><img src="images/Group-33651.png" loading="lazy" alt="" className="image-6" />
            </div>
            <div className="section-3">
              <div className="wrap-section3-pricing">
                <div className="column-1-pricing">
                  <h1 className="heading-15">Excepteur sint occaecat cupidatat.</h1>
                  <p className="text-section-3">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.</p>
                  <a  className="cta-section-3-pricing w-inline-block"><img src="images/Group-5.svg" loading="lazy" alt="" />
                    <h1 className="heading-16">Discover what make us different</h1>
                  </a>
                </div>
                <div className="column-2-pricing"><img src="images/illustration-woman_e68f0666f7b3d03ab7bc410221bddfb0.png" loading="lazy" alt="" className="image-5" /></div>
              </div>
            </div>
            <div className="spacer" />
          </div>
        </div>
        {/* [if lte IE 9]><![endif] */}
      </div>)}
    </div>
  );
}
