const cliOutput = document.getElementById("cli-output");
const cliInput = document.getElementById("cli-input");
const uvForm = document.getElementById("uv-form");
const uvAddress = document.getElementById("uv-address");

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
            uvForm.submit();
            break;

        case "open":
            const url = args.join(" ");
            appendCliOutput(`Opening URL: ${url}`);
            uvAddress.value = url.startsWith("http") ? url : `http://${url}`;
            uvForm.submit();
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