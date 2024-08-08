import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

import { app } from "./firebase-config"

const auth = getAuth(app)
const fbAuthProvider = new FacebookAuthProvider()

export const FacebookAuth = async() => {
    console.log("aa")
    try {
        console.log(auth,"auth")
        console.log(fbAuthProvider,"ap")
        const fbAuth = await signInWithPopup(auth, fbAuthProvider)
        return fbAuth
    } catch (error) {
        console.log(error,"error")
        if (error.code === 'auth/popup-closed-by-user') {
            console.log('The popup has been closed by the user before completing the sign-in.')
        } else {
            console.error(error)
        }
    }
}