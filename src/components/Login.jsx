import { useEffect, useState } from 'react'
 
import { YandexLogin, YandexLogout } from 'react-yandex-login';
 
const clientID = '3be5abd15a4d4712873d49868dfb2174';
 
export default function Login() {
  const [userData, setUserData] = useState(null);
  const [diskData, setDiskData] = useState(null);

  const loginSuccess = (userData) => {
    setUserData(userData);
  }
 
  const logoutSuccess = () => {
    setUserData(null);
  }

  useEffect(() => {
    if (userData) {
      fetch(`https://cloud-api.yandex.net/v1/disk/`, {
        headers: {
        "Authorization": `${userData.access_token}`
        }})
      .then(res => res.json())
      .then(json => setDiskData(json))
      .then(console.log(diskData));
    }
  }, [userData])
 
  return (
    <div>
      {!userData && 
      <>
        <h3>Для продолжения войдите в свой Яндекс аккаунт</h3>
        <YandexLogin clientID={clientID} onSuccess={loginSuccess}>
          <button>Yandex Login</button>
        </YandexLogin>
      </>
      }
      {userData &&
        <>
          <h3>Вы вошли в аккаунт как {diskData.user.display_name}</h3>
          <YandexLogout onSuccess={logoutSuccess}>
            <button>Yandex Logout</button>
          </YandexLogout>
        </>
      }
    </div>
  );
}