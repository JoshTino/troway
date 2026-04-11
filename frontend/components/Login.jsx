import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import BASE_URL from "/constants/base-url"

const Login = () => {


	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			navigate('/reporter');
		}
	}, []);

	const [inputs, setInputs] = useState({
		email: "",
		password: ""
	});

	const handleChange = (e) => {
		const {name, value} = e.target;
		setInputs({...inputs, [name]:value});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`${BASE_URL}/login`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(inputs)
			});

			const result = await res.json();
			console.log(result);

			if (res.ok) {
				localStorage.setItem("token", result.token);
				navigate('/reporter');
			} else {
				alert(result.message);
			}
		} catch (err) {
			console.error(err);
		}
	}

	
	return(
		<>
			<nav className="flex justify-center">
				<div className="flex w-11/12 justify-between rounded-lg mt-3 bg-white p-4">
					<h1 className="text-4xl text-center text-green-400 font-nunito font-bold">TroWay</h1>
				</div>
			</nav>
			<div className="flex justify-center">
				<div className="bg-white w-11/12 md:w-4/12 rounded-lg mt-10 mb-4 p-6 shadow-lg">
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<h2 className="text-gray-900 text-2xl text-center font-nunito">Login</h2>
						</div>
						<div className="mb-6">
							<input className="bg-gray-100 text-gray-700 font-nunito text-lg p-4 w-full outline-green-200 rounded-lg" required placeholder="Your email" type="email" name="email" value={inputs.email} onChange={handleChange} />
						</div>
						<div className="mb-6">
							<input className="bg-gray-100 text-gray-700 font-nunito text-lg p-4 w-full outline-green-200 rounded-lg" required placeholder="Your password" type="password" name="password" value={inputs.password} onChange={handleChange} />
						</div>
						<div className="mb-6 flex justify-center">
							<button className="bg-green-500 text-white font-nunito  cursor-pointer rounded-sm w-5/12 py-3 px-4" type="submit">Login</button>
						</div>
						<div className="mb-6 flex justify-center">
							<span className="font-nunito text-lg text-green-400">Don't have an account? <a onClick={() => navigate('/signup')} className="text-gray-700 font-bold cursor-pointer">Sign Up</a></span>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
export default Login;