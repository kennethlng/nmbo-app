import React, { useEffect, useState } from 'react';
import ProjectTasksList from '../ProjectTasksList'; 
import { Task } from '../../models/Task'; 
import * as DB from '../../constants/db';
import * as LIST_ID from '../../constants/listId';
import * as LIST_NAME from '../../constants/listName'; 
import { db, firebase } from '../../lib/firebase';
import { useRouter } from 'next/router'
import NoTasksPlaceholder from './NoTasksPlaceholder'; 
import CircularProgress from '@material-ui/core/CircularProgress';

export default function ProjectTasks(props) {
    const { projectId } = props; 
    const router = useRouter();
    const [tasks, setTasks] = useState([]); 
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        // Log Google Analytics event for view_item_list
        firebase.analytics().logEvent('view_item_list', {
            item_list_id: LIST_ID.PROJECT_TASKS,
            item_list_name: LIST_NAME.PROJECT_TASKS
        })

        setLoading(true); 

        var unsubscribe = db.collection(DB.PROJECTS).doc(router.query.id).collection(DB.PROJECT_TASKS).onSnapshot(function(querySnapshot) {
            var arr = []; 
            querySnapshot.forEach(function(doc) {
                let task = new Task(doc); 
                arr.push(task);
            })
            setTasks(arr); 

            setLoading(false); 
        })

        return () => unsubscribe();
    }, [projectId])

    const completedTasks = () => {
        let arr = tasks.filter(task => task[DB.IS_COMPLETED]);
        return arr;
    }

    return (
        loading ? <CircularProgress/> : (
            tasks.length > 0 ? (
                <ProjectTasksList
                    tasks={tasks}
                />
            ) : null
        )
    )
}