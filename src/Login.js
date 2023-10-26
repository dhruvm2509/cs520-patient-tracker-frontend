import './Login.css';
import PillButton from './ui_components/PillButton';
import ShortTextField from './ui_components/ShortTextField';
import logo from './resources/PatientTrackerLogo.png';

function Login() {

	const handleClick = () => {
		console.log("Clicky");
	};

	return (
		<div className="Login">
			<div className="header">
				Patient Tracker Web App
			</div>
			<div>
				<img src={logo} alt="Patient Tracker logo" class="logo" />
			</div>
			<div className="username">
				<ShortTextField
					className="username"
					placeholder="Username"
					outerText="Username:"
				/>
			</div>
			<div className="password">
				<ShortTextField
					className="password"
					placeholder="Password"
					outerText="Password:"
					isPassword="true"
				/>
			</div>

			<div className="forgot-password">
				<a href='/forgot-password'><u>Forgot Password?</u></a>
			</div>

			<div className="login-button">
				<a href="/login">
					<PillButton
						text="Log In"
						fontSize="22"
						pixelHeight="50"
						pixelWidth="200"
						href="/test1"
						onClick={handleClick}
					/>
				</a>

			</div>

			<div className="sign-up">
				<a href='/signup'><u>Sign Up</u></a>
			</div>
		</div>
	);
}

export default Login;
