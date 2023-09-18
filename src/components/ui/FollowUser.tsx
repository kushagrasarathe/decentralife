import React from "react";

import {
  Profile,
  UseFollowArgs,
  useFollow,
  useUnfollow,
} from "@lens-protocol/react-web";
import { Button } from "@material-tailwind/react";

type ProfileFollowProps = {
  profile: Profile;
};

export default function FollowUser({ followee, follower }: UseFollowArgs) {
  const {
    execute: follow,
    error,
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
  

  if (followee.followStatus?.isFollowedByMe) {
    return (
      <Button
        color="white"
        variant="outlined"
        onClick={unfollow}
        disabled={isUnfollowing}
      >
        {isUnfollowing ? "Unfollowing..." : "Following"}
      </Button>
    );
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <Button color="white" onClick={follow} disabled={isFollowing}>
      {isFollowing ? "Following..." : "Follow"}
    </Button>
  );
}
