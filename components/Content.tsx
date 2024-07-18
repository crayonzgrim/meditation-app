import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface ContentProps {
  children: React.ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  return <SafeAreaView className="flex-1 px-5 py-3">{children}</SafeAreaView>;
};
