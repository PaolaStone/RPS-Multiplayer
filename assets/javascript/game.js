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
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
var chatRef = database.ref("/chat");

player1Object = {
    player1Choice: "",
    wins1: 0,
    ties1: 0,
}

player2Object = {
    player2Choice:"",
    wins2: 0,
    ties2: 0,
}

var player1Ref = database.ref("/player1");
var player2Ref = database.ref("/player2");


// Register connections
connectedRef.on("value", function(snap){
    if (snap.val()){
        var con = connectionsRef.push(true);
        con.onDisconnect().remove();
    }
});

// Connect to players' pages
connectionsRef.on("value", function(snap) {
    console.log((snap.numChildren()));
    if ((snap.numChildren()) > 2){
        $("#startGame").hide();
        $("#just2").append("Two people are playing already, try again later.")
    };
    $("#startGame").on("click", function(){
        event.preventDefault();
        if ((snap.numChildren()) === 1){
            window.location.href = "player1.html";
        };
        if ((snap.numChildren()) === 2){
            window.location.href = "player2.html";
        };

    });
});



// Remove previous choices from FB
function playersClearChoice(){
    player1Ref.remove();
    player2Ref.remove();
    // choice();
}

// Get players' choice on click
   
function start(){
    playersClearChoice();
    $(".btn-outline-danger").prop("disabled",false);
    $(".btn-outline-primary").prop("disabled",false);
}

// start();

function choice(){
    if ((player1Object.player1Choice==="") || (player2Object.player2Choice === "")){
        console.log("waiting on users")
    }

    shoot();
}

choice();

var test1= "";
var test2= "";

function shoot(){
    playersClearChoice();
    $(".btn-outline-danger, .btn-outline-primary").on("click",function(){
        event.preventDefault();
        var firstEntry = this.id
        console.log(firstEntry.slice(0,-1))
        console.log(firstEntry)
        if (firstEntry.slice(-1) === "1"){
            console.log(this.id);
            player1Object.player1Choice = firstEntry.slice(0,-1)
            player1Ref.set(player1Object.player1Choice)
            $(".btn-outline-danger").prop("disabled",true);
            $("#yourChoice1").append("You selected " + player1Object.player1Choice);   
            
        }else{
            player2Object.player2Choice = firstEntry.slice(0,-1)
            player2Ref.set(player2Object.player2Choice)
            $(".btn-outline-primary").prop("disabled",true);
            $("#yourChoice2").append("You selected " + player2Object.player2Choice);
            
        }
  
        database.ref().on("value", function(snapshot) {
            test1 = snapshot.val().player1;
            test2 = snapshot.val().player2;

            if((test1!=="") && (test2!== "")){   
                results();
            } 

        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        })
    });
 
}

// Get choices and compare
function results(){
    if (test1 === test2){
        player1Object.ties1 = player1Object.ties1 + 1;
        player2Object.ties2 = player2Object.ties2 + 1;
        
    }
    if (((test1 === "rock") && (test2 ==="scissors")) || ((test1 === "paper") && (test2 ==="rock")) || ((test1 === "scissors") && (test2 ==="paper"))){
        player1Object.wins1 = player1Object.wins1 + 1;
        console.log(player1Object.wins1)

    }else if (((test2 === "rock")&& (test1 ==="scissors")) || ((test2 === "paper") && (test1 ==="rock")) || ((test2 === "scissors") && (test1 ==="paper"))){
        player2Object.wins2 = player2Object.wins2 + 1;
        console.log(player2Object.wins2)
    }

    
    $("#wins1").html("Wins:  " + player1Object.wins1);
    $("#wins2").html("Wins:  " + player2Object.wins2);
    $("#ties1").html("Ties:  " + player1Object.ties1);
    $("#ties2").html("Ties:  " + player2Object.ties2);

    


}

// The end
});

