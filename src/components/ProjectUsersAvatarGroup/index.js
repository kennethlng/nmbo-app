import AvatarGroup from '@material-ui/lab/AvatarGroup'; 
import Avatar from '@material-ui/core/Avatar';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase'; 
import * as DB from '../../constants/db'; 
import { ProjectUser } from '../../models/ProjectUser'; 
import { makeStyles } from '@material-ui/core/styles';
import { getDisplayNameEmojiAvatar } from '../../lib/getDisplayNameEmojiAvatar';
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
    avatar: {
        backgroundColor: grey['200']
    }
}))

export default function ProjectUsersAvatarGroup(props) {
    const { projectId } = props; 
    const classes = useStyles(); 
    const [users, setUsers] = useState([]); 

    useEffect(() => {
        if (projectId) {
            db.collection(DB.PROJECTS).doc(projectId).collection(DB.PROJECT_USERS).get()
                .then(function (querySnapshot) {
                    var arr = []; 
                    querySnapshot.forEach(function (doc) {
                        let user = new ProjectUser(doc); 
                        arr.push(user); 
                    })
                    setUsers(arr); 
                })
        }
    }, [projectId])

    return (
        <AvatarGroup max={4}>
            {users.map((user, index) => (
                <Avatar
                    key={index}
                    className={classes.avatar}
                    alt={user[DB.DISPLAY_NAME]}
                    src={user[DB.PHOTO_URL]}
                >
                    {getDisplayNameEmojiAvatar(user[DB.DISPLAY_NAME])}
                </Avatar>
            ))}
        </AvatarGroup>
    )
}