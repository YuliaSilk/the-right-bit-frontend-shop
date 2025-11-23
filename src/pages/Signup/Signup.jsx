import {Link, useNavigate} from "react-router-dom";
import {useEffect, useCallback} from "react";
import axios from "axios";
import styles from "./Signup.module.css";
import GoogleIcon from "@assets/icons/google-colored.svg?react";

export default function Signup() {
 const API_URL = import.meta.env.VITE_API_URL || "https://right-bite-store.onrender.com";
 const navigate = useNavigate();

 // 1️⃣ Перевіряємо, чи користувач повернувся з Google із токенами
 useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");

  if (accessToken && refreshToken) {
   localStorage.setItem("access_token", accessToken);
   localStorage.setItem("refresh_token", refreshToken);
   navigate("/"); // редірект на головну
  }
 }, [navigate]);

 // 2️⃣ Старт авторизації через Google
 const handleGoogleLogin = () => {
  const redirectUri = `${window.location.origin}/signup`; // бек редіректить назад сюди
  window.location.href = `${API_URL}/api/v1/auth/google?redirect_uri=${encodeURIComponent(redirectUri)}`;
 };

 // 3️⃣ Автооновлення access токена кожні 12 годин
 useEffect(() => {
  const interval = setInterval(async () => {
   const refreshToken = localStorage.getItem("refresh_token");
   if (!refreshToken) return;

   try {
    const {data} = await axios.post(`${API_URL}/api/v1/auth/refresh`, {
     refreshToken,
    });
    const newAccessToken = data.access_token || data.accessToken;
    if (newAccessToken) {
     localStorage.setItem("access_token", newAccessToken);
     console.log("✅ Access token refreshed");
    }
   } catch (err) {
    console.error("⚠️ Failed to refresh token", err);
   }
  }, 1000 * 60 * 60 * 12); // кожні 12 годин

  return () => clearInterval(interval);
 }, [API_URL]);

 // 4️⃣ Функція для запитів з токеном (приклад)
 const fetchProtectedData = useCallback(async () => {
  try {
   const token = localStorage.getItem("access_token");
   const res = await axios.get(`${API_URL}/api/v1/user/me`, {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   });
   console.log("Protected data:", res.data);
  } catch (err) {
   console.error("Unauthorized:", err);
  }
 }, [API_URL]);

 // 5️⃣ Викликати getProtectedData() після входу можна будь-де:
 useEffect(() => {
  fetchProtectedData();
 }, [fetchProtectedData]);

 return (
  <div className={styles.wrapper}>
   <div className={styles.left}></div>
   <div className={styles.right}>
    <div className={styles.inner}>
     <h1 className={styles.title}>
      Healthy choices start here!
      <br />
      Join us today
     </h1>

     <form className={styles.form}>
      <button
       type="button"
       className={styles.socialBtn}
       onClick={handleGoogleLogin}
      >
       <GoogleIcon className={styles.socialIcon} />
       <span className={styles.socialText}>Sign up with Google</span>
      </button>

      <div className={styles.divider}>
       <hr /> <span className={styles.dividerText}>OR</span> <hr />
      </div>

      <Link
       to="/createacc"
       className={styles.emailBtn}
      >
       Sign up with email
      </Link>

      <p className={styles.terms}>
       By signing up, you agree to the <a href="#">Terms of Service </a>
       and <a href="#"> Privacy Policy</a>, including
       <a href="#">cookie use</a>.
      </p>
     </form>

     <div className={styles.footer}>
      <p className={styles.footerTitle}>Already have an account?</p>
      <Link
       to="/login"
       className={styles.loginBtn}
      >
       Log in
      </Link>
     </div>
    </div>
   </div>
  </div>
 );
}
