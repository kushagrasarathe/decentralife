import { Spinner } from "@material-tailwind/react";
import { FC } from "react";

export const InfiniteLoader: FC = () => {
  return (
    <span className="flex justify-center p-5">
      <Spinner />
    </span>
  );
};
