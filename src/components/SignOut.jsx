import {auth} from '../services/Firebase'
import { signOut } from 'firebase/auth'

export function SignOut () {
    
    function handleSignOut () {
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    }
    
    return (
        <>
        <button onClick={handleSignOut} className="border text-sm font-medium border-gray-300 p-2 rounded-xl cursor-pointer w-fit mr-auto md:mx-auto hover:bg-blue-500 hover:text-white duration-300 block">Sign out</button>
        </>
    )
}