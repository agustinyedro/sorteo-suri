document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("going to", button.id);
    updateShadowRoot(button.id, "template", button);
  });
});

function updateShadowRoot(elementId, templateSuffix, activeButton) {
  // Obtener el elemento de contenido
  const contentElement = document.getElementById("content");
  if (!contentElement) return;

  // Crear el shadow root si no existe
  const shadowRoot =
    contentElement.shadowRoot || contentElement.attachShadow({ mode: "open" });

  // Limpiar el contenido del shadow root
  shadowRoot.innerHTML = "";

  // Obtener la plantilla
  const template = document.getElementById(`${elementId}-${templateSuffix}`);
  if (!template) return;

  // Insertar la plantilla dentro del shadow root
  shadowRoot.appendChild(template.content.cloneNode(true));

  // Eliminar la clase 'active' de todos los botones
  document.querySelectorAll(".btn").forEach((button) => {
    button.classList.remove("active");
  });

  // Agregar la clase 'active' al botón clicado
  activeButton.classList.add("active");
}

const themeToggle = document.getElementById("toogle-btn");

themeToggle.addEventListener("click", () => {
  console.log("click");
  toggleTheme();
});
function toggleTheme() {
  document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === "dark" ? "" : "dark";
}

const popup = document.getElementById("popup");
