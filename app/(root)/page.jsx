import { Button } from "@/components/ui/button";
import Bento from "@/components/web_comp/Bento";
import Events from "@/components/web_comp/Events";
import Hero from "@/components/web_comp/Hero";
import Second from "@/components/web_comp/Second";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" min-h-dvh" >
      <Hero />
      <div className="section_container" >
        <Second />
        <Events />
      </div>
      <section className="grey_container !min-h-[300px] rounded-3xl relative my-12" >
        <Image src="/timeline.jpeg" alt="background" fill={true} className=" !z-[-1] rounded-3xl opacity-[0.6] object-cover" quality={100} />
        <h1 className="heading"> Explore the Timeline </h1>
        <p className="tag" > Your Hour-by-Hour Guide to the Festivities – Stay Tuned, Stay Inspired, and Make Every Moment </p>

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
