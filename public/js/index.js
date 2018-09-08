$(document).ready(function() {

  $("#submit").on("click", function(event){
  
    event.preventDefault();
  
    var game = $("#tournament-game").val().trim();
    var totalTeams = $("#tournament-totalTeams").val().trim();
    var teamSize = $("#tournament-teamSize").val().trim();
    var entryFee = $("#tournament-entryFee").val().trim();
    var prize = $("#tournament-prize").val().trim();
    var team = false;
    var tournament = {
    game: game,
    totalTeams: totalTeams,
    currentTeams: 0,
    teamSize: teamSize,
    entryFee: entryFee,
    prize: prize,
    team: team
  }
  
  console.log(tournament);
  
  $.ajax('/api/tournament/create', {
    type: 'POST',
    data: tournament
  }).then(function() {
  
  });
  
  });
  
  //on click event to join tournament
  $('.join-tournament').on('click', function() {

    var tournamentId = $(this).data('id');
    var playerId = {
      team: 1 //replace with session storage user id.
    }

    $.ajax({
      url: '/api/tournament/join/' + tournamentId,
      type: 'PUT',    
      data: playerId,
      dataType: 'json',
      success: function(result) {
          alert("success?");
      }
  });

  });

  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $exampleList.on("click", ".delete", handleDeleteBtnClick);

});