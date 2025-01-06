import ArrowIcon from "@/assets/arrow-right.svg";
import bgImg from "@/assets/cog.png";
import Image from "next/image";

export const Hero = () => {
  return (
    <section>
      <div className="container my-10">
        <div>
          <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">Version 1.0 is here</div>
          <div className="text-8xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#0ac9ef] text-transparent bg-clip-text mt-6">
            <h1>H <sub className="text-6xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#0ac9ef] text-transparent bg-clip-text mt-6">2</sub>GO</h1>
          </div>
          <p className="text-xl font-se text-black tracking-tight mt-6">City of Ottawa Water Resouces Finder</p>
          <div className="flex gap-1 items-center mt-[30px]">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-text gap-1">
              <span>Learn more</span>
              <ArrowIcon className="h-5 w-5" />
              </button>
          </div>
        </div>
        <div className="mt-10">
          <Image src={bgImg} alt="bg" layout="responsive" width={800} height={500} />
        </div>
      </div>
    </section>
    )
};
