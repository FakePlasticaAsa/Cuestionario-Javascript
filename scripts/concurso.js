// Cambia esto
const mostrarBtn = document.getElementById('mostrarBtn'); // Ahora apuntamos al botón
const nuevoDiv = document.getElementById('nuevoDiv');


// Escucha el evento de 'submit' del formulario
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se recargue la página

    const usernameRegex = /^[a-zA-Z0-9]+$/;

    const username = document.getElementById('username').value;

    if (usernameRegex.test(username) && username.length >= 3) { // Check if the username is not empty
        const displayUsername = document.getElementById('displayUsername');
        displayUsername.textContent = `Good luck, ${username}!`;
        nuevoDiv.style.display = 'flex'; // Muestra el nuevo div de gamemode selector
        document.querySelector('.divBtn').style.display = 'none'; // Oculta el contenedor del formulario


    
        
    }
else {
    usernameWarning.textContent = "The username should be at least 3 letters long and only contain letters and numbers.";
}
});

const gamemodeH1 = document.getElementById('quizzh1');


document.getElementById('textQuizz').addEventListener('click', function(displayTextQuizz) {

    quizzSelector.style.display = 'none';
    gamemodeH1.style.display = 'none';
    
    document.getElementById('textQuizz').style.display = 'flex';

    document.getElementById('main-container').style.display = 'flex';

    

});
