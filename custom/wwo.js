import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from 'react-papaparse'
const GREY = '#CCC'
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)'
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919'
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
)
const GREY_DIM = '#686868'



function Woo(props) {
  const { data: session, status } = useSession()
  const [resMsg, setresMsg] = useState('')
  const [loading, setLoding] = useState(false)
  const [pageloading, setPageLoding] = useState(true)
  const [formData, setFormData] = useState({
    consumerKey: '',
    consumerSecret: '',
    url: '',
  })

  const onChange = (e) => {
    e.persist()
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    localStorage.setItem('redirect', '/')
    if (status != 'loading' && !session) {
      localStorage.setItem('redirect', '/woocommerce')
      router.push('/sign-in')
    } else if (status == 'authenticated') {
      setPageLoding(false)
    }
  }, [session])

  const onFormSubmit = async (e) => {
    axios
      .post(
        'https://api.jewelify.ai/.netlify/functions/profile?type=woocommerce ',
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
        setLoding(false)
        setFormData({
          consumerKey: '',
          consumerSecret: '',
          url: '',
        })
      })

    e.preventDefault()
  }
  if (resMsg) {
    setTimeout(() => setresMsg(''), 5000)
  }
  const border = {
    border: '1px solid #000',
    width: '50%',
    margin: '0 auto',
    paddingBottom: '30px',
    backgroundColor: '#F8F8F8',
  }
  const File = {
    opacity: '0',
    //position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  }

  const Center = {
    borderRadius: '30px',
    padding: '10px',
    backgroundColor: '#0288F7',
    border: '0px',
  }
  return (
    <>
      <div className="div-block-10 aaaa">
          <div className="wrap-upload-popup csvUpload" style={{overflowY:"scroll"}}>
            
          <button  onClick={()=>props.dispType('add products')}
                  data-bs-dismiss="modal"
                  aria-label="Close">
                    <img src="images/Vector-1.svg" loading="lazy" data-w-id="fbecfd21-e3d0-0374-acf5-5fbf7d3aefaa" alt="" className="image-13" />
                  </button>
          <div className='div-block-308 white '>
                    <div>
                      <h1 className='heading-47'>Enter Your Credentials</h1>
                      <div className='div-block-49 _22'>
                        <img
                          src='images/image-29_1.png'
                          loading='lazy'
                          alt=''
                        />
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
                            <label style={{ fontWeight: 400 }}>
                              Woo-Commerce URL
                            </label>

                            <input
                              required
                              type='text'
                              name='url'
                              id='url'
                              className='text-field-8 w-input'
                              maxLength={256}
                              onChange={onChange}
                              value={formData.url}
                              placeholder='WOO COMMERCE URL'
                            />

                            <label style={{ fontWeight: 400 }}>Client ID</label>

                            <input
                              required
                              type='text'
                              name='consumerKey'
                              id='consumerKey'
                              className='text-field-8 w-input'
                              maxLength={256}
                              onChange={onChange}
                              value={formData.consumerKey}
                              placeholder='Client ID'
                            />

                            <label style={{ fontWeight: 400 }}>
                              Client Secret
                            </label>

                            <input
                              required
                              type='text'
                              name='consumerSecret'
                              id='consumerSecret'
                              className='text-field-8 w-input'
                              maxLength={256}
                              onChange={onChange}
                              value={formData.consumerSecret}
                              placeholder='Client Secret'
                            />
                            {resMsg && (
                              <>
                                <p className='text-danger text-center mb-3 h5'>
                                  {resMsg}
                                </p>
                              </>
                            )}
                            <div className='div-block-332-copy'>
                              <button
                                className='button-133 w-button'
                                type='submit'
                              >
                                Connect
                              </button>
                              <button className='button-133 _2 w-button'>
                                Learn
                              </button>
                            </div>
                          </form>
                          <div className='w-form-done'>
                            <div>
                              Thank you! Your submission has been received!
                            </div>
                          </div>
                          <div className='w-form-fail'>
                            <div>
                              Oops! Something went wrong while submitting the
                              form.
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

export default Woo
