import Hero from "@/components/Hero";
import InvitationMessage from "@/components/InvitationMessage";
import SaveTheDate from "@/components/SaveTheDate";
import Location from "@/components/Location";
import Program from "@/components/Program";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full">
      <Hero />
      <InvitationMessage />
      <SaveTheDate />
      <Location />
      <Program />
      <Footer />
    </main>
  );
}
