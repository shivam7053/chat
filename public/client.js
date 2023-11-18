// // client.js
// const socket = io();
// let textarea = document.querySelector('#textarea');
// let messageArea = document.querySelector('.message_area');

// let name;
// do{
//     name = prompt('Please enter your name: ')
// } while(!name)

// textarea.addEventListener('keyup',(e) =>{
//     if(e.key === 'Enter'){
//         sendMessage(e.target.value)
//     }
// })

// function sendMessage(message){
//     let msg = {
//         user: name,
//         message: message,
//     }

//     //Append
//     appendMessage (msg,'outgoing')
// }
// function appendMessage(msg, type){
//     let maindiv = document.createElement('div')
//     let className = type
//     maindiv.classList.add(className,'message')

//     let markup = `
//         <h4>$(msg.user)</h4>
//         <p>$(msg.message)</p>
//     `

//     maindiv.innerHTML = markup;
//     messageArea.appendChild(maindiv);
// }

const socket = io();
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');

let name;
do {
    name = prompt('Please enter your name: ');
} while (!name);

textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Prevent newline in the textarea
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
    let msg = {
        user: name,
        message: message,
    };

    // Append
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrolltobtm();
    
    // Emit the message to the server
    socket.emit('message', msg);

    // Clear the textarea after sending the message
    textarea.value = '';
}

function appendMessage(msg, type) {
    let maindiv = document.createElement('div');
    let className = type;
    maindiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

    maindiv.innerHTML = markup;
    messageArea.appendChild(maindiv);

    // Scroll to the bottom of the message area
    messageArea.scrollTop = messageArea.scrollHeight;
}

// Receive message
socket.on('message', (msg) => {
    appendMessage(msg,'incoming');
    scrolltobtm();
});

function scrolltobtm(){
    messageArea.scrollTop = messageArea.scrollHeight;
}