import { createMuiTheme } from '@material-ui/core/styles'

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
            default: '#fff',
        }
    },
    typography: {
        h1: {
            fontWeight: 700
        },
        h3: {
            fontWeight: 700,
            color: '#4a4a4a'
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
            textTransform: 'capitalize',
            fontWeight: 900
        }
    },
    shape: {
        borderRadius: 12
    }
})

export default theme; 