// Recursos de instalação do FilaZero (PWA)
(() => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js").catch(err =>
        console.warn("Não foi possível registrar o modo offline:", err)
      );
    });
  }

  let installPrompt = null;
  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    installPrompt = event;
    let button = document.getElementById("instalarApp");
    if (!button) {
      button = document.createElement("button");
      button.id = "instalarApp";
      button.type = "button";
      button.className = "botao-instalar";
      button.textContent = "＋ Instalar app";
      const header = document.querySelector(".topo");
      const nav = header && header.querySelector(".usuario");
      if (nav) nav.prepend(button);
      else if (header) header.append(button);
    }
    button.hidden = false;
    button.addEventListener("click", async () => {
      if (!installPrompt) return;
      installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt = null;
      button.hidden = true;
    }, { once: true });
  });

  window.addEventListener("appinstalled", () => {
    const button = document.getElementById("instalarApp");
    if (button) button.hidden = true;
    installPrompt = null;
  });
})();
