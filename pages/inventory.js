/* eslint-disable @next/next/no-html-link-for-pages */
import Head from "next/head";
import React, { useCallback, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import FileUploader from "../custom/csvUpload/csvUploader";
import { useRouter } from "next/router";
import { createImageFromInitials } from "../custom/createprofilePic";
import Dropdown from 'react-bootstrap/Dropdown';
import Offline from "../custom/inventory/inventory-offline";
import Online from "../custom/inventory/inventory-online";
import ApiToken from "../custom/Apitoken";


export default function Inventory({leftBar}) {
    const { data: session, status } = useSession();
    const [mode, setMode] = useState("online");
    const [data, setData] = useState([]);
    const [pageloading, setPageLoding] = useState(true);
    const [addInv, setaddInv] = useState(false);
    const [dataloading, setaDataLoding] = useState(false);
    const router = useRouter();
    const [Disptype, setDispType] = useState("ADD PRODUCT");
    const [dispOnline,setDispOnline]=useState(true)
    const [msg,setmsg]=useState('')
  
    useEffect(() => {
      localStorage.setItem("redirect", "/");
      leftBar("inventory")
      /* router.push('/inventory','/inventory?page=online',{shallo:true}) */
      if (status != "loading" && !session) {
        localStorage.setItem("redirect", "/inventory?page=online");
        router.push("/sign-in");
      } else if (status == "authenticated") {
        console.log(session)
        setPageLoding(false);
        
      }
    }, [session,mode]);

    if (msg != "") {
      setTimeout(() => setmsg(""), 5000);
    }
 
  return (
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
          {Disptype == "API" && (
            <>
              <ApiToken
                setInv={(val) => setData(val)}
                msg={(val) => setmsg(val)}
                dispType={(val) => setDispType(val)}
              />
            </>
          )}
            <>
              
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
                      onClick={() => {router.push('/inventory','/inventory?page=online',{shallo:true});setDispOnline(true);setMode('online')}}
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
                      onClick={() => {router.push('/inventory','/inventory?page=offline',{shallo:true});setDispOnline(false);setMode('offline')}}
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
                          <button className="link-block-2 w-inline-block mb-2 col-12" style={{backgroundColor:'white'}} onClick={()=>{setaddInv(true)}}>
                    <h1 className="heading-32 ">Manually Add A Product</h1>
                  </button>
                          </Dropdown.Item>
                          <Dropdown.Item className="bg-white" variant="primary" active>
                          <button className="link-block-2 w-inline-block mb-2 col-12" style={{backgroundColor:'white'}} onClick={()=>{setDispType("ADD PRODUCT")}}>
                    <h1 className="heading-32">Import From Your POS</h1>
                  </button>
                          </Dropdown.Item>
                          <Dropdown.Item className="bg-white" variant="primary" active>
                          <button className="link-block-2 w-inline-block mb-2 col-12" style={{backgroundColor:'white'}} onClick={()=>{setDispType("API")}}>
                    <h1 className="heading-32">API key</h1>
                  </button>
                          </Dropdown.Item>
                          <Dropdown.Item className="bg-white" variant="primary" active>
                          <button className="link-block-2 w-inline-block mb-2 col-12" style={{backgroundColor:'white'}} onClick={()=>{setDispType("upload")}}>
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
            <>
            {msg && <p className="text-danger">{msg}</p>}
            {mode=='online'?<Online addInv={addInv}/>:<Offline addInv={addInv}/>}
            </>
           }
              </div>
              
             {/* addpage data */}
              <div className="spacer" />
            </>
          
        </div>
  );
}
