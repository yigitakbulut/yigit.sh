import TerminalContext from '../context/TerminalContext';
import useTerminal from './useTerminal';

const TerminalProvider = ({ children }) => {
  const terminalState = useTerminal();

  return (
    <TerminalContext.Provider value={terminalState}>
      {children}
    </TerminalContext.Provider>
  );
};

export default TerminalProvider;