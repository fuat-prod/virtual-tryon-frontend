export const PRICING_PLANS = [
  {
    id: 'weekly',
    name: 'Weekly Pass',
    price: '$4.99',
    priceValue: 4.99,
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
    paddlePriceId: 'pri_01k885kd54vvka1hwjh5ftbsey', 
  },
  {
    id: 'monthly',
    name: 'Monthly Pro',
    price: '$10.99',  // ← Güncellendi
    priceValue: 10.99,  // ← Güncellendi
    currency: 'USD',
    credits: 50,  // ← Güncellendi
    period: 'month',
    badge: 'Most Popular',
    features: [
      '50 AI Try-Ons',  // ← Güncellendi
      'High Quality Results',
      'All Categories',
      'Download Results',
      'Priority Processing',
      'Valid for 30 days'
    ],
    popular: true,
    paddlePriceId: 'pri_01k885p36tg85wx9j7hhx83z7b',  // ← Eklendi
  },
  {
    id: 'yearly',
    name: 'Yearly VIP',
    price: '$29.99',  // ← Güncellendi
    priceValue: 29.99,  // ← Güncellendi
    currency: 'USD',
    credits: 100,  // ← Güncellendi
    period: 'year',
    badge: 'Best Value',
    features: [
      '100 AI Try-Ons',  // ← Güncellendi
      'High Quality Results',
      'All Categories',
      'Download Results',
      'Priority Processing',
      'Early Access to Features',
      'Valid for 365 days'
    ],
    popular: false,
    paddlePriceId: 'pri_01k885qvwyz3m794tkqxr03k23',  // ← Eklendi
  },
  {
    id: 'credits_200',  // ← Güncellendi
    name: '200 Credits',  // ← Güncellendi
    price: '$59.99',  // ← Güncellendi
    priceValue: 59.99,  // ← Güncellendi
    currency: 'USD',
    credits: 200,  // ← Güncellendi
    period: 'one-time',
    badge: null,
    features: [
      '200 AI Try-Ons',  // ← Güncellendi
      'No Expiration',
      'High Quality Results',
      'All Categories',
      'Download Results'
    ],
    popular: false,
    paddlePriceId: 'pri_01k885v4b7bf2drha0vcw8pcbj',  // ← Eklendi
  }
];