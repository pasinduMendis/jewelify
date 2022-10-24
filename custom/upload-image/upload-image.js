import Head from "next/head";
import useDrivePicker from "react-google-drive-picker";
import { useState, useEffect } from "react";
import { Awsupload } from "../custom/aws-upload/awsUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Dropzone from "react-dropzone";
import convert from 'image-file-resize';
import { createImageFromInitials } from "../createprofilePic";

export default function Layer10(props) {
  const [filedata, setfileData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [finishUpload,setFinisUpload]=useState(false)
  const [dragDrop, setDragDrop] = useState(false);
  const [file, setFile] = useState([]);
  const [msg, setmsg] = useState("");
  const [Uperr,setUperr]=useState(false)
  const [openPicker, data, authResponse] = useDrivePicker();
  console.log(process.env.BACK_BASE_URL)

  const gDriveUpload=async (fileDatas)=>{
    var resUrl=[]
    if(fileDatas.length>0){
    for (let i = 0; i < fileDatas.length; i++) {
      console.log(fileDatas[i]);
      console.log(data);
      if (fileDatas[i].isShared) {
        const imageURL = `https://lh3.googleusercontent.com/d/${fileDatas[i].id}=w1024-h1024?authuser=0`;
        // const imageURL="https://drive.google.com/uc?id=1gmzbm7Towuy3-Pk0ET9WHSxwM-Trx3pv"
        console.log(imageURL);
        const res = await fetch(imageURL, {
          followRedirects: true,
          muteHttpExceptions: true /* ,headers: {
        'Authorization': 'Bearer ya29.a0ARrdaM-vzEjubuR0o57RLOAkh7G2QBx-ECX0jC0XTBLYsTu28QFFN1pypxJ2PJ07abFE5rT0hRYBJ0zdyXJGpIEFYGqBj74ia25NXSCIlUZHned1zBZ6WUD5tZp8JI3aDBsI6Qg7rGj0vz0OGdnzJTrGqNN-',
      }, */,
        });
        const blob = await res.arrayBuffer();
        var image_url=await Awsupload(blob, fileDatas[i].name, setProgress);
        resUrl.push(image_url.Location)
      } else {
        
        setUperr(true)
        console.log("selected image is not sharerable");
      }
    }
    console.log(resUrl)
  }
    setFinisUpload(true)
  }

  const onUpload = async () => {
    console.log(file);
    if (file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        var converFile=''
        var type=file[i].type.split(".")
        await convert({ 
          file: file[i],  
          width: 1024, 
          height: 1024, 
          type: type[type.length-1]
          }).then(resp => {
              // Response contain compressed and resized file
              converFile=resp
          }).catch(error => {
               // Error
          })
        await Awsupload(converFile, file[i].name, setProgress);
        if(i==file.length-1){
          setFinisUpload(true)
        }
      };
      setFile([]);

    }
  };

  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "988384303453-en9d8n6ugh02fo2pqrbosbgmp3hbphi2.apps.googleusercontent.com",
      developerKey: "AIzaSyCZZSktjEyKDmDkr4z85PiEPbukEAbPnOI",
      viewId: "DOCS_IMAGES",
      // token: token, // pass oauth token in case you already have one
      showUploadView: false,
      showUploadFolders: false,
      supportDrives: false,
      customScopes: ["https://www.googleapis.com/auth/drive.readonly"],
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: async (files) => {
        if (files.action === "cancel") {
          console.log("User clicked cancel/close button");
        }
        console.log(files);
        if (files.action == "picked") {
          files.docs ? gDriveUpload(files.docs) : setfileData([]);
        }
      },
    });
  };
  if (progress == 100 && finishUpload) {
    setProgress(0);
    setFinisUpload(false)
    setmsg("successfuly uploaded");
    setTimeout(() => setmsg(""), 5000);
  }
  if(Uperr){
    setUperr(false)
    setmsg("selected image is not sharerable")
    setTimeout(() => setmsg(""), 5000);
  }
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>Jewelify</title>
        <meta name="description" content />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Add your site or application content here */}
      <header className="inner-header">
        <nav className="main-nav">
          <div className="container">
            <div className="nav-wrapper">
              <div className="logo-wrapper">
                <a>
                  {" "}
                  <img src="/img/logo.svg" alt="jwelify" />{" "}
                </a>
              </div>
              <p></p>
              {session &&
                  <div className="prof-img float-right">
                  <img src={session.profilePicture?session.profilePicture:createImageFromInitials(500, session.id, '#1E90FF')} style={{width:"50px",  borderRadius: "50px"}} alt="" />
                </div>}
            </div>
          </div>
        </nav>
      </header>
      <div className="wrapper ">
        {/* pricing area
      ============================================ */}
        {dragDrop ? (
          <>
            <Dropzone
              multiple={true}
              onDrop={(acceptedFiles) => setFile(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div
                      className="container mt-5"
                      style={{
                        width: "50%",
                        border: "1px solid #000",
                        padding: "20px",
                      }}
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <h3 style={{ fontWeight: "600" }}>
                            Upload From Computer
                          </h3>
                          <p>Select a folder where the image is place</p>
                        </div>

                        <div className="col-md-12 mt-5">
                          {/* File uploader */}
                          <div
                            className="iconAndFileType"
                            style={{
                              border: "1px solid #000",
                              borderStyle: "dashed",
                            }}
                          >
                            <div
                              className="custom-file mb-4 text-center"
                              style={{ backgoundColor: "#ffff" }}
                            >
                              <FontAwesomeIcon
                                icon={faImage}
                                style={{
                                  fontSize: "100px",
                                  padding: "35px 0 40px",
                                }}
                              />
                              <div className="col-md-12">
                                <h5 className="fw-bolder text-center">
                                  Drop File here
                                </h5>
                                <p
                                  className="text-center"
                                  style={{ fontSize: "1rem" }}
                                >
                                  Supports JPG, JPEG2000, PNG
                                </p>
                              </div>
                            </div>
                            <div
                              className="chooseFile"
                              style={{ width: "100%", height: "100%" }}
                            ></div>
                          </div>
                          <div
                            className="col-md-12 mt-5"
                            style={{
                              border: "0px solid #000",
                              padding: "20px",
                            }}
                          ></div>

                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
            <div className="text-center d-flex justify-content-center">
                            
            {progress != 0 && (
                <>
                  <div className="col-8 mt-5">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: progress + "%", height: "3px" }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                    {progress + "%"}
                  </div>
                </>
              )}
              {msg && (
                <>
                  <h3 className="text-success mt-5 col-8 h5">{msg}</h3>
                </>
              )}
            </div>
            <div className="text-center my-4 d-flex justify-content-center">
              <div
                className="btn-lg btn-primary col-3 text-center d-flex justify-content-center"
                onClick={() => onUpload()}
              >
                upload
              </div>
              <div
                className="btn-lg btn-danger col-3 text-center d-flex justify-content-center"
                onClick={() => setDragDrop(false)}
              >
                close
              </div>
            </div>
          </>
        ) : (
          <div
            id="pricing-area"
            className="pricing-area custom-border"
            style={{ backgroundColor: "#f3fbfe" }}
          >
            <div className="container pt-100">
              <div className="row">
                <div className="col-md-12 text-center">
                  <div className="about-bottom-left mb-30 clearfix text-style">
                    <h3>
                      Next, Lets Set Up Your Product Photos. <br />
                      How Do You Want To Upload Them?
                    </h3>
                  </div>
                  <div className="row pb-100">
                    <div className="col-12 text-center">
                      <div className="g-card s-card">
                        <div className="g-grid s-grid">
                          <div
                            className="up-grid"
                            onClick={() => handleOpenPicker()}
                          >
                            <img src="/img/gdrive.png" alt="gdrive" />
                            <p>Upload from Google Drive</p>
                          </div>
                          <div className="up-grid">
                            <img src="/img/pdrive.png" alt="pdrive" />
                            <p>Upload from USB connection</p>
                          </div>
                          <div
                            className="up-grid"
                            onClick={() => setDragDrop(true)}
                          >
                            <img src="/img/desktop.png" alt="desktop" />
                            <p>Upload from Computer</p>
                          </div>
                        </div>
                        {progress != 0 && (
                          <>
                            <div className="">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: progress + "%", height: "3px" }}
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                              {progress + "%"}
                            </div>
                          </>
                        )}
                        {msg && (
                          <>
                            <p className="text-success h5">{msg}</p>
                          </>
                        )}
                      </div>{" "}
                      <br />
                      <br />
                      <button className="main-btn ">
                        <a >GET STARTED</a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* contact area
      ============================================ */}
      <div className="contact-area">
        <div className="container">
          <div className="row">
            <div className="conatct-info fix">
              <div className="col-md-5 col-sm-4 text-style">
                <h2>Jewelify</h2>
                <p>
                  Copyright © 2021
                  <a href="http://bootexperts.com/" target="blank">
                    Jewelify
                  </a>
                  <br />
                  .All right reserved.
                </p>
              </div>
              <div className="col-md-2 col-sm-4 footer-links text-style t-m-res">
                <h3 className="mb-30">Services</h3>
                <ul>
                  <li>
                    <a >service - 1</a>
                  </li>
                  <li>
                    <a >service - 2</a>
                  </li>
                  <li>
                    <a >service - 3</a>
                  </li>
                  <li>
                    <a >service - 4</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-2 col-sm-4 footer-links text-style t-m-res">
                <h3 className="mb-30">Company</h3>
                <ul>
                  <li>
                    {" "}
                    <a >Work</a>
                  </li>
                  <li>
                    <a >About</a>
                  </li>
                  <li>
                    <a >Resources</a>
                  </li>
                  <li>
                    <a >Pricing</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 col-sm-4 text-style t-m-res">
                <h3 className="mb-30">Useful Links</h3>
                <div className="footer-icon">
                  <ul>
                    <li>
                      <a>
                        <img src="/img/facebook.svg" alt="" width="20px" />
                      </a>{" "}
                    </li>
                    <li>
                      <a>
                        <img src="/img/instagram.svg" alt="" width="20px" />
                      </a>{" "}
                    </li>
                    <li>
                      <a>
                        <img src="/img/twitter.svg" alt="" width="20px" />
                      </a>{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* start scrollUp
      ============================================ */}
      {/*<div id="toTop">
          <i class="fa fa-chevron-up"></i>
      </div>
  </div>*/}
      {/* jquery
		============================================ */}
      {/* bootstrap JS
		============================================ */}
      {/* plugins JS
		============================================ */}
      {/* main JS
		============================================ */}
    </div>
  );
}
