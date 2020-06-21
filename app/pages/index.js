import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Router, { withRouter } from "next/router";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import * as cfg from "../config";

import Auth from "../src/Auth";
import {
  Grid,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip
} from "@material-ui/core";
import EmailSignupForm from "../components/EmailSignupForm";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import Twitter from "@material-ui/icons/Twitter";

const isRepeatable = false;
const isDetail = false;
const pageAuth = "unauthenticated";

const styles = theme => ({});

@inject("store")
@observer
class HomePage extends React.Component {
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
      <React.Fragment>
        {!waiting && (
          <React.Fragment>
            <Grid
              onClick={() => {}}
              container={false}
              item={true}
              lg={12 || 12}
              sm={12 || 12}
              md={12 || 12}
              xs={12 || 12}
              style={{
                minHeight: "100px",
                padding: "25px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                backgroundColor: "white",
                boxShadow: "10px 10px 5px grey;",
                background: "white"
              }}
              spacing={0}
            >
              <Grid
                onClick={() => (window.location = "https://noco.io")}
                container={false}
                item={true}
                lg={2 || 12}
                sm={12 || 12}
                md={2 || 12}
                xs={6 || 12}
                style={{ width: "100%" }}
                spacing={0}
              >
                {Array.isArray(
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/2000b260-a97f-46e3-b2ed-3a34664e27c4.png"
                ) ? (
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/2000b260-a97f-46e3-b2ed-3a34664e27c4.png".map(
                    (img, idx) => {
                      // handle show all
                      if (!false && idx > 0) return null;
                      // handle array of strings
                      if (typeof img === "string") {
                        return <img src={img} style={{ maxWidth: "100px" }} />;
                      }
                      // handle relation array
                      return (
                        <img src={img.null} style={{ maxWidth: "100px" }} />
                      );
                    }
                  )
                ) : (
                  <img
                    src={
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/2000b260-a97f-46e3-b2ed-3a34664e27c4.png"
                    }
                    style={{ maxWidth: "100px" }}
                  />
                )}
              </Grid>
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={4 || 12}
                sm={12 || 12}
                md={4 || 12}
                xs={12 || 12}
                style={{
                  minHeight: "100px",
                  width: "100%",
                  padding: "25px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flexWrap: "wrap"
                }}
                spacing={0}
              >
                <Button
                  style={{ marginLeft: "25px" }}
                  variant={"contained" || "contained"}
                  onClick={async () => {
                    Router.push({ pathname: "/company" });
                  }}
                  color={"primary" || "primary"}
                  size={"medium" || "medium"}
                  type={"button"}
                  fullWidth={false || false}
                  formSubmit={false || false}
                >
                  I'm Hiring
                </Button>

                <Button
                  style={{ marginLeft: "25px" }}
                  variant={"outlined" || "contained"}
                  onClick={async () => {
                    Router.push({ pathname: "/applicant" });
                  }}
                  color={"primary" || "primary"}
                  size={"medium" || "medium"}
                  type={"button"}
                  fullWidth={false || false}
                  formSubmit={false || false}
                >
                  I need a Job
                </Button>
              </Grid>
            </Grid>
            <Grid
              onClick={() => {}}
              container={false}
              item={true}
              lg={12 || 12}
              sm={12 || 12}
              md={12 || 12}
              xs={12 || 12}
              style={{
                minHeight: "100px",
                padding: "25px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                backgroundColor: "white"
              }}
              spacing={0}
            >
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={6 || 12}
                sm={12 || 12}
                md={6 || 12}
                xs={12 || 12}
                style={{ minHeight: "100px", width: "100%", padding: "25px" }}
                spacing={0}
              >
                {Array.isArray(
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/d1e4f7f9-600b-4dc7-a140-140938788e88.png"
                ) ? (
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/d1e4f7f9-600b-4dc7-a140-140938788e88.png".map(
                    (img, idx) => {
                      // handle show all
                      if (!false && idx > 0) return null;
                      // handle array of strings
                      if (typeof img === "string") {
                        return <img src={img} style={{ maxWidth: "80%" }} />;
                      }
                      // handle relation array
                      return <img src={img.null} style={{ maxWidth: "80%" }} />;
                    }
                  )
                ) : (
                  <img
                    src={
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/d1e4f7f9-600b-4dc7-a140-140938788e88.png"
                    }
                    style={{ maxWidth: "80%" }}
                  />
                )}
                <Grid
                  onClick={() => {}}
                  container={false}
                  item={true}
                  lg={12 || 12}
                  sm={12 || 12}
                  md={12 || 12}
                  xs={12 || 12}
                  style={{ width: "100%" }}
                  spacing={0}
                ></Grid>
                <Typography
                  variant={"h6" || "body1"}
                  paragraph={false || false}
                  noWrap={false || false}
                  align={"inherit" || "inherit"}
                  color={"initial" || "initial"}
                  style={{ marginTop: "50px" }}
                >
                  We source and technically interview amazing javascript
                  developers so you can skip right to the second round.
                </Typography>
                <Typography
                  variant={"subtitle1" || "body1"}
                  paragraph={false || false}
                  noWrap={false || false}
                  align={"inherit" || "inherit"}
                  color={"initial" || "initial"}
                  style={{ marginTop: "25px" }}
                >
                  We focus exclusively on Javascript developers who want to work
                  in LA.
                </Typography>
                <Grid
                  onClick={() => {}}
                  container={false}
                  item={true}
                  lg={12 || 12}
                  sm={12 || 12}
                  md={12 || 12}
                  xs={12 || 12}
                  style={{
                    minHeight: "100px",
                    width: "100%",
                    paddingTop: "25px"
                  }}
                  spacing={0}
                >
                  <Grid
                    onClick={() => {}}
                    container={false}
                    item={true}
                    lg={12 || 12}
                    sm={12 || 12}
                    md={12 || 12}
                    xs={12 || 12}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      padding: "10px"
                    }}
                    spacing={0}
                  >
                    <CheckCircleOutline
                      fontSize={"default" || "default"}
                      color={"primary" || "primary"}
                      style={{}}
                    />
                    <Typography
                      variant={"body1" || "body1"}
                      paragraph={false || false}
                      noWrap={false || false}
                      align={"inherit" || "inherit"}
                      color={"initial" || "initial"}
                      style={{ marginLeft: "25px" }}
                    >
                      Front-End Developers (React / Vue)
                    </Typography>
                  </Grid>
                  <Grid
                    onClick={() => {}}
                    container={false}
                    item={true}
                    lg={12 || 12}
                    sm={12 || 12}
                    md={12 || 12}
                    xs={12 || 12}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      padding: "10px"
                    }}
                    spacing={0}
                  >
                    <CheckCircleOutline
                      fontSize={"default" || "default"}
                      color={"primary" || "primary"}
                      style={{}}
                    />
                    <Typography
                      variant={"body1" || "body1"}
                      paragraph={false || false}
                      noWrap={false || false}
                      align={"inherit" || "inherit"}
                      color={"initial" || "initial"}
                      style={{ marginLeft: "25px" }}
                    >
                      Backend Developers (NodeJS)
                    </Typography>
                  </Grid>
                  <Grid
                    onClick={() => {}}
                    container={false}
                    item={true}
                    lg={12 || 12}
                    sm={12 || 12}
                    md={12 || 12}
                    xs={12 || 12}
                    style={{
                      width: "100%",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexWrap: "wrap"
                    }}
                    spacing={0}
                  >
                    <CheckCircleOutline
                      fontSize={"default" || "default"}
                      color={"primary" || "primary"}
                      style={{}}
                    />
                    <Typography
                      variant={"body1" || "body1"}
                      paragraph={false || false}
                      noWrap={false || false}
                      align={"inherit" || "inherit"}
                      color={"initial" || "initial"}
                      style={{ marginLeft: "25px" }}
                    >
                      Full Stack JS Developers
                    </Typography>
                  </Grid>
                  <Grid
                    onClick={() => {}}
                    container={false}
                    item={true}
                    lg={12 || 12}
                    sm={12 || 12}
                    md={12 || 12}
                    xs={12 || 12}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      padding: "10px"
                    }}
                    spacing={0}
                  >
                    <CheckCircleOutline
                      fontSize={"default" || "default"}
                      color={"primary" || "primary"}
                      style={{}}
                    />
                    <Typography
                      variant={"body1" || "body1"}
                      paragraph={false || false}
                      noWrap={false || false}
                      align={"inherit" || "inherit"}
                      color={"initial" || "initial"}
                      style={{ marginLeft: "25px" }}
                    >
                      Mobile Developers (React Native)
                    </Typography>
                  </Grid>
                  <Grid
                    onClick={() => {}}
                    container={false}
                    item={true}
                    lg={12 || 12}
                    sm={12 || 12}
                    md={12 || 12}
                    xs={12 || 12}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      padding: "10px"
                    }}
                    spacing={0}
                  >
                    <CheckCircleOutline
                      fontSize={"default" || "default"}
                      color={"primary" || "primary"}
                      style={{}}
                    />
                    <Typography
                      variant={"body1" || "body1"}
                      paragraph={false || false}
                      noWrap={false || false}
                      align={"inherit" || "inherit"}
                      color={"initial" || "initial"}
                      style={{ marginLeft: "25px" }}
                    >
                      Ready To Work In LA
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  onClick={() => {}}
                  container={false}
                  item={true}
                  lg={12 || 12}
                  sm={12 || 12}
                  md={12 || 12}
                  xs={12 || 12}
                  style={{
                    minHeight: "100px",
                    width: "100%",
                    padding: "25px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap"
                  }}
                  spacing={0}
                >
                  <Button
                    style={{}}
                    variant={"outlined" || "contained"}
                    onClick={async () => {
                      Router.push({ pathname: "/company" });
                    }}
                    color={"primary" || "primary"}
                    size={"large" || "medium"}
                    type={"button"}
                    fullWidth={false || false}
                    formSubmit={false || false}
                  >
                    I'm Looking To Hire
                  </Button>

                  <Button
                    style={{}}
                    variant={"contained" || "contained"}
                    onClick={async () => {
                      Router.push({ pathname: "/applicant" });
                    }}
                    color={"primary" || "primary"}
                    size={"medium" || "medium"}
                    type={"button"}
                    fullWidth={false || false}
                    formSubmit={false || false}
                  >
                    I'm Looking For A Job
                  </Button>
                </Grid>
              </Grid>
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={6 || 12}
                sm={12 || 12}
                md={6 || 12}
                xs={12 || 12}
                style={{ minHeight: "100px", width: "100%", padding: "25px" }}
                spacing={0}
              >
                {Array.isArray(
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/0e1f1f30-25f7-46fe-8e62-8914ac4ec53d.png"
                ) ? (
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/0e1f1f30-25f7-46fe-8e62-8914ac4ec53d.png".map(
                    (img, idx) => {
                      // handle show all
                      if (!false && idx > 0) return null;
                      // handle array of strings
                      if (typeof img === "string") {
                        return <img src={img} style={{ maxWidth: "100%" }} />;
                      }
                      // handle relation array
                      return (
                        <img src={img.null} style={{ maxWidth: "100%" }} />
                      );
                    }
                  )
                ) : (
                  <img
                    src={
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/0e1f1f30-25f7-46fe-8e62-8914ac4ec53d.png"
                    }
                    style={{ maxWidth: "100%" }}
                  />
                )}
              </Grid>
            </Grid>
            <Grid
              onClick={() => {}}
              container={false}
              item={true}
              lg={12 || 12}
              sm={12 || 12}
              md={12 || 12}
              xs={12 || 12}
              style={{
                minHeight: "100px",
                padding: "25px",
                background: "white"
              }}
              spacing={0}
            >
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={12 || 12}
                sm={12 || 12}
                md={12 || 12}
                xs={12 || 12}
                style={{
                  width: "100%",
                  padding: "25px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap"
                }}
                spacing={0}
              >
                <Typography
                  variant={"h6" || "body1"}
                  paragraph={false || false}
                  noWrap={false || false}
                  align={"inherit" || "inherit"}
                  color={"initial" || "initial"}
                  style={{}}
                >
                  Hire Devs That Know
                </Typography>
              </Grid>
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={12 || 12}
                sm={12 || 12}
                md={12 || 12}
                xs={12 || 12}
                style={{
                  minHeight: "100px",
                  width: "100%",
                  padding: "25px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap"
                }}
                spacing={0}
              >
                {Array.isArray(
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/f66121fb-72ba-4e30-aeb3-04eafb528604.png"
                ) ? (
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/f66121fb-72ba-4e30-aeb3-04eafb528604.png".map(
                    (img, idx) => {
                      // handle show all
                      if (!false && idx > 0) return null;
                      // handle array of strings
                      if (typeof img === "string") {
                        return <img src={img} style={{ maxWidth: "100px" }} />;
                      }
                      // handle relation array
                      return (
                        <img src={img.null} style={{ maxWidth: "100px" }} />
                      );
                    }
                  )
                ) : (
                  <img
                    src={
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/f66121fb-72ba-4e30-aeb3-04eafb528604.png"
                    }
                    style={{ maxWidth: "100px" }}
                  />
                )}
                {Array.isArray(
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/80070201-1ae6-4acb-a46c-235b930940a9.png"
                ) ? (
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/80070201-1ae6-4acb-a46c-235b930940a9.png".map(
                    (img, idx) => {
                      // handle show all
                      if (!false && idx > 0) return null;
                      // handle array of strings
                      if (typeof img === "string") {
                        return (
                          <img
                            src={img}
                            style={{ maxWidth: "100px", marginLeft: "25px" }}
                          />
                        );
                      }
                      // handle relation array
                      return (
                        <img
                          src={img.null}
                          style={{ maxWidth: "100px", marginLeft: "25px" }}
                        />
                      );
                    }
                  )
                ) : (
                  <img
                    src={
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/80070201-1ae6-4acb-a46c-235b930940a9.png"
                    }
                    style={{ maxWidth: "100px", marginLeft: "25px" }}
                  />
                )}
                {Array.isArray(
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/31ecc14e-300d-4109-910b-a008292b1d94.png"
                ) ? (
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/31ecc14e-300d-4109-910b-a008292b1d94.png".map(
                    (img, idx) => {
                      // handle show all
                      if (!false && idx > 0) return null;
                      // handle array of strings
                      if (typeof img === "string") {
                        return (
                          <img
                            src={img}
                            style={{ maxWidth: "100px", marginLeft: "25px" }}
                          />
                        );
                      }
                      // handle relation array
                      return (
                        <img
                          src={img.null}
                          style={{ maxWidth: "100px", marginLeft: "25px" }}
                        />
                      );
                    }
                  )
                ) : (
                  <img
                    src={
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/31ecc14e-300d-4109-910b-a008292b1d94.png"
                    }
                    style={{ maxWidth: "100px", marginLeft: "25px" }}
                  />
                )}
                {Array.isArray(
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/8d46cf2e-7c5c-40cb-8572-2604e43d68b8.png"
                ) ? (
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/8d46cf2e-7c5c-40cb-8572-2604e43d68b8.png".map(
                    (img, idx) => {
                      // handle show all
                      if (!false && idx > 0) return null;
                      // handle array of strings
                      if (typeof img === "string") {
                        return (
                          <img
                            src={img}
                            style={{ maxWidth: "100px", marginLeft: "25px" }}
                          />
                        );
                      }
                      // handle relation array
                      return (
                        <img
                          src={img.null}
                          style={{ maxWidth: "100px", marginLeft: "25px" }}
                        />
                      );
                    }
                  )
                ) : (
                  <img
                    src={
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/8d46cf2e-7c5c-40cb-8572-2604e43d68b8.png"
                    }
                    style={{ maxWidth: "100px", marginLeft: "25px" }}
                  />
                )}
                {Array.isArray(
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/c15f0ad5-fd8d-4aa8-8fa9-f1bf3dec75fe.png"
                ) ? (
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/c15f0ad5-fd8d-4aa8-8fa9-f1bf3dec75fe.png".map(
                    (img, idx) => {
                      // handle show all
                      if (!false && idx > 0) return null;
                      // handle array of strings
                      if (typeof img === "string") {
                        return (
                          <img
                            src={img}
                            style={{ marginLeft: "25px", maxWidth: "100px" }}
                          />
                        );
                      }
                      // handle relation array
                      return (
                        <img
                          src={img.null}
                          style={{ marginLeft: "25px", maxWidth: "100px" }}
                        />
                      );
                    }
                  )
                ) : (
                  <img
                    src={
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/c15f0ad5-fd8d-4aa8-8fa9-f1bf3dec75fe.png"
                    }
                    style={{ marginLeft: "25px", maxWidth: "100px" }}
                  />
                )}
                {Array.isArray(
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/661ef797-3d20-4880-bdc9-43615719c6ec.png"
                ) ? (
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/661ef797-3d20-4880-bdc9-43615719c6ec.png".map(
                    (img, idx) => {
                      // handle show all
                      if (!false && idx > 0) return null;
                      // handle array of strings
                      if (typeof img === "string") {
                        return (
                          <img
                            src={img}
                            style={{ maxWidth: "100px", marginLeft: "25px" }}
                          />
                        );
                      }
                      // handle relation array
                      return (
                        <img
                          src={img.null}
                          style={{ maxWidth: "100px", marginLeft: "25px" }}
                        />
                      );
                    }
                  )
                ) : (
                  <img
                    src={
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/661ef797-3d20-4880-bdc9-43615719c6ec.png"
                    }
                    style={{ maxWidth: "100px", marginLeft: "25px" }}
                  />
                )}
              </Grid>
            </Grid>
            <Grid
              onClick={() => {}}
              container={false}
              item={true}
              lg={12 || 12}
              sm={12 || 12}
              md={12 || 12}
              xs={12 || 12}
              style={{ minHeight: "100px", padding: "25px" }}
              spacing={0}
            >
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={12 || 12}
                sm={12 || 12}
                md={12 || 12}
                xs={12 || 12}
                style={{
                  minHeight: "100px",
                  width: "100%",
                  padding: "25px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap"
                }}
                spacing={0}
              >
                <Typography
                  variant={"h4" || "body1"}
                  paragraph={false || false}
                  noWrap={false || false}
                  align={"inherit" || "inherit"}
                  color={"initial" || "initial"}
                  style={{}}
                >
                  How It Works
                </Typography>
              </Grid>
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={12 || 12}
                sm={12 || 12}
                md={12 || 12}
                xs={12 || 12}
                style={{
                  minHeight: "100px",
                  width: "100%",
                  padding: "25px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap"
                }}
                spacing={0}
              >
                <Grid
                  onClick={() => {}}
                  container={false}
                  item={true}
                  lg={4 || 12}
                  sm={12 || 12}
                  md={12 || 12}
                  xs={12 || 12}
                  style={{ minHeight: "100px", width: "100%", padding: "25px" }}
                  spacing={0}
                >
                  <Paper
                    elevation={15 || 1}
                    square={false || false}
                    style={{
                      minWidth: "100%",
                      minHeight: 100,
                      padding: "25px"
                    }}
                  >
                    {Array.isArray(
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/550ab820-3356-4d7b-94b6-677403123940.png"
                    ) ? (
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/550ab820-3356-4d7b-94b6-677403123940.png".map(
                        (img, idx) => {
                          // handle show all
                          if (!false && idx > 0) return null;
                          // handle array of strings
                          if (typeof img === "string") {
                            return (
                              <img src={img} style={{ maxWidth: "100%" }} />
                            );
                          }
                          // handle relation array
                          return (
                            <img src={img.null} style={{ maxWidth: "100%" }} />
                          );
                        }
                      )
                    ) : (
                      <img
                        src={
                          "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/550ab820-3356-4d7b-94b6-677403123940.png"
                        }
                        style={{ maxWidth: "100%" }}
                      />
                    )}
                    <Typography
                      variant={"h5" || "body1"}
                      paragraph={false || false}
                      noWrap={false || false}
                      align={"center" || "inherit"}
                      color={"initial" || "initial"}
                      style={{}}
                    >
                      We Source Great Talent
                    </Typography>
                    <Typography
                      variant={"body1" || "body1"}
                      paragraph={false || false}
                      noWrap={false || false}
                      align={"inherit" || "inherit"}
                      color={"initial" || "initial"}
                      style={{ marginTop: "10px" }}
                    >
                      We find amazing local talent ready to get to work. We go
                      the extra mile to find qualified candidates who many not
                      fit the traditional mold.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid
                  onClick={() => {}}
                  container={false}
                  item={true}
                  lg={4 || 12}
                  sm={12 || 12}
                  md={12 || 12}
                  xs={12 || 12}
                  style={{ minHeight: "100px", width: "100%", padding: "25px" }}
                  spacing={0}
                >
                  <Paper
                    elevation={15 || 1}
                    square={false || false}
                    style={{
                      minWidth: "100%",
                      minHeight: 100,
                      padding: "25px"
                    }}
                  >
                    {Array.isArray(
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/95fa1994-3da9-4c80-a1b9-3aefa9f4b632.png"
                    ) ? (
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/95fa1994-3da9-4c80-a1b9-3aefa9f4b632.png".map(
                        (img, idx) => {
                          // handle show all
                          if (!false && idx > 0) return null;
                          // handle array of strings
                          if (typeof img === "string") {
                            return (
                              <img src={img} style={{ maxWidth: "100%" }} />
                            );
                          }
                          // handle relation array
                          return (
                            <img src={img.null} style={{ maxWidth: "100%" }} />
                          );
                        }
                      )
                    ) : (
                      <img
                        src={
                          "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/95fa1994-3da9-4c80-a1b9-3aefa9f4b632.png"
                        }
                        style={{ maxWidth: "100%" }}
                      />
                    )}
                    <Typography
                      variant={"h5" || "body1"}
                      paragraph={false || false}
                      noWrap={false || false}
                      align={"center" || "inherit"}
                      color={"initial" || "initial"}
                      style={{}}
                    >
                      Technical Interview
                    </Typography>
                    <Typography
                      variant={"body1" || "body1"}
                      paragraph={false || false}
                      noWrap={false || false}
                      align={"inherit" || "inherit"}
                      color={"initial" || "initial"}
                      style={{ marginTop: "10px" }}
                    >
                      Resumes are one thing, but passing a challenging technical
                      interview is another. We take the time to verify skills so
                      you don't have to.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid
                  onClick={() => {}}
                  container={false}
                  item={true}
                  lg={4 || 12}
                  sm={12 || 12}
                  md={12 || 12}
                  xs={12 || 12}
                  style={{ minHeight: "100px", width: "100%", padding: "25px" }}
                  spacing={0}
                >
                  <Paper
                    elevation={15 || 1}
                    square={false || false}
                    style={{
                      minWidth: "100%",
                      minHeight: 100,
                      padding: "25px"
                    }}
                  >
                    {Array.isArray(
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/a317253c-ff28-4c59-ba99-4d72f2fa617c.png"
                    ) ? (
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/a317253c-ff28-4c59-ba99-4d72f2fa617c.png".map(
                        (img, idx) => {
                          // handle show all
                          if (!false && idx > 0) return null;
                          // handle array of strings
                          if (typeof img === "string") {
                            return (
                              <img src={img} style={{ maxWidth: "100%" }} />
                            );
                          }
                          // handle relation array
                          return (
                            <img src={img.null} style={{ maxWidth: "100%" }} />
                          );
                        }
                      )
                    ) : (
                      <img
                        src={
                          "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/a317253c-ff28-4c59-ba99-4d72f2fa617c.png"
                        }
                        style={{ maxWidth: "100%" }}
                      />
                    )}
                    <Typography
                      variant={"h5" || "body1"}
                      paragraph={false || false}
                      noWrap={false || false}
                      align={"center" || "inherit"}
                      color={"initial" || "initial"}
                      style={{}}
                    >
                      Only The Best
                    </Typography>
                    <Typography
                      variant={"body1" || "body1"}
                      paragraph={false || false}
                      noWrap={false || false}
                      align={"inherit" || "inherit"}
                      color={"initial" || "initial"}
                      style={{ marginTop: "10px" }}
                    >
                      Only the best of the best make it this far. If you don't
                      hire them, it won't be because of a their skills. Go
                      ahead, skip the intro meeting and get right to the second
                      round!
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              onClick={() => {}}
              container={false}
              item={true}
              lg={12 || 12}
              sm={12 || 12}
              md={12 || 12}
              xs={12 || 12}
              style={{
                minHeight: "100px",
                padding: "25px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                background: "white"
              }}
              spacing={0}
            >
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={6 || 12}
                sm={12 || 12}
                md={12 || 12}
                xs={12 || 12}
                style={{ minHeight: "100px", width: "100%", padding: "25px" }}
                spacing={0}
              >
                <Typography
                  variant={"h2" || "body1"}
                  paragraph={false || false}
                  noWrap={false || false}
                  align={"inherit" || "inherit"}
                  color={"initial" || "initial"}
                  style={{}}
                >
                  Beyond The Resume
                </Typography>
                <Typography
                  variant={"body1" || "body1"}
                  paragraph={false || false}
                  noWrap={false || false}
                  align={"inherit" || "inherit"}
                  color={"initial" || "initial"}
                  style={{ marginTop: "25px" }}
                >
                  We go beyond the resume and value amazing skills over a shiny
                  resume.
                </Typography>
              </Grid>
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={6 || 12}
                sm={12 || 12}
                md={12 || 12}
                xs={12 || 12}
                style={{ minHeight: "100px", width: "100%", padding: "25px" }}
                spacing={0}
              >
                {Array.isArray(
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/550ab820-3356-4d7b-94b6-677403123940.png"
                ) ? (
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/550ab820-3356-4d7b-94b6-677403123940.png".map(
                    (img, idx) => {
                      // handle show all
                      if (!false && idx > 0) return null;
                      // handle array of strings
                      if (typeof img === "string") {
                        return <img src={img} style={{ maxWidth: "100%" }} />;
                      }
                      // handle relation array
                      return (
                        <img src={img.null} style={{ maxWidth: "100%" }} />
                      );
                    }
                  )
                ) : (
                  <img
                    src={
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/550ab820-3356-4d7b-94b6-677403123940.png"
                    }
                    style={{ maxWidth: "100%" }}
                  />
                )}
              </Grid>
            </Grid>
            <Grid
              onClick={() => {}}
              container={false}
              item={true}
              lg={12 || 12}
              sm={12 || 12}
              md={12 || 12}
              xs={12 || 12}
              style={{
                minHeight: "100px",
                padding: "25px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                background: "white"
              }}
              spacing={0}
            >
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={6 || 12}
                sm={12 || 12}
                md={12 || 12}
                xs={12 || 12}
                style={{ minHeight: "100px", width: "100%", padding: "25px" }}
                spacing={0}
              >
                {Array.isArray(
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/3c623233-60de-4375-b93c-e5e3b5226cd5.png"
                ) ? (
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/3c623233-60de-4375-b93c-e5e3b5226cd5.png".map(
                    (img, idx) => {
                      // handle show all
                      if (!false && idx > 0) return null;
                      // handle array of strings
                      if (typeof img === "string") {
                        return <img src={img} style={{ maxWidth: "100%" }} />;
                      }
                      // handle relation array
                      return (
                        <img src={img.null} style={{ maxWidth: "100%" }} />
                      );
                    }
                  )
                ) : (
                  <img
                    src={
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/3c623233-60de-4375-b93c-e5e3b5226cd5.png"
                    }
                    style={{ maxWidth: "100%" }}
                  />
                )}
              </Grid>
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={6 || 12}
                sm={12 || 12}
                md={12 || 12}
                xs={12 || 12}
                style={{ minHeight: "100px", width: "100%", padding: "25px" }}
                spacing={0}
              >
                <Typography
                  variant={"h2" || "body1"}
                  paragraph={false || false}
                  noWrap={false || false}
                  align={"inherit" || "inherit"}
                  color={"initial" || "initial"}
                  style={{}}
                >
                  Verified Skills
                </Typography>
                <Typography
                  variant={"body1" || "body1"}
                  paragraph={false || false}
                  noWrap={false || false}
                  align={"inherit" || "inherit"}
                  color={"initial" || "initial"}
                  style={{ marginTop: "25px" }}
                >
                  We test for front end and back end skills before candidates
                  reach you.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              onClick={() => {}}
              container={false}
              item={true}
              lg={12 || 12}
              sm={12 || 12}
              md={12 || 12}
              xs={12 || 12}
              style={{
                minHeight: "100px",
                padding: "25px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                background: "white"
              }}
              spacing={0}
            >
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={6 || 12}
                sm={12 || 12}
                md={12 || 12}
                xs={12 || 12}
                style={{ minHeight: "100px", width: "100%", padding: "25px" }}
                spacing={0}
              >
                <Typography
                  variant={"h2" || "body1"}
                  paragraph={false || false}
                  noWrap={false || false}
                  align={"inherit" || "inherit"}
                  color={"initial" || "initial"}
                  style={{}}
                >
                  Cost Effective
                </Typography>
                <Typography
                  variant={"body1" || "body1"}
                  paragraph={false || false}
                  noWrap={false || false}
                  align={"inherit" || "inherit"}
                  color={"initial" || "initial"}
                  style={{ marginTop: "25px" }}
                >
                  2nd round is much more cost effective than a typical recruiter
                  that charges up to 15% of the annual salary of the developer.
                  Efficiency is the key to our disruptive pricing structure.
                </Typography>
              </Grid>
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={6 || 12}
                sm={12 || 12}
                md={12 || 12}
                xs={12 || 12}
                style={{ minHeight: "100px", width: "100%", padding: "25px" }}
                spacing={0}
              >
                {Array.isArray(
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/e4b9d733-36a8-4e44-a3dd-4d28564778c9.png"
                ) ? (
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/e4b9d733-36a8-4e44-a3dd-4d28564778c9.png".map(
                    (img, idx) => {
                      // handle show all
                      if (!false && idx > 0) return null;
                      // handle array of strings
                      if (typeof img === "string") {
                        return <img src={img} style={{ maxWidth: "100%" }} />;
                      }
                      // handle relation array
                      return (
                        <img src={img.null} style={{ maxWidth: "100%" }} />
                      );
                    }
                  )
                ) : (
                  <img
                    src={
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/e4b9d733-36a8-4e44-a3dd-4d28564778c9.png"
                    }
                    style={{ maxWidth: "100%" }}
                  />
                )}
              </Grid>
            </Grid>
            <Grid
              onClick={() => {}}
              container={false}
              item={true}
              lg={12 || 12}
              sm={12 || 12}
              md={12 || 12}
              xs={12 || 12}
              style={{
                minHeight: "100px",
                padding: "25px",
                background:
                  "url(https://s3.wasabisys.com/noco-prod-5e2f1ec274555500183f4457/88978e8a-8410-48ad-b611-c0ea16def3ff.png)"
              }}
              spacing={0}
            >
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={12 || 12}
                sm={12 || 12}
                md={12 || 12}
                xs={12 || 12}
                style={{ minHeight: "100px", width: "100%", padding: "25px" }}
                spacing={0}
              >
                <Typography
                  variant={"h3" || "body1"}
                  paragraph={false || false}
                  noWrap={false || false}
                  align={"center" || "inherit"}
                  color={"initial" || "initial"}
                  style={{ color: "white" }}
                >
                  Our Customers
                </Typography>
              </Grid>
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={12 || 12}
                sm={12 || 12}
                md={12 || 12}
                xs={12 || 12}
                style={{
                  minHeight: "100px",
                  width: "100%",
                  padding: "25px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap"
                }}
                spacing={0}
              >
                <Grid
                  onClick={() => {}}
                  container={false}
                  item={true}
                  lg={4 || 12}
                  sm={12 || 12}
                  md={12 || 12}
                  xs={12 || 12}
                  style={{ minHeight: "100px", width: "100%", padding: "25px" }}
                  spacing={0}
                >
                  <Paper
                    elevation={1 || 1}
                    square={false || false}
                    style={{
                      minWidth: "100%",
                      minHeight: 100,
                      padding: "25px"
                    }}
                  >
                    <Grid
                      onClick={() => {}}
                      container={false}
                      item={true}
                      lg={12 || 12}
                      sm={12 || 12}
                      md={12 || 12}
                      xs={12 || 12}
                      style={{
                        minHeight: "100px",
                        width: "100%",
                        padding: "25px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap"
                      }}
                      spacing={0}
                    >
                      {Array.isArray(
                        "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/eb307c5c-6fcf-457c-b944-8f73280114b8.jpg"
                      ) ? (
                        "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/eb307c5c-6fcf-457c-b944-8f73280114b8.jpg".map(
                          (img, idx) => {
                            // handle show all
                            if (!false && idx > 0) return null;
                            // handle array of strings
                            if (typeof img === "string") {
                              return (
                                <img
                                  src={img}
                                  style={{
                                    maxWidth: "100px",
                                    borderRadius: "50px"
                                  }}
                                />
                              );
                            }
                            // handle relation array
                            return (
                              <img
                                src={img.null}
                                style={{
                                  maxWidth: "100px",
                                  borderRadius: "50px"
                                }}
                              />
                            );
                          }
                        )
                      ) : (
                        <img
                          src={
                            "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/eb307c5c-6fcf-457c-b944-8f73280114b8.jpg"
                          }
                          style={{ maxWidth: "100px", borderRadius: "50px" }}
                        />
                      )}
                      <Typography
                        variant={"caption" || "body1"}
                        paragraph={false || false}
                        noWrap={false || false}
                        align={"inherit" || "inherit"}
                        color={"initial" || "initial"}
                        style={{ marginTop: "25px" }}
                      >
                        We always run our own technical interviews, but the fact
                        that they've been tested before we speak with them has
                        saved us a TON of time.
                      </Typography>
                    </Grid>
                    <Grid
                      onClick={() => {}}
                      container={false}
                      item={true}
                      lg={12 || 12}
                      sm={12 || 12}
                      md={12 || 12}
                      xs={12 || 12}
                      style={{
                        minHeight: "100px",
                        width: "100%",
                        padding: "25px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap"
                      }}
                      spacing={0}
                    >
                      <Typography
                        variant={"h6" || "body1"}
                        paragraph={false || false}
                        noWrap={false || false}
                        align={"inherit" || "inherit"}
                        color={"initial" || "initial"}
                        style={{}}
                      >
                        Nezare Chafni
                      </Typography>
                      <Typography
                        variant={"overline" || "body1"}
                        paragraph={false || false}
                        noWrap={false || false}
                        align={"inherit" || "inherit"}
                        color={"initial" || "initial"}
                        style={{}}
                      >
                        CTO @ Trueface AI
                      </Typography>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid
                  onClick={() => {}}
                  container={false}
                  item={true}
                  lg={4 || 12}
                  sm={12 || 12}
                  md={12 || 12}
                  xs={12 || 12}
                  style={{ minHeight: "100px", width: "100%", padding: "25px" }}
                  spacing={0}
                >
                  <Paper
                    elevation={6 || 1}
                    square={false || false}
                    style={{
                      minWidth: "100%",
                      minHeight: 100,
                      padding: "50px"
                    }}
                  >
                    <Grid
                      onClick={() => {}}
                      container={false}
                      item={true}
                      lg={12 || 12}
                      sm={12 || 12}
                      md={12 || 12}
                      xs={12 || 12}
                      style={{
                        minHeight: "100px",
                        width: "100%",
                        padding: "25px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap"
                      }}
                      spacing={0}
                    >
                      {Array.isArray(
                        "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/9bdf89a2-22d6-4412-8fe1-9c4c8454f4c4.jpg"
                      ) ? (
                        "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/9bdf89a2-22d6-4412-8fe1-9c4c8454f4c4.jpg".map(
                          (img, idx) => {
                            // handle show all
                            if (!false && idx > 0) return null;
                            // handle array of strings
                            if (typeof img === "string") {
                              return (
                                <img
                                  src={img}
                                  style={{
                                    maxWidth: "100px",
                                    borderRadius: "50px"
                                  }}
                                />
                              );
                            }
                            // handle relation array
                            return (
                              <img
                                src={img.null}
                                style={{
                                  maxWidth: "100px",
                                  borderRadius: "50px"
                                }}
                              />
                            );
                          }
                        )
                      ) : (
                        <img
                          src={
                            "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/9bdf89a2-22d6-4412-8fe1-9c4c8454f4c4.jpg"
                          }
                          style={{ maxWidth: "100px", borderRadius: "50px" }}
                        />
                      )}
                      <Typography
                        variant={"caption" || "body1"}
                        paragraph={false || false}
                        noWrap={false || false}
                        align={"inherit" || "inherit"}
                        color={"initial" || "initial"}
                        style={{ marginTop: "25px" }}
                      >
                        2nd Round saves me about 40 hours per developer we hire.
                      </Typography>
                    </Grid>
                    <Grid
                      onClick={() => {}}
                      container={false}
                      item={true}
                      lg={12 || 12}
                      sm={12 || 12}
                      md={12 || 12}
                      xs={12 || 12}
                      style={{
                        minHeight: "100px",
                        width: "100%",
                        padding: "25px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap"
                      }}
                      spacing={0}
                    >
                      <Typography
                        variant={"h6" || "body1"}
                        paragraph={false || false}
                        noWrap={false || false}
                        align={"inherit" || "inherit"}
                        color={"initial" || "initial"}
                        style={{}}
                      >
                        Andrew Pierno
                      </Typography>
                      <Typography
                        variant={"overline" || "body1"}
                        paragraph={false || false}
                        noWrap={false || false}
                        align={"inherit" || "inherit"}
                        color={"initial" || "initial"}
                        style={{}}
                      >
                        CTO @ WiZR
                      </Typography>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              onClick={() => {}}
              container={true}
              item={false}
              lg={12 || 12}
              sm={12 || 12}
              md={12 || 12}
              xs={12 || 12}
              style={{
                minHeight: "100px",
                padding: "25px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap"
              }}
              spacing={0}
            >
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={6 || 12}
                sm={12 || 12}
                md={6 || 12}
                xs={6 || 12}
                style={{
                  minHeight: "100px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap"
                }}
                spacing={0}
              >
                <Grid
                  onClick={() => {}}
                  container={false}
                  item={true}
                  lg={6 || 12}
                  sm={12 || 12}
                  md={12 || 12}
                  xs={12 || 12}
                  style={{ minHeight: "100px", width: "100%", padding: "25px" }}
                  spacing={0}
                >
                  <Typography
                    variant={"h6" || "body1"}
                    paragraph={false || false}
                    noWrap={false || false}
                    align={"inherit" || "inherit"}
                    color={"initial" || "initial"}
                    style={{}}
                  >
                    Stay in the know
                  </Typography>
                  <Typography
                    variant={"body1" || "body1"}
                    paragraph={false || false}
                    noWrap={false || false}
                    align={"inherit" || "inherit"}
                    color={"initial" || "initial"}
                    style={{}}
                  >
                    Be first to see new candidates!
                  </Typography>
                </Grid>
                <Grid
                  onClick={() => {}}
                  container={false}
                  item={true}
                  lg={6 || 12}
                  sm={12 || 12}
                  md={12 || 12}
                  xs={12 || 12}
                  style={{ minHeight: "100px", width: "100%" }}
                  spacing={0}
                >
                  <EmailSignupForm />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              onClick={() => {}}
              container={true}
              item={false}
              lg={12 || 12}
              sm={12 || 12}
              md={12 || 12}
              xs={12 || 12}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                padding: "25px",
                height: "250px"
              }}
              spacing={0}
            >
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={4 || 12}
                sm={12 || 12}
                md={4 || 12}
                xs={12 || 12}
                style={{ minHeight: "100px", width: "100%", padding: "25px" }}
                spacing={0}
              >
                {Array.isArray(
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/2000b260-a97f-46e3-b2ed-3a34664e27c4.png"
                ) ? (
                  "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/2000b260-a97f-46e3-b2ed-3a34664e27c4.png".map(
                    (img, idx) => {
                      // handle show all
                      if (!false && idx > 0) return null;
                      // handle array of strings
                      if (typeof img === "string") {
                        return <img src={img} style={{ maxWidth: "100px" }} />;
                      }
                      // handle relation array
                      return (
                        <img src={img.null} style={{ maxWidth: "100px" }} />
                      );
                    }
                  )
                ) : (
                  <img
                    src={
                      "https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/2000b260-a97f-46e3-b2ed-3a34664e27c4.png"
                    }
                    style={{ maxWidth: "100px" }}
                  />
                )}
                <Typography
                  variant={"body1" || "body1"}
                  paragraph={false || false}
                  noWrap={false || false}
                  align={"inherit" || "inherit"}
                  color={"initial" || "initial"}
                  style={{ marginTop: "25px" }}
                >
                  © 2020 2nd Round
                </Typography>
              </Grid>
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={4 || 12}
                sm={12 || 12}
                md={4 || 12}
                xs={12 || 12}
                style={{ width: "100%", padding: "25px", height: "250px" }}
                spacing={0}
              >
                <Typography
                  variant={"h6" || "body1"}
                  paragraph={false || false}
                  noWrap={false || false}
                  align={"inherit" || "inherit"}
                  color={"initial" || "initial"}
                  style={{}}
                >
                  Company
                </Typography>
                <List
                  style={{}}
                  dense={true || false}
                  disablePadding={false || false}
                  subheader={"" || ""}
                >
                  <ListItem
                    dense={true || false}
                    disabled={undefined || false}
                    disableGutters={true || false}
                    divider={false}
                    button={false || false}
                  >
                    <ListItemText primary={"About"} />
                  </ListItem>

                  <ListItem
                    dense={true || false}
                    disabled={undefined || false}
                    disableGutters={true || false}
                    divider={false}
                    button={false || false}
                  >
                    <ListItemText primary={"Legal"} />
                  </ListItem>

                  <ListItem
                    dense={true || false}
                    disabled={undefined || false}
                    disableGutters={true || false}
                    divider={false}
                    button={undefined || false}
                  >
                    <ListItemText primary={"Privacy"} />
                  </ListItem>

                  <ListItem
                    dense={true || false}
                    disabled={undefined || false}
                    disableGutters={true || false}
                    divider={false}
                    button={undefined || false}
                  >
                    <ListItemText primary={"Compliance"} />
                  </ListItem>
                </List>
              </Grid>
              <Grid
                onClick={() => {}}
                container={false}
                item={true}
                lg={4 || 12}
                sm={12 || 12}
                md={4 || 12}
                xs={12 || 12}
                style={{ minHeight: "100px", width: "100%", padding: "25px" }}
                spacing={0}
              >
                <Typography
                  variant={"h6" || "body1"}
                  paragraph={false || false}
                  noWrap={false || false}
                  align={"inherit" || "inherit"}
                  color={"initial" || "initial"}
                  style={{}}
                >
                  Social
                </Typography>
                <Twitter
                  fontSize={"default" || "default"}
                  color={"primary" || "primary"}
                  style={{ marginTop: "25px" }}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(HomePage));
