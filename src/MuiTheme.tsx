import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  zIndex: {
    drawer: 1100,
    appBar: 1200,
  },
  palette: {
    primary: {
      main: "rgb(6, 170, 187)",
      contrastText: "rgb(255, 255, 255)",
    },
  },
  typography: {    
    button: {
      textTransform: 'none',
    },
  },
});
export default theme;