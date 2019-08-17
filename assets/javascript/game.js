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

// var player1Status = "notLogged";
// var player1Name = "";
// var player1Choice = "";
// var wins1 = 0;
// var losses1 = 0;


// var player2Status = "notLogged";
// var player2Name = "";
// var player2Choice = "";
// var wins2 = 0;
// var losses2 = 0;

var player1Ref = database.ref("/player1");
var player2Ref = database.ref("/player2");

var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
var chatRef = database.ref("/chat");

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

$(".btn-outline-danger").hide();
$(".btn-outline-primary").hide();



function checkConnections (){
    connectionsRef.on("value", function(snap){
        console.log("this is the number of connections  "+ snap.numChildren());
        if ( player1Status === "notLogged" && player2Status === "notLogged"){
            console.log("waiting on players to enter name")
        }
        if (snap.numChildren() === 1 && player1Status === "logged"){
            player1FormHide();
            document.getElementById("player1Name").disabled = true;
            console.log(" 1 connection and 1 logged")
            // database.ref().push({
            //     player1Status: player1Status,
            //     player1Name: player1Name,
            
            // })
            playersRef.push(player1Name)
            // postsRef.push().setValueAsync(new Post("alanisawesome", "The Turing Machine"));
        }
        if (snap.numChildren() === 2 && player1Status === "logged"){
            player1FormHide();
            console.log(" 2 connection and 1 logged")
            database.ref().on("value", function(snapshot){
                if (snapshot.child("player1Status").exists() && snapshot.child("player1Name").exists()) {
                    document.getElementById("player1Name").disabled = true;
                    console.log("this is exist" + player1Status)
                }
            });
        }
        if (snap.numChildren() === 1 && player2Status === "logged"){
            player2FormHide();
            console.log(" 1 connection and 2 logged")
            document.getElementById("player2Name").disabled = true;
        }
        if (snap.numChildren() === 2 && player2Status === "logged"){
            player2FormHide();
            console.log(" 1 connection and 2 logged")
            document.getElementById("player2Name").disabled = true;
        }
    });
}
// checkConnections();

connectedRef.on("value", function(snap){
    if (snap.val()){
        var con = connectionsRef.push(true);
        con.onDisconnect().remove();
        
    }
});

function choicesArea(){
    
    if (player1Object.player1Name !=="" && player2Object.player2Name !== ""){
        $(".btn-outline-danger").show();
        $(".btn-outline-primary").show();
        console.log("this is choices area")
    }
}

$("#player1Name").on("click", function(){
    event.preventDefault();
    player1Object.player1Status = "logged"
    player1Object.player1Name = $("#player1-input").val().trim();
    console.log("p1 status  " + player1Object.player1Status)
    console.log("p1 name  " + player1Object.player1Name)
    console.log (player1Object)
    $("#selected1").prepend(player1Object.player1Name + "<p></p>")
    $("#player1-input").hide();
    $("#player1Name").hide();
    choicesArea()
    player1Ref.push({
        player1Object
    });
    
});



$("#player2Name").on("click", function(){
    event.preventDefault();
    player2Object.player2Status = "logged"
    player2Object.player2Name = $("#player2-input").val().trim();
    console.log("p2 atatus  " + player2Object.player2Status)
    console.log("p2 name  " + player2Object.player2Name)
    console.log(player2Object)
    $("#selected2").prepend(player2Object.player2Name + "<p></p>")
    $("#player2Name").hide();
    $("#player2-input").hide();
    choicesArea()
    player2Ref.push({
        player2Object
    });
    
});




console.log(player2Object.player2Name)





function choice1(){
    $(".btn-outline-danger").on("click",function(){
        console.log("clicked " + this.id)
        player1Object.player1Choice = this.id
        player1Ref.push(player1Object.player1Choice)
        console.log(player1Object)
        $(".btn-outline-danger").prop("disabled",true);
    })
}

choice1();

function choice2(){
    $(".btn-outline-primary").on("click",function(){
        console.log("clicked " + this.id)
        player2Object.player2Choice = this.id
        player2Ref.push(player2Object.player2Choice)
        console.log(player2Object)
        $(".btn-outline-primary").prop("disabled",true);
    })
}

choice2();


// connectedRef.on("value", function(snap){
//     if (snap.val()){
//         var con = connectionsRef.push(true);
//         con.onDisconnect().remove();
//     }
// });




// The end
});

