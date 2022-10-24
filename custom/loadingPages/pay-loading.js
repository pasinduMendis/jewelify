import React, { useEffect, useState } from 'react'

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
import ProgressBar from 'react-bootstrap/ProgressBar'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Loading(props) {
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
      <div className='div-block-10 aaaa'>
        <div className=' wrap-upload-popup csvUpload'>
          <div className='div-block-308 white '>
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
                <div className=''>
                  <Skeleton
                    baseColor='#CFDEEA'
                    style={{
                      height: '180px',
                      borderRadius: '',
                      width: '280px',
                    }}
                  />
                </div>
              </div>
              <br />
              <div style={{ padding: '10px' }}>
                <Skeleton
                  baseColor='#CFDEEA'
                  style={{
                    height: '10px',
                    borderRadius: '50px',
                    width: '20vw',
                  }}
                />
              </div>
              <div style={{ padding: '10px' }}>
                <Skeleton
                  baseColor='#CFDEEA'
                  style={{
                    height: '10px',
                    borderRadius: '50px',
                    width: '20vw',
                  }}
                />
              </div>
              <br />
              <div style={{ padding: '10px' }}>
                <Skeleton
                  baseColor='#CFDEEA'
                  style={{
                    height: '10px',
                    borderRadius: '50px',
                    width: '20vw',
                  }}
                />
              </div>
              <div style={{ padding: '10px' }}>
                <Skeleton
                  baseColor='#CFDEEA'
                  style={{
                    height: '10px',
                    borderRadius: '50px',
                    width: '20vw',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Loading
