const loginURL = "http://localhost:5678/api/users/login";
const form = document.getElementById("login-form");
const loginBtn = document.getElementById('login-btn');


function getUserLog() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    const user = {
        email: email,
        password: password
    }
    return user;
}
function showErrorMsg() {
    alert("Erreur dans l'identifiant ou le mot de passe");
}

loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let user = getUserLog();
    fetch(loginURL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
        else {
            showErrorMsg();
            return 0;
        }
    })
    .then(function(value) {
        if (value !== 0) {
            sessionStorage.setItem("token", value.token);
            location.href = "index.html";
        }
    })
    .catch(function(err) {
        console.log(err);
    })
}); 































// const loginBtn = document.getElementById('login-btn');
// let email = document.getElementById("email").value;
// let password = document.getElementById("password").value;

// loginBtn.addEventListener("submit", function(e) {
//     let user = {
//         email,
//         password
//       };
//     console.log(JSON.stringify(user));
//     fetch('http://localhost:5678/api/users/login', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json', 
//                 'Content-Type': 'application/json', 
//             },
//             body: JSON.stringify(user)
//         })
//         .then(function(res) {
//           if (res.ok) {
//             return res.json();
//           }
//         })
//         .then(function(value) {
//           localStorage.setItem("email", user.email);
//           localStorage.setItem("password", user.password);
//           localStorage.setItem("token", value.token);
//           document.location.href="index.html";
//         })
//         .catch(function(err) {
//           alert("Wrong mail or password");
//         });
// });

// // session / localStorage   jwt/ Node -> doc session

// // email: sophie.bluel@test.tld

// // password: S0phie 