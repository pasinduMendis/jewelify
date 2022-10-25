import { Router, useRouter } from 'next/router'
import { getProviders, signIn, getCsrfToken, getSession } from 'next-auth/react'
import { useState } from 'react'
import axios from 'axios'
import Footer from '../custom/Footer'

export default function SignUp({ csrfToken, providers }) {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confpassword, setconfpassword] = useState('')
  const [errMsg, seterrMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const userSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (password != confpassword) {
      seterrMsg('password and confirm password does not match')
      setLoading(false)
      return null
    }
    const res = await axios.post(
      'https://api.jewelify.ai/.netlify/functions/sign-up',
      { name: name, email: email, password: password }
    )
    console.log(res)
    if (res.data.message != 'You have successfully created a new account!') {
      seterrMsg(res.data.message)
      setLoading(false)
      return null
    }
    const options = { redirect: false, name, email, password }
    const result = await signIn('credentials', options)
    //console.log(result)
    if (result?.error) {
      seterrMsg(result.error)
      setLoading(false)
      return
    }
    return router.push('/pricing')
  }

  return (
    <div>
      <div className='wrapper d-flex justify-content-center  '>
        {/* pricing area
      ============================================ */}
        <div
          id='pricing-area'
          className='pricing-area custom-border mt-50 d-flex justify-content-center'
          style={{
            background: 'linear-gradient(to bottom,#f3fbfe 50% ,white 50%)',
            height: '60%',
            width: '95%',
          }}
        >
          <div className='container pt-50 justify-content-center'>
            <div className='row '>
              <div className='col-md-12 text-center  justify-content-center'>
                <div className='about-bottom-left mt-1 mb-5 clearfix text-style  text-center justify-content-center'>
                  <h2>Create Your Account</h2>
                </div>
                <div
                  className='row pb-100 card justify-content-center '
                  style={{
                    width: '45rem',
                    borderWidth: '1px',
                    borderColor: '#E6E6E6',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <h5 className='mt-5'>
                    <b>SIGN UP</b>
                  </h5>
                  <br />
                  <div className='col-12 text-center'>
                    <form className=' int-form'>
                      <div className='form-group'>
                        <label style={{ fontSize: 13 }}>User Name</label>
                        <input
                          type='text'
                          className={errMsg?'form-control is-invalid':'form-control'}
                          style={{
                            backgroundColor: `${errMsg?'#ffcbd1':'#F8FBFD'}`,
                            fontSize: 13,
                          }}
                          placeholder='Enter Your User Name'
                          required
                          value={name}
                          onChange={(e) => {
                            setname(e.target.value)
                          }}
                        />
                      </div>
                      <div className='form-group'>
                        <label style={{ fontSize: 13 }}>Email</label>
                        <input
                          type='email'
                          className={errMsg?'form-control is-invalid':'form-control'}
                          style={{
                            backgroundColor: `${errMsg?'#ffcbd1':'#F8FBFD'}`,
                            fontSize: 13,
                          }}
                          placeholder='Enter Your Email Address'
                          required
                          value={email}
                          onChange={(e) => {
                            setemail(e.target.value)
                          }}
                        />
                      </div>
                      <div className='form-group'>
                        <label style={{ fontSize: 13 }}>Password</label>
                        <input
                          className={errMsg?'form-control is-invalid':'form-control'}
                          type='password'
                          style={{
                            backgroundColor: `${errMsg?'#ffcbd1':'#F8FBFD'}`,
                            fontSize: 13,
                          }}
                          placeholder='Enter Your Password'
                          required
                          value={password}
                          onChange={(e) => {
                            setpassword(e.target.value)
                          }}
                        />
                      </div>
                      <div className='form-group'>
                        <label style={{ fontSize: 13 }}>Confirm Password</label>
                        <input
                          className={errMsg?'form-control is-invalid':'form-control'}
                          type='password'
                          style={{
                            backgroundColor: `${errMsg?'#ffcbd1':'#F8FBFD'}`,
                            fontSize: 13,
                          }}
                          placeholder='Confirm Your Password'
                          required
                          value={confpassword}
                          onChange={(e) => {
                            setconfpassword(e.target.value)
                          }}
                        />
                      </div>
                      <h5 className='text-danger'>{errMsg}</h5>
                      <br />
                      <br />
                      <div className='col-12 text-center'>
                        <button
                          className='main-btn btn-lg btn-block bg-light-blue justify-content-center'
                          style={{
                            width: '350px',
                            height: '50px',
                            border: 'solid',
                            borderWidth: '1px',
                            borderColor: '#D0D0D0',
                            backgroundColor: '#FFFFFF',
                          }}
                          type=''
                          onClick={(e) => {
                            userSignUp(e)
                          }}
                        >
                           {!loading && <img
                                    src='./img/Email.png'
                                    width='20px'
                                    height='20px'
                                  ></img>}
                                  <b style={{ fontSize: 11, color: '#131313' }}>
                                    {loading?<div className=" d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>: "Sign Up with credentials"}
                          </b>
                        </button>
                      </div>
                      <br />
                      <br />
                      <br />
                      <br />
                      <div className='text-center'>
                        <p style={{ fontSize: 11 }}>
                          By continuing your agree to our privacy policy and
                          terms and conditions
                          <br />
                          Already have an account?
                          <a
                            style={{ color: '#3D9CE0', fontSize: 12 }}
                            href='#'
                            onClick={(e) => {
                              router.push('/sign-in')
                            }}
                          >
                            Sign In
                          </a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '50px' }}>
        <Footer />
      </div>
    </div>
  )
}
