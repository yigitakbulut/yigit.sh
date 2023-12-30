import React, {useContext} from 'react';
import TerminalContext from '../context/TerminalContext';

export default function OutputDisplay() {
    const { output } = useContext(TerminalContext);
    return (
        <div className="p-4 text-green-400 font-mono text-sm">
            {output.map((line, index) => (
                <p key={index}>
                    {line.text}
                    {line.timestamp && (
                        <span className="float-right">
                            {line.timestamp}
                        </span>
                    )}
                </p>
            ))}
        </div>
    );
}