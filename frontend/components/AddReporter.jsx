import {useState, useEffect} from "react"
import ModeratorNavigation from "/components/ModeratorNavigation"
import ModeratorHamburgerNav from "/components/ModeratorHamburgerNav"

const AddReporter = () => {
	return(
		<>
			<ModeratorHamburgerNav/>	
			<ModeratorNavigation/>
			<div className="flex flex-col items-center justify-center">
				<div className="bg-white w-11/12 rounded-lg mt-3 px-6 py-3 shadow-lg">
					<form >
						<div className="mb-4">
							<h2 className="text-gray-900 text-xl font-light text-center font-nunito">Add new reporter</h2>
						</div>
						<div className="mb-6">
							<span className="text-gray-400 font-nunito text-sm">Name</span>
							<input className="bg-gray-100 text-gray-700 font-nunito text-sm p-4 w-full outline-green-100 rounded-lg" required placeholder="(E.g) Surname  Firstname" type="text" name="name"  />
						</div>

						<div className="mb-6">
							<span className="text-gray-400 font-nunito text-sm">Email</span>
							<input className="bg-gray-100 text-gray-700 font-nunito text-sm p-4 w-full outline-green-100 rounded-lg" required placeholder="Your email" type="email" name="email"  />
						</div>

						<div className="mb-6">
							<span className="text-gray-400 font-nunito text-sm">Assign State</span>
							<select className="bg-gray-100 text-gray-700 font-nunito text-sm p-4 w-full outline-green-100 rounded-lg" required placeholder="Your password" type="password" name="password" >
								  <option value="">-- Select State --</option>
								  <option value="Abia">Abia</option>
								  <option value="Adamawa">Adamawa</option>
								  <option value="Akwa Ibom">Akwa Ibom</option>
								  <option value="Anambra">Anambra</option>
								  <option value="Bauchi">Bauchi</option>
								  <option value="Bayelsa">Bayelsa</option>
								  <option value="Benue">Benue</option>
								  <option value="Borno">Borno</option>
								  <option value="Cross River">Cross River</option>
								  <option value="Delta">Delta</option>
								  <option value="Ebonyi">Ebonyi</option>
								  <option value="Edo">Edo</option>
								  <option value="Ekiti">Ekiti</option>
								  <option value="Enugu">Enugu</option>
								  <option value="FCT">Federal Capital Territory (Abuja)</option>
								  <option value="Gombe">Gombe</option>
								  <option value="Imo">Imo</option>
								  <option value="Jigawa">Jigawa</option>
								  <option value="Kaduna">Kaduna</option>
								  <option value="Kano">Kano</option>
								  <option value="Katsina">Katsina</option>
								  <option value="Kebbi">Kebbi</option>
								  <option value="Kogi">Kogi</option>
								  <option value="Kwara">Kwara</option>
								  <option value="Lagos">Lagos</option>
								  <option value="Nasarawa">Nasarawa</option>
								  <option value="Niger">Niger</option>
								  <option value="Ogun">Ogun</option>
								  <option value="Ondo">Ondo</option>
								  <option value="Osun">Osun</option>
								  <option value="Oyo">Oyo</option>
								  <option value="Plateau">Plateau</option>
								  <option value="Rivers">Rivers</option>
								  <option value="Sokoto">Sokoto</option>
								  <option value="Taraba">Taraba</option>
								  <option value="Yobe">Yobe</option>
								  <option value="Zamfara">Zamfara</option>
							</select>

						</div>

						<div className="mb-6 flex justify-center">
							<button className="shadow-md shadow-gray-200 text-yellow-600 underline font-nunito cursor-pointer rounded-sm w-5/12 py-3 px-4" type="submit">Add Reporter</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default AddReporter;