import { Link, useNavigate } from "react-router-dom";
import { withRouter } from "../../routes/withRouter";
import { useState } from "react";
import { Api } from "../../utils/api";

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = async (ev: any) => {
    ev.preventDefault();
    setStatus("");
    try {
      const res = await Api().post("auth/register", {
        name,
        email,
        password,
      });

      console.log(res);

      if (res.status === 200) {
        navigate("/");
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
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Create an Account!
                      </h1>
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleFirstName"
                          placeholder="First Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          placeholder="Email Address"
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
                      {status && message && (
                        <div className={`alert alert-${status}`} role="alert">
                          {message}
                        </div>
                      )}

                      <button
                        onClick={onRegister}
                        className="btn btn-primary btn-user btn-block"
                      >
                        Register
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link className="small" to="/">
                        Already have an account? Login!
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

export default withRouter(Register);
