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
        <button onClick={signIn} className="border text-sm font-medium border-gray-300 p-2 rounded-xl cursor-pointer w-fit ml-auto hover:bg-blue-500 hover:text-white duration-300 mt-2 block">Sign in</button>
        </>
    )
}