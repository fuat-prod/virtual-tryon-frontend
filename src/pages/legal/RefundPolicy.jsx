export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">Last Updated: November 2025</p>

            {/* Introduction */}
            <section className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                We want every customer to feel confident when using <strong>DressAI</strong>. If you are not satisfied with a purchase, you may request a refund within <strong>14 days</strong> from the date of the transaction.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Because our service provides instant digital delivery, refunds may not be available if the service has already been fully provided or consumed during this period. However, if you experience an issue that prevents you from accessing or using the service as expected, we will be happy to assist you.
              </p>
            </section>

            {/* 1. Refund Window */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ 1. Refund Window</h2>
              <p className="text-gray-700 leading-relaxed">
                You have the right to request a refund within <strong>14 days</strong> from the purchase date.
              </p>
            </section>

            {/* 2. What Can Be Refunded */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ 2. What Can Be Refunded</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may request a refund if:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You were charged incorrectly (accidental double charge, price discrepancy, etc.)</li>
                <li>The product or credits you purchased were not delivered to your account</li>
                <li>A verified technical issue prevented you from using the service</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We will review each request and do our best to resolve the situation quickly.
              </p>
            </section>

            {/* 3. Subscriptions */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ 3. Subscriptions</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Subscription plans renew automatically unless cancelled before the renewal date</li>
                <li>You may cancel any time to stop future renewals</li>
                <li>Cancellation does not automatically grant a refund, unless your request qualifies under this policy or applicable consumer laws</li>
              </ul>
            </section>

            {/* 4. How to Request a Refund */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ 4. How to Request a Refund</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To request a refund, please contact our support team:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <p className="text-gray-800 font-semibold mb-2">📩 Email:</p>
                <p className="text-blue-600 font-semibold mb-4">support@dressai.app</p>
                <p className="text-gray-700 text-sm italic">
                  Subject: <strong>Refund Request – [Order ID or Email]</strong>
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-3 font-semibold">Please include:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Email used during purchase</li>
                <li>Order ID (if available)</li>
                <li>A short description of the issue</li>
              </ul>
            </section>

            {/* 5. Processing Time */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ 5. Processing Time</h2>
              <p className="text-gray-700 leading-relaxed">
                Refunds are issued back to the original payment method. Processing time may vary depending on your payment provider.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}