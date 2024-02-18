export default (args, history) => {
    return history.map((command, index) => `${index}: ${command.input}`);
};