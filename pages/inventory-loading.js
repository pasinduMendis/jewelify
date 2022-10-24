/* eslint-disable @next/next/no-html-link-for-pages */
import Head from "next/head";
import React, { useCallback, useState, useEffect } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Spinner from 'react-bootstrap/Spinner';



export default function Online({ invenData, addInv}) {
  
  return (
    <>
   
    <div className="px-5" style={{width:'100%',overflow:'hide'}}>
                
                <div
                  className="row d-flex justify-content-between my-3 p-3"
                  style={{ backgroundColor: "#E3F2FF" }}
                >
                  <div className="col-3 row">
                    <div
                      className="col-4  d-flex justify-content-center align-items-center"
                      style={{
                        backgroundColor: "#ffff",
                        borderRadius: "500px",
                      }}
                    >
                      <div className=''>
                      <Spinner animation="border" variant="primary" />
          </div>
                    </div>
                    <div className="col-8 align-items-center ">
                      <p className="text-center mt-4"><ProgressBar style={{backgroundColor:'	#B6D0E2',height:'10px',borderRadius:'50px'}}  now={60} /></p>
                      <h2 className="text-center font-weight-bold">
                      <ProgressBar style={{backgroundColor:'	#B6D0E2',height:'20px',borderRadius:'0px'}} variant="#89CFF0"  now={60} />
                      </h2>
                    </div>
                  </div>
                  <div className="col-3 row">
                    <div
                      className="col-4  d-flex justify-content-center align-items-center"
                      style={{
                        backgroundColor: "#ffff",
                        borderRadius: "500px",
                      }}
                    >
                      <div className=''>
                      <Spinner animation="border" variant="primary" />
          </div>
                    </div>
                    <div className="col-8 align-items-center ">
                      <p className="text-center mt-4"><ProgressBar style={{backgroundColor:'	#B6D0E2',height:'10px',borderRadius:'50px'}}  now={60} /></p>
                      <h2 className="text-center font-weight-bold">
                      <ProgressBar style={{backgroundColor:'	#B6D0E2',height:'20px',borderRadius:'0px'}} variant="#89CFF0"  now={60} />
                      </h2>
                    </div>
                  </div>
                  <div className="col-3 row">
                    <div
                      className="col-4  d-flex justify-content-center align-items-center"
                      style={{
                        backgroundColor: "#ffff",
                        borderRadius: "500px",
                      }}
                    >
                      <div className=''>
                      <Spinner animation="border" variant="primary" />
          </div>
                    </div>
                    <div className="col-8 align-items-center ">
                      <p className="text-center mt-4"><ProgressBar style={{backgroundColor:'	#B6D0E2',height:'10px',borderRadius:'50px'}}  now={60} /></p>
                      <h2 className="text-center font-weight-bold">
                      <ProgressBar style={{backgroundColor:'	#B6D0E2',height:'20px',borderRadius:'0px'}} variant="#89CFF0"  now={60} />
                      </h2>
                    </div>
                  </div>
                  <div className="col-3 row">
                    <div
                      className="col-4  d-flex justify-content-center align-items-center"
                      style={{
                        backgroundColor: "#ffff",
                        borderRadius: "500px",
                      }}
                    >
                      <div className=''>
                      <Spinner animation="border" variant="primary" />
          </div>
                    </div>
                    <div className="col-8 align-items-center ">
                      <p className="text-center mt-4"><ProgressBar style={{backgroundColor:'	#B6D0E2',height:'10px',borderRadius:'50px'}}  now={60} /></p>
                      <h2 className="text-center font-weight-bold">
                      <ProgressBar style={{backgroundColor:'	#B6D0E2',height:'20px',borderRadius:'0px'}} variant="#89CFF0"  now={60} />
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="div-block-12 bg-white m-0">
                  <div className="div-block-14">
                    <h1 className="heading-29"><ProgressBar style={{backgroundColor:'	#B6D0E2',height:'10px',borderRadius:'50px'}} variant="#89CFF0"  now={60} /></h1>
                    <form className="search w-form">
                      <label><ProgressBar style={{width:'60%',backgroundColor:'	#B6D0E2',height:'10px',borderRadius:'50px'}} variant="#89CFF0"  now={60} /></label>
                      <ProgressBar style={{backgroundColor:'	#B6D0E2',height:'10px',borderRadius:'50px'}} variant="#89CFF0"  now={60} />
                      <button
                        //type="submit"
                        default//value="Search"
                        style={{width:'60%'}}
                       
                      ><ProgressBar style={{backgroundColor:'	#B6D0E2',height:'20px',borderRadius:'0px'}} variant="#89CFF0"  now={60} /></button>
                    </form>
                  </div>
                  <div className="div-block-288">
                    <div className="div-block-15">
                      <button
                        id="" className="button-113 w-button"
                        style={{ display: "block"}}
                       
                       
                      >
                        SEARCH
                      </button>
                      <div id="closeFilter" style={{ display: "none" }}>
                        <button
                          className="button-113 w-button open-btn"
                          
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
                          
                        >
                          SEARCH
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "block" }} id="displayFilter">
                 
                
                <div className="">
                  <div className="mt-5"> 
                      <table className="" style={{width:'100%'}}>
                        
                        <tbody>
                            <div className="d-flex justify-content-center align-items-center " style={{height:"40vh",backgroundColor: "#E3F2FF" }} >
                            <Spinner animation="border" variant="primary" />
                            </div>
                        
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
                <div className="mt-4 d-flex justify-content-center">
                  
                  <ProgressBar style={{backgroundColor:'	#B6D0E2',height:'10px',borderRadius:'50px'}} className="col-2" variant="#89CFF0"  now={60} />
                  
                </div>
                <div className="w-embed w-script"></div>
              </div>
              
              
              </div>
              </>
  );
}
