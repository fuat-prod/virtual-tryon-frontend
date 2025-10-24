export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">Last Updated: October 2025</p>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4"> Disclaimer</h2>
              <div className="space-y-3 text-gray-800">
                <p className="leading-relaxed">
                  <strong>DressAI</strong> is an AI-powered platform created for <strong>entertainment and creative purposes only.</strong>
                </p>
                <p className="leading-relaxed">
                  Users may only upload images of <strong>themselves</strong> or of individuals who have provided <strong>explicit consent.</strong>
                </p>
                <p className="leading-relaxed">
                  Uploading or generating <strong>non-consensual, sexualized, or harmful content is strictly prohibited.</strong>
                </p>
                <p className="leading-relaxed">
                  Any misuse of the platform — including the creation of deepfakes, content involving minors, or likenesses of celebrities or public figures without consent — will result in <strong>immediate suspension</strong> and may be reported to the relevant authorities.
                </p>
              </div>
            </div>

            {/* Welcome */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to DressAI</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to <strong>DressAI.app</strong> — an AI-driven digital fashion platform that allows users to generate virtual outfit visualizations using advanced AI technology (the "Service").
              </p>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service ("Terms") govern your access to and use of DressAI.app, operated by DressAI ("DressAI," "we," "us," or "our"). By using DressAI.app, you agree to these Terms. If you do not agree, please discontinue using the Service.
              </p>
            </section>

            {/* Service Description */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Description of the Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                DressAI provides AI-based <strong>Virtual Try-On</strong> technology that enables users to visualize clothing items on their uploaded photos.
              </p>
              <p className="text-gray-700 leading-relaxed">
                All features are intended for <strong>personal, non-commercial use</strong>, designed to inspire creativity, entertainment, and digital styling. You may only use the Service to generate or process images of yourself or individuals who have given you explicit permission.
              </p>
            </section>

            {/* Eligibility */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You must be at least the age of majority in your country of residence to use DressAI.app. If you are under 18, you may only use the Service under parental or guardian supervision and consent.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using DressAI.app, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
                <li>You have the legal right to use and upload the photos you submit</li>
                <li>Your uploads and generated content comply with all applicable laws and these Terms</li>
              </ul>
            </section>

            {/* Credits and Subscriptions */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Credits, Subscriptions, and Payments</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                DressAI operates on a credit-based system:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Free Trial:</strong> New users receive limited free trial credits</li>
                <li><strong>Credit Packages:</strong> One-time purchases that do not expire</li>
                <li><strong>Subscriptions:</strong> Weekly, Monthly, or Yearly plans that provide recurring credits</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Each AI try-on generation consumes one credit. Subscription credits expire at the end of the billing period. All payments are processed securely through Paddle. Subscriptions automatically renew unless cancelled before the next billing date.
              </p>
            </section>

            {/* Personal Use */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Personal and Non-Commercial Use</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                DressAI.app is for <strong>personal and creative use only.</strong> You may not:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Use generated images for advertising, branding, or commercial gain</li>
                <li>Resell, sublicense, or redistribute AI-generated outputs</li>
                <li>Use outputs in professional or promotional materials without written permission</li>
                <li>Use the Service for business, institutional, or AI model training purposes</li>
              </ul>
            </section>

            {/* User Content */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Content</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you upload content ("User Content"), you <strong>retain ownership</strong> of your materials. By uploading, you grant DressAI a limited, non-exclusive, worldwide, revocable license to process, modify, and display your content only to provide the Service.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                You confirm that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You own or have consent to use the uploaded photo(s)</li>
                <li>Your content does not infringe on others' rights (privacy, publicity, or intellectual property)</li>
                <li>Your content is not harmful, explicit, or unlawful</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                DressAI reserves the right to remove or restrict content that violates these Terms at its discretion.
              </p>
            </section>

            {/* Prohibited Uses */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Prohibited Uses</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree <strong>not to use</strong> DressAI.app for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Generating non-consensual, sexualized, or explicit imagery</li>
                <li>Creating nudity, pornography, or adult content</li>
                <li>Producing hateful, violent, or discriminatory materials</li>
                <li>Using another person's likeness without consent (including celebrities or public figures)</li>
                <li>Uploading images of minors without verified parental consent</li>
                <li>Impersonating others or submitting false identity information</li>
                <li>Attempting to reverse-engineer or copy our AI models</li>
                <li>Using outputs to train other AI systems</li>
                <li>Circumventing security or accessing systems without authorization</li>
                <li>Violating any applicable law or regulation</li>
              </ul>
              <p className="text-red-600 font-semibold mt-4">
                Violations may result in immediate suspension or legal action.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All software, AI models, algorithms, designs, and visual assets within DressAI.app are the exclusive property of DressAI or its licensors.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Generated outputs ("AI Output") are licensed to you for personal, non-commercial use only. You may not claim ownership of, sell, or publicly represent AI-generated results as human-created works.
              </p>
            </section>

            {/* Accuracy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Accuracy of AI Outputs</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                AI-generated content may sometimes produce inaccurate, distorted, or unrealistic results. DressAI does not guarantee the accuracy, realism, or identity consistency of generated images.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You are solely responsible for how you use, share, or distribute your AI Outputs.
              </p>
            </section>

            {/* Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the maximum extent permitted by law: DressAI and its affiliates are not liable for any indirect, incidental, or consequential damages arising from your use of the Service. We do not guarantee uninterrupted operation or error-free performance. We are not responsible for misuse of generated content by users. Your use of the Service is entirely at your own risk.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                DressAI reserves the right to suspend or terminate your access if you violate these Terms or misuse the Service. Upon termination, your right to use generated outputs ceases immediately.
              </p>
            </section>

            {/* Modifications */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update these Terms periodically. Updates become effective upon posting at www.dressai.app. Your continued use of DressAI.app after such updates constitutes your acceptance of the revised Terms.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For any questions or concerns regarding these Terms, please contact us at:
              </p>
              <p className="text-blue-600 font-semibold mt-2">
                📩 support@dressai.app
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}