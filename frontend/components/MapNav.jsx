import {useNavigate} from "react-router-dom"

const MapNav = () => {
	const navigate = useNavigate();
	return(
		<>
			<div className="flex justify-center fixed z-100 inset-x-0 md:inset-x-120">
				<div className="w-11/12 p-2 rounded-lg mt-3 bg-white md:bg-white/50 flex justify-center gap-x-4">
					<span onClick={() => navigate("/waste-location")} className="text-xs bg-green-500/20 p-1 px-3 font-nunito cursor-pointer rounded-sm">View map</span>
					<span onClick={() => navigate("/admin-metric")} className="text-xs bg-green-500/20 p-1 px-3 font-nunito cursor-pointer rounded-sm">Display metric</span>
					<span onClick={() => navigate("/view-users")} className="text-xs bg-green-500/20 p-1 px-3 font-nunito cursor-pointer rounded-sm">View users</span>
				</div>
			</div>
		</>
	);
}
export default MapNav;