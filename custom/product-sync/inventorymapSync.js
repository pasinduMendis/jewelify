import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const InventoryMapSync = (props) => {
  const product = props.product;
  const { data: session } = useSession();
  const [msg, setmsg] = useState("");
  const [loading, setLoding] = useState(false);
  const [edit, setEdit] = useState(false);
  

  const inventorySync = async (sku) => {
    setLoding(true);
    try {
      await axios
        .post(
          `https://api.jewelify.ai/.netlify/functions/woo-commerce?sku=${sku}`,
          {},
          {
            headers: {
              Authorization: session.authToken,
            },
          }
        )
        .then((res) => {
          console.log(res.data.products)
          setmsg(
            res.data.message ? res.data.message : res.data.products.message
          );
          setLoding(false);
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
      setmsg("failed");
      setLoding(false);
    }
  };

  const inventorySyncShopify = async (sku) => {
    setLoding(true);
    try {
      await axios
        .post(
          `https://api.jewelify.ai/.netlify/functions/shopify?sku=${sku}`,
          {},
          {
            headers: {
              Authorization: session.authToken,
            },
          }
        )
        .then((res) => {
          setmsg(
            res.data.message ? res.data.message : res.data.products.message
          );
          setLoding(false);
          console.log(res.data);
        });
    } catch (err) {
      setmsg("failed");
      setLoding(false);
    }
  };

  if (msg) {
    setTimeout(() => setmsg(""), 5000);
  }
  const onckeck=(e)=>{
    
    console.log(e.target.name)
    if(e.target.checked){
        props.showConfirm(true)
        var tempArr=props.currentVal
        tempArr.push(e.target.name)
        console.log(tempArr)
        props.selected(tempArr)
    }else{
        var tempArr=props.currentVal
        for(let i=0;i<props.currentVal.length;i++){
            if(props.currentVal[i]==e.target.name){
                tempArr.splice(i,1)
                props.selected(tempArr)
                console.log(tempArr)
                props.showConfirm(tempArr.length>0?true:false)
                break
            }
        }
    }
  }
  const tableRow = () => {
    return (
      <>
         
          <tr className="tbl-bg-white" >
          <td>
              <div className='text-center' style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
              <input type="checkbox" name={product.sku} onChange={(e)=>{onckeck(e)}}/>
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.categoryAbr}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.stockno}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.styleNumber}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.brand}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.manufacture}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.tag}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.storeCode}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.productName}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.companyName}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.companyCode}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.qty}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.sku}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.datebuy}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.datesold}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.shortDescription}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.longDescription}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.cost}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.retailPrice}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.onSale}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px" }}>
                {product.productImages && product.productImages.length > 0 ? (
                  <img
                    src={product.productImages[0]}
                    alt="jwelify"
                    style={{ height: "35px" }}
                  />
                ) : (
                  "no images"
                )}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.prodCertificatePicture}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.certificateNumber}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.labCertification}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.style}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.styleName}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.stoneClass}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.gemstoneType}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.stoneCut}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.stoneShape}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.stoneColor}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.stoneClarity}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.centerStoneCT}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.ctw}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.gender}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.metalType}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.metalColor}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.goldKarat}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.metalFinish}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.ringSize}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.ringWidth}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.chainType}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.chainLength}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.chainWidth}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.hoopDiameter}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.centerSize}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.pendantHeight}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.pendantWidth}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.totalCaratWeight}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.attributes.prodWeight}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.shippingLength}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.shippingWidth}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.shippingHeight}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.jewelryType}
              </div>
            </td>
            <td>
              <div style={{ maxWidth: "100px",minWidth: "100px", overflow: "auto" }}>
                {product.assetId}
              </div>
            </td>
          
          </tr>
        
      </>
    );
  };
  return <>{tableRow()}</>;
};

export default InventoryMapSync;
