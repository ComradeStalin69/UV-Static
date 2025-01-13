document.addEventListener("DOMContentLoaded", () => {
    // UV proxy configuration (adjust this to match your UV setup)
    const UV_PROXY_PREFIX = "/uv/service/";

    // DOM Elements
    const cliOutput = document.getElementById("cli-output");
    const cliInput = document.getElementById("cli-input");

    // Ensure DOM elements exist
    if (!cliOutput || !cliInput) {
        console.error("Required DOM elements are missing. Ensure all IDs are correct.");
        return;
    }

    // Function to route URLs through the UV proxy
    function routeThroughUV(url) {
        // Ensure the URL is valid and fully qualified
        const fullUrl = url.startsWith("http") ? url : `http://${url}`;
        // Prepend the UV proxy prefix
        return `${UV_PROXY_PREFIX}${encodeURIComponent(fullUrl)}`;
    }

    // Append content to CLI output (text or iframe)
    function appendCliContent(content, isIframe = false) {
        const container = document.createElement("div");

        if (isIframe) {
            // Add an iframe for displaying web content
            const iframe = document.createElement("iframe");
            iframe.src = content;
            container.appendChild(iframe);
        } else {
            // Add a text line to the CLI output
            container.textContent = content;
            container.style.marginBottom = "10px";
        }

        cliOutput.appendChild(container);
        cliOutput.scrollTop = cliOutput.scrollHeight; // Auto-scroll to the bottom
    }

    // Process CLI Commands
    function processCliCommand(command) {
        const [cmd, ...args] = command.split(" ");
        switch (cmd) {
            case "search":
                const query = args.join(" ");
                appendCliContent(`Searching for: ${query}`);
                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                appendCliContent(routeThroughUV(searchUrl), true);
                break;

            case "open":
                const url = args.join(" ");
                appendCliContent(`Opening URL: ${url}`);
                appendCliContent(routeThroughUV(url), true);
                break;

            case "calc":
                const expression = args.join(" ");
                try {
                    // Evaluate the mathematical expression
                    const result = eval(expression);
                    appendCliContent(`Result: ${result}`);
                } catch (error) {
                    appendCliContent(`Error: Invalid expression "${expression}"`);
                }
                break;

            case "help":
                appendCliContent("Commands:\n- search <query>\n- open <url>\n- calc <expression>\n- help");
                break;

            default:
                appendCliContent(`Unknown command: ${cmd}`);
                appendCliContent("Type 'help' for available commands.");
        }
    }

    // CLI Input Listener
    cliInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const command = cliInput.value.trim();
            cliInput.value = ""; // Clear input box
            if (command) {
                appendCliContent(`> ${command}`);
                processCliCommand(command);
            }
        }
    });
});
