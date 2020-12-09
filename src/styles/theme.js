import { createMuiTheme } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FF8370',
            contrastText: 'white'
        },
        secondary: {
            main: '#91C499',
        },
        background: {
            // default: '#fff',
        },
        text: {
            primary: grey['800']  
        }
    },
    typography: {
        h1: {
            fontWeight: 900
        },
        h2: {
            fontWeight: 900
        },
        h3: {
            fontWeight: 900
        },
        h4: {
            fontWeight: 800
        },
        h5: {
            fontWeight: 700
        },
        h6: {
            fontWeight: 700
        },
        subtitle1: {
            fontSize: 25,
            color: grey['500']
        },
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Assistant',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(','),
        button: {
            textTransform: 'none',
            fontWeight: 900
        }
    },
    shape: {
        borderRadius: 12
    }
})

export default theme; 