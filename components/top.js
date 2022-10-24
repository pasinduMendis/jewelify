/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { createImageFromInitials } from "../custom/createprofilePic";
import Dropdown from "react-bootstrap/Dropdown";
import 'react-credit-cards/es/styles-compiled.css';
import FrameLoading from "../custom/loadingPages/top";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Frame = ({ Component }) => {
  const { data: session, status } = useSession();
  const [pageloading, setPageLoding] = useState(true);
  const [leftbar,setLeftbar]=useState("")
  const[loading,setLoading]=useState(false)
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("redirect", "/");
    if (status != "loading" && !session) {
      localStorage.setItem("redirect", "/");
      router.push("/sign-in");
    } else if (status == "authenticated") {
      setPageLoding(false)


    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <>
          <div className="div-block-323">
            <div className="div-block-324">
              <img src="images/bx_menu.svg" loading="lazy" alt="" />
            </div>
            <img
              src="images/Jewelify.svg"
              loading="lazy"
              alt=""
              className="image-84"
            />
          </div>
          <div className="div-block-327">
            <div className="div-block-325">
              <div className="div-block-316">
                <div className="div-block-326">
                  <img src="images/Jewelify.svg" loading="lazy" alt="" />
                </div>
                <div className="div-block-319">
                  {/* <a  className="link-block-31 w-inline-block">
                  <div className="div-block-315"><img src="images/Vector_4.svg" loading="lazy" alt="" className="image-85" />
                    <div className="text-block-34">Dashboard</div>
                  </div>
                </a> */}
                  <a id="inventoryBg" onClick={()=>{
                    router.push('/inventory')}} className={leftbar=="inventory"?"link-block-31 highlight w-inline-block":"link-block-31 w-inline-block"}>
                    <div className="div-block-315">
                      <img
                        src="images/mdi_monetization_on.svg"
                        loading="lazy"
                        alt=""
                        className="image-85"
                      />
                      <div className={leftbar=="inventory"?"text-block-34 highlight":"text-block-34"} id="inventory">Inventory</div>
                    </div>
                  </a>
                  <a id="integrationBg" onClick={()=>{
                    router.push('/e-commerce')}} className={leftbar=="integrations"?"link-block-31 highlight w-inline-block":"link-block-31 w-inline-block"}>
                    <div className="div-block-315">
                      <img
                        src="images/mdi_monetization_on_1.svg"
                        loading="lazy"
                        width={18}
                        alt=""
                        className="image-85"
                      />
                      <div className={leftbar=="integrations"?"text-block-34 highlight":"text-block-34"} id="integration">Integrations</div>
                    </div>
                  </a>
                  <a id="customerce" onClick={()=>{
                    router.push('/customers')}} className={leftbar=="customers"?"link-block-31 highlight w-inline-block":"link-block-31 w-inline-block"}>
                    <div className="div-block-315">
                      <img
                        src="images/mdi_monetization_on_1.svg"
                        loading="lazy"
                        width={18}
                        alt=""
                        className="image-85"
                      />
                      <div className={leftbar=="customers"?"text-block-34 highlight":"text-block-34"} id="integration">customers</div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="div-block-316">
                <a
                id="settingBg"
                 onClick={()=>{
                  router.push('/generalSetting')}}
                  className={leftbar=="setting"?"link-block-31 highlight w-inline-block":"link-block-31 w-inline-block"}
                >
                  <div className="div-block-315">
                    <img
                      src="images/mdi_assessment_1.svg"
                      loading="lazy"
                      alt=""
                      className="image-85"
                    />
                    <div className={leftbar=="setting"?"text-block-34 highlight":"text-block-34"} id="setting">Settings</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="div-block-328 aaa">
              <div className="div-block-322">
                {(pageloading) ?
                <div className="div-block-315">
                <div className="px-5">
                  <Skeleton 
                  
                          circle={true}
                          baseColor='#CFDEEA'
                          style={{
                            height: "50px",
                            borderRadius: "50px",
                            width: "50px",
                            backgroundColor:'#CFDEEA'
                          }}
                        />
                </div>
              </div>
                :
                <div className="div-block-315">
                  
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

                </div>}
              </div>
              <div className="div-block-343" style={{height:`${pageloading?"60vh":"auto"}`}}>
              {!pageloading&&<Component leftBar={(val)=>setLeftbar(val)} sessionLoad={(val)=>{setLoading(val)}}/>}
              </div>
              <div className="spacer" />
            </div>
          </div>
        </>
    </div>
  );
};

export default Frame;
