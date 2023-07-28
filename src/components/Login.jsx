import { useEffect, useState } from "react";

import { YandexLogin, YandexLogout } from "react-yandex-login";

const clientID = "3be5abd15a4d4712873d49868dfb2174";

export default function Login({ tokenData, setTokenData }) {
  const [userName, setUserName] = useState("");

  const loginSuccess = (userData) => {
    setTokenData(userData);
    localStorage.setItem("token", userData.access_token);
  };

  const logoutSuccess = () => {
    setTokenData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  };

  function getDiskData(token) {
    fetch(`https://cloud-api.yandex.net/v1/disk/`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setUserName(json.user.display_name);
        localStorage.setItem("userName", json.user.display_name);
      });
  }

  useEffect(() => {
    const lsToken = localStorage.getItem("token");
    const lsUserName = localStorage.getItem("userName");

    if (lsToken && lsUserName) {
      setTokenData(lsToken);
      setUserName(lsUserName);
    }

    if (lsToken && !lsUserName) {
      getDiskData(lsToken);
      setTokenData(lsToken);
    }
  }, [tokenData]);

  return (
    <div>
      {!tokenData && (
        <>
          <h3>Для продолжения войдите в свой Яндекс аккаунт</h3>
          <YandexLogin clientID={clientID} onSuccess={loginSuccess}>
            <button>Yandex Login</button>
          </YandexLogin>
        </>
      )}
      {tokenData && (
        <>
          <h3>Вы вошли в аккаунт как {userName}</h3>
          <YandexLogout onSuccess={logoutSuccess}>
            <button>Yandex Logout</button>
          </YandexLogout>
        </>
      )}
    </div>
  );
}
