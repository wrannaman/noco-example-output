
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { withStyles } from '@material-ui/core/styles';
import Router, { withRouter } from 'next/router';
import Dropzone from 'react-dropzone';
import { IconButton, Tooltip, Button, CircularProgress, Typography } from '@material-ui/core';
import config from '../config';

const { s3: { bucket } } = config;

import { getPresignedURL, getMedia, makePublic } from '../src/apiCalls/media'
const styles = theme => ({
  root: {
  },
  drop: {
    width: '90%',
    height: 200,
    padding: '10%',
    margin: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const uploadFile = (file, url) => new Promise(async (resolve, reject) => {
  try {
    const res = await fetch(url, {
      method: 'PUT',
      body: file
    });
    return resolve(res);
  } catch (e) {
    return reject('Upload failed');
  }
});

@inject('store')
@observer
class FileUpload extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      waiting: false,
    };
    this.count = 0;
  }

  handleFile = async (f) => {
    const {
      snack: { snacky },
    } = this.props.store;
    try {
      const pre = await getPresignedURL({ fileName: f.name, fileType: f.type })
      const { presigned, fileName } = pre;
      const up = await uploadFile(f, presigned);
      const key = presigned.split(bucket)[1].split('?')[0].replace('/', '');
      const fullPath = presigned.split('?')[0];
      const save = this.props.saveMedia(fullPath);
      await makePublic({ key });
      snacky(`Uploaded ${f.name}`);
    } catch (e) {
      console.log('ereror ', e);
      snacky(`Upload failed for ${f.name}`, 'error');
    }
    this.count -= 1;
    if (this.count === 0) this.setState({ waiting: false });
  }

  handleAcceptedFiles = (prop) => {
    if (!prop) return ["image/*", "video/*", "application/*"]
    const clone = prop.replace(', misc', ', application, text').replace(/,/g, '/*,').split(', ').map(item => {
      if (item.indexOf('/*') === -1) item += '/*';
      return item;
    });
    return clone;
  }

  handleChange = (files) => {
    const { maxFileSize, filesLimit } = this.props;
    const { snack: { snacky } } = this.props.store;

    if (files.length > filesLimit) return snacky(`You've exceeded the files limit of ${filesLimit}`, 'error')

    this.count = files.length;

    files.forEach(file => {
      // check max file size
      if (file.size > maxFileSize) return snacky(`You've exceeded the files size of ${maxFileSize}`, 'error')
      this.handleFile(file);
    });
    this.setState({ waiting: true });

    setTimeout(() => {
      this.setState({ waiting: false });
    }, 500);
  }


  render() {
    const { classes, files, className } = this.props;
    const { waiting } = this.state;

    return (
      <React.Fragment>
        {!waiting && (
          <Dropzone onDrop={this.handleChange}>
            {({getRootProps, getInputProps}) => (
              <div {...getRootProps()} className={className || classes.dropZone} style={{ ...this.props.style }}>
                <input {...getInputProps()} />
                <Typography variant="body1">
                  {this.props.message}
                </Typography>
              </div>
            )}
          </Dropzone>
        )}
        {waiting && (
          <div style={{ width: '100%', height: 250, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress color="secondary" style={{ margin: '0 auto' }} />
          </div>
        )}
        {!waiting && files && !Array.isArray(files) && (
          <Typography variant="body2">
            1 file attached
          </Typography>
        )}
        {!waiting && files && Array.isArray(files) && (
          <Typography variant="body2">
            {files.length} files attached
          </Typography>
        )}
      </React.Fragment>
    )
  }

}

FileUpload.defaultProps = {
  onClick: () => {
  },
  saveMedia: () => {
    console.log('no action');
  }
}

FileUpload.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(FileUpload));
