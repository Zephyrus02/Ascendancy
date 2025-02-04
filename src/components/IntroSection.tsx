import { Separator } from "./Separator";
export function IntroSection() {
  return (
    <div className="bg-[#111] py-24">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          UNLEASH YOUR <span className="text-[#FF4655]">VALOR</span> WITH ASCENDANCY
        </h2>
        <Separator />

        <p className="text-white/80 text-lg leading-relaxed">
          Join the ultimate Valorant tournament where elite teams battle for glory and a 
          prize pool of $10,000. Featuring 5v5 competitive matches, professional casting, 
          and live streaming. Whether you're a seasoned pro or rising star, showcase your 
          tactical prowess and precise gunplay on the biggest stage. Registration open for 
          teams ranked Diamond and above. Don't miss your shot at becoming a champion!
        </p>
      </div>
    </div>
  );
}