import React from 'react';
import { Balance, Dashboard, Debts, Stock } from '../../../../assets/icons';

export const sidebarLinks = [
  {
    icon: <Dashboard />,
    id: 1,
    url: '/',
    text: 'Home',
  },
  {
    icon: <Balance />,
    id: 2,
    url: '/balance',
    text: 'Balance',
  },

  {
    icon: <Debts />,
    id: 3,
    url: '/debts',
    text: 'Debts',
  },
  {
    icon: <Stock />,
    id: 4,
    url: '/stock',
    text: 'Stock',
  },
];
