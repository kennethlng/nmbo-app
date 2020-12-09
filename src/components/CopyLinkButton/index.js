import Button from '@material-ui/core/Button';
import { useContext } from 'react';
import { AppStateContext } from '../AppState';

export default function CopyLinkButton(props) {
    const { link } = props;
    const appState = useContext(AppStateContext); 

    const handleClick = () => {
        copyToClipboard(); 

        appState.setSnackbarMessage("Link copied to clipboard!");
        appState.setSnackbarOpen(true); 
    }

    const copyToClipboard = () => navigator.clipboard.writeText(link); 

    return (
        <Button
            onClick={handleClick}
            disableElevation
            variant="contained"
        >
            Copy link
        </Button>
    )
}