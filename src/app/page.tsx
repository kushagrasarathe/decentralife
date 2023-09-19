"use client";

// import { useAuth } from "@/context/LensContext";
// import {
//   PublicationSortCriteria,
//   PublicationTypes,
//   useActiveProfile,
//   useExplorePublications,
//   useProfilesOwnedByMe,
// } from "@lens-protocol/react-web";
// import Link from "next/link";
// import { useExploreProfiles } from "@lens-protocol/react-web";
// import UserProfile from "@/components/ui/UserProfileCard";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { InfiniteLoader } from "@/components/ui/InfiniteLoader";
// import Navbar from "@/components/ui/Navbar";

// export default function Home() {
//   const { data, error, loading } = useActiveProfile();
//   const { data: userProfiles, loading: userProfilesLoading } =
//     useExploreProfiles();
//   // @ts-ignore
//   const { activeProfileData } = useAuth();

//   const loadMore = async () => {};

//   if (!activeProfileData) {
//     return ;
//   }

//   return (
//     <div>
//       <div className=" md:mb-10  md:w-7/12 mx-auto mt-8  border border-b-0 rounded-b-none border-borderPrimary rounded-2xl">
//         <InfiniteScroll
//           dataLength={[]?.length ?? 0}
//           scrollThreshold={0.99}
//           hasMore={true}
//           next={loadMore}
//           style={{
//             height: "100%",
//             // overflow: "auto",
//             overflow: "visible",
//             // "-webkit-overflow-scrolling": "none",
//           }}
//           loader={<InfiniteLoader />}
//         >
//           {userProfiles?.map(
//             (profile, id) =>
//               profile && (
//                 <div key={id}>
//                   <UserProfile
//                     // @ts-ignore
//                     id={profile.id}
//                     pfp={profile.coverPicture}
//                     name={profile.name}
//                     handle={profile.handle}
//                     bio={profile.bio}
//                   />
//                 </div>
//               )
//           )}
//         </InfiniteScroll>
//       </div>
//       {/* {publications?.map((publication, id) => (
//         <div key={id}>{publication.id}</div>
//       ))} */}
//       {/* {activeProfileData.handle} */}
//     </div>
//   );
// }

import {
  Profile,
  ProfileOwnedByMe,
  useExploreProfiles,
  useUnfollow,
} from "@lens-protocol/react-web";
import { useFollowWithSelfFundedFallback } from "@/hooks/useFollowWithSelfFundedFallback";
import { WhenLoggedInWithProfile } from "@/components/auth/WhenLoggedInWithProfile";
import { UnauthenticatedFallback } from "@/components/auth/UnauthenticatedFallback";
import UserProfile from "@/components/ui/UserProfileCard";
import { Button } from "@material-tailwind/react";

type FollowButtonProps = {
  follower: ProfileOwnedByMe;
  followee: Profile;
};

function FollowButton({ followee, follower }: FollowButtonProps) {
  const {
    execute: follow,
    error: followError,
    isPending: isFollowPending,
  } = useFollowWithSelfFundedFallback({
    followee,
    follower,
  });

  const {
    execute: unfollow,
    error: unfollowError,
    isPending: isUnfollowPending,
  } = useUnfollow({ follower, followee });

  if (followee.followStatus === null) {
    return null;
  }

  if (followee.followStatus.isFollowedByMe) {
    return (
      <>
        <Button
          color="white"
          variant="outlined"
          onClick={unfollow}
          disabled={isUnfollowPending}
        >
          Unfollow
        </Button>
        {unfollowError && <p>{unfollowError.message}</p>}
      </>
    );
  }

  return (
    <>
      <Button
        color="white"
        variant="gradient"
        onClick={follow}
        disabled={isFollowPending}
      >
        Follow
      </Button>
      {followError && <p>{followError.message}</p>}
    </>
  );
}

type UseFollowInnerProps = {
  activeProfile: ProfileOwnedByMe;
};

function UseFollowInner({ activeProfile }: UseFollowInnerProps) {
  const { data, error, loading } = useExploreProfiles({ limit: 50 });

  if (loading) return <div>Loading...</div>;

  if (error)
    return (
      <section>
        <h3>Something went wrong</h3>
        <pre>{error?.message ?? "Unknown error"}</pre>
      </section>
    );

  return (
    <div className=" md:w-7/12 mx-auto mt-12 ">
      {data.map((profile) => (
        <section
          key={profile.handle}
          className="border-b border-borderPrimary hover:cursor-pointer hover:bg-purplePrimary hover:bg-opacity-50  flex items-start justify-between w-full px-4 py-6"
        >
          <UserProfile
            id={profile.id}
            name={profile.name}
            bio={profile.bio}
            handle={profile.handle}
            pfp={profile.picture}
          />
          {/* <article>
            <ProfilePicture picture={profile.picture} /> 

            <p>Handle: {profile.handle}</p>
            {profile?.name && <p>Name: {profile.name}</p>}
            {profile?.bio && <p>Bio: {profile.bio}</p>}
            <ul>
              {Object.entries(profile.attributes).map(([key, value]) => (
                <li key={key}>
                  <b>{key}:</b>&nbsp;
                  {value.toString() ?? null}
                </li>
              ))}
            </ul>
            {profile.invitedBy && <p>Invited by: {profile.invitedBy.handle}</p>}
          </article> */}

          <FollowButton followee={profile} follower={activeProfile} />
        </section>
      ))}
    </div>
  );
}

export default function UseFollowAndUnfollow() {
  return (
    <div>
      <WhenLoggedInWithProfile>
        {({ profile }) => <UseFollowInner activeProfile={profile} />}
      </WhenLoggedInWithProfile>
      <UnauthenticatedFallback message="Log in to follow or unfollow profiles" />
    </div>
  );
}
