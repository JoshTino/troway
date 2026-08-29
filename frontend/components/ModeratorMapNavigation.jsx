import {useState} from "react"
import {useNavigate} from "react-router-dom"
import { EllipsisVertical } from 'lucide-react';

const ModeratorMapNavigation = () => {
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);

	const logOut = () => {
		localStorage.removeItem("token");
		navigate("/login");
	}

	return(
		<>	
			<div className="flex justify-center fixed z-100 inset-x-0 md:inset-x-120">
				<div className="w-11/12 p-2 rounded-lg mt-3 bg-white md:bg-white/50 flex justify-center gap-x-4">
					<span onClick={() => navigate("/moderator-map-view")} className="text-xs bg-green-500/20 p-1 px-3 font-nunito cursor-pointer rounded-sm">View map</span>
					<span onClick={() => navigate("/moderator-dashboard")} className="text-xs bg-green-500/20 p-1 px-3 font-nunito cursor-pointer rounded-sm">Dashboard</span>			
					<span className="cursor-pointer" onClick={() => setOpen(!open)}> <EllipsisVertical/> </span>
				</div>
			{open && (
				<div className="bg-white w-5/12 md:w-2/12 flex flex-col self-end ml-50 md:ml-50 fixed top-14 border border-1 border-gray-200">
					<button onClick={() => navigate('/moderator-profile')} className="text-black hover:bg-gray-100 cursor-pointer rounded-sm py-2 font-light font-nunito">Profile</button>
					<button onClick={logOut} className="text-black hover:bg-gray-100 cursor-pointer rounded-sm py-2 font-light font-nunito">Logout</button>
				</div>
			)}
			</div>
		</>
	);
}
export default ModeratorMapNavigation;