/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { createImageFromInitials } from "../custom/createprofilePic";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

const Setting = ({leftBar}) => {
  const { data: session, status } = useSession();
  const [pageloading, setPageLoding] = useState(true);
  const [waiting,setWaiting]=useState(false)
  const [passwordInfo, setPasswordInfo] = useState({
    newPass: "",
    oldPass: "",
    newPass2: "",
  });
  const [msg, setmsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("redirect", "/");
    leftBar("setting")
    if (status != "loading" && !session) {
      localStorage.setItem("redirect", "/setting");
      router.push("/sign-in");
    } else if (status == "authenticated") {
      setPageLoding(false);
    }
  }, [session]);

  const onChangePassword = (e) => {
    e.persist();
    setPasswordInfo({
      ...passwordInfo,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setWaiting(true)
    if (passwordInfo.newPass && passwordInfo.newPass2 && passwordInfo.oldPass) {
      if (passwordInfo.newPass == passwordInfo.newPass2) {
        await axios
          .put(
            "https://api.jewelify.ai/.netlify/functions/profile?type=updatePassword",
            {
              oldPassword: passwordInfo.oldPass,
              newPassword: passwordInfo.newPass,
            },
            {
              headers: {
                Authorization: session.authToken,
              },
            }
          )
          .then((res) => {
            //console.log(res.data.message)
            setmsg(res.data.message)
            setWaiting(false)
            setPasswordInfo({
              newPass: "",
               oldPass: "",
                newPass2: "",
            })
          });
      } else {
        setmsg("new password does not match");
        setWaiting(false)
      }
    } else {
      setmsg("any field can not be empty");
      setWaiting(false)
    }
  };

  if (msg != "") {
    setTimeout(() => setmsg(""), 5000);
  }

  return (
    <div className="div-block-343">
                <h1 className="heading-149">Settings</h1>
                <div className="div-block-335">
                  <div className="div-block-336">
                    <img
                      src="images/carbon_notification-new.svg"
                      loading="lazy"
                      alt=""
                      className="image-87"
                    />
                    <div className="text-block-35">Password</div>
                  </div>
                  <div className="div-block-344">
                    <div className="text-block-36">Change Password</div>
                    <div className="text-block-40">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc ut amet tempor tristique ut. Ut nisl nisl.
                    </div>
                  </div>
                  <div className="div-block-350">
                    <div className="form-block-7 w-form">
                      <form
                        id="email-form"
                        name="email-form"
                        data-name="Email Form"
                        method="get"
                        className="form-5"
                      >
                        <input
                          type="password"
                          className="text-field-15 w-input"
                          maxLength={256}
                          name="oldPass"
                          data-name="Enter Old Password"
                          placeholder="Enter Old Password"
                          id="Enter-Old-Password"
                          onChange={(e) => onChangePassword(e)}
                        />
                        <input
                          type="password"
                          className="text-field-15 w-input"
                          maxLength={256}
                          name="newPass"
                          data-name="Enter New Password"
                          placeholder="Enter New Password"
                          id="Enter-New-Password"
                          onChange={(e) => onChangePassword(e)}
                        />
                        <input
                          type="password"
                          className="text-field-15 w-input"
                          maxLength={256}
                          name="newPass2"
                          data-name="Re - Enter New Password"
                          placeholder="Re - Enter New Password"
                          id="Re---Enter-New-Password"
                          onChange={(e) => onChangePassword(e)}
                        />
                        <div className="div-block-342 _1000">
                          <button
                            className="button-134 _222 w-button"
                            onClick={(e) => {
                              submit(e);
                            }}
                          >
                            {waiting?<div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>:'Save'}
                          </button>
                          <a
                            onClick={()=>router.push('/setting')}
                            className="button-135 black w-button"
                          >
                            Cancel
                          </a>
                        </div>
                        {msg && <p className="text-danger">{msg}</p>}
                      </form>
                      <div className="w-form-done">
                        <div>Thank you! Your submission has been received!</div>
                      </div>
                      <div className="w-form-fail">
                        <div>
                          Oops! Something went wrong while submitting the form.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="div-block-344">
                    <div className="text-block-36">Forgot Password?</div>
                    <div className="text-block-40">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc ut amet tempor tristique ut. Ut nisl nisl.
                    </div>
                  </div>
                </div>
              </div>
  );
};

export default Setting;
