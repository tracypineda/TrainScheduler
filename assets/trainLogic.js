
$(document).ready(function() {
var firebaseConfig = {
  apiKey: "AIzaSyDgg2Q5j4PJanad46ElONIlhgA3waPlxSY",
  authDomain: "test-71539.firebaseapp.com",
  databaseURL: "https://test-71539.firebaseio.com",
  projectId: "test-71539",
  storageBucket: "train-schedule",
  messagingSenderId: "387494104527",
  appId: "1:387494104527:web:380eec419d7b6eb36516ba"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
// 
$("#add-train").on("click",function(){
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainFreq = $("#frequency-input").val().trim();
  var trainFirstTime = $("#first-train-input").val().trim();
      var newTrain = {
        name: trainName,
        dest: trainDest,
        freq: trainFreq,
        first: trainFirstTime,
        nextTrain: (""),
        mins: (""),
      };
      
      database.ref().push(newTrain);
      console.log(newTrain);
      // empty the form
      $("input").val("");
      
    });
    // on click child function
    
    // get the kids in the database   
    
    database.ref().on("child_added", function (childSnapshot) {
      console.log(childSnapshot.val());
    
      // Store everything into a variable.
      var trainName = childSnapshot.val().name;
      var trainDest = childSnapshot.val().dest;
      var trainFreq = childSnapshot.val().freq;
      var trainFirstTime = childSnapshot.val().first;
      console.log(trainFirstTime);
  //  convert the train time
      // var freq = parseInt(freq);
      var currentTime = moment().format("MMMM Do YYYY, LT");
      console.log(currentTime);

      
      var timeConverted = moment(childSnapshot.val().first, "LT").subtract(1, "years");

      var trainFirstTime = moment(timeConverted).format("LT");
      console.log(timeConverted);

      // difference between the times
      var timeConverted=moment(trainFirstTime, "LT").subtract(1,"years");

      var tDifference = moment().diff(moment(timeConverted), "minutes");
      console.log(tDifference);

      // remainder
      var tRemainder = tDifference % trainFreq;
      // mins to next train
      var minsAway = trainFreq - tRemainder;
      console.log(minsAway);
      // next train
      var nextTrain = moment().add(minsAway, "minutes");
      console.log(nextTrain);

      // adding to the table
      $("#currentTime").text("Current Time: " + currentTime);
      // Create the new row
      $("#train-details").append(
        "<tr><td id='nameDisplay'>" + childSnapshot.val().name +
        "</td><td id='destDisplay'>" + childSnapshot.val().dest +
        "</td><td id='freqDisplay'>" + childSnapshot.val().freq +
        "</td><td id='nextDisplay'>" + moment(nextTrain).format("LT") +
        "</td><td id='awayDisplay'>" + minsAway  + "</td></tr>");
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    
    });
  })
    
