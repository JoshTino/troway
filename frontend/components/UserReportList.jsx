import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import BASE_URL from "/constants/base-url"

const UserReportList = () => {
	const [reports, setReports] = useState([]);

	const navigate = useNavigate();
	const logOut = () => {
		localStorage.removeItem("token");
		navigate("/login");
	}


	useEffect( () => {
		const token = localStorage.getItem("token");

		fetch(`${BASE_URL}/get_report`, {
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


	
	return(
		<>
			<nav className="flex justify-center">
				<div className="flex w-11/12 justify-between rounded-lg mt-3 bg-white p-4">
					<h1 className="text-4xl text-center text-green-400 font-nunito font-bold">TroWay</h1>
					<button onClick={logOut} className="bg-red-500 text-white cursor-pointer rounded-sm px-4 py-2 font-light font-nunito">Logout</button>
				</div>
			</nav>
			<div className="flex justify-center">
				
				<div className="fixed hidden bottom-25 rounded-sm bg-red-400 py-4 px-20">
					<p className="text-white font-nunito text-xl">1 report remove..</p>
				</div>
				<div className="bg-white w-11/12 rounded-lg mt-3 p-6 shadow-lg">
					<div className="mb-4"> 
						<h1 className="text-gray-700 text-xl font-bold text-center font-nunito">Your report(s)</h1>
					</div>
					{reports.map((report, i) => (
						<div key={i} className="flex justify-between relative mb-4 shadow-xl border-1 border-gray-300 py-4 px-2 rounded-lg font-bold font-nunito text-lg">
							<p className="text-gray-700">{report.category}</p><a className="border-2 border-yellow-400 text-blue-500 cursor-pointer px-4 text-gray-700 rounded-lg" onClick={() => navigate(`/reporter-edit/${report._id}`)}>Edit</a>
							<span className="absolute bottom-1 bg-blue-400 px-2 rounded-sm text-white text-xs font-inter">{new Date(report.createdAt).toLocaleDateString()}</span>							
						</div>
					))}
				</div>
			</div>
		</>
	);
}
export default UserReportList;