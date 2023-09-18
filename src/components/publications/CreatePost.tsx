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

  async function test() {
    const subsidizedAttempt = await post({
      content: postMessage,
      contentFocus: ContentFocus.TEXT_ONLY,
      locale: "en",
    });

    console.log(subsidizedAttempt);
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
        onClick={test}
        variant="gradient"
        color="green"
        className=" rounded-md"
      >
        Create Post
      </Button> */}

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody divider>
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
          ></textarea>

          <Button
            onClick={test}
            // onClick={createPostRequest}
            // onClick={() => submit(postMessage)}
            color="blue"
            variant="gradient"
            type="button"
            disabled={isPending}
          >
            Post
          </Button>

          {!isPosting && postError && <pre>{postError.message}</pre>}
          {!fallbackInProgress && fallbackError && (
            <pre>{fallbackError.message}</pre>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
