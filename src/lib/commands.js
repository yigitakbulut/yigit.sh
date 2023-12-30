// commands.js
export const commands = {
    'ls': (args) => {
        const currentDate = new Date().toLocaleDateString("en-US");
        return [
            'total 4',
            `drwxr-xr-x 2 user group 4096 ${currentDate} home`,
            `drwxr-xr-x 2 user group 4096 ${currentDate} blog`,
            `drwxr-xr-x 2 user group 4096 ${currentDate} projects`,
            `drwxr-xr-x 2 user group 4096 ${currentDate} contact`
        ];
    },
    'help': (args) => {
        return ['Available commands: help, ls, about, contact, clear'];
    },
    'clear': (args, history, setOutput) => {
        setOutput([]);
        return [];
    },
    history: (args, history) => {
        return history.map((command, index) => `${index}: ${command.input}`);
    },
};