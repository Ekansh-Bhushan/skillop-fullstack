import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MiscNavBar.css";

const MiscNavBar = () => {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);

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
			<div className='misc-right-nav'>
				<ul>
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
					<li className={currentPath === "/contact" ? "misc-active-menu" : ""}>
						<Link to='/contact'>Contact</Link>
					</li>
					<li className={currentPath === "/faqs" ? "misc-active-menu" : ""}>
						<Link to='/faqs'>FAQs</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default MiscNavBar;
