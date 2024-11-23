import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Wireless Earbuds",
      description: "High-quality wireless earbuds with noise cancellation.",
      price: 49.99,
      image: "https://picsum.photos/200?random=1",
    },
    {
      name: "Smartphone Stand",
      description: "Adjustable smartphone stand for hands-free usage.",
      price: 15.99,
      image: "https://picsum.photos/200?random=2",
    },
    {
      name: "Bluetooth Speaker",
      description: "Portable Bluetooth speaker with excellent sound quality.",
      price: 29.99,
      image: "https://picsum.photos/200?random=3",
    },
    {
      name: "Gaming Mouse",
      description: "Ergonomic gaming mouse with customizable buttons.",
      price: 39.99,
      image: "https://picsum.photos/200?random=4",
    },
    {
      name: "USB-C Hub",
      description: "Multi-port USB-C hub with HDMI and USB 3.0 support.",
      price: 24.99,
      image: "https://picsum.photos/200?random=5",
    },
    {
      name: "Wireless Keyboard",
      description: "Compact wireless keyboard with long battery life.",
      price: 35.99,
      image: "https://picsum.photos/200?random=6",
    },
    {
      name: "Laptop Stand",
      description: "Adjustable laptop stand for better ergonomics.",
      price: 19.99,
      image: "https://picsum.photos/200?random=7",
    },
    {
      name: "Fitness Tracker",
      description: "Track your fitness goals with this wearable tracker.",
      price: 59.99,
      image: "https://picsum.photos/200?random=8",
    },
    {
      name: "Portable Charger",
      description: "High-capacity portable charger for on-the-go charging.",
      price: 29.99,
      image: "https://picsum.photos/200?random=9",
    },
    {
      name: "Wireless Mouse",
      description: "Slim wireless mouse with a comfortable grip.",
      price: 12.99,
      image: "https://picsum.photos/200?random=10",
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Seeded products successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
