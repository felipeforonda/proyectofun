const data = [
  {
    usuario: "felipe@gmail.com",
    contraseña: "Pipe12345*"
  },
  {
    usuario: "cristianlopez@gmail.com",
    contraseña: "cris12345"
  },
  {
    usuario: "lupita@gmail.com",
    contraseña: "america1927"
  }
];

const usuarioInput = document.getElementById('usuario');
const contraseñaInput = document.getElementById('contraseña');
const boton = document.getElementById('boton');
const parrafo = document.getElementById('peli');
const form = document.getElementById('form');

function validarCredencial(usuario, contraseña) {
  return new Promise((resolve, reject) => {
    let mensaje = "";
    let entrar = true;
   

   

    let regexemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!regexemail.test(usuario)) {
      mensaje += 'El usuario es inválido <br>';
      entrar = false;
    }

    if (contraseña.length < 8) {
      mensaje += 'La contraseña es muy corta <br>';
      entrar = false;
    }

    if (!entrar) {
      
      reject(mensaje);
      return;
    }
    
    let usuarioEncontrado = false; 
    
    for (let i = 0; i < data.length; i++) {
      if (data[i].usuario === usuario) {
        usuarioEncontrado = true;

        if (data[i].contraseña === contraseña) {
          resolve("Ingresando...");
          return; 
        } else {
          reject("La contraseña es incorrecta");
          return;
        }
      }else{(!usuarioEncontrado) 
        reject("Usuario no encontrado");
      }
    }

     
  });
}

document.getElementById('contraseña').addEventListener('input', validarContrasena);

function validarContrasena() {
  const contraseñaInput = document.getElementById('contraseña').value;
  const mensajeValidacion = document.getElementById('mensaje-validacion');

  const tieneMayuscula = /[A-Z]/.test(contraseñaInput);
  const tieneMinuscula = /[a-z]/.test(contraseñaInput);
  const tieneNumero = /\d/.test(contraseñaInput);
  const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(contraseñaInput);

  let mensaje = '';

  if (!tieneMayuscula) {
    mensaje += 'Debe contener al menos una mayúscula. <br>';
  }

  if (!tieneMinuscula) {
    mensaje += 'Debe contener al menos una minúscula. <br>';
  }

  if (!tieneNumero) {
    mensaje += 'Debe contener al menos un número. <br>';
  }

  if (!tieneCaracterEspecial) {
    mensaje += 'Debe contener al menos un carácter especial. ';
  }

  mensajeValidacion.innerHTML = mensaje;

 
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const usuarioValue = usuarioInput.value;
  const contraseñaValue = contraseñaInput.value;

  // con esto verifico la contraseña antes de entrar 
  if (document.getElementById('mensaje-validacion').innerHTML !== '') {
    parrafo.innerHTML = 'La contraseña no cumple con las características requeridas';
    return;
  }

  validarCredencial(usuarioValue, contraseñaValue)
    .then((mensaje) => {
      parrafo.innerHTML = mensaje;
      setTimeout(() => {
        window.location.href = "lista.html";
      }, 3000);
    })
    .catch((error) => {
      parrafo.innerHTML = error;
    });
});


//fergegthtrhrhrh
