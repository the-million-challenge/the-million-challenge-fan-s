document.addEventListener("DOMContentLoaded", () => {
  const coronasDisplay = document.getElementById("coronas-count");
  const comprarBtn = document.getElementById("comprar-btn");
  const cantidadInput = document.getElementById("cantidad-coronas");
  const errorMessage = document.getElementById("error-message");
  const successMessage = document.getElementById("success-message");
  const form = document.getElementById("compra-form");

  if (!coronasDisplay || !comprarBtn || !cantidadInput || !form) return;

  // Persistencia básica entre recargas
  let coronas = Number(localStorage.getItem("coronas") || 0);

  function updateDisplay() {
    coronasDisplay.textContent = `Coronas: ${coronas.toLocaleString()}`;
    localStorage.setItem("coronas", String(coronas));
  }

  function showError(text) {
    errorMessage.textContent = text;
    errorMessage.style.display = text ? "block" : "none";
    // hide any previous success
    successMessage.style.display = "none";
  }

  function showSuccess(text) {
    successMessage.textContent = text;
    successMessage.style.display = text ? "block" : "none";
    errorMessage.style.display = "none";
  }

  updateDisplay();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    showError("");
    showSuccess("");

    const raw = cantidadInput.value;
    const cantidad = Number(raw);

    // Validaciones claras
    if (!Number.isFinite(cantidad) || !Number.isInteger(cantidad) || cantidad <= 0) {
      showError("Ingresa una cantidad entera y positiva de coronas.");
      return;
    }

    const MAX = 1_000_000_000; // ejemplo: límite razonable
    if (cantidad > MAX) {
      showError(`La cantidad es demasiado grande. Máx: ${MAX.toLocaleString()}.`);
      return;
    }

    // Simulación de compra (si hubiera petición a servidor, aquí iría)
    comprarBtn.disabled = true;
    try {
      coronas += cantidad;
      updateDisplay();
      cantidadInput.value = "";
      showSuccess(`Compra exitosa: ${cantidad.toLocaleString()} coronas adquiridas.`);
      // opcional: adicional al mensaje visible, mantener compatibilidad con código existente:
      // alert(`Compra exitosa: ${cantidad} coronas adquiridas.`);
    } finally {
      comprarBtn.disabled = false;
    }
  });

  // Mejora UX: eliminar mensajes al cambiar el input
  cantidadInput.addEventListener("input", () => {
    showError("");
    showSuccess("");
  });
});