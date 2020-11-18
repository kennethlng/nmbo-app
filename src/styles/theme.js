import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FF8370',
            contrastText: 'white'
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
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
            'Assistant',
            'sans-serif'
        ].join(','),
        button: {
            textTransform: 'capitalize',
            fontWeight: 700
        }
    },
    shape: {
        borderRadius: 12
    }
})

export default theme; 