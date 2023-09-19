import sample from "@assets/sample.webp";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import FollowUser from "./FollowUser";
import { useAuth } from "@/context/LensContext";
import { Profile, ProfileId } from "@lens-protocol/react-web";
import UseFollowAndUnfollow from "@/app/page";

interface PostProps {
  id: ProfileId;
  pfp?: string | any;
  name?: string | null;
  handle?: string;
  bio?: string | null;
}

export default function UserProfile({ id, pfp, name, handle, bio }: PostProps) {
  // @ts-ignore
  const { activeProfileData } = useAuth();
  // console.log(pfp);

  return (
    // rounded-xl
    <div className=" min-h-[150px] flex items-start justify-between relative w- 7/12 mx-auto px-5 pb-8 pt- w-full   ">
      <div className="  w-10 h-10 flex items-center justify-center">
        {pfp ? (
          <img
            src={pfp && pfp.original.url}
            className=" rounded-full  w-full h-full"
          />
        ) : (
          <div className=" rounded-full bg-gradient-to-b from-indigo-400 to-purple-400  w-full h-full "></div>
        )}
        {/* <Image
          src={pfp ? pfp : sample}
          width={100}
          height={100}
          alt="pfp"
          className=" rounded-full h-full object-cover object-center"
        /> */}
      </div>
      <div className="gap-y-4 flex items-start mx-auto w-full pl-4 pr-1 justify-start flex-col">
        <div className=" flex items-center justify-between w-full">
          <div>
            <h2 className="tracking-wide font-semibold text-lg">{name}</h2>
            <span className=" tracking-wide font-bold text-transparent text-base bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              @{handle}
            </span>
          </div>
        </div>
        <div className=" font-[500] text-start">{bio}</div>
      </div>
    </div>
  );
}
