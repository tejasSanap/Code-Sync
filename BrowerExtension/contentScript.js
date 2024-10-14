function injectExternalScript() {
  const script = document.createElement("script");
  const scriptURL = chrome.runtime.getURL("injectedScript.js");

  script.src = chrome.runtime.getURL("injectedScript.js");
  script.onload = () => {
    console.log("Injected script loaded successfully");
  };
  script.onerror = () => {
    console.error("Failed to load script:", script.src);
  };
  document.body.appendChild(script);
}
injectExternalScript();
