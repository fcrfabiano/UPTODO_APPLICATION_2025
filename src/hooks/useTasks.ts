// -- IMPORTS

import { TaskContext } from '../context/TaskContext';
import { useContext } from 'react';

// -- FUNCTIONS

export function useTasks(
    )
{
    const taskContext = useContext( TaskContext );

    if ( !taskContext )
    {
        throw new Error( 'useTasks must be used within TaskProvider' );
    }

    return taskContext;
}