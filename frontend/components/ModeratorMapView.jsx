import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import ModeratorClusterMap from "/components/ModeratorClusterMap"
import BASE_URL from "/constants/base-url"
import AdminNavigation from "/components/AdminNavigation"

const ModeratorMapView = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const [reports, setReport] = useState([]);
	const [formData, setFormData] = useState({file: null});

	useEffect( () => {
		fetch(`${BASE_URL}/get_moderator_task`, {
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
	}, []);

	const handleChange = (e) => {
		const files = e.target.files;
		setFormData({...formData, file: files[0]});
	}

	const handleSubmit = async (reportId) => {

		const data = new FormData();
		data.append("file", formData.file);


		try {
			const response = await fetch(`${BASE_URL}/mark_completed_task/${reportId}`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: data
			});
			const result = await response.json();
			console.log(result);
		} catch (err) {
			console.log(err);
		}
	}

	return(
		<>	
			{/*<nav className="flex justify-center">
				<div className="flex w-11/12 justify-between rounded-lg mt-3 bg-white p-4">
					<h1 className="text-4xl text-center text-green-400 font-nunito font-bold">TroWay</h1>
					<button onClick={logOut} className="bg-red-500 text-white cursor-pointer rounded-sm px-4 py-2 font-light font-nunito">Logout</button>
				</div>
			</nav>*/}
			<AdminNavigation navigate={navigate} />
			<div className="flex justify-center">
				<div className="bg-white w-11/12 rounded-lg mt-3 p-1 shadow-lg">
						<div className="w-full">
							<div className="w-full">
								{reports && reports.length > 0 ? (

									<ModeratorClusterMap reports={reports} handleChange={handleChange} handleSubmit={handleSubmit} />
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
export default ModeratorMapView;