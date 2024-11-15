export var pythonURI;
if (location.hostname === "localhost") {
        pythonURI = "http://localhost:5000";
} else if (location.hostname === "127.0.0.1") {
        pythonURI = "http://127.0.0.1:5000";
} else {
        pythonURI =  "https://dudeamabobby.pythonanywhere.com";
}