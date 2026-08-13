import {useState, useEffect} from "react"
import AdminNavigation from "/components/AdminNavigation"
import HamburgerNav from "/components/HamburgerNav"

import BASE_URL from "../constants/base-url"

const AdminMetric = () => {

	const token = localStorage.getItem("token");

	const [stats, setStats] = useState({
		total: 0,
		pending: 0,
		assigned: 0,
		cleared: 0
	});

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

	return(
		<>
			<HamburgerNav />
			<AdminNavigation />
			<div className="flex flex-col items-center mb-4">
				<div className="bg-white w-11/12 mb-4 rounded-lg mt-3 px-4 py-3 shadow-lg">
					<div className="flex justify-center mb-4">
						<h1 className="font-light font-nunito text-2xl">Total Metric</h1>
					</div>
					<div className="flex flex-col mb-4 items-center gap-y-4 p-4 border-x-2 border-red-300 border-dashed bg-gray-50 rounded-lg">
						<h2 className="text-center font-nunito text-lg font-bold text-gray-800 tracking-wide">Pending Report(s)</h2>
						<p className="text-center font-nunito text-xl font-bold h-10 w-10 bg-red-300 p-1 rounded-full">{stats.pending}</p>
						<button className="bg-yellow-500 font-nunito p-1 w-fit text-sm rounded-xs shadow-xs border-1 border-yellow-400 cursor-pointer" onClick={() => navigate('/waste-location')}>Assign Task</button>
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
				<div className="bg-white w-11/12  rounded-lg mt-3 px-4 py-3 shadow-lg">
					<div className="bg-gray-50 w-full md:w-6/12 p-3 rounded-lg">
						<div className="flex justify-center mb-4">
							<h1 className="font-light font-nunito text-2xl">Waste Chart</h1>
						</div>
						<div className="mb-6">
							<div>
								<span className="bg-white font-nunito text-xs border-1 border-gray-200 px-1">Hazardous waste</span>
								<div className="w-[14.93%] bg-yellow-500/35 mb-2 px-2 py-2 rounded-sm"></div>
							</div>

							<div>
								<span className="bg-white font-nunito text-xs border-1 border-gray-200 px-1">Blocked Drainage</span>
								<div className="w-[1.20%] bg-green-700/35 mb-2 px-2 py-2 rounded-sm"></div>
							</div>

							<div>
								<span className="bg-white font-nunito text-xs border-1 border-gray-200 px-1">Illegal dumping</span>
								<div className="w-[11.12%] bg-slate-700/35 mb-2 px-2 py-2 rounded-sm"></div>
							</div>

							<div>
								<span className="bg-white font-nunito text-xs border-1 border-gray-200 px-1">Plastic pollution</span>
								<div className="w-[18.32%] bg-blue-300 mb-2 px-2 py-2 rounded-sm"></div>
							</div>

							<div>
								<span className="bg-white font-nunito text-xs border-1 border-gray-200 px-1">Broken waste bin</span>
								<div className="w-[24.83%] bg-orange-700/50 mb-2 px-2 py-2 rounded-sm"></div>
							</div>

							<div>
								<span className="bg-white font-nunito text-xs border-1 border-gray-200 px-1">Uncollected waste</span>
								<div className="w-[9.83%] bg-zinc-900/35 mb-2 px-2 py-2 rounded-sm"></div>
							</div>

							<div>
								<span className="bg-white font-nunito text-xs border-1 border-gray-200 px-1">Overflowing bin</span>
								<div className="w-[4.17%] bg-blue-700/35 mb-2 px-2 py-2 rounded-sm"></div>
							</div>

							<div>
								<span className="bg-white font-nunito text-xs border-1 border-gray-200 px-1">Burning of waste</span>
								<div className="w-[15.60%] bg-red-500/35 mb-2 px-2 py-2 rounded-sm"></div>
							</div>
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
						<div className="flex justify-center">
							<button className="bg-yellow-500 p-2 rounded-xs font-light font-nunito cursor-pointer" onClick={() => navigate('/waste-location')}>Assign Truck</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default AdminMetric;