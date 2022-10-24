/* eslint-disable @next/next/no-html-link-for-pages */
import Head from "next/head";
import React, { useCallback, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import CustomersMap from "./customerMap";
import { useRouter } from "next/router";
import ProgressBar from "react-bootstrap/ProgressBar";
import Loading from "../inventory/inventory-loading";
import Error from "../inventory/inventory-error";

export default function Offline({ invenData, addInv }) {
  const { data: session, status } = useSession();
  const [msg, setmsg] = useState("");
  const [totalProcessing, setTotalprocessing] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalonHold, setTotalonHold] = useState(0);
  const [pageloading, setPageLoding] = useState(true);
  const [error, setError] = useState(false);
  const [tableloading, setTableLoding] = useState(true);
  const router = useRouter();
  //console.log(session && session.authToken);

  const [filterData, setFiterData] = useState({
    minPrice: "",
    maxPrice: "",
    storeCode: "",
    minQty: "",
    maxQty: "",
    keyWord: "",
    jewelryType: "",
  });

  useEffect(() => {
    setTableLoding(true);
    fetchData();
  }, [session]);

  //console.log(session);
  //const accessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QwMTRAdGVzdC5jb20iLCJpYXQiOjE2NDUxMTI0NTJ9.APlfsocgH0Kl8uQs5TDPtnhNBZidyl-KqgvrgV2tslg'
  const [data, setData] = useState([]);

  if (msg != "") {
    setTimeout(() => setmsg(""), 5000);
  }

  const mapCustomerce = () => {
    if (data.length > 0) {
      return data.map((item, key) => {
        return <CustomersMap customer={item} key={key} />;
      });
    }
    return null;
  };

  const fetchData = async () => {
    setTableLoding(true);
    await axios
      .get(
        `https://api.jewelify.ai/.netlify/functions/customers?type=offline`,
        {
          headers: {
            Authorization: session.authToken,
          },
        }
      )
      .then((inven) => {
        //console.log(inven);
        setData(inven.data.orders);
        var processingCount = 0;
        var completedCount = 0;
        var onholdCount = 0;
        if (inven.data.orders.length > 0) {
          setTableLoding(true);
          for (let i = 0; i < inven.data.orders.length; i++) {
            //console.log(inven.data[i].id)
            if (
              inven.data.orders[i].order_status != "" &&
              inven.data.orders[i].order_status == "processing"
            ) {
              processingCount = processingCount + 1;
            }
            if (
              inven.data.orders[i].order_status != "" &&
              inven.data.orders[i].order_status == "completed"
            ) {
              completedCount = completedCount + 1;
            }
            if (
              inven.data.orders[i].order_status != "" &&
              inven.data.orders[i].order_status == "on-hold"
            ) {
              onholdCount = onholdCount + 1;
            }
          }
        }
        setTotalCompleted(completedCount);
        setTotalprocessing(processingCount);
        setTotalonHold(onholdCount);
        setTableLoding(false);
      });
  };

  const fetchDataFiterOffline = async () => {
    setTableLoding(true);
    session &&
      (await axios
        .get(
          `https://api.jewelify.ai/.netlify/functions/inventory?minPrice=${filterData.minPrice}&maxPrice=${filterData.maxPrice}&minQty=${filterData.minQty}&maxQty=${filterData.maxQty}&storeCode=${filterData.storeCode}&keyWord=${filterData.keyWord}&jewelryType=${filterData.jewelryType}`,
          {
            headers: {
              Authorization: session.authToken,
            },
          }
        )
        .then(
          (inven) => {
            //console.log(inven);
            setData(inven.data.orders);
            //console.log(inven.data.length)
            var processingCount = 0;
            var completedCount = 0;
            var onholdCount = 0;
            if (inven.data.orders.length > 0) {
              setTableLoding(true);
              for (let i = 0; i < inven.data.orders.length; i++) {
                //console.log(inven.data[i].id)
                if (
                  inven.data.orders[i].order_status != "" &&
                  inven.data.orders[i].order_status == "processing"
                ) {
                  processingCount = processingCount + 1;
                }
                if (
                  inven.data.orders[i].order_status != "" &&
                  inven.data.orders[i].order_status == "completed"
                ) {
                  completedCount = completedCount + 1;
                }
                if (
                  inven.data.orders[i].order_status != "" &&
                  inven.data.orders[i].order_status == "on-hold"
                ) {
                  onholdCount = onholdCount + 1;
                }
              }
            }
            setTotalCompleted(completedCount);
            setTotalprocessing(processingCount);
            setTotalonHold(onholdCount);
            setTableLoding(false);
          },
          (err) => {
            console.log(err);
          }
        ));
  };

  /* 
  const onChangeFilter = (e) => {
    e.persist()
    setFiterData({
      ...filterData,
      [e.target.name]: e.target.value,
    })
  }

  const filterHandle = () => {
    fetchDataFiterOffline()
  } */
  return (
    <>
      {tableloading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <div className="">
          <div
                  className="row d-flex justify-content-between my-3 p-3"
                  style={{ backgroundColor: "#E3F2FF",overflow:'scroll',flexWrap:"initial" }}
                >
                  <div className="col-3">
                    
                    <div className="">
                      <p className="text">total processing</p>
                      <h2 className="text font-weight-bold" style={{lineHeight: "20px",
     marginTop: "0px"}} >
                        {totalProcessing}
                      </h2>
                    </div>
                  </div>
                  <div className="col-3 ">
                    
                    <div className="">
                      <p className="text">total completed</p>
                      <h2 className="text font-weight-bold" style={{lineHeight: "20px",
     marginTop: "0px"}}>
                        {totalCompleted}
                      </h2>
                    </div>
                  </div>
                  <div className="col-3">
                    
                    <div className="">
                      <p className="text">total on-hold</p>
                      <h2 className="text font-weight-bold" style={{lineHeight: "20px",
     marginTop: "0px"}}>
                        {totalonHold}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="div-block-12 bg-white px-3">
                <div className="div-block-14">
                  <h1 className="heading-29">Search by Keyword</h1>
                  <form className="search w-form">
                    <label>Search</label>
                    <input
                      type="text"
                      className="search-input w-input"
                      maxLength={256}
                      name='keyWord'
                      onChange={(e)=>onChangeFilter(e)}
                      value={filterData.keyWord}
                      placeholder="Type keyword..."
                      id="search"
                      required
                    />
                    <button
                      //type="submit"
                      defaultValue="Search"
                      className="search-button w-button"
                      onClick={(e)=>filterHandle(e)}
                    />
                  </form>
                </div>
                <div className="div-block-288">
                  <div className="div-block-15">
                  <button  id="openFilter" style={{display:'block'}} onClick={()=>{
                        document.getElementById('openFilter').style.display='none';
                        document.getElementById('closeFilter').style.display='block';
                        document.getElementById('displayFilter').style.visibility='visible';
                    }} className="button-112 w-button">
                      add filter
                    </button>
                    <div id='closeFilter' style={{display:'none'}}>
                    <button className="button-113 w-button open-btn"  onClick={()=>{
                        document.getElementById('closeFilter').style.display='none';
                        document.getElementById('openFilter').style.display='block';
                        document.getElementById('displayFilter').style.visibility='hidden';
                        //console.log(document.getElementById('displayFilter'))
                    }}>
                      close Filter
                    </button>
                    <button className="px-5 py-4 text-light mx-3 strong open-btn" id="open-btn" style={{width:'auto',backgroundColor:'#007ADF',borderRadius:'40px'}}  onClick={()=>{fetchDataFiterOffline()}}>
                    SEARCH
                  </button>
                    </div>
                    
                  </div>
                  
                </div>
              </div>
              <div className="filterInventory py-3" style={{ visibility:'hidden',position:'absolute', overflow:'auto',border:'1px solid #0288F7',backgroundColor:'white' }} id="displayFilter">
                  <div className="row d-flex justify-content-between mt-2 px-5 bg-white">
              
              <div className="col-md-2 input-outer">
                <label className="field-label-11">customer email</label>
                <div className="form-group right-inner-addon input-container">
                  {/* <i class="fa fa-search"></i> */}
                  <input
                    type="text"
                    className="search-input w-input"
                      maxLength={256}
                    placeholder="customer email"
                    name='email'
                    onChange={(e)=>onChangeFilter(e)}
                    value={filterData.email}
                  />
                </div>
              </div>
              <div className="col-md-2 input-outer">
                <label className="field-label-11">customer ID</label>
                <div className="form-group right-inner-addon input-container">
                  {/* <i class="fa fa-search"></i> */}
                  <input
                    type="text"
                    className="search-input w-input"
                      maxLength={256}
                    placeholder="customer ID"
                    name='customerId'
                    onChange={(e)=>onChangeFilter(e)}
                    value={filterData.customerId}
                  />
                </div>
              </div>

              <div className="col-md-2 input-outer">
                <label className="field-label-11">SKU</label>
                <div className="form-group right-inner-addon input-container">
                  {/* <i class="fa fa-search"></i> */}
                  <input
                    type="text"
                    className="search-input w-input"
                      maxLength={256}
                    placeholder="item sku"
                    name='sku'
                    onChange={(e)=>onChangeFilter(e)}
                    value={filterData.sku}
                  />
                </div>
              </div>
              <div className="col-md-2 input-outer">
                <label className="field-label-11">platform</label>
                <div className="form-group right-inner-addon input-container">
                  {/* <i class="fa fa-search"></i> */}
                  <input
                    type="text"
                    className="search-input w-input"
                      maxLength={256}
                    placeholder="platform"
                    name='platform'
                    onChange={(e)=>onChangeFilter(e)}
                    value={filterData.platform}
                  />
                </div>
              </div>
            </div>
            </div>
          <div className="w-embed">
            <div className="table-wrap" style={{ zIndex: 2 }}>
              <table
                className="table-1"
                style={{ width: "auto", minWidth: "100%" }}
              >
                <thead style={{ textAlign: "center" }}>
                  <tr>
                    <th
                      scope="col"
                      className=" text-center"
                      style={{ minWidth: "100px" }}
                    >
                      Customer ID
                    </th>
                    <th
                      scope="col"
                      className=" text-center"
                      style={{ minWidth: "100px" }}
                    >
                      Customer Email
                    </th>
                    <th
                      scope="col"
                      className=" text-center"
                      style={{ minWidth: "100px" }}
                    >
                      Mobile Number
                    </th>
                    <th
                      scope="col"
                      className=" text-center"
                      style={{ minWidth: "100px" }}
                    >
                      Order_ID
                    </th>
                    <th
                      scope="col"
                      className=" text-center"
                      style={{ minWidth: "100px" }}
                    >
                      Platform
                    </th>
                    <th
                      scope="col"
                      className=" text-center"
                      style={{ minWidth: "100px" }}
                    >
                      SKU
                    </th>
                  </tr>
                </thead>
                <tbody style={{ zIndex: 0 }}>{mapCustomerce()}</tbody>
              </table>
            </div>

            <style
              dangerouslySetInnerHTML={{
                __html:
                  '\n.table-wrap{\nheight:510px;\noverflow:scroll;\npadding:0  20px 0 0;\n}\n.table-wrap::-webkit-scrollbar {\nwidth:7px;\nheight:7px;\nborder-radius:20px;\n}\n.table-wrap::-webkit-scrollbar-track{\nbackground:transparent;\nborder-radius:20px;\n}\n.table-wrap::-webkit-scrollbar-thumb{\nbackground-color:#0288F7;\nborder-radius:20px;\n}\n.table-1{\nwhite-space:nowrap;\nborder-collapse: separate;\n border-spacing:0 20px;\nwidth:185%;\n}\n.table-1 tr:nth-child(1) th{\n font-family:"Manrope";\n font-size:15px;\n line-height:20.49px;\n font-weight:700;\n color:#000;\n padding-bottom:10px;\n}\n.table-1 thead tr:nth-child(2) th {\n font-family:"Manrope";\n font-size:15px;\n line-height:20.49px;\n font-weight:400;\n color:#F2F2F2 !important;\n background-color:#fff;\n text-decoration:none;\n padding-bottom:15px;\n border-color:#0288F7;\n border-width:1px 0;\n border-style:solid;\n padding-top:15px;\n}\n.table-1 tr:nth-child(2) th a{\n color:#000 !important;\n padding:4px;\n background-color:#F2F2F2;\n text-decoration:none;\n  font-weight:400;\n }\n .table-1 thead tr:nth-child(2) th:first-child {\nborder-width:1px 0 1px 1px;\n}\n .table-1 thead tr:nth-child(2) th:last-child {\nborder-width:1px 1px 1px 0;\n}\n.table-1 thead tr:nth-child(2) {\n border:1px;\n}\n.table-1 tbody tr td{\nbackground-color:#fff;\npadding:10px;\nfont-family:"Manrope";\nfont-size:15px;\nline-height:20.54px;\ncolor:#000;\nfont-weight:400;\n}\n .wrap-card{\ndisplay:flex;\nflex-direction:column;\nalign-items:center;\nposition:absolute;\ntop:70px;\nleft:50px;\ndisplay:none;\n}\n.wrap-card2,.wrap-card3,.wrap-card4,.wrap-card5,.wrap-card6,.wrap-card7,.wrap-card8,.wrap-card9,.wrap-card10{\ndisplay:flex;\nflex-direction:column;\nalign-items:center;\nposition:absolute;\ntop:70px;\nleft:00px;\ndisplay:none;\n}\n.arrow-rotate{\nbackground-color:#fff;\nheight:20px;\nwidth:20px;\nmargin-right:auto;\nmargin-left:0;\ntransform:rotate(45deg);\nborder-color:#DAE6EC;\nborder-width:1px 0 0 1px;\nborder-style:solid;\n}\n.arrow-rotate1{\nbackground-color:#fff;\nheight:20px;\nwidth:20px;\nmargin-right:auto;\nmargin-left:auto;\ntransform:rotate(45deg);\nborder-color:#DAE6EC;\nborder-width:1px 0 0 1px;\nborder-style:solid;\n}\n.card-indicator{\nbackground-color:#fff;\npadding:15px;\nborder:1px solid #DAE6EC;\nheight:172px;\nmargin-top:-10px;\nwidth:238px;\nmargin-left:60px;\n}\n.card-indicator2{\nbackground-color:#fff;\npadding:15px;\nborder:1px solid #DAE6EC;\nheight:172px;\nmargin-top:-10px;\nwidth:238px;\nmargin-left:0px;\n}\n.text-indicator{\nwhite-space:normal;\ncolor:#000;\nfont-family:"Manrope";\nfont-size:12px;\nline-height:24px;\nfont-weight:400;\npadding:20px;\n}\n@media(min-width:991px) and (max-width:1199px){\n.card-indicator2{\nbackground-color:#fff;\npadding:15px;\nborder:1px solid #DAE6EC;\nheight:172px;\nmargin-top:-10px;\nwidth:238px;\nmargin-left:0px;\n}\n.wrap-card2, .wrap-card3, .wrap-card4, .wrap-card5, .wrap-card6, .wrap-card7, .wrap-card8, .wrap-card9, .wrap-card10 {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    position: absolute;\n    top: 70px;\n    left: 0px;\n    display: none;\n}\n}\n@media(min-width:768px) and (max-width:990px){\n.table-1{\nwhite-space:nowrap;\nborder-collapse: separate;\n border-spacing:0 20px;\nwidth:185%;\n}\n.wrap-card2, .wrap-card3, .wrap-card4, .wrap-card5, .wrap-card6, .wrap-card7, .wrap-card8, .wrap-card9, .wrap-card10 {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    position: absolute;\n    top: 70px;\n    left: -30px;\n    display: none;\n}\n}\n@media(min-width:470px) and (max-width:767x){\n.table-1{\nwhite-space:nowrap;\nborder-collapse: separate;\n border-spacing:0 20px;\nwidth:200%;\n}\n.table-1 tr:nth-child(1) th {\n    font-family: "Manrope";\n    font-size: 15px;\n    line-height: 20.49px;\n    font-weight: 700;\n    padding-left: 10px;\n    color: #000;\n    padding-bottom: 10px;\n}\n.wrap-card2, .wrap-card3, .wrap-card4, .wrap-card5, .wrap-card6, .wrap-card7, .wrap-card8, .wrap-card9, .wrap-card10 {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    position: absolute;\n    top: 70px;\n    left: -30px;\n    display: none;\n}\n}\n@media(max-width:469px){\n.table-1{\nwhite-space:nowrap;\nborder-collapse: separate;\n border-spacing:0 20px;\nwidth:200%;\n}\n.table-1 tr:nth-child(1) th {\n    font-family: "Manrope";\n    font-size: 15px;\n    line-height: 20.49px;\n    font-weight: 700;\n    padding-left: 10px;\n    color: #000;\n    padding-bottom: 10px;\n}\n.wrap-card2, .wrap-card3, .wrap-card4, .wrap-card5, .wrap-card6, .wrap-card7, .wrap-card8, .wrap-card9, .wrap-card10 {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    position: absolute;\n    top: 70px;\n    left: -30px;\n    display: none;\n}\n.wrap-card {\n    left: 70px;\n}\n}\n',
              }}
            />
          </div>
          <div className="div-block-278">
            <a className="button-8 w-button">CONFIRM</a>
          </div>
          <div className="w-embed w-script"></div>
        </div>
      )}
    </>
  );
}
