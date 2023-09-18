"use client";
import "./globals.css";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";
import {
  LensConfig,
  LensProvider,
  development,
} from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
import Navbar from "@/components/ui/Navbar";
import { LensContextProvider } from "@/context/LensContext";
import { Toaster } from "react-hot-toast";

const { publicClient, webSocketPublicClient } = configureChains(
  [polygon, polygonMumbai],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new InjectedConnector({
      options: {
        shimDisconnect: false, // see https://github.com/wagmi-dev/wagmi/issues/2511
      },
    }),
  ],
});

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: development,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <WagmiConfig config={config}>
        <LensProvider config={lensConfig}>
          <LensContextProvider>
            <body className="min-h-screen bg-gradient-to-b from-purplePrimary to-black">
              <Navbar />
              <Toaster position="bottom-center" />
              <div>{children}</div>
            </body>
          </LensContextProvider>
        </LensProvider>
      </WagmiConfig>
    </html>
  );
}
