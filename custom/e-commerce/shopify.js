import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'

function Shopify(props) {
  const { data: session, status } = useSession()
  const [resMsg, setresMsg] = useState('')
  const [loading, setLoding] = useState(false)
  const [formData, setFormData] = useState({
    shopifyUrl: '',
    shopifyApiToken: '',
    shopifyApiKey: '',
  })

  const onChange = (e) => {
    e.persist()
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()
    setLoding(true)
    axios
      .post(
        'https://api.jewelify.ai/.netlify/functions/profile?type=shopify',
        formData,
        {
          headers: {
            Authorization: session.authToken,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.message)
        setresMsg(res.data.message)
        if (res.data.message == "You have successfully updated.") {
          props.dispType("shopifySync");
        }
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
    setTimeout(() => {
      setresMsg('');
      }, 1500)
  }

  return (
    <>
      <div className='div-block-10 aaaa'>
        <div
          className='wrap-upload-popup csvUpload'
          style={{width:'80%',overflow:'auto',height: "90%",backgroundColor:'#F4FBFF' }}
        >
          <div className='div-block-308 white' style={{padding:'10px'}}>
            <button
              onClick={() => props.dispType('CONNECT')}
              data-bs-dismiss='modal'
              aria-label='Close'
              
            >
              <img
                src='images/Vector-1.svg'
                loading='lazy'
                data-w-id='fbecfd21-e3d0-0374-acf5-5fbf7d3aefaa'
                alt=''
                className='image-13'
              />
            </button>
            <div>
              <h1 className='heading-47' style={{marginBottom:'10px'}}>Enter Your Credentials</h1>
              <div className='div-block-49 _22' style={{height:'auto'}}>
                <img src='images/image-28_1.png' loading='lazy' alt='' />
              </div>
              <div>
                <div className='form-block-3 w-form'>
                  <form
                    id='email-form'
                    name='email-form'
                    data-name='Email Form'
                    method='get'
                    className='form-4'
                    onSubmit={(e) => onFormSubmit(e)}
                  >
                    <label style={{ fontWeight: 400 }}>Shopify URL</label>

                    <input
                      required
                      type='text'
                      name='shopifyUrl'
                      id='shopifyUrl'
                      className='text-field-8 w-input'
                      maxLength={256}
                      onChange={onChange}
                      value={formData.shopifyUrl}
                      placeholder='Shopify URL (without https://)'
                    />

                    <label style={{ fontWeight: 400 }}>Shopify Api Token</label>

                    <input
                      required
                      type='text'
                      name='shopifyApiToken'
                      id='shopifyApiToken'
                      className='text-field-8 w-input'
                      maxLength={256}
                      onChange={onChange}
                      value={formData.shopifyApiToken}
                      placeholder='Api Token'
                    />

                    <label style={{ fontWeight: 400 }}>Shopify Api Key</label>

                    <input
                      required
                      type='text'
                      name='shopifyApiKey'
                      id='shopifyApiKey'
                      className='text-field-8 w-input'
                      maxLength={256}
                      onChange={onChange}
                      value={formData.shopifyApiKey}
                      placeholder='Api Key'
                    />
                    {resMsg && (
                      <>
                        <p className='text-danger text-center mb-3 h5'>
                          {resMsg}
                        </p>
                      </>
                    )}
                    <div className='div-block-332-copy'>
                      <button className='button-133 w-button' type='submit'>
                      {loading?<div className=" d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>:"Connect"}
                      </button>
                      <button className='button-133 _2 w-button'>Learn</button>
                    </div>
                  </form>
                  <div className='w-form-done'>
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div className='w-form-fail'>
                    <div>
                      Oops! Something went wrong while submitting the form.
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

export default Shopify
