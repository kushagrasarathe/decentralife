import React from "react";

import {
  Profile,
  ProfileOwnedByMe,
  UseFollowArgs,
  useFollow,
  useUnfollow,
} from "@lens-protocol/react-web";
import { Button } from "@material-tailwind/react";

type FollowButtonProps = {
  follower: ProfileOwnedByMe;
  followee: Profile;
};

export default function FollowUser({ followee, follower }: FollowButtonProps) {
  const {
    execute: follow,
    error: followError,
    isPending: isFollowing,
  } = useFollow({
    followee,
    follower,
  });
  const {
    execute: unfollow,
    error: unfollowError,
    isPending: isUnfollowing,
  } = useUnfollow({
    followee,
    follower,
  });

  if (followee.followStatus === null) {
    return null;
  }

  if (followError) {
    return <p>{followError.message}</p>;
  }

  if (followee.isFollowedByMe) {
    return (
      <>
        <button onClick={unfollow} disabled={isUnfollowing}>
          Unfollow
        </button>
        {unfollowError && <p>{unfollowError.message}</p>}
      </>
    );
  }

  return (
    <>
      <Button color="white" onClick={follow} disabled={isFollowing}>
        {isFollowing ? "Following..." : "Follow"}
      </Button>
    </>
  );
}
