import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Router, { withRouter } from "next/router";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import * as cfg from "../config";

import Side from "../components/Nav/Side";
import Auth from "../src/Auth";

import AllemailsTable from "../components/AllemailsTable";
import AllCompaniesTable from "../components/AllCompaniesTable";
import AllApplicantsTable from "../components/AllApplicantsTable";

const isRepeatable = false;
const isDetail = false;
const pageAuth = "authenticated";

const styles = theme => ({});

@inject("store")
@observer
class EmailAdminPage extends React.Component {
  state = {
    waiting: true
  };

  async componentDidMount() {
    const {
      snack: { snacky }
    } = this.props.store;
    this.auth = new Auth();
    this.visibility = "admin";
    const {
      auth: { checkTokenAndSetUser }
    } = this.props.store;
    if (pageAuth === "authenticated" && !this.auth.isAuthenticated()) {
      Router.push("/");
      snacky("Please log in.", "error");
    }
    const { token } = this.auth.getSession();
    await checkTokenAndSetUser({ token });

    setTimeout(() => {
      this.init();
    }, 300);
  }

  componentWillUnmount() {}

  init = async () => {
    // check if admin roles
    const {
      auth: { user }
    } = this.props.store;
    if (
      user &&
      user.role &&
      this.visibility !== "all" &&
      user.role !== this.visibility
    ) {
      return Router.back();
    }

    this.setState({ waiting: false });
  };

  render() {
    const { waiting } = this.state;
    const { classes } = this.props;
    const {
      auth: { user }
    } = this.props.store;

    return (
      <Side showSearch={false} title={`adminz`}>
        {!waiting && (
          <React.Fragment>
            <AllemailsTable />
            <AllCompaniesTable />
            <AllApplicantsTable />
          </React.Fragment>
        )}
      </Side>
    );
  }
}

EmailAdminPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(EmailAdminPage));
