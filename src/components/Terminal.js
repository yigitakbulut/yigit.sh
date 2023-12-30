import React, {useContext} from 'react';
import TerminalContext from '../context/TerminalContext';
import Draggable from 'react-draggable';
import CommandInput from './CommandInput';
import OutputDisplay from './OutputDisplay';

export default function Terminal() {
    const { output } = useContext(TerminalContext);
    return (
        <Draggable bounds='parent'>
            <div className="bg-black w-full max-w-4xl rounded-lg shadow-lg overflow-hidden terminal-effect">
                <div className="p-4 text-green-400 bg-gray-800 font-mono flex justify-between items-center">
                    <span>Terminal</span>
                    <span>yigit.sh/</span>
                </div>
                <OutputDisplay output={output} />
                <CommandInput/>
            </div>
        </Draggable>
    );
}