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
import FileUpload from "../components/FileUpload";

import { createApplicant } from "../src/apiCalls/applicant";

const isForm = true;

const styles = theme => ({
  root: {}
});

@inject("store")
@observer
class ApplicantFormForm extends React.Component {
  state = {};

  componentDidMount() {
    this.init();
  }

  init = async () => {};

  update = (name, type, modelRelation = "") => (e, value) => {
    const {
      applicant: { applicant, update }
    } = this.props.store;
    const clone = Object.assign({}, toJS(applicant));
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

    update("applicant", clone);
  };

  submit = async e => {
    e.preventDefault();
    const {
      applicant: { applicant, reset },
      snack: { snacky },
      auth: { user }
    } = this.props.store;
    const clone = toJS(applicant);
    if (typeof clone.userId !== "undefined") clone.userId = user.id;
    console.log("clone", clone);
    const res = await createApplicant(clone);
    console.info("createApplicant response", res);
    if (res && res.errors) {
      snacky(res.errors.join(" "), "error", 6000);
    } else if (res && res.success) {
      snacky("Applicant saved.");
      reset();
    } else {
      snacky("Something went wrong. The applicant was NOT saved.", "error");
    }
  };

  render() {
    const { classes, router } = this.props;
    const {
      auth: { user }
    } = this.props.store;
    const {
      applicant: { applicant }
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
              Apply
            </Typography>
            <Typography
              variant={"body1" || "body1"}
              paragraph={false || false}
              noWrap={false || false}
              align={"inherit" || "inherit"}
              color={"initial" || "initial"}
              style={{ marginTop: "25px" }}
            >
              After you apply, we'll contact you to set up the 30 minute
              technical interview.
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
                helperText={"Name" || "Helper Text"}
                placeholder={"Name" || "Placeholder"}
                margin={"normal" || "normal"}
                label={"Name" || "Text Field"}
                name={"Your Name" || "Text Field"}
                color={"primary" || "primary"}
                multiline={false || false}
                required={true}
                rows={1 || 1}
                rowsMax={1 || 1}
                type={"text" || "text"}
                variant={"standard" || "standard"}
                onChange={this.update("name", "text")}
                value={applicant.name}
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
                value={applicant.email}
              />
            </FormControl>
            <FormControl style={{}} required={true}>
              <TextField
                style={{}}
                fullWidth={false || false}
                helperText={"When Can You Start?" || "Helper Text"}
                placeholder={"When Can You Start?" || "Placeholder"}
                margin={"normal" || "normal"}
                label={"When Can You Start?" || "Text Field"}
                name={"When Can You Start?" || "Text Field"}
                color={"primary" || "primary"}
                multiline={false || false}
                required={true}
                rows={1 || 1}
                rowsMax={1 || 1}
                type={"text" || "text"}
                variant={"standard" || "standard"}
                onChange={this.update("start", "text")}
                value={applicant.start}
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
              required={false}
            >
              <FormGroup style={{}}>
                <FormControlLabel
                  control={
                    <Switch
                      color={"primary"}
                      size={"medium"}
                      onChange={this.update("frontEnd", "check")}
                      checked={applicant.frontEnd}
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
              required={false}
            >
              <FormGroup style={{}}>
                <FormControlLabel
                  control={
                    <Switch
                      color={"primary"}
                      size={"medium"}
                      onChange={this.update("backEnd", "check")}
                      checked={applicant.backEnd}
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
              required={false}
            >
              <FormGroup style={{}}>
                <FormControlLabel
                  control={
                    <Switch
                      color={"primary"}
                      size={"medium"}
                      onChange={this.update("fullStack", "check")}
                      checked={applicant.fullStack}
                      value={"fullStack"}
                    />
                  }
                  label={"Full Stack"}
                />
              </FormGroup>
            </FormControl>
            <FormControl
              component="fieldset"
              className={classes.formControl}
              style={{}}
              required={false}
            >
              <FormGroup style={{}}>
                <FormControlLabel
                  control={
                    <Switch
                      color={"primary"}
                      size={"medium"}
                      onChange={this.update("authorized", "check")}
                      checked={applicant.authorized}
                      value={"authorized"}
                    />
                  }
                  label={"Are you authorized to work in the US?"}
                />
              </FormGroup>
            </FormControl>
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
              <FileUpload
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "25px",
                  margin: "10px",
                  border: "1px solid #000",
                  borderRadius: "5px"
                }}
                message={"Upload Your Resume"}
                maxFileSize={5000000}
                filesLimit={1}
                acceptedFiles={"misc"}
                boundValues={{
                  model: "applicant",
                  field: "resume",
                  id: "5e458c3174bf10001944f2a6",
                  type: "text"
                }}
                files={applicant.resume}
                saveMedia={this.update("resume", "file", "")}
              />
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

ApplicantFormForm.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ApplicantFormForm));
