import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import BASE_URL from "/constants/base-url"

const SignUp = () => {

	const navigate = useNavigate();


	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			navigate('/reporter');
		}
	}, []);


	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirm: ""		
	});


	const handleChange = (e) => {

		setFormData({...formData, [e.target.name]: e.target.value});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();


		try {
			const res = await fetch(`${BASE_URL}/register`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formData)
			});

			const result = await res.json();
			console.log(result);
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
							<h2 className="text-gray-900 text-2xl text-center font-nunito">Sign Up</h2>
						</div>
						<div className="mb-6">
							<span className="text-green-700 font-nunito">Name</span>
							<input className="bg-gray-100 text-gray-700 font-nunito text-lg p-4 w-full outline-green-200 rounded-lg" required placeholder="(E.g) Surname  Firstname" type="text" name="name" value={formData.name} onChange={handleChange} />
						</div>

						<div className="mb-6">
							<span className="text-green-700 font-nunito">Email</span>
							<input className="bg-gray-100 text-gray-700 font-nunito text-lg p-4 w-full outline-green-200 rounded-lg" required placeholder="Your email" type="email" name="email" value={formData.email} onChange={handleChange} />
						</div>

						<div className="mb-6">
							<span className="text-green-700 font-nunito">Password</span>
							<input className="bg-gray-100 text-gray-700 font-nunito text-lg p-4 w-full outline-green-200 rounded-lg" required placeholder="Your password" type="password" name="password" value={formData.password} onChange={handleChange} />
						</div>

						<div className="mb-6">
							<span className="text-green-700 font-nunito">Confirm password</span>
							<input className="bg-gray-100 text-gray-700 font-nunito text-lg p-4 w-full outline-green-200 rounded-lg" required placeholder="Confirm password" type="password" name="confirm" value={formData.confirm} onChange={handleChange} />
						</div>
						<div className="mb-6 flex justify-center">
							<button className="bg-green-500 text-white font-nunito  cursor-pointer rounded-sm w-5/12 py-3 px-4" type="submit">Register</button>
						</div>
						<div className="mb-6 flex justify-center">
							<span className="font-nunito text-lg text-green-400">Already have an account? <a onClick={() => navigate('/login')} className="text-gray-700 font-bold cursor-pointer">Login</a></span>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
export default SignUp;