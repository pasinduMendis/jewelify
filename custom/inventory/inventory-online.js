/* eslint-disable @next/next/no-html-link-for-pages */
import Head from "next/head";
import React, { useCallback, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import InventoryMap from "./inventoryMap";
import AddInventory from "./addInventory";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useRouter } from "next/router";
import Loading from "./inventory-loading";
import InventoryMapEcom from "./eComOnlyMap";


export default function Online({ invenData, addInv}) {
  const { data: session, status } = useSession();
  const [showAtt, setshowAtt] = useState(false);
 /*  const [addFilter, setAddFilter] = useState(false);
  const [addProduct, setAddProduct] = useState(false); */
  const [att, setAtt] = useState("");
  const [msg, setmsg] = useState("");
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalWooCom, setTotalWooCom] = useState(0);
  const [totalEbay, setTotalEbay] = useState(0);
  const [totalShopify, setTotalShopify] = useState(0);
  const [totalAmazon, setTotalAmazon] = useState(0);
  const [alljewelrtTypes, setalljewelrtTypes] = useState([]);
  const [pageloading, setPageLoding] = useState(true);
  const [tableloading, setTableLoding] = useState(true);
  const [Disptype, setDispType] = useState("ADD PRODUCT");
  const [companies, setCompanies] = useState(["shopify", "woo-commerce"]);
  const [dispWooOnly,setDispWooOnly]=useState(false)
  const [dispShopifyOnly,setDispShopifyOnly]=useState(false)
  const percentage=69

  const [filterData, setFiterData] = useState({
    minPrice: "",
    maxPrice: "",
    platform: "",
    minQty: "",
    maxQty: "",
    keyWord: "",
    jewelryType: "",
  });
  //console.log(session && session.authToken);
  //console.log(filterData.platform);

  //console.log(session);
  //const accessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QwMTRAdGVzdC5jb20iLCJpYXQiOjE2NDUxMTI0NTJ9.APlfsocgH0Kl8uQs5TDPtnhNBZidyl-KqgvrgV2tslg'
  const [data, setData] = useState([]);

  const router =useRouter()

  useEffect(() => {
    setTableLoding(true)
    fetchDataFilter()
    //setTableLoding(false);
    
    
  }, [session])


  if (msg != "") {
    setTimeout(() => setmsg(""), 5000);
  }

  const mapProduct = () => {
    if (data.length > 0) {
      return data.map((item, key) => {
        if(dispWooOnly){
          return (
          <InventoryMapEcom
            product={item}
            key={key}
            setInv={(val) => {
              setData(val);
            }}
            ecom={"woo-commerce"}
          />
          )
        }if(dispShopifyOnly){
          return (
          <InventoryMapEcom
            product={item}
            key={key}
            setInv={(val) => {
              setData(val);
            }}
            ecom={"shopify"}
          />
          )
        }return (
          <InventoryMap
            product={item}
            key={key}
            setInv={(val) => {
              setData(val);
            }}
          />
        );
      });
    }
    return null;
  };


  const mapAddProduct = () => {
    if (session) {
      return (
        <AddInventory
          msg={(val) => {
            setmsg(val);
          }}
          setInv={(val) => {
            setData(val);
          }}
        />
      );
    }
    return null;
  };

  const fetchData = () => {

    if (invenData.data) {
      var inven = invenData;
      //console.log(inven);
      setData(inven.data);

      var wooCount = 0;
      var shopifyCount = 0;
      var alljewTypes = [];
      if (inven.data.length > 0) {
        setTableLoding(true)
        for (let i = 0; i < inven.data.length; i++) {
          //console.log(inven.data[i].id)
          if (inven.data[i].id != "" && inven.data[i].id) {
            wooCount = wooCount + 1;
          }
          if (inven.data[i].shopify_id != "" && inven.data[i].shopify_id) {
            shopifyCount = shopifyCount + 1;
          }
          if (
            !alljewTypes.includes(inven.data[i].jewelryType) &&
            inven.data[i].jewelryType != ""
          ) {
            alljewTypes.push(inven.data[i].jewelryType);
          }
        }
      }
      setalljewelrtTypes(alljewTypes);
      setTotalWooCom(wooCount);
      setTotalShopify(shopifyCount);
      setTotalProduct(inven.data.length ? inven.data.length : 0);
      setTableLoding(false)
      //setTableLoding(false);
    }
  };

  const fetchDataFilter = async () => {
    setTableLoding(true);
    session &&
      (await axios
        .get(
          `https://api.jewelify.ai/.netlify/functions/inventory?minPrice=${filterData.minPrice}&maxPrice=${filterData.maxPrice}&minQty=${filterData.minQty}&maxQty=${filterData.maxQty}&platform=${filterData.platform}&keyWord=${filterData.keyWord}&jewelryType=${filterData.jewelryType}`,
          {
            headers: {
              Authorization: session.authToken,
            },
          }
        )
        .then(
          (inven) => {
            //console.log(inven);
            setData(inven.data);
            //console.log(inven.data.length)
            var wooCount = 0;
            var shopifyCount = 0;

            if (inven.data.length > 0) {
              setTableLoding(true);
              for (let i = 0; i < inven.data.length; i++) {
                //console.log(inven.data[i].id)
               
              //console.log(inven.data[i].id)
              
                if (inven.data[i].id != "" && inven.data[i].id) {
                  wooCount = wooCount + 1;
                }
                if (
                  inven.data[i].shopify_id != "" &&
                  inven.data[i].shopify_id
                ) {
                  shopifyCount = shopifyCount + 1;
                }
                
              }
            }

            setTotalWooCom(wooCount);
            setTotalShopify(shopifyCount);
            setTotalProduct(inven.data.length ? inven.data.length : 0);
            setTableLoding(false);
          },
          (err) => {
            //console.log(err);
          }
        ));
  };

  const fetchDataEcoomerce = async (ecom) => {
    setTableLoding(true);
    session &&
      (await axios
        .get(
          `https://api.jewelify.ai/.netlify/functions/inventory?platform=${ecom}`,
          {
            headers: {
              Authorization: session.authToken,
            },
          }
        )
        .then(
          (inven) => {
            //console.log(inven);
            setData(inven.data);
            //console.log(inven.data.length)
            var wooCount = 0;
            var shopifyCount = 0;

            if (inven.data.length > 0) {
              setTableLoding(true);
              for (let i = 0; i < inven.data.length; i++) {
                //console.log(inven.data[i].id)
               
              //console.log(inven.data[i].id)
              
                if (inven.data[i].id != "" && inven.data[i].id) {
                  wooCount = wooCount + 1;
                }
                if (
                  inven.data[i].shopify_id != "" &&
                  inven.data[i].shopify_id
                ) {
                  shopifyCount = shopifyCount + 1;
                }
                
              }
            }

            setTotalWooCom(wooCount);
            setTotalShopify(shopifyCount);
            setTotalProduct(inven.data.length ? inven.data.length : 0);
            setTableLoding(false);
          },
          (err) => {
            //console.log(err);
          }
        ));
  };
  /* const [count, setCount] = useState(0);
  const increment = useCallback(() => {
    setCount((v) => v + 1);
  }, [setCount]); */

  const onChangeFilter = (e) => {
    e.persist();
    setFiterData({
      ...filterData,
      [e.target.name]: e.target.value,
    });
  };

  const filterHandle = (e) => {
    e.preventDefault();
    fetchDataFilter();
  };

  return (
    <>
    {(tableloading)? (
      <Loading />) :
    <div className="">
                
                <div
                  className="row d-flex justify-content-between my-3 p-3"
                  style={{ backgroundColor: "#E3F2FF",overflow:'scroll',flexWrap:"initial" }}
                >
                  <div className="col-3 row">
                    <div
                      className="col-4 d-flex align-items-center"
                      style={{
                        backgroundColor: "#ffff",
                        borderRadius: "500px",
                      }}
                      onClick={()=>{
                        fetchDataEcoomerce('woo-commerce')
                      setDispShopifyOnly(false)
                    setDispWooOnly(true)}}
                    >
                      <img src="/img/s1.png" alt="gdrive" />
                    </div>
                    <div className="col-8">
                      <p className="text-center">products synced</p>
                      <h2 className="text-center font-weight-bold">
                        {totalWooCom}
                      </h2>
                    </div>
                  </div>
                  <div className="col-3 row">
                    <div
                      className="col-4 d-flex align-items-center"
                      style={{
                        backgroundColor: "#ffff",
                        borderRadius: "500px",
                      }}
                    >
                      <img src="/img/s4.png" alt="gdrive" />
                    </div>
                    <div className="col-8">
                      <p className="text-center">products synced</p>
                      <h2 className="text-center font-weight-bold">
                        {totalEbay}
                      </h2>
                    </div>
                  </div>
                  <div className="col-3 row">
                    <div
                      className="col-4 d-flex align-items-center"
                      style={{
                        backgroundColor: "#ffff",
                        borderRadius: "500px",
                      }}
                      onClick={()=>{
                        fetchDataEcoomerce('shopify')
                        setDispWooOnly(false)
                        setDispShopifyOnly(true)
                        }}
                    >
                      <img src="/img/s2.png" alt="gdrive" />
                    </div>
                    <div className="col-8">
                      <p className="text-center">products synced</p>
                      <h2 className="text-center font-weight-bold">
                        {totalShopify}
                      </h2>
                    </div>
                  </div>
                  <div className="col-3 row">
                    <div
                      className="col-4 d-flex align-items-center"
                      style={{
                        backgroundColor: "#ffff",
                        borderRadius: "500px",
                      }}
                    >
                      <img src="/img/s5.png" alt="gdrive" />
                    </div>
                    <div className="col-8">
                      <p className="text-center">products synced</p>
                      <h2 className="text-center font-weight-bold">
                        {totalAmazon}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="div-block-12 bg-white m-0">
                  <div className="div-block-14">
                    <h1 className="heading-29">Search by Keyword</h1>
                    <form className="search w-form">
                      <label>Search</label>
                      <input
                        type="text"
                        className="search-input w-input"
                        maxLength={256}
                        name="keyWord"
                        onChange={(e) => onChangeFilter(e)}
                        value={filterData.keyWord}
                        placeholder="Type keyword..."
                        id="search"
                        required
                      />
                      <button
                        //type="submit"
                        defaultValue="Search"
                        className="search-button w-button"
                        onClick={(e) => filterHandle(e)}
                      />
                    </form>
                  </div>
                  <div className="div-block-288">
                    <div className="div-block-15">
                      <button
                        id="openFilter"
                        style={{ display: "block" }}
                        onClick={() => {
                          document.getElementById("openFilter").style.display =
                            "none";
                          document.getElementById("closeFilter").style.display =
                            "block";
                          document.getElementById(
                            "displayFilter"
                          ).style.visibility = "visible";
                        }}
                        className="button-112 w-button"
                      >
                        add filter
                      </button>
                      <div id="closeFilter" style={{ display: "none" }}>
                        <button
                          className="button-113 w-button open-btn"
                          onClick={() => {
                            document.getElementById(
                              "closeFilter"
                            ).style.display = "none";
                            document.getElementById(
                              "openFilter"
                            ).style.display = "block";
                            document.getElementById(
                              "displayFilter"
                            ).style.visibility = "hidden";
                            //console.log(document.getElementById('displayFilter'))
                          }}
                        >
                          close Filter
                        </button>
                        <button
                          className="px-5 py-4 text-light mx-3 strong open-btn"
                          id="open-btn"
                          style={{
                            width: "auto",
                            backgroundColor: "#007ADF",
                            borderRadius: "40px",
                          }}
                          onClick={() => {
                            document.getElementById(
                              "displayFilter"
                            ).style.visibility = "hidden";
                            fetchDataFilter();
                          }}
                        >
                          SEARCH
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="filterInventory py-3" style={{ visibility:'hidden',position:'absolute', overflow:'auto',border:'1px solid #0288F7',backgroundColor:'white' }} id="displayFilter">
                  <div className="row d-flex justify-content-between mt-2 px-5 bg-white">
                    <div className="col-md-2 input-outer">
                      <label className="field-label-11">Company</label>
                      <div className="form-group right-inner-addon input-container">
                        <select
                          className="search-input w-input"
                          maxLength={256}
                          onChange={(e) => {
                            e.persist();
                            setFiterData({
                              ...filterData,
                              platform: e.target.value,
                            });
                          }}
                        >
                          <option value="" selected>
                            All company
                          </option>

                          {companies &&
                            companies.map((companie) => {
                              return (
                                <>
                                  <option value={companie}>{companie}</option>
                                </>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2 input-outer">
                      <label className="field-label-11">Product Type</label>
                      <div className="form-group right-inner-addon input-container">
                        {/* <i class="fa fa-search"></i> */}
                        <select
                          className="search-input w-input"
                          maxLength={256}
                          onChange={(e) => {
                            e.persist();
                            setFiterData({
                              ...filterData,
                              jewelryType: e.target.value,
                            });
                          }}
                        >
                          <option value="" selected>
                            All types
                          </option>

                          {alljewelrtTypes &&
                            alljewelrtTypes.map((jewType) => {
                              return (
                                <>
                                  <option value={jewType}>{jewType}</option>
                                </>
                              );
                            })}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-2 input-outer">
                      <label className="field-label-11">Min Stock</label>
                      <div className="form-group right-inner-addon input-container">
                        {/* <i class="fa fa-search"></i> */}
                        <input
                          type="number"
                          className="search-input w-input"
                          maxLength={256}
                          placeholder="Type QTY"
                          name="minQty"
                          onChange={(e) => onChangeFilter(e)}
                          value={filterData.minQty}
                        />
                      </div>
                    </div>
                    <div className="col-md-2 input-outer">
                      <label className="field-label-11">Max Stock</label>
                      <div className="form-group right-inner-addon input-container">
                        {/* <i class="fa fa-search"></i> */}
                        <input
                          type="number"
                          className="search-input w-input"
                          maxLength={256}
                          placeholder="Type QTY"
                          name="maxQty"
                          onChange={(e) => onChangeFilter(e)}
                          value={filterData.maxQty}
                        />
                      </div>
                    </div>

                    <div className="col-md-2 input-outer">
                      <label className="field-label-11">Min Price</label>
                      <div className="form-group right-inner-addon input-container">
                        {/* <i class="fa fa-search"></i> */}
                        <input
                          type="number"
                          className="search-input w-input"
                          maxLength={256}
                          placeholder="Type Price"
                          name="minPrice"
                          onChange={(e) => onChangeFilter(e)}
                          value={filterData.minPrice}
                        />
                      </div>
                    </div>
                    <div className="col-md-2 input-outer">
                      <label className="field-label-11">Max Price</label>
                      <div className="form-group right-inner-addon input-container">
                        {/* <i class="fa fa-search"></i> */}
                        <input
                          type="number"
                          className="search-input w-input"
                          maxLength={256}
                          placeholder="Type Price"
                          name="maxPrice"
                          onChange={(e) => onChangeFilter(e)}
                          value={filterData.maxPrice}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-embed" >
                  
                  <div className="table-wrap" style={{zIndex:2}}> 
                      <table className="table-1" >
                        <thead style={{ textAlign: "center",}}>
                          <tr>
                            <th scope="col" className="p-3">
                              Category
                            </th>
                            <th scope="col" className="p-3">
                              Stock No
                            </th>
                            <th scope="col" className="p-3">
                              Style Number
                            </th>
                            <th scope="col" className="p-3">
                              Brand
                            </th>
                            <th scope="col" className="p-3">
                              Manufacturer
                            </th>
                            <th scope="col" className="p-3">
                              Tag
                            </th>
                            <th scope="col" className="p-3">
                              Store Code
                            </th>
                            <th scope="col" className="p-3">
                              Product Name
                            </th>
                            <th scope="col" className="p-3">
                              Company Name
                            </th>
                            <th scope="col" className="p-3">
                              Company Code
                            </th>
                            <th scope="col" className="p-3">
                              Quantity
                            </th>
                            <th scope="col" className="p-3">
                              SKU
                            </th>
                            <th scope="col" className="p-3">
                              Buy Date
                            </th>
                            <th scope="col" className="p-3">
                              Date Sold
                            </th>
                            <th scope="col" className="p-3">
                              Short description
                            </th>
                            <th scope="col" className="p-3">
                              Long description
                            </th>
                            <th scope="col" className="p-3">
                              Cost
                            </th>
                            <th scope="col" className="p-3">
                              Retail Price
                            </th>
                            <th scope="col" className="p-3">
                              On Sale
                            </th>
                            <th scope="col" className="p-3">
                              Product Images
                            </th>
                            <th scope="col" className="p-3">
                              Product Certificate Picture
                            </th>
                            <th scope="col" className="p-3">
                              Certificate Number
                            </th>
                            <th scope="col" className="p-3">
                              Lab Certification
                            </th>
                            <th scope="col" className="p-3">
                              Style
                            </th>
                            <th scope="col" className="p-3">
                              Style Name
                            </th>
                            <th scope="col" className="p-3">
                              Stone Class
                            </th>
                            <th scope="col" className="p-3">
                              Gemstone Type
                            </th>
                            <th scope="col" className="p-3">
                              Stone Cut
                            </th>
                            <th scope="col" className="p-3">
                              Stone Shape
                            </th>
                            <th scope="col" className="p-3">
                              Stone Color
                            </th>
                            <th scope="col" className="p-3">
                              Stone Clarity
                            </th>
                            <th scope="col" className="p-3">
                              Center Stone CT
                            </th>
                            <th scope="col" className="p-3">
                              CTW
                            </th>
                            <th scope="col" className="p-3">
                              Gender
                            </th>
                            <th scope="col" className="p-3">
                              Metal Type
                            </th>
                            <th scope="col" className="p-3">
                              Metal Color
                            </th>
                            <th scope="col" className="p-3">
                              Gol Karat
                            </th>
                            <th scope="col" className="p-3">
                              Metal Finish
                            </th>
                            <th scope="col" className="p-3">
                              Ring Size
                            </th>
                            <th scope="col" className="p-3">
                              Ring Width
                            </th>
                            <th scope="col" className="p-3">
                              Chain Type
                            </th>
                            <th scope="col" className="p-3">
                              Chain Length
                            </th>
                            <th scope="col" className="p-3">
                              Chain Width
                            </th>
                            <th scope="col" className="p-3">
                              Hoop Diameter
                            </th>
                            <th scope="col" className="p-3">
                              Center Size
                            </th>
                            <th scope="col" className="p-3">
                              Pendant Height
                            </th>
                            <th scope="col" className="p-3">
                              Pendant Width
                            </th>
                            <th scope="col" className="p-3">
                              Total Carot Weight
                            </th>
                            <th scope="col" className="p-3">
                              Product Weight
                            </th>
                            <th scope="col" className="p-3">
                              Shipping Length
                            </th>
                            <th scope="col" className="p-3">
                              Shipping Width
                            </th>
                            <th scope="col" className="p-3">
                              Shipping Height
                            </th>
                            <th scope="col" className="p-3">
                              Jewelary Type
                            </th>
                            <th scope="col" className="p-3">
                              Assest ID
                            </th>
                          </tr>
                        </thead>
                        <tbody style={{zIndex:0}}>
                          {addInv && mapAddProduct()}
                          {mapProduct()}
                        </tbody>
                       

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
                  <a  className="button-8 w-button">
                    CONFIRM
                  </a>
                </div>
                <div className="w-embed w-script"></div>
              </div>
              }
              </>
  );
}
