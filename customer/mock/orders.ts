export type PickupOrder = {
  id: string;
  customer: string;
  phone: string;
  items: number;
  total: number;
  priority: string;
  placedAt: string;
  status: string;
  pickupCode: string | null;
  orderItems: { name: string; qty: number; unit: string; price: number }[];
  acceptedAt?: string;
  readyAt?: string;
  collectedAt?: string;
};

export const orders: PickupOrder[] = [
  {
    id: "ORD-1001",
    customer: "Abhinav Raj Verma",
    phone: "9876543210",
    items: 3,
    total: 540,
    priority: "HIGH",
    placedAt: "2 min ago",
    status: "NEW",
    pickupCode: null,
    orderItems: [
      { name: "Apple", qty: 2, unit: "kg", price: 190 },
      { name: "Milk 1L", qty: 2, unit: "pcs", price: 130 },
      { name: "Bread", qty: 1, unit: "pcs", price: 40 },
    ],
  },
  {
    id: "ORD-1002",
    customer: "Rahul Sharma",
    phone: "9876501234",
    items: 2,
    total: 320,
    priority: "MEDIUM",
    placedAt: "8 min ago",
    status: "NEW",
    pickupCode: null,
    orderItems: [
      { name: "Rice 5kg", qty: 1, unit: "bag", price: 220 },
      { name: "Mustard Oil", qty: 1, unit: "bottle", price: 100 },
    ],
  },
  {
    id: "ORD-1003",
    customer: "Sourish Sharma",
    phone: "9988776655",
    items: 3,
    total: 450,
    priority: "HIGH",
    placedAt: "12 min ago",
    status: "PACKING",
    pickupCode: null,
    acceptedAt: "10 min ago",
    orderItems: [
      { name: "Paneer 200g", qty: 2, unit: "pcs", price: 180 },
      { name: "Tomato", qty: 1, unit: "kg", price: 40 },
      { name: "Onion", qty: 2, unit: "kg", price: 60 },
    ],
  },
  {
    id: "ORD-1004",
    customer: "Aman Singh",
    phone: "9876540000",
    items: 4,
    total: 1280,
    priority: "LOW",
    placedAt: "25 min ago",
    status: "READY",
    pickupCode: "A104",
    acceptedAt: "22 min ago",
    readyAt: "5 min ago",
    orderItems: [
      { name: "Basmati Rice 5kg", qty: 1, unit: "bag", price: 480 },
      { name: "Ghee 500ml", qty: 1, unit: "jar", price: 320 },
      { name: "Atta 10kg", qty: 1, unit: "bag", price: 380 },
      { name: "Sugar 2kg", qty: 1, unit: "pack", price: 100 },
    ],
  },
  {
    id: "ORD-1005",
    customer: "Nikhil Gupta",
    phone: "9999999999",
    items: 2,
    total: 210,
    priority: "LOW",
    placedAt: "35 min ago",
    status: "COLLECTED",
    pickupCode: "B205",
    acceptedAt: "33 min ago",
    readyAt: "28 min ago",
    collectedAt: "10 min ago",
    orderItems: [
      { name: "Eggs (12 pcs)", qty: 1, unit: "tray", price: 90 },
      { name: "Butter 100g", qty: 2, unit: "pcs", price: 120 },
    ],
  },
];
