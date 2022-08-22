const btn_Cotizador = document.querySelector("#btncotizador");
const selectPais = document.querySelector("#selectPais");
const criptoPais = document.querySelector("#criptoPais");
const timerError = 5000;
btn_Cotizador.addEventListener("click", (e) => {
  e.preventDefault();
  if (selectPais.value === "" || criptoPais.value === "") {
    errorDatos();
    return;
  } else {
    cargaApi(selectPais.value, criptoPais.value);
  }
});

// Carga de APi
async function cargaApi(pais, moneda) {
  const api_Key =
    "1e92ec363f95df4298dcc01294e7ff477314c53dae06a7217e93987139c86860";
  const api_Url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${moneda}&tsyms=${pais}&api_key=${api_Key}`;
  try {
    const api = await fetch(api_Url);
    const result = await api.json();
    if (!api.ok) {
      errorApi();
    } else {
      spinner();
      setTimeout(() => {
        datosApi(result.DISPLAY[moneda][pais]);
      },2000);
    }
  } catch (error) {
    console.error(error);
  }
}

// Muestra de datos
function datosApi(datos) {
  const {
    PRICE,
    HIGHDAY,
    LOWDAY,
    FROMSYMBOL,
    CHANGE24HOUR,
    LASTUPDATE,
    IMAGEURL,
    LASTMARKET,
  } = datos;
  let html = "";
  const datosHtml = document.querySelector("#DatosCotizador");
  html += `
    <div class="boxResultado">
      <h2 class="tituloApi">CriptoMoneda <br><span>${LASTMARKET}</span> <span>${FROMSYMBOL}</span></h2>
      <img id="imgCriptoMoneda" src='https://www.cryptocompare.com/${IMAGEURL}' alt="">
      <p class="datosApi" >Precio: <span class="textResult">${PRICE}</span></p>
      <p class="datosApi" >Precio Alto: <span class="textResult">${HIGHDAY}</span></p>
      <p class="datosApi" >Precio Bajo: <span class="textResult">${LOWDAY}</span></p>
      <p class="datosApi" >Variaciòn ultimas 24horas: <span class="textResult">${CHANGE24HOUR}</span></p>
      <p class="datosApi" >Ultima actualizacion: <span class="textResult">${LASTUPDATE}</span></p>
    </div>    
        `;
  datosHtml.innerHTML = html;
}

// Manjeo de errores
function errorDatos() {
  let html = "";
  const datosError = document.querySelector("#DatosCotizador");
  html += `
        <div class="boxResultado boxError">
        <h2 id='error' >!Error en la seleccion de los campos, debe de escoger ambos</h2>
        </div>
        `;
  datosError.innerHTML = html;
  setTimeout(() => {
    error.remove();
  }, timerError);
}
function errorApi() {
  let html = "";
  const datosError = document.querySelector("#DatosCotizador");
  html += `
        <div class="boxResultado boxError">
        <h2 id='error' >!Error en la carga de la API</h2>
        </div>
        `;
  datosError.innerHTML = html;
  setTimeout(() => {
    error.remove();
  }, timerError);
}
// Funcion Sppiner
function spinner() {
  let html = "";
  const datosError = document.querySelector("#DatosCotizador");
  html += `
        <p class="pSpinner">Cargando Datos...</p>
        <div class="spinner"></div>
        `;
  datosError.innerHTML = html;
}
