import React from "react";
import useAPI from "../customHooks/user.api";
import { Link } from "react-router-dom";

/** uses api custom hook to sign up a new user */
function Signup() {
  const { submitNewUser, responseMessage } = useAPI();

  return (
    <div className="Signup">
      <Link className="link-button" to={`/login`}>
        back to Login
      </Link>

      <h1>Signup</h1>
      {responseMessage && <p>{responseMessage.message}</p>}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const newUser = {
            email: event.target.email.value,
            password: event.target.password.value,
          };
          submitNewUser(newUser);
        }}
      >
        <label htmlFor="email">Email</label>
        <input name="email" type="email"></input>
        <label htmlFor="password">Password</label>
        <input name="password" type="password"></input>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
