import { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'
import { SyncOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok ,setOk]  = useState(false)
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('loading', loading);
    // console.log(name, email, password, secret);
    axios
      .post("/api/auth/register", {
        name,
        email,
        password,
        secret,
      })
      .then((res) => {console.log(res)
      
        setOk(res.ok);
      toast.success("Successfully registered")})
      .catch((err) => {  console.log(err)
      toast.error(err.response.data)
      setLoading(false);
      });
   

setTimeout(() => {

  setLoading(false);
}, 3000);

  };

  return (
   
    <div className="container-fluid">
    <div className="row py-5 text-light bg-default-image">
      <div className="col text-center">
        <h1>Register</h1>
      </div>
    </div>

    <div className="row py-5">
      <div className="col-md-6 offset-md-3">
        <AuthForm
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          secret={secret}
          setSecret={setSecret}
          loading={loading}
        />
      </div>
    </div>

    <div className="row">
      <div className="col">
        <Modal
          title="Congratulations!"
          visible={ok}
          onCancel={() => setOk(false)}
          footer={null}
        >
          <p>You have successfully registered.</p>
          <Link href="/login">
            <a className="btn btn-primary btn-sm">Login</a>
          </Link>
        </Modal>
      </div>
    </div>

    <div className="row">
      <div className="col">
        <p className="text-center">
          Already registered?{" "}
          <Link href="/login">
            <a>Login</a>
          </Link>
        </p>
      </div>
    </div>
  </div>

  );
};

export default Register;