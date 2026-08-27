import {useState, useEffect} from "react"
import {useNavigate} from  "react-router-dom"
import BASE_URL from "/constants/base-url"
import ReporterHamburgerNav from "/components/ReporterHamburgerNav"



const ReporterProfile = () => {
	return(
		<>
			<ReporterHamburgerNav/>
			<div className="flex flex-col items-center justify-center">
				<div className="bg-white w-11/12 rounded-lg mt-3 px-6 py-3 shadow-lg">
					<div className="flex flex-col gap-x-8">
						<div>
							<img className="rounded-full object-cover size-20"  src="https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg" />
						</div>
						<div className="flex flex-col items-center">
							<span className="self-start font-bold text-green-600 font-nunito text-xl">Dangana Joshua</span>
							<span className="self-start font-nunito text-xs bg-yellow-300 p-0.5 rounded-sm border-dashed">Reporter</span>
							<span className="self-start font-nunito text-xs p-0.5 rounded-sm border-1 font-bold my-3 border-green-300 border-dashed">Tyrell@gmailcom</span>
						</div>
					</div>
				</div>
				<div className="bg-white w-11/12 rounded-lg mt-3 px-6 py-3 shadow-lg">
					<div className="flex flex-col md:items-center">
						<span className="font-nunito text-xl text-center text-green-600 font-bold">Report Tracker</span>
						<div className="flex justify-between md:w-5/12 my-5">
							<div className="flex flex-col justify-center border-2 border-yellow-300 text-center border-dashed rounded-lg w-5/12 h-30">
								<span className="text-5xl font-nunito font-bold text-yellow-600">35</span>
								<span className="text-sm font-nunito text-yellow-600">Report(s)</span>
							</div>
							<div className="flex flex-col justify-center border-2 border-green-300 text-center border-dashed rounded-lg w-5/12 h-30">
								<span className="text-5xl font-nunito font-bold text-green-600">5</span>
								<span className="text-sm font-nunito text-green-600">Cleared</span>
							</div>
						</div>
					</div>						
				</div>
			</div>
		</>
	);
}

export default ReporterProfile;