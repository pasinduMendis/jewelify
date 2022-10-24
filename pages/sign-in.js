import { getProviders, signIn, getCsrfToken, getSession } from 'next-auth/react'
import { Router, useRouter } from 'next/router'
import { useState } from 'react'
import Footer from '../custom/Footer'

export default function SignIn({ csrfToken, providers }) {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [errMsg, seterrMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const userSignIn = async (e) => {
    e.preventDefault()
    //console.log({email:email,password:password})
    setLoading(true)
    const options = { redirect: false, email, password }
    const result = await signIn('credentials', options)
    //console.log(result)
    if (result?.error) {
      seterrMsg(result.error)
    setLoading(false)
      return
    }
    return router.push(
      localStorage.getItem('redirect') !='/' ? localStorage.getItem('redirect') :'/pricing'
    )
  }

  return (
    <>
      {Object.values(providers).map((provider, id) => {
        if (provider.name === 'Credentials') {
          return (
            <div key={id}>
              <div className='wrapper d-flex justify-content-center'>
                <div
                  id='pricing-area'
                  className='pricing-area custom-border mt-50 d-flex justify-content-center'
                  style={{
                    background:
                      'linear-gradient(to bottom,#f3fbfe 50% ,white 50%)',
                    height: '60%',
                    width: '95%',
                  }}
                >
                  <div className='container pt-50 d-flex justify-content-center'>
                    <div className='row'>
                      <div className='col-md-12 text-center'>
                        <div className='about-bottom-left mt-1 mb-5 clearfix text-style  text-center'>
                          {/* <h2 style={{ marginLeft: '270px' }}>
                            Create Your Account
                          </h2> */}
                        </div>
                        <div
                          className='row pb-100 card '
                          style={{
                            width: '45rem',
                            borderWidth: '1px',
                            borderColor: '#E6E6E6',
                            backgroundColor: '#FFFFFF',
                            //marginLeft: '270px',
                          }}
                        >
                          <h5 className='mt-5'>
                            <b>SIGN IN</b>
                          </h5>
                          <br />
                          <div className='col-12 text-center'>
                            <form className=' int-form'>
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
                              <h5 className='text-danger'>{errMsg}</h5>
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
                                    userSignIn(e)
                                  }}
                                >
                                  <>
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
                          </div>:"Sign In with credentials"}
                                  </b>
                                  </>
                                  
                                </button>
                              </div>
                              <br />
                              <br />
                              <br />
                              <br />
                              <div className='text-center'>
                                <p style={{ fontSize: 11 }}>
                                  By continuing your agree to our privacy policy
                                  and terms and conditions
                                  <br />
                                  Do not have an account?
                                  <a
                                    style={{ color: '#3D9CE0', fontSize: 12 }}
                                    href='#'
                                    onClick={(e) => {
                                      router.push('/sign-up')
                                    }}
                                  >
                                    SignUp
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
        return (
          <div key={id}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        )
      })}

      {/* <div className='col-12 text-center'>
        <button
          className='col-4 btn-success btn justify-content-center text-center my-3'
          type=''
          onClick={(e) => {
            router.push('/sign-up')
          }}
        >
          Sign up with credentials
        </button>
      </div> */}
    </>
  )
}

//server side
export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })
  if (session) {
    return {
      redirect: { destination: '/' },
    }
  }
  const csrfToken = await getCsrfToken(context)
  const providers = await getProviders()

  return {
    props: { csrfToken, providers },
  }
}
