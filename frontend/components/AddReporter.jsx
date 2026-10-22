import {useState, useEffect} from "react"
import ModeratorNavigation from "/components/ModeratorNavigation"
import ModeratorHamburgerNav from "/components/ModeratorHamburgerNav"
import BASE_URL from "/constants/base-url"

const AddReporter = () => {

	const [inputs, setInputs] = useState({
		name: "",
		email: ""
	});

	const handleChange = (e) => {
		const {name, email} = e.target;
		setInputs({...inputs, [name]:value});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {

			const res = await fetch(`${BASE_URL}/api/reporter`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: Json.stringify(inputs);
			});

		} catch (err) {
			console.error(err);
		}
	}

	return(
		<>
			<ModeratorHamburgerNav/>	
			<ModeratorNavigation/>
			<div className="flex flex-col items-center justify-center">
				<div className="bg-white w-11/12 rounded-lg mt-3 px-6 py-3 shadow-lg">
					<form onSubmit={handleSubmit} >
						<div className="mb-4">
							<h2 className="text-gray-900 text-xl font-light text-center font-nunito">Add new reporter</h2>
						</div>
						<div className="mb-6">
							<span className="text-gray-400 font-nunito text-sm">Name</span>
							<input className="bg-gray-100 text-gray-700 font-nunito text-sm p-4 w-full outline-green-100 rounded-lg" required placeholder="(E.g) Surname  Firstname" type="text" name="name" value={inputs.name} value={handleChange}  />
						</div>

						<div className="mb-6">
							<span className="text-gray-400 font-nunito text-sm">Email</span>
							<input className="bg-gray-100 text-gray-700 font-nunito text-sm p-4 w-full outline-green-100 rounded-lg" required placeholder="Your email" type="email" name="email" value={inputs.email} value={handleChange}  />
						</div>

						<div className="mb-6 flex justify-center">
							<button className="shadow-md shadow-gray-200 text-yellow-600 underline font-nunito cursor-pointer rounded-sm w-5/12 py-3 px-4" type="submit">Add Reporter</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default AddReporter;