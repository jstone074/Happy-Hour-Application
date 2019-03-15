// The API object contains methods for each kind of request we'll make
// They each have a 'route' argument to accomodate different routes with the same call

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
  API.getMethod().then(data => {
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
    name: $("#name")
      .val()
      .trim(),
    email: $("#email")
      .val()
      .trim(),
    phone: $("#phone")
      .val()
      .trim(),
    password: $("#password")
      .val()
      .trim(), // This will need to swap to the hashed password
    isBusiness: $("#business-radio").val()
  };

  if (
    !(userInfo.name && userInfo.email && userInfo.phone && userInfo.password)
  ) {
    alert("You must enter all fields!");
    return;
  }

  API.postMethod(userInfo, "user").then(() => {
    if (userInfo.isBusiness) {
      window.location.href = "/business";
    } else {
      window.location.href = "/user"; // ----- This should go to the user homepage
    }
  });

  $name.val("");
  $email.val("");
  $phone.val("");
  $password.val("");
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

// Add event listeners to the submit and delete buttons
$("#submit").on("click", userFormSubmit);
$("#refresh-btn").on("click", refreshBars);
$(".delete-business-btn").on("click", ".delete", deleteBusinessClick);
$(".delete-account-btn").on("click", ".delete", deleteUserClick);
