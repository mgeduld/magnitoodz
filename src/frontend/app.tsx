import * as React from 'react'

interface IProps {
    name: string;
    age?: number;
}

export const App: React.SFC<IProps> = ({ name, age }) => {
    return (
        <div>
            <p>name: {name}</p>
            <p>age: {age || 'unknown'}</p>
        </div>
    )
} 
