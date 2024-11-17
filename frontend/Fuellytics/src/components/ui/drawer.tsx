// components/ui/drawer.tsx
'use client'

import { Drawer as MantineDrawer } from '@mantine/core'
import '@mantine/core/styles.css'

export interface DrawerProps extends React.ComponentProps<typeof MantineDrawer> {}

export function Drawer(props: DrawerProps) {
  return <MantineDrawer {...props} />
}