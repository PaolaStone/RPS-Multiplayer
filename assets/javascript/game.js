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

var player1Status = "notLogged";
var player1Name = "";
var selection1 = "";
var wins1 = 0;
var losses1 = 0;


var player2Status = "notLogged";
var player2Name = "";
var selection2 = "";
var wins2 = 0;
var losses2 = 0;

var playersRef = database.ref("/players");
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
var chatRef = database.ref("/chat");
// console.log("this is connected  "+ connectedRef)

player1Object = {
    player1Status : "",
    player1Name: "",
    player1Choice: "",
    wins1: 0,
    losses1: 0,
}

player2Object = {
    player2Status : "",
    player2Name: "",
    player2Choice: "",
    wins2: 0,
    losses2: 0,
}



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

// function selectPlayerHide() {
//     var x = document.getElementById("selectPlayer");
//     x.style.display = "none";
// }

// function selectPlayerShow() {
//     var x = document.getElementById("selectPlayer");
//     x.style.display = "block";
// }

function selected1Hide() {
    var x = document.getElementById("selected1");
    x.style.display = "none";
}

function selected1Show() {
    var x = document.getElementById("selected1");
    x.style.display = "block";
}

function selected2Hide() {
    var x = document.getElementById("selected2");
    x.style.display = "none";
}

function selected2Show() {
    var x = document.getElementById("selected2");
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

// gameAreatHide();

connectedRef.on("value", function(snap){
    if (snap.val()){
        var con = connectionsRef.push(true);
        con.onDisconnect().remove();
    }
});

function selected1 (){
   // gameAreaShow();
    selected2Hide();
    // player2FormHide();
    container2Hide();
    resultHide();
    chatHide();
    selected1Show();
    player1FormShow();
    shoot1Hide();
    
    $("#player1Name").on("click", function(){
        event.preventDefault();
        player1Name = $("#player1-input").val().trim();
        database.ref().push({
            player1Status: "logged",
            player1Name:player1Name,
        });
        player1FormHide();
        $("#player1").append(player1Name + "  ,you are player 1");
        shoot1Show();
        resultShow();
        chatShow();

    });
};

function selected2 (){
    
    gameAreaShow();
    selected1Hide();
    player1FormHide();
    resultHide();
    container1Hide();
    chatHide();
    shoot2Hide();
    selected2Show();
    player2FormShow();
    
    $("#player2Name").on("click", function(){
        event.preventDefault();
        player2Name = $("#player2-input").val().trim();
        database.ref().push({
            player2Status: "logged",
            player2Name:player2Name,
        });
        player2FormHide();
        $("#player2").append(player2Name + "  ,you are player 2");
        shoot1Show();
        resultShow();
        chatShow();

    });
};

connectionsRef.on("value", function(snap){
    console.log("this is the number of connections  "+ snap.numChildren());
    console.log("p1 status before if  " + player1Status)
    if (snap.numChildren() === 1 && player1Status === "notLogged"){
        console.log("display player 1 picture and form");
        selected1 ();
        player1Status = "logged"
        console.log("p1 status bafter if  " + player1Status)
    }
    console.log("p2 status before if  " + player2Status)
    if (snap.numChildren() === 2 && player1Status === "notLogged") {
        console.log("display player 2 picture and form");
        selected2 ();
        player2Status = "logged"
        console.log("p2 status after if  " + player2Status)
    }
    
})



// $("#selected1").on("click", function(){
//     event.preventDefault();
//     gameAreaShow();
//     selectPlayerHide();
//     resultHide();
//     container2Hide();
//     chatHide();
//     shoot1Hide();
    
//     $("#player1Name").on("click", function(){
//         event.preventDefault();
//         player1Name = $("#player1-input").val().trim();
//         database.ref().push({
//             player1Name:player1Name,
//         });
//         player1FormHide();
//         $("#player1").append(player1Name + "  ,you are player 1");
//         shoot1Show();
//         resultShow();
//         chatShow();

//     });
    
// });

// $("#selected2").on("click", function(){
//     event.preventDefault();
//     gameAreaShow();
//     selectPlayerHide();
//     resultHide();
//     container1Hide();
//     chatHide();
//     shoot2Hide();
    
//     $("#player2Name").on("click", function(){
//         event.preventDefault();
//         player2Name = $("#player2-input").val().trim();
//         database.ref().push({
//             player2Name:player2Name,
//         });
//         player2FormHide();
//         $("#player2").append(player2Name + "  ,you are player 2");
//         shoot2Show();
//         resultShow();
//         chatShow();

//     });
    




  // the end
});
