import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react";
import { createImageFromInitials } from '../custom/createprofilePic';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Header2() {
    const { data: session, status } = useSession();
    return (
        <div className="header-2 pricing-page">
            <div data-animation="default" data-collapse="small" data-duration={400} data-easing="ease" data-easing2="ease" role="banner" className="navbar-3 w-nav">
                <div className="container-4 w-container">
                    <Link href="index.html"><a aria-current="page" className="w-nav-brand w--current"><img src="images/Jewelify.png" loading="lazy" alt="" className="image-73" /></a></Link>
                    <nav role="navigation" className="nav-menu-3 w-nav-menu">
                        <Link href="index.html"><a aria-current="page" className="nav-link-2 w-nav-link w--current">Home</a></Link>
                        <div data-hover="false" data-delay={0} data-w-id="26df0f8c-dfbe-a547-f6b3-58b64381191a" className="dropdown-2 w-dropdown">
                            <div className="dropdown-toggle-2 w-dropdown-toggle">
                                <div data-w-id="26df0f8c-dfbe-a547-f6b3-58b64381191c" className="w-icon-dropdown-toggle" />
                                <div className="nav-link-2">Solutions</div>
                            </div>
                            <nav className="dropdown-list-2 w-dropdown-list">
                                <Link href="solutions.html"><a className="dropdown-link w-dropdown-link">API Connection</a></Link>
                                <Link href="new-landing-page.html"><a className="dropdown-link w-dropdown-link">Website Development</a></Link>
                            </nav>
                        </div>
                        <Link href="pricing.html"><a className="nav-link-2 w-nav-link">Pricing</a></Link>
                        <Link href="about-us.html"><a className="nav-link-2 w-nav-link">About Us</a></Link>
                        <Link href="blog.html"><a className="nav-link-2 w-nav-link">Blog</a></Link >
                    </nav >
                    <div data-w-id="950a39fd-5986-78cf-24ef-521da0c57cf5" className="menu-button-3 w-nav-button"><img src="images/Group-33600.png" loading="lazy" alt="" className="image-55" /><img src="images/Close.svg" loading="lazy" alt="" className="close" />
                        <div className="icon-3 w-icon-nav-menu" />
                    </div>
                    {session?
                <>
                <a  className="w-inline-block">
                  <img
                    src="images/Notification-Bell.svg"
                    loading="lazy"
                    alt=""
                  />
                </a>

                <Dropdown>
                  <Dropdown.Toggle variant="white" id="dropdown-custom-1">
                    <img
                      src={session.profilePicture?session.profilePicture:createImageFromInitials(
                        500,
                        session.id,
                        "#1E90FF"
                      )}
                      style={{ width: "50px", borderRadius: "50px" }}
                      loading="lazy"
                      alt=""
                      className="image-81"
                    />
                    {/*  <div className="text-block-31">{session.id}</div>*/}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="super-colors bg-primary text-center">
                    <Dropdown.Item className="bg-primary" variant="primary" active onClick={signOut}>
                    SIGN-OUT
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>:
                <>
                 <a
                        onClick={() => {
                          localStorage.setItem(
                            "redirect",
                            "/pricing"
                          );
                          signIn();
                        }}
                        className="btn-cta-header2 w-button"
                      >
                        Sign In
                      </a>
                </>
                }
                </div >
            </div >
        </div >
    )
}