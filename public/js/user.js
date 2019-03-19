$(document).ready(function() {
  var usernameDisplay = $("#username-display");

  function getUsername() {
      $.get("/api/members")
  }

})