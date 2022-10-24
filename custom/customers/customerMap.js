import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const CustomersMap = (props) => {
  const customer = props.customer;
  const { data: session } = useSession();
  const [msg, setmsg] = useState("");
  const [edit, setEdit] = useState(false);
 

  if (msg) {
    setTimeout(() => setmsg(""), 5000);
  }
  const tableRow = () => {
    return (
      <>
        <tr
            className="tbl-bg-white"
            onDoubleClick={() => {
              setEdit(true);
            }}
            style={{ zIndex: 3000,height:'50px' }}
          >
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "hidden",
                  textOverflow:"ellipsis",
                }}className=" text-center customer-hover"
              >
                {customer.customer?customer.customer:""}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "hidden",
                  textOverflow:"ellipsis",
                }}
                //onMouseOver=""
                className=" text-center customer-hover"
              >
                {customer.email?customer.email:""}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "hidden",
                  textOverflow:"ellipsis",
                }}className=" text-center customer-hover"
              >
                {customer.mobile?customer.mobile:""}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "hidden",
                  textOverflow:"ellipsis",
                }}className=" text-center customer-hover"
              >
                {customer.order_id?customer.order_id:""}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "hidden",
                  textOverflow:"ellipsis",
                }}className=" text-center customer-hover"
              >
                {customer.platform?customer.platform:""}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "hidden",
                  textOverflow:"ellipsis",
                }}className=" text-center customer-hover"
              >
                {customer.sku?customer.sku:""}
              </div>
            </td>
            <td>
              <div
                style={{
                  maxWidth: "100px",
                  minWidth: "100px",
                  overflow: "hidden",
                  textOverflow:"ellipsis",
                }}className=" text-center customer-hover"
              >
                {customer.order_status?customer.order_status:""}
              </div>
            </td>
                      </tr>
      </>
    );
  };
  return <>{tableRow()}</>;
};

export default CustomersMap;
