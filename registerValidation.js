function mostraErrore(testoErrore){
  var form = document.getElementById("login")
  var strong = document.createElement("strong");
  strong.className = "error";
  strong.appendChild(document.createTextNode(testoErrore));
  form.appendChild(strong);
}

function togliErrori(){

  Array.from(document.getElementsByClassName("error")).forEach(
      function(element, index, array) {
          // do stuff
          element.parentNode.removeChild(element);
      }
  );
}

function validazioneForm() {
  togliErrori();
  var name = document.getElementById("name");
  var surname = document.getElementById("surname");
  var birthdate = document.getElementById("birthdate");
  var email = document.getElementById("email");
  var password1 = document.getElementById("password1");
  var password2 = document.getElementById("password2");


  var risultatoNome = checkName(name);
  var risultatoSurname = checkSurname(surname);
  var risultatoEmail = checkEmail(email);
  var risultatoBirthdate = checkDate(birthdate);
  var risultatoPassword = checkPassword(password1,password2);

  return risultatoNome && risultatoSurname && risultatoEmail && risultatoBirthdate && risultatoPassword;

}

function checkName(nomeInput){
  var regex = /^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  if (regex.test(nomeInput.value)) {
    // togliErrore(nomeInput);
    return true;
  } else {
    mostraErrore("Name not valid")
    return false;
  }
}

function checkSurname(surnameInput){
  var regex = /^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  if (regex.test(surnameInput.value)) {
    return true;
  } else {
    mostraErrore("Surname not valid")
    return false;
  }
}

function checkEmail(emailInput) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regex.test(emailInput.value.toLowerCase())) {
    return true;
  } else {
    mostraErrore("Email not valid")
    return false;
  }
}

function checkDate(dataInput){
  var regex = /^[0-9]{4}[\/|-][0-9]{1,2}[\/|-][0-9]{1,2}$/;

  if (regex.test(dataInput.value)) {
    return true;
  } else {
    mostraErrore("Date format not valid");
    return false;
  }
}

function checkPassword(p1,p2) {
  var pwd1 = p1.value;
  var pwd2 = p2.value;
  if (pwd1.length<6 || pwd2.length>15) {
    mostraErrore("Password length must be beetween 6 and 15 characters");
    return false
  } else {
    if (pwd1!=pwd2) {
      mostraErrore("Passwords don't match");
      return false;
    } else {
      return true;
    }
  }

}

// function checkRealData(dd,mm,yyyy) {
//   if (yyyy >= 2020 || yyyy < 1870) {
//     return false;
//   } else if ( mm > 12 || mm < 1) {
//     return false;
//   } else if (dd > 31 || dd < 1) {
//     return false;
//   } else {
//     return true;
//   }
// }
