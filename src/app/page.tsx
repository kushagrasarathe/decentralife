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
import CreatePost from "@/components/publications/CreatePost";
import { useAuth } from "@/context/LensContext";

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

  // @ts-ignore
  const { activeProfileData } = useAuth();

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
  const loadMore = async () => {};

  return (
    <div>
      <div className=" text-center flex items-center justify-center">
        <CreatePost publisher={activeProfileData} />
      </div>
      <div className="  md:w-7/12 mx-auto mt-8  border border-b-0 rounded-b-none border-borderPrimary rounded-2xl">
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
