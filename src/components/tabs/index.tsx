import React, { useState } from 'react';
import { TabCaption, TabContainer, Slider, Listener, Line } from './styles';

type Props = {
  children: any;
  tabNumber?: number;
  grayBorder?: boolean;
  full?: boolean;
  vertical?: boolean;
  backgroundFull?: boolean;
  color?: string;
  textColor?: string;
};

type TabTitleProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const TabTitle: React.FC<TabTitleProps> = (props) => {
  return (
    <TabCaption {...props} />
  )
}

const Tabs: React.FC<Props> = (props) => {
  const [linePosition, setLinePosition] = useState(0);
  const childRef = React.useRef<HTMLHeadingElement>(null);
  const { children, grayBorder, full, vertical, backgroundFull, color, textColor } = props;

  const onClick = (index: number) => {
    setLinePosition(index)
  }

  const newChildren = children.map((child: any, index: number) => {
    return <Listener onClick={() => onClick(index)} textColor={textColor}><div ref={childRef}>{child}</div></Listener>
  })

  return (
    <TabContainer grayBorder={grayBorder} full={full} vertical={vertical}>
      {newChildren}
      <Slider
        vertical={vertical}
        sizes={`${100 / children.length}%`}
        position={linePosition}
        backgroundFull={backgroundFull}
      >
        <Line
          vertical={vertical}
          backgroundFull={backgroundFull}
          color={color}
          sizes={childRef.current && (vertical ? childRef.current.clientHeight : childRef.current.clientWidth)}
        />
      </Slider>
    </TabContainer>
  )
}

export { Tabs, TabTitle };
