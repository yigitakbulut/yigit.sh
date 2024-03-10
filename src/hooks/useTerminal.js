import { useState, useEffect, useRef } from 'react';
import { commands } from '../commands/index';

export default function useTerminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(['Welcome to My Terminal. Type "help" for commands.']);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [currentDir, setCurrentDir] = useState('/');
  const hasTypedRef = useRef(false);

  useEffect(() => {
    if (!hasTypedRef.current) {
      let commandInput = '';
      const command = 'ls';

      const typeCommand = (index) => {
        if (index < command.length) {
          commandInput += command[index];
          setInput(commandInput);
          setTimeout(() => typeCommand(index + 1), 100);
        } else {
          processCommand(command);
          setInput('');
        }
      };

      setTimeout(() => typeCommand(0), 500);
      hasTypedRef.current = true;
    }
  }, []);
  const processCommand = (input) => {
    const [command, ...args] = input.split(' ');

    const timestamp = new Date().toLocaleTimeString();

    let newOutput;
    if (commands[command]) {
      newOutput = commands[command](args, history, setOutput).map(text => ({ text }));
    } else {
      newOutput = [{ text: `Command not found: ${command}` }];
    }

    if (command !== 'clear') {
      setOutput((prevOutput) => [...prevOutput, { text: `~> ${input}`, timestamp }, ...newOutput]);
    }
    setHistory((prevHistory) => [...prevHistory, { input, timestamp }]);
    setHistoryIndex(history.length);
  };

  return { input, setInput, output, processCommand, history, setHistoryIndex, historyIndex, currentDir, setCurrentDir };
}