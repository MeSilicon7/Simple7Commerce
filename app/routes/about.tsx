import { Header } from "~/components/header";

export default function AboutPage() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <p className="text-gray-700">
          Welcome to SimpleShop, your one-stop destination for all your shopping needs. 
          We pride ourselves on offering a wide range of high-quality products at competitive prices. 
          Our mission is to provide a seamless shopping experience with the convenience of cash on delivery.
        </p>
      </main>
    </div>
  );
}
