export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">Last Updated: October 2025</p>

            {/* Introduction */}
            <section className="mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                At <strong>DressAI</strong>, we take your privacy seriously. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our AI-powered virtual try-on service at <strong>www.dressai.app</strong> (the "Service").
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using DressAI, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            {/* 1. Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">a) Account Information</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                When you create an account, we collect:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Email address (for authentication and communication)</li>
                <li>User ID (automatically generated)</li>
                <li>Account creation date</li>
                <li>Credit balance and subscription status</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">b) Uploaded Images</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                To provide our virtual try-on service, you upload:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>User Photos:</strong> Images of yourself (or individuals who have consented)</li>
                <li><strong>Clothing Images:</strong> Photos of garments you want to visualize</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">c) Usage Data</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We automatically collect:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Number of AI try-ons generated</li>
                <li>Features used (categories selected, etc.)</li>
                <li>Device and browser information</li>
                <li>IP address and general location (country/city level)</li>
                <li>Login timestamps and session data</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">d) Payment Information</h3>
              <p className="text-gray-700 leading-relaxed">
                Payment transactions are processed by <strong>Paddle</strong>, our secure payment processor. We do not store your credit card details. Paddle collects and processes payment information according to their privacy policy.
              </p>
            </section>

            {/* 2. How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Provide the Service:</strong> Process your uploaded images to generate AI-powered virtual try-on results</li>
                <li><strong>Manage Your Account:</strong> Track credits, subscriptions, and usage limits</li>
                <li><strong>Process Payments:</strong> Handle purchases and subscriptions through Paddle</li>
                <li><strong>Improve Our Service:</strong> Analyze usage patterns to enhance AI model performance and user experience</li>
                <li><strong>Communicate:</strong> Send important service updates, security alerts, and support messages</li>
                <li><strong>Ensure Safety:</strong> Detect and prevent misuse, fraud, or violations of our Terms of Service</li>
                <li><strong>Legal Compliance:</strong> Meet legal obligations and respond to lawful requests</li>
              </ul>
            </section>

            {/* 3. Image Processing and Storage */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Image Processing and Storage</h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                <p className="text-gray-800 font-semibold mb-2">🔒 Your Privacy is Our Priority</p>
                <p className="text-gray-700 leading-relaxed">
                  We process your images solely to provide the virtual try-on service you requested. We do not use your photos for marketing, advertising, or any other purpose.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">How We Handle Your Images:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-3">
                <li>
                  <strong>Processing:</strong> Uploaded images are sent to secure AI processing servers to generate try-on results
                </li>
                <li>
                  <strong>Temporary Storage:</strong> Images are stored temporarily during processing (typically 5-30 minutes)
                </li>
                <li>
                  <strong>Automatic Deletion:</strong> Original uploads and intermediate files are automatically deleted after generation completes
                </li>
                <li>
                  <strong>Result Images:</strong> Generated try-on results are stored in your account gallery for 30 days, after which they are automatically deleted unless saved by you
                </li>
                <li>
                  <strong>No Training Use:</strong> We do not use your images to train AI models or for any other purpose beyond providing your requested service
                </li>
              </ul>
            </section>

            {/* 4. Data Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing and Third Parties</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We <strong>do not sell</strong> your personal information. We may share data with trusted service providers:
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-semibold text-gray-800">Payment Processing</h4>
                  <p className="text-gray-700"><strong>Paddle:</strong> Handles all payment transactions, subscriptions, and billing</p>
                </div>

                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-semibold text-gray-800">Cloud Infrastructure</h4>
                  <p className="text-gray-700"><strong>AWS & Supabase:</strong> Secure hosting, database, and file storage</p>
                </div>

                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-semibold text-gray-800">AI Processing</h4>
                  <p className="text-gray-700"><strong>Replicate API:</strong> Processes images through secure AI models for virtual try-on generation</p>
                </div>

                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-semibold text-gray-800">Legal Requirements</h4>
                  <p className="text-gray-700">We may disclose information when required by law, court order, or to protect our rights and safety</p>
                </div>
              </div>
            </section>

            {/* 5. Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Encryption:</strong> Data transmitted over HTTPS/TLS encryption</li>
                <li><strong>Secure Storage:</strong> Images and data stored in encrypted cloud infrastructure</li>
                <li><strong>Access Controls:</strong> Strict access limits to user data</li>
                <li><strong>Regular Audits:</strong> Ongoing security assessments and updates</li>
                <li><strong>Automatic Deletion:</strong> Temporary files removed immediately after processing</li>
              </ul>
              <p className="text-gray-600 italic mt-4">
                However, no internet transmission is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            {/* 6. Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                <li><strong>Correction:</strong> Update or correct your account information</li>
                <li><strong>Download:</strong> Export your generated images before they expire</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails (service emails are mandatory)</li>
                <li><strong>Cancel Subscription:</strong> Terminate recurring billing at any time</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                To exercise your rights, contact us at: <strong>support@dressai.app</strong>
              </p>
            </section>

            {/* 7. Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use essential cookies for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>User authentication and session management</li>
                <li>Remembering your preferences</li>
                <li>Security and fraud prevention</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We <strong>do not use</strong> third-party tracking cookies for advertising or marketing purposes.
              </p>
            </section>

            {/* 8. Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                DressAI is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal data, please contact us immediately at <strong>support@dressai.app</strong> and we will delete it.
              </p>
            </section>

            {/* 9. International Users */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                Your information may be processed and stored on servers located in different countries, including the United States and Europe. By using DressAI, you consent to the transfer of your information to countries with different data protection laws than your country of residence.
              </p>
            </section>

            {/* 10. Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Data Retention</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Account Data:</strong> Retained while your account is active</li>
                <li><strong>Uploaded Images:</strong> Deleted immediately after processing (within 30 minutes)</li>
                <li><strong>Generated Results:</strong> Stored for 30 days in your gallery, then automatically deleted</li>
                <li><strong>Transaction Records:</strong> Retained for 7 years for legal and accounting purposes</li>
              </ul>
            </section>

            {/* 11. Changes */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of DressAI after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* 12. Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-800 font-semibold mb-2">📧 Contact Email:</p>
                <p className="text-blue-600 font-semibold">support@dressai.app</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}