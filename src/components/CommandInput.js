import React, {useContext} from 'react';
import TerminalContext from '../context/TerminalContext';

export default function CommandInput() {
    const { input, setInput, history, setHistoryIndex, historyIndex, currentDir, processCommand } = useContext(TerminalContext);
    const handleEnterKey = () => {
        if (input.trim() === '!!') {
            setInput(history[history.length - 1]?.input || '');
        } else if (input.trim().startsWith('!')) {
            const index = parseInt(input.trim().substring(1));
            if (!isNaN(index) && index < history.length) {
                setInput(history[index]?.input || '');
            }
        } else {
            processCommand(input.trim());
            setInput('');
            setHistoryIndex(history.length); // Reset the history index when a new command is entered
        }
    };

    const handleArrowUpKey = () => {
        setHistoryIndex((prevIndex) => Math.max(0, prevIndex - 1));
        setInput(history[historyIndex].input); // Set the input to the previous command
    };

    const handleArrowDownKey = () => {
        setHistoryIndex((prevIndex) => Math.min(history.length - 1, prevIndex + 1));
        setInput(history[historyIndex].input); // Set the input to the next command
    };

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'Enter':
                handleEnterKey();
                break;
            case 'ArrowUp':
                handleArrowUpKey();
                break;
            case 'ArrowDown':
                handleArrowDownKey();
                break;
            default:
                if (e.ctrlKey && e.key === 'c') {
                    setInput('');
                } else if (e.ctrlKey && e.key === 'l') {
                    processCommand('clear');
                }
                break;
        }
    };

    const handleInputChange = (e) => {
        let value = e.target.value;
        if (value === '!! ') {
            value = (history[history.length - 1]?.input || '') + ' ';
        }
        setInput(value);
    };

    return (
        <div className="flex items-center p-4">
            <span className="text-green-400" style={{"margin-right": "10px"}}>{`user@yigit.sh:${currentDir}$`}</span>
            <input
                autoFocus
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="bg-black text-green-400 outline-none w-full"
            />
        </div>
    );
}