import {useNavigate} from "react-router-dom"

const SuperAdminNavigation = () => {
	const navigate = useNavigate();
	return(
		<>
			<div className="flex justify-center">
				<div className="w-11/12 p-2 rounded-lg mt-3 bg-white flex justify-center gap-x-4">
					<span onClick={() => navigate("/all-waste-location")} className="text-xs bg-green-500/20 p-1 px-3 font-nunito cursor-pointer rounded-sm">View map</span>
					<span onClick={() => navigate("/super-admin-dashboard")} className="text-xs bg-green-500/20 p-1 px-3 font-nunito cursor-pointer rounded-sm">Dashboard</span>
					<span onClick={() => navigate("/view-all-users")} className="text-xs bg-green-500/20 p-1 px-3 font-nunito cursor-pointer rounded-sm">View users</span>
				</div>
			</div>
		</>
	);
}
export default SuperAdminNavigation;