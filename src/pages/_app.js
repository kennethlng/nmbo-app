import '../styles/styles.sass'
import { AuthUserContext } from '../components/Session'
import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const [authUser, setAuthUser] = useState(null); 

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(function (authUser) {
          if (authUser) {
              setAuthUser(authUser)
          } else {
              setAuthUser(null);

              auth.signInAnonymously()
                  .catch(function (error) {
                      // Handle Errors here.
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      // ...
                      console.log(errorMessage);
                  });
          }
      })
      
      return () => unsubscribe()
  }, [])

  return (
    <AuthUserContext.Provider value={authUser}>
      <Component {...pageProps} />  
    </AuthUserContext.Provider>
  )
}