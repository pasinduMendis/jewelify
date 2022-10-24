/* eslint-disable @next/next/no-html-link-for-pages */
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Woo from '../custom/e-commerce/wwo'
import Shopify from '../custom/e-commerce/shopify'
import ProductSync from "../custom/product-sync/product-sync";

const Ecommerce = ({leftBar}) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [pageloading, setPageLoding] = useState(true)
  const [Disptype, setDispType] = useState('CONNECT')
  const [sync,setSync]=useState(false)
  useEffect(() => {
    localStorage.setItem('redirect', '/')
    leftBar("integrations")
    if (status != 'loading' && !session) {
      localStorage.setItem('redirect', '/e-commerce')
      router.push('/sign-in')
    } else if (status == 'authenticated') {
      setPageLoding(false)
    }
  }, [session])

  return (
    <>
      
        {pageloading ? (
          <div className=' d-flex justify-content-center mt-5'>
            <div className='spinner-border' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {Disptype == 'woocommerce' && (
              <>
              
                    <Woo
                      setInv={(val) => setData(val)}
                      msg={(val) => setmsg(val)}
                      dispType={(val) => setDispType(val)}
                    />
                  
              </>
            )}
            {Disptype == 'shopify' && (
              <>
                <div
                  className='py-5 px-4'
                  style={{
                    background: 'rgba(0, 0, 0, 0.0)',
                    position: 'fixed',
                    zIndex: 2000,
                    width: '100%',
                    height: '100vh',
                  }}
                >
                  <div>
                    <Shopify
                      setInv={(val) => setData(val)}
                      msg={(val) => setmsg(val)}
                      dispType={(val) => setDispType(val)}
                    />
                  </div>
                </div>
              </>
            )}
            {Disptype == "woocomSync" && (
            <>
              <ProductSync
                ecomType='woo-commerce'
                msg={(val) => setmsg(val)}
                dispType={(val) => setDispType(val)}
              />
            </>
          )}

{Disptype == "shpoifySync" && (
            <>
              <ProductSync
                ecomType='shpoify'
                msg={(val) => setmsg(val)}
                dispType={(val) => setDispType(val)}
              />
            </>
          )}
           <>
                    
                    <div className='text-center'>
                      <div className='about-bottom-left mb-30 clearfix text-style'>
                        <h3>Where Do You Want To Sell Online?</h3>
                      </div>
                      <div className='row pb-100'>
                        <div className='col-12 text-center'>
                          <div className='div-block-29 _2'>
                            <div className='div-block-330'>
                              <div
                                id='w-node-e24e6ac8-0873-8a8d-68bb-33470e034c46-f6616810'
                                className='div-block-331'
                              >
                                <img
                                  src='images/image-29_1.png'
                                  loading='lazy'
                                  alt=''
                                />
                                <div className='div-block-332'>
                                  <button
                                    className='button-133 w-button'
                                    /*  onChange={(e) => {
                                      console.log('xyz')
                                    }} */
                                    value='woocommerce'
                                    onClick={(e) => {
                                      console.log(e.target.value)
                                      setDispType(e.target.value)
                                    }}
                                  >
                                    Connect
                                  </button>
                                  <button
                                    href='#'
                                    className='button-133 _2 w-button'
                                  >
                                    Learn
                                  </button>
                                </div>
                              </div>
                              <div
                                id='w-node-e234cba6-c572-7e13-92e5-309a071b3715-f6616810'
                                className='div-block-331'
                              >
                                <img
                                  src='images/image-28_1.png'
                                  loading='lazy'
                                  alt=''
                                />
                                <div className='div-block-332'>
                                <button
                                    className='button-133 w-button'
                                    /*  onChange={(e) => {
                                      console.log('xyz')
                                    }} */
                                    value='shopify'
                                    onClick={(e) => {
                                      console.log(e.target.value)
                                      setDispType(e.target.value)
                                    }}
                                  >
                                    Connect
                                  </button>
                                  <a
                                    href='#'
                                    className='button-133 _2 w-button'
                                  >
                                    Learn
                                  </a>
                                </div>
                              </div>
                              <div
                                id='w-node-_28853bab-6cdc-da95-a23d-191de41bafcb-f6616810'
                                className='div-block-331'
                              >
                                <img
                                  src='images/Group-33584.png'
                                  loading='lazy'
                                  alt=''
                                  className='image-86'
                                />
                                <div className='div-block-332'>
                                  <a href='#' className='button-133 w-button'>
                                    Connect
                                  </a>
                                  <a
                                    href='#'
                                    className='button-133 _2 w-button'
                                  >
                                    Learn
                                  </a>
                                </div>
                              </div>
                              <div
                                id='w-node-d7afea9a-f222-f708-fd7d-a19fcff41dd7-f6616810'
                                className='div-block-331'
                              >
                                <img
                                  src='images/Group-1000001971.svg'
                                  loading='lazy'
                                  alt=''
                                />
                                <div className='div-block-332'>
                                  <a href='#' className='button-133 w-button'>
                                    Connect
                                  </a>
                                  <a
                                    href='#'
                                    className='button-133 _2 w-button'
                                  >
                                    Learn
                                  </a>
                                </div>
                              </div>
                              <div
                                id='w-node-_6bcf6978-7f81-db73-6723-49b9b0a2dc2d-f6616810'
                                className='div-block-331'
                              >
                                <img
                                  src='images/image-105.svg'
                                  loading='lazy'
                                  alt=''
                                />
                                <div className='div-block-332'>
                                  <a href='#' className='button-133 w-button'>
                                    Connect
                                  </a>
                                  <a
                                    href='#'
                                    className='button-133 _2 w-button'
                                  >
                                    Learn
                                  </a>
                                </div>
                              </div>
                              <div
                                id='w-node-c71f5c2f-bd07-bd3b-de82-795106b8b861-f6616810'
                                className='div-block-331'
                              >
                                <img
                                  src='images/image-106.svg'
                                  loading='lazy'
                                  alt=''
                                />
                                <div className='div-block-332'>
                                  <a href='#' className='button-133 w-button'>
                                    Connect
                                  </a>
                                  <a
                                    href='#'
                                    className='button-133 _2 w-button'
                                  >
                                    Learn
                                  </a>
                                </div>
                              </div>
                              <div
                                id='w-node-e7d8a3c4-182b-4e79-b5dc-05ce6ca24137-f6616810'
                                className='div-block-331'
                              >
                                <img
                                  src='images/image-31_1.png'
                                  loading='lazy'
                                  alt=''
                                />
                                <div className='div-block-332'>
                                  <a href='#' className='button-133 w-button'>
                                    Connect
                                  </a>
                                  <a
                                    href='#'
                                    className='button-133 _2 w-button'
                                  >
                                    Learn
                                  </a>
                                </div>
                              </div>
                              <div
                                id='w-node-_0cde1440-da8c-dd17-8e2a-ef19f11e27c6-f6616810'
                                className='div-block-331'
                              >
                                <img
                                  src='images/Group-1000001972.svg'
                                  loading='lazy'
                                  alt=''
                                />
                                <div className='div-block-332'>
                                  <a href='#' className='button-133 w-button'>
                                    Connect
                                  </a>
                                  <a
                                    href='#'
                                    className='button-133 _2 w-button'
                                  >
                                    Learn
                                  </a>
                                </div>
                              </div>
                              <div
                                id='w-node-_857b4880-e4d9-7232-6209-0e82bd114ea9-f6616810'
                                className='div-block-331'
                              >
                                <img
                                  src='images/image-32_1.png'
                                  loading='lazy'
                                  alt=''
                                />
                                <div className='div-block-332'>
                                  <a href='#' className='button-133 w-button'>
                                    Connect
                                  </a>
                                  <a
                                    href='#'
                                    className='button-133 _2 w-button'
                                  >
                                    Learn
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>

                          <br />
                          <br />
                        </div>
                      </div>
                    </div>
                    <div className="spacer" />
                  </>
          </>
        )}
      
    </>
  )
}

export default Ecommerce
