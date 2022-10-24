import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

function ApiToken(props) {
  const { data: session } = useSession()
  
  return (
    <>
      
      <div>
        <div>
          <div className='div-block-10 aaaa'>
          <div className="wrap-upload-popup col-10" style={{width:'60%' }}>
            <div className="div-block-308 white mt-5" >
              <button
                onClick={() => props.dispType("ADD PRODUCT")}
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
                <h1 className="">Use Your API Token Below</h1>
                {/* <p className="mb-5">
                  tell us what each column from your csv equals in our system so we
                  can import the products correctly
                </p> */}
      
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
                        
                          <div>{session.authToken?<h1  className="form-control" style={{fontSize:'20px',overflowX:'auto',height:'auto'}}>{session.authToken}</h1>:
                          <div className=" d-flex justify-content-center">
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>}</div>
                       
                      </div>
      
                     
                    </form>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                <div className="div-block-332-copy justify-content-end">
                        <button className="button-133 w-button" onClick={(e) => props.dispType("ADD PRODUCT")}>
                          
                            Done
                          
                        </button>
                      </div>
                </div>
                
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ApiToken
