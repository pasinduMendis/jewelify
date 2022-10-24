/* eslint-disable @next/next/no-html-link-for-pages */
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import useDrivePicker from "react-google-drive-picker";
import { useState, useEffect } from "react";
import { Awsupload } from "../custom/aws-upload/awsUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Dropzone from "react-dropzone";
import convert from 'image-file-resize';
import axios from "axios";
import { createImageFromInitials } from "../custom/createprofilePic";
import Dropdown from 'react-bootstrap/Dropdown';

export default function Layer10() {
  const { data: session, status } = useSession();
  const [filedata, setfileData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [finishUpload,setFinisUpload]=useState(false)
  const [dragDrop, setDragDrop] = useState(false);
  const [file, setFile] = useState([]);
  const [msg, setmsg] = useState("");
  const [Uperr,setUperr]=useState(false)
  const [totalFile,setTotalFile]=useState(0)
  const[uploadedFile,setUploadFile]=useState(0)
  const [openPicker, data, authResponse] = useDrivePicker();
  const [pageloading, setPageLoding] = useState(true);
  //console.log(process.env.BACK_BASE_URL)

  useEffect(() => {
    localStorage.setItem("redirect", "/");
    if (status != "loading" && !session) {
      localStorage.setItem("redirect", "/upload-image");
      router.push("/sign-in");
    } else if (status == "authenticated") {
      setPageLoding(false);
    }
  }, [session]);

  const gDriveUpload=async (fileDatas)=>{
    var resUrl=[]
    if(fileDatas.length>0){
      setTotalFile(fileDatas.length)
    for (let i = 0; i < fileDatas.length; i++) {
      console.log(fileDatas[i]);
      console.log(data);
      if (fileDatas[i].isShared) {
        const imageURL = `https://lh3.googleusercontent.com/d/${fileDatas[i].id}=w1024-h1024?authuser=0`;
        // const imageURL="https://drive.google.com/uc?id=1gmzbm7Towuy3-Pk0ET9WHSxwM-Trx3pv"
        console.log(imageURL);
        const resAxios = ""

        await axios.get(imageURL,{
          responseType: 'arraybuffer'
        }).then((res)=>{
          console.log(res.data)
          resAxios=res.data
        })
        console.log("*********")
        //const blob = await resAxios.arrayBuffer();
        //console.log(blob)
        var image_url=await Awsupload(resAxios, fileDatas[i].name, setProgress);
        setUploadFile(i+1)
        //uploadUrls.push(resUrl.Location)
      await axios.post(`https://api.jewelify.ai/.netlify/functions/inventory?imageName=${fileDatas[i].name}`,{productImages:[image_url.Location]},{headers: {
        Authorization:
        session.authToken,
      }}).then((res)=>{
        console.log(res)
      })
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
    var uploadUrls=[]
    if (file.length > 0) {
      setTotalFile(file.length)
      for (let i = 0; i < file.length; i++) {
        var convertFile=''
        var type=file[i].type.split(".")
        await convert({ 
          file: file[i],  
          width: 1024, 
          height: 1024, 
          type: type[type.length-1]
          }).then(resp => {
              // Response contain compressed and resized file
              convertFile=resp
          }).catch(error => {
               // Error
          })
        var resUrl=await Awsupload(convertFile, file[i].name, setProgress);
        setUploadFile(i+1)
        console.log(i)
        uploadUrls.push(resUrl.Location)
      await axios.post(`https://api.jewelify.ai/.netlify/functions/inventory?imageName=${file[i].name}`,{productImages:[resUrl.Location]},{headers: {
        Authorization:
        session.authToken,
      }}).then((res)=>{
        console.log(res)
      })
        if(i==file.length-1){
          setFinisUpload(true)
        }
      };
      console.log(uploadUrls)
      
      setFile([]);

    }
  };

  const onUploadDropzone = async (files) => {
    //console.log(file);
    var uploadUrls=[]
    if (files.length > 0) {
      setTotalFile(files.length)
      for (let i = 0; i < files.length; i++) {
        var convertFile=''
        var type=files[i].type.split(".")
        await convert({ 
          file: files[i],  
          width: 1024, 
          height: 1024, 
          type: type[type.length-1]
          }).then(resp => {
              // Response contain compressed and resized file
              convertFile=resp
          }).catch(error => {
               // Error
          })
        var resUrl=await Awsupload(convertFile, files[i].name, setProgress);
        setUploadFile(i+1)
        console.log(i)
        uploadUrls.push(resUrl.Location)
      await axios.post(`https://api.jewelify.ai/.netlify/functions/inventory?imageName=${files[i].name}`,{productImages:[resUrl.Location]},{headers: {
        Authorization:
        session.authToken,
      }}).then((res)=>{
        console.log(res)
      })
        if(i==files.length-1){
          setFinisUpload(true)
        }
      };
      console.log(uploadUrls)
      
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
   
    setTimeout(() => {setmsg(""); setUploadFile(0);
    setTotalFile(0);}, 5000);
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
      {pageloading ? (
        <div className=" d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : dragDrop ? (
        <>
        <div className="div-block-305">
          <div className="div-block-306-copy-2"  style={{overflow:'auto'}}>
            <div className="div-block-307-copy" onClick={() => setDragDrop(false)}>
              <img src="images/Group-731.svg" loading="lazy" alt="" />
            </div>
            <div className="div-block-308-copy pb-5">
              <h1 className="heading-147">Upload from Computer</h1>
              <div className="text-block-29">
                Select a folder where the image is place
              </div>
              <Dropzone
            multiple={true}
            onDrop={(acceptedFiles) => {onUploadDropzone(acceptedFiles)}}
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
                            {totalFile>0 && (
                              <>
                                <h5 className="text-success font-weight-bold text-center mt-5 row col-6">{uploadedFile}/{totalFile}</h5>
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
        <div>
          <div className="div-block-322 tab">
            <div><img src="images/Jewelify-1.svg" loading="lazy" alt="" /></div>
            <div className="div-block-315">
          {session?
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
              </>:
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
                }
          </div>
          </div>
          <div className="div-block-323">
            <div className="div-block-324"><img src="images/bx_menu.svg" loading="lazy" alt="" /></div><img src="images/Jewelify.svg" loading="lazy" alt="" className="image-84" />
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
                <a onClick={()=>router.push('/inventory')} className="link-block-31 highlight w-inline-block">
                  <div className="div-block-315">
                    <img
                      src="images/mdi_monetization_on-1.svg"
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
                <a onClick={()=>router.push('/e-commerce')} className="link-block-31 w-inline-block">
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
              <a  className="link-block-31 w-inline-block">
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
          {session?
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
             </>:
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
                }
          </div>
              </div>
              <div className="div-block-29">
                <div className="div-block-30">
                  <h1 className="heading-36">Next, Lets Set Up Your Product Photos. How Do You Want To Upload Them?</h1>
                  <div className="div-block-31">
                    <button className="link-block-4 w-inline-block" onClick={() => handleOpenPicker()}><img src="images/Group-727.png" loading="lazy" alt="" className="image-16" />
                      <h1 className="heading-37">Upload from Google Drive</h1>
                    </button>
                    <button data-w-id="ae86e838-33ed-3333-0a4f-1067d3597c00" className="link-block-4 w-inline-block" onClick={() => setDragDrop(true)}><img src="images/Group_1.png" loading="lazy" alt="" className="image-17" />
                      <h1 className="heading-37">Upload from USB connection</h1>
                    </button>
                    <button data-w-id="ae86e838-33ed-3333-0a4f-1067d3597c04" className="link-block-4 w-inline-block" onClick={() => setDragDrop(true)}><img src="images/Group-1.png" loading="lazy" alt="" className="image-18" />
                      <h1 className="heading-37">Upload from Computer</h1>
                    </button>
                  </div>
                </div>
              </div>
              <div className="spacer" />
            </div>
          </div>
        </div>
        {/* [if lte IE 9]><![endif] */}
      </div>
        </>
       
      ) :
      <div>
        <div>
          <div className="div-block-322 tab">
            <div><img src="images/Jewelify-1.svg" loading="lazy" alt="" /></div>
            <div className="div-block-315">
          {session?
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
              </>:
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
                }
          </div>
          </div>
          <div className="div-block-323">
            <div className="div-block-324"><img src="images/bx_menu.svg" loading="lazy" alt="" /></div><img src="images/Jewelify.svg" loading="lazy" alt="" className="image-84" />
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
                <a onClick={()=>router.push('/e-commerce')} className="link-block-31 highlight w-inline-block">
                  <div className="div-block-315">
                    <img
                      src="images/mdi_monetization_on-1.svg"
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
                <a onClick={()=>router.push('/e-commerce')} className="link-block-31 w-inline-block">
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
              <a  className="link-block-31 w-inline-block">
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
          {session?
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
              </>:
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
                }
          </div>
              </div>
              <div className="div-block-29">
                <div className="div-block-30">
                  <h1 className="heading-36">Next, Lets Set Up Your Product Photos. How Do You Want To Upload Them?</h1>
                  <div className="div-block-31">
                    <button className="link-block-4 w-inline-block" onClick={() => handleOpenPicker()}><img src="images/Group-727.png" loading="lazy" alt="" className="image-16" />
                      <h1 className="heading-37">Upload from Google Drive</h1>
                    </button>
                    <button data-w-id="ae86e838-33ed-3333-0a4f-1067d3597c00" className="link-block-4 w-inline-block" onClick={() => setDragDrop(true)}><img src="images/Group_1.png" loading="lazy" alt="" className="image-17" />
                      <h1 className="heading-37">Upload from USB connection</h1>
                    </button>
                    <button data-w-id="ae86e838-33ed-3333-0a4f-1067d3597c04" className="link-block-4 w-inline-block" onClick={() => setDragDrop(true)}><img src="images/Group-1.png" loading="lazy" alt="" className="image-18" />
                      <h1 className="heading-37">Upload from Computer</h1>
                    </button>
                  </div>
                </div>
                
                  
              <div>
              {progress != 0 && (
                              <>
                                <div className="row bg-blue align-items-center px-3">
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
              </div>
              </div>  
              <div className="spacer" />
            </div>
          </div>
        </div>
        {/* [if lte IE 9]><![endif] */}
      </div>
      }
    </div>
  );
}
