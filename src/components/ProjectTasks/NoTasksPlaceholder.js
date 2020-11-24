import React from 'react';
import Box from '@material-ui/core/Box'; 
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default function NoTasksPlaceholder() {
    return (
        <Box my={12}>
            <Grid container justify="center" alignItems="center">
                <Grid item>
                    <Typography variant="body1">
                        ☝️ Add your first task!
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}