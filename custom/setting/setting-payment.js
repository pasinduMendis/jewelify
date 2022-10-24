/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useSession, signIn, signOut } from 'next-auth/react'
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
//import { createImageFromInitials } from '../../custom/createprofilePic'
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import { Route53 } from 'aws-sdk'
import Pay from './pay'
import Loading from '../loadingPages/setting-payment-loading'

const Setting = ({ leftBar }) => {
  const { data: session, status } = useSession()
  const [pageloading, setPageLoding] = useState(true)
  const [waiting, setWaiting] = useState(false)
  const [msg, setmsg] = useState('')
  const [cardData, setCardData] = useState('')
  const [customerData, setCustomerData] = useState('')
  const [payHistory, setPayHistory] = useState('')
  const router = useRouter()
  const [tempPic, setTempPic] = useState('')
  const [progress, setProgress] = useState(0)
  const [Disptype, setDispType] = useState('CONNECT')
  const [packageType, setPackageType] = useState('')

  useEffect(() => {
    localStorage.setItem('redirect', '/')
    leftBar('setting')
    if (status != 'loading' && !session) {
      localStorage.setItem('redirect', '/setting')
      router.push('/sign-in')
    } else if (status == 'authenticated') {
      setTempPic(
        session.profilePicture
          ? session.profilePicture
          : 'img/default-propic.jpg'
      )

      fetchData()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    setPackageType(user.data.user.package)

    console.log(session)
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
      console.log(payHistory)
    } else {
      router.push('/pricing')
    }
  }

  if (msg != '') {
    setTimeout(() => setmsg(''), 5000)
  }

  return (
    <div>
      {Disptype == 'pop' && (
        <>
          <Pay
            setInv={(val) => setData(val)}
            msg={(val) => setmsg(val)}
            dispType={(val) => setDispType(val)}
          />
        </>
      )}
      {pageloading ? (
        <Loading />
      ) : (
        <div className='div-block-335'>
          <div className='row'>
            <div className='col-8 ' style={{ paddingRight: '160px' }}>
              <div className='div-block-345'>
                <div className='div-block-346'>
                  {customerData && cardData && (
                    <Cards
                      name={customerData.name}
                      number={`**** **** **** ${cardData.card.last4}`}
                      expiry={`${cardData.card.exp_month}/${cardData.card.exp_year}`}
                      cvc='***'
                      preview={true}
                      issuer={cardData.card.brand}
                    />
                  )}
                </div>
              </div>

              <div style={{ width: '550px' }}>
                <div className=''>
                  {payHistory &&
                    payHistory.map((item) => {
                      return (
                        <>
                          <table className='table'>
                            <thead>
                              <tr>
                                <th
                                  style={{ padding: '14px 5px 5px 5px' }}
                                ></th>
                                <th style={{ padding: '14px 5px 5px 5px' }}>
                                  Payment ID
                                </th>
                                <th style={{ padding: '14px 5px 5px 5px' }}>
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th style={{ padding: '14px 5px 5px 5px' }}>
                                  {item.description}
                                </th>
                                <td style={{ padding: '14px 5px 5px 5px' }}>
                                  {item.id}
                                </td>
                                <td style={{ padding: '14px 5px 5px 5px' }}>
                                  <p>
                                    <a
                                      className='p-1'
                                      style={{ color: 'green' }}
                                    >
                                      {item.currency}
                                    </a>

                                    {item.amount / 100}
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </>
                      )
                    })}
                </div>
              </div>
            </div>
            <div className='col-4  justify-content-center'>
              <div className='' style={{ paddingLeft: '30%' }}>
                <button
                  className='border border-dark  px-5 py-2 field-label-11'
                  style={{
                    width: 'auto',
                    height: 'auto',
                    backgroundColor: 'white',

                    borderRadius: '40px',
                    color: 'black',
                  }}
                  value='pop'
                  onClick={(e) => {
                    console.log(e.target.value)
                    setDispType('pop')
                  }}
                >
                  Edit Details
                </button>
              </div>
              <div style={{ paddingLeft: '35%' }}>
                {progress == 0 ? (
                  <img
                    src={
                      tempPic
                        ? tempPic
                        : session.profilePicture
                        ? session.profilePicture
                        : 'img/default-propic.jpg'
                    }
                    loading='lazy'
                    alt=''
                    className='image-88'
                    style={{ height: '50%', width: '50%', paddingTop: '10%' }}
                  />
                ) : (
                  <div className=' d-flex justify-content-center mt-5'>
                    <div className='spinner-border' role='status'>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  </div>
                )}
              </div>
              <div className='justify-content-center'>
                <h4 style={{ paddingLeft: '38%' }}> {session.name}</h4>
              </div>
              <hr style={{ backgroundColor: '#D5D6DA' }} />
              <div
                className='justify-content-center'
                style={{ paddingLeft: '38%' }}
              >
                {payHistory &&
                  payHistory.map((item) => {
                    return (
                      <>
                        <h1 style={{ color: '#3D9CE0' }}>
                          $ {item.amount / 100}
                        </h1>
                      </>
                    )
                  })}
              </div>
              <hr style={{ backgroundColor: '#D5D6DA' }} />
              <div className=' justify-content-center'>
                <h5
                  style={{ color: '#6F7399', fontSize: 14, paddingLeft: '38%' }}
                >
                  Billing Plan
                </h5>
                <h3
                  style={{ color: '#41477A', fontSize: 24, paddingLeft: '40%' }}
                >
                  {packageType}
                </h3>
              </div>
              <div
                className='d-flexjustify-content-center'
                style={{
                  backgroundColor: '#dfe1f2',
                  width: '100%',
                  height: '15%',
                  borderRadius: '9px',
                }}
              >
                <ul style={{ padding: '5%' }}>
                  <li>Lorem ipsum dolor sit amet consectetur </li>
                  <li>Lorem ipsum dolor sit amet consectetur</li>
                  <li>Lorem ipsum dolor sit amet consectetur</li>
                </ul>
              </div>
              <hr style={{ backgroundColor: '#D5D6DA' }} />
              <div className='justify-content-center' style={{ padding: '5%' }}>
                {payHistory &&
                  payHistory.map((item) => {
                    return (
                      <>
                        <h6 style={{ fontSize: 16 }}>
                          <b>Invoice: </b>
                          {item.invoice}
                        </h6>
                        <h6 style={{ fontSize: 16 }}>
                          <b>Amount: </b>
                          <a className='p-1' style={{ color: 'green' }}>
                            {item.currency}
                          </a>
                          {item.amount / 100}
                        </h6>
                      </>
                    )
                  })}
              </div>
              <hr style={{ backgroundColor: '#D5D6DA' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Setting
