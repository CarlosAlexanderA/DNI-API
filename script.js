const form = document.getElementById("dniForm");
const resultContainer = document.getElementById("resultContainer");
const nombresElement = document.getElementById("nombres");
const apellidoPaternoElement = document.getElementById("apellidoPaterno");
const apellidoMaternoElement = document.getElementById("apellidoMaterno");

const failContainer = document.getElementById("failContainer");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar envío del formulario

  const dniInput = document.getElementById("dniInput");
  const dni = dniInput.value;
  // const url = 'https://apiperu.dev/api/dni/INGRESAR_NUMERO_DNI_AQUI?api_token=feb6c31509cc63355d66e8c45446491cf1ab1f5eb8d196968dd9eb816f2db083';

  const url = `https://apiperu.dev/api/dni/${dni}?api_token=feb6c31509cc63355d66e8c45446491cf1ab1f5eb8d196968dd9eb816f2db083`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Verificar si la consulta fue exitosa
      if (data.success) {
        failContainer.style.display = "none";

        const { nombres, apellido_paterno, apellido_materno } = data.data;

        nombresElement.textContent = `Nombres: ${nombres}`;
        apellidoPaternoElement.textContent = `Apellido Paterno: ${apellido_paterno}`;
        apellidoMaternoElement.textContent = `Apellido Materno: ${apellido_materno}`;

        resultContainer.style.display = "block"; // Mostrar los resultados
      } else {
        resultContainer.style.display = "none";
        errorMessage.textContent = "No se encontraron datos para el número de DNI proporcionado.";
        failContainer.style.display = "block";
        console.log("No se encontraron datos para el DNI ingresado");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
