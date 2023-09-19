"use client";

import { useAuth } from "@/context/LensContext";
import {
  PublicationSortCriteria,
  PublicationTypes,
  useActiveProfile,
  useExplorePublications,
  useProfilesOwnedByMe,
} from "@lens-protocol/react-web";
import Link from "next/link";
import { useExploreProfiles } from "@lens-protocol/react-web";
import UserProfile from "@/components/ui/UserProfileCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { InfiniteLoader } from "@/components/ui/InfiniteLoader";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  const { data, error, loading } = useActiveProfile();
  const { data: userProfiles, loading: userProfilesLoading } =
    useExploreProfiles();
  // @ts-ignore
  const { activeProfileData } = useAuth();

  const loadMore = async () => {};

  if (!activeProfileData) {
    return <Navbar />;
  }

  return (
    <div>
      <div className=" md:mb-10  md:w-7/12 mx-auto mt-8  border border-b-0 rounded-b-none border-borderPrimary rounded-2xl">
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
          {userProfiles?.map(
            (profile, id) =>
              profile && (
                <div key={id}>
                  <UserProfile
                    // @ts-ignore
                    id={profile.id}
                    pfp={profile.coverPicture}
                    name={profile.name}
                    handle={profile.handle}
                    bio={profile.bio}
                  />
                </div>
              )
          )}
        </InfiniteScroll>
      </div>
      {/* {publications?.map((publication, id) => (
        <div key={id}>{publication.id}</div>
      ))} */}
      {/* {activeProfileData.handle} */}
    </div>
  );
}
