import React from "react";
import * as BsIcons from "react-icons/bs";


export const sidebardata = [
    {
        title: 'Home',
        path: '*',
        icon: <BsIcons.BsHouse />,
        cName: 'nav-text',
    },
    {
        title: 'Account',
        path: '/account',
        icon: <BsIcons.BsPersonCircle />,
        cName: 'nav-text',
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <BsIcons.BsPersonFillGear />,
        cName: 'nav-text',
    },
   
   
]

