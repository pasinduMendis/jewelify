/* eslint-disable @next/next/no-html-link-for-pages */
import Head from "next/head";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const FrameLoading = ({ Component }) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>Jewelify</title>
        <meta name="description" content />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <>
        <div className="div-block-327">
          <div className="div-block-325">
            <div className="div-block-316">
              <div className="div-block-326">
                <div
                  className=" text-secondary"
                  role="status"
                >
                   <Skeleton 
                          baseColor='#CFDEEA'
                          style={{
                            height: "10px",
                            borderRadius: "50px",
                            width: "100px",
                            backgroundColor:'#CFDEEA'
                          }}
                        />
                </div>
              </div>
              <div className="div-block-319">
                {/* <a  className="link-block-31 w-inline-block">
                  <div className="div-block-315"><img src="images/Vector_4.svg" loading="lazy" alt="" className="image-85" />
                    <div className="text-block-34">Dashboard</div>
                  </div>
                </a> */}
                <a
                  id="integrationBg"
                  className={"link-block-31 w-inline-block"}
                >
                  <div className="div-block-315">
                    <div className={"pt-4"} id="integration">
                      <div
                        className=" text-secondary"
                        role="status"
                      >
                         <Skeleton 
                          baseColor='#CFDEEA'
                          style={{
                            height: "10px",
                            borderRadius: "50px",
                            width: "100px",
                            backgroundColor:'#CFDEEA'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  id="integrationBg"
                  className={"link-block-31 w-inline-block"}
                >
                  <div className="div-block-315">
                    <div className={"pt-4"} id="integration">
                      <div
                        className=" text-secondary"
                        role="status"
                      >
                        <Skeleton 
                          baseColor='#CFDEEA'
                          style={{
                            height: "10px",
                            borderRadius: "50px",
                            width: "100px",
                            backgroundColor:'#CFDEEA'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="div-block-316">
              <a id="integrationBg" className={"link-block-31 w-inline-block"}>
                <div className="div-block-315">
                  <div className={"pt-4"} id="integration">
                    <div
                      className=" text-secondary"
                      role="status"
                    >
                       <Skeleton 
                          baseColor='#CFDEEA'
                          style={{
                            height: "10px",
                            borderRadius: "50px",
                            width: "100px",
                            backgroundColor:'#CFDEEA'
                          }}
                        />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="div-block-328 aaa">
            <div className="div-block-322">
              <div className="div-block-315">
                <div
                  
                >
                  <Skeleton 
                          circle={true}
                          baseColor='#CFDEEA'
                          style={{
                            height: "50px",
                            borderRadius: "50px",
                            width: "50px",
                            backgroundColor:'#CFDEEA'
                          }}
                        />
                </div>
              </div>
            </div>
            <div className="div-block-343">
              <div className="">
                <div className="mt-5">
                  <div className="" style={{ width: "100%" }}>
                    <div>
                      <div
                        className="d-flex justify-content-center align-items-center "
                        style={{ height: "50vh" }}
                      >
                        <div
                          
                        >
                           <Skeleton 
                          circle={true}
                          baseColor='#CFDEEA'
                          style={{
                            height: "200px",
                            borderRadius: "50px",
                            width: "200px",
                            backgroundColor:'#CFDEEA'
                          }}
                        />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="spacer" />
          </div>
        </div>
      </>
    </div>
  );
};

export default FrameLoading;
