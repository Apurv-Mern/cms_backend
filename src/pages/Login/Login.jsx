import React from 'react'
import './login.css';
// eslint-disable-next-line
const Login = () => {
    return (
        <div className='cont'>
            <div className="login-container">
                <h2>Login</h2>
                <form action="/login" method="post">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <div className="social-login">
                    <p>Or login with:</p>
                    <div className="social-icons">

                        {/* <a href="#" className="social-icon facebook">
                        <img src="facebook-icon.png" alt="Facebook" />
                        <span>Facebook</span>
                    </a>
                    <a href="#" className="social-icon google">
                        <img src="google-icon.png" alt="Google" />
                        <span>Google</span>
                    </a> */}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login
