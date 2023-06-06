import React from "react";
import "./App.css";
import jwt_decode from "jwt-decode";

interface GoogleDataType {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}

function App() {
  const [googleData, setGoogleData] = React.useState<
    GoogleDataType | undefined
  >();

  const handleCallbackResponse = (response: any) => {
    if (response.credential) {
      setGoogleData(jwt_decode(response.credential));
    } else {
      console.error(response);
    }
  };

  const onClickLogOut = () => {
    setGoogleData(undefined);
  };
  React.useEffect(() => {
    /* global google */
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });
    // @ts-ignore
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, [googleData]);

  if (googleData) {
    return (
      <div className="App">
        <header className="App-header">
          <picture>
            <img src={googleData.picture} alt="logo" />
          </picture>
          <h1>{`Hello, ${googleData.name}!`}</h1>
          <div>
            <button onClick={onClickLogOut}>Log out</button>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Google Login App</h1>
        <div>
          <div id="signInDiv"></div>
        </div>
      </header>
    </div>
  );
}

export default App;
