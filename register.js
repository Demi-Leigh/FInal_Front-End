function register() {
  let fullname = document.querySelector(".fullname").value;
  let username = document.querySelector(".username").value;
  let password = document.querySelector(".password").value;

  let userInfo = {
    full_name: fullname,
    username: username,
    password: password,
  };

  fetch("https://capstone-final-project1.herokuapp.com/registration/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => console.log(response.json()))
    .then(() => {
      alert("Successfully Registered");
      // window.location = "./login.html";
    });
}
