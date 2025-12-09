export const PRICING_PLANS = [
  {
    id: 'weekly',
    name: 'Weekly Pass',
    price: '$5.99',
    priceValue: 5.99,
    currency: 'USD',
    credits: 20, 
    period: 'week',
    badge: null,
    features: [
      '20 AI Try-Ons', 
      'High Quality Results',
      'All Categories',
      'Download Results',
      'Valid for 7 days'
    ],
    popular: false,
    // paddlePriceId: 'pri_01k885kd54vvka1hwjh5ftbsey', // ❌ Paddle (not used)
    polarProductId: import.meta.env.VITE_POLAR_PRODUCT_WEEKLY, // ✅ Polar
  },
  {
    id: 'monthly',
    name: 'Monthly Pro',
    price: '$9.99',
    priceValue: 9.99,
    currency: 'USD',
    credits: 50,
    period: 'month',
    badge: 'Most Popular',
    features: [
      '50 AI Try-Ons',
      'High Quality Results',
      'All Categories',
      'Download Results',
      'Priority Processing',
      'Valid for 30 days'
    ],
    popular: true,
    // paddlePriceId: 'pri_01k885p36tg85wx9j7hhx83z7b', // ❌ Paddle (not used)
    polarProductId: import.meta.env.VITE_POLAR_PRODUCT_MONTHLY, // ✅ Polar
  },
  {
    id: 'yearly',
    name: 'Yearly VIP',
    price: '$19.99',
    priceValue: 19.99,
    currency: 'USD',
    credits: 100,
    period: 'year',
    badge: 'Best Value',
    features: [
      '100 AI Try-Ons',
      'High Quality Results',
      'All Categories',
      'Download Results',
      'Priority Processing',
      'Early Access to Features',
      'Valid for 365 days'
    ],
    popular: false,
    // paddlePriceId: 'pri_01k885qvwyz3m794tkqxr03k23', // ❌ Paddle (not used)
    polarProductId: import.meta.env.VITE_POLAR_PRODUCT_YEARLY, // ✅ Polar
  },
  {
    id: 'credits_200',
    name: '200 Credits',
    price: '$39.99',
    priceValue: 39.99,
    currency: 'USD',
    credits: 200,
    period: 'one-time',
    badge: null,
    features: [
      '200 AI Try-Ons',
      'No Expiration',
      'High Quality Results',
      'All Categories',
      'Download Results'
    ],
    popular: false,
    // paddlePriceId: 'pri_01k885v4b7bf2drha0vcw8pcbj', // ❌ Paddle (not used)
    polarProductId: import.meta.env.VITE_POLAR_PRODUCT_CREDITS_200, // ✅ Polar
  }
];