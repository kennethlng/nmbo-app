import React from 'react'; 
import ProjectTasksListRow from '../ProjectTasksListRow'; 

export default function ProjectTasksList(props) {
    const { tasks } = props; 

    return (
        <div>
            {tasks.map(task => (
                <ProjectTasksListRow
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    )
}