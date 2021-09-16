function login() {
  let username = document.querySelector(".username").value;
  let password = document.querySelector(".password").value;

  let userInfo = {
    username: username,
    password: password,
  };

  fetch("https://capstone-final-project1.herokuapp.com/user_login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => response.json())
    .then((data) => {
      let user = data.user;
      if (
        user != null &&
        userInfo["username"] === user[2] &&
        userInfo["password"] === user[3]
      ) {
        JSON.stringify(localStorage.setItem("usersinfo", userInfo));
        alert("Successfully Logged In");
        window.location = "./home.html";
      } else if (user === null) {
        alert("Incorrect Details or Not Registered!!");
      }
    });
}
