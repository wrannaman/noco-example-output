import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { withStyles } from "@material-ui/core/styles";
import Router, { withRouter } from "next/router";
import * as cfg from "../config";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip
} from "@material-ui/core";

import { createEmail } from "../src/apiCalls/email";

const isForm = true;

const styles = theme => ({
  root: {}
});

@inject("store")
@observer
class EmailSignupForm extends React.Component {
  state = {};

  componentDidMount() {
    this.init();
  }

  init = async () => {};

  update = (name, type, modelRelation = "") => (e, value) => {
    const {
      email: { email, update }
    } = this.props.store;
    const clone = Object.assign({}, toJS(email));
    if (type === "text") clone[name] = e.target.value;
    if (type === "number") clone[name] = Number(e.target.value);
    if (
      type === "file" &&
      (modelRelation === "hasMany" || modelRelation === "array")
    ) {
      // it's already an array
      if (Array.isArray(clone[name])) clone[name].push(e);
      else clone[name] = [e];
    } else if (type === "file") {
      clone[name] = e;
    }
    if (type === "check") clone[name] = e.target.checked;
    if (type === "date") clone[name] = e;
    if (type === "slide") clone[name] = value;

    update("email", clone);
  };

  submit = async e => {
    e.preventDefault();
    const {
      email: { email, reset },
      snack: { snacky },
      auth: { user }
    } = this.props.store;
    const clone = toJS(email);
    if (typeof clone.userId !== "undefined") clone.userId = user.id;
    console.log("clone", clone);
    const res = await createEmail(clone);
    console.info("createEmail response", res);
    if (res && res.errors) {
      snacky(res.errors.join(" "), "error", 6000);
    } else if (res && res.success) {
      snacky("Email saved.");
      reset();
    } else {
      snacky("Something went wrong. The email was NOT saved.", "error");
    }
  };

  render() {
    const { classes, router } = this.props;
    const {
      auth: { user }
    } = this.props.store;
    const {
      email: { email }
    } = this.props.store;
    return (
      <form onSubmit={this.submit}>
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
          <FormControl style={{}} required={false}>
            <TextField
              style={{}}
              fullWidth={false || false}
              helperText={"Email" || "Helper Text"}
              placeholder={"Email" || "Placeholder"}
              margin={"normal" || "normal"}
              label={"Email" || "Text Field"}
              name={"Email" || "Text Field"}
              color={"primary" || "primary"}
              multiline={false || false}
              required={false}
              rows={1 || 1}
              rowsMax={1 || 1}
              type={"text" || "text"}
              variant={"standard" || "standard"}
              onChange={this.update("email", "text")}
              value={email.email}
            />
          </FormControl>

          <Button
            style={{}}
            variant={"contained" || "contained"}
            onClick={() => {}}
            color={"primary" || "primary"}
            size={"medium" || "medium"}
            type={"submit"}
            fullWidth={false || false}
            formSubmit={true || false}
          >
            Subscribe
          </Button>
        </Grid>
      </form>
    );
  }
}

EmailSignupForm.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(EmailSignupForm));
