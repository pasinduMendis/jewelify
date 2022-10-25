/* eslint-disable @next/next/no-html-link-for-pages */
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import useDrivePicker from "react-google-drive-picker";
import { useState, useEffect } from "react";
import { Awsupload } from "../aws-upload/awsUpload";
import Dropzone from "react-dropzone";
import convert from 'image-file-resize';
import axios from "axios";
import { useRouter } from "next/router";

export default function UploadImage(props) {
  const { data: session, status } = useSession();
  const [filedata, setfileData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [finishUpload,setFinisUpload]=useState(false)
  const [dragDrop, setDragDrop] = useState(false);
  const [file, setFile] = useState([]);
  const [msg, setmsg] = useState("");
  const [Uperr,setUperr]=useState(false)
  const [mapImage,setmapImage]=useState(false)
  const [totalFile,setTotalFile]=useState(0)
  const[uploadedFile,setUploadFile]=useState(0)
  const [openPicker, data, authResponse] = useDrivePicker();
  const [pageloading, setPageLoding] = useState(true);
  const router=useRouter()
  //console.log(process.env.BACK_BASE_URL)



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
        "196130488066-3ds1ukalbpui1fle5n2885psime32q3u.apps.googleusercontent.com",
      developerKey: "AIzaSyBahE02UWYOO_w116czsXVJn6wPSixWMjk",
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
    setTotalFile(0);
    setDragDrop(false);
    setmapImage(true);}, 500);
    //router.push('/inventory')
    
  }
  if(Uperr){
    setUperr(false)
    setmsg("selected image is not sharerable")
    setTimeout(() => setmsg(""), 5000);
  }
  return (
    <div>
      
      {dragDrop ? (
        <>
        <div className="div-block-305">
          <div className="div-block-306-copy-2"  style={{overflow:'auto'}}>
            <div className="div-block-307-copy" onClick={() => props.dispType('add products')}>
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
        
        <div className="div-block-343">
        <div className="div-block-29">
                <div className="div-block-30">
                  <h1 className="heading-36" style={{marginBottom:'0px'}}>Next, Lets Set Up Your Product Photos. How Do You Want To Upload Them?</h1>
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
        </div>
        
        </>
       
      ) :mapImage
      ?
      <div className='div-block-10 aaaa'>
        <div className="wrap-upload-popup col-10">
      <div className="div-block-308 white " >
        <button
          onClick={() => setmapImage(false)}
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <img
            src="images/Vector-1.svg"
            loading="lazy"
            data-w-id="fbecfd21-e3d0-0374-acf5-5fbf7d3aefaa"
            alt=""
            className="image-13"
          />
        </button>
        <div className="text-center" >
          <h1 className="">How Did You Name Your Images</h1>
          <p className="mb-5">
            the name should match a field from your uploaded CSV
          </p>

          <div className="mt-5 pt-5" style={{ height: "40vh",overflowY:'scroll' }}>
            <div className="form-block-3 w-form">
              
                <div className="row justify-content-center">
                 <div className="col-6">
                                  <select
                                  className="form-select py-3 form-select-lg"
                                  maxLength={256}
                                  style={{fontSize:'20px'}}
                                >
                                  <option value="" selected disabled style={{fontSize:'20px'}}>
                                  select the naming type
                                  </option>
                                  <option value="" style={{fontSize:'20px'}} >
                                    sku_imageNo
                                  </option>
                                  <option value="" style={{fontSize:'20px'}} >
                                    styleNumber_imageNo
                                  </option>
                                
                                </select>
                                </div>
                               
                 
                </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
          <div className="div-block-332-copy justify-content-center">
                  <button
                className="py-4 field-label-11 text-light text-center "
                style={{
                  width: "100%",
                  backgroundColor: "#007ADF",
                  borderRadius: "40px",
                  
                }}
                onClick={() => props.dispType('add products')}
              >
                next
              </button>
                </div>
          </div>
          
        </div>
      </div>
    </div>
    </div>
    :
    <div className='div-block-10 aaaa'>
        <div className="wrap-upload-popup col-10"  style={{height:'90%',overflow:'scroll' }}>
      <div className="div-block-308 white " >
        <button
          onClick={() => props.dispType('add products')}
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <img
            src="images/Vector-1.svg"
            loading="lazy"
            data-w-id="fbecfd21-e3d0-0374-acf5-5fbf7d3aefaa"
            alt=""
            className="image-13"
          />
        </button>
     
        <div className="div-block-29">
                <div className="div-block-30" style={{paddingTop:'0px',height:'auto'}}>
                  <h1 className="heading-36" style={{marginBottom:'0px'}}>Next, Lets Set Up Your Product Photos. How Do You Want To Upload Them?</h1>
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
        
        </div>
        </div>
        </div>
      }
    </div>
  );
}
