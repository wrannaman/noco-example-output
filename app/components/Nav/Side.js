import React from 'react';
  import PropTypes from 'prop-types';
  import { withStyles, ThemeProvider } from '@material-ui/core/styles';
  import Router, { withRouter } from 'next/router';
  import { inject, observer } from 'mobx-react';
  import { toJS } from 'mobx';
  import clsx from 'clsx';

  import { Breadcrumbs, Link, TextField, FormControlLabel, Switch, Select, FormControl, FormHelperText, InputLabel, Drawer, ListItemText, ListItemIcon, ListItem, IconButton, Divider, Typography, List, Toolbar, AppBar, Button, Avatar, MenuItem, Menu } from '@material-ui/core';

  import MenuIcon from '@material-ui/icons/Menu';
  import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
  import InboxIcon from '@material-ui/icons/MoveToInbox';
  import MailIcon from '@material-ui/icons/Mail';

  import { upperFirst } from 'lodash';

  import GlobalSnack from '../Shared/GlobalSnack'

  import Auth from '../../src/Auth';

  const drawerWidth = 240;

  const styles = theme => ({
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      paddingTop: 25,
      justifyContent: 'space-evenly',
      minWidth: 500,
      alignItems: 'center',
    },
    flexColumn: {
      display: 'flex',
      flexDirection: 'column'
    },
    flexColumWidth: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    },
    paper: {
      minWidth: 300,
      minHeight: 300
    },
    // root: {
    //   display: 'flex',
    // },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    appBarShiftRight: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    noWidthDrawerPaper: {

    },
    logo: {
      width: 100,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    drawerHeaderWithLogo: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0),
      ...theme.mixins.toolbar,
      justifyContent: 'space-between',
    },
    content: {
      // flexGrow: 1,
      // padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      // display: 'flex',
      // flexDirection: 'column',
      // alignItems: 'center',
      // justifyContent: 'center',
      // marginLeft: -drawerWidth,
      paddingTop: 64,
    },
    contentShiftRight: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    contentShiftLeft: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
    buttonTitleGroup: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    formControl: {
      width: 170,
    },
    color: {
      color: theme.palette.primary.main,
    }
  });

  @inject('store')
  @observer
  class Nav extends React.Component {
    state = {
      waiting: true,
      open: false,
      anchorEl: null,
      nav: {"color":"primary","variant":"persistent","anchor":"left","appBar":"fixed","logo":true,"logoURL":"/img/logo.png"},
    }

    async componentDidMount() {
      this.auth = new Auth();
      const {
        auth: { checkTokenAndSetUser },
      } = this.props.store;
      const { query: { pageID } } = this.props.router;
      // if (!this.auth.isAuthenticated()) {
      //   Router.push('/');
      // }
      const { token } = this.auth.getSession();
      await checkTokenAndSetUser({ token });

      this.init();
      this.setState({ waiting: false })
    }

    init = async () => {

    }
    handleMenu = event => {
      this.setState({ anchorEl: event.currentTarget });
    }

    logout = () => {
      const { auth: { user, resetUser } } = this.props.store;
      this.setState({ anchorEl: null });
      this.auth.logout(Router);
      setTimeout(() => {
        resetUser();
      }, 100)
    }

    render() {
      const { classes, router: { pathname } } = this.props;
      const { nav, open, anchorEl, waiting } = this.state;
      const { auth: { user } } = this.props.store;
      const pageNames = [{"displayName":"","name":"home","path":"/","visibility":"all"},{"displayName":"Find A Job","name":"applicant","path":"/applicant","visibility":"all"},{"displayName":"Hire With Us!","name":"company","path":"/company","visibility":"all"},{"displayName":"adminz","name":"emailadmin","path":"/emailadmin","visibility":"admin"}];
      return (
        <div>
            <div className={classes.root}>
              <AppBar
                position={nav.appBar}
                className={clsx(classes.appBar, {
                  [classes.appBarShift]: ((open || nav.variant === 'permanent') && nav.anchor === 'left'),
                  [classes.appBarShiftRight]: ((open || nav.variant === 'permanent') && nav.anchor === 'right'),
                })}
                color={nav.color}
              >
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className={classes.buttonTitleGroup}>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={() => this.setState({ open: !this.state.open })}
                      edge="start"
                      className={clsx(classes.menuButton, open && classes.hide)}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                      {upperFirst(this.props.title)}
                    </Typography>
                  </div>
                  <div>
                    {!waiting && user.id && (
                      <IconButton
                        aria-owns={open ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                        className="step6"
                      >
                        <Avatar src={user && user.photo}>{user && user.email && user.email[0].toUpperCase()}</Avatar>
                      </IconButton>
                    )}
                    {!waiting && !user.id && (
                      <Button variant="contained" color="primary" onClick={() => Router.push({ pathname: '/login', })}>Log In</Button>
                    )}
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={() => this.setState({ anchorEl: null })}
                    >
                      <MenuItem onClick={() => {
                        Router.push({ pathname: '/profile', query: {} });
                        this.setState({ anchorEl: null })
                      }}>Profile</MenuItem>
                      <MenuItem onClick={this.logout}>Log Out</MenuItem>
                    </Menu>
                  </div>
                </Toolbar>
              </AppBar>
              <Drawer
                className={classes.drawer}
                variant={nav.variant}
                anchor={nav.anchor}
                open={open}
                onClose={() => this.setState({ open: !this.state.open })}
                classes={{
                  paper: ['left', 'right'].indexOf(nav.anchor) !== -1 ? classes.drawerPaper : classes.noWidthDrawerPaper,
                }}
              >
                {nav.variant !== 'permanent' && (
                  <React.Fragment>
                    <div className={nav.logo && "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/2000b260-a97f-46e3-b2ed-3a34664e27c4.png" ? classes.drawerHeaderWithLogo : classes.drawerHeader}>
                      {nav.logo && (
                        <div style={{ width: '100%', textAlign: 'center' }}>
                          <img
                            src={"https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/2000b260-a97f-46e3-b2ed-3a34664e27c4.png"}
                            className={classes.logo}
                          />
                        </div>
                      )}
                      <IconButton onClick={() => this.setState({ open: !this.state.open })}>
                        <ChevronLeftIcon />
                      </IconButton>
                    </div>
                    <Divider />
                  </React.Fragment>
                )}
                <List>
                  {pageNames.map((page, index) => {
                    if (page.visibility !== 'all' && user && user.role !== page.visibility) return null;
                    return (
                      <ListItem
                        selected={pathname === `/${page.name.toLowerCase()}`}
                        button key={page.displayName ? page.displayName : upperFirst(page.name)}
                        onClick={() => Router.push({ pathname: `${page.path.toLowerCase()}` })}
                      >
                        {false && (<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>)}
                        <ListItemText primary={page.displayName ? page.displayName : upperFirst(page.name)} />
                      </ListItem>
                    )
                  })}
                </List>

              </Drawer>
              <main
                className={clsx(classes.content, {
                  [classes.contentShiftLeft]: ((open || nav.variant === 'permanent') && nav.anchor === 'left'),
                  [classes.contentShiftRight]: ((open || nav.variant === 'permanent') && nav.anchor === 'right'),
                })}
              >
                {this.props.children}
              </main>
            </div>
            <GlobalSnack />
        </div>
      );
    }
  }

  Nav.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withRouter(withStyles(styles)(Nav));
  