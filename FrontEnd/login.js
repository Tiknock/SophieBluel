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
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        else {
            showErrorMsg();
            return 0;
        }
    })
    .then((value) => {
        if (value !== 0) {
            localStorage.setItem("token", value.token);
            location.href = "index.html";
        }
    })
    .catch(function(err) {
        console.log(err);
    })
}); 