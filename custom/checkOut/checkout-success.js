import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from "next/router";

function CheckoutrSuccess(props) {
  const { data: session } = useSession()
  const router = useRouter()
  return (
    <>
      
      <div>
        <div>
          <div className='div-block-10 aaaa'>
          <div className="wrap-upload-popup col-10" style={{width:'60%' }}>
            <div className="div-block-308 white mt-5" >
              <div className="text-center">
                <h1 className="">CONGRADULATIONS</h1>
                {/* <p className="mb-5">
                  tell us what each column from your csv equals in our system so we
                  can import the products correctly
                </p> */}
      
                <div className="mt-5 pt-5" style={{ height: "40vh",overflowY:'scroll' }}>
                <h1 className="text-warning">you have successfully subscribed!</h1>
                </div>
                <div className="d-flex justify-content-end">
                <div className="div-block-332-copy justify-content-end">
                        <button className="button-133 w-button" onClick={(e) => router.push('/inventory')}>
                          
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

export default CheckoutrSuccess
