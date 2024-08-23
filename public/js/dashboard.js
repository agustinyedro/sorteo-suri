import realizarSorteo from "../../src/helpers/realizarSorteo";

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

const realizarSorteoBtn = document.getElementById("realizar-sorteo-btn");
realizarSorteoBtn.addEventListener("click", async () => {
  await realizarSorteo();
});
