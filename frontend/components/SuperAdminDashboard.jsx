import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import SuperAdminNavigation from "/components/SuperAdminNavigation"
import SuperAdminHamburgerNav from "/components/SuperAdminHamburgerNav"

import BASE_URL from "../constants/base-url"

const SuperAdminDashboard = () => {

	const navigate = useNavigate();

	const token = localStorage.getItem("token");

	const [stats, setStats] = useState({
		total: 0,
		pending: 0,
		assigned: 0,
		cleared: 0
	});

	const [data, setData] = useState([]);

	const categoryColors = {
	  "Hazardous Waste": "bg-yellow-500/35",
	  "Blocked Drainage": "bg-green-500/35",
	  "Illegal Dumping": "bg-slate-500/35",
	  "Plastic Pollution": "bg-blue-300",
	  "Overflowing Bin": "bg-orange-700/50",
	  "Uncollected Waste": "bg-zinc-900/35",
	  "Broken Waste Bin": "bg-blue-700/35",
	  "Burning of Waste": "bg-red-500/35",
};

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`${BASE_URL}/api/report-stats`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			const result = await response.json();
			setStats(result);

		}

		fetchData();
	}, []);

	useEffect( () => {
		const fetchWastePercentage = async () => {
			const response = await fetch(`${BASE_URL}/api/waste-percentage`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			const result = await response.json();
			setData(result);

		}

		fetchWastePercentage();
	}, []);

	return(
		<>
			<SuperAdminHamburgerNav />
			<SuperAdminNavigation />
			<div className="flex flex-col items-center mb-4">
				<div className="bg-white w-11/12 mb-4 rounded-lg mt-3 px-4 py-3 shadow-lg">
					<div className="flex justify-center mb-4">
						<h1 className="font-light font-nunito text-2xl">Total Metric</h1>
					</div>
					<div className="flex flex-col mb-4 items-center gap-y-4 p-4 border-x-2 border-red-300 border-dashed bg-gray-50 rounded-lg">
						<h2 className="text-center font-nunito text-lg font-bold text-gray-800 tracking-wide">Pending Report(s)</h2>
						<p className="text-center font-nunito text-xl font-bold h-10 w-10 bg-red-300 p-1 rounded-full">{stats.pending}</p>
						<button className="bg-yellow-500 font-nunito p-1 w-fit text-sm rounded-lg shadow-xs border-1 border-yellow-400 cursor-pointer" onClick={() => navigate('/all-waste-location')}>View map</button>
					</div>

					<div className="flex gap-x-2">
						<div className="flex flex-col mb-4 items-center w-6/12 gap-y-4 p-2 border-x-2 border-yellow-300 border-dashed bg-gray-50 shadow-xs rounded-lg">
							<h2 className="text-center font-nunito text-lg font-bold text-gray-800 tracking-wide">Total Report(s)</h2>
							<p className="text-center font-nunito text-xl font-bold h-10 w-10 bg-yellow-300 p-1 rounded-full">{stats.total}</p>
						</div>
						<div className="flex flex-col mb-4 items-center w-6/12 gap-y-4 p-2 border-x-2 border-green-300 border-dashed bg-gray-50 shadow-xs rounded-lg">
							<h2 className="text-center font-nunito text-lg font-bold text-gray-800 tracking-wide">Total Clean Up</h2>
							<p className="text-center font-nunito text-xl font-bold h-10 w-10 bg-green-300 p-1 rounded-full">{stats.cleared}</p>
						</div>
					</div>
				</div>
				<div className="bg-white w-11/12  rounded-lg mt-3 px-2 md:px-4 py-3 shadow-lg">
					<div className="bg-gray-50 w-full md:w-6/12 p-3 rounded-lg">
						<div className="flex justify-center mb-4">
							<h1 className="font-light font-nunito text-2xl">Waste Chart</h1>
						</div>
						<div className="mb-6 flex flex-col gap-y-2">
							{data.map((item) => {

								if (item.category === "Uncollected Waste") {
									return(
										<div className="flex flex-row gap-x-1 justify-center items-center">
											<div className="w-[35%] md:w-[33%] lg:w-[16%]">
												<span className="bg-white font-nunito text-[11px] font-bold text-gray-600 px-1">{item.category}</span>
											</div>
											<div className="bg-white w-[65%] md:w-[74%] lg:w-[84%]">
												<div style={{ width: `${item.percentage}%` }} className={`${ categoryColors[item.category]} py-2 rounded-sm`}></div>
											</div>
										</div>

									);
								} else {
									return (
										<div className="flex flex-row gap-x-1 justify-center items-center">
											<div className="w-[35%] md:w-[33%] lg:w-[16%]">
												<span className="bg-white font-nunito text-xs font-bold text-gray-600 px-1">{item.category}</span>
											</div>
											<div className="bg-white w-[65%] md:w-[74%] lg:w-[84%]">
												<div style={{ width: `${item.percentage}%` }} className={`${ categoryColors[item.category]} py-2 rounded-sm`}></div>
											</div>
										</div>

									);
								}
								

							})}

						</div>
						<div className="flex justify-center gap-x-4 mb-4">
							<div className="flex flex-col items-center p-3 rounded-sm w-fit md:w-4/12 bg-white shadow-md">
								<h2 className="font-nunito text-sm font-bold">Cases Today</h2>
								<p className="font-nunito text-sm">15</p>
							</div>
							<div className="flex flex-col items-center p-3 rounded-sm w-fit md:w-4/12 bg-white shadow-md">
								<h2 className="font-nunito text-sm font-bold">Cleared Today</h2>
								<p className="font-nunito text-sm">2</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default SuperAdminDashboard;