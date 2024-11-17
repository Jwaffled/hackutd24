import React from 'react';
import { Modal as MantineModal, ModalProps as MantineModalProps } from '@mantine/core';

interface ModalProps extends MantineModalProps {
  children: React.ReactNode; // Explicitly typing children
}

const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  return <MantineModal {...props}>{children}</MantineModal>;
};

export default Modal;
