import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

 const InventoryMap = (props) => {
  const { data: session } = useSession()
  const [msg, setmsg] = useState("");
  const [loading,setLoding]=useState(false)
  const product = props.product;
  //console.log(product)
  const inventorySync= async (sku)=>{
    setLoding(true)
    try{
      await axios.post(`https://api.jewelify.ai/.netlify/functions/woo-commerce?sku=${sku}`,{},{
        headers: {
          Authorization:
          session.authToken,
        },
      }).then((res)=>{
        setmsg(res.data.message?res.data.message:res.data.products.message)
        setLoding(false)
        console.log(res.data)})
    }catch (err) {
      console.log(err)
      setmsg("failed");
      setLoding(false);
    }
      
  }

  const updateSync=async (sku,product)=>{
    setLoding(true)
    try{
      await axios.put(`https://api.jewelify.ai/.netlify/functions/woo-commerce?sku=${sku}`,{product},{
      headers: {
        Authorization:
        session.authToken,
      },
    }).then((res)=>{
      setmsg(res.data.message?res.data.message:res.data.products.message)
      setLoding(false)
      console.log(res.data)})
    }catch (err) {
      setmsg("failed");
      setLoding(false);
    }
    
  }

  const inventorySyncShopify= async (sku)=>{
    setLoding(true)
    try{
      await axios.post(`https://api.jewelify.ai/.netlify/functions/shopify?sku=${sku}`,{},{
        headers: {
          Authorization:
          session.authToken,
        },
      }).then((res)=>{
        setmsg(res.data.message?res.data.message:res.data.products.message)
        setLoding(false)
        console.log(res.data)})
    }catch (err) {
      setmsg("failed");
      setLoding(false);
    }
      
  }

  const updateSyncShopify=async (sku,product)=>{
    setLoding(true)
    try{
      await axios.put(`https://api.jewelify.ai/.netlify/functions/shopify?sku=${sku}`,{},{
      headers: {
        Authorization:
        session.authToken,
      },
    }).then((res)=>{
      setmsg(res.data.message?res.data.message:res.data.products.message)
      setLoding(false)
      //console.log(res.data)
    })
    }catch (err) {
      setmsg("failed");
      setLoding(false);
    }
    
  }
  if(msg){
    setTimeout(() => setmsg(""), 5000);
  }
  const tableRow = () => {
    return (
      <tr className="tbl-bg-white">
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.categoryAbr}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.stockno}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.styleNumber}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.brand}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.manufacture}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.tag}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.storeCode}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.productName}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.companyName}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.companyCode}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.qty}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.sku}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.datebuy}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.datesold}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.shortDescription}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.longDescription}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.cost}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.retailPrice}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.onSale}</div></td>
        <td><div style={{maxWidth:'100px',}}>{product.productImages && product.productImages.length>0?<img src={product.productImages[0]} alt='jwelify' style={{height:'35px'}} />:"no images"}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.prodCertificatePicture}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.certificateNumber}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.labCertification}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.style}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.styleName}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.stoneClass}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.gemstoneType}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.stoneCut}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.stoneShape}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.stoneColor}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.stoneClarity}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.centerStoneCT}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.ctw}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.gender}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.metalType}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.metalColor}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.goldKarat}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.metalFinish}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.ringSize}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.ringWidth}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.chainType}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.chainLength}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.chainWidth}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.hoopDiameter}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.centerSize}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.pendantHeight}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.pendantWidth}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.totalCaratWeight}</div></td> 
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.attributes.prodWeight}</div></td> 
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.shippingLength}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.shippingWidth}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.shippingHeight}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.jewelryType}</div></td>
        <td><div style={{maxWidth:'100px',overflow: 'auto'}}>{product.assetId}</div></td>
        
        {product.id ?
         <td><div className="btn btn-primary" style={{width:'auto',height:'35px'}} onClick={()=>{updateSync(product.sku,product)}}>wooCom-update</div></td>
        :
        <td><div className="btn btn-success" style={{width:'auto',height:'35px'}} onClick={()=>{inventorySync(product.sku)}}>wooCom-sync</div></td>}
        
        {product.shopify_id ? <td><div className="btn btn-primary" style={{width:'auto',height:'35px'}} onClick={()=>{updateSyncShopify(product.sku,product)}}>shopify-update</div></td>
        :<td><div className="btn btn-success" style={{width:'auto',height:'35px',}} onClick={()=>{inventorySyncShopify(product.sku)}}>shopify-sync</div></td>}
        <td><div style={{width:'auto',height:'35px',}}>{msg &&<p className="text-danger">
          {msg}

        </p> }{loading && <div className="spinner-border" role="status">
  <span className="sr-only">Loading...</span>
</div>}</div></td>
        
      </tr>
    );
  };
  return <>{tableRow()}</>;
};

export default InventoryMap
