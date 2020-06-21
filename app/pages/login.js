
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Paper, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import Auth from '../src/Auth';
import { EmailRegex } from '../utils/regex';
import GlobalSnack from '../components/Shared/GlobalSnack';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(20),
    backgroundImage: 'url("https://s3.wasabisys.com/noco-prod-5e2f1ec274555500183f4457/88978e8a-8410-48ad-b611-c0ea16def3ff.png")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
  },
  center: {
    position: 'absolute',
    width: 500,
    minHeight: 400,
    top: 'calc(50% - 200px)',
    left: 'calc(50% - 250px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '50%',
    maxWidth: 200,
    marginBottom: 15,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  madeWith: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    width: 150,
    height: 50,
  },
  nocoLogo: {
    width: 50,
  },
  madeWithFont: {
    fontSize: 10,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});

@inject('store')
@observer
class Index extends React.Component {
  state = {
    error: '',
    email: '',
    code: '',
    enterCode: false,
    errorText: '',
  };

  componentDidMount() {
    this.auth = new Auth();
    if (this.auth.isAuthenticated()) {
      Router.push({
        pathname: '/emailadmin',
      });
    }
    const { query } = this.props.router;
    if (query.error) {
      this.setState({ error: query.error });
    }
  }

  handleChange = (name) => (e) => {
    if (name === 'email') {
      if (EmailRegex.test(e.target.value)) {
        this.setState({ errorText: '' })
      } else {
        this.setState({ errorText: 'Invalid Email' })
      }
    }
    this.setState({ [name]: e.target.value });
  }

  submit = (type) => async (e) => {
    const { snack: { snacky  } } = this.props.store;
    e.preventDefault();
    this.setState({ waiting: true })

    if (type === 'email') {
      const emailRes = await this.auth.requestCode({ email: this.state.email });
      if (emailRes.success) this.setState({ enterCode: true });
      else snacky(emailRes.error, 'error');
    } else {
      const codeRes = await this.auth.validateCode({ email: this.state.email, code: this.state.code });
      if (codeRes.success) {
        this.setState({ waiting: false })
        return Router.push({ pathname: '/emailadmin' });
      }
      else snacky(codeRes.error, 'error');
      // if (emailRes.success) this.setState({ enterCode: true });
    }
    this.setState({ waiting: false })

  }

  login = () => {
    if (!this.auth || !this.auth.login) this.auth = new Auth();
    this.auth.login(Router);
  }

  render() {
    const { classes } = this.props;
    const { error, enterCode } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.center} elevation={24}>
          <img src="https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/2000b260-a97f-46e3-b2ed-3a34664e27c4.png" className={classes.logo} />
          <Typography gutterBottom>
          {error && (
            <Typography variant="body2" gutterBottom color="error">
              {error}
            </Typography>
          )}
          </Typography>
          <div>
            <Button onClick={this.login} color="primary" variant="contained">
              Log in or Sign Up
            </Button>
          </div>
        </Paper>
        <GlobalSnack />
        <Paper className={classes.madeWith}>
          <a href="https://noco.io?utm_source=app_link" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }} className={classes.flexRow}>
            <Typography variant="overline" className={classes.madeWithFont}> Made with </Typography>
            <img src="https://s3.us-west-1.wasabisys.com/noco/logo_small.png" className={classes.nocoLogo} />
          </a>
        </Paper>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Index));
