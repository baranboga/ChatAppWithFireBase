import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import "../styles/Auth.css";
import Cookies from "universal-cookie";

//Cookie nesnesini oluşturuyoruz.
const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {

  //Bu fonksiyon ile google hesabı ile giriş yapılır.
  //Google response olarak hem token hem de user bilgilerini döner. Bu user bilgileri ile kullanıcı bilgilerini alabiliriz.
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      //Kullanıcı giriş yaptıktan sonra App.js'deki isAuth state'ini true yaparız.
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="auth">
      <p> Sign In With Google To Continue </p>
      <button onClick={signInWithGoogle}> Sign In With Google </button>
    </div>
  );
};
