import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from 'react-papaparse';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);
const GREY_DIM = '#686868';

const styles = {
  zone: {
    alignItems: 'center',
    //border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
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
};

const getDataMap = (item) => {
  const obj = {
    categoryAbr: item.categoryAbr ? item.categoryAbr : "",
    stockno: item.stockno ? item.stockno : "",
    styleNumber: item.styleNumber ? item.styleNumber : "",
    brand: item.brand ? item.brand : "",
    manufacture: item.manufacture ? item.manufacture : "",
    tag: item.tag ? item.tag : "",
    storeCode: item.storeCode ? item.storeCode : "",
    productName: item.productName ? item.productName : "",
    companyName: item.companyName ? item.companyName : "",
    companyCode: item.companyCode ? item.companyCode : "",
    qty: item.qty ? item.qty : "",
    sku: item.sku ? item.sku : "",
    datebuy: item.datebuy ? item.datebuy : "",
    datesold: item.datesold ? item.datesold : "",
    shortDescription: item.shortDescription ? item.shortDescription : "",
    longDescription: item.longDescription ? item.longDescription : "",
    cost: item.cost ? item.cost : "",
    retailPrice: item.retailPrice ? item.retailPrice : "",
    onSale: item.onSale ? item.onSale : "",
    productImages: item.productImages ? item.productImages : "",
    prodCertificatePicture: item.prodCertificatePicture
      ? item.prodCertificatePicture
      : "",
    certificateNumber: item.certificateNumber ? item.certificateNumber : "",
    labCertification: item.labCertification ? item.labCertification : "",
    attributes: {
      stoneClass:item.stoneClass?item.stoneClass:"",
      gemstoneType: item.gemstoneType?item.gemstoneType:"",
      stoneCut:item.stoneCut?item.stoneCut:"",
      stoneShape:item.stoneShape?item.stoneShape:"",
      stoneColor:item.stoneColor?item.stoneColor:"",
      stoneClarity:item.stoneClarity?item.stoneClarity:"",
      centerStoneCT:item.centerStoneCT?item.centerStoneCT:"",
      ctw:item.ctw?item.ctw:"",
      gender:item.gender?item.gender:"",
      metalType:item.metalType?item.metalType:"",
      metalColor:item.metalColor?item.metalColor:"",
      goldKarat:item.goldKarat?item.goldKarat:"",
      metalFinish:item.metalFinish?item.metalFinish:"",
      metalColorAvailability:item.metalColorAvailability?item.metalColorAvailability:"",
      ringSize:item.ringSize?item.ringSize:"",
      ringWidth:item.ringWidth?item.ringWidth:"",
      chainType:item.chainType?item.chainType:"",
      chainLength:item.chainLength?item.chainLength:"",
      chainWidth:item.chainWidth?item.chainWidth:"",
      hoopDiameter:item.hoopDiameter?item.hoopDiameter:"",
      pendantHeight:item.pendantHeight?item.pendantHeight:"",
      pendantWidth:item.pendantWidth?item.pendantWidth:"",
      prodWeight:item.prodWeight?item.prodWeight:""
    },
    
    shippingLength: item.shippingLength ? item.shippingLength : "",
    shippingWidth: item.shippingWidth ? item.shippingWidth : "",
    shippingHeight: item.shippingHeight ? item.shippingHeight : "",
    jewelryType: item.jewelryType ? item.jewelryType : "",
    assetId: item.assetId ? item.assetId : "",
  };
  return obj;
};

function FileUploader(props) {
  const { data: session } = useSession()
  const [add, setAdd] = useState(false);
  const [readCsv, setRead] = useState([]);
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );
  const uploadInventory =async () => {
    var product=[]
    console.log(readCsv)
    if(readCsv.length>1){
      for(let i=1;i<readCsv.length-1;i++){
        var inventory={}
        readCsv[0].map((item,id)=>{
          inventory[`${item}`]=readCsv[i][id]
        })
        //console.log(getDataMap(inventory))
        product.push(getDataMap(inventory))

      }
      console.log(product)
      await axios
      .post(
        "https://api.jewelify.ai/.netlify/functions/inventory",
        JSON.stringify({ products: product }),
        {
          headers: {
            Authorization:
            session.authToken,
          },
        }
      )
      .then(
        async (res) => {
          //console.log(inven);
          console.log(res);

          if (
            res.data.message == "You have successfully uploaded your inventory"
          ) {
            await axios
              .get("https://api.jewelify.ai/.netlify/functions/inventory", {
                headers: {
                  Authorization:
                  session.authToken,
                },
              })
              .then(
                (res) => {
                  //console.log(inven);
                  props.msg("You have successfully uploaded your inventory");
                  props.setInv(res.data);
                  props.dispType('ADD PRODUCT')
                },  
                (err) => {
                  console.log(err);
                }
              
              );
          } else {
            props.msg(res.data.message);
            props.dispType('add products')
          }
        },
        (err) => {
          console.log(err);
        }
      );


    }
  };
  const border = {
    border: "1px solid #000",
    //width: "50%",
    margin: "0 auto",
    paddingBottom: "30px",
    backgroundColor: "#F8F8F8",
  };
  const File = {
    opacity: "0",
    //position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    cursor: "pointer",
  };

  const Center = {
    borderRadius: "30px",
    padding: "10px",
    backgroundColor: "#0288F7",
    border: "0px",
  };
  return (
    <>
      <div>
        <div>
       <div className="div-block-10 aaaa">
          <div className="wrap-upload-popup csvUpload" style={{overflowY:"scroll"}}>
            <button  onClick={()=>props.dispType('add products')}
                  data-bs-dismiss="modal"
                  aria-label="Close">
                    <img src="images/Vector-1.svg" loading="lazy" data-w-id="fbecfd21-e3d0-0374-acf5-5fbf7d3aefaa" alt="" className="image-13" />
                  </button>
            
              {/* Footer */}
              <div className="border" style={border}>
                <div className="row file_icon">
                <CSVReader
      onUploadAccepted={(results) => {
        console.log('---------------------------');
        console.log(results);

        
        setAdd(true)
        setRead(results.data)
        setZoneHover(false);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setZoneHover(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setZoneHover(false);
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
              <>
                <div style={styles.file}>
                  <div style={styles.info}>
                    <span style={styles.size}>
                      {formatFileSize(acceptedFile.size)}
                    </span>
                    <span style={styles.name}>{acceptedFile.name}</span>
                  </div>
                  <div style={styles.progressBar}>
                    <ProgressBar />
                  </div>
                  <div
                    {...getRemoveFileProps()}
                    style={styles.remove}
                    onMouseOver={(event) => {
                      event.preventDefault();
                      setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                    }}
                    onMouseOut={(event) => {
                      event.preventDefault();
                      setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                    }}
                  >
                    <Remove color={removeHoverColor} />
                  </div>
                </div>
              </>
            ) : (<>
            <div>
            <h1 className="heading-24">Upload A File</h1>
            <div className="div-block-11">
                  <h1 className="heading-26">Drop File here</h1>
                  <h1 className="heading-27">Supports CSV, XLS, XLXS, XLSM</h1>
                </div>
            </div>
            </>
                
            )}
          </div>
        </>
      )}
    </CSVReader>
                </div>
              </div>

              {/* Adding button and OR */}
              <div className="row">
                <div className="col-md-12">
                  <p className="text-center mt-5">OR</p>
                </div>
                <div
                  className=" d-grid  col-8 mx-auto"
                  style={{ paddingBottom: "50px" }}
                >
                  <CSVReader
      onUploadAccepted={(results) => {
        console.log('---------------------------');
        console.log(results);
        console.log('---------------------------');
        setRead(results.data)
        setAdd(true)
        setZoneHover(false);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setZoneHover(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setZoneHover(false);
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
                <div style={styles.file}>
                  <div style={styles.info}>
                    <span style={styles.size}>
                      {formatFileSize(acceptedFile.size)}
                    </span>
                    <span style={styles.name}>{acceptedFile.name}</span>
                  </div>
                  <div style={styles.progressBar}>
                    <ProgressBar />
                  </div>
                  <div
                    {...getRemoveFileProps()}
                    style={styles.remove}
                    onMouseOver={(event) => {
                      event.preventDefault();
                      setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                    }}
                    onMouseOut={(event) => {
                      event.preventDefault();
                      setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                    }}
                  >
                    <Remove color={removeHoverColor} />
                  </div>
                </div>
              </>
            ) : (
                
                <a  className="button-6 w-button" style={{width:'100%'}}>BROWSE</a>
              
            )}
          </div>
        </>
      )}
    </CSVReader>
    {add&&<button className="btn btn-lg btn-primary" onClick={()=>{uploadInventory()}}>add product</button>}
                </div>
                
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
      
    </>
  );
}


export default FileUploader;
