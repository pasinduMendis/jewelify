/* eslint-disable @next/next/no-html-link-for-pages */
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { createImageFromInitials } from "../custom/createprofilePic";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import convert from 'image-file-resize';
import { Awsupload } from "../custom/aws-upload/awsUpload";
import Dropzone from "react-dropzone";

const Setting = ({leftBar}) => {
  const { data: session, status } = useSession();
  const [pageloading, setPageLoding] = useState(true);
  const [waiting,setWaiting]=useState(false)
  const [upload,setUplod]=useState(false)
  const [progress, setProgress] = useState(0);
  const [tempPic,setTempPic]=useState("");
  
  const [userInfo, setuserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password:"",
    profilePicture:""
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
      console.log(session)
        setTempPic(session.profilePicture?session.profilePicture:"img/default-propic.jpg")
        setuserInfo({
          ...userInfo,
          firstName: session.name?session.name.split(" ")[0]:"",
          lastName: session.name?session.name.split(" ")[1]:"",
          emailNew : session.user.email,
          emailOld:session.id,
          profilePicture:session.profilePicture,
        });
      setPageLoding(false);
    }
  }, [session]);

  const onChangeInfo = (e) => {
    e.persist();
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onUpload = async (file) => {
    console.log(file);
    var uploadUrls=[]
    if (file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        var convertFile=''
        var type=file[i].type.split(".")
        await convert({ 
          file: file[i],  
          width: 512, 
          height: 512, 
          type: type[type.length-1]
          }).then(resp => {
              // Response contain compressed and resized file
              convertFile=resp
          }).catch(error => {
               // Error
          })
        var resUrl=await Awsupload(convertFile, file[i].name, setProgress);
        //uploadUrls.push(resUrl.Location)
        //console.log(resUrl.Location)
        setuserInfo({
            ...userInfo,
            profilePicture: resUrl.Location,
          });
          setTempPic(resUrl.Location)
          console.log(userInfo)

      };
      
      

    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setWaiting(true)
    var obj={
      profilePicture:tempPic,
      emailOld:session.id,
    }
    if(userInfo.firstName){
      obj["name"]=userInfo.name;
    }
    if(userInfo.emailNew){
      obj["emailNew"]=userInfo.emailNew;
    }
    if(userInfo.lastName){
      obj["name"]=`${userInfo.firstName} ${userInfo.lastName}`
    }
    if(userInfo.password){
      obj["password"]=userInfo.password;
    }
    /* if(userInfo.profilePicture){
      obj["profilePicture"]=userInfo.profilePicture;
    } */
    console.log(obj)
    
        await axios
          .put(
            "https://api.jewelify.ai/.netlify/functions/profile?type=updateProfile",
            obj,
            {
              headers: {
                Authorization: session.authToken,
              },
            }
          )
          .then(async (res) => {
            //console.log(res.data.message)
            const options = { redirect: false, email:userInfo.emailNew, password:userInfo.password }
    const result = await signIn('credentials', options)
    if (result?.error) {
      setmsg(result.error)
      setWaiting(false)
      
    }else{
      setmsg(res.data.message)
      setWaiting(false)
      setuserInfo({
          firstName: "",
          lastName: "",
          emailOld: "",
          emailNew:"",
          password:"",
      })
    }
  
          
  })
            
          //console.log(obj)
     
  };

  if (progress == 100) {
    setProgress(0);
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
      ) :upload? 
      <>
        <div className="div-block-305">
          <div className="div-block-306-copy-2"  style={{overflow:'auto'}}>
            <div className="div-block-307-copy" onClick={() => setUplod(false)}>
              <img src="images/Group-731.svg" loading="lazy" alt="" />
            </div>
            <div className="div-block-308-copy pb-5">
              <h1 className="heading-147">Upload from Computer</h1>
              <div className="text-block-29">
                Select a folder where the image is place
              </div>
              <Dropzone
            multiple={false}
            onDrop={(acceptedFiles) => {onUpload(acceptedFiles);setUplod(false)}}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                   <div className="container-fluid col-12">

                    <img
                src="images/Group-1000001977.png"
                loading="lazy"
                srcSet="images/Group-1000001977-p-500.png 500w, images/Group-1000001977-p-800.png 800w, images/Group-1000001977-p-1080.png 1080w, images/Group-1000001977.png 1220w"
                sizes="(max-width: 479px) 84vw, (max-width: 767px) 85vw, (max-width: 991px) 86vw, (max-width: 1439px) 67vw, (max-width: 1919px) 68vw, 70vw"
                alt=""
                className="image-79"
              />
                    </div>
                   
                  
                </div>
              </section>
            )}
          </Dropzone>
          
              <div className="">
              <div className="text-center row d-flex justify-content-center">
                          
                          {progress != 0 && (
                              <>
                                <div className="row bg-blue align-items-center col-10">
                        <div className="progress my-5" style={{ width: '90%',height:'3px' }}>
                          <div className="progress-bar" role="progressbar" style={{ width: `${progress}%`,height:'3px' }} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        
                        {/* {file?.paused ?
                      <div className='d-flex align-items-center justify-content-center btn my-5' style={{ background: '#EBF1FA', borderRadius: '100%', width: '2.5em', height: '2.5em' }} onClick={() => pauseResumeUpload(index, false)}>
                        <img src="/images/play-icon.png" alt="" width='20em' />
                      </div>
                      :
                      <div className='d-flex align-items-center justify-content-center btn my-5' style={{ background: '#EBF1FA', borderRadius: '100%', width: '2.5em', height: '2.5em' }} onClick={() => pauseResumeUpload(index, true)}>
                        <img src="/images/pause-icon.png" alt="" width='auto' />
                      </div>
                    } */}
                    <div className='ml-5 mx-md-2 d-flex align-items-center justify-content-center btn my-5' style={{ background: '#FFDCD8', borderRadius: '100%', width: '2.5em', height: '2.5em' }} onClick={() => CancelUploadToFireBase(index)}><img src="/images/close-icon.png" alt="" width='auto' /></div>
                  
                        </div>
                      
                              </>
                            )}
                            
                            {msg && (
                              <>
                                <h3 className="text-success mt-5 col-8 h5">{msg}</h3>
                              </>
                            )}
                          </div>
              </div>
            </div>
          </div>
        </div>
        <div>
        
        {/* [if lte IE 9]><![endif] */}
      </div>
        </>
      : (
        <div>
          
          
          
            <div className="">
              
              <div className="div-block-343">
              <h1 className="heading-149">Settings</h1>
              <div className="div-block-335">
                <div className="div-block-336"><img src="images/gg_profile.svg" loading="lazy" alt="" className="image-87" />
                  <div className="text-block-35">Profile Information</div>
                </div>
                <div className="div-block-337">
                  <div className="div-block-338">{progress==0?
                  <img src={tempPic?tempPic:session.profilePicture?session.profilePicture:"img/default-propic.jpg"} loading="lazy" alt="" className="image-88" />
                  :
                  <div className=" d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>}
                    <div className="div-block-340">
                      <div className="div-block-341">
                        <button  className="btn-primary p-3" onClick={()=>setUplod(true)}>Upload</button>
                        <button className="btn-danger p-3" onClick={()=>setTempPic("img/default-propic.jpg")}>Remove</button>
                      </div>
                    </div>
                  </div>
                  <div className="div-block-339">
                    <div className="w-form">
                      <form  autoComplete="off" id="email-form" name="email-form" data-name="Email Form" method="get">
                      <input type="text" className="text-field-14 w-input" maxLength={256} name="firstName" data-name="First Name" placeholder={userInfo.firstName?userInfo.firstName:"First Name"} id="First-Name" onChange={(e) => onChangeInfo(e)} />
                        <input type="text" className="text-field-14 w-input" maxLength={256} name="lastName" data-name="Last Name" placeholder={userInfo.lastName?userInfo.lastName:"Last Name"} id="Last-Name" onChange={(e) => onChangeInfo(e)}/>
                        <input type="email" className="text-field-14 w-input" maxLength={256} name="emailNew" data-name="First Name" placeholder={session.user.email} id="First-Name" onChange={(e) => onChangeInfo(e)} />
                        <input type="password" className="text-field-14 w-input" maxLength={256} name="password" data-name="enter your password" placeholder="enter your password" id="Last-Name" onChange={(e) => onChangeInfo(e)}/>
            
                        <div className="div-block-342">
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
                        {msg && <p className="text-danger my-2">{msg}</p>}
                      </form>
                    </div>
                  </div>
                </div>
                {/* <div className="div-block-337">
                  <div className="div-block-338"><img src="images/155-1.png" loading="lazy" alt="" className="image-88" />
                    <div className="div-block-340">
                      <div className="div-block-341">
                        <a  className="button-134 w-button">Change Picture</a>
                        <a  className="button-135 w-button">Remove Picture</a>
                      </div>
                    </div>
                  </div>
                  <div className="div-block-339">
                    <div className="w-form">
                      <form id="email-form" name="email-form" data-name="Email Form" method="get"><input type="text" className="text-field-14 w-input" maxLength={256} name="Store-Name" data-name="Store Name" placeholder="Store Name" id="Store-Name" /><input type="text" className="text-field-14 w-input" maxLength={256} name="Platform-Name" data-name="Platform Name" placeholder="Platform Name" id="Platform-Name" /><input type="email" className="text-field-14 w-input" maxLength={256} name="Email-3" data-name="Email 3" placeholder="Email" id="Email-3" />
                        <div className="div-block-342">
                          <a  className="button-134 _222 w-button">Save</a>
                          <a  className="button-135 black w-button">Cancel</a>
                        </div>
                      </form>
                      <div className="w-form-done">
                        <div>Thank you! Your submission has been received!</div>
                      </div>
                      <div className="w-form-fail">
                        <div>Oops! Something went wrong while submitting the form.</div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
              <div className="spacer" />
            </div>
          
        </div>
      )}
    </div>
  );
};

export default Setting;
