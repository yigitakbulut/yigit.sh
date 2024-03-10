export default (args) => {
    const currentDate = new Date().toLocaleDateString("en-US");
    return [
        'total 4',
        `drwxr-xr-x 2 user group 4096 ${currentDate} home`,
        `drwxr-xr-x 2 user group 4096 ${currentDate} blog`,
        `drwxr-xr-x 2 user group 4096 ${currentDate} projects`,
        `drwxr-xr-x 2 user group 4096 ${currentDate} contact`
    ]
};