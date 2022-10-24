/* eslint-disable @next/next/no-html-link-for-pages */
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loading = ({ data }) => {
  return (
    <div>
      <div>
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
                      <div>
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
                      <p>
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
                      </p>
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
                      checked
                    />
                    <label
                      className='form-check-label'
                      htmlFor='flexCheckDefault'
                    >
                      <div>
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
                      <p>
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
                      </p>
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
                      <div>
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
                      <p>
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
                      </p>
                    </label>
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

export default Loading
