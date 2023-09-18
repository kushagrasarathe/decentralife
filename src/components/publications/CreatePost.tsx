import React from "react";
import {
  ContentFocus,
  ProfileOwnedByMe,
  supportsSelfFundedFallback,
  useCreatePost,
  useSelfFundedFallback,
} from "@lens-protocol/react-web";
import { upload } from "@/utils";
import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useAuth } from "@/context/LensContext";
import { useRouter } from "next/navigation";

export default function CreatePost({
  publisher,
}: {
  publisher: ProfileOwnedByMe;
}) {
  const [open, setOpen] = React.useState(false);
  const [postMessage, setPostMessage] = React.useState<string>("");
  const {
    execute: post,
    error: postError,
    isPending: isPosting,
  } = useCreatePost({ publisher, upload: upload });

  // @ts-ignore
  const { loginUser, wallet, logoutUser, activeProfileData } = useAuth();

  const {
    execute: fallback,
    error: fallbackError,
    isPending: fallbackInProgress,
  } = useSelfFundedFallback();
  const router = useRouter();

  async function createNewPost() {
    const subsidizedAttempt = await post({
      content: postMessage,
      contentFocus: ContentFocus.TEXT_ONLY,
      locale: "en",
    });

    if (subsidizedAttempt.isSuccess()) {
      setOpen(false);
      toast.success("Post created");
      router.refresh();
    }
  }

  const isPending = isPosting || fallbackInProgress;
  const handleOpen = () => setOpen(!open);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="gradient"
        color="green"
        className=" rounded-md"
      >
        Create Post
      </Button>
      {/* <Button
        onClick={createNewPost}
        variant="gradient"
        color="green"
        className=" rounded-md"
      >
        Create Post
      </Button> */}

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Create a post</DialogHeader>
        <DialogBody divider className=" m-0 p-0">
          <textarea
            value={postMessage}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setPostMessage(e.target.value);
            }}
            name="content"
            minLength={1}
            required
            rows={3}
            placeholder="What's happening?"
            style={{ resize: "none" }}
            disabled={isPending}
            className=" w-full borde p-4 rounded-xl outline-none ring-0 font-semibold text-gray-900"
          ></textarea>

          {!isPosting && postError && <pre>{postError.message}</pre>}
          {!fallbackInProgress && fallbackError && (
            <pre>{fallbackError.message}</pre>
          )}
        </DialogBody>
        <DialogFooter className=" mt-0">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button onClick={createNewPost} variant="gradient" color="green">
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
