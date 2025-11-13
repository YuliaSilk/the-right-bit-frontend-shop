import { Link } from 'react-router-dom';
import styles from './Signup.module.css';
import GoogleIcon from '@assets/icons/google-colored.svg?react';

export default function Signup() {
  const API_URL =
    import.meta.env.VITE_API_URL || 'https://right-bite-store.onrender.com';
  const navigate = useNavigate();

  useEffect(() => {
    // 1️⃣ Перевіряємо, чи користувач повернувся з Google із токенами
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      // Зберігаємо токени
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      navigate("/"); // редірект на головну або профіль
    }
  }, [navigate]);

  // 2️⃣ Функція для старту Google OAuth
  const handleGoogleLogin = () => {
    const redirectUri = `${window.location.origin}/auth/callback`;
    window.location.href = `${API_URL}/api/v1/auth/google?redirect_uri=${encodeURIComponent(redirectUri)}`;
  };

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
            <a
              className={styles.socialBtn}
              onClick={handleGoogleLogin}
            >
               <GoogleIcon className={styles.socialIcon} />
              Sign up with Google
            </a>

            <div className={styles.divider}>
              <hr /> <span className={styles.dividerText}>OR</span> <hr />
            </div>

            <Link to="/createacc" className={styles.emailBtn}>
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
            <Link to="/login" className={styles.loginBtn}>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
