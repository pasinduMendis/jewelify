import Link from 'next/link'

export default function Footer() {
    return (
        <div className="footer div-block-367">
            <div className="div-block-2" />
            <div className="footer-wrap">
                <div className="column-1"><img src="images/Jewelify.png" loading="lazy" alt="" className="image-2" />
                    <h5 className="copyright-text">Copyright © 2022 Jewelify.<br /> All rights reserved.</h5>
                </div>
                <div className="column-2">
                    <h1 className="heading-4">Services</h1>
                    <Link href="#" ><a className="list-item">Omni-Channel Integration</a></Link>
                </div>
                <div className="column-3">
                    <h1 className="heading-4">Company</h1>
                    <Link href="#" ><a className="list-item">Works</a></Link>
                    <Link href="#" ><a className="list-item">About</a></Link>
                    <Link href="#" ><a className="list-item">Resources</a></Link>
                    <Link href="#" ><a className="list-item">Pricing</a></Link>
                </div>
                <div className="column-4">
                    <h1 className="heading-5">Follow us</h1>
                    <div className="social-icons-wrap">
                        <Link href="#" ><a className="w-inline-block"><img src="images/fb.svg" loading="lazy" alt="" className="fb" /></a></Link>
                        <Link href="#" ><a className="w-inline-block"><img src="images/twitte.svg" loading="lazy" alt="" className="twitter" /></a></Link>
                        <Link href="#" ><a className="w-inline-block"><img src="images/insta.svg" loading="lazy" alt="" className="insta" /></a></Link>
                        <Link href="#" ><a className="w-inline-block"><img src="images/youtube.svg" loading="lazy" alt="" className="youtube" /></a></Link>
                        <Link href="#" ><a className="w-inline-block"><img src="images/link-n.svg" loading="lazy" alt="" className="linkedin" /></a></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}