/* eslint-disable @next/next/no-html-link-for-pages */
import { useSession, signIn, signOut } from 'next-auth/react'

import React, { useEffect, useState } from 'react'

import Loading from '../loadingPages/setting-notification-loading'

const SettingNotification = ({ data }) => {
  const { data: session, status } = useSession()
  const [pageloading, setPageLoding] = useState(true)

  useEffect(() => {
    localStorage.setItem('redirect', '/')
    if (status != 'loading' && !session) {
      localStorage.setItem('redirect', '/setting')
      router.push('/sign-in')
    } else if (status == 'authenticated') {
      console.log(session)

      setPageLoding(false)
    }
  }, [session])

  

  return (
    <div>
      <div>
        {pageloading ? (
          <Loading />
        ) : (
          <div className=''>
            <div className='div-block-343'>
              <div className='div-block-335'>
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
                {/* <div className="div-block-337">
                  <div className="div-block-338"><img src="images/155-1.png" loading="lazy" alt="" className="image-88" />
                    <div className="div-block-340">
                      <div className="div-block-341">
                        <a  className="button-134 w-button">Change Picture</a>
                        <a  className="button-135 w-button">Remove Picture</a>
                      </div>
                    </div>
                  </div>
                  <div className="div-block-339">
                    <div className="w-form">
                      <form id="email-form" name="email-form" data-name="Email Form" method="get"><input type="text" className="text-field-14 w-input" maxLength={256} name="Store-Name" data-name="Store Name" placeholder="Store Name" id="Store-Name" /><input type="text" className="text-field-14 w-input" maxLength={256} name="Platform-Name" data-name="Platform Name" placeholder="Platform Name" id="Platform-Name" /><input type="email" className="text-field-14 w-input" maxLength={256} name="Email-3" data-name="Email 3" placeholder="Email" id="Email-3" />
                        <div className="div-block-342">
                          <a  className="button-134 _222 w-button">Save</a>
                          <a  className="button-135 black w-button">Cancel</a>
                        </div>
                      </form>
                      <div className="w-form-done">
                        <div>Thank you! Your submission has been received!</div>
                      </div>
                      <div className="w-form-fail">
                        <div>Oops! Something went wrong while submitting the form.</div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className='spacer' />
          </div>
        )}
      </div>
    </div>
  )
}

export default SettingNotification
