import React from 'react';
import { ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { useRouter } from 'next/router';
import NextLink, { NextLinkProps } from '@/routing/NextLink';

type AppDrawerItemProps = Pick<NextLinkProps, 'href'> & {
  icon?: React.ReactNode;
  title: string;
};

function AppDrawerItem({ href, icon, title }: AppDrawerItemProps) {
  const router = useRouter();

  return (
    <ListItemButton
      href={href}
      component={NextLink}
      selected={router.pathname === href}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={title} />
    </ListItemButton>
  );
}

export default AppDrawerItem;
