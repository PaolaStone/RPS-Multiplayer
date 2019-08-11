$(document).ready(function(){

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDKsjTueEHR70BGgCvMVFprrlz8wYt7BSM",
    authDomain: "rps-c5bbe.firebaseapp.com",
    databaseURL: "https://rps-c5bbe.firebaseio.com",
    projectId: "rps-c5bbe",
    storageBucket: "",
    messagingSenderId: "941220107994",
    appId: "1:941220107994:web:03376fedc278e9bf"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);


var database = firebase.database();

var player1Name = ""
var selection1 = ""
var wins1 = 0
var losses1 = 0

var player2Name = ""
var selection2 = ""
var wins2 = 0
var losses2 = 0

function gameAreatHide() {
    var x = document.getElementById("gameArea");
    x.style.display = "none";
}

function gameAreaShow() {
    var x = document.getElementById("gameArea");
    x.style.display = "block";
}

function container1Hide() {
    var x = document.getElementById("container1");
    x.style.display = "none";
}

function container1Show() {
    var x = document.getElementById("container1");
    x.style.display = "block";
}

function container2Hide() {
    var x = document.getElementById("container2");
    x.style.display = "none";
}

function container2Show() {
    var x = document.getElementById("container2");
    x.style.display = "block";
}

function resultHide() {
    var x = document.getElementById("result");
    x.style.display = "none";
}

function resultShow() {
    var x = document.getElementById("result");
    x.style.display = "block";
}

function chatHide() {
    var x = document.getElementById("chat");
    x.style.display = "none";
}

function chatShow() {
    var x = document.getElementById("chat");
    x.style.display = "block";
}

function selectPlayerHide() {
    var x = document.getElementById("selectPlayer");
    x.style.display = "none";
}

function selectPlayerShow() {
    var x = document.getElementById("selectPlayer");
    x.style.display = "block";
}

function player1FormHide() {
    var x = document.getElementById("player1Form");
    x.style.display = "none";
}

function player1FormShow() {
    var x = document.getElementById("player1Form");
    x.style.display = "block";
}

function shoot1Hide() {
    var x = document.getElementById("shoot1");
    x.style.display = "none";
}

function shoot1Show() {
    var x = document.getElementById("shoot1");
    x.style.display = "block";
}

function player2FormHide() {
    var x = document.getElementById("player2Form");
    x.style.display = "none";
}

function player2FormShow() {
    var x = document.getElementById("player2Form");
    x.style.display = "block";
}

function shoot2Hide() {
    var x = document.getElementById("shoot2");
    x.style.display = "none";
}

function shoot2Show() {
    var x = document.getElementById("shoot2");
    x.style.display = "block";
}

gameAreatHide();

$("#selected1").on("click", function(){
    event.preventDefault();
    gameAreaShow();
    selectPlayerHide();
    resultHide();
    container2Hide();
    chatHide();
    shoot1Hide();
    
    $("#player1Name").on("click", function(){
        event.preventDefault();
        player1Name = $("#player1-input").val().trim();
        database.ref().push({
            player1Name:player1Name,
        });
        player1FormHide();
        $("#player1").append(player1Name + "  ,you are player 1");
        shoot1Show();
        resultShow();
        chatShow();

    });
    
});

$("#selected2").on("click", function(){
    event.preventDefault();
    gameAreaShow();
    selectPlayerHide();
    resultHide();
    container1Hide();
    chatHide();
    shoot2Hide();
    
    $("#player2Name").on("click", function(){
        event.preventDefault();
        player2Name = $("#player2-input").val().trim();
        database.ref().push({
            player2Name:player2Name,
        });
        player2FormHide();
        $("#player2").append(player2Name + "  ,you are player 2");
        shoot2Show();
        resultShow();
        chatShow();

    });
    
});



  // the end
});
