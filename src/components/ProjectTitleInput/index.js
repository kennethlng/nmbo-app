import React, { useEffect, useState } from 'react'
import { db } from '../../lib/firebase'
import * as DB from '../../constants/db'
import { useRouter } from 'next/router'
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles} from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    input: {
        fontWeight: 900,
        fontSize: 35,
        color: grey['800']
    }
}))

export default function ProjectTitleInput(props) {
    const { initialValue } = props;
    const router = useRouter(); 
    const classes = useStyles(); 
    const [title, setTitle] = useState(''); 
    const [currentTitle, setCurrentTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        setCurrentTitle(initialValue);
        setTitle(initialValue);
    }, [initialValue])

    const updateProject = () => {
        if (isLoading || title === currentTitle) return;

        setIsLoading(true); 

        db.collection(DB.PROJECTS).doc(router.query.id).set({
            title
        }, { merge: true })
        .then(function() {
            setIsLoading(false); 

            setCurrentTitle(title);
        })
        .catch(function(error) {
            setIsLoading(false); 

            console.error("Error adding document: ", error)
        });
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.target.blur(); 
        }
    }
    
    const handleBlur = () => {
        updateProject();
    } 

    return (
        <FormControl>
            <InputBase
                className={classes.input}
                placeholder="Checklist name"
                inputProps={{ 'aria-label': 'naked' }}
                value={title}
                multiline
                rowsMax={4}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                endAdornment={
                    title === currentTitle ? null : (
                        <InputAdornment position="end">
                            <Button
                                color="primary"
                                disableElevation
                                disableRipple
                            >
                                Save
                            </Button>
                        </InputAdornment>
                    )
                }
            />
            <FormHelperText>Tap checklist name to edit</FormHelperText>
        </FormControl>
    )
}