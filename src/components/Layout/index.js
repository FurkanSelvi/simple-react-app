import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Footer from "./Footer";
import MainBoard from "../../router/main";
import { withRouter } from "react-router-dom";
import { navlinks, useStyles } from "./data";
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from "redux-i18n";
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { setLogout } from '../../redux/auth/actions'

const Layout = (props, context) => {
  const { t } = context;
  const { auth, location, window, history } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  let selectedNav = navlinks.filter(n => n.path === location.pathname);
  selectedNav = selectedNav[0] || navlinks[0];
  console.log('selectedNav',selectedNav, navlinks[0])
  const lang = useSelector(store => store.i18nState.lang);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setLanguage(e.target.value))
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {navlinks.map((nav, index) => (
          <ListItem onClick={() => {
            if (nav.title === 'logout') {
              dispatch(setLogout());
            }
            if (nav.path) {
              history.push(nav.path);
            }
          }} button key={index}>
            <ListItemIcon>{nav.icon}</ListItemIcon>
            <ListItemText primary={t(nav.title)} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} position="fixed" className={classes.appBar}>
        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Typography style={{ display: 'flex', alignItems: 'center' }} variant="h6" noWrap>
          {t(selectedNav.title)}
        </Typography>
        <RadioGroup row aria-label="lang" name="lang" value={lang} onChange={handleChange}>
          <FormControlLabel value="tr" control={<Radio />} label="TR" />
          <FormControlLabel value="en" control={<Radio />} label="EN" />
        </RadioGroup>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <MainBoard />
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
Layout.contextTypes = {
  t: PropTypes.func.isRequired
};

export default withRouter(Layout);
