import ArrowIcon from "@/assets/arrow-right.svg";
import bgImg from "@/assets/cog.png";
import Image from "next/image";
import cylinderImg from "@/assets/cylinder.png";

export const Hero = () => {
  return (
    <section className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_80%)]">
      <div className="container">
        <div className="md:flex items-center">
          <div className="md:w-[478px]">
            <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight">Version 1.0 is here</div>
              <h1 className="text-8xl md:text-9xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#0ac9ef] text-transparent bg-clip-text mt-6">H <sub className="text-6xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#0ac9ef] text-transparent bg-clip-text mt-6">2</sub>GO</h1>
            <p className="text-xl font-se text-black tracking-tight mt-6">City of Ottawa Water Resources Finder</p>
            <div className="flex gap-1 items-center mt-[30px]">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-text gap-1">
                <span>Learn more</span>
                <ArrowIcon className="h-5 w-5" />
                </button>
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[848px] md:flex-1 relative">
            <Image src={bgImg} alt="bg" className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6" />
            <Image src={cylinderImg} alt="cylinder" width={220} height={220} className="hidden md:block top-0 right-0" />
          </div>
        </div>
      </div>
    </section>
    )
};