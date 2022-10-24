import Link from 'next/link'

export default function Header() {
    return (
        <div data-animation="default" data-collapse="medium" data-duration={400} data-easing="ease" data-easing2="ease" role="banner" className="navbar-4 w-nav">
            <div className="div-contain">
                <div className="menu-button-4 w-nav-button">
                    <div className="icon-10 w-icon-nav-menu" />
                </div>
                <Link href="#" ><a className="w-nav-brand"><img src="images/site-logo.svg" loading="lazy" alt="" /></a></Link>
                <nav role="navigation" className="nav-menu-4 w-nav-menu">
                    <Link href="#" ><a className="nav-menu-link w-nav-link">Home</a></Link>
                    <Link href="#" ><a className="nav-menu-link w-nav-link">Pricing</a></Link>
                    <Link href="#" ><a className="nav-menu-link w-nav-link">Resources</a></Link>
                    <Link href="#" ><a className="nav-menu-link w-nav-link">Contact</a></Link>
                    <div className="div-block-368">
                        <Link href="#" ><a className="demo-nav-button w-button">Schedule Demo</a></Link>
                    </div>
                    <Link href="#" ><a className="nav-menu-link w-nav-link">Login</a></Link>
                </nav>
            </div>
        </div>
    )
}