export const CATEGORIES = [
  { id: 'cat_1', name: 'Plumbing', icon: 'Wrench' },
  { id: 'cat_2', name: 'Electrician', icon: 'Zap' },
  { id: 'cat_3', name: 'Cleaning', icon: 'SprayCan' },
  { id: 'cat_4', name: 'Carpentry', icon: 'Hammer' },
  { id: 'cat_5', name: 'Painting', icon: 'PaintRoller' },
  { id: 'cat_6', name: 'Appliance Repair', icon: 'MonitorSpeaker' },
];

export const USERS = [
  {
    id: 'u1',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    role: 'customer',
    avatar: 'https://i.pravatar.cc/150?u=u1',
    bookings: ['b1', 'b3']
  },
  {
    id: 'u2',
    name: 'Priya Patel',
    email: 'priya@example.com',
    role: 'customer',
    avatar: 'https://i.pravatar.cc/150?u=u2',
    bookings: ['b2']
  },
  {
    id: 'p1',
    name: 'Amit Kumar',
    email: 'amit@service.com',
    role: 'provider',
    verified: true,
    rating: 4.8,
    reviews: 124,
    avatar: 'https://i.pravatar.cc/150?u=p1',
    serviceCategory: 'Plumbing',
    bio: 'Expert plumber with 10 years of experience in leak repairs and installations.',
    hourlyRate: 500,
    services: [
        { id: 's1', name: 'Tap Repair', price: 200, duration: '30m' },
        { id: 's2', name: 'Pipe Fitting', price: 1000, duration: '2h' }
    ]
  },
  {
    id: 'p2',
    name: 'Sunita Reddy',
    email: 'sunita@service.com',
    role: 'provider',
    verified: true,
    rating: 4.9,
    reviews: 56,
    avatar: 'https://i.pravatar.cc/150?u=p2',
    serviceCategory: 'Cleaning',
    bio: 'Professional home cleaning services. Deep cleaning specialists.',
    hourlyRate: 300,
    services: [
        { id: 's3', name: 'Full Home Deep Clean', price: 2500, duration: '4h' },
        { id: 's4', name: 'Oven Cleaning', price: 500, duration: '1h' }
    ]
  },
  {
    id: 'a1',
    name: 'Admin User',
    email: 'admin@karigar.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=a1'
  }
];

export const BOOKINGS = [
  {
    id: 'b1',
    customerId: 'u1',
    providerId: 'p1',
    serviceId: 's1',
    status: 'completed', // requested, confirmed, completed, cancelled
    date: '2023-11-15',
    time: '14:00',
    totalAmount: 200,
    review: { rating: 5, comment: 'Quick and clean job!' }
  },
  {
    id: 'b2',
    customerId: 'u2',
    providerId: 'p2',
    serviceId: 's3',
    status: 'confirmed',
    date: '2023-12-20',
    time: '10:00',
    totalAmount: 2500,
    review: null
  },
  {
    id: 'b3',
    customerId: 'u1',
    providerId: 'p2',
    serviceId: 's4',
    status: 'requested',
    date: '2023-12-22',
    time: '16:00',
    totalAmount: 500,
    review: null
  }
];
