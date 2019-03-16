// The API object contains methods for each kind of request we'll make
// They each have a 'route' argument to accomodate different routes with the same call

// var db = require("../../models");

const API = {
  postMethod: function(data, route) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/" + route,
      data: JSON.stringify(data)
    });
  },
  getMethod: function(route) {
    return $.ajax({
      url: "api/" + route,
      type: "GET"
    });
  },
  deleteMethod: function(route, id) {
    return $.ajax({
      url: "api/" + route + "/" + id,
      type: "DELETE"
    });
  }
};

// refreshBars gets new examples from the db and repopulates the list
const refreshBars = function() {
  API.getMethod().then(() => {
    // Instead of all this, tie the refresh bars to a button

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// userFormSubmit is called whenever we submit a new user
// Save the new user to the db and refresh the list
const userFormSubmit = event => {
  event.preventDefault();

  const userInfo = {
    username: $("#signup-username")
      .val()
      .trim(),
    email: $("#signup-email")
      .val()
      .trim(),
    phone: $("#signup-phone")
      .val()
      .trim(),
    password: $("#inputPassword3")
      .val()
      .trim(), // This will need to swap to the hashed password
    isBusiness: $("input[name='gridRadios']:checked").val()
  };
  console.log(userInfo);

  API.postMethod(userInfo, "signup").then(() => {
    if (userInfo.isBusiness) {
      console.log("On the way to business");
      window.location.href = "/members";
    } else {
      console.log("On the way to user");
      window.location.href = "/user"; // ----- This should go to the user homepage
    }
  });

  $("#signup-username").val("");
  $("#signup-email").val("");
  $("#signup-phone").val("");
  $("#inputPassword3").val("");
};

// delete business
const deleteBusinessClick = () => {
  const idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteMethod(idToDelete).then(function() {
    // Go to landing page
  });
};

// delete user
const deleteUserClick = () => {
  const idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteMethod(idToDelete).then(function() {
    // Go to landing page
  });
};

const hrefToBusiness = () => {
  window.location.href = "/api/login";
};

const loginUser = (email, password) => {
  $.post("/api/login", {
    email: email,
    password: password
  })
    .then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    })
    .catch(function(err) {
      console.log(err);
    });
};

$("#submit-login-btn").on("click", event => {
  event.preventDefault();

  const loginInfo = {
    email: $("#login-email")
      .val()
      .trim(),
    password: $("#login-password")
      .val()
      .trim()
  };

  if (!loginInfo.email || !loginInfo.password) {
    return;
  }

  loginUser(loginInfo.email, loginInfo.password);
  // then we compare each in the html routes
  // and check the isBusiness from the get
  console.log("toDashboard func triggered");
  // setTimeout(hrefToBusiness, 1000);
  $("#login-email").val("");
  $("#login-password").val("");
});

// Add event listeners to the submit and delete buttons
$("#signup-submit-btn").on("click", userFormSubmit);

$("#refresh-btn").on("click", refreshBars);
$(".delete-business-btn").on("click", ".delete", deleteBusinessClick);
$(".delete-account-btn").on("click", ".delete", deleteUserClick);
