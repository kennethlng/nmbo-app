import React, { useEffect, useState } from 'react';
import ProjectTasksList from '../ProjectTasksList'; 
import { Task } from '../../models/Task'; 
import * as DB from '../../constants/db';
import { db } from '../../lib/firebase';
import { useRouter } from 'next/router'
import NoTasksPlaceholder from './NoTasksPlaceholder'; 

export default function ProjectTasks() {
    const router = useRouter();
    const [tasks, setTasks] = useState([]); 
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
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
    }, [])

    const completedTasks = () => {
        let arr = tasks.filter(task => task[DB.IS_COMPLETED]);
        return arr;
    }

    return (
        loading ? <progress className="progress is-small is-primary" max="100">15%</progress> : (
            tasks.length > 0 ? (
                <div className="mb-6 pb-6">
                    <ProjectTasksList
                        tasks={tasks.filter(task => !task[DB.IS_COMPLETED])}
                    />
                    {completedTasks().length > 0 ? (
                        <div>
                            <div className="divider">🥳</div>
                            <ProjectTasksList
                                tasks={completedTasks()}
                            />
                        </div>
                    ) : null }
                </div>
            ) : <NoTasksPlaceholder/>
        )
    )
}