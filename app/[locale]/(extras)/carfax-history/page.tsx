import { Metadata } from "next";
import CarfaxClient from "./CarfaxClient";

export const metadata: Metadata = {
  title: "Carfax History",
  description: "Check your car’s history by VIN",
};

export default function Page({ params }: { params: { locale: string } }) {
  // ✅ fallback array of feature cards
  const featureCards: { title: string; desc: string }[] = [
    {
      title: "🚗 Accident Records",
      desc: "See if the vehicle has been in any reported accidents or collisions.",
    },
    {
      title: "📜 Title Check",
      desc: "Verify ownership status and ensure it’s not a salvage or rebuilt vehicle.",
    },
    {
      title: "🕑 Odometer Reading",
      desc: "Check for mileage inconsistencies that could indicate fraud.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* VIN search UI */}
      <CarfaxClient
        placeholder="Enter VIN number"
        search="Search"
        clear="Clear"
        charCount="Characters"
        errorLength="VIN must be 17 characters (you entered {{n}})"
        errorFetch="Error fetching VIN data"
        noResult="No vehicle found with that VIN"
        noBalance="No balance available"
        proceed="Proceed to Payment"
        vehicleFound="Vehicle found"
        vehicleFoundBg="Vehicle found (BG)"
        payToAccess="Pay to access report"
        payToAccessBg="Pay to access report (BG)"
        redirecting="Redirecting to payment..."
        loading="Loading..."
        errorPayment="Error processing payment"
        locale={params.locale}
      />

      {/* Why Check section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Why Check a Vehicle’s History?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureCards.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-[#2b4a87]">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
