import React from 'react';
import MiscNavBar from './MiscNavBar';
import MiscFooter from './MiscFooter';

const TermsOfService = () => {
  return (
    <>
      <MiscNavBar />
      <div className="md:mx-8 mx-52 my-32">
        <h1 className="text-center mb-7">TERMS OF SERVICE</h1>
        <div className="flex flex-col gap-7 justify-evenly text-lg">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              Welcome to Skillop.in! By accessing our website, mobile
              applications, or using our services, you agree to be bound by
              these Terms of Service ("Terms"). If you do not agree to these
              Terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2>2. Modification of Terms</h2>
            <p>
              Skillop.in reserves the right to update or modify these Terms at
              any time without prior notice. Your continued use of the service
              after any such changes constitutes your acceptance of the new
              Terms.
            </p>
          </section>

          <section>
            <h2>3. Eligibility</h2>
            <p>
              Our services are intended for use by individuals who are at least
              16 years old or the legal age of majority in their jurisdiction.
              By using Skillop.in, you represent and warrant that you meet these
              eligibility requirements.
            </p>
          </section>

          <section>
            <h2>4. User Accounts</h2>
            <p>
              To access certain features of our service, you may be required to
              create an account. You are responsible for maintaining the
              confidentiality of your account credentials and for all activities
              that occur under your account.
            </p>
          </section>

          <section>
            <h2>5. Use of Services</h2>
            <p>
              Skillop.in provides a platform for mentorship, knowledge sharing,
              and community engagement. You agree to use our services only for
              lawful purposes and in a manner consistent with the community
              standards of our platform.
            </p>
          </section>

          <section>
            <h2>6. User Content</h2>
            <p>
              You retain all rights in, and are solely responsible for, the User
              Content you post to Skillop.in. However, by posting, you grant
              Skillop.in a worldwide, non-exclusive, royalty-free license to
              use, modify, reproduce, and display such content.
            </p>
          </section>

          <section>
            <h2>7. Prohibited Conduct</h2>
            <p>
              You agree not to engage in any of the following prohibited
              activities: (i) copying, distributing, or disclosing any part of
              the service in any medium; (ii) using the service for any unlawful
              purpose; (iii) attempting to interfere with the service’s networks
              or security features.
            </p>
          </section>

          <section>
            <h2>8. Fees and Payments</h2>
            <p>
              Some services on Skillop.in may require payment. We will provide
              details of any charges and how to make payments. All transactions
              are final unless otherwise stated.
            </p>
          </section>

          <section>
            <h2>9. Termination</h2>
            <p>
              Skillop.in may terminate or suspend your access to our services
              immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach these
              Terms.
            </p>
          </section>

          <section>
            <h2>10. Disclaimers</h2>
            <p>
              The services are provided on an "as is" and "as available" basis.
              Skillop.in makes no representations or warranties of any kind,
              express or implied, as to the operation of our services or the
              information, content, or materials included.
            </p>
          </section>

          <section>
            <h2>11. Limitation of Liability</h2>
            <p>
              In no event shall Skillop.in, its affiliates, agents, directors,
              employees, suppliers, or licensors be liable for any indirect,
              punitive, incidental, special, consequential, or exemplary damages
              arising out of or in connection with your use of Skillop.in.
            </p>
          </section>

          <section>
            <h2>12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the jurisdiction in which Skillop.in is based, without
              giving effect to any principles of conflicts of law.
            </p>
          </section>

          <section>
            <h2>13. Contact Information</h2>
            <p>
              For any questions about these Terms of Service, please contact us
              at{' '}
              <a href="mailto:skillop.skill@gmail.com">
                skillop.skill@gmail.com
              </a>
              or drop a message at{' '}
              <a href="tel:+919818807886">+91 9818807886</a>.
            </p>
          </section>
        </div>
      </div>
      <MiscFooter />
    </>
  );
};

export default TermsOfService;
