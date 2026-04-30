import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {X, Menu} from "lucide-react"

const HamburgerNav = () => {

	const navigate = useNavigate();

	const [open, setOpen] = useState(false);

	const logOut = () => {
		localStorage.removeItem("token");
		navigate("/login");
	}

	return(
		<nav className="flex flex-col items-center justify-center">
				<div className="flex w-11/12 justify-between rounded-lg mt-3 bg-white p-4">
					<h1 className="text-4xl text-center text-green-400 font-nunito font-bold">TroWay</h1>
					<button className="text-gray-700" onClick={() => setOpen(!open)}>
						{open ? <X size={40}/> : <Menu size={40} />}
					</button>					
				</div>
				{open && (
					<div className="bg-white w-5/12 flex flex-col self-end mr-5 absolute top-21 border border-1 border-gray-200 md:hidden">
						<button onClick={() => navigate('/profile')} className="text-black cursor-pointer rounded-sm py-2 font-light font-nunito">Profile</button>
						<button onClick={logOut} className="text-black cursor-pointer rounded-sm py-2 font-light font-nunito">Logout</button>
					</div>
				)}
		</nav>
	);

}
export default HamburgerNav;