import {useState, useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
import Map from '/components/Map'
import BASE_URL from "/constants/base-url"

const ReporterEdit = () => {
	const navigate = useNavigate();
	const [report, setReport] = useState({category: ""});

	const {id} = useParams();
	const token = localStorage.getItem("token");
	
	const handleChange = (e) => {
		const {name, value} = e.target;
		setReport((prev) => ({...prev, [name]: value}));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
	}

	const handleEdit = async () => {

		try {
			const res = await fetch(`${BASE_URL}/edit_report/${id}`, {
				method: 'PATCH',
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({category: report?.category})
			});

			const result = await res.json();
			console.log(result);
		} catch (err) {

		}
	}

	const handleDelete = async () => {

		try {
			const res = await fetch(`${BASE_URL}/delete_report/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			const result = await res.json();
			console.log(result);
			if (res.ok) {
				navigate('/reporter-list');
			}
		} catch (err) {
			console.log(err.message);
		}
	}

	const logOut = () => {
		localStorage.removeItem("token");
		navigate("/login");
	}

	const handleRedirect = () => {
			navigate("/reporter");
	}



	useEffect( () => {
		fetch(`${BASE_URL}/get_report_edit/${id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			setReport(data);
		})
		.catch(err => console.log(err));
	}, [id]);


	/*const [location, setLocation] = useState({
		lat: "",
		lng: ""
	});

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
			},

			(error) => {
				console.log(error);
			},

			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 0
			}


		);
	}, []);*/


	return(
		<>
			<nav className="flex justify-center">
				<div className="flex w-11/12 justify-between rounded-lg mt-3 bg-white p-4">
					<h1 className="text-4xl text-center text-green-400 font-nunito font-bold">TroWay</h1>
					<button className="bg-red-500 text-white cursor-pointer rounded-sm px-4 py-2 font-light font-nunito">Logout</button>
				</div>
			</nav>
			<div className="flex justify-center">
				<div className="bg-white w-11/12 rounded-lg mt-3 px-6 py-3 shadow-lg">
					<div className="bg-blue-400 px-2 py-1 shadow-lg w-fit rounded-xs">
						<a onClick={handleRedirect} className="font-nunito text-sm cursor-pointer font-bold text-gray-700">Click here to submit new report</a>
					</div>
					<form className="mt-6" onSubmit={handleSubmit}>
						<div className="mb-5">
							{/*<h1 className="text-4xl text-center text-green-400 font-nunito font-bold">TroWay</h1>*/}
						</div>
						<div className="mb-4">
							<h2 className="text-gray-700 text-xl font-bold text-center font-nunito">Edit or Delete Your Report</h2>
						</div>
						<div className="mb-4">
							<span className="text-green-700 font-nunito">Condition of Waste</span>
							<select name="category" required value={report?.category} onChange={handleChange} className="w-full font-nunito bg-gray-100 text-gray-700 p-4 outline-green-200 rounded-lg">
								<option value="" disabled hidden className="text-red-300">--Condition of Waste--</option>
								<option >Overflowing Bin</option>
								<option >Illegal Dumping</option>
								<option >Blocked Drainage</option>
								<option >Uncollected Waste</option>
								<option >Burning of Waste</option>
								<option >Plastic Pollution</option>
								<option >Broken Waste Bin</option>
								<option >Harzadous Waste</option>
							</select>
						</div>

						<div className="mb-4 w-full flex justify-between gap-x-3">
							<div className="w-full">
								{report?.location ? (
									<Map lat={report?.location?.lat} lng={report?.location?.lng} />

								) : (
									<p>Map loading...</p>
								)}
							</div>							
						</div>

						<div className="mb-4 flex justify-around">
							<button onClick={handleEdit} type="submit" className="bg-gray-500 text-white font-nunito  cursor-pointer rounded-sm w-5/12 py-3 px-4">Apply Change</button>
							<button onClick={handleDelete} type="submit" className="bg-yellow-500 text-black font-nunito  cursor-pointer rounded-sm w-5/12 py-3 px-4">Delete</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
export default ReporterEdit;