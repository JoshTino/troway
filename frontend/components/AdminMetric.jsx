import {useNavigate} from "react-router-dom"
import AdminNavigation from "/components/AdminNavigation"

const AdminMetric = () => {
	const navigate = useNavigate();

	const logOut = () => {
		localStorage.removeItem("token");
		navigate("/login");
	}


	return(
		<>
			<nav className="flex justify-center">
				<div className="flex w-11/12 justify-between rounded-lg mt-3 bg-white p-4">
					<h1 className="text-4xl text-center text-green-400 font-nunito font-bold">TroWay</h1>
					<button onClick={logOut} className="bg-red-500 text-white cursor-pointer rounded-sm px-4 py-2 font-light font-nunito">Logout</button>
				</div>
			</nav>
			<AdminNavigation navigate={navigate}/>
			<div className="flex flex-col items-center mb-4">
				<div className="bg-white w-11/12 mb-4 rounded-lg mt-3 px-4 py-3 shadow-lg">
					<div className="flex justify-center mb-4">
						<h1 className="font-light font-nunito text-2xl">Total Metric</h1>
					</div>
					<div className="flex flex-col mb-4 items-center gap-y-4 p-4 border-2 border-red-400/50 rounded-lg">
						<h2 className="text-center font-nunito text-xl font-bold">Total Report(s)</h2>
						<p className="text-center font-nunito text-xl font-bold">400</p>
						<button className="bg-yellow-500 font-nunito p-1 w-fit text-sm rounded-xs text-white shadow-lg font-bold border-1 border-yellow-400">Assign Truck</button>
					</div>

					<div className="flex gap-x-2">
						<div className="flex flex-col mb-4 items-center w-6/12 gap-y-4 p-2 border-1 border-green-400/50 rounded-lg">
							<h2 className="text-center font-nunito text-xl font-bold">Total Cleared</h2>
							<p className="text-center font-nunito text-xl font-bold">40</p>
						</div>
						<div className="flex flex-col mb-4 items-center w-6/12 gap-y-4 p-2 border-1 border-yellow-400/50 rounded-lg">
							<h2 className="text-center font-nunito text-xl font-bold">Total Pending</h2>
							<p className="text-center font-nunito text-xl font-bold">360</p>
						</div>
					</div>
				</div>
				<div className="bg-white w-11/12 md:w-6/12 rounded-lg mt-3 px-4 py-3 shadow-lg">
					<div className="flex justify-center mb-4">
						<h1 className="font-light font-nunito text-2xl">Daily Metric</h1>
					</div>
					<div className="mb-6">
						<div className="w-45 bg-yellow-500/80 my-3 px-2 py-[3px] rounded-sm"><span className="font-nunito text-sm">Harzardous waste</span></div>
						<div className="w-70 bg-green-700/80 my-3 px-2 py-[3px] rounded-sm"><span className="font-nunito text-white text-sm">Blocked Drainage</span></div>
						<div className="w-50 bg-slate-700/80 my-3 px-2 py-[3px] rounded-sm"><span className="font-nunito text-white text-sm">Illegal dumping</span></div>
						<div className="w-60 bg-blue-300 my-3 px-2 py-[3px] rounded-sm"><span className="font-nunito text-sm">Plastic pollution</span></div>
						<div className="w-full bg-orange-700/50 my-2 px-2 py-[3px] rounded-sm"><span className="font-nunito text-sm">Broken waste bin</span></div>
						<div className="w-45 bg-zinc-900/80 my-3 px-2 py-[3px] rounded-sm"><span className="font-nunito text-white text-sm">Uncollected waste</span></div>
						<div className="w-80 bg-blue-700/60 my-3 px-2 py-[3px] rounded-sm"><span className="font-nunito text-white text-sm">Overflowing bin</span></div>
						<div className="w-50 bg-red-500/80 my-3 px-2 py-[3px] rounded-sm"><span className="font-nunito text-sm">Burning of waste</span></div>
					</div>
					<div className="flex justify-center gap-x-4 mb-4">
						<div className="flex flex-col items-center p-1 rounded-sm w-4/12 border-1 border-red-400">
							<h2 className="font-nunito text-sm font-bold">Cases Today</h2>
							<p className="font-nunito text-sm">15</p>
						</div>
						<div className="flex flex-col items-center p-1 rounded-sm w-4/12 border-1 border-green-400">
							<h2 className="font-nunito text-sm font-bold">Cleared Today</h2>
							<p className="font-nunito text-sm">2</p>
						</div>
					</div>
					<div className="flex justify-center">
						<button className="bg-yellow-500 p-2 rounded-xs font-light font-nunito">Assign Truck</button>
					</div>
				</div>
			</div>
		</>
	);
}
export default AdminMetric;