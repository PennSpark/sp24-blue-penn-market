import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import './App.css';
import './components/pages/Login.css';

console.log("here1");
const supabase = createClient(process.env.REACT_APP_MY_SUPABASE_URL, process.env.REACT_APP_MY_SUPABASE_KEY);
console.log("here2");

function App() {
  const [session, setSession] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);

  // Define the function to check if the user exists
  const checkUserExists = (userId) => {
    console.log("Checking user existence for ID:", userId);
    Axios.get(`http://localhost:3256/landing?sessionID=${userId}`)
      .then(response => {
        if (response.status === 200) {
          setLoginStatus(true);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoginStatus(false);
      });
  };

  useEffect(() => {
    async function checkSessionAndUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user) {
        setSession(session);
        checkUserExists(session.user.id);
      } else {
        setSession(null);
        setLoginStatus(false);
      }
    }

    checkSessionAndUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event);
      if (session && session.user) {
        setSession(session);
        checkUserExists(session.user.id);
      } else {
        setSession(null);
        setLoginStatus(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="App-background">
        <div className="App-container">
          <p>Note: Please use your UPenn email!</p>
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} />
        </div>
      </div>
    );
  } else if (!loginStatus) {
    return (
      <div className="App-background">
        <div className="App-container">
          <Login email={session.user.email} id={session.user.id} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Home />
        <div>HI! You are logged in! Your user ID is {session.user.id}. Email is {session.user.email}.</div>
        <button className="postButton" onClick={async () => {
          await supabase.auth.signOut();
          setLoginStatus(false); // Ensure login status is reset on sign out
        }}>
          SIGN OUT
        </button>
      </div>
    );
  }
}

export default App;