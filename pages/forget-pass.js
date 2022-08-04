import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Button } from "antd";
import Link from "next/link";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";
import { useRouter } from "next/router";
import { UserContext } from "../context";
import { authPage } from "../middlewares/auth";

const ForgotPassword = ({token}) => {
  const [email, setEmail] = useState("ryan2@gmail.com");
  const [newPassword, setNewPassword] = useState("rrrrrr");
  const [secret, setSecret] = useState("red");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const [state] = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("send those", email, newPassword, secret);
      const { data } = await axios.post("/api/user/forget-pass", {
        email,
        newPassword,
        secret,
      },
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
      
      
      );

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
      if (data.success) {
        setEmail("");
        setNewPassword("");
        setSecret("");
        setLoading(false);
        setOk(true);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (state && state.token) return <></>;

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-default-image">
        <div className="col text-center">
          <h1 className="text-light">Forgot password</h1>
        </div>
      </div>

      {/* form */}
      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <ForgotPasswordForm
            email={email}
            setEmail={setEmail}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <Modal
            title="Congratulations!"
            visible={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>Congrats. Now you can login with your new password.</p>
            <Link href="/login">
              <a className="btn btn-sm btn-primary">Login</a>
            </Link>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;



export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);
  // console.log('token in Server side in Dashboard',token);

  return {
    props: {
      token,
    },
  };
}
