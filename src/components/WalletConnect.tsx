import { useWalletLogin } from "@lens-protocol/react-web";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useWalletLogout } from "@lens-protocol/react-web";
import { Button } from "@material-tailwind/react";

interface Props {
  title?: string;
}

function LoginButton({ title }: Props) {
  const {
    execute: login,
    error: loginError,
    isPending: isLoginPending,
  } = useWalletLogin();

  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });

  const onLoginClick = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { connector } = await connectAsync();

    if (connector instanceof InjectedConnector) {
      const walletClient = await connector.getWalletClient();
      await login({
        address: walletClient.account.address,
      });
    }
  };

  return (
    <div>
      {loginError && <p>{loginError.message}</p>}

      <Button
        disabled={isLoginPending}
        onClick={onLoginClick}
        size="lg"
        color="white"
        className="flex items-center gap-3"
      >
        {title ? title : "Log in"}
      </Button>
    </div>
  );
}

function LogoutButton() {
  const { execute: logout, isPending } = useWalletLogout();

  return (
    <Button disabled={isPending} onClick={logout} color="red">
      Log out
    </Button>
  );
}

export { LoginButton, LogoutButton };
