import ls from './ls'; 
import clear from './clear';
import history from './history';
import help from './help';

export const commands = {
    'ls': ls,
    'help': help,
    'clear': clear,
    'history': history
};