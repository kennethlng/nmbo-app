import ProjectUsersList from '../ProjectUsersList'; 
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase'; 
import * as DB from '../../constants/db'; 
import { ProjectUser } from '../../models/ProjectUser'; 

export default function ProjectUsersDialog(props) {
    const { projectId, open, onClose } = props; 
    const [projectUsers, setProjectUsers] = useState([]); 

    useEffect(() => {
        if (projectId) {
            db.collection(DB.PROJECTS).doc(projectId).collection(DB.PROJECT_USERS).get()
                .then(function (querySnapshot) {
                    var arr = [];
                    querySnapshot.forEach(function (doc) {
                        let obj = new ProjectUser(doc);
                        arr.push(obj);
                    })
                    setProjectUsers(arr);
                })
        }
    }, [projectId])

    const handleClose = () => {
        onClose(); 
    }
    
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Members</DialogTitle>
            <ProjectUsersList
                projectUsers={projectUsers}
            />
        </Dialog>
    )
}