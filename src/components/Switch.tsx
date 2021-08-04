import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { colors, dimensions } from '../styles';

const sizeDimensions = {
    small: { height: 16, width: dimensions.headerSpacing - dimensions.coreSpacing, fontSize: dimensions.unitSpacing - 2, childMargin: 4 },
    medium: { height: 24, width: dimensions.headerSpacing, fontSize: dimensions.unitSpacing, childMargin: 6 },
    large: { height: 28, width: dimensions.headerSpacing + dimensions.unitSpacing, fontSize: dimensions.unitSpacing + 2, childMargin: 8 },
}

type Props = {
    size?: 'small' | 'medium' | 'large';
    onChange?: (e) => void;
    disabled?: boolean;
    defaultChecked?: boolean;
    checked?: React.ReactNode;
    unchecked?: React.ReactNode;
    checkedColor?: string;
    id?: string;
};

const Container = styledTS<{ size?: any, color?: string, disabled?: boolean }>(styled.div)`
    ${props => `
        width: ${sizeDimensions[props.size].width}px;
        height: ${sizeDimensions[props.size].height}px;
        font-size: ${sizeDimensions[props.size].fontSize}px;
        background: ${props.color};
        border-radius: ${sizeDimensions[props.size].height / 2}px;
        cursor: ${props.disabled ? 'not-allowed' : 'pointer'};
        opacity: ${props.disabled && '0.4'};  
    `}
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
`

const ChildrenContainer = styledTS<{ show?: boolean, size?: any }>(styled.div)`
    transition: opacity 0.25s;
    opacity: ${props => props.show ? '1' : '0'};
    margin: ${props => sizeDimensions[props.size].childMargin}px;
`

const Circle = styledTS<{ size?: any, checked?: boolean }>(styled.div)`
    ${props => `
        width: ${sizeDimensions[props.size].height - 4}px;
        height: ${sizeDimensions[props.size].height - 4}px;
        border-radius: ${sizeDimensions[props.size].height / 2}px;
        transform: translateX(${props.checked ? sizeDimensions[props.size].width - sizeDimensions[props.size].height : 0}px);  
    `}
    transition: all ease 0.25s;
    background: white;
    margin: 2px;
    position: absolute;
`

const Switch: React.FC<Props> = (props) => {
    const { size = 'medium', disabled, checked, defaultChecked = true, unchecked, id, checkedColor = colors.colorCoreGreen, onChange } = props;
    const [check, setCheck] = useState(defaultChecked);
    const containerRef = useRef(null);

    const onClick = () => {
        if (!disabled) {
            let checked = !check;
            let target = containerRef.current
            setCheck(checked);
            onChange && onChange({ target, checked });
        }
    }

    return (
        <Container
            size={size}
            color={check ? checkedColor : colors.colorCoreLightGray}
            onClick={onClick}
            disabled={disabled}
            ref={containerRef}
            id={id}
        >
            <ChildrenContainer show={check} size={size}>
                {checked}
            </ChildrenContainer>
            <Circle size={size} checked={check} />
            <ChildrenContainer show={!check} size={size}>
                {unchecked}
            </ChildrenContainer>
        </Container>
    );
}

export default Switch;