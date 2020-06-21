import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Router, { withRouter } from "next/router";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import * as cfg from "../config";

import Side from "../components/Nav/Side";
import Auth from "../src/Auth";
import { Paper } from "@material-ui/core";

const isRepeatable = false;
const isDetail = false;
const pageAuth = "unauthenticated";

const styles = theme => ({});

@inject("store")
@observer
class ApplicantPage extends React.Component {
  state = {
    waiting: true
  };

  async componentDidMount() {
    const {
      snack: { snacky }
    } = this.props.store;
    this.auth = new Auth();
    this.visibility = "all";
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
      <Side showSearch={false} title={`Find A Job`}>
        {!waiting && (
          <React.Fragment>
            <Paper
              elevation={6 || 1}
              square={false || false}
              style={{ padding: "25px", margin: "25px" }}
            >
              <iframe
                allowFullScreen={true}
                allowpaymentrequest={true}
                name={"undefined" || "iframe"}
                width={"undefined" || "100%"}
                height={"1300px" || "100%"}
                style={{ border: "none", padding: 25, width: "100%" }}
                src={
                  "https://airtable.com/embed/shrNyhuFLfsC0pSaU?backgroundColor=purple"
                }
              />
            </Paper>
          </React.Fragment>
        )}
      </Side>
    );
  }
}

ApplicantPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ApplicantPage));
