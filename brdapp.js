function checkInput() {
    var event = window.event || event.which;

    if (event.keyCode == 13) {
        event.preventDefault();
        addLine(document.getElementById("textinput").value);
        document.getElementById("textinput").value = "";
    }

    //document.getElementById("textinput").style.height = (document.getElementById("textinput").scrollHeight) + "px";
}

function addLine(line) {
    //document.write("<br>")
    const newParagraph = document.createElement("<p");
    newParagraph.textContent = "Dynamically created paragraph!";
    document.getElementById("textinput").value = "";
    var textNode = document.createTextNode(line);
    document.getElementById("consoletext").appendChild(textNode);
}