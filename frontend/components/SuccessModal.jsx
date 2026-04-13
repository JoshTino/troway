

const SuccessModal = ( {isOpen, modalMessage} ) => {
	if (!isOpen) return null;

	return(
		<div className="fixed bottom-5 bg-green-500/90 shadow-md shadow-green-500/50 rounded-md inset-x-5 md:inset-x-100  p-4 z-[1000]">
			<p className="text-white font-nunito text-xl">SUCCESS: {modalMessage}</p>
		</div>
	);
}
export default SuccessModal;