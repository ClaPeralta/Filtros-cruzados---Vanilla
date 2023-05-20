//variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

//contenedor para resultados
const resultado = document.querySelector("#resultado"); //tenemos un ID llamado resultado en el html

const max = new Date().getFullYear(); //genero el anio actual con getFullYear que va a ser el maximo, seria un 0km
const min = max - 14; //como no quiero vender autos de mas de 10 anios al maximo le resto 10 y eso me da el anio base de venta para cada modelo de auto

//genero un objeto con los datos de la busqueda
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

//eventos
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos); //muestra los autos al cargar

  //llena las opciones de anios
  llenarSelect();
});

//Event listener para cada select de busqueda
marca.addEventListener("change", (e) => {
  //console.log(e.target.value);
  datosBusqueda.marca = e.target.value; //con esto me aseguro de poner ese valor en el objeto de datosBusqueda, en este caso la marca

  filtrarAuto();
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = Number(e.target.value); //con esto me aseguro de poner ese valor en el objeto de datosBusqueda, en este caso el anio
  filtrarAuto();
});
minimo.addEventListener("change", (e) => {
  //console.log(e.target.value);
  datosBusqueda.minimo = e.target.value; //con esto me aseguro de poner ese valor en el objeto de datosBusqueda, en este caso el precio minimo
  filtrarAuto(); //mando a llamar a la fn para tener la funcionalidad
});
maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value; //con esto me aseguro de poner ese valor en el objeto de datosBusqueda, en este caso el precio maximo
  filtrarAuto();
});
puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = Number(e.target.value); //con esto me aseguro de poner ese valor en el objeto de datosBusqueda, en este caso las puertas
  filtrarAuto();
});
transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value; //con esto me aseguro de poner ese valor en el objeto de datosBusqueda, en este caso la transmision
  filtrarAuto();
});
color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value; //con esto me aseguro de poner ese valor en el objeto de datosBusqueda, en este caso le color
  filtrarAuto();

  console.log(datosBusqueda);
});

//funciones
function mostrarAutos(autos) {
  limpiarHtml(); //elimina el HTML previo donde se muestran los resultados
  autos.forEach((auto) => {
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;
    const autoHTML = document.createElement("p");

    autoHTML.textContent = `
    ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - Color: ${color}
    `;

    //insertar en el HTML
    resultado.appendChild(autoHTML);
  });
}

//limpiar HTML
function limpiarHtml() {
  while (resultado.firstChild) {
    //mientras haya algo en resultado vamos a removerlo
    resultado.removeChild(resultado.firstChild);
  }
}

//genera los anios del select
function llenarSelect() {
  //console.log("Llenando el select...");
  for (let i = max; i > min; i--) {
    //corre de atras para adelante porque quiero q se vea primero el anio maximo o el auto mas nuevo;
    //console.log(i);
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion); //como ya seleccione year le voy a ir agregando cada opcion de anio al select
  }
}

//fn q filtra en base a la busqueda
function filtrarAuto() {
  //console.log("Filtrando...");
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor); //funcion de alto nivel, es una funcion que usa a otra de parametro

  // console.log(resultado);
  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    sinResultado();
  }
}

function sinResultado() {
  limpiarHtml();

  const sinResultado = document.createElement("div");
  sinResultado.classList.add("alerta", "error");
  sinResultado.textContent =
    "No se hallaron resultados con los parametros solicitados";
  resultado.appendChild(sinResultado);
}

function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}
function filtrarYear(auto) {
  if (datosBusqueda.year) {
    return auto.year === datosBusqueda.year;
  }
  return auto;
}

function filtrarMinimo(auto) {
  if (datosBusqueda.minimo) {
    return auto.precio >= datosBusqueda.minimo;
  }
  return auto;
}

function filtrarMaximo(auto) {
  if (datosBusqueda.maximo) {
    return auto.precio <= datosBusqueda.maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  if (datosBusqueda.puertas) {
    return auto.puertas === datosBusqueda.puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  if (datosBusqueda.transmision) {
    return auto.transmision === datosBusqueda.transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  if (datosBusqueda.color) {
    return auto.color === datosBusqueda.color;
  }
  return auto;
}
