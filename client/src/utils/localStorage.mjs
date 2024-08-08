const GOOGLE_KEY = "googleToken"

const FACEBOOK_KEY = "facebookToken"

const USER_KEY = "token"

export const getToken = () => {
    return getUserToken() || getGoogleToken() || getFacbookToken()
}

export const removeAllTokens = () => {
    removeUserToken()
    removeGoogleToken()
    removeFacebookToken()
}

export const setGoogleToken = (token) => {
    localStorage.setItem(GOOGLE_KEY, token)
}

export const getGoogleToken = () => {
   return localStorage.getItem(GOOGLE_KEY)
}

export const removeGoogleToken = () => {
    localStorage.removeItem(GOOGLE_KEY)
}

export const setFacebookToken = (token) => {
    localStorage.setItem(FACEBOOK_KEY, token)
}

export const getFacbookToken = () => {
   return localStorage.getItem(FACEBOOK_KEY)
}

export const removeFacebookToken = () => {
    localStorage.removeItem(FACEBOOK_KEY)
}

export const setUserToken = (token) => {
    localStorage.setItem(USER_KEY, token)
}

export const getUserToken = () => {
   return localStorage.getItem(USER_KEY)
}

export const removeUserToken = () => {
    localStorage.removeItem(USER_KEY)
}
