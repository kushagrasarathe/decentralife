import image from "@assets/pfp.png";
import sample from "@assets/sample.webp";
import Image from "next/image";
export default function Post() {
  return (
    <div className=" flex items-start justify-between hover:cursor-pointer hover:bg-purplePrimary hover:bg-opacity-50 relative w-7/12 border mx-auto px-5 pb-8 pt-6 rounded-xl border-borderPrimary">
      <div className="  w-10 h-10">
        <Image src={image} alt="pfp" className=" rounded-full" />
      </div>
      <div className="gap-y-4 flex items-start mx-auto w-full pl-4 pr-1 justify-start flex-col">
        <div>
          <h2 className="tracking-wide font-semibold text-lg">Lorem Name</h2>
          <span className=" tracking-wide font-bold text-transparent text-base bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            @username
          </span>
        </div>
        <div className=" w-full border border-borderPrimary rounded-2xl ">
          <Image
            src={sample}
            alt="pfp"
            className=" max-h-[400px] w-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
