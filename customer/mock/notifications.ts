export const notifications = [
  {
    id: "N001",
    title: "Order Accepted",
    message: "Your order ORD-1001 has been accepted and is being packed.",
    type: "ORDER",
    read: false,
    createdAt: "2 min ago",
  },
  {
    id: "N002",
    title: "Ready for Pickup",
    message: "Your order ORD-1004 is ready. Show code A104 at the counter.",
    type: "PICKUP",
    read: false,
    createdAt: "5 min ago",
  },
  {
    id: "N003",
    title: "Order Collected",
    message: "Your order ORD-1005 has been successfully collected.",
    type: "ORDER",
    read: true,
    createdAt: "15 min ago",
  },
];
