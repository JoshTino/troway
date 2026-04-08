import {useState, useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import ClusterMap from "/components/ClusterMap"
import BASE_URL from "/constants/base-url"


const AdminMapView = () => {
	const [reports, setReports] = useState([]);
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	useEffect( () => {
		fetch(`${BASE_URL}/get_all_waste_location`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			setReports(data);
		})
		.catch(err => console.log(err));
	}, []);
	
	const logOut = () => {
		localStorage.removeItem("token");
		navigate("/login");
	}

	return(
		<>	
			<nav className="flex justify-center">
				<div className="flex w-11/12 justify-between rounded-lg mt-3 bg-white p-4">
					<h1 className="text-4xl text-center text-green-400 font-nunito font-bold">TroWay</h1>
					<button onClick={logOut} className="bg-red-500 text-white rounded-sm px-4 py-2 font-light font-nunito">Logout</button>
				</div>
			</nav>
			<div className="flex justify-center">
				<div className="bg-white w-11/12 rounded-lg mt-3 p-1 shadow-lg">

						<div className="w-full">
							<div className="w-full">
								{reports && reports.length > 0 ? (

									<ClusterMap reports={reports} />
								) : (
									<p>Map loading...</p>
								)}
							</div>
						</div>
				</div>
			</div>
		</>
	);
}

export default AdminMapView;