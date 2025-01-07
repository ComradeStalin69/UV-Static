document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const cliOutput = document.getElementById("cli-output");
    const cliInput = document.getElementById("cli-input");
    const uvForm = document.getElementById("uv-form");
    const uvAddress = document.getElementById("uv-address");

    if (!cliOutput || !cliInput || !uvForm || !uvAddress) {
        console.error("Required DOM elements are missing. Ensure all IDs are correct.");
        return;
    }

    // Prevent the form from reloading the page
    uvForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const url = uvAddress.value.trim();
        if (url) {
            appendCliOutput(`Navigating to: ${url}`);
            // Use UV's functionality to handle the URL
            window.location.href = `uv/service/${url.startsWith("http") ? url : `http://${url}`}`;
        } else {
            appendCliOutput("Error: No URL entered.");
        }
    });

    // Append output to CLI
    function appendCliOutput(text) {
        const line = document.createElement("div");
        line.textContent = text;
        cliOutput.appendChild(line);
        cliOutput.scrollTop = cliOutput.scrollHeight;
    }

    // Process CLI Commands
    function processCliCommand(command) {
        const [cmd, ...args] = command.split(" ");
        switch (cmd) {
            case "search":
                const query = args.join(" ");
                appendCliOutput(`Searching for: ${query}`);
                uvAddress.value = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                uvForm.dispatchEvent(new Event("submit"));
                window.location.href = `uv/service/${url.startsWith("http") ? url : `http://${url}`}`;
            case "open":
                const url = args.join(" ");
                appendCliOutput(`Opening URL: ${url}`);
                uvAddress.value = url.startsWith("http") ? url : `http://${url}`;
                uvForm.dispatchEvent(new Event("submit"));
                window.location.href = `uv/service/${url.startsWith("http") ? url : `http://${url}`}`;

                break;

            case "help":
                appendCliOutput("Commands:\n- search <query>\n- open <url>\n- help");
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