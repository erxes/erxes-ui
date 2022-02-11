import { colors } from '../styles';
import { stripe } from '../utils/animations';
import React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';

const ContentContainer = styled.div`
  position: relative;
  z-index: 3;
  color: ${colors.colorCoreDarkGray};
  text-align: center;
`;

const CircleContainer = styledTS<{width?: number}>(styled.div)`
  height: ${props => props.width ? `${props.width}px` : '100px'};
  width: ${props => props.width ? `${props.width}px` : '100px'};
  background-color: white;
  position: relative;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const CircleProgressLeft = styledTS<{color?: string, percentage?: number, height?: number}>(styled.div)`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  border-style: solid;
  border-width: ${props => props.height ? `${props.height}px` : '5px'}
  border-color: ${props => props.color && props.percentage && props.percentage >= 50 ? props.color : 'white'}
  position: absolute;
  z-index: 1;
  transform: ${props => props.percentage ? `rotate(${props.percentage >=50 ? 3.6 * props.percentage : -3.6 * (50 - props.percentage)}deg)` : 'rotate(180deg'};
  clip: rect(0px, 50px, 100px, 0px);
`

const CircleProgressRight = styledTS<{color?: string, height?: number}>(styled.div)`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  border-style: solid;
  border-width: ${props => props.height ? `${props.height}px` : '5px'}
  border-color: ${props => props.color}
  position: absolute;
  transform: rotate(180deg);
  clip: rect(0px, 50px, 100px, 0px);
`

const ProgressContainer = styled.div`
  position: relative;
  background: ${colors.bgMain};
  width: 100%;
  height: 100%;
  box-shadow: inset 0 -2px 6px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
`

const PercentShower = styledTS<{circlePercent?: boolean, color?: string}>(styled.div)`
  font-size: ${props => props.circlePercent ? '20px' : '10px'};
  position: ${props => props.circlePercent ? 'relative' : 'absolute'};
  color: ${props => props.color};
  right: 0px;
`

const Wrapper = styledTS<{ height?: number }>(styled.div)`
  position: relative;
  padding: 0px 30px;
  width: 100%;
  height: ${props => props.height ? `${props.height}px` : '10px'};
  display: flex;
  flex-direction: row;
  align-items: center;

  a:hover {
    cursor: pointer;
  }

  > a {
    outline: none;
    top: 11px;
    right: 20px;
    position: absolute;
    font-size: 10px;
    color: ${colors.colorCoreGray};
  }
`;

const Progress = styledTS<{ color?: string, striped?: boolean, percentage?: number }>(styled.div)`
  position: absolute;
  background: ${props => props.color};
  width: ${props => `${props.percentage}%`}
  left: 0;
  top: 0;
  bottom: 0;
  background-image: ${props => props.striped ?
    'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent);'
    : 'none'}
  background-size: 16px 16px;
  border-radius: 5px;
  transition: width 0.5s ease;
  animation: ${stripe} 1s linear infinite;
`;

type Props = {
  children?: React.ReactNode;
  close?: React.ReactNode;
  percentage: number;
  color?: string;
  type?: 'stripedProgressBar' | 'circleProgressBar' | 'defaultProgressBar';
  height?: number;
  showPercentage?: boolean;
  width?: number;
};

function ProgressBar({
  percentage,
  children,
  close,
  color = '#dddeff',
  height,
  showPercentage,
  width,
  type = 'defaultProgressBar'
}: Props) {
  const mainColor = percentage === 100 ? colors.colorCoreGreen : color;
  const percentColor = percentage === 100 ? colors.colorCoreGreen : 'black';

  const CircleProgressBar = () => {
    return (
      <CircleContainer width={width}>
        <CircleProgressLeft color={mainColor} percentage={percentage} height={height}/>
        <CircleProgressRight color={mainColor} height={height}/>
        <PercentShower circlePercent color={percentColor}>{percentage}%</PercentShower>
      </CircleContainer>
    )
  }

  const LineProgressBar = () => {
    return (
      <Wrapper height={height}>
        <ProgressContainer>
          <Progress color={mainColor} striped={type === 'stripedProgressBar'} percentage={percentage}/>
        </ProgressContainer>
        {showPercentage && <PercentShower color={percentColor}>{percentage}%</PercentShower>}
        <ContentContainer>{children}</ContentContainer>
        {close}
      </Wrapper>
    )
  }

  return (
    <div>
      {type === 'circleProgressBar' && <CircleProgressBar/>}
      {type !== 'circleProgressBar' && <LineProgressBar/>}
    </div>
  );
}

export default ProgressBar;
