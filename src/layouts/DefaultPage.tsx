import type React from "react";

interface Props {
  children: React.ReactNode;
}

export const DefaultPage = ({ children }: Props) => {
  return <main tw="flex-1 bg-[#303030]">{children}</main>;
};
