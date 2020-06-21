
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

import { Avatar, Paper, Typography, Grid, TextField, Button } from "@material-ui/core";

import Side from '../components/Nav/Side';
import FileUpload from '../components/FileUpload';

import Auth from '../src/Auth';
import { updateUser } from '../src/apiCalls/user';

const styles = theme => ({
  paper: {
    width: '80%',
    minWidth: 400,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    marginTop: 25,
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textField: {
    width: 200,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  border: {
    border: `1px solid ${theme.palette.primary.main}`
  }
});

@inject('store')
@observer
class ProfilePage extends React.Component {

  state = {
    render: 1,
  }

  async componentDidMount() {
    this.auth = new Auth();
    this.visibility = "all";
    const {
      auth: { checkTokenAndSetUser },
    } = this.props.store;
    if (!this.auth.isAuthenticated()) {
      Router.push('/');
    }
    const { token } = this.auth.getSession();
    await checkTokenAndSetUser({ token });

    
    

    setTimeout(() => {
      this.init();
    }, 500)
  }


  componentWillUnmount() {
    
  }

  init = async () => {
    // check if admin roles
    const { auth: { user } } = this.props.store;
    if (user && user.role && this.visibility !== 'all' && user.role !== this.visibility) { return Router.back(); }
    
  }

  submit = async (e) => {
    e.preventDefault();
    const { auth: { user }, snack: { snacky } } = this.props.store;
    const u = { id: user.id }
    if (user.name) u.name = user.name;
    if (user.photo) u.photo = user.photo;
    const update = await updateUser(u);
    if (update.errors) return snacky(update.errors.join('\n'), 'error', 6000);
    snacky('updated!');
  }

  saveMedia = (file) => {
    const { auth: { user, update } } = this.props.store;
    const clone = toJS(user);
    setTimeout(() => {
      update("photo", file);
      this.setState({ render: new Date().getTime() })
    }, 500)
  }

  change = (field) => (e) => {
    const { auth: { user, update } } = this.props.store;
    update(field, e.target.value);
  }

  render() {
    const { render } = this.state;
    const { classes } = this.props;
    const { auth: { user } } = this.props.store;

    return (
      <Side
        showSearch={false}
        title={"Profile"}
      >
        <div>
            <Paper className={classes.paper}>
              <Typography variant="h3" style={{ marginTop: 25, marginBottom: 25 }}>Profile</Typography>
              <form onSubmit={this.submit} className={classes.center}>
                {render > 0 && user.photo ? <Avatar src={user.photo} className={classes.large} /> : (null) }
                <TextField
                  type="text"
                  value={user.name}
                  placeholder={"name"}
                  className={classes.textField}
                  onChange={this.change('name')}
                  style={{ marginTop: 25 }}
                />
                <TextField
                  type="text"
                  value={user.email}
                  placeholder={"email"}
                  className={classes.textField}
                  disabled
                  style={{ marginTop: 25 }}
                />
                <FileUpload
                  saveMedia={this.saveMedia}
                  message={'Upload a profile photo'}
                  className={classes.border}
                  style={{ textAlign: 'center', width: 200, height: 100, margin: 20, display: 'flex', flexDirection: 'column', alignItem: 'center', justifyContent: 'center' }}
                />
                <Button type="submit" style={{ marginTop: 25 }} variant="contained" color="primary">Submit</Button>
              </form>
            </Paper>
        </div>
      </Side>
    );
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ProfilePage));
