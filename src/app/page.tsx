// app/page.tsx
"use client";
import { LoginButton, LogoutButton } from "@/components/WalletConnect";
import { useActiveWallet, useExploreProfiles } from "@lens-protocol/react-web";
import Image from "next/image";
import Link from "next/link";
import MyProfile from "./myprofile/page";
import Post from "@/components/publications/Post";

export default function Home() {
  // const { data: wallet, loading } = useActiveWallet();
  // const { data: profiles } = useExploreProfiles({
  //   limit: 25,
  // });

  // if (loading) {
  //   return (
  //     <div className=" flex gap-y-4 flex-col items-center justify-center min-h-screen">
  //       Loading...
  //     </div>
  //   );
  // }

  //   if (wallet) {
  //     return (
  //       <div className=" flex gap-y-4 flex-col items-center justify-start min-h-screen">
  //         <h1 className="text-5xl">My Lens App</h1>
  //         <p>Wallet connected: {wallet.address}</p>
  //         <LogoutButton />
  // {/*
  //         {profiles?.map((profile, index) => (
  //           <Link href={`/profile/${profile.handle}`} key={index}>
  //             <div className="my-14">
  //               {profile.picture && profile.picture.__typename === "MediaSet" ? (
  //                 <div>{profile.picture.original.url}</div>
  //                 // <Image
  //                 //   src={profile.picture.original.url}
  //                 //   width="120"
  //                 //   height="120"
  //                 //   alt={profile.handle}
  //                 // />
  //               ) : (
  //                 <div className="w-14 h-14 bg-slate-500	" />
  //               )}
  //               <h3 className="text-3xl my-4">{profile.handle}</h3>
  //               <p className="text-xl">{profile.bio}</p>
  //             </div>
  //           </Link>
  //         ))} */}
  //       </div>
  //     );
  //   }

  // return (
  //   <>
  //     <p>You are not logged-in, please connect your wallet</p>
  //     <LoginButton />
  //   </>
  // );

  return (
    <div>
      <Post />
    </div>
  );
}
