document.addEventListener("DOMContentLoaded", () => {
    // UV Proxy Configuration
    const UV_PROXY_PREFIX = "/static/tiw/";

    // DOM Elements
    const cliOutput = document.getElementById("cli-output");
    const cliInput = document.getElementById("cli-input");

    // Append content to CLI output (text or iframe)
    function appendCliContent(content, isIframe = false) {
        const container = document.createElement("div");

        if (isIframe) {
            // Add an iframe for displaying web content
            const iframe = document.createElement("iframe");
            iframe.src = content;
            iframe.style.width = "50%";
            iframe.style.height = "500px";
            iframe.style.border = "none";
            iframe.style.zoom = "100%";
            iframe.style.resize = "both";
            iframe.style.overflow = "auto";
            container.appendChild(iframe);
        } else {
            // Add a text line to the CLI output
            container.textContent = content;
            container.style.marginBottom = "10px";
        }

        cliOutput.appendChild(container);
        cliOutput.scrollTop = cliOutput.scrollHeight; // Auto-scroll to the bottom
    }

    // Route URLs through the UV proxy
    function routeThroughUV(url) {
        // Ensure the URL is fully qualified
        const fullUrl = url.startsWith("http") ? url : `http://${url}`;

        // Encode the URL using Ultraviolet's encoding method
        const encodedUrl = Ultraviolet.codec.xor.encode(fullUrl);

        // Return the fully proxied URL
        return `${UV_PROXY_PREFIX}${encodedUrl}`;
    }

    // Process CLI Commands
    function processCliCommand(command) {
        const [cmd, ...args] = command.split(" ");
        switch (cmd) {
            case "iframe":
                const url = args.join(" ");
                appendCliContent(`Opening URL: ${url}`);
                appendCliContent(routeThroughUV(url), true);
                
            case "tor":
                //appendCliContent(`Opening TOR: ${'http://torry.io'}`);
                //appendCliContent(routeThroughUV('http://torry.io'), true)
            case "google":
                query = args.join(" ");
                appendCliContent(`Searching for: ${query}`);
                searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
               routeThroughUV(searchUrl, true);
               window.location(encodedUrl)
                break;
            case "search":
                
                const query = args.join(" ");
                appendCliContent(`Searching for: ${query}`);
                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                appendCliContent(routeThroughUV(searchUrl), true);
                break;

            case "open":
                url = args.join(" ");
                appendCliContent(`Opening URL: ${url}`);
                window.location(routeThroughUV(url), true);
                break;

            case "calc":
                const expression = args.join(" ");
                try {
                    const result = eval(expression);
                    appendCliContent(`Result: ${result}`);
                } catch (error) {
                    appendCliContent(`Error: Invalid expression "${expression}"`);
                }
                break;

            case "help":
                appendCliContent("Commands:\n- search <query>\n- google <query> \n- open <http://url>\n- calc <expression>\n- help");
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
