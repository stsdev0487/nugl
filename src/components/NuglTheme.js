// theme docs: https://material-ui-next.com/customization/theme-default/
// http://www.0to255.com for light and dark (+/- 3)
// http://hex2rgba.devoth.com/ hex to rgba
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#00A1E4',
      light: '#2EB2E8',
      dark: '#0084BB',
    },
    secondary: {
      main: '#EB008B',
      light: '#EE2EA0',
      dark: '#C10072',
    },
    tertiary: {
      main: '#04E762',
      light: '#31EB7E',
      dark: '#04BE51',
    },
    statuses: {
      submitted: '#F8B60F',
      declined: '#F62400',
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: 'none',
        backgroundColor: '#ffffff',
      },
      colorPrimary: {
        color: '#fff',
        height: '100%',
        width: '100%',
        background: '#1c2938 !important',
      },
    },
    MuiTab: {
      label: {
        textTransform: 'none',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
      },
      raised: {
        borderRadius: 20,
      },
      outlined: {
        borderRadius: 20,
        backgroundColor: '#fff',
        color: '#00A1E4',
        fill: '#00A1E4',
        borderColor: '#00A1E4',
      },
      raisedPrimary: {
        color: '#fff',
      },
      raisedSecondary: {
        color: '#fff',
      },
    },
  },
})

export default theme
