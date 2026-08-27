import {useState, useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import Map from "/components/Map"
import ReporterHamburgerNav from "/components/ReporterHamburgerNav"
import BASE_URL from "/constants/base-url"


const Reporter = () => {
	const navigate = useNavigate();

	const [location, setLocation] = useState({lat: "", lng: ""});


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
				timeout: 30000,
				maximumAge: 0
			}
		);


	}, []);



	const [formData, setFormData] = useState({
		file: null,
		category: "",
		lat: "",
		lng: ""
	});

	const handleChange = (e) => {
		const {name, value, files} = e.target;

		if (name === "file") {
			setFormData({...formData, file: files[0]});
		} else {
			setFormData({...formData, [name]:value});
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = new FormData();
		data.append('file', formData.file);
		data.append('category', formData.category);
		data.append('lat', location.lat);
		data.append('lng', location.lng);

		try {
			const token = localStorage.getItem("token");
			const res = await fetch(`${BASE_URL}/api/report`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: data
			});

			const result = await res.json();
			console.log(result);

			if (res.ok) {
				navigate('/reporter-list');
			}
		} catch (err) {
			console.log(err);
		}
	}


	const logOut = () => {
		localStorage.removeItem('token');
		navigate('/login');
	}

	const handleRedirect = () => {
		navigate("/reporter-list");
	}




	return(
		<>	
			<ReporterHamburgerNav />
			<div className="flex justify-center">
				<div className="bg-white w-11/12 rounded-lg mt-3 px-6 py-3 shadow-lg">
					<div className="bg-green-200 px-2 py-1 w-fit rounded-xs">
						<a onClick={handleRedirect} className="font-nunito text-sm underline cursor-pointer font-bold text-green-800">Click Here To View Report(s)</a>
					</div>
					<form onSubmit={handleSubmit} className="mt-6">
						<div className="mb-5">
							{/*<h1 className="text-4xl text-center text-green-400 font-nunito font-bold">TroWay</h1>*/}
						</div>
						<div className="mb-4">
							<h2 className="text-gray-700 text-xl font-bold font-nunito">Request for sanitation workers</h2>
						</div>
						<div className="mb-6">
							<span className="text-green-700 font-nunito">Upload a Picture of The Waste</span>
							<input type="file" name="file" required accept="image/*" onChange={handleChange} className="text-sm text-stone-500 w-full file:mr-5 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-bold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 hover:file:cursor-pointer" />
						</div>
						<div className="mb-4">
							<span className="text-green-700 font-nunito">Condition of Waste</span>
							<select name="category" required value={formData.category} onChange={handleChange} className="w-full font-nunito bg-gray-100 text-gray-700 border-1 border-green-300 p-4 outline-green-500 rounded-lg">
								<option value="" disabled hidden className="text-red-300">--Condition of Waste--</option>
								<option >Overflowing Bin</option>
								<option >Illegal Dumping</option>
								<option >Blocked Drainage</option>
								<option >Uncollected Waste</option>
								<option >Burning of Waste</option>
								<option >Plastic Pollution</option>
								<option >Broken Waste Bin</option>
								<option >Hazardous Waste</option>
							</select>
						</div>

						<div className="mb-4 w-full flex justify-between gap-x-3">
							<div className="w-full">
								{location.lat && location.lng ? (

									<Map lat={location.lat} lng={location.lng} />
								) : (
									<p className="bg-red-200 p-1 rounded-sm w-fit font-nunito text-red-500 font-bold text-sm">Please Turn On Device Location...</p>
								)}
							</div>							
						</div>

						<div className="mb-4 flex justify-center">
							<button type="submit" className="bg-green-500 text-white font-nunito  cursor-pointer rounded-sm w-5/12 py-3 px-4">Submit</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default Reporter;