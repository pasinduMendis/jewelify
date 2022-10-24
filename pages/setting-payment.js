/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { createImageFromInitials } from "../custom/createprofilePic";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import Cards from "react-credit-cards";
import 'react-credit-cards/es/styles-compiled.css';
import { Route53 } from "aws-sdk";

const Setting = ({leftBar}) => {
  const { data: session, status } = useSession();
  const [pageloading, setPageLoding] = useState(true);
  const [waiting,setWaiting]=useState(false)
  const [msg, setmsg] = useState("");
  const [cardData, setCardData] = useState("");
  const [customerData, setCustomerData] = useState("");
  const [payHistory, setPayHistory] = useState("");
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("redirect", "/");
    leftBar("setting")
    if (status != "loading" && !session) {
      localStorage.setItem("redirect", "/setting");
      router.push("/sign-in");
    } else if (status == "authenticated") {
        fetchData()

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const fetchData=async()=>{
    const user = await axios.get(
        "https://api.jewelify.ai/.netlify/functions/profile",
        {
          headers: {
            Authorization: session.authToken,
          },
        }
      );
      console.log(user)
        if(user.data.user.isPayment){
            await axios.post("/api/getPayCustomeInfo", {
                customer_id: user.data.user.customer_id,
              }).then((res)=>{
                setCustomerData(res.data.customer)
                setCardData(res.data.cardInfo.data[0])
                setPayHistory(res.data.payHistory.data)
                setPageLoding(false);
              });
        }else{
           router.push('/pricing')
        }
      
  }

  if (msg != "") {
    setTimeout(() => setmsg(""), 5000);
  }

  return (
    <div>
      {pageloading ? (
        <div className=" d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="div-block-343">
              {/* <h1 className="heading-149">Settings</h1> */}
              <div className="div-block-335">
                <div className="div-block-336"><img src="images/fluent_payment-32-regular.svg" loading="lazy" alt="" className="image-87" />
                  <div className="text-block-35">Payment Information</div>
                </div>
                <div className="div-block-344">
                  <div className="text-block-36">Current Payment Method</div>
                </div>
                <div className="div-block-345">
                  <div className="div-block-346">
                  {customerData && cardData &&<Cards
            name={customerData.name}
            number={`**** **** **** ${cardData.card.last4}`}
            expiry={`${cardData.card.exp_month}/${cardData.card.exp_year}`}
            cvc="***"
            preview={true}
            issuer={cardData.card.brand}
          />}
                    <div className="div-block-342 _1000">
                      <button  className="button-134 _222 w-button" onClick={()=>{router.push('/update-payinfo')}}>Update</button>
                     {/*  <button  className="button-135 black w-button">Remove</button> */}
                    </div>
                  </div>
                  
                </div>
                <div className="div-block-344">
                  <div className="text-block-36">History Transaction</div>
                </div>
                <div className="div-block-348">
                  {payHistory&& payHistory.map((item)=>{
                    return <>
                    <div className="div-block-344 _222">
                    <div className="div-block-349">
                      <div className="text-block-38">payment id - {item.id}</div>
                      <div className="text-block-39">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut amet tempor tristique ut. Ut nisl nisl.<br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut amet tempor tristique ut. Ut nisl nisl.</div>
                    </div>
                    <div className="div-block-347">
                      <div className="text-block-37">$ {item.amount/100}</div>
                    </div>
                  </div>
                  </>
                  })
                  }
                  
                </div>
              </div>
            </div>
      )}
    </div>
  );
};

export default Setting;
