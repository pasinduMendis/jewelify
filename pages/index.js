import { useSession, signIn, signOut } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import Header2 from "../components/Header2";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function Component() {
  const { data: session, status } = useSession();
  const [pageloading, setPageLoding] = useState(true);

  useEffect(() => {
    localStorage.setItem("redirect", "/");
    if (status != "loading" && !session) {
      /* localStorage.setItem("redirect", "/pricing");
      router.push("/sign-in"); */
      setPageLoding(false);
    } else if (status == "authenticated") {
      setPageLoding(false);
    }
  }, [session]);
  //console.log(session)

    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>Jewelify</title>
          <meta name="description" content />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {pageloading ? (
        <div className=" d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) :
              <div>
        <Header2 />
        <div className="div-block-99-copy">
          <div className="div-block-100">
            <div className="div-block-268">
              <div className="div-block-269"><img src="images/Group-33842.svg" loading="lazy" alt="" /></div>
              <div className="div-block-270">
                <h1 data-w-id="3ea49911-0e1c-cef1-1f4e-9dca6f2caa92" style={{ opacity: 100 }} className="heading-68">Grow your online presence and score more clients with responsive and user-friendly websites.</h1>
                <p data-w-id="cdfd44da-472a-8dc3-0a55-2f0aecfbb11c" style={{ opacity: 100 }} className="paragraph-11">Our specialists create websites that drive users to take action and give your business a competitive edge.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="div-block-130">
          <div className="div-block-273">
            <h1 data-w-id="360b0a97-bbc6-cd00-5fd2-a460adde4506" style={{ opacity: 100 }} className="heading-85">Our 6-Step Process to <br />Create Websites That Sell</h1>
            <p data-w-id="5ebdf14c-3899-7d2c-7197-81a848f98704" style={{ opacity: 100 }} className="paragraph-20">A website is your online identity, and we make it memorable and appealing with these 6 steps.</p>
            <div className="div-block-271">
              <div className="div-block-272"><img src="images/Group-1000001941.svg" loading="lazy" alt="" className="image-74" />
                <div className="text-block-16">STEP 1</div>
                <div className="text-block-17">Consultation</div>
                <div className="text-block-18">We discuss your website requirements and suggest a feasible action plan</div>
              </div>
              <div className="div-block-272"><img src="images/Group-1000001942.svg" loading="lazy" alt="" className="image-74" />
                <div className="text-block-16">STEP 2</div>
                <div className="text-block-17">Research &amp; Planing</div>
                <div className="text-block-18">Our experts research your competitors and brainstorm creative solutions to make your website stand apart</div>
              </div>
              <div className="div-block-272"><img src="images/Group-1000001943.svg" loading="lazy" alt="" className="image-74" />
                <div className="text-block-16">STEP 3</div>
                <div className="text-block-17">Design &amp; Prototyping</div>
                <div className="text-block-18">We create a demo to show you what the final website will look like early into the process</div>
              </div>
            </div>
          </div>
        </div>
        <div className="div-block-137-copy">
          <div className="div-block-286">
            <h1 data-w-id="b96682c0-cadb-1256-0b10-6767cb197d1f" style={{ opacity: 100 }} className="heading-85">Never miss a customer because of a poorly designed website</h1>
            <div className="div-block-274">
              <div id="w-node-f6eece58-d657-a5a7-5424-726f8b646c08-1229d420" className="div-block-275">
                <div><img src="images/ic_outline-diamond_1.svg" loading="lazy" alt="" className="image-71" /></div>
                <div className="div-block-276">
                  <div className="text-block-19">Blazing fast</div>
                  <div className="text-block-20">Get more traffic and leads from search engines with websites that load in a jiffy</div>
                </div>
              </div>
              <div id="w-node-_725bd43d-5503-87b6-f3d3-44a6396dab66-1229d420" className="div-block-275">
                <div><img src="images/Frame_1.svg" loading="lazy" alt="" className="image-71" /></div>
                <div className="div-block-276">
                  <div className="text-block-19">Responsive Design</div>
                  <div className="text-block-20">With websites that look good on all devices, you stay connected with your customers 24 x 7</div>
                </div>
              </div>
              <div id="w-node-e9a39a75-be9b-9815-ea91-9753c90d38a7-1229d420" className="div-block-275">
                <div><img src="images/Frame-1_1.svg" loading="lazy" alt="" className="image-71" /></div>
                <div className="div-block-276">
                  <div className="text-block-19">Excellent User Experience</div>
                  <div className="text-block-20">Bespoke websites that fulfill users’ needs and keep them coming back for more</div>
                </div>
              </div>
              <div id="w-node-b1522007-e272-133e-b046-bbc104d28a00-1229d420" className="div-block-275">
                <div><img src="images/Frame-2_1.svg" loading="lazy" alt="" className="image-71" /></div>
                <div className="div-block-276">
                  <div className="text-block-19">Take your Shop Online</div>
                  <div className="text-block-20">Stunning eCommerce websites that direct potential users to make a purchase</div>
                </div>
              </div>
              <div id="w-node-_3d0cb7fb-d86d-8242-6e29-c2d5bec03c5f-1229d420" className="div-block-275">
                <div><img src="images/Frame-3.svg" loading="lazy" alt="" className="image-71" /></div>
                <div className="div-block-276">
                  <div className="text-block-19">WordPress Websites</div>
                  <div className="text-block-20">Clean and beautiful websites that help you establish an online presence within a short time</div>
                </div>
              </div>
              <div id="w-node-_07c6e425-6c6c-face-5495-cbfdbabb9e77-1229d420" className="div-block-275">
                <div><img src="images/Frame-4.svg" loading="lazy" alt="" className="image-71" /></div>
                <div className="div-block-276">
                  <div className="text-block-19">Long-term Strategy</div>
                  <div className="text-block-20">Websites that help you meet your long-term goals without going through infinite redesigns</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="div-block-141 rev">
          <h1 data-w-id="0e89c597-86ec-051e-36b4-2dd145164bc4" style={{ opacity: 100 }} className="heading-85">Our Recent Projects</h1>
          <div className="div-block-277">
            <div data-delay={4000} data-animation="slide" className="slider-3 w-slider" data-autoplay="false" data-easing="ease" data-hide-arrows="false" data-disable-swipe="false" data-autoplay-limit={0} data-nav-spacing={3} data-duration={500} data-infinite="true">
              <div className="w-slider-mask">
                <div className="w-slide">
                  <div className="div-block-278">
                    <div className="div-block-279">
                      <div className="div-block-280"><img src="images/Rectangle-13_1.png" loading="lazy" srcSet="images/Rectangle-13_1-p-500.png 500w, images/Rectangle-13_1.png 696w" sizes="100vw" alt="" /></div>
                      <div className="div-block-281">
                        <div className="text-block-21">POSNOW CMS based <br />Business Website</div>
                        <div className="rich-text-block-4 w-richtext">
                          <ul role="list">
                            <li>Device optimized with quality code</li>
                            <li>Web App for both OS, Android/iOS</li>
                            <li>Minimum/Maximum order limit</li>
                            <li>Blog integration and CMS training</li>
                            <li>Newsletter Subscriber</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-slide">
                  <div className="div-block-278">
                    <div className="div-block-279">
                      <div className="div-block-280"><img src="images/Rectangle-13_1.png" loading="lazy" srcSet="images/Rectangle-13_1-p-500.png 500w, images/Rectangle-13_1.png 696w" sizes="100vw" alt="" /></div>
                      <div className="div-block-281">
                        <div className="text-block-21">POSNOW CMS based <br />Business Website</div>
                        <div className="rich-text-block-4 w-richtext">
                          <ul role="list">
                            <li>Device optimized with quality code</li>
                            <li>Web App for both OS, Android/iOS</li>
                            <li>Minimum/Maximum order limit</li>
                            <li>Blog integration and CMS training</li>
                            <li>Newsletter Subscriber</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="left-arrow-3 w-slider-arrow-left">
                <div className="icon-9 w-icon-slider-left" />
              </div>
              <div className="right-arrow-3 w-slider-arrow-right">
                <div className="icon-8 w-icon-slider-right" />
              </div>
              <div className="slide-nav-2 w-slider-nav w-round" />
            </div>
          </div>
        </div>
        <div className="div-block-287">
          <div className="div-block-145">
            <div className="div-block-141">
              <div className="div-block-282">
                <div className="div-block-284">
                  <h1 data-w-id="81ac70dc-fe54-5853-53cc-f23db096dea7" style={{ opacity: 100 }} className="heading-85-copy">BOPIS – Buy Online, Pick-Up in Store</h1>
                  <div className="text-block-20">Eliminate queues and waiting time to deliver a great shopping experience.<br /><br />The BOPIS option allows shoppers to purchase items online and pick them up from the store while also driving more foot traffic to your retail store.<br /><br />Octopus Channel Manager integrates eCommerce with POS. Product information is quickly updated on the website and order information is updated in POS helping you set up a seamless BOPIS system.</div>
                </div>
                <div className="div-block-283"><img src="images/Rectangle-13_1.png" loading="lazy" srcSet="images/Rectangle-13_1-p-500.png 500w, images/Rectangle-13_1.png 696w" sizes="100vw" alt="" className="image-72" /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="div-block-151">
          <h1 data-w-id="34b4c790-f0c9-5397-f6d8-e97f4bae5864" style={{ opacity: 100 }} className="heading-85">eCommerce Web Design and Development</h1>
          <div className="div-block-150">
            <div className="div-block-152">
              <h1 data-w-id="c248ab9d-4752-9340-1804-05229661ada7" style={{ opacity: 100 }} className="heading-94">24SevenCommerce uses the latest technology and the expertise of a specialist team to provide the right website design needed to attract potential customers and build your brand.</h1>
              <div className="rich-text-block-4 w-richtext">
                <ul role="list">
                  <li>Modify your website according to requirements.</li>
                  <li>Manage content without any technical expertise.</li>
                  <li>Grow your business and brand with user-friendly and search-engine friendly websites.</li>
                  <li>Never worry about missing sales because of poorly formatted websites that don’t provide a great user experience across devices</li>
                </ul>
              </div>
            </div>
            <div className="div-block-153"><img src="images/Group-701.png" loading="lazy" style={{ opacity: 100 }} data-w-id="a0339426-7fec-422d-3857-af9e0c06836d" alt="" className="image-46" /><img src="images/Group-1000001944.svg" loading="lazy" style={{ opacity: 100 }} data-w-id="15f432d1-b0b8-3fa3-6f5d-a4d9005923ea" alt="" className="image-46 mob" /></div>
          </div>
        </div>
        <div className="div-block-287">
          <div className="div-block-145">
            <h1 data-w-id="63209e2a-0a58-5b42-b791-c8626fb300e5" style={{ opacity: 100 }} className="heading-85">Fulfill all your eCommerce needs with a Single Click</h1>
            <p data-w-id="d1baab0a-09e5-c089-2272-2a0578891d56" style={{ opacity: 100 }} className="paragraph-20">Let us know your requirements and relax as we develop creative ways to meet all your eCommerce needs.</p>
            <div className="div-block-285">
              <a  className="button-130 w-button">Standard eCommerce Website</a>
              <a  className="button-131 w-button">Add on Features</a>
            </div>
            <div className="div-block-141">
              <div className="div-block-282 aaa">
                <div className="div-block-284">
                  <div className="rich-text-block-4 w-richtext">
                    <ul role="list">
                      <li>Mobile Ready Ultra Responsive Store</li>
                      <li>10-20 Pages Setup , Account, Shop, Cart, Checkout etc.</li>
                      <li>Custom layout and functionality to match your business requirement</li>
                      <li>Ajax Product Filters and Attributes Setup</li>
                      <li>Product Brands Filter Setup</li>
                      <li>Integration of highly secure payment gateways like PayPal, Authorize.net, Secure Pay, etc.</li>
                      <li>Dashboard Training For better understanding of your CMS to manage Products</li>
                    </ul>
                  </div>
                </div>
                <div className="div-block-283"><img src="images/Group-33801.svg" loading="lazy" alt="" className="image-72" /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="div-block-154">
          <h1 data-w-id="e9baafe8-948e-5d9b-81e9-33d3ca37ea00" style={{ opacity: 100 }} className="heading-95">Budget-Friendly Pricing Plans</h1>
          <p data-w-id="6fb05277-dbe0-10d8-8ee0-18fe0a9e1406" style={{ opacity: 100 }} className="paragraph-26">We have a plan for every budget. Scale and upgrade your plan as you grow. Explore our different pricing plans to select the one that fits your needs and budget.</p>
          <div className="div-block-155">
            <div data-w-id="324a6ab7-b6ed-c9cd-c18a-ae013ce872f5" style={{ opacity: 100 }} className="div-block-156">
              <h3 className="heading-97">Basic</h3>
              <h3 className="heading-98">$99/mo</h3>
              <h3 className="heading-99">Lorem ipsum dolor sit amet consectetur.</h3>
              <div className="div-block-159" />
              <h3 className="heading-100">What’s included</h3>
              <div className="div-block-160"><img src="images/Ellipse-2.svg" loading="lazy" alt="" className="image-44" />
                <h1 className="heading-96">Eget nunc scelerisque viverra</h1>
              </div>
              <div className="div-block-160"><img src="images/Ellipse-2.svg" loading="lazy" alt="" className="image-44" />
                <h1 className="heading-96">Mauris in aliquam</h1>
              </div>
              <div className="div-block-160"><img src="images/Ellipse-2.svg" loading="lazy" alt="" className="image-44" />
                <h1 className="heading-96">Nunc faucibus a pellentesque sit</h1>
              </div>
              <div className="div-block-160"><img src="images/Ellipse-2.svg" loading="lazy" alt="" className="image-44" />
                <h1 className="heading-96">Ut sem viverra aliquet</h1>
              </div>
              <div className="div-block-160"><img src="images/Ellipse-2.svg" loading="lazy" alt="" className="image-44" />
                <h1 className="heading-96">Pretium vulputate sapien</h1>
              </div>
            </div>
            <div data-w-id="1db55053-05ab-52ba-2617-f76cb4b63ba7" style={{ opacity: 100 }} className="div-block-157">
              <h3 className="heading-97">Pro</h3>
              <h3 className="heading-98">$499/mo</h3>
              <h3 className="heading-99">Lorem ipsum dolor sit amet consectetur.</h3>
              <div className="div-block-159" />
              <h3 className="heading-100">Everything in basic +</h3>
              <div className="div-block-160"><img src="images/Ellipse-2.svg" loading="lazy" alt="" className="image-44" />
                <h1 className="heading-96">Eget nunc scelerisque viverra</h1>
              </div>
              <div className="div-block-160"><img src="images/Ellipse-2.svg" loading="lazy" alt="" className="image-44" />
                <h1 className="heading-96">Mauris in aliquam</h1>
              </div>
              <div className="div-block-160"><img src="images/Ellipse-2.svg" loading="lazy" alt="" className="image-44" />
                <h1 className="heading-96">Nunc faucibus a pellentesque sit</h1>
              </div>
              <div className="div-block-160"><img src="images/Ellipse-2.svg" loading="lazy" alt="" className="image-44" />
                <h1 className="heading-96">Ut sem viverra aliquet</h1>
              </div>
              <div className="div-block-160"><img src="images/Ellipse-2.svg" loading="lazy" alt="" className="image-44" />
                <h1 className="heading-96">Pretium vulputate sapien</h1>
              </div>
            </div>
            <div data-w-id="f140d739-95d7-2c5c-d39d-00a19e9e00fc" style={{ opacity: 100 }} className="div-block-156">
              <h3 className="heading-97">Professional</h3>
              <a  className="link-block-20 w-inline-block">
                <h1 className="heading-101">Get in Touch</h1><img src="images/Vector-4_1.svg" loading="lazy" alt="" />
              </a>
              <h3 className="heading-99">Lorem ipsum dolor sit amet consectetur.</h3>
              <div className="div-block-159" />
              <h3 className="heading-100">Everything in Pro +</h3>
              <div className="div-block-160"><img src="images/Ellipse-2.svg" loading="lazy" alt="" className="image-44" />
                <h1 className="heading-96">Eget nunc scelerisque viverra</h1>
              </div>
              <div className="div-block-160"><img src="images/Ellipse-2.svg" loading="lazy" alt="" className="image-44" />
                <h1 className="heading-96">Mauris in aliquam</h1>
              </div>
              <div className="div-block-160"><img src="images/Ellipse-2.svg" loading="lazy" alt="" className="image-44" />
                <h1 className="heading-96">Nunc faucibus a pellentesque sit</h1>
              </div>
              <div className="div-block-160"><img src="images/Ellipse-2.svg" loading="lazy" alt="" className="image-44" />
                <h1 className="heading-96">Ut sem viverra aliquet</h1>
              </div>
              <div className="div-block-160"><img src="images/Ellipse-2.svg" loading="lazy" alt="" className="image-44" />
                <h1 className="heading-96">Pretium vulputate sapien</h1>
              </div>
            </div>
          </div>
          <h1 data-w-id="c5276b5f-6b69-ef04-7782-5bb6cadf6bb8" style={{ opacity: 100 }} className="heading-85">Website Design &amp; Development - Pricing Options</h1>
          <div className="content-wrap">
            <div data-w-id="eca8a7b6-d5dd-f80b-442e-38bbc43f5d51" style={{ opacity: 100 }} className="card-1">
              <div>
                <div className="wrap-card">
                  <h1 className="heading-card1">Bronze</h1>
                  <h1 className="heading-14">Starting at $3,500</h1>
                  <p className="paragraph-4">Starting &nbsp;at $250/mo</p>
                  <div className="text-block-23">Predesigned theme and customize it with your desired colors, fonts, images, text, navigation, page options, and more. All home pages are prebuilt with extensive features.</div>
                  <div className="line" />
                  <div className="text-block-23">Note: All tier can be Modified from Standard Pricing Structure to fit customer needs @120/hr</div>
                </div>
                <div className="wrap2-card">
                  <h1 className="list-title">WEBSITE CUSTOMIZATION</h1>
                  <div className="list-wrap">
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Color Scheme</h1>
                    </div>
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Fonts &amp; Typography</h1>
                    </div>
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Slider Content</h1>
                    </div>
                  </div>
                </div>
              </div>
              <a  className="card1-cta w-inline-block">
                <h1 className="heading-12">SEE&nbsp;MORE</h1><img loading="lazy" src="images/Vector-4.svg" alt="" />
              </a>
            </div>
            <div data-w-id="64241f97-7c28-a157-d1c1-2bd449d4ad47" style={{ opacity: 100 }} className="card-1">
              <div>
                <div className="wrap-card">
                  <h1 className="heading-card1">Silver</h1>
                  <h1 className="heading-14">Starting $6,500</h1>
                  <p className="paragraph-4">Starting &nbsp;at $250/mo</p>
                  <div className="text-block-23">Customized website with fully custom hompage Everything in the bronze package, plus one-on-one collaboration with our in-house design team, mix and match components from other Jewelry Stores to create a unique website.</div>
                  <div className="line" />
                  <div className="text-block-23">Note: All tier can be Modified from Standard Pricing Structure to fit customer needs @120/hr</div>
                </div>
                <div className="wrap2-card">
                  <h1 className="list-title">WEBSITE CUSTOMIZATION</h1>
                  <div className="list-wrap">
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Color Scheme</h1>
                    </div>
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Fonts &amp; Typography</h1>
                    </div>
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Slider Content</h1>
                    </div>
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Widget Imagery</h1>
                    </div>
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Header Layout</h1>
                    </div>
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Footer Layout</h1>
                    </div>
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Homepage</h1>
                    </div>
                  </div>
                </div>
              </div>
              <a  className="card1-cta w-inline-block">
                <h1 className="heading-12">SEE&nbsp;MORE</h1><img loading="lazy" src="images/Vector-4.svg" alt="" />
              </a>
            </div>
            <div data-w-id="f7a81945-79af-9c4a-9229-30da96fb3092" style={{ opacity: 100 }} className="card-1 border">
              <div>
                <div className="wrap-card">
                  <h1 className="heading-card1">Gold</h1>
                  <h1 className="heading-14">Starting $10,000</h1>
                  <p className="paragraph-4">Starting &nbsp;at $250/mo</p>
                  <div className="text-block-23">Fully custom website with custom interior pages. Our Gold package is custom and is designed for those who want to work with our team to shape and form all the subtieties and details of their website in order to create an ultimate reflection of their business.</div>
                  <div className="line" />
                  <div className="text-block-23">Note: All tier can be Modified from Standard Pricing Structure to fit customer needs @120/hr</div>
                </div>
                <div className="wrap2-card">
                  <h1 className="list-title">WEBSITE CUSTOMIZATION</h1>
                  <div className="list-wrap">
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Color Scheme</h1>
                    </div>
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Fonts &amp; Typography</h1>
                    </div>
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Slider Content</h1>
                    </div>
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Widget Imagery</h1>
                    </div>
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Header Layout</h1>
                    </div>
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Footer Layout</h1>
                    </div>
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Homepage</h1>
                    </div>
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Navigation</h1>
                    </div>
                    <div className="card-list-item"><img loading="lazy" src="images/Ellipse-2.svg" alt="" />
                      <h1 className="list-text">Animation Effects</h1>
                    </div>
                  </div>
                </div>
              </div>
              <a  className="card1-cta w-inline-block">
                <h1 className="heading-12">SEE&nbsp;MORE</h1><img loading="lazy" src="images/Vector-4.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
        <Footer />
        {/* [if lte IE 9]><![endif] */}
      </div>}
      </div>
  
    )


}