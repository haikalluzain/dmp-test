import { Link, useNavigate } from "react-router-dom";
import { withRouter } from "../../routes/withRouter";
import { useState } from "react";
import { Api } from "../../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (ev: any) => {
    ev.preventDefault();
    setStatus("");
    try {
      const res = await Api().post("/auth/login", {
        email,
        password,
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        window.location.pathname = "/jobs"
      }
    } catch (e: any) {
      setStatus("danger");
      if (e.error.errors) {
        let err = e.error.errors;
        if (err.email) {
          setMessage(err.email);
        } else {
          setMessage(err.password);
        }
      } else if (e.error.message) {
        setMessage(e.error.message);
      }
    }
  };

  return (
    <div className="container">
      {/* <!-- Outer Row --> */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form className="user" action="">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email..."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                      {status && message && (
                        <div className={`alert alert-${status}`} role="alert">
                          {message}
                        </div>
                      )}
                      <button
                        onClick={handleLogin}
                        className="btn btn-primary btn-user btn-block"
                      >
                        Login
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      Don't have an account{" "}
                      <Link className="small" to="/register">
                        Register!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
