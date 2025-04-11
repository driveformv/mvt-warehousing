import React from "react";

export const metadata = {
  title: "Privacy Policy | MVT Warehousing",
  description: "Privacy Policy for MVT Warehousing - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1">
      <div className="bg-mvt-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white text-center">Privacy Policy</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <h2>Introduction</h2>
          <p>
            MVT Warehousing, LLC ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using our website or services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
          </p>

          <h2>Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email address, phone number, company name, and other contact details you provide when filling out forms on our website or communicating with us.
            </li>
            <li>
              <strong>Usage Information:</strong> Information about how you use our website, including pages visited, time spent on pages, and other analytics data.
            </li>
            <li>
              <strong>Device Information:</strong> Information about the device you use to access our website, including IP address, browser type, and operating system.
            </li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including:</p>
          <ul>
            <li>Providing, maintaining, and improving our website and services</li>
            <li>Responding to your inquiries and fulfilling your requests</li>
            <li>Sending you administrative information, such as updates to our terms, conditions, and policies</li>
            <li>Sending you marketing communications about our services, if you have opted in to receive such communications</li>
            <li>Analyzing usage patterns to improve our website and services</li>
            <li>Protecting our rights, property, or safety, and that of our users or others</li>
          </ul>

          <h2>Disclosure of Your Information</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>Service providers who perform services on our behalf</li>
            <li>Business partners with whom we jointly offer products or services</li>
            <li>Legal authorities when required by law or to protect our rights</li>
            <li>In connection with a business transaction, such as a merger, sale of assets, or acquisition</li>
          </ul>

          <h2>Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.
          </p>

          <h2>Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, such as:</p>
          <ul>
            <li>The right to access your personal information</li>
            <li>The right to correct inaccurate personal information</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to restrict or object to processing of your personal information</li>
            <li>The right to data portability</li>
          </ul>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            MVT Warehousing, LLC<br />
            7167 Chino Drive<br />
            El Paso, TX 79915<br />
            Phone: (800) 327-1204<br />
            Email: sales@mvtwarehousing.com
          </p>
        </div>
      </div>
    </main>
  );
}
