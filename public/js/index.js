// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

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

    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

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
      // Pop up modal/naviate to add business page
    } else {
      window.location.href = "/dashboard"; // ----- This should go to the user homepage
    }
  });

  $name.val("");
  $email.val("");
  $phone.val("");
  $password.val("");
};

// deleteBtnClick is called when a user's delete button is clicked
// Remove the example from the db and return to landing page
const deleteBtnClick = () => {
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
$("#delete-btn").on("click", ".delete", deleteBtnClick);
