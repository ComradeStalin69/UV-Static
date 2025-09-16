function processCliCommand(command) {
    const [cmd, ...args] = command.split(" ");
    switch (cmd) {
        case "iframe": {
            const url = args.join(" ");
            appendCliContent(`Opening URL: ${url}`);
            appendCliContent(routeThroughUV(url), true);
            break;
        }

        case "tor": {
            const torUrl = "http://torry.io";
            appendCliContent(`Opening TOR: ${torUrl}`);
            appendCliContent(routeThroughUV(torUrl), true);
            break;
        }

        case "google": {
            const query = args.join(" ");
            appendCliContent(`Searching for: ${query}`);
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            const encodedUrl = routeThroughUV(searchUrl);
            appendCliContent(encodedUrl, true); // show in iframe
            break;
        }

        case "search": {
            const query = args.join(" ");
            appendCliContent(`Searching for: ${query}`);
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            appendCliContent(routeThroughUV(searchUrl), true);
            break;
        }

        case "open": {
            const url = args.join(" ");
            appendCliContent(`Opening URL: ${url}`);
            window.location.href = routeThroughUV(url);
            break;
        }

        case "calc": {
            const expression = args.join(" ");
            try {
                const result = eval(expression);
                appendCliContent(`Result: ${result}`);
            } catch (error) {
                appendCliContent(`Error: Invalid expression "${expression}"`);
            }
            break;
        }

        case "eaglercraft": {
            const version = args.join(" ");
            if (version === '1.8.8 WASM') {
                window.location.href = "Villade-main/1.8.8-wasm/index.html";
            } else if (version === '1.8.8') {
                window.location.href = 'Villade-main/1.8.8/index.html';
            } else if (version === '1.12.2') {
                window.location.href = 'Villade-main/1.12.2/index.html';
            } else if (version === '1.12.2 WASM') {
                window.location.href = 'Villade-main/1.12.2-wasm/index.html';
            } else if (version === '1.21') {
                window.location.href = "Villade-main/Eaglercraft-1.21.1-TeaVM-main/index.html";
            } else {
                appendCliContent("Versions: 1.8.8, 1.8.8 WASM, 1.12.2, 1.12.2 WASM, 1.21");
            }
            break;
        }

        case "help": {
            appendCliContent(
                "Commands:\n- search <query>\n- google <query>\n- open <http://url>\n- iframe <http://url>\n- calc <expression>\n- eaglercraft <version>\n- help"
            );
            break;
        }

        default: {
            appendCliContent(`Unknown command: ${cmd}`);
            appendCliContent("Type 'help' for available commands.");
        }
    }
}
