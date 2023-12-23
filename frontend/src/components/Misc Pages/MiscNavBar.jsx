import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MiscNavBar.css";

const MiscNavBar = () => {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);
	const [ActiveMenu, setActiveMenu] = useState(false);

	const handleMobileMenu = (e) => {
		document.querySelector('.misc-right-nav').style.display = ActiveMenu ? "none" : "block";
		setActiveMenu(!ActiveMenu)};

	useEffect(() => {
		setCurrentPath(window.location.pathname);
	}, []);

	return (
		<div className='misc-navbar-conatiner'>
			<div className='misc-logo'>
				<img src='/skillop-logo.png' alt='logo' />
				<a href='/'>
					<h2>SKILLOP</h2>
				</a>
			</div>

			<div className='md:hidden misc-right-nav'>
				<ul className="md:pr-4">
					<li className={currentPath === "/" ? "misc-active-menu" : ""}>
						<Link to='/'>Home</Link>
					</li>
					<li className={currentPath === "/about" ? "misc-active-menu" : ""}>
						<Link to='/about'>About</Link>
					</li>
					<li
						className={
							currentPath === "/privacy-policy" ? "misc-active-menu" : ""
						}>
						<Link to='/privacy-policy'>Privacy Policy</Link>
					</li>
					<li
						className={
							currentPath === "/terms-of-service" ? "misc-active-menu" : ""
						}>
						<Link to='/terms-of-service'>Terms of service</Link>
					</li>
					<li className={currentPath === "/contact" ? "misc-active-menu" : ""}>
						<Link to='/contact'>Contact</Link>
					</li>
					<li className={currentPath === "/careers" ? "misc-active-menu" : ""}>
						<Link to='/careers'>Careers</Link>
					</li>
				</ul>
			</div>
			<div onClick={handleMobileMenu} className='misc-mobile-nav'>
				<img
					src={ActiveMenu ? "/cross.png" : "/menu.png"}
					width={60}
					alt='mobile menu'
				/>
			</div>
		</div>
	);
};

export default MiscNavBar;
