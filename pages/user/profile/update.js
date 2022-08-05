import { useState, useContext,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Avatar } from "antd";
import Link from "next/link";
import AuthForm from "../../../components/forms/AuthForm";
import { UserContext } from "../../../context";
import { useRouter } from "next/router";
import { authPage } from "../../../middlewares/auth";
import { LoadingOutlined, CameraOutlined } from "@ant-design/icons";

const ProfileUpdate = () => {

    

  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("Ryan");
  const [email, setEmail] = useState("ryan@gmail.com");
  const [password, setPassword] = useState("rrrrrr");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
 // profile image
 const [image, setImage] = useState({});
 const [uploading, setUploading] = useState(false);
  const [state] = useContext(UserContext);
  const router = useRouter();


  useEffect(() => {
    if (state && state.user) {
      //   console.log("user from state => ", state.user);
      setUsername(state.user.username);
      setAbout(state.user.about);
      setName(state.user.name);
      setEmail(state.user.email);
      setImage(state.user.image);
      setSecret(state.user.secret);
    }
  }, [state && state.user]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(name, email, password, secret);
      setLoading(true);
      const { data } = await axios.put(`/api/user/profile`, {
        name,
      //  email,
        password,
        secret,
        username,
        about,
        image,
      },
        {
            headers: {
                Authorization: `Bearer ${state.token}`,
            },
        }

      );

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        console.log("data", data);
           // update local storage, update user, keep token
           let auth = JSON.parse(localStorage.getItem("auth"));
           auth.user = data;
           localStorage.setItem("auth", JSON.stringify(auth));
           // update context
           setState({ ...state, user: data });
        setName("");
        setEmail("");
        setPassword("");
        setSecret("");
        setOk(data.ok);
        setLoading(false);
      }
    } catch (err) {
      toast.error(err?.response?.data);
      setLoading(false);
    }
  };


  const handleImage = async(e)=>{   // itis workkk
    const file=e.target.files[0];
    const Reader = new FileReader();
  
    Reader.readAsDataURL(file);
  try { 
  
    Reader.onload = async()=>{
    
  
     
       
  
      //  if (image) {
  
          const { data } = await axios.post("/api/posts/upload-image", { imageis: Reader.result }, );
           console.log("uploaded image => ", data);
          setImage({
            url: data.url,
            public_id: data.public_id,
          });
       
        
        
        
  
  
      // }
    }
  } catch (err) {
  
    console.log(err.message);
  }
  }
  




  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Profile</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">

        <label className="d-flex justify-content-center h5">
            {image && image.url ? (
              <Avatar size={30} src={image.url} className="mt-1" />
            ) : uploading ? (
              <LoadingOutlined className="mt-2" />
            ) : (
              <CameraOutlined className="mt-2" />
            )}
            <input
              onChange={handleImage}
              type="file"
              accept="images/*"
              hidden
            />
          </label>







          <AuthForm
            profileUpdate={true}
            username={username}
            setUsername={setUsername}
            about={about}
            setAbout={setAbout}
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

export default ProfileUpdate;



export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx);
    // console.log('token in Server side in Dashboard',token);
  
    return {
      props: {
        token,
      },
    };
  }
  