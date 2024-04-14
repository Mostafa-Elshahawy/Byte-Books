import React,{useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const GoogleAuthCallback = () => {
    const history = useHistory();
    useEffect(()=>{
        const handleUserAuthentication = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get('code');
                if (code) {
                  console.log('Received authorization code:', code);
                  history.push('/main'); 
                } else {
                  console.error('Code not found in query parameters');
                }
              } catch (error) {
                console.error('Error during user authentication:', error);
              }
            };

            handleUserAuthentication();
    },[history]);

  return (
    <div>
      <p>Loading...</p> 
    </div>
  );
};

export default GoogleAuthCallback;