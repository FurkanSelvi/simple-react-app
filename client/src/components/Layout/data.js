import React from "react";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockIcon from '@material-ui/icons/Lock';
import TableChartIcon from '@material-ui/icons/TableChart';
import { makeStyles } from '@material-ui/core/styles';

export const navlinks = [
    { title: 'dashboard', path: '/', icon: <DashboardIcon /> },
    { title: 'protected', path: '/protected-home', icon: <LockIcon /> },
    { title: 'table', path: '/table', icon: <TableChartIcon /> },
    {
        title: 'logout', icon: <ExitToAppIcon />
    },
]

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));