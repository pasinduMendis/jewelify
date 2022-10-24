/* eslint-disable @next/next/no-html-link-for-pages */
import { useSession, signIn, signOut } from 'next-auth/react'
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { createImageFromInitials } from '../custom/createprofilePic'
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios'
import convert from 'image-file-resize'
import { Awsupload } from '../custom/aws-upload/awsUpload'
import Dropzone from 'react-dropzone'
import SettingPayment from './setting-payment'

const Setting = ({ data }) => {
  const { data: session, status } = useSession()
  const [pageloading, setPageLoding] = useState(true)
  const [waiting, setWaiting] = useState(false)
  const [upload, setUplod] = useState(false)
  const [progress, setProgress] = useState(0)
  const [tempPic, setTempPic] = useState('')

  const [userInfo, setuserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profilePicture: '',
  })
  const [msg, setmsg] = useState('')
  const router = useRouter()

  useEffect(() => {
    localStorage.setItem('redirect', '/')
    if (status != 'loading' && !session) {
      localStorage.setItem('redirect', '/setting')
      router.push('/sign-in')
    } else if (status == 'authenticated') {
      console.log(session)
      setTempPic(
        session.profilePicture
          ? session.profilePicture
          : 'img/default-propic.jpg'
      )
      setuserInfo({
        ...userInfo,
        firstName: session.name ? session.name.split(' ')[0] : '',
        lastName: session.name ? session.name.split(' ')[1] : '',
        emailNew: session.user.email,
        emailOld: session.id,
        profilePicture: session.profilePicture,
      })
      setPageLoding(false)
    }
  }, [session])

  const onChangeInfo = (e) => {
    e.persist()
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    })
  }

  const onUpload = async (file) => {
    console.log(file)
    var uploadUrls = []
    if (file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        var convertFile = ''
        var type = file[i].type.split('.')
        await convert({
          file: file[i],
          width: 512,
          height: 512,
          type: type[type.length - 1],
        })
          .then((resp) => {
            // Response contain compressed and resized file
            convertFile = resp
          })
          .catch((error) => {
            // Error
          })
        var resUrl = await Awsupload(convertFile, file[i].name, setProgress)
        //uploadUrls.push(resUrl.Location)
        //console.log(resUrl.Location)
        setuserInfo({
          ...userInfo,
          profilePicture: resUrl.Location,
        })
        setTempPic(resUrl.Location)
        console.log(userInfo)
      }
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    setWaiting(true)
    var obj = {
      profilePicture: tempPic,
      emailOld: session.id,
    }
    if (userInfo.firstName) {
      obj['name'] = userInfo.name
    }
    if (userInfo.emailNew) {
      obj['emailNew'] = userInfo.emailNew
    }
    if (userInfo.lastName) {
      obj['name'] = `${userInfo.firstName} ${userInfo.lastName}`
    }
    if (userInfo.password) {
      obj['password'] = userInfo.password
    }
    /* if(userInfo.profilePicture){
      obj["profilePicture"]=userInfo.profilePicture;
    } */
    console.log(obj)

    await axios
      .put(
        'https://api.jewelify.ai/.netlify/functions/profile?type=updateProfile',
        obj,
        {
          headers: {
            Authorization: session.authToken,
          },
        }
      )
      .then(async (res) => {
        //console.log(res.data.message)
        const options = {
          redirect: false,
          email: userInfo.emailNew,
          password: userInfo.password,
        }
        const result = await signIn('credentials', options)
        if (result?.error) {
          setmsg(result.error)
          setWaiting(false)
        } else {
          setmsg(res.data.message)
          setWaiting(false)
          setuserInfo({
            firstName: '',
            lastName: '',
            emailOld: '',
            emailNew: '',
            password: '',
          })
        }
      })

    //console.log(obj)
  }

  if (progress == 100) {
    setProgress(0)
  }
  if (msg != '') {
    setTimeout(() => setmsg(''), 5000)
  }

  return (
    <div>
      <div>
        <h1 className='heading-149 d-flex justify-content-center'>
          General Settings
        </h1>
        <div className=''>
          <div className='div-block-343'>
            <h2 className='heading-149'>Settings</h2>
            <div className='' style={{ paddingTop: '3%' }}>
              <button
                className='px-5 py-2  field-label-11 '
                style={{
                  color: 'black',
                  backgroundColor: '#F4FBFF',

                  cursor: 'pointer',
                }}
                onClick={() => {
                  router.push('/setting-profile')
                }}
              >
                User Setting
              </button>
              <button
                className='px-5 py-2  field-label-11'
                style={{
                  color: 'black',
                  backgroundColor: '#F4FBFF',
                  
                  cursor: 'pointer',
                }}
                onClick={() => {
                  router.push('/setting-notification')
                }}
              >
                Notification
              </button>
              <button
                className='px-5 py-2 field-label-11 '
                style={{
                  color: 'black',
                  backgroundColor: '#F4FBFF',
                  textDecoration: 'underline',
                  
                  textDecorationColor: '#007ADF',
                  textDecorationThickness: '2px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  router.push('/setting-pa}yment')
                }}
              >
                Billing
              </button>
            </div>

            <div className='div-block-335'>
              <div className='div-block-337'>
              <div className='div-block-337'>
                <div style={{ paddingRight: '10%' }}>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value=''
                      id='flexCheckDefault'
                      checked
                    />
                    <label
                      className='form-check-label'
                      htmlFor='flexCheckDefault'
                    >
                      News and Updates
                      <p>Notifications about products and feature updates</p>
                    </label>
                  </div>
                  <br />
                  <br />
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value=''
                      id='flexCheckDefault'
                    />
                    <label
                      className='form-check-label'
                      htmlFor='flexCheckDefault'
                    >
                      News and Updates
                      <p>Notifications about products and feature updates</p>
                    </label>
                  </div>
                </div>

                <div>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value=''
                      id='flexCheckDefault'
                    />
                    <label
                      className='form-check-label'
                      htmlFor='flexCheckDefault'
                    >
                      News and Updates
                      <p>Notifications about products and feature updates</p>
                    </label>
                  </div>
                  <br />
                  <br />
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value=''
                      id='flexCheckDefault'
                      checked
                    />
                    <label
                      className='form-check-label'
                      htmlFor='flexCheckDefault'
                    >
                      News and Updates
                      <p>Notifications about products and feature updates</p>
                    </label>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className='spacer' />
        </div>
      </div>
    </div>
  )
}

export default Setting
