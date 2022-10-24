/* eslint-disable @next/next/no-html-link-for-pages */
import Head from "next/head";
import React, { useCallback, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import InventoryMap from "../custom/inventoryMap";
import AddInventory from "../custom/addInventory";
import FileUploader from "../custom/csvUpload/csvUploader";
import { useRouter } from "next/router";
import { createImageFromInitials } from "../custom/createprofilePic";
import Dropdown from 'react-bootstrap/Dropdown';
import Offline from "../custom/inventory/inventory-offline";
import Online from "../custom/inventory/inventory-online";


export default function Inventory() {
    const { data: session, status } = useSession();
    const [mode, setMode] = useState("online");
    const [data, setData] = useState([]);
    const [pageloading, setPageLoding] = useState(true);
    const [addInv, setaddInv] = useState(false);
    const [dataloading, setaDataLoding] = useState(true);
    const router = useRouter();
    const [Disptype, setDispType] = useState("ADD PRODUCT");
    const [dispOnline,setDispOnline]=useState(true)
  
    useEffect(() => {
      localStorage.setItem("redirect", "/");
      router.push('/test2','/test2?page=online',{shallo:true})
      if (status != "loading" && !session) {
        localStorage.setItem("redirect", "/inventory?page=online");
        router.push("/sign-in");
      } else if (status == "authenticated") {
        console.log(session)
        setPageLoding(false);
        fetchData();
        
      }
    }, [session,mode]);
  
    const fetchData = async () => {
        setaDataLoding(true)
      await axios
          .get(`https://api.jewelify.ai/.netlify/functions/inventory` , {
            headers: {
              Authorization: session.authToken,
            },
          })
          .then(
            (inven) => {
              //console.log(inven);
              setData(inven);
              setaDataLoding(false)
          })
    };

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
      ) : (
        <div>
          {Disptype == "upload" && (
            <>
              <FileUploader
                setInv={(val) => setData(val)}
                msg={(val) => setmsg(val)}
                dispType={(val) => setDispType(val)}
              />
            </>
          )}
          <div className="div-block-322 tab">
            <div>
              <img src="images/Jewelify-1.svg" loading="lazy" alt="" />
            </div>
            <div className="div-block-315">
              {session ? (
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
                  <div className="div-block-315">
                    <img
                      src="images/Vector_4.svg"
                      loading="lazy"
                      alt=""
                      className="image-85"
                    />
                    <div className="text-block-34">Dashboard</div>
                  </div>
                </a> */}
                  <a
                    href="/inventory"
                    className="link-block-31 highlight w-inline-block"
                  >
                    <div className="div-block-315">
                      <img
                        src="images/mdi_monetization_on.svg"
                        loading="lazy"
                        width={18}
                        alt=""
                        className="image-85"
                      />
                      <div className="text-block-34 highlight">Inventory</div>
                    </div>
                  </a>
                  {/* <a  className="link-block-31 w-inline-block">
                  <div className="div-block-315">
                    <img
                      src="images/mdi_assessment.svg"
                      loading="lazy"
                      alt=""
                      className="image-85"
                    />
                    <div className="text-block-34">Analytics</div>
                  </div>
                </a> */}
                  <a href="/e-commerce" className="link-block-31 w-inline-block">
                    <div className="div-block-315">
                      <img
                        src="images/mdi_assessment.svg"
                        loading="lazy"
                        alt=""
                        className="image-85"
                      />
                      <div className="text-block-34">Integrations</div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="div-block-316">
                <a href="/setting" className="link-block-31 w-inline-block">
                  <div className="div-block-315">
                    <img
                      src="images/outline-settings-1.svg"
                      loading="lazy"
                      alt=""
                      className="image-85"
                    />
                    <div className="text-block-34">Settings</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="div-block-328 aaa">
              <div className="div-block-322">
                <div className="div-block-315">
                  {session ? (
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
                    </>
                  ) : (
                    <>
                      <a
                        onClick={() => {
                          localStorage.setItem(
                            "redirect",
                            "/inventory?page=online"
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
              <h3 className="heading-148">Inventory</h3>
                <div className="d-flex justify-content-between pb-5">
                  <div className="bg-light">
                    <button
                      className="px-5 py-2 field-label-11"
                      style={{
                        width: "auto",
                        height: "auto",
                        backgroundColor: dispOnline?"#007ADF":"white",
                        borderRadius: "40px",
                        color:dispOnline?"white":"black"
                      }}
                      onClick={() => {router.push('/test2','/test2?page=online',{shallo:true});setDispOnline(true);setMode('online')}}
                    >
                      online
                    </button>
                    <button
                      className="px-5 py-2 field-label-11"
                      style={{
                        width: "auto",
                        height: "auto",
                        backgroundColor: !dispOnline?"#007ADF":"white",
                        color:!dispOnline?"white":"black",
                        borderRadius: "40px",
                      }}
                      onClick={() => {router.push('/test2','/test2?page=offline',{shallo:true});setDispOnline(false);setMode('offline')}}
                    >
                      Offline
                    </button>
                  </div>
                  
                  <Dropdown>
                        <Dropdown.Toggle variant="white" id="dropdown-custom-1">
                    <button
                      className="px-5 py-4 field-label-11 text-light"
                      style={{
                        width: "100%",
                        backgroundColor: "#007ADF",
                        borderRadius: "40px",
                        
                      }}
                    >
                      + Add PRODUCT
                    </button>

                          {/*  <div className="text-block-31">{session.id}</div>*/}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="super-colors bg-white text-center">
                          <Dropdown.Item className="bg-white" variant="primary" active>
                          <button className="link-block-2 w-inline-block mb-2 col-12" onClick={()=>{setaddInv(true)}}>
                    <h1 className="heading-32 ">Manually Add A Product</h1>
                  </button>
                          </Dropdown.Item>
                          <Dropdown.Item className="bg-white" variant="primary" active>
                          <button className="link-block-2 w-inline-block mb-2 col-12" onClick={()=>{setDispType("ADD PRODUCT")}}>
                    <h1 className="heading-32">Import From Your POS</h1>
                  </button>
                          </Dropdown.Item>
                          <Dropdown.Item className="bg-white" variant="primary" active>
                          <button className="link-block-2 w-inline-block mb-2 col-12" onClick={()=>{setDispType("upload")}}>
                    <h1 className="heading-32">Upload A File</h1>
                  </button>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                </div>
              <div>
              {dataloading?
              <div className=" d-flex justify-content-center mt-5">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>:
            mode=='online'?<Online invenData={data} addInv={addInv}/>:<Offline invenData={data} addInv={addInv}/>}
              </div>
              
             {/* addpage data */}
              <div className="spacer" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
