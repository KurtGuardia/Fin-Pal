import React from 'react';
import { Balance, Dashboard, Debts, Stock } from '../../../../assets/icons';

export const sidebarLinks = [
  {
    icon: <Dashboard />,
    id: 1,
    url: '/',
  },
  {
    icon: <Balance />,
    id: 2,
    url: '/balance',
  },

  {
    icon: <Debts />,
    id: 3,
    url: '/debts',
  },
  {
    icon: <Stock />,
    id: 4,
    url: '/stock',
  },
];
