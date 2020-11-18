import React from 'react'; 
import ProjectTasksListRow from '../ProjectTasksListRow'; 
import List from '@material-ui/core/List';

export default function ProjectTasksList(props) {
    const { tasks } = props; 

    return (
        <List>
            {tasks.map(task => (
                <ProjectTasksListRow
                    key={task.id}
                    task={task}
                />
            ))}
        </List>
    )
}