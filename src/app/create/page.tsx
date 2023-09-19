"use client";
import {
  isValidHandle,
  useActiveWallet,
  useCreateProfile,
} from "@lens-protocol/react-web";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginButton } from "@/components/WalletConnect";
import { Button, Input } from "@material-tailwind/react";

// export default function CreateProfileForm() {
//   const [handle, setHandle] = useState<string | null>(null);

//   const { execute: create, error, isPending } = useCreateProfile();

//   const onSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!handle) return;
//     await create({ handle });
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <input
//         className=" text-black px-3 py-2 rounded-md"
//         minLength={5}
//         maxLength={31}
//         required
//         type="text"
//         disabled={isPending}
//         onChange={(e) => {
//           if (isValidHandle(e.target.value)) {
//             setHandle(e.target.value);
//           } else {
//             setHandle(null);
//           }
//         }}
//       />

//       <button type="submit">Create</button>
//     </form>
//   );
// }

export default function CreateProfileForm() {
  const { execute: create, error, isPending } = useCreateProfile();
  const { data: wallet, loading } = useActiveWallet();
  const router = useRouter();
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    // @ts-ignore
    const handle = (formData.get("handle") as string) ?? never();

    const result = await create({ handle });

    if (result.isSuccess()) {
      // toast.success(`Profile ID: ${result.value.id}`);
      console.log(`Profile ID: ${result.value.id}`);
      form.reset();
      router.push("/myprofile");
    }
  };

  // if (!wallet) {
  //   return (
  //     <div className=" flex flex-col items-center justify-center min-h-screen">
  //       <div>Please connect your wallet first </div>
  //       <div>
  //         <LoginButton title="Connect Wallet" />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className=" flex gap-y-6 flex-col items-center justify-center border bg-borderPrimary bg-opacity-20 backdrop-blur-xl rounded-2xl border-borderPrimary w-7/12 mx-auto h-[500px] mt-12 ">
      <div className=" flex items-center gap-1 text-3xl font-bold">
        <div>Welcome to</div>
        <h1 className="  cursor-pointer font-bold sm:text-3xl text-gray-300 text-2xl leading-none text-center ">
          {/* block */}
          decentra
          <span
            className="!bg-clip-text text-transparent "
            style={{
              background:
                "linear-gradient(73.59deg, #C339AC 42.64%, #CD4CB5 54%, #E173C7 77.46%)",
            }}
          >
            {/* Book */}
            Life
          </span>
        </h1>
      </div>
      <div className="text-lg flex items-center justify-normal gap-1">
        Choose a handle below and create your{" "}
        <h1 className="  cursor-pointer font-bold  text-gray-300 text-lg leading-none text-center ">
          {/* block */}
          decentra
          <span
            className="!bg-clip-text text-transparent "
            style={{
              background:
                "linear-gradient(73.59deg, #C339AC 42.64%, #CD4CB5 54%, #E173C7 77.46%)",
            }}
          >
            {/* Book */}
            Life
          </span>
        </h1>{" "}
        profile
      </div>
      <form onSubmit={onSubmit} className="">
        <fieldset>
          <label className=" text-lg font-semibold">
            Enter a profile handle:
            <br />
            <input
              // color="white"
              name="handle"
              className=" mt-2 px-3 py-2 rounded-md bg-transparent border border-borderPrimary"
              placeholder="handle"
              minLength={5}
              maxLength={31}
              required
              type="text"
              disabled={isPending}
              // label="Username"
            />
          </label>

          <Button
            className=" mt-4"
            fullWidth
            color="green"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create profile"}
          </Button>
        </fieldset>

        {error && <p>{error.message}</p>}
      </form>
      {/* <OwnedProfiles /> */}
    </div>
  );
}
