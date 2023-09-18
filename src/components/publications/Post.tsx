import sample from "@assets/sample.webp";
import { Button } from "@material-tailwind/react";
import Image from "next/image";

interface PostProps {
  pfp: string;
  name: string;
  username: string;
  postMessage: string;
  postImage?: string;
}

export default function Post({
  pfp,
  name,
  username,
  postMessage,
  postImage,
}: PostProps) {
  return (
    // rounded-xl
    <div className=" flex items-start justify-between hover:cursor-pointer hover:bg-purplePrimary hover:bg-opacity-50 relative w- 7/12 border-b mx-auto px-5 pb-8 pt-6  border-borderPrimary">
      <div className="  w-10 h-10">
        <Image
          src={pfp}
          width={100}
          height={100}
          alt="pfp"
          className=" rounded-full h-full object-cover object-center"
        />
      </div>
      <div className="gap-y-4 flex items-start mx-auto w-full pl-4 pr-1 justify-start flex-col">
        <div className=" flex items-center justify-between w-full">
          <div>
            <h2 className="tracking-wide font-semibold text-lg">{name}</h2>
            <span className=" tracking-wide font-bold text-transparent text-base bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              @{username}
            </span>
          </div>
          <div>
            <Button
              // variant="outlined"
              color="white"
            >
              Follow
            </Button>
          </div>
        </div>
        <div className=" font-[500] text-start">{postMessage}</div>
        {postImage && (
          <div className=" w-full border border-borderPrimary rounded-2xl ">
            <Image
              src={sample}
              alt="pfp"
              className=" max-h-[400px] w-full object-cover rounded-2xl"
            />
          </div>
        )}
      </div>
    </div>
  );
}
