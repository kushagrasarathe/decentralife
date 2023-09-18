import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useAuth } from "@/context/LensContext";
import { useRouter } from "next/navigation";

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  // @ts-ignore
  const { loginUser, wallet, logoutUser, activeProfileData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (activeProfileData === null) {
      router.push("/create");
      // setOpen(true);
    }
  }, []);

  const handleOpen = () => setOpen(!open);

  return (
    <div>
      {wallet ? (
        <Button
          onClick={logoutUser}
          variant="gradient"
          color="red"
          className=" rounded-md"
        >
          Logout
        </Button>
      ) : (
        // <Button
        //   onClick={handleOpen}
        //   variant="gradient"
        //   color="white"
        //   className=" rounded-md"
        // >
        //   Login
        // </Button>
        <Button
          onClick={loginUser}
          variant="gradient"
          color="white"
          className=" rounded-md"
        >
          Login
        </Button>
      )}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody divider>
          {wallet ? (
            <div>
              <p>You are logged in {wallet.address}</p>
              <Button
                onClick={logoutUser}
                variant="gradient"
                color="red"
                className=" rounded-md"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              onClick={loginUser}
              variant="gradient"
              color="white"
              className=" rounded-md"
            >
              Login
            </Button>
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
