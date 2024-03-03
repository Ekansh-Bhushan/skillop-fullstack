import React,{useEffect} from "react";
import MiscNavBar from "./MiscNavBar";
import "./pp.css";
import MiscFooter from "./MiscFooter";

const PrivacyPolicy = () => {
	useEffect(() => {
		// Scroll to the top when the component mounts
		window.scrollTo(0, 0);
	  }, []);
	return (
		<>
			<MiscNavBar />
			<div className='pp-container'>
				<h1>
					<center>Privacy Policy</center>
				</h1>
				<div className='pp-main-content'>
					<p>Effective from 📅 1 Oct 2023</p>
					<div className='pp-head-para'>
						<h2>1. Introduction 🙋‍♂️</h2>
						<p>
							<a href='https://skillop.in'>Skillop.in</a> is a dynamic platform
							dedicated to connecting students with mentors, fostering knowledge
							sharing, and enhancing learning experiences. This Privacy Policy
							outlines our approach to handling the personal information of our
							members and visitors.
						</p>
					</div>
					<div className='pp-head-para'>
						<h2>2. Scope and Application 🧾</h2>
						<p>
							This policy applies to all users of{" "}
							<a href='https://skillop.in'>Skillop.in</a>, including students,
							mentors, and visitors, across our website, mobile applications,
							and related services.
						</p>
					</div>
					<div className='pp-head-para'>
						<h2>
							3. Information We Collect Personal Identification Information: 📥
						</h2>
						<p>
							Including but not limited to names, email addresses, phone
							numbers, educational backgrounds, and professional details.
							User-Generated Content: Posts, comments, experiences, mentorship
							interactions, and any other content shared on the platform. Usage
							and Technical Data: Information on how users interact with our
							services, browser types, IP addresses, and device information.
							Transaction and Billing Information: For users engaging in premium
							services or transactions on{" "}
							<a href='https://skillop.in'>Skillop.in</a>.
						</p>
					</div>
					<div className='pp-head-para'>
						<h2>4. How We Collect Your Data Direct from Users: ⁉</h2>
						<p>
							Through account creation, profile setup, content posting, and
							service interactions. Automated Technologies: Collection of usage
							and technical data via cookies, log files, and other tracking
							technologies. Third Parties: From partners or external platforms,
							especially when integrating external content or services.
						</p>
					</div>
					<div className='pp-head-para'>
						<h2>5. Use of Your Information Service Provision: 👨‍🔧</h2>
						<p>
							Facilitating mentorship connections, content sharing, and
							community engagement. Personalization: Tailoring the user
							experience based on individual preferences and interactions.
							Communication and Support: Service updates, promotional materials,
							and support communications. Platform Improvement and Analytics:
							For enhancing functionality and developing new features.
						</p>
					</div>
					<div className='pp-head-para'>
						<h2>6. Sharing Your Information With User Consent: ℹ</h2>
						<p>
							Sharing information for mentorship connections and community
							interactions. Service Providers: Collaborating with third parties
							for hosting, maintenance, analytics, and other operational
							purposes. Compliance and Legal Obligations: When required by law
							or to protect the rights and safety of our users and services.
							Business Transfers: In cases of mergers, acquisitions, or other
							business restructuring processes.
						</p>
					</div>
					<div className='pp-head-para'>
						<h2>7. International Data Transfers 📲</h2>
						<p>
							Managing cross-border data transfers with appropriate safeguards
							and in compliance with applicable laws.
						</p>
					</div>
					<div className='pp-head-para'>
						<h2>8. Data Security 🔐</h2>
						<p>
							Commitment to securing personal data against unauthorized access
							and data breaches.
						</p>
					</div>
					<div className='pp-head-para'>
						<h2>9. Data Retention 📕</h2>{" "}
						<p>
							Retaining personal data only for as long as necessary to fulfill
							the purposes outlined in this policy.
						</p>
					</div>
					<div className='pp-head-para'>
						<h2>10. Your Rights and Choices 🤔</h2>
						<p>
							Providing users with the ability to access, rectify, delete, or
							restrict their personal data, in accordance with applicable laws.
						</p>
					</div>
					<div className='pp-head-para'>
						<h2>11. Cookies and Tracking 🗺</h2>
						<p>
							Technologies Details on the use of cookies and options for
							managing preferences are included in our Cookie Policy.
						</p>
					</div>
					<div className='pp-head-para'>
						<h2>12. Protection of Children's Privacy 🧒</h2>
						<p>
							Ensuring the protection of minors and compliance with relevant
							laws regarding children’s data.
						</p>
					</div>
					<div className='pp-head-para'>
						<h2>13. Changes to This Policy 📝</h2>{" "}
						<p>
							Notifying users of any substantial changes to the policy and the
							effective date of such changes.
						</p>
					</div>
					<div className='pp-head-para'>
						<h2>14. Contact and Complaints 📞</h2>
						<p>
							Providing contact information for privacy-related inquiries and a
							process for addressing complaints.
						</p>
					</div>
					<div className='pp-head-para'>
						<h2>15. Governing Law and Jurisdiction ⚖</h2>
						<p>
							Stating the legal framework governing the policy and the
							jurisdiction for any disputes.
						</p>
					</div>
				</div>
			</div>
			<MiscFooter />
		</>
	);
};

export default PrivacyPolicy;
