const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "authDomain",
  projectId: "datos-de-formulario",
  storageBucket: "datos-de-formulario.appspot.com",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
  measurementId: "measurementId",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById("formulario").addEventListener("submit", (event) => {
  event.preventDefault();

  let entradaNombre = document.getElementById("name");
  let errorNombre = document.getElementById("nameError");

  if (entradaNombre.value.trim() === "") {
    errorNombre.textContent = "Por favor, introduce tu nombre";
    errorNombre.classList.add("error-message");
  } else {
    errorNombre.textContent = "";
    errorNombre.classList.remove("error-message");
  }

  let emailEntrada = document.getElementById("email");
  let errorEmail = document.getElementById("emailError");
  let emailPattern = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  if (!emailPattern.test(emailEntrada.value)) {
    errorEmail.textContent = "Por favor, introduce un email válido";
    errorEmail.classList.add("error-message");
  } else {
    errorEmail.textContent = "";
    errorEmail.classList.remove("error-message");
  }

  let passwordEntrada = document.getElementById("password");
  let errorPassword = document.getElementById("passwordError");
  let passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  if (!passwordPattern.test(passwordEntrada.value)) {
    errorPassword.textContent =
      "El password debe tener al menos 8 caracteres entre: numeros, mayúsculas, minúsculas y carácter especial";
    errorPassword.classList.add("error-message");
  } else {
    errorPassword.textContent = "";
    errorPassword.classList.remove("error-message");
  }

  if (
    !errorNombre.textContent &&
    !errorEmail.textContent &&
    !errorPassword.textContent
  ) {
    // alert("El formulario se ha enviado con éxito");
    // document.getElementById("formulario").reset();

    //BACKEND QUE RECIBA LA INFORMACIÓN

    db.collection("users")
      .add({
        nombre: entradaNombre.value,
        email: emailEntrada.value,
        password: passwordEntrada.value,
      })
      .then((docRef) => {
        alert("El formulario se ha enviado con éxito", docRef.id);
        document.getElementById("formulario").reset();
      })
      .catch((error) => {
        alert(error);
      });
  }
});
