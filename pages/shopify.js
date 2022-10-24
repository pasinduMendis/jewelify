import Head from 'next/head'
import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from "next/router";

export default function Shopify() {
  const { data: session,status } = useSession()
  const [resMsg, setresMsg] = useState('')
  const [loading,setLoding]=useState(false)
  const [pageloading,setPageLoding]=useState(true)
  const [formData, setFormData] = useState({
    shopifyUrl: '',
    shopifyApiToken: '',
    shopifyApiKey: '',
  })
  const router=useRouter()

  const onChange = (e) => {
    e.persist()
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  console.log(status)
  useEffect(() => {
    localStorage.setItem("redirect", "/");
     if(status!="loading" && !session){
      localStorage.setItem("redirect", "/shopify");
      router.push("/sign-in")
    } else if(status=="authenticated"){
      setPageLoding(false)
    }
  }, [session]);

  const onFormSubmit = async (e) => {
    setLoding(true)
    axios
      .post('https://api.jewelify.ai/.netlify/functions/profile?type=shopify', formData, {
        headers: {
          Authorization: session.authToken,
        },
      })
      .then((res) => {
        // console.log(res.data.message)
        setresMsg(res.data.message)
        setLoding(false)
        setFormData({
          shopifyUrl: '',
          shopifyApiToken: '',
          shopifyApiKey: '',
        })
      })
    
    //setLoding(false)
    e.preventDefault()
    
  }
  if (resMsg) {
    setTimeout(() => setresMsg(''), 5000)
  }

    return (
      <div>
        <Head>
          <meta charSet='utf-8' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <title>Jewelify</title>
          <meta name='description' content />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        {/* Add your site or application content here */}
        {pageloading?<div className=" d-flex justify-content-center mt-5"><div className="spinner-border" role="status">
  <span className="sr-only">Loading...</span>
</div></div>:<>
        <header className='inner-header'>
          <nav className='main-nav'>
            <div className='container'>
              <div className='nav-wrapper'>
                <div className='logo-wrapper'>
                  <a>
                    {' '}
                    <img src='/img/logo.svg' alt='jwelify' />{' '}
                  </a>
                </div>
                <p></p>
                <div className='prof-img'>
                  <img src='/img/head-prof.png' alt='' />
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div className='wrapper '>
          {/* pricing area
      ============================================ */}
          <div
            id='pricing-area'
            className='pricing-area custom-border'
            style={{ backgroundColor: '#f3fbfe' }}
          >
            <div className='container pt-100'>
              <div className='row'>
                <div className='col-md-12 text-center'>
                  <div className='about-bottom-left mb-30 clearfix text-style'>
                    <h2>Integrate Shopify And Jewelify With One Click</h2>
                  </div>
                  <div className='row pb-100'>
                    <div className='col-12 text-center'>
                      <div className='prof-img mb-5'>
                        <img src='/img/s2.png' alt='' />
                      </div>
                      <form
                        className='int-form'
                        onSubmit={(e) => onFormSubmit(e)}
                      >
                        <div className='form-group'>
                          <label style={{ fontWeight: 400 }}>Shopify URL</label>
                          <div className='input-group'>
                            <input
                              required
                              type='text'
                              name='shopifyUrl'
                              id='shopifyUrl'
                              className='form-control'
                              onChange={onChange}
                              value={formData.shopifyUrl}
                              placeholder='Shopify URL (without https://)'
                            />
                          </div>
                        </div>
                        <div className='form-group'>
                          <label style={{ fontWeight: 400 }}>shopify Api Token</label>
                          <div className='input-group'>
                            <input
                              required
                              type='text'
                              name='shopifyApiToken'
                              id='shopifyApiToken'
                              className='form-control'
                               onChange={onChange}
                              value={formData.shopifyApiToken}
                              placeholder='Api Token'
                            />
                          </div>
                        </div>
                        <div className='form-group'>
                          <label style={{ fontWeight: 400 }}>
                          shopify Api Key
                          </label>
                          <div className='input-group'>
                            <input
                              required
                              type='text'
                              name='shopifyApiKey'
                              id='shopifyApiKey'
                              className='form-control g-3'
                              onChange={onChange}
                              value={formData.shopifyApiKey}
                              placeholder='Api Key'
                            />
                          </div>
                        </div>
                        <br />
                        {resMsg && (
                          <>
                            <p className='text-danger text-center mb-3 h5'>
                              {resMsg}
                            </p>
                          </>
                        )}
                        <button
                          className='main-btn btn-lg btn-block bg-light-blue'
                          style={{ width: '350px' }}
                          type='submit'
                        >
                          {loading ? <div className="spinner-border" role="status">
  <span className="sr-only">Loading...</span>
</div>:<>CONNECT</>}
                        </button>
                        <br />
                        <br />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* contact area
      ============================================ */}
        <div className='contact-area'>
          <div className='container'>
            <div className='row conatct-info fix'>
              <div className='col-3 col-md-5 col-sm-4 text-style'>
                <h2>Jewelify</h2>
                <p>
                  Copyright © 2021
                  <a href='http://bootexperts.com/'>Jewelify</a>
                  <br />
                  .All right reserved.
                </p>
              </div>
              <div className='col-3 col-md-2 col-sm-4 footer-links text-style t-m-res'>
                <h3 className='mb-30'>Services</h3>
                <ul>
                  <li>
                    <a href='#'>service - 1</a>
                  </li>
                  <li>
                    <a href='#'>service - 2</a>
                  </li>
                  <li>
                    <a href='#'>service - 3</a>
                  </li>
                  <li>
                    <a href='#'>service - 4</a>
                  </li>
                </ul>
              </div>
              <div className='col-3 col-md-2 col-sm-4 footer-links text-style t-m-res'>
                <h3 className='mb-30'>Company</h3>
                <ul>
                  <li>
                    {' '}
                    <a href='#'>Work</a>
                  </li>
                  <li>
                    <a href='#'>About</a>
                  </li>
                  <li>
                    <a href='#'>Resources</a>
                  </li>
                  <li>
                    <a href='#'>Pricing</a>
                  </li>
                </ul>
              </div>
              <div className='col-3 col-md-3 col-sm-4 text-style t-m-res'>
                <h3 className='mb-30'>Useful Links</h3>
                <div className='footer-icon'>
                  <ul>
                    <li>
                      <a>
                        <img src='/img/facebook.svg' alt='' width='20px' />
                      </a>{' '}
                    </li>
                    <li>
                      <a>
                        <img src='/img/instagram.svg' alt='' width='20px' />
                      </a>{' '}
                    </li>
                    <li>
                      <a>
                        <img src='/img/twitter.svg' alt='' width='20px' />
                      </a>{' '}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>}
      </div>
    )
}
