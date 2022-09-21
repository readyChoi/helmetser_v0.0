import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { COLORS } from './components/Theme'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import axios from 'axios';
import { RNListener } from './components/RNListener';

axios.defaults.withCredentials = true;

declare module "@material-ui/core/styles/createTypography" {
  interface Typography {
    login_blue: React.CSSProperties;
    login_orange: React.CSSProperties;
    water_blue: React.CSSProperties;
    desc: React.CSSProperties;
  }

  interface TypographyOptions {
    login_blue: React.CSSProperties;
    login_orange: React.CSSProperties;
    water_blue: React.CSSProperties;
    desc: React.CSSProperties;
  }
}

declare module '@material-ui/core/styles/createPalette' {
  // allow configuration using `createMuiTheme`
  interface Palette {
    water_blue: PaletteColor,
    pumpkin: PaletteColor,
    white: PaletteColor,
    pink: PaletteColor,
    blue_grey: PaletteColor,
    slate_grey: PaletteColor,
    charcoal_grey: PaletteColor,
  }
  interface PaletteOptions {
    water_blue?: PaletteColorOptions,
    pumpkin?: PaletteColorOptions,
    white?: PaletteColorOptions,
    pink?: PaletteColorOptions,
    blue_grey?: PaletteColorOptions,
    slate_grey?: PaletteColorOptions,
    charcoal_grey?: PaletteColorOptions,
  }
};


declare module "@material-ui/core/Typography/Typography" {
  interface TypographyPropsVariantOverrides {
    login_blue: true;
    login_orange: true;
    color: true;
    desc: true;
  }
}

const theme = createMuiTheme({

  palette: {
    water_blue: {
      main: '#1291d9',
    },
    pumpkin: {
      main: '#ef7d00',
    },
    white: {
      main: '#ffffff',
    },
    pink: {
      main: '#e4e4e4',
    },
    blue_grey: {
      main: '#ced4da',
    },
    slate_grey: {
      main: '#525a67',
    },
    charcoal_grey: {
      main: '#313840',
    },

  },

  typography: {
    login_blue: {
      fontSize: 30,
      // color : `${COLORS.WATER_BLUE}`
    },
    login_orange: {
      fontSize: 30,
      color: `${COLORS.PUMPKIN}`
    },
    water_blue: {
      fontSize: 30,
      color: `${COLORS.PUMPKIN}`
    },

    desc: {
      fontFamily: 'NanumR',
      color: `${COLORS.BROWNISH_GREY}`,
      fontSize: 14
    },


    h6: {
      fontFamily: 'NanumR',
      fontWeight: 'bold',
      fontSize: '7vw'
    },
    h5: {
      fontFamily: 'NanumR',
      fontSize: '6.5vw'
    },
    h4: {
      fontFamily: 'NanumR',
      fontSize: '5vw'
    },
    h3: {
      fontFamily: 'NanumR',
      fontSize: '4vw',
      color: '#ffffff',
    },
    h2: {
      fontFamily: 'NanumR',
      fontSize: '3.75vw'
    },
    h1: {
      fontFamily: 'NanumR',
      color: `${COLORS.BROWNISH_GREY}`,
      fontSize: '3.2vw',
      lineHeight: 1.8,
    }
  }

})

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void
    }
  }
}


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RNListener/>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();