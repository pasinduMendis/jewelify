import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from 'react-papaparse'
import { useRouter } from "next/router";
import Dropdown from "react-bootstrap/Dropdown";
import UploadImage from '../upload-image/upload-image'

const GREY = '#CCC'
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)'
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919'
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
)
const GREY_DIM = '#686868'

const styles = {
  zone: {
    alignItems: 'center',
    //border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  file: {
    background: 'linear-gradient(to bottom, #EEE, #DDD)',
    borderRadius: 20,
    display: 'flex',
    height: 120,
    width: 120,
    position: 'relative',
    zIndex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  size: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: '0.5em',
    justifyContent: 'center',
    display: 'flex',
  },
  name: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: '0.5em',
  },
  progressBar: {
    bottom: 14,
    position: 'absolute',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  zoneHover: {
    borderColor: GREY_DIM,
  },
  default: {
    borderColor: GREY,
  },
  remove: {
    height: 23,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 23,
  },
}

const getDataMap = (item) => {
  const obj = {
    categoryAbr: item.categoryAbr ? item.categoryAbr : '',
    stockno: item.stockno ? item.stockno : '',
    styleNumber: item.styleNumber ? item.styleNumber : '',
    brand: item.brand ? item.brand : '',
    manufacture: item.manufacture ? item.manufacture : '',
    tag: item.tag ? item.tag : '',
    storeCode: item.storeCode ? item.storeCode : '',
    productName: item.productName ? item.productName : '',
    companyName: item.companyName ? item.companyName : '',
    companyCode: item.companyCode ? item.companyCode : '',
    qty: item.qty ? item.qty : '',
    sku: item.sku ? item.sku : '',
    datebuy: item.datebuy ? item.datebuy : '',
    datesold: item.datesold ? item.datesold : '',
    shortDescription: item.shortDescription ? item.shortDescription : '',
    longDescription: item.longDescription ? item.longDescription : '',
    cost: item.cost ? item.cost : '',
    retailPrice: item.retailPrice ? item.retailPrice : '',
    onSale: item.onSale ? item.onSale : '',
    productImages: item.productImages ? item.productImages : '',
    prodCertificatePicture: item.prodCertificatePicture
      ? item.prodCertificatePicture
      : '',
    certificateNumber: item.certificateNumber ? item.certificateNumber : '',
    labCertification: item.labCertification ? item.labCertification : '',
    attributes: {
      stoneClass: item.stoneClass ? item.stoneClass : '',
      gemstoneType: item.gemstoneType ? item.gemstoneType : '',
      stoneCut: item.stoneCut ? item.stoneCut : '',
      stoneShape: item.stoneShape ? item.stoneShape : '',
      stoneColor: item.stoneColor ? item.stoneColor : '',
      stoneClarity: item.stoneClarity ? item.stoneClarity : '',
      centerStoneCT: item.centerStoneCT ? item.centerStoneCT : '',
      ctw: item.ctw ? item.ctw : '',
      gender: item.gender ? item.gender : '',
      metalType: item.metalType ? item.metalType : '',
      metalColor: item.metalColor ? item.metalColor : '',
      goldKarat: item.goldKarat ? item.goldKarat : '',
      metalFinish: item.metalFinish ? item.metalFinish : '',
      metalColorAvailability: item.metalColorAvailability
        ? item.metalColorAvailability
        : '',
      ringSize: item.ringSize ? item.ringSize : '',
      ringWidth: item.ringWidth ? item.ringWidth : '',
      chainType: item.chainType ? item.chainType : '',
      chainLength: item.chainLength ? item.chainLength : '',
      chainWidth: item.chainWidth ? item.chainWidth : '',
      hoopDiameter: item.hoopDiameter ? item.hoopDiameter : '',
      pendantHeight: item.pendantHeight ? item.pendantHeight : '',
      pendantWidth: item.pendantWidth ? item.pendantWidth : '',
      prodWeight: item.prodWeight ? item.prodWeight : '',
    },

    shippingLength: item.shippingLength ? item.shippingLength : '',
    shippingWidth: item.shippingWidth ? item.shippingWidth : '',
    shippingHeight: item.shippingHeight ? item.shippingHeight : '',
    jewelryType: item.jewelryType ? item.jewelryType : '',
    assetId: item.assetId ? item.assetId : '',
  }
  return obj
}

