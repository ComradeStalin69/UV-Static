document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const cliOutput = document.getElementById("cli-output");
    const cliInput = document.getElementById("cli-input");
    const iframeContainer = document.getElementById("iframe-container");

    // Ensure DOM elements exist
    if (!cliOutput || !cliInput || !iframeContainer) {
        console.error("Required DOM elements are missing. Ensure all IDs are correct.");
        return;
    }

    // Append output to CLI
    function appendCliOutput(text) {
        const line = document.createElement("div");
        line.textContent = text;
        cliOutput.appendChild(line);
        cliOutput.scrollTop = cliOutput.scrollHeight;
    }

    // Create a new iframe
    function createIframe(src) {
        const iframe = document.createElement("iframe");
        iframe.src = src;
        iframe.style.width = "100%";
        iframe.style.height = "600px";
        iframe.style.border = "none";
        iframeContainer.appendChild(iframe);
    }

    // Process CLI Commands
    function processCliCommand(command) {
        const [cmd, ...args] = command.split(" ");
        switch (cmd) {
            case "search":
                const query = args.join(" ");
                appendCliOutput(`Searching for: ${query}`);
                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                createIframe(searchUrl);
                break;

            case "open":
                const url = args.join(" ");
                const fullUrl = url.startsWith("http") ? url : `http://${url}`;
                appendCliOutput(`Opening URL: ${fullUrl}`);
                createIframe(fullUrl);
                break;

            case "calc":
                const expression = args.join(" ");
                try {
                    // Evaluate the mathematical expression
                    const result = eval(expression);
                    appendCliOutput(`Result: ${result}`);
                } catch (error) {
                    appendCliOutput(`Error: Invalid expression "${expression}"`);
                }
                break;

            case "help":
                appendCliOutput("Commands:\n- search <query>\n- open <url>\n- calc <expression>\n- help");
                break;

            default:
                appendCliOutput(`Unknown command: ${cmd}`);
                appendCliOutput("Type 'help' for available commands.");
        }
    }

    // CLI Input Listener
    cliInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const command = cliInput.value.trim();
            cliInput.value = ""; // Clear input box
            if (command) {
                appendCliOutput(`> ${command}`);
                processCliCommand(command);
            }
        }
    });
});