import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const InventoryMapEcom = (props) => {
  console.log(props.product.wooComObj);
  const product =
    props.ecom == "woo-commerce"
      ? props.product.wooComObj.sku
        ? props.product.wooComObj
        : props.product
      : props.product.shopifyObj.sku
      ? props.product.shopifyObj
      : props.product;
  const { data: session } = useSession();
  const [msg, setmsg] = useState("");
  const [loading, setLoding] = useState(false);
  const [edit, setEdit] = useState(false);
  const [inventory, setinventory] = useState({
    categoryAbr: product.categoryAbr,
    stockno: product.stockno,
    styleNumber: product.styleNumber,
    brand: product.brand,
    manufacture: product.manufacture,
    tag: product.tag,
    storeCode: product.storeCode,
    productName: product.productName,
    companyName: product.companyName,
    companyCode: product.companyCode,
    qty: product.qty,
    sku: product.sku,
    datebuy: product.datebuy,
    datesold: product.datesold,
    shortDescription: product.shortDescription,
    longDescription: product.longDescription,
    cost: product.cost,
    retailPrice: product.retailPrice,
    onSale: product.onSale,
    productImages: product.productImages,
    prodCertificatePicture: product.prodCertificatePicture,
    certificateNumber: product.certificateNumber,
    labCertification: product.labCertification,
    attributes: {
      style: product.attributes.style ? product.attributes.style : "",
      styleName: product.attributes.styleName,
      stoneClass: product.attributes.stoneClass,
      gemstoneType: product.attributes.gemstoneType,
      stoneCut: product.attributes.stoneCut,
      stoneShape: product.attributes.stoneShape,
      stoneColor: product.attributes.stoneColor,
      stoneClarity: product.attributes.stoneClarity,
      centerStoneCT: product.attributes.centerStoneCT,
      ctw: product.attributes.ctw,
      gender: product.attributes.gender,
      metalType: product.attributes.metalType,
      metalColor: product.attributes.metalColor,
      goldKarat: product.attributes.goldKarat,
      metalFinish: product.attributes.metalFinish,
      metalColorAvailability: product.attributes.metalColorAvailability,
      ringSize: product.attributes.ringSize,
      ringWidth: product.attributes.ringWidth,
      chainType: product.attributes.chainType,
      chainLength: product.attributes.chainLength,
      chainWidth: product.attributes.chainWidth,
      hoopDiameter: product.attributes.hoopDiameter,
      pendantHeight: product.attributes.pendantHeight,
      pendantWidth: product.attributes.pendantWidth,
      prodWeight: product.attributes.prodWeight,
    },
    shippingLength: product.shippingLength,
    shippingWidth: product.shippingWidth,
    shippingHeight: product.shippingHeight,
    jewelryType: product.jewelryType,
    assetId: product.assetId,
  });
  //console.log(product)
  const editInventory = async (sku) => {
    setLoding(true);
    try {
      await axios
        .put(
          `https://api.jewelify.ai/.netlify/functions/${props.ecom}?sku=${sku}&type=relevantEcomOnly`,
          inventory,
          {
            headers: {
              Authorization: session.authToken,
            },
          }
        )
        .then(async (res) => {
          if (res.data.message == "Successfuly upadated") {
            await axios
              .get(
                `https://api.jewelify.ai/.netlify/functions/inventory?platform=${props.ecom}`,
                {
                  headers: {
                    Authorization: session.authToken,
                  },
                }
              )
              .then(
                (res) => {
                  props.setInv(res.data);
                  setEdit(false);
                },
                (err) => {
                  console.log(err);
                }
              );
          }
          setmsg(
            res.data.message ? res.data.message : res.data.products.message
          );
          setLoding(false);
          setEdit(false);
          //console.log(res.data);
        });
    } catch (err) {
      console.log(err);
      setmsg("failed");
      setLoding(false);
    }
  };

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
          console.log(res.data.products);
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

  const updateSync = async (sku, product) => {
    setLoding(true);
    try {
      await axios
        .put(
          `https://api.jewelify.ai/.netlify/functions/woo-commerce?sku=${sku}`,
          { product },
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
  /* 
  const updateSyncShopify = async (sku, product) => {
    setLoding(true);
    try {
      await axios
        .put(
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
          //console.log(res.data)
        });
    } catch (err) {
      setmsg("failed");
      setLoding(false);
    }
  }; */
  if (msg) {
    setTimeout(() => setmsg(""), 5000);
  }
  const tableRow = () => {
    return (
      <>
        {edit ? (
          <>
            <tr className="tbl-bg-white">
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          categoryAbr: e.target.value,
                        }));
                      }}
                      value={inventory.categoryAbr}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          stockno: e.target.value,
                        }));
                      }}
                      value={inventory.stockno}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          styleNumber: e.target.value,
                        }));
                      }}
                      value={inventory.styleNumber}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          brand: e.target.value,
                        }));
                      }}
                      value={inventory.brand}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          manufacture: e.target.value,
                        }));
                      }}
                      value={inventory.manufacture}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          tag: e.target.value,
                        }));
                      }}
                      value={inventory.tag}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          storeCode: e.target.value,
                        }));
                      }}
                      value={inventory.storeCode}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          productName: e.target.value,
                        }));
                      }}
                      value={inventory.productName}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          companyName: e.target.value,
                        }));
                      }}
                      value={inventory.companyName}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          companyCode: e.target.value,
                        }));
                      }}
                      value={inventory.companyCode}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="number"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          qty: e.target.value,
                        }));
                      }}
                      value={inventory.qty}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          sku: e.target.value,
                        }));
                      }}
                      value={inventory.sku}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          datebuy: e.target.value,
                        }));
                      }}
                      value={inventory.datebuy}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          datesold: e.target.value,
                        }));
                      }}
                      value={inventory.datesold}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          shortDescription: e.target.value,
                        }));
                      }}
                      value={inventory.shortDescription}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          longDescription: e.target.value,
                        }));
                      }}
                      value={inventory.longDescription}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          cost: e.target.value,
                        }));
                      }}
                      value={inventory.cost}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          retailPrice: e.target.value,
                        }));
                      }}
                      value={inventory.retailPrice}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          onSale: e.target.value,
                        }));
                      }}
                      value={inventory.onSale}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      disabled
                      type="text"
                      className="text-field-14 w-input"
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      value={
                        product.productImages &&
                        product.productImages.length > 0 ? (
                          <img
                            src={product.productImages[0]}
                            alt="jwelify"
                            style={{ height: "35px" }}
                          />
                        ) : (
                          "no images"
                        )
                      }
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          prodCertificatePicture: e.target.value,
                        }));
                      }}
                      value={inventory.prodCertificatePicture}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          certificateNumber: e.target.value,
                        }));
                      }}
                      value={inventory.certificateNumber}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          labCertification: e.target.value,
                        }));
                      }}
                      value={inventory.labCertification}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            style: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.style}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            styleName: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.styleName}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            stoneClass: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.stoneClass}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            gemstoneType: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.gemstoneType}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            stoneCut: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.stoneCut}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            stoneShape: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.stoneShape}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            stoneColor: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.stoneColor}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            stoneClarity: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.stoneClarity}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            centerStoneCT: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.centerStoneCT}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            ctw: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.ctw}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            gender: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.gender}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            metalType: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.metalType}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            metalColor: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.metalColor}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            goldKarat: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.goldKarat}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            metalFinish: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.metalFinish}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            ringSize: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.ringSize}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            ringWidth: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.ringWidth}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            chainType: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.chainType}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            chainLength: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.chainLength}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            chainWidth: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.chainWidth}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            hoopDiameter: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.hoopDiameter}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            centerSize: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.centerSize}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            pendantHeight: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.pendantHeight}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            pendantWidth: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.pendantWidth}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            totalCaratWeight: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.totalCaratWeight}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          attributes: {
                            ...inventory.attributes,
                            prodWeight: e.target.value,
                          },
                        }));
                      }}
                      value={inventory.attributes.prodWeight}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          shippingLength: e.target.value,
                        }));
                      }}
                      value={inventory.shippingLength}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          shippingWidth: e.target.value,
                        }));
                      }}
                      value={inventory.shippingWidth}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          shippingHeight: e.target.value,
                        }));
                      }}
                      value={inventory.shippingHeight}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      onChange={(e) => {
                        setinventory((inventory) => ({
                          ...inventory,
                          jewelryType: e.target.value,
                        }));
                      }}
                      value={inventory.jewelryType}
                    />
                  )}
                </div>
              </td>
              <td>
                <div
                  className="text-center"
                  style={{ maxWidth: "100px", minWidth: "100px" }}
                >
                  {loading ? (
                    <div
                      className="spinner-border tex-center text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="text-field-14 w-input"
                      disabled
                      style={{ marginBottom: "0px" }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          editInventory(product.sku);
                        }
                      }}
                      value={inventory.assetId}
                    />
                  )}
                </div>
              </td>

              <td>
                <div
                  className="btn btn-success"
                  style={{ width: "100px", height: "35px" }}
                  onClick={() => {
                    editInventory(product.sku);
                  }}
                >
                  save
                </div>
              </td>

              <td>
                <div
                  className="btn btn-danger"
                  style={{ width: "100px", height: "35px" }}
                  onClick={() => {
                    setEdit(false);
                  }}
                >
                  cancel
                </div>
              </td>
              <td>
                <div style={{ width: "auto", height: "35px" }}>
                  {msg && <p className="text-danger">{msg}</p>}
                  {loading && (
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          </>
        ) : (
          <tr
            className="tbl-bg-white"
            onDoubleClick={() => {
              setEdit(true);
            }}
            style={{ zIndex: 3000 }}
          >
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.categoryAbr}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.stockno}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.styleNumber}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.brand}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.manufacture}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.tag}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.storeCode}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.productName}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.companyName}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.companyCode}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.qty}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.sku}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.datebuy}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.datesold}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.shortDescription}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.longDescription}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.cost}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.retailPrice}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
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
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.prodCertificatePicture}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.certificateNumber}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.labCertification}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.style}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.styleName}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.stoneClass}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.gemstoneType}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.stoneCut}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.stoneShape}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.stoneColor}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.stoneClarity}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.centerStoneCT}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.ctw}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.gender}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.metalType}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.metalColor}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.goldKarat}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.metalFinish}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.ringSize}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.ringWidth}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.chainType}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.chainLength}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.chainWidth}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.hoopDiameter}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.centerSize}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.pendantHeight}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.pendantWidth}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.totalCaratWeight}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.attributes.prodWeight}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.shippingLength}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.shippingWidth}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.shippingHeight}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.jewelryType}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "auto",
                }}
              >
                {product.assetId}
              </div>
            </td>

            <td>
              <div style={{ width: "auto", height: "35px" }}>
                {msg && <p className="text-danger">{msg}</p>}
                {loading && (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </div>
            </td>
          </tr>
        )}
      </>
    );
  };
  return <>{tableRow()}</>;
};

export default InventoryMapEcom;
