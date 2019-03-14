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
    name: $name.val().trim(),
    email: $email.val().trim(),
    phone: $phone.val().trim(),
    password: $password.val().trim()
  };

  if (
    !(userInfo.name && userInfo.email && userInfo.phone && userInfo.password)
  ) {
    alert("You must enter all fields!");
    return;
  }

  API.postMethod(userInfo).then(() => {
    // refreshExamples();
  });

  $name.val("");
  $email.val("");
  $phone.val("");
  $password.val("");
};

// deleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
const deleteBtnClick = () => {
  const idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteMethod(idToDelete).then(function() {
    // refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", userFormSubmit);
$exampleList.on("click", ".delete", deleteBtnClick);
