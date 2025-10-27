export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">Last Updated: October 2025</p>

            {/* Introduction */}
            <section className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                At <strong>DressAI</strong>, we aim to ensure you're satisfied with your experience using our AI-powered virtual try-on platform. Since our services are digital and instantly delivered, we maintain a clear refund policy to protect both users and our platform from misuse.
              </p>
            </section>

            {/* 1. Digital Nature */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Digital Nature of Our Products</h2>
              <p className="text-gray-700 leading-relaxed">
                DressAI provides AI-generated digital outputs (virtual try-ons) based on the images and garments you upload. Because these are <strong>non-tangible digital goods</strong>, once processing begins, the service is considered delivered and <strong>non-refundable</strong>.
              </p>
            </section>

            {/* 2. Refund Eligibility */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Refund Eligibility</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Refunds may be issued only in limited cases, such as:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You were charged more than once for the same purchase due to a technical error</li>
                <li>You did not receive credits or access to your selected plan after payment</li>
                <li>The system failed to generate any AI results after a verified processing attempt</li>
                <li>There was a verified billing issue caused by Paddle or a platform malfunction</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-6 mb-6">
                <p className="text-gray-800 font-semibold mb-3">To qualify for a refund, you must:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Contact us within <strong>7 days</strong> of the transaction</li>
                  <li>Provide the email used for purchase, your transaction ID, and a brief explanation of the issue</li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed">
                All refund requests are reviewed individually. Approved refunds are processed via <strong>Paddle</strong>, our payment provider, according to their refund procedures.
              </p>
            </section>

            {/* 3. Non-Refundable Situations */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Non-Refundable Situations</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We <strong>cannot</strong> offer refunds in the following cases:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You changed your mind after credits or subscriptions were activated</li>
                <li>You used your credits to generate AI try-ons successfully</li>
                <li>You experienced subjective dissatisfaction with the AI-generated outputs (style, accuracy, appearance, etc.)</li>
                <li>You purchased a plan or credits by mistake and already accessed the service</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                All credits and subscriptions are <strong>personal, non-transferable, and non-exchangeable</strong> for cash value.
              </p>
            </section>

            {/* 4. Subscriptions */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscriptions and Cancellations</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-3">
                <li>
                  Subscription plans (e.g., Monthly Pro or Yearly VIP) <strong>renew automatically</strong> via Paddle unless cancelled
                </li>
                <li>
                  You can cancel any time before the next billing date via your Paddle account link (included in your purchase email)
                </li>
                <li>
                  Cancellation stops future renewals but <strong>does not trigger a refund</strong> for the current active period
                </li>
              </ul>
            </section>

            {/* 5. Refund Processing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Processing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If your refund is approved:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>It will be processed via <strong>Paddle</strong> to the original payment method</li>
                <li>Processing time typically ranges from <strong>5 to 10 business days</strong> depending on your bank or card issuer</li>
                <li>You'll receive confirmation once the refund is completed</li>
              </ul>
            </section>

            {/* 6. Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For refund requests, please contact our support team:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-800 font-semibold mb-2">📩 Email:</p>
                <p className="text-blue-600 font-semibold mb-4">support@dressai.app</p>
                <p className="text-gray-700 text-sm italic">
                  Include the subject line: <strong>Refund Request – [Order ID or Email]</strong>
                </p>
              </div>
            </section>

            {/* 7. Legal Notice */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Legal & Compliance Notice</h2>
              <p className="text-gray-700 leading-relaxed">
                All transactions are handled securely by <strong>Paddle</strong>, our Merchant of Record. Paddle's refund policy and compliance procedures apply in conjunction with this policy. By purchasing from DressAI, you agree to this Refund Policy and our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}