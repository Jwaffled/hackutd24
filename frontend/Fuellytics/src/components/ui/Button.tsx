import React from 'react';
import { Button as MantineButton, ButtonProps as MantineButtonProps } from '@mantine/core';

interface ButtonProps extends MantineButtonProps {
  children: React.ReactNode; // Explicitly typing children
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <MantineButton {...props}>{children}</MantineButton>;
};

export default Button;
