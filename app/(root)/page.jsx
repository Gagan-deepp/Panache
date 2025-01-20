import { Button } from "@/components/ui/button";
import Events from "@/components/web_comp/Events";
import Second from "@/components/web_comp/Second";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="section_container min-h-dvh" >
      <section className="grey_container rounded-3xl relative mt-12" >
        <Image src="/1.png" alt="background" fill={true} className=" !z-[-1] rounded-3xl opacity-[0.6] object-cover" quality={100} />
        <h1 className="heading"> Panache <br /> 2025 </h1>
      </section>

      <Second />
      <Events />

      <section className="grey_container !min-h-[300px] rounded-3xl relative mt-12" >
        <Image src="/2.png" alt="background" fill={true} className=" !z-[-1] rounded-3xl opacity-[0.6] object-cover" quality={100} />
        <h1 className="heading"> Explore the Timeline </h1>
        <p className="" > Your Hour-by-Hour Guide to the Festivities – Stay Tuned, Stay Inspired, and Make Every Moment </p>

        <div className="w-full text-center" >
          <Button className="bg-card_clr text-cream hover:scale-[0.9] hover:bg-card_clr_light transition-all duration-200 ease-in-out " >
            <Link href="/schedule" className="" >
              Schedule
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
