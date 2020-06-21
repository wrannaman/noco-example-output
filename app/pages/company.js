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
class CompanyPage extends React.Component {
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
      <Side showSearch={false} title={`Hire With Us!`}>
        {!waiting && (
          <React.Fragment>
            <Paper
              elevation={1 || 1}
              square={false || false}
              style={{ minHeight: 100, padding: "25px", margin: "25px" }}
            >
              <iframe
                allowFullScreen={true}
                allowpaymentrequest={true}
                name={"undefined" || "iframe"}
                width={"undefined" || "100%"}
                height={"1200px" || "100%"}
                style={{ border: "none", padding: 25, width: "100%" }}
                src={
                  "https://airtable.com/embed/shrIWMqFAe8npI3R8?backgroundColor=purple"
                }
              />
            </Paper>
          </React.Fragment>
        )}
      </Side>
    );
  }
}

CompanyPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(CompanyPage));
