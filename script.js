document.addEventListener('DOMContentLoaded', () => {
    /* Until the DOM is loaded, the Javascript code will not start working. */
    console.log('DOM is loaded')

    /* Defining socket constant and DOM constant */
    const socket = new WebSocket("ws://127.0.0.1:12345");
    const messageText = document.querySelector('#messageText');
    const sendButton = document.querySelector('#sendButton');
    const messageContainer = document.querySelector('#messageContainer');

    socket.onopen = () => {
        console.log('Client is connected')
    }

    /* Waiting for the user's message to arrive from the socket, and if it is not empty, we continue to work */
    socket.addEventListener('message', (event) => {
            if(addMessage(event.data)) {
                addMessage(event.data);
            }
    });

    /* If we have a connection problem with socket server we call an alert window with error */
    socket.addEventListener('error', () => {
        alert('Connection is lost or cannot be open');
    });

    /* Function of add message to DOM by the "li" element */
    function addMessage(message) {
        const messageItem = document.createElement('li');

        messageItem.className = 'list-group-item border';
        messageItem.textContent = message;

        messageContainer.appendChild(messageItem);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    /* Function of sending message if message isn't empty */
    function sendMessage() {
        if (socket.send(messageText.value)) {
            socket.send(messageText.value)
        }
        // After send clear the input field
        messageText.value = '';
    }

    sendButton.addEventListener('click', sendMessage);
    messageText.addEventListener('change', sendMessage);

}, false);

