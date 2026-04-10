import {useNavigate} from "react-router-dom"
import AdminNavigation from "/components/AdminNavigation"

const AdminViewUsers = () => {
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
						<h1 className="font-light font-nunito text-2xl">Moderators</h1>
					</div>
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex gap-x-2 shadow-md p-2 border-1 border-gray-200/50 rounded-md">
							<div>
								<img className="rounded-full object-cover size-20"  src={"https://image.pngaaa.com/595/2541595-middle.png"} />
							</div>
							<div>
								<h2 className="font-nunito font-bold text-xl">Dangana Joshua</h2>
								<p className="font-nunito">joshuatino33@gmail.com</p>
								<div className="flex gap-x-2">
								<button className="bg-yellow-500 font-nunito font-light rounded-xs text-sm shadow-md mt-2 px-1">Remove</button>
								<button className="bg-teal-500 font-nunito font-light rounded-xs text-sm shadow-md mt-2 px-1">Assign task</button>	
								</div>
							</div>
						</div>

						<div className="flex gap-x-2 shadow-md p-2 border-1 border-gray-200/50 rounded-md">
							<div>
								<img className="rounded-full object-cover size-20"  src={"https://image.pngaaa.com/595/2541595-middle.png"} />
							</div>
							<div>
								<h2 className="font-nunito font-bold text-xl">Longi Pam</h2>
								<p className="font-nunito">longipan@yahoo.com</p>
								<div className="flex gap-x-2">
								<button className="bg-yellow-500 font-nunito font-light rounded-xs text-sm shadow-md mt-2 px-1">Remove</button>
								<button className="bg-teal-500 font-nunito font-light rounded-xs text-sm shadow-md mt-2 px-1">Assign task</button>	
								</div>
							</div>
						</div>

						<div className="flex gap-x-2 shadow-md p-2 border-1 border-gray-200/50 rounded-md">
							<div>
								<img className="rounded-full object-cover size-20"  src={"https://image.pngaaa.com/595/2541595-middle.png"} />
							</div>
							<div>
								<h2 className="font-nunito font-bold text-xl">Simon Dumlak</h2>
								<p className="font-nunito">dumlak04@gmail.com</p>
								<div className="flex gap-x-2">
								<button className="bg-yellow-500 font-nunito font-light rounded-xs text-sm shadow-md mt-2 px-1">Remove</button>
								<button className="bg-teal-500 font-nunito font-light rounded-xs text-sm shadow-md mt-2 px-1">Assign task</button>	
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-white w-11/12 md:w-6/12 rounded-lg mt-3 px-4 py-3 shadow-lg">
					<div className="flex justify-center mb-4">
						<h1 className="font-light font-nunito text-2xl">Users</h1>
					</div>

					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex gap-x-2 shadow-md p-2 border-1 border-gray-200/50 rounded-md">
							<div>
								<img className="rounded-full object-cover size-20"  src="https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg" />
							</div>
							<div>
								<h2 className="font-nunito font-bold text-xl">Dangana Joshua</h2>
								<p className="font-nunito">joshuatino33@gmail.com</p>
								<div className="flex gap-x-2">
								<button className="bg-yellow-500 font-nunito font-light rounded-xs text-sm  shadow-md mt-2 px-1">Remove</button>
								<button className="bg-green-500 font-nunito font-light rounded-xs  text-sm shadow-md mt-2 px-1">Make moderator</button>
								</div>								
							</div>
						</div>

						<div className="flex gap-x-2 shadow-md p-2 border-1 border-gray-200/50 rounded-md">
							<div>
								<img className="rounded-full object-cover size-20"  src="https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg" />
							</div>
							<div>
								<h2 className="font-nunito font-bold text-xl">Longi Pam</h2>
								<p className="font-nunito">longipan@yahoo.com</p>
								<div className="flex gap-x-2">
								<button className="bg-yellow-500 font-nunito font-light rounded-xs text-sm  shadow-md mt-2 px-1">Remove</button>
								<button className="bg-green-500 font-nunito font-light rounded-xs  text-sm shadow-md mt-2 px-1">Make moderator</button>
								</div>								
							</div>
						</div>

						<div className="flex gap-x-2 shadow-md p-2 border-1 border-gray-200/50 rounded-md">
							<div>
								<img className="rounded-full object-cover size-20"  src="https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg" />
							</div>
							<div>
								<h2 className="font-nunito font-bold text-xl">Simon Dumlak</h2>
								<p className="font-nunito">dumlak04@gmail.com</p>
								<div className="flex gap-x-2">
								<button className="bg-yellow-500 font-nunito font-light rounded-xs text-sm  shadow-md mt-2 px-1">Remove</button>
								<button className="bg-green-500 font-nunito font-light rounded-xs  text-sm shadow-md mt-2 px-1">Make moderator</button>
								</div>								
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</>
	);

}
export default AdminViewUsers;