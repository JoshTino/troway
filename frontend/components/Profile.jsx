import {useState, useEffect} from "react"
import AdminNavigation from "/components/AdminNavigation"
import HamburgerNav from "/components/HamburgerNav"

const Profile = () => {
	return(
		<>
			<HamburgerNav/>	
			<AdminNavigation/>
			<div className="flex flex-col items-center justify-center">
				<div className="bg-white w-11/12 rounded-lg mt-3 px-6 py-3 shadow-lg">
					<div className="flex flex-col gap-x-8">
						<div>
							<img className="rounded-full object-cover size-20"  src="https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg" />
						</div>
						<div className="flex flex-col items-center">
							<span className="self-start font-bold text-green-600 font-nunito text-xl">Dangana Joshua</span>
							<span className="self-start font-nunito text-xs bg-yellow-300 p-0.5 rounded-sm border-dashed">Super Admin</span>
							<span className="self-start font-nunito text-xs p-0.5 rounded-sm border-1 font-bold my-2 border-green-300 border-dashed">joshuatinoo33@gmailcom</span>			
							<span className="self-start"><span className="font-nunito text-xs p-0.5 rounded-sm font-bold my-2">Account Status:</span> <span className="text-green-700 text-xs font-bold font-nunito">Active</span></span>
							<span className="self-start"><span className="font-nunito text-xs p-0.5 rounded-sm font-bold my-2">Date Joined:</span> <span className="text-green-700 text-xs font-bold font-nunito">12 March 2026</span></span>
							<span className="self-start"><span className="font-nunito text-xs p-0.5 rounded-sm font-bold my-2">Account ID:</span> <span className="text-green-700 text-xs font-bold font-nunito">69d98a5b247f6179d69fd2c0</span></span>
							<span className="self-start"><span className="font-nunito text-xs p-0.5 rounded-sm font-bold my-2">Total Users Managed:</span> <span className="text-green-700 text-xs font-bold font-nunito">758</span></span>
						</div>
					</div>
				</div>
				<div className="bg-white w-11/12 rounded-lg mt-3 px-6 py-3 shadow-lg">
					<div className="flex flex-col items-center">
						<span className="font-nunito text-xl text-center text-gray-600 font-bold">Create Users</span>
						<button className="shadow-sm shadow-gray-300 my-2 py-2 px-3 cursor-pointer hover:shadow-lg font-nunito text-sm underline w-fit text-green-600">Create new admin</button>
						<button className="shadow-sm shadow-gray-300 my-2 py-2 px-3 cursor-pointer hover:shadow-lg font-nunito text-sm underline w-fit text-yellow-700">Create new moderator</button>
					</div>						
				</div>
			</div>
		</>
	);
}

export default Profile;