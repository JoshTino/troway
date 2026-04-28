import {useNavigate} from "react-router-dom"
import AdminNavigation from "/components/AdminNavigation"
import HamburgerNav from "/components/HamburgerNav"

const AdminMetric = () => {
	const navigate = useNavigate();

	const logOut = () => {
		localStorage.removeItem("token");
		navigate("/login");
	}


	return(
		<>
			<HamburgerNav />
			<AdminNavigation />
			<div className="flex flex-col items-center mb-4">
				<div className="bg-white w-11/12 mb-4 rounded-lg mt-3 px-4 py-3 shadow-lg">
					<div className="flex justify-center mb-4">
						<h1 className="font-light font-nunito text-2xl">Total Metric</h1>
					</div>
					<div className="flex flex-col mb-4 items-center gap-y-4 p-4 bg-gray-50 rounded-lg">
						<h2 className="text-center font-nunito text-xl font-bold">Pending Report(s)</h2>
						<p className="text-center font-nunito text-xl font-bold">360</p>
						<button className="bg-yellow-500 font-nunito p-1 w-fit text-sm rounded-xs shadow-xs border-1 border-yellow-400 cursor-pointer" onClick={() => navigate('/waste-location')}>Assign Task</button>
					</div>

					<div className="flex gap-x-2">
						<div className="flex flex-col mb-4 items-center w-6/12 gap-y-4 p-2 bg-gray-50 shadow-xs border-1 border-gray-400/20 rounded-lg">
							<h2 className="text-center font-nunito text-xl font-bold">Total Report(s)</h2>
							<p className="text-center font-nunito text-xl font-bold">400</p>
						</div>
						<div className="flex flex-col mb-4 items-center w-6/12 gap-y-4 p-2 bg-gray-50 shadow-xs border-1 border-gray-400/20 rounded-lg">
							<h2 className="text-center font-nunito text-xl font-bold">Total Clean Up</h2>
							<p className="text-center font-nunito text-xl font-bold">40</p>
						</div>
					</div>
				</div>
				<div className="bg-white w-11/12  rounded-lg mt-3 px-4 py-3 shadow-lg">
					<div className="bg-gray-50 w-full md:w-6/12 p-3 rounded-lg">
						<div className="flex justify-center mb-4">
							<h1 className="font-light font-nunito text-2xl">Waste Chart</h1>
						</div>
						<div className="mb-6">
							<div className="w-[50%] bg-yellow-500/35 my-3 px-2 py-[3px] rounded-sm"><span className="font-nunito text-sm">Hazardous waste</span></div>
							<div className="w-70 bg-green-700/35 my-3 px-2 py-[3px] rounded-sm"><span className="font-nunito text-white text-sm">Blocked Drainage</span></div>
							<div className="w-50 bg-slate-700/35 my-3 px-2 py-[3px] rounded-sm"><span className="font-nunito text-white text-sm">Illegal dumping</span></div>
							<div className="w-60 bg-blue-300 my-3 px-2 py-[3px] rounded-sm"><span className="font-nunito text-sm">Plastic pollution</span></div>
							<div className="w-full bg-orange-700/50 my-2 px-2 py-[3px] rounded-sm"><span className="font-nunito text-sm">Broken waste bin</span></div>
							<div className="w-45 bg-zinc-900/35 my-3 px-2 py-[3px] rounded-sm"><span className="font-nunito text-white text-sm">Uncollected waste</span></div>
							<div className="w-80 bg-blue-700/35 my-3 px-2 py-[3px] rounded-sm"><span className="font-nunito text-white text-sm">Overflowing bin</span></div>
							<div className="w-50 bg-red-500/35 my-3 px-2 py-[3px] rounded-sm"><span className="font-nunito text-sm">Burning of waste</span></div>
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