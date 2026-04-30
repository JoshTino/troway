import {useState, useEffect} from "react"
import AdminNavigation from "/components/AdminNavigation"
import HamburgerNav from "/components/HamburgerNav"

const Profile = () => {
	return(
		<>
			<HamburgerNav/>	
			<AdminNavigation/>
		</>
	);
}

export default Profile;