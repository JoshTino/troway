import {useState, useEffect} from "react"
import AdminNavigation from "/components/AdminNavigation"
import HamburgerNav from "/components/HamburgerNav"

const AddAdmin = () => {
	return(
		<>
			<HamburgerNav/>	
			<AdminNavigation/>
			<div className="flex flex-col items-center justify-center">
				<div className="bg-white w-11/12 rounded-lg mt-3 px-6 py-3 shadow-lg">
					<form >
						<div className="mb-4">
							<h2 className="text-gray-900 text-xl font-light text-center font-nunito">Add new admin</h2>
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
							<select className="bg-gray-100 text-gray-700 font-nunito text-sm p-4 w-full outline-green-100 rounded-lg" required name="password" >
								    <option value="" disabled selected hidden>Select a state capital</option>
								    <option value="umuahia">Umuahia</option>
								    <option value="yola">Yola</option>
								    <option value="uyo">Uyo</option>
								    <option value="awka">Awka</option>
								    <option value="bauchi">Bauchi</option>
								    <option value="yenagoa">Yenagoa</option>
								    <option value="makurdi">Makurdi</option>
								    <option value="maiduguri">Maiduguri</option>
								    <option value="calabar">Calabar</option>
								    <option value="asaba">Asaba</option>
								    <option value="abakaliki">Abakaliki</option>
								    <option value="benin city">Benin City</option>
								    <option value="ado-ekiti">Ado-Ekiti</option>
								    <option value="enugu">Enugu</option>
								    <option value="gombe">Gombe</option>
								    <option value="owerri">Owerri</option>
								    <option value="dutse">Dutse</option>
								    <option value="kaduna">Kaduna</option>
								    <option value="kano">Kano</option>
								    <option value="katsina">Katsina</option>
								    <option value="birnin kebbi">Birnin Kebbi</option>
								    <option value="lokoja">Lokoja</option>
								    <option value="ilorin">Ilorin</option>
								    <option value="ikeja">Ikeja</option>
								    <option value="lafia">Lafia</option>
								    <option value="minna">Minna</option>
								    <option value="abeokuta">Abeokuta</option>
								    <option value="akure">Akure</option>
								    <option value="osogbo">Osogbo</option>
								    <option value="ibadan">Ibadan</option>
								    <option value="jos">Jos</option>
								    <option value="port harcourt">Port Harcourt</option>
								    <option value="sokoto">Sokoto</option>
								    <option value="jalingo">Jalingo</option>
								    <option value="damaturu">Damaturu</option>
								    <option value="gusau">Gusau</option>
								    <option value="abuja">Abuja (FCT)</option>
							</select>

						</div>

						<div className="mb-6 flex justify-center">
							<button className="shadow-md shadow-gray-200 text-yellow-600 underline font-nunito cursor-pointer rounded-sm w-5/12 py-3 px-4" type="submit">Add Admin</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default AddAdmin;