import React from 'react';
import { Card as MantineCard, CardProps as MantineCardProps } from '@mantine/core';

interface CardProps extends MantineCardProps {
  children: React.ReactNode; // Explicitly typing children
}

const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return <MantineCard {...props}>{children}</MantineCard>;
};

export default Card;
