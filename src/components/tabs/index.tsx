import React from "react";
import { TabCaption, TabContainer } from "./styles";

export type TabsProps = {
  children: React.ReactNode;
  grayBorder?: boolean;
  full?: boolean;
}

function Tabs(props: TabsProps) {
  return <TabContainer {...props} />;
}

export type TabTitleProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

function TabTitle(props: TabTitleProps) {
  return <TabCaption {...props} />;
}

export default { Tabs, TabTitle };
