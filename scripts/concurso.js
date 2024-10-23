// Cambia esto
const mostrarBtn = document.getElementById('mostrarBtn'); 
const nuevoDiv = document.getElementById('nuevoDiv');


document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const usernameRegex = /^[a-zA-Z0-9]+$/;

    const username = document.getElementById('username').value;

    if (usernameRegex.test(username) && username.length >= 3) { 
        const displayUsername = document.getElementById('displayUsername');
        displayUsername.textContent = `Good luck, ${username}!`;
        nuevoDiv.style.display = 'flex'; 
        document.querySelector('.divBtn').style.display = 'none'; 


    
        
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
