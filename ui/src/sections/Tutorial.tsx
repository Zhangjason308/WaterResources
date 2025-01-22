import teamPhoto from "@/assets/team-photo.png";
import Image from "next/image";

export const Tutorial = () => {
  return (
    <section id="tutorial" className="bg-gradient-to-b from-[#FFF] to-[#D2DCFF] py-24">
      <div className="container">
        <div className="mx-auto">
          <div className="flex justify-center">
            <h1 className="text-center text-5xl title">Tutorial</h1>
          </div>
          <div className="md:flex-inline">
          <p className="text-lg leading-[30px] traking-tight mt-5 md:min-w-[400px] md:mr-10">
            Welcome to the City of Ottawa Water Resources Web App! We are a team
            of 4th-year Software Engineering students from Carleton
            University—Jason Zhang, Caleb Lui-Yee, Marwan Zeid, Triton Crowley,
            and Eric Wang. This initiative is part of our capstone project,
            where we aim to combine our skills and passion for technology to
            create meaningful solutions for our community.
          </p>
          <Image src={teamPhoto} alt="Team Photo" className="mt-10" />
          </div>
          
        </div>
      </div>
    </section>
  );
};
