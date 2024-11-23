import { Header } from "~/components/header";

export default function NoticePage() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Notice</h1>
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
          role="alert"
        >
          <p className="font-bold">Important Notice</p>
          <p>
            Due to high demand, some products may have slightly longer delivery
            times. We appreciate your patience and understanding.
          </p>
        </div>
      </main>
    </div>
  );
}
