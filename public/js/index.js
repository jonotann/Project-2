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

/*
// The API object contains methods for each kind of request we'll make
var API = {
  saveTournament: function(tournament) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/tournaments/create",
      data: JSON.stringify(tournament)
    });
  },
  getTournament: function() {
    return $.ajax({
      url: "api/tournaments",
      type: "GET"
    });
  },
  deleteTournament: function(id) {
    return $.ajax({
      url: "api/tournaments/" + id,
      type: "DELETE"
    });
  }
};

// refreshtournaments gets new tournaments from the db and repopulates the list
var refreshTournaments = function() {
  API.getTournaments().then(function(data) {
    var $tournaments = data.map(function(tournament) {
      var $a = $("<a>")
        .game(tournament.game)
        .attr("href", "/tournament/" + tournament.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": tournament.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .game("ｘ");

      $li.append($button);

      return $li;
    });

    $tournamentList.empty();
    $tournamentList.append($tournaments);
  });
};

// handleFormSubmit is called whenever we submit a new tournament
// Save the new tournament to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var tournament = {
    game: $tournamentgame.val().trim(),
    description: $tournamentDescription.val().trim(),
    totalTeams: $tournamentTotalTeams.val().trim(),
    teamSize: $tournamentTeamSize.val().trim(),
    image: $tournamentImage.val().trim()
  };


  API.saveTournament(tournament).then(function() {
    refreshTournaments();
  });

  $tournamentgame.val("");
  $tournamentDescription.val("");
  $tournamentTotalTeams.val("")
  $tournamentTeamSize.val("")
  $tournamentImage.val("")
};

// handleDeleteBtnClick is called when an tournament's delete button is clicked
// Remove the tournament from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteTournament(idToDelete).then(function() {
    refreshTournaments();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$tournamentList.on("click", ".delete", handleDeleteBtnClick);
*/

});