import { LoginButton } from "./LoginButton";
import { WhenLoggedOut } from "./WhenLoggedOut";

type UnauthenticatedFallbackProps = {
  message?: string;
};

export function UnauthenticatedFallback({
  message,
}: UnauthenticatedFallbackProps) {
  return (
    <WhenLoggedOut>
      <div className=" flex items-center justify-center flex-col gap-3">
        <p>{message ?? "Log in to view this example."}</p>
        <LoginButton />
      </div>
    </WhenLoggedOut>
  );
}
