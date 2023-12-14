import React from "react";
import { Link } from "react-router-dom";
import './MiscNavBar.css'

const MiscNavBar = () => {
	return (
		<div className='misc-navbar-conatiner'>
			<div className='misc-logo'>
				<img src='/skillop-logo.png' alt='logo' />
				<h2>SKILLOP</h2>
			</div>
			<div className='misc-right-nav'>
				<ul>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='/about'>About</Link>
					</li>
					<li>
						<Link to='/privacy-policy'>Privacy Policy</Link>
					</li>
					<li>
						<Link to='/contact'>Contact</Link>
					</li>
					<li>
						<Link to='/faqs'>FAQs</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default MiscNavBar;
