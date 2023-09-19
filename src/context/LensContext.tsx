import {
  useActiveProfile,
  useActiveWallet,
  useFeed,
  useWalletLogin,
  useWalletLogout,
} from "@lens-protocol/react-web";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const LensContext = createContext({});

export const useAuth = () => useContext(LensContext);

export function LensContextProvider({ children }) {
  const [userWalletAddress, setUserWalletAddress] = useState<string | null>(
    null
  );
  const {
    execute: login,
    error: loginError,
    isPending: isLoginPending,
  } = useWalletLogin();

  const { data: wallet, loading } = useActiveWallet();
  const {
    data: activeProfileData,
    error,
    loading: activeProfileLoading,
  } = useActiveProfile();

  const { execute: logoutUser, isPending: isLogoutPending } = useWalletLogout();

  const router = useRouter();
  const currentPath = usePathname();
  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    if (wallet) {
      setUserWalletAddress(wallet.address);
    }
    if (wallet && activeProfileData === null) {
      router.push("/create");
    }
  }, []);

  const loginUser = async () => {
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
    <LensContext.Provider
      value={{
        loginError,
        loginUser,
        logoutUser,
        isLoginPending,
        wallet,
        userWalletAddress,
        activeProfileData,
        // feedItems,
        // feedLoading,
        // hasMore,
        // nextFeed,
      }}
    >
      {children}
    </LensContext.Provider>
  );
}
