import React from 'react';
import { Label } from './styles';

type Props = {
  children: React.ReactNode | string;
  htmlFor?: string;
  required?: boolean;
  uppercase?: boolean;
};

function ControlLabel(props: Props) {
  const { children, required, uppercase = true } = props;

  return (
    <Label uppercase={uppercase}>
      {children}
      {required && <span> *</span>}
    </Label>
  );
}

export default ControlLabel;
