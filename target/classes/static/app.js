var stompClient = null;
var isConnected = false;

function setConnected(connected) {
    isConnected = connected; // Update connection status
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    updateSendButtonVisibility(); // Check message field and update Send button visibility
    if (connected) {
        $("#conversation").show();
    } else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/stomp-endpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (greeting) {
            showGreeting(JSON.parse(greeting.body));
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    if (!isConnected) { // Check if not connected
        window.alert("Please connect before sending a message!"); // Show native alert
        return; // Exit the function
    }

    var name = $("#name").val();
    var msg = $("#msg").val();
    document.getElementById('msg').value = '';
    updateSendButtonVisibility(); // Hide the Send button again if the input is empty
    stompClient.send("/app/hello", {}, JSON.stringify({'name': name, 'msg': msg}));
}

function showGreeting(message) {
    var currentMessages = sessionStorage.getItem('messages') ? JSON.parse(sessionStorage.getItem('messages')) : [];
    currentMessages.push(message);
    sessionStorage.setItem('messages', JSON.stringify(currentMessages));

    // Display the new message
    $("#greetings").append("<tr><td>" + message.message + "</td></tr>");
}
function updateSendButtonVisibility() {
    var msg = $("#msg").val().trim();
    if (msg.length > 0) {
        $("#send").show();
    } else {
        $("#send").hide();
    }
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#connect").click(function () { connect(); });
    $("#disconnect").click(function () { disconnect(); });
    $("#send").click(function () { sendName(); });


    updateSendButtonVisibility();


    $("#msg").on("input", function () {
        updateSendButtonVisibility();
    });
});
