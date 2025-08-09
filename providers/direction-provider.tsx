'use client';
import { ReactNode } from 'react';
import { DirectionProvider as DirProvider } from '@radix-ui/react-direction';

const DirectionProvider = ({
  children,
  dir,
}: {
  children: ReactNode;
  dir: 'rtl' | 'ltr';
}) => {
  return <DirProvider dir={dir}>{children}</DirProvider>;
};

export { DirectionProvider };
