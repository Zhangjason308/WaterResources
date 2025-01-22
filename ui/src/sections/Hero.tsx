import ArrowIcon from "@/assets/arrow-right.svg";
import bgImg from "@/assets/H2G0_logo.png";
import Image from "next/image";
import cylinderImg from "@/assets/cylinder.png";

export const Hero = () => {
  return (
    <section className="relative pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_80%)]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/hero_background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="relative z-10 container">
        <div className="md:flex items-center">
          <div className="md:w-[478px]">
            <div className="tag">Version 1.0 is here</div>
            <h1 className="text-8xl md:text-9xl title mt-6">
              H
              <sub className="text-6xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#0ac9ef] text-transparent bg-clip-text mt-6">
                2
              </sub>
              GO
            </h1>
            <p className="text-xl font-se text-black tracking-tight mt-6">
              City of Ottawa Water Resources Finder
            </p>
            <div className="flex gap-1 items-center mt-[30px]">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-text gap-1">
                <span>Learn more</span>
                <ArrowIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[748px] md:flex-1 relative">
            <Image
              src={bgImg}
              alt="bg"
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
