// Diccionarios de cifrado y descifrado
const aluraDictionary = { // Diccionario para el método de cifrado Alura
  e: 'enter',
  i: 'imes',
  o: 'ober',
  a: 'ai',
  u: 'ufat'
};
const extraDictionary = { // Diccionario para el método de cifrado Extra
  a: 'b',
  e: 'f',
  i: 'j',
  o: 'p',
  u: 'v'
};

// Variable para almacenar la acción a realizar
let type;

// Función de selección de método de cifrado
function cipherType() {
  const selectElement = document.getElementById("cipher-type");
  const warningElement = document.getElementById("warning");

  if (selectElement.value === "cipher-1") { // Verificamos el método de cifrado seleccionado
    warningElement.textContent = "Este método de cifrado no acepta mayúsculas ni acentos.";
    warningElement.style.display = "block";
    cipherDictionary = aluraDictionary;
  } else if (selectElement.value === "cipher-2") { // Verificamos el método de cifrado seleccionado
    warningElement.textContent = "Este método de cifrado no acepta mayúsculas ni acentos, es otro ejemplo de cifrado.";
    warningElement.style.display = "block";
    cipherDictionary = extraDictionary; // Asignamos el diccionario correspondiente
  }
}

// Función de cifrado
function cifrarDescifrar(text, type) { // Recibimos el texto y el tipo de acción a realizar
  for (let key in cipherDictionary) {
    if (type === 'encrypt') { // Ciframos
      text = text.replaceAll(key, cipherDictionary[key]);
    } else if (type === 'decrypt') { // Desciframos
      text = text.replaceAll(cipherDictionary[key], key);
    }
  }
  return text; // Retornamos el texto transformado
}

// Función para mostrar el resultado
function showResult() {
  const textElement = document.getElementById("text-entry");
  const resultElement = document.getElementById("showResult");

  showImage = document.querySelector(".result-container")
  showImage.style.visibility = "collapse"; // Ocultamos la imagen

  // Verificamos que el texto no esté vacío
  if (textElement.value === "") {
    resultElement.textContent = "No ingresaste ningún texto.";
    resultElement.style.display = "block";
  } else if (/[A-ZÁÉÍÓÚáéíóú]/.test(textElement.value)) { // Verificamos la existencia de mayúsculas y acentos
    const normalizedText = textElement.value.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Normalizamos el texto
    const lowercaseText = normalizedText.toLowerCase(); // Convertimos el texto a minúsculas
    textElement.value = lowercaseText; // Reemplazamos el texto en el input
    resultElement.textContent = cifrarDescifrar(lowercaseText, type); // trabajamos con el texto transformado
    resultElement.style.display = "block";
  } else {
    resultElement.textContent = cifrarDescifrar(textElement.value, type);
    resultElement.style.display = "block";
  }
}


// Función inicial
function start(action) { // Recibimos la acción a realizar
  type = action; // Asignamos la acción a la variable global
  const selectElement = document.getElementById("cipher-type"); // Obtenemos el método de cifrado seleccionado
  if (selectElement.value === "cipher-0") { // Verificamos que se haya seleccionado un método de cifrado
    alert("Seleccione un método de cifrado.")
  }
  else {
    showResult();
  }
}
