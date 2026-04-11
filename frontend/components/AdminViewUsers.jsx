import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import AdminNavigation from "/components/AdminNavigation"
import Modal from "/components/Modal"
import BASE_URL from "/constants/base-url"

const AdminViewUsers = () => {
	const navigate = useNavigate();
	const [moderators, setModerator] = useState([]);
	const [users, setUser] = useState([]);

	const [message, setMessage] = useState("") ;
	const [selectedId, setSelectedId] = useState(null);
	const [showModal, setShowModal] = useState(false);

	//Retrieving moderators
	useEffect( () => {
		const token = localStorage.getItem("token");

		fetch(`${BASE_URL}/get_moderators`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			}
		})
		.then(res => res.json())
		.then(data => {
			setModerator(data);
		})
		.catch(err => console.log(err));
	}, []);

	//Retrieving users
	useEffect(() => {
		const token = localStorage.getItem("token");

		fetch(`${BASE_URL}/get_users`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			}
		})
		.then(res => res.json())
		.then(data => {
			setUser(data);
		})
		.catch(err => console.log(err));
	}, []);

	const makeModerator = async (userId) =>  {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(`${BASE_URL}/make_moderator/${userId}`, {
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});

			const result = await response.json();
			console.log(result);
		} catch(err) {
			console.error(err);
		}
	}

	const removeUser = async (userId) => {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(`${ BASE_URL}/remove_user/${userId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			const result = await response.json();
			console.log(result);
		} catch (err) {
			console.error(err);
		}
	}

	const removeModerator = async (userId) => {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(`${ BASE_URL}/remove_moderator/${userId}`, {
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			const result = await response.json();
			console.log(result);
		} catch (err) {
			console.error(err);
		}
	}



	const logOut = () => {
		localStorage.removeItem("token");
		navigate("/login");
	}

	const handleConfirm = () => {
		setUser((prev) => prev.filter((user) => user._id != selectedId));
		setShowModal(false);
		setSelectedId(null);
	}

	return(
		<>
			<Modal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				onConfirm={handleConfirm}
				message={message}
			 />
			<nav className="flex justify-center">
				<div className="flex w-11/12 justify-between rounded-lg mt-3 bg-white p-4">
					<h1 className="text-4xl text-center text-green-400 font-nunito font-bold">TroWay</h1>
					<button onClick={logOut} className="bg-red-500 text-white cursor-pointer rounded-sm px-4 py-2 font-light font-nunito">Logout</button>
				</div>
			</nav>
			<AdminNavigation navigate={navigate}/>
			<div className="flex flex-col items-center mb-4">
				<div className="bg-white w-11/12 mb-4 rounded-lg mt-3 px-4 py-3 shadow-lg">
					<div className="flex justify-start mb-1">
						<h1 className="font-light font-nunito text-lg">Moderators</h1>
					</div>
					<div className="grid md:grid-cols-2 gap-4">

						{moderators && moderators.length > 0 ? (

							moderators.map((moderator) => (
								<div key={moderator._id} className="flex gap-x-2 shadow-md p-2 border-1 border-gray-200/50 rounded-md">
									<div>
										<img className="rounded-full object-cover size-20"  src={"https://image.pngaaa.com/595/2541595-middle.png"} />
									</div>
									<div>
										<h2 className="font-nunito font-bold text-lg">{moderator.name}</h2>
										<p className="font-nunito text-sm">{moderator.email}</p>
										<div className="flex gap-x-2">
										<button className="bg-yellow-500 cursor-pointer font-nunito font-light rounded-xs text-sm shadow-md mt-2 px-1" onClick={() => {setShowModal(true); setSelectedId(moderator._id); setMessage(`This user "${moderator.name}" will no longer be a moderator.`); removeModerator(`${moderator._id}`); }}>Remove</button>
										<button className="bg-teal-500 cursor-pointer font-nunito font-light rounded-xs text-sm shadow-md mt-2 px-1">Assign task</button>	
										</div>
									</div>
								</div>
							))

						): (
							<p className="text-center font-nunito">No moderator. Add from users below</p>
						)}

					</div>
				</div>
				<div className="bg-white w-11/12 rounded-lg mt-3 px-4 py-3 shadow-lg">
					<div className="flex justify-start mb-1">
						<h1 className="font-light font-nunito text-lg">Users</h1>
					</div>

					<div className="grid md:grid-cols-2 gap-4">
						{users && users.length > 0 ? (

							users.map((user) => (

								<div key={user._id} className="flex gap-x-2 shadow-md p-2 border-1 border-gray-200/50 rounded-md">
									<div>
										<img className="rounded-full object-cover size-20"  src="https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg" />
									</div>
									<div>
										<h2 className="font-nunito font-bold text-lg">{user.name}</h2>
										<p className="font-nunito text-sm">{user.email}</p>
										<div className="flex gap-x-2">
										<button className="bg-yellow-500 cursor-pointer font-nunito font-light rounded-xs text-sm  shadow-md mt-2 px-1" onClick={() => { setSelectedId(user._id); setMessage("Are you sure you want to delete this user?"); setShowModal(true); removeUser(`${user._id}`)}}>Remove</button>
										<button className="bg-green-500 cursor-pointer font-nunito font-light rounded-xs  text-sm shadow-md mt-2 px-1" onClick={() => { setSelectedId(user._id); setMessage(`You are about making this user "${user.name}" a moderator`); setShowModal(true); makeModerator(`${user._id}`);}}>Make moderator</button>
										</div>								
									</div>
								</div>

							))

						) : (
							<p className="text-center font-nunito">No user(s) yet.</p>
						)}
					</div>
					
				</div>
			</div>
		</>
	);

}
export default AdminViewUsers;