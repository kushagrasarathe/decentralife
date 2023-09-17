"use client";

import {
  useActiveProfile,
  useProfilesOwnedByMe,
} from "@lens-protocol/react-web";
import Link from "next/link";

export default function MyProfile() {
  const { data, error, loading } = useActiveProfile();

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (data === null)
    return (
      <div>
        <div>
          No active profile found please{" "}
          <Link href={"/create"} className=" underline">
            create account
          </Link>
        </div>
      </div>
    );

  return (
    <div>
      <p>Active profile: {data.handle}</p>
      <p>Active profile: {data.id}</p>
    </div>
  );
}
