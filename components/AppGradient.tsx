import { LinearGradient } from "expo-linear-gradient";
import { Content } from "./Content";

interface AppGradientProps {
  children: React.ReactNode;
  colors: string[];
}

export const AppGradient = ({ children, colors }: AppGradientProps) => {
  return (
    <LinearGradient colors={colors} className="flex-1">
      <Content>{children}</Content>
    </LinearGradient>
  );
};
