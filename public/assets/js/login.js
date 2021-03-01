$(document).ready(function () {
  // Getting references to our form and inputs
  var loginForm = $("#login-btn");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("click", function (event) {
    event.preventDefault();
    var usernameInput = $("input[name='username']");
    var passwordInput = $("input[name='password']");

    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
    };
    if (!userData.username || !userData.password) {
      return;
    }
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(username, password) {
    $.post("/api/login", {
      username: username,
      password: password,
    }).then(function () {
      window.location.replace("page2_restaurant");
      // If there's an error, log the error
    });
  }
});
