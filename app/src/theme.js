import {
  createMuiTheme
} from '@material-ui/core/styles';
const theme = createMuiTheme({
  "typography": {
    "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
  },
  "palette": {
    "type": "light",
    "primary": {
      "main": "#f44685",
      "light": "rgb(117, 138, 254)",
      "dark": "rgb(58, 76, 177)",
      "contrastText": "#ffffff"
    },
    "secondary": {
      "main": "#c45263",
      "light": "rgb(83, 147, 255)",
      "dark": "rgb(28, 84, 178)",
      "contrastText": "#ffffff"
    },
    "background": {
      "paper": "#fff",
      "default": "#fafafa"
    },
    "text": {
      "primary": "rgba(0, 0, 0, 0.87)",
      "secondary": "rgba(0, 0, 0, 0.54)"
    }
  }
});
export default theme;