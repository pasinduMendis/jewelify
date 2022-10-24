import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const AddInventory = (props) => {
  const { data: session } = useSession()
  //console.log(session)
  const [inventory, setinventory] = useState({
    categoryAbr: "",
    stockno: "",
    styleNumber: "",
    brand: "",
    manufacture: "",
    tag: "",
    storeCode: "",
    productName: "",
    companyName: "",
    companyCode: "",
    qty: "",
    sku: "",
    datebuy: "",
    datesold: "",
    shortDescription: "",
    longDescription: "",
    cost: "",
    retailPrice: "",
    onSale: "",
    productImages: [],
    prodCertificatePicture: "",
    certificateNumber: "",
    labCertification: "",
    attributes: {
      style:"",
      styleName:"",
      stoneClass: "",
      gemstoneType: "",
      stoneCut: "",
      stoneShape: "",
      stoneColor: "",
      stoneClarity: "",
      centerStoneCT: "",
      ctw: "",
      gender: "",
      metalType: "",
      metalColor: "",
      goldKarat: "",
      metalFinish: "",
      metalColorAvailability: "",
      ringSize: "",
      ringWidth: "",
      chainType: "",
      chainLength: "",
      chainWidth: "",
      hoopDiameter: "",
      pendantHeight: "",
      pendantWidth: "",
      prodWeight: "",
    },
    shippingLength: "",
    shippingWidth: "",
    shippingHeight: "",
    jewelryType: "",
    assetId: "",
  });
  const addData = async () => {
    console.log(inventory)
    await axios
      .post(
        "https://api.jewelify.ai/.netlify/functions/inventory",
        JSON.stringify({ products: [inventory] }),
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
                  setinventory({
                    categoryAbr: "",
                    stockno: "",
                    styleNumber: "",
                    brand: "",
                    manufacture: "",
                    tag: "",
                    storeCode: "",
                    productName: "",
                    companyName: "",
                    companyCode: "",
                    qty: "",
                    sku: "",
                    datebuy: "",
                    datesold: "",
                    shortDescription: "",
                    longDescription: "",
                    cost: "",
                    retailPrice: "",
                    onSale: "",
                    productImages: [],
                    prodCertificatePicture: "",
                    certificateNumber: "",
                    labCertification: "",
                    attributes: {
                      stoneClass: "",
                      gemstoneType: "",
                      stoneCut: "",
                      stoneShape: "",
                      stoneColor: "",
                      stoneClarity: "",
                      centerStoneCT: "",
                      ctw: "",
                      gender: "",
                      metalType: "",
                      metalColor: "",
                      goldKarat: "",
                      metalFinish: "",
                      metalColorAvailability: "",
                      ringSize: "",
                      ringWidth: "",
                      chainType: "",
                      chainLength: "",
                      chainWidth: "",
                      hoopDiameter: "",
                      pendantHeight: "",
                      pendantWidth: "",
                      prodWeight: "",
                    },
                    shippingLength: "",
                    shippingWidth: "",
                    shippingHeight: "",
                    jewelryType: "",
                    assetId: "",
                  });
                },
                (err) => {
                  console.log(err);
                }
              );
          } else {
            props.msg(res.data.message);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  };
  const tableRow = () => {
    return (
      <tr className="tbl-bg-white">
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.categoryAbr}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                categoryAbr: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.stockno}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                stockno: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.styleNumber}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                styleNumber: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.brand}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                brand: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.manufacture}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                manufacture: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.tag}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                tag: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.storeCode}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                storeCode: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.productName}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                productName: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.companyName}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                companyName: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.companyCode}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                companyCode: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="number"
            required
            value={inventory.qty}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                qty: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.sku}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                sku: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.datebuy}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                datebuy: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.datesold}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                datesold: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.shortDescription}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                shortDescription: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.longDescription}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                longDescription: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.cost}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                cost: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.retailPrice}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                retailPrice: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.onSale}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                onSale: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
             style={{ width: "100px" }}
            type="text"
            required
            value={inventory.productImages}
            onChange={(e) => {
              var imgLinks=e.target.value.replace(/\s/g,'')
              var arr=imgLinks.split(',')
              setinventory((inventory) => ({
                ...inventory,
                productImages: arr,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
             style={{ width: "100px" }}
            type="text"
            required
            value={inventory.prodCertificatePicture}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                prodCertificatePicture: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.certificateNumber}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                certificateNumber: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.labCertification}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                labCertification: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.style}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,style: e.target.value,}
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.styleName}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,styleName: e.target.value,}
              }));
            }}
          />
        </td>

        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.stoneClass}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,stoneClass: e.target.value,}
              }));
            }}
          />
        </td>

        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.gemstoneType}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,gemstoneType: e.target.value,}
              }));
            }}
          />
        </td>

        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.stoneCut}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,stoneCut: e.target.value,}
              }));
            }}
          />
        </td>

        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.stoneShape}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,stoneShape: e.target.value,}
              }));
            }}
          />
        </td>

        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.stoneColor}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,stoneColor: e.target.value,}
              }));
            }}
          />
        </td>

        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.stoneClarity}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,stoneClarity: e.target.value,}
              }));
            }}
          />
        </td>

        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.centerStoneCT}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,centerStoneCT: e.target.value,}
              }));
            }}
          />
        </td>

        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.ctw}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,ctw: e.target.value,}
              }));
            }}
          />
        </td>
        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.gender}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,gender: e.target.value,}
              }));
            }}
          />
        </td>
        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.metalType}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,metalType: e.target.value,}
              }));
            }}
          />
        </td>
        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.metalColor}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,metalColor: e.target.value,}
              }));
            }}
          />
        </td>
        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.goldKarat}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,goldKarat: e.target.value,}
              }));
            }}
          />
        </td>
        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.metalFinish}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,metalFinish: e.target.value,}
              }));
            }}
          />
        </td>
        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.ringSize}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,ringSize: e.target.value,}
              }));
            }}
          />
        </td>
        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.ringWidth}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,ringWidth: e.target.value,}
              }));
            }}
          />
        </td>
        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.chainType}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,chainType: e.target.value,}
              }));
            }}
          />
        </td>
        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.chainLength}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,chainLength: e.target.value,}
              }));
            }}
          />
        </td>
        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.chainWidth}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,chainWidth: e.target.value,}
              }));
            }}
          />
        </td>
        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.hoopDiameter}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,hoopDiameter: e.target.value,}
              }));
            }}
          />
        </td>
        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.centerSize}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,centerSize: e.target.value,}
              }));
            }}
          />
        </td>
        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.pendantHeight}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,pendantHeight: e.target.value,}
              }));
            }}
          />
        </td>
        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.pendantWidth}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,pendantWidth: e.target.value,}
              }));
            }}
          />
        </td>
        
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.totalCaratWeight}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,totalCaratWeight: e.target.value,}
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.attributes.prodWeight}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                attributes:{...inventory.attributes,prodWeight: e.target.value,}
              }));
            }}
          />
        </td>
 
        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.shippingLength}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                shippingLength: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.shippingWidth}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                shippingWidth: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.shippingHeight}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                shippingHeight: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            value={inventory.jewelryType}
            onChange={(e) => {
              setinventory((inventory) => ({
                ...inventory,
                jewelryType: e.target.value,
              }));
            }}
          />
        </td>

        <td>
          
          <input
            className="form-control"
            style={{ width: "100px" }}
            type="text"
            required
            disabled
            value={inventory.sku}
          />
        </td>

        <td>
          {
            <button
              style={{ width: "100px" }}
              className="btn btn-primary"
              onClick={() => {
                addData();
              }}
            >
              add inventory
            </button>
          }
        </td>
      </tr>
    );
  };
  return <>{tableRow()}</>;
};

export default AddInventory;
