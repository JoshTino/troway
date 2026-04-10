

const Modal = ( {isOpen, onClose, onConfirm, message} ) => {

	if (!isOpen) return null;

	return(
		<div className="fixed flex items-center justify-center inset-0 bg-black/50 z-50">
			<div className="bg-white w-11/12 md:w-5/12 p-6 flex flex-col items-center gap-y-4  rounded-lg">
				<h2 className="text-lg font-nunito font-bold">Confirm Action</h2>
				<p className="text-center font-nunito text-md">{message}</p>
				<div>
					<button onClick={onConfirm} className="p-2 font-nunito cursor-pointer rounded-sm mx-2 text-white bg-yellow-500">Confirm</button>
					<button onClick={onClose} className="p-2 font-nunito cursor-pointer rounded-sm mx-2 text-white bg-red-500">Cancel</button>
				</div>
			</div>
		</div>
	);

}
export default Modal;