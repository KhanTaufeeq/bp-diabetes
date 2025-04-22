import React from "react";

function Signin() {
  return (
    <div>
      <h1>Login Please!</h1>
      <div>
        <form action="">
          <div>
            <label htmlFor="userName">UserName</label>
            <input type="text" name="user-name" id="userName" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
