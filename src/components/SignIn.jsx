import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth} from '../services/Firebase'
export function SignIn () {
    const provider = new GoogleAuthProvider();
   



    function signIn() {

        signInWithPopup(auth, provider)
        .then((result) => {
        const user = result.user;
  }).catch((error) => {
    console.log(error.code);
  console.log(error.message);
  });
    }



    
    return (
        <>
        <button onClick={signIn}>Sign in</button>
        </>
    )
}