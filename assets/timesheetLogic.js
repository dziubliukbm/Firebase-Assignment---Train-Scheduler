

// 1. Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyB3hbwAENgzGqk-O5oxWYK9Tascs8I327w",
  authDomain: "bootcamp-95b7d.firebaseapp.com",
  databaseURL: "https://bootcamp-95b7d.firebaseio.com",
  projectId: "bootcamp-95b7d",
  storageBucket: "bootcamp-95b7d.appspot.com",
  messagingSenderId: "31145040225",
  appId: "1:31145040225:web:0dd17894149750f5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var startTrainTime = moment($("#trainTime-input").val().trim(),"HH:mm").format("HH:mm");
  var trainFrequency = $("#frequency-input").val().trim();
  
  

  // Creates local "temporary" object for holding train data
  var newEmp = {
    name: trainName,
    destination: trainDestination,
    startTime: startTrainTime,
    frequency: trainFrequency
  };

  // Uploads employee data to the database
  database.ref().push(newEmp);

  // Logs everything to console
  console.log(newEmp.name);
  console.log(newEmp.destination);
  console.log(newEmp.startTime);
  console.log(newEmp.frequency);

  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#destination-input").val("");
  $("#trainTime-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var startTrainTime = childSnapshot.val().startTime;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(startTrainTime);
  console.log(trainFrequency);

  // Prettify the train start
  var firstTime = moment.unix(trainFrequency).format("HH:mm");
  console.log(firstTime)

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % trainFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = trainFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),

    // $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});


