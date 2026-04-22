import {useState, useEffect, useRef} from "react"
import {useNavigate} from 'react-router-dom'
import AdminClusterMap from "/components/AdminClusterMap"
import BASE_URL from "/constants/base-url"
import AdminNavigation from "/components/AdminNavigation"


const AdminMapView = () => {
	const markerRef = useRef();

	const [reports, setReports] = useState([]);
	const [moderators, setModerators] = useState([]);
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");


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

	useEffect( () => {
		fetch(`${BASE_URL}/get_moderators`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			setModerators(data);
		})
		.catch(err => console.log(err));
	}, []);



	
	const logOut = () => {
		localStorage.removeItem("token");
		navigate("/login");
	}

	const [selectedModerator, setSelectedModerator] = useState({});

	const handleModeratorSelect = (reportId, moderatorId) => {
		setSelectedModerator(prev => ({...prev,
			[reportId]: moderatorId
		}));
	}


	const submitModeratorTask = async (reportId) => {
		const moderatorId = selectedModerator[reportId];

		try {
			const response = await fetch(`${BASE_URL}/assign_task/${moderatorId}/${reportId}`, {
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			const result = await response.json();
			console.log(result);

			setShowSuccessModal(true);
			setModalMessage("Moderator assigned")
			setTimeout(() => {
				setShowSuccessModal(false);
			}, 3000);
		} catch (err) {
			console.log(err);
		}
	}


	const [trucks, setTrucks] = useState([]);

	useEffect(() => {
	  if (!token) return;
	
	  const fetchTrucks = async () => {
	    try {
	      const res = await fetch(`${BASE_URL}/api/truck-latest-location`, {
	        headers: {
	          Authorization: `Bearer ${token}`
	        }
	      });
	
	      const data = await res.json();
	      setTrucks(data);
		console.log(data);
	    } catch (err) {
	      console.error(err);
	    }
	  };
	
	  //Initial call
	  fetchTrucks();
	
	  const interval = setInterval(fetchTrucks, 5000);
	
	  return () => clearInterval(interval);
	
	}, [token]);

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

									<AdminClusterMap reports={reports} moderators={moderators} selectedModerator={selectedModerator} handleModeratorSelect={handleModeratorSelect} submitModeratorTask={submitModeratorTask} showSuccessModal={showSuccessModal} modalMessage={modalMessage} trucks={trucks}/>
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