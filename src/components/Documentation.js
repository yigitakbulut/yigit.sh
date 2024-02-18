export default () => {
    function toggleDocs() {
        var docs = document.querySelector('.terminal-instructions');
        docs.style.display = docs.style.display === 'none' ? 'block' : 'none';
    }

    return (<div>
                <button onclick="toggleDocs()" class="docs-toggle-btn">Toggle Docs</button>
        <div class="terminal-instructions">
    <h2>Welcome to Yigit's Interactive Terminal</h2>
    <p>Explore this unique terminal-based interface to navigate through Yigit's personal website. Here's a quick guide on how to use the terminal:</p>
    
    <h3>Basic Commands:</h3>
    <ul>
        <li><code>ls</code>: Lists directories you can explore (e.g., blog, projects).</li>
        <li><code>cd &lt;directory&gt;</code>: Navigates into a specified directory.</li>
        <li><code>help</code>: Displays all available commands.</li>
    </ul>

    <h3>Advanced Features:</h3>
    <ul>
        <li><strong>Command History:</strong> Use the up and down arrow keys to cycle through your command history.</li>
        <li><strong>Minimize/Maximize Terminal:</strong> Click the minimize/maximize button in the terminal header to toggle the view.</li>
    </ul>

    <h3>Navigating the Blog:</h3>
    <ul>
        <li>Use <code>cd blog</code> to enter the blog directory.</li>
        <li>Inside the blog, <code>ls</code> will list all the blog posts.</li>
        <li>Use <code>cd &lt;post-name&gt;</code> to read a specific post.</li>
    </ul>

    <h3>Tips and Tricks:</h3>
    <ul>
        <li>Type <code>clear</code> to clear the terminal screen.</li>
        <li>Use <code>cd ..</code> to go back to the previous directory.</li>
    </ul>

    <h3>Customizing Your Experience:</h3>
    <ul>
        <li>The terminal is draggable – feel free to move it around.</li>
        <li>Minimize the terminal if you prefer a traditional web view.</li>
    </ul>
    </div>
</div>
);
};