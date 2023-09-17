// app/page.tsx
"use client";
import { LoginButton, LogoutButton } from "@/components/WalletConnect";
import {
  PublicationTypes,
  useActiveWallet,
  useExploreProfiles,
} from "@lens-protocol/react-web";
import Image from "next/image";
import Link from "next/link";
import MyProfile from "./myprofile/page";
import Post from "@/components/publications/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { FC, useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { usePublications } from "@lens-protocol/react-web";
import { getPublications } from "@/apollo";
import image from "@assets/pfp.png";

export default function Home() {
  const [posts, setPosts] = useState<any>([]);
  const {
    data: publication,
    loading,
    hasMore,
    next,
  } = usePublications({
    // @ts-ignore
    profileId: "0x77-0x0149",
    limit: 10,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      // 0x9185
      const publications = await getPublications("0x9185");
      if (publications !== undefined) {
        setPosts(publications);
      }
    };
    fetchPosts();
  }, []);
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
  const loadMore = async () => {};

  return (
    <div>
      {posts.length === 0 ? (
        <div className=" text-center min-h-[90vh] flex items-center justify-center">
          No posts found
        </div>
      ) : (
        <InfiniteScroll
          dataLength={[]?.length ?? 0}
          scrollThreshold={0.99}
          hasMore={true}
          next={loadMore}
          style={{
            height: "100%",
            // overflow: "auto",
            overflow: "visible",
            // "-webkit-overflow-scrolling": "none",
          }}
          loader={<InfiniteLoader />}
        >
          {posts &&
            posts.map((post: any, id: number) => (
              <div key={id}>
                <Post
                  pfp={
                    post.profile.coverPicture !== null
                      ? post.profile.coverPicture.original.url
                      : image
                  }
                  name={post.profile.name}
                  username={post.profile.handle}
                  postMessage={
                    post.metadata.description !== null
                      ? post.metadata.description
                      : post.metadata.content
                  }
                  // postImage={}
                />
              </div>
            ))}
        </InfiniteScroll>
      )}
    </div>
  );
}

const InfiniteLoader: FC = () => {
  return (
    <span className="flex justify-center p-5">
      <Spinner />
    </span>
  );
};
