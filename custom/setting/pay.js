/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useSession, signIn, signOut } from 'next-auth/react'

import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Loading from '../loadingPages/pay-loading'
import axios from 'axios'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'

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
import Head from 'next/head'
import Link from 'next/link'

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  'pk_test_51LKNLnBZCQ2Q2AwNSFVBJ1ypYRGARlLRilbTGgO4xgNgU8YexXg1BFckqqstRijsSk9JlmHXni6PCIgzaCFRUh5M00FbkevBFe'
)

const MyComponent = (props) => {
  const { data: session, status } = useSession()
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setProcessingTo] = useState(false)
  const [checkoutError, setCheckoutError] = useState()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cardData, setCardData] = useState('')
  const [customerData, setCustomerData] = useState('')
  const [payHistory, setPayHistory] = useState('')
  const router = useRouter()
  const [tempPic, setTempPic] = useState('')
  const [progress, setProgress] = useState(0)
  const [pageloading, setPageLoding] = useState(true)

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError()
  }

  const handleFormSubmit = async (ev) => {
    ev.preventDefault()

    const billingDetails = {
      name: name,
      email: email,
    }

    setProcessingTo(true)

    const cardElement = elements.getElement('card')
    console.log(cardElement)

    try {
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails,
      })
      console.log(paymentMethodReq)
      const user = await axios.get(
        'https://api.jewelify.ai/.netlify/functions/profile',
        {
          headers: {
            Authorization: session.authToken,
          },
        }
      )

      const res = await axios.post('/api/updateData', {
        name: name,
        payment_method: paymentMethodReq.paymentMethod.id,
        email: email,
        customer_id: user.data.user.customer_id,
        old_payment_method: user.data.user.payment_method
          ? user.data.user.payment_method
          : '',
      })

      await axios
        .post(
          'https://api.jewelify.ai/.netlify/functions/payment',
          {
            subscription_email: email,
            payment_method: paymentMethodReq.paymentMethod.id,
          },
          {
            headers: {
              Authorization: session.authToken,
            },
          }
        )
        .then((res) => {
          console.log(res.data)
        })

      console.log('success')
      setCheckoutError('success')
      props.dispType('add products')
      setProcessingTo(false)
    } catch (err) {
      setCheckoutError(err.message)
      setProcessingTo(false)
    }

    const user = await axios.get(
      'https://api.jewelify.ai/.netlify/functions/profile',
      {
        headers: {
          Authorization: session.authToken,
        },
      }
    )
    console.log(user)
    if (user.data.user.isPayment) {
      await axios
        .post('/api/getPayCustomeInfo', {
          customer_id: user.data.user.customer_id,
        })
        .then((res) => {
          setCustomerData(res.data.customer)
          setCardData(res.data.cardInfo.data[0])
          setPayHistory(res.data.payHistory.data)
          setPageLoding(false)
        })
    } else {
      router.push('/pricing')
    }
  }

  // rest of the component
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className='form-group'>
          <label>Name *</label>
          <div className='c_input-group'>
            <input
              type='text'
              required
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your full name'
            />
          </div>
        </div>
        <div className='form-group'>
          <label>Email *</label>
          <div className='c_input-group'>
            <input
              type='text'
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email address'
            />
          </div>
        </div>
        <div className='form-group'>
          <label>Card Details *</label>

          <CardElement onChange={handleCardDetailsChange} />
        </div>
        {checkoutError && <p>{checkoutError}</p>}
        <button className='btn btn-primary' disabled={isProcessing || !stripe}>
          {isProcessing ? 'Processing...' : 'update details'}
        </button>
      </form>
    </>
  )
}

function Pay(props) {
  const { data: session, status } = useSession()
  const [resMsg, setresMsg] = useState('')
  const [loading, setLoding] = useState(false)
  const [pageloading, setPageLoding] = useState(true)
  const [cardData, setCardData] = useState('')
  const [customerData, setCustomerData] = useState('')
  const [tempPic, setTempPic] = useState('')

  const [msg, setmsg] = useState('')

  const [payHistory, setPayHistory] = useState('')
  const router = useRouter()

  const [userName, setuserName] = useState({
    name: '',
  })

  useEffect(() => {
    localStorage.setItem('redirect', '/')
    //leftBar("setting")
    if (status != 'loading' && !session) {
      localStorage.setItem('redirect', '/update-payinfo')
      router.push('/sign-in')
    } else if (status == 'authenticated') {
      setTempPic(
        session.profilePicture
          ? session.profilePicture
          : 'img/default-propic.jpg'
      )
      setuserName({
        ...userName,
        name: session.name,
      })
      fetchData()
    }
  }, [session])

  const fetchData = async () => {
    const user = await axios.get(
      'https://api.jewelify.ai/.netlify/functions/profile',
      {
        headers: {
          Authorization: session.authToken,
        },
      }
    )
    console.log(user)
    if (user.data.user.isPayment) {
      await axios
        .post('/api/getPayCustomeInfo', {
          customer_id: user.data.user.customer_id,
        })
        .then((res) => {
          setCustomerData(res.data.customer)
          setCardData(res.data.cardInfo.data[0])
          setPayHistory(res.data.payHistory.data)
          setPageLoding(false)
        })
    } else {
      router.push('/pricing')
    }
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
      {pageloading ? (
        <Loading />
      ) : (
        <div className='div-block-10 aaaa'>
         <div
          className="wrap-upload-popup csvUpload"
          style={{width:'80%',overflow:'auto',height: "90%",backgroundColor:'#F4FBFF' }}
        >
            <div className='div-block-308' style={{padding:'10px'}}>
              <button
                onClick={() => props.dispType('add products')}
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
            </div>

            <div
              className=''
              style={{
                paddingLeft: '8%',
                paddingRight: '8%',
                paddingBottom: '5%',
              }}
            >
              <h3 className='' style={{ paddingBottom: '5%' }}>
                Edit Payment Information
              </h3>

              <div>
                <div className='div-block-346'>
                  {customerData && cardData && (
                    <Cards
                      name={customerData.name}
                      number={`**** **** **** ${cardData.card.last4}`}
                      expiry={`${cardData.card.exp_month}/${cardData.card.exp_year}`}
                      cvc='***'
                      preview={true}
                      issuer={cardData.card.brand}
                      size='160px'
                    />
                  )}
                </div>
                <br />
                <Elements stripe={stripePromise}>
                  <MyComponent
                    price={router.query.package}
                    packageName={router.query.packageName}
                    {...props}
                  />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Pay
