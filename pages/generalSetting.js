/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head'
import React, { useCallback, useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import FileUploader from '../custom/csvUpload/csvUploader'
import { useRouter } from 'next/router'
import SettingPayment from '../custom/setting/setting-payment'
import SettingProfile from '../custom/setting/setting-profile'
import SettingNotification from '../custom/setting/setting-notification'

export default function Inventory({ leftBar }) {
  const { data: session, status } = useSession()
  const [mode, setMode] = useState('profile')
  const [data, setData] = useState([])
  const [pageloading, setPageLoding] = useState(true)
  const [addInv, setaddInv] = useState(false)
  const [dataloading, setaDataLoding] = useState(false)
  const router = useRouter()

  const [dispType, setDispType] = useState('profile')

  const [msg, setmsg] = useState('')

  useEffect(() => {
    localStorage.setItem('redirect', '/')
    leftBar('setting')
    /* router.push('/inventory','/inventory?page=online',{shallo:true}) */
    if (status != 'loading' && !session) {
      localStorage.setItem('redirect', '/generalSetting?setting-profile')
      router.push('/sign-in')
    } else if (status == 'authenticated') {
      console.log(session)
      setPageLoding(false)
    }
  }, [session])

  if (msg != '') {
    setTimeout(() => setmsg(''), 5000)
  }

  return (
    <div>
      <div className=''>
        <h1 className='heading-149 d-flex justify-content-center'>
          General Settings
        </h1>
        <div className='div-block-343 aaa'>
          <h3 className='heading-149'>Settings</h3>
          <div className='d-flex justify-content-between pb-5'>
            <div className='bg-light'>
              <button
                className='px-5 py-2 field-label-11'
                style={{
                  color: 'black',
                  backgroundColor: '#F4FBFF',
                  textDecoration: dispType == 'profile' ? 'underline' : '',

                  textDecorationColor: dispType == 'profile' ? '#007ADF' : '',
                  textDecorationThickness: dispType == 'profile' ? '2px' : '',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  router.push(
                    '/generalSetting',
                    '/generalSetting?setting-profile',
                    {
                      shallo: true,
                    }
                  )
                  setDispType('profile')
                  setMode('profile')
                }}
              >
                Profile Settings
              </button>
              <button
                className='px-5 py-2 field-label-11'
                style={{
                  color: 'black',
                  backgroundColor: '#F4FBFF',
                  textDecoration: dispType == 'notification' ? 'underline' : '',

                  textDecorationColor:
                    dispType == 'notification' ? '#007ADF' : '',
                  textDecorationThickness:
                    dispType == 'notification' ? '2px' : '',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  router.push(
                    '/generalSetting',
                    '/generalSetting?setting-notification',
                    {
                      shallo: true,
                    }
                  )
                  setDispType('notification')
                  setMode('notification')
                }}
              >
                Notifications
              </button>
              <button
                className='px-5 py-2 field-label-11'
                style={{
                  color: 'black',
                  backgroundColor: '#F4FBFF',
                  textDecoration: dispType == 'billling' ? 'underline' : '',

                  textDecorationColor: dispType == 'billling' ? '#007ADF' : '',
                  textDecorationThickness: dispType == 'billling' ? '2px' : '',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  router.push(
                    '/generalSetting',
                    '/generalSetting?setting-payment',
                    {
                      shallo: true,
                    }
                  )
                  setDispType('billling')
                  setMode('billling')
                }}
              >
                Billing
              </button>
            </div>
          </div>

          <div>
            {dataloading ? (
              <div className=' d-flex justify-content-center mt-5'>
                <div className='spinner-border' role='status'>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
            ) : (
              <div className='div-block-335'>
                <div className='div-block-337'>
                  {msg && <p className='text-danger'>{msg}</p>}
                  {mode == 'profile' ? (
                    <SettingProfile leftBar={() => {}} />
                  ) : mode == 'notification' ? (
                    <SettingNotification leftBar={() => {}} />
                  ) : (
                    <SettingPayment leftBar={() => {}} />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* addpage data */}
          <div className='spacer' />
        </div>
      </div>
    </div>
  )
}
