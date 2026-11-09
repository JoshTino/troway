import {useState, useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import SuperAdminClusterMap from "/components/SuperAdminClusterMap"
import BASE_URL from "/constants/base-url"
import SuperAdminMapNav from "/components/SuperAdminMapNav"


const SuperAdminMapView = () => {

	const [reports, setReports] = useState([]);
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");


	useEffect( () => {
		fetch(`${BASE_URL}/api/pending-waste`, {
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

	const [selectedModerator, setSelectedModerator] = useState({});

	const handleModeratorSelect = (reportId, moderatorId) => {
		setSelectedModerator(prev => ({...prev,
			[reportId]: moderatorId
		}));
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
			<SuperAdminMapNav />
			<div className="flex flex-col justify-center p-2 fixed inset-0">
				<div className="bg-white w-full rounded-lg shadow-lg">
					{reports && reports.length > 0 ? (
						<SuperAdminClusterMap reports={reports} trucks={trucks}/>
					) : (
						<p>Map loading...</p>
					)}
				</div>
			</div>
		</>
	);
}

export default SuperAdminMapView;