import React from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FaGooglePlusG } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
const LoginAndSignUp = () => {
    return (
        <div className="h-screen grid place-content-center" style={{background:'#f6f5f7'}}>

            <div className="relative " style={{}} id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <div className="circle"><FaFacebookF /></div>
                             <div className="circle"><FaGooglePlusG /></div>
                            <div className="circle"><FaLinkedinIn /></div>
                        </div>
                        <span>or use your email for registration</span>
                        <div className="infield">
                            <input type="text" placeholder="Name" />
                            <label></label>
                        </div>
                        <div className="infield">
                            <input type="email" placeholder="Email" name="email" />
                            <label></label>
                        </div>
                        <div className="infield">
                            <input type="password" placeholder="Password" />
                            <label></label>
                        </div>
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <FaFacebookF />
                            <FaGooglePlusG />
                            <FaLinkedinIn />
                        </div>
                        <span>or use your account</span>
                        <div className="infield">
                            <input type="email" placeholder="Email" name="email" />
                            <label></label>
                        </div>
                        <div className="infield">
                            <input type="password" placeholder="Password" />
                            <label></label>
                        </div>
                        <span className="forgot">Forgot your password?</span>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container" id="overlayCon">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button>Sign Up</button>
                        </div>
                    </div>
                    <button id="overlayBtn"></button>
                </div>
            </div>
        </div>
    )
}
export default LoginAndSignUp;
