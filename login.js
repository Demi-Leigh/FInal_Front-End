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
    .then((response) => console.log(response.json()))
    .then((data) => {
      console.log(data);
      alert("Successfully Registered");
      window.location = "./home.html";
    });
}
