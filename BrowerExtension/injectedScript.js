// Establish a WebSocket connection to the server
const ws = new WebSocket("ws://localhost:8080");
let lastSentCode = "";

function getCodeFromMonacoEditor() {
  const editor = window.monaco.editor.getModels()[1];

  if (editor) {
    const code = editor.getValue();
    return code;
  } else {
    return null;
  }
}

function sendCodeToVSCode() {
  const code = getCodeFromMonacoEditor();
  if (code && code !== lastSentCode) {
    ws.send(code);
    lastSentCode = code;
    console.log("Code sent to server");
  }
}

function initializeEditorListeners() {
  const editor = window.monaco.editor.getModels()[1];

  editor.onDidChangeContent(() => {
    console.log("Editor content changed, sending code to server");
    sendCodeToVSCode();
  });
}
function checkIfMonacoReady() {
  if (
    typeof window.monaco !== "undefined" &&
    window.monaco.editor.getModels().length > 0
  ) {
    initializeEditorListeners();
  }
}

setTimeout(() => {
  checkIfMonacoReady();
}, 1000);

ws.onmessage = (event) => {
  const updatedCode = event.data;
  console.log("upadted code receinved");
  const editor = window.monaco?.editor?.getModels()[1];
  if (editor) {
    editor.setValue(updatedCode);
  }
};
