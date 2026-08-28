import {useState, useEffect} from "react"
import ModeratorNavigation from "/components/ModeratorNavigation"
import ModeratorHamburgerNav from "/components/HamburgerNav"

const ModeratorProfile = () => {
	return(
		<>
			<ModeratorHamburgerNav/>	
			<ModeratorNavigation/>
			<div className="flex flex-col items-center justify-center">
				<div className="bg-white w-11/12 rounded-lg mt-3 px-6 py-3 shadow-lg">
					<div className="flex flex-col gap-x-8">
						<div>
							<img className="rounded-full object-cover size-20"  src="https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg" />
						</div>
						<div className="flex flex-col items-center">
							<span className="self-start font-bold text-green-600 font-nunito text-xl">Peggie Johnson-Glover</span>
							<span className="self-start font-nunito text-xs bg-yellow-300 p-0.5 border-dashed">Moderator</span>
							<span className="self-start font-nunito text-xs p-0.5 border-1 font-bold my-2 border-green-300 border-dashed">Eduardo_Cummerate@yahoo.com</span>			
							<span className="self-start"><span className="font-nunito text-xs p-0.5 font-bold my-2">Account Status:</span> <span className="text-green-700 text-xs font-bold font-nunito">Active</span></span>
							<span className="self-start"><span className="font-nunito text-xs p-0.5 font-bold my-2">Date Joined:</span> <span className="text-green-700 text-xs font-bold font-nunito">12 March 2026</span></span>
							<span className="self-start"><span className="font-nunito text-xs p-0.5 font-bold my-2">Account ID:</span> <span className="text-green-700 text-xs font-bold font-nunito">69d98a5b247f6179d69fd2c0</span></span>
							<span className="self-start"><span className="font-nunito text-xs p-0.5 font-bold my-2">Total Reporters Managed:</span> <span className="text-green-700 text-xs font-bold font-nunito">15</span></span>
						</div>
					</div>
				</div>
				<div className="bg-white w-11/12 rounded-lg mt-3 px-6 py-3 shadow-lg">
					<div className="flex flex-col items-center">
						<span className="font-nunito text-xl text-center text-gray-600 font-bold">Create Users</span>
						<button className="shadow-sm shadow-gray-300 my-2 py-2 px-3 cursor-pointer hover:shadow-lg font-nunito text-sm underline w-fit text-yellow-700">Create new reporter</button>
					</div>						
				</div>
			</div>
		</>
	);
}

export default ModeratorProfile;