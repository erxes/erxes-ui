import React from 'react';
import { TabCaption, TabContainer } from './styles';

function Tabs(props: {
  children: React.ReactNode;
  grayBorder?: boolean;
  full?: boolean;
  vertical?: boolean;
}) {
  return <TabContainer {...props} />;
}

type TabTitleProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  type?: 'underlined' | 'underlined-vertical';
};

function TabTitle(props: TabTitleProps) {
  return <TabCaption {...props} />;
}

export { Tabs, TabTitle };
