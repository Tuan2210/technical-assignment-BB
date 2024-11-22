import "./GlobalStyles.scss";
import { ReactNode } from "react";

interface GlobalStylesProps {
  children: ReactNode;
}

const GlobalStyles: React.FC<GlobalStylesProps> = ({ children }) => {
  return <>{children}</>;
};

export default GlobalStyles;
