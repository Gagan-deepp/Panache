import Image from "next/image";

export default function Home() {
  return (
    <div className="section_container min-h-dvh" >
      <section className="grey_container rounded-3xl relative mt-8" >
        <Image src="/1.png" alt="background" fill={true} className=" !z-[-1] rounded-3xl opacity-[0.6] object-cover" quality={100} />
        <h1 className="heading"> Panache <br /> 2025 </h1>
      </section>
    </div>
  );
}
