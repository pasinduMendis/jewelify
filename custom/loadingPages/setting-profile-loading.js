/* eslint-disable @next/next/no-html-link-for-pages */
import { useSession, signIn, signOut } from 'next-auth/react'
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Setting = ({ data }) => {
  return (
    <div>
      <div>
        <div className=''>
          <div className='div-block-343'>
            <div className='div-block-335'>
              <div className='div-block-337'>
                <div className='div-block-338'>
                  <br />

                  <div className='div-block-340' style={{ padding: '50%' }}>
                    <div className='div-block-341'>
                      <div className='' style={{ padding: '50%' }}>
                        <div className='' style={{ padding: '50%' }}>
                          <Skeleton
                            baseColor='#CFDEEA'
                            circle={true}
                            style={{
                              height: '70px',
                              borderRadius: '50px',
                              width: '70px',
                              backgroundColor: '',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='div-block-339'>
                  <div>
                    <Skeleton
                      baseColor='#CFDEEA'
                      style={{
                        height: '10px',
                        borderRadius: '50px',
                        width: '12vw',
                      }}
                    />
                  </div>

                  <div className='w-form'>
                    <form
                      autoComplete='off'
                      id='email-form'
                      name='email-form'
                      data-name='Email Form'
                      method='get'
                    >
                      <div>
                        <Skeleton
                          baseColor='#CFDEEA'
                          style={{
                            height: '10px',
                            borderRadius: '50px',
                            width: '12vw',
                          }}
                        />
                      </div>
                      <div>
                        <Skeleton
                          baseColor='#CFDEEA'
                          style={{
                            height: '10px',
                            borderRadius: '50px',
                            width: '12vw',
                          }}
                        />
                      </div>
                      <div>
                        <Skeleton
                          baseColor='#CFDEEA'
                          style={{
                            height: '10px',
                            borderRadius: '50px',
                            width: '12vw',
                          }}
                        />
                      </div>
                      <div>
                        <Skeleton
                          baseColor='#CFDEEA'
                          style={{
                            height: '10px',
                            borderRadius: '50px',
                            width: '12vw',
                          }}
                        />
                      </div>

                      <div className='div-block-342'>
                        <button className='button-134 _222 w-button'>
                          Save
                        </button>
                        <a
                          onClick={() => router.push('/setting')}
                          className='button-135 black w-button'
                        >
                          Cancel
                        </a>
                      </div>
                    </form>
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
