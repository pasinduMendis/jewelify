/* eslint-disable @next/next/no-html-link-for-pages */
import { useSession, signIn, signOut } from "next-auth/react";
import Head from 'next/head'
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { createImageFromInitials } from '../custom/createprofilePic';
import Dropdown from 'react-bootstrap/Dropdown';



const Setting = ({ data }) => {
    const { data: session, status } = useSession();
    const [pageloading, setPageLoding] = useState(true);
    const router = useRouter();
    useEffect(() => {
        localStorage.setItem("redirect", "/");
        if (status != "loading" && !session) {
          localStorage.setItem("redirect", "/setting");
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
        <div className="div-block-322 tab">
          <div><img src="images/Jewelify-1.svg" loading="lazy" alt="" /></div>
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
                            "/setting"
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
        <div className="div-block-323">
          <div className="div-block-324"><img src="images/bx_menu.svg" loading="lazy" alt="" /></div><img src="images/Jewelify.svg" loading="lazy" alt="" className="image-84" />
        </div>
        <div className="div-block-327">
        <div className="div-block-325">
            <div className="div-block-316">
              <div className="div-block-326"><img src="images/Jewelify.svg" loading="lazy" alt="" /></div>
              <div className="div-block-319">
                {/* <a  className="link-block-31 w-inline-block">
                  <div className="div-block-315"><img src="images/Vector_4.svg" loading="lazy" alt="" className="image-85" />
                    <div className="text-block-34">Dashboard</div>
                  </div>
                </a> */}
                <div className="link-block-31 w-inline-block" onClick={()=>router.push("/inventory")}>
                  <div className="div-block-315"><img src="images/mdi_monetization_on.svg" loading="lazy" alt="" className="image-85" />
                    <div className="text-block-34">Inventory</div>
                  </div>
                </div>
                {/* <a  className="link-block-31 w-inline-block">
                  <div className="div-block-315"><img src="images/mdi_assessment.svg" loading="lazy" alt="" className="image-85" />
                    <div className="text-block-34">Analytics</div>
                  </div>
                </a> */}
                <div onClick={()=>router.push("/e-commerce")} className="link-block-31 w-inline-block">
                  <div className="div-block-315"><img src="images/mdi_monetization_on_1.svg" loading="lazy" width={18} alt="" className="image-85" />
                    <div className="text-block-34">Integrations</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="div-block-316">
              <div onClick={()=>router.push("/setting")} className="link-block-31 highlight w-inline-block">
                <div className="div-block-315"><img src="images/mdi_assessment_1.svg" loading="lazy" alt="" className="image-85" />
                  <div className="text-block-34 highlight">Settings</div>
                </div>
              </div>
            </div>
          </div>
          <div className="div-block-328 aaa">
            <div className="div-block-322">
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
                            "/setting"
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
            <div className="div-block-343">
              <h1 className="heading-149">Settings</h1>
              <div className="aaaaaa">
                <button id="w-node-_3dd7b024-3ed6-26e3-7b1e-17e4e13d8c6c-72a047ea" className="div-block-351" onClick={()=>router.push('/setting-profile')}><img src="images/gg_profile_1.svg" loading="lazy" alt="" className="image-90" />
                  <div className="text-block-41">Profile Information</div>
                </button>
                <div id="w-node-_3ab59399-2ce7-c97f-e717-f57f4165b384-72a047ea" className="div-block-351"><img src="images/fluent_payment-32-regular_1.svg" loading="lazy" alt="" className="image-90" />
                  <div className="text-block-41">Payment Information</div>
                </div>
                <div id="w-node-_50c97624-4218-389b-4e98-ce2f8a8d080c-72a047ea" className="div-block-351"><img src="images/carbon_notification-new.svg" loading="lazy" alt="" className="image-90" />
                  <div className="text-block-41">Notification Preference</div>
                </div>
                <button id="w-node-c52ea17b-84bc-9798-48d1-a2b8908b344f-72a047ea" className="div-block-351" onClick={()=>router.push('/setting-password')}><img src="images/arcticons_password.svg" loading="lazy" alt="" className="image-90" />
                  <div className="text-block-41">Password</div>
                </button>
                <div id="w-node-fe8bf414-8316-f98d-98c9-fbcb74defc13-72a047ea" className="div-block-351"><img src="images/carbon_group-account.svg" loading="lazy" alt="" className="image-90" />
                  <div className="text-block-41">Account &amp; Permission</div>
                </div>
              </div>
            </div>
            <div className="spacer" />
          </div>
        </div>
      </div>
}
      

    </div>
  )
}


export default Setting;
