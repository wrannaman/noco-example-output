import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { withStyles } from "@material-ui/core/styles";
import Router, { withRouter } from "next/router";
import * as cfg from "../config";
import {
  Grid,
  Typography,
  TextField,
  Switch,
  Button,
  FormHelperText,
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
  InputLabel,
  IconButton,
  Tooltip
} from "@material-ui/core";

import { createCompany } from "../src/apiCalls/company";

const isForm = true;

const styles = theme => ({
  root: {}
});

@inject("store")
@observer
class CompanyForm extends React.Component {
  state = {};

  componentDidMount() {
    this.init();
  }

  init = async () => {};

  update = (name, type, modelRelation = "") => (e, value) => {
    const {
      company: { company, update }
    } = this.props.store;
    const clone = Object.assign({}, toJS(company));
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

    update("company", clone);
  };

  submit = async e => {
    e.preventDefault();
    const {
      company: { company, reset },
      snack: { snacky },
      auth: { user }
    } = this.props.store;
    const clone = toJS(company);
    if (typeof clone.userId !== "undefined") clone.userId = user.id;
    console.log("clone", clone);
    const res = await createCompany(clone);
    console.info("createCompany response", res);
    if (res && res.errors) {
      snacky(res.errors.join(" "), "error", 6000);
    } else if (res && res.success) {
      snacky("Company saved.");
      reset();
    } else {
      snacky("Something went wrong. The company was NOT saved.", "error");
    }
  };

  render() {
    const { classes, router } = this.props;
    const {
      auth: { user }
    } = this.props.store;
    const {
      company: { company }
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
              variant={"h4" || "body1"}
              paragraph={false || false}
              noWrap={false || false}
              align={"inherit" || "inherit"}
              color={"initial" || "initial"}
              style={{}}
            >
              Hire With 2nd Round!
            </Typography>
            <Typography
              variant={"body1" || "body1"}
              paragraph={false || false}
              noWrap={false || false}
              align={"inherit" || "inherit"}
              color={"initial" || "initial"}
              style={{ marginTop: "25px" }}
            >
              After you join, you'll be able to see candidates.
            </Typography>
          </Grid>
          <Grid
            onClick={() => {}}
            container={false}
            item={true}
            lg={6 || 12}
            sm={12 || 12}
            md={6 || 12}
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
            <FormControl style={{}} required={true}>
              <TextField
                style={{}}
                fullWidth={false || false}
                helperText={"Company Name" || "Helper Text"}
                placeholder={"Company Name" || "Placeholder"}
                margin={"normal" || "normal"}
                label={"Company Name" || "Text Field"}
                name={"Company Name" || "Text Field"}
                color={"primary" || "primary"}
                multiline={false || false}
                required={true}
                rows={1 || 1}
                rowsMax={1 || 1}
                type={"text" || "text"}
                variant={"standard" || "standard"}
                onChange={this.update("name", "text")}
                value={company.name}
              />
            </FormControl>
            <FormControl style={{}} required={true}>
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
                required={true}
                rows={1 || 1}
                rowsMax={1 || 1}
                type={"text" || "text"}
                variant={"standard" || "standard"}
                onChange={this.update("email", "text")}
                value={company.email}
              />
            </FormControl>
            <FormControl style={{}} required={true}>
              <TextField
                style={{}}
                fullWidth={false || false}
                helperText={"How Many Developers Do You Need?" || "Helper Text"}
                placeholder={
                  "How Many Developers Do You Need?" || "Placeholder"
                }
                margin={"normal" || "normal"}
                label={"Hiring How Many Devs?" || "Text Field"}
                name={"How Many Developers" || "Text Field"}
                color={"primary" || "primary"}
                multiline={false || false}
                required={true}
                rows={1 || 1}
                rowsMax={1 || 1}
                type={"number" || "text"}
                variant={"standard" || "standard"}
                onChange={this.update("howManyHires", "number")}
                value={company.howManyHires}
              />
            </FormControl>
          </Grid>
          <Grid
            onClick={() => {}}
            container={false}
            item={true}
            lg={6 || 12}
            sm={12 || 12}
            md={6 || 12}
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
            <FormControl
              component="fieldset"
              className={classes.formControl}
              style={{}}
              required={true}
            >
              <FormGroup style={{}}>
                <FormControlLabel
                  control={
                    <Switch
                      color={"primary"}
                      size={"medium"}
                      onChange={this.update("frontEnd", "check")}
                      checked={company.frontEnd}
                      value={"frontEnd"}
                    />
                  }
                  label={"Front-End"}
                />
              </FormGroup>
            </FormControl>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              style={{}}
              required={true}
            >
              <FormGroup style={{}}>
                <FormControlLabel
                  control={
                    <Switch
                      color={"primary"}
                      size={"medium"}
                      onChange={this.update("backEnd", "check")}
                      checked={company.backEnd}
                      value={"backEnd"}
                    />
                  }
                  label={"Back End"}
                />
              </FormGroup>
            </FormControl>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              style={{}}
              required={true}
            >
              <FormGroup style={{}}>
                <FormControlLabel
                  control={
                    <Switch
                      color={"primary"}
                      size={"medium"}
                      onChange={this.update("fullStack", "check")}
                      checked={company.fullStack}
                      value={"fullStack"}
                    />
                  }
                  label={"Full Stack"}
                />
              </FormGroup>
            </FormControl>
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
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

CompanyForm.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(CompanyForm));