function FileUploader(props) {
  const { data: session } = useSession()
  const [add, setAdd] = useState(false)
  const [readCsv, setRead] = useState([])
  const { CSVReader } = useCSVReader()
  const [zoneHover, setZoneHover] = useState(false)
  const[isBroeseFile,setIsBroeseFile]=useState(false)
  const[isDragFile,setIsDragFile]=useState(false)
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  )
  const [loading,setLoading]=useState(false)
  const [dispModeMap,setdispModeMap]=useState("csvUpload")
  const router =useRouter()
  const [inventory, setinventory] = useState({});
  const uploadInventory = async (e) => {
    e.preventDefault()
    setLoading(true)
    var product = []
    //console.log(readCsv)
    //console.log(inventory)
    if (readCsv.length > 1) {
      for (let i = 1; i < readCsv.length - 1; i++) {
        var inventory2 = {
          productImages:[],}
        readCsv[0].map((item, id) => {
          if(inventory[`${item}`]){
            inventory2[inventory[`${item}`]] = readCsv[i][id]
          }
          
        })
        console.log(inventory2)
        //console.log(getDataMap(inventory))
        product.push(getDataMap(inventory2))
      }
      console.log(product)
      await axios
        .post(
          'https://api.jewelify.ai/.netlify/functions/inventory',
          JSON.stringify({ products: product }),
          {
            headers: {
              Authorization: session.authToken,
            },
          }
        )
        .then(
          async (res) => {
            //console.log(inven);
            console.log(res)

            if (
              res.data.message ==
              'You have successfully uploaded your inventory'
            ) {
              await axios
                .get('https://api.jewelify.ai/.netlify/functions/inventory', {
                  headers: {
                    Authorization: session.authToken,
                  },
                })
                .then(
                  (res) => {
                    //console.log(inven);
                    props.msg('You have successfully uploaded your inventory')
                    props.setInv(res.data)
                    setdispModeMap('imageUpload')
                    //props.dispType('ADD PRODUCT')
                  },
                  (err) => {
                    console.log(err)
                  }
                )
            } else {
              props.msg(res.data.message)
              props.dispType('add products')
            }
          },
          (err) => {
            console.log(err)
          }
        )
    }
  }

  const objectKeyArr=[
    "categoryAbr",
    "stockno",
    "styleNumber",
    "brand",
    "manufacture",
    "tag",
    "storeCode",
    "productName",
    "companyName",
    "companyCode",
    "qty",
    "sku",
    "datebuy",
    "datesold",
    "shortDescription",
    "longDescription",
    "cost",
    "retailPrice",
    "onSale",
    "prodCertificatePicture",
    "certificateNumber",
    "labCertification",
      "style",
      "styleName",
      "stoneClass",
      "gemstoneType",
      "stoneCut",
      "stoneShape",
      "stoneColor",
      "stoneClarity",
      "centerStoneCT",
      "ctw",
      "gender",
      "metalType",
      "metalColor",
      "goldKarat",
      "metalFinish",
      "metalColorAvailability",
      "ringSize",
      "ringWidth",
      "chainType",
      "chainLength",
      "chainWidth",
      "hoopDiameter",
      "pendantHeight",
      "pendantWidth",
      "prodWeight",
    "shippingLength",
    "shippingWidth",
    "shippingHeight",
    "jewelryType",
  ]

  return (
    <>
      
      <div>
        <div>
          <div className='div-block-10 aaaa'>
            {dispModeMap=='csvMap'?
            <div className="wrap-upload-popup col-10">
            <div className="div-block-308 white mt-5" >
              <button
                onClick={() => props.dispType("CONNECT")}
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
              <div className="text-center">
                <h1 className="">Set Up Your Product Mapping</h1>
                <p className="mb-5">
                  tell us what each column from your csv equals in our system so we
                  can import the products correctly
                </p>
      
                <div className="mt-5 pt-5" style={{ height: "40vh",overflowY:'scroll' }}>
                  <div className="form-block-3 w-form">
                    <form
                      id="email-form"
                      name="email-form"
                      data-name="Email Form"
                      method="get"
                      className="form-4"
                      
                    >
                      <div className="form-group row justify-content-center">
                        
                          {objectKeyArr && objectKeyArr.map((key, id) => {
                                        return <>
                                        <label className="col-4 col-form-label text-start">{key}</label>
                        <div className="col-6 mb-4">
                                        <select
                                        className="form-control"
                                        maxLength={256}
                                        onChange={(e) => {
                                          e.persist();
                                          setinventory({
                                            ...inventory,
                                            [e.target.value]:key,
                                          });
                                        }}
                                      >
                                        <option value="" selected>
                                          none
                                        </option>
                                        {readCsv[0] && readCsv[0].map((key) => {
                                    return <><option value={key}>{key}</option></>;
                                  })}
                                      </select>
                                      </div></>;
                                      })}
                       
                      </div>
      
                     
                    </form>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                <div className="div-block-332-copy justify-content-end">
                        <button className="button-133 w-button" onClick={(e) => uploadInventory(e)}>
                          {loading ? (
                            <div className=" d-flex justify-content-center">
                              <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                          ) : (
                            "next"
                          )}
                        </button>
                      </div>
                </div>
                
              </div>
            </div>
          </div>
            :
            dispModeMap=='imageUpload'?
            <UploadImage dispType={(val)=>props.dispType(val)}/>:
            <div 
            className="wrap-upload-popup"
            style={{maxWidth:'100%'}}
            >
              <button
                onClick={() => props.dispType('add products')}
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <img
                  src='images/Vector-1.svg'
                  loading='lazy'
                  data-w-id='fbecfd21-e3d0-0374-acf5-5fbf7d3aefaa'
                  alt=''
                  className='image-13'
                />
              </button>

              {/* Footer */}
              {!isBroeseFile && <div>
                <div className='row file_icon' style={{marginTop:`${isDragFile?'100px':0}`}}>
                  <CSVReader
                    onUploadAccepted={(results) => {
                      console.log('---------------------------')
                      console.log(results)

                      setAdd(true)
                      setRead(results.data)
                      setZoneHover(false)
                    }}
                    onDragOver={(event) => {
                      event.preventDefault()
                      setZoneHover(true)
                    }}
                    onDragLeave={(event) => {
                      event.preventDefault()
                      setZoneHover(false)
                    }}
                    noClick
                  >
                    {({
                      getRootProps,
                      acceptedFile,
                      ProgressBar,
                      getRemoveFileProps,
                      Remove,
                    }) => (
                      <>
                        <div
                          {...getRootProps()}
                          style={Object.assign(
                            {},
                            styles.zone,
                            zoneHover && styles.zoneHover
                          )}
                        >
                          {acceptedFile ? (
                            <>{setIsDragFile(true)}
                              <div style={styles.file}>
                                <div style={styles.info}>
                                  <span style={styles.size}>
                                    {formatFileSize(acceptedFile.size)}
                                  </span>
                                  <span style={styles.name}>
                                    {acceptedFile.name}
                                  </span>
                                </div>
                                <div style={styles.progressBar}>
                                  <ProgressBar />
                                </div>
                                <div
                                  {...getRemoveFileProps()}
                                  style={styles.remove}
                                  onMouseOver={(event) => {
                                    event.preventDefault()
                                    setRemoveHoverColor(
                                      REMOVE_HOVER_COLOR_LIGHT
                                    )
                                  }}
                                  onMouseOut={(event) => {
                                    event.preventDefault()
                                    setRemoveHoverColor(
                                      DEFAULT_REMOVE_HOVER_COLOR
                                    )
                                  }}
                                  
                                >
                                  <Remove color={removeHoverColor} />
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <h1 className='heading-24'>Upload A File</h1>
                              <div className='div-block-11 mt-1 ' style={{backgroundSize:'10%',height:'40vh'}}>
                                <h1 className='heading-26 '>Drop File here</h1>
                                <h1 className='heading-27'>
                                  Supports CSV, XLS, XLXS, XLSM
                                </h1>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </CSVReader>
                  
                </div>
              </div>}

              {/* Adding button and OR */}
              <div className='row'>
                {!(isDragFile || isBroeseFile) &&<div className='col-md-12'>
                  <p className='text-center'>OR</p>
                </div>}
                <div
                  className=' d-grid  col-8 mx-auto'
                  style={{ paddingBottom: '50px',marginTop:`${isBroeseFile?'100px':0}` }}
                >
                  {!isDragFile &&<CSVReader
                    onUploadAccepted={(results) => {
                      console.log('---------------------------')
                      console.log(results)
                      console.log('---------------------------')
                      setRead(results.data)
                      setAdd(true)
                      setZoneHover(false)
                    }}
                    onDragOver={(event) => {
                      event.preventDefault()
                      setZoneHover(true)
                    }}
                    onDragLeave={(event) => {
                      event.preventDefault()
                      setZoneHover(false)
                    }}
                    noDrag
                  >
                    {({
                      getRootProps,
                      acceptedFile,
                      ProgressBar,
                      getRemoveFileProps,
                      Remove,
                    }) => (
                      <>
                        <div
                          {...getRootProps()}
                          style={Object.assign(
                            {},
                            styles.zone,
                            zoneHover && styles.zoneHover
                          )}
                        >
                          {acceptedFile ? (
                            <>
                            {setIsBroeseFile(true)}
                              <div style={styles.file}>
                                <div style={styles.info}>
                                  <span style={styles.size}>
                                    {formatFileSize(acceptedFile.size)}
                                  </span>
                                  <span style={styles.name}>
                                    {acceptedFile.name}
                                  </span>
                                </div>
                                <div style={styles.progressBar}>
                                  <ProgressBar />
                                </div>
                                <div
                                  {...getRemoveFileProps()}
                                  style={styles.remove}
                                  onMouseOver={(event) => {
                                    event.preventDefault()
                                    setRemoveHoverColor(
                                      REMOVE_HOVER_COLOR_LIGHT
                                    )
                                  }}
                                  onMouseOut={(event) => {
                                    event.preventDefault()
                                    setRemoveHoverColor(
                                      DEFAULT_REMOVE_HOVER_COLOR
                                    )
                                  }}
                                >
                                  <Remove color={removeHoverColor} />
                                </div>
                              </div>
                            </>
                          ) : (
                            <a
                              className='button-6 w-button'
                              style={{ width: '100%' }}
                            >
                              BROWSE
                            </a>
                          )}
                        </div>
                      </>
                    )}
                  </CSVReader>}
                  {add && (
                    <button
                      className='button-6 w-button'
                      onClick={() => {
                        setdispModeMap("csvMap")
                      }}
                    >
                      {loading?<div className=' d-flex justify-content-center'>
            <div className='spinner-border' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>:"add product"}
                    </button>
                  )}
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default FileUploader
