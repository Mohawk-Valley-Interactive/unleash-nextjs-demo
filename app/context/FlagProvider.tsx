"use client";

import { FlagProvider as UnleashFlagProvider } from "@unleash/nextjs/client";

interface Props {
  children: React.ReactNode;
  clientKey: string | undefined;
  clientUrl: string | undefined;
}

export default function FlagProvider({
  children,
  clientKey,
  clientUrl,
}: Props) {
  return (
    <UnleashFlagProvider
      config={{
        refreshInterval: 1,
        clientKey: clientKey,
        url: clientUrl,
        appName: "unleash-demo",
      }}
    >
      {children}
    </UnleashFlagProvider>
  );
}
