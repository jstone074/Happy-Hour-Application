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
  console.log("This is the user info");
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

const createNewBusiness = event => {
  event.preventDefault();

  const businessInfo = {
    businessName: $("#new-business-name")
      .val()
      .trim(),
    businessPhone: $("#new-business-phone")
      .val()
      .trim(),
    businessAddress: $("#new-business-address")
      .val()
      .trim(),
    businessSundayHoursOpen: $("#sun-open")
      .val()
      .trim(),
    businessSundayHoursClose: $("#sun-close")
      .val()
      .trim(),
    businessMondayHoursOpen: $("#mon-open")
      .val()
      .trim(),
    businessMondayHoursClose: $("#mon-close")
      .val()
      .trim(),
    businessTuesdayHoursOpen: $("#tue-open")
      .val()
      .trim(),
    businessTuesdayHoursClose: $("#tue-close")
      .val()
      .trim(),
    businessWednesdayHoursOpen: $("#wed-open")
      .val()
      .trim(),
    businessWednesdayHoursClose: $("#wed-close")
      .val()
      .trim(),
    businessThursdayHoursOpen: $("#thu-open")
      .val()
      .trim(),
    businessThursdayHoursClose: $("#thu-close")
      .val()
      .trim(),
    businessFridayHoursOpen: $("#fri-open")
      .val()
      .trim(),
    businessFridayHoursClose: $("#fri-close")
      .val()
      .trim(),
    businessSaturdayHoursOpen: $("#sat-open")
      .val()
      .trim(),
    businessSaturdayHoursClose: $("#sat-close")
      .val()
      .trim(),
    specialSundayHours: $("#newbiz-sun-spec")
      .val()
      .trim(),
    specialMondayHours: $("#newbiz-mon-spec")
      .val()
      .trim(),
    specialTuesdayHours: $("#newbiz-tue-spec")
      .val()
      .trim(),
    specialWednesdayHours: $("#newbiz-wed-spec")
      .val()
      .trim(),
    specialThursdayHours: $("#newbiz-thu-spec")
      .val()
      .trim(),
    specialFridayHours: $("#newbiz-fri-spec")
      .val()
      .trim(),
    specialSaturdayHours: $("#newbiz-sat-spec")
      .val()
      .trim()
  };
  console.log(businessInfo);

  // API.postMethod(businessHours, "business");
  // API.postMethod(businessSpecails, "business");
  API.postMethod(businessInfo, "business");

  // $("#signup-username").val("");
  // $("#signup-email").val("");
  // $("#signup-phone").val("");
  // $("#inputPassword3").val("");
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
$("#confirm-add").on("click", createNewBusiness);
// $("#refresh-btn").on("click", refreshBars);
// $(".delete-business-btn").on("click", ".delete", deleteBusinessClick);
// $(".delete-account-btn").on("click", ".delete", deleteUserClick);
