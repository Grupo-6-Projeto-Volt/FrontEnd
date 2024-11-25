import styles from "./ConfirmCancelActionButton.module.css";
import { useState } from "react";
import { FaCheck, FaPencil, FaTrash, FaX } from "react-icons/fa6";

function ConfirmCancelActionButton({ onEdit, onDelete, enableEdit }) {
	const [action, setAction] = useState("");
	const [enabledAction, setEnabledAction] = useState(false);

	function handleActionChange() {
		setEnabledAction(!action);
	}

	return (
		<div className={styles["ConfirmCancelAction"]}>
			<FaPencil
				cursor={"pointer"}
				display={enabledAction ? "none" : "block"}
				onClick={() => {
					setAction("Editar");
					handleActionChange();
					enableEdit(true);
				}}
			/>
			<FaTrash
				cursor={"pointer"}
				display={enabledAction ? "none" : "block"}
				onClick={() => {
					setAction("Deletar");
					handleActionChange();
				}}
			/>
			<FaCheck
				cursor={"pointer"}
				display={!enabledAction ? "none" : "block"}
				onClick={() => {
					if (action === "Deletar") {
						onDelete();
					} else if (action === "Editar") {
						onEdit();
						enableEdit(false);
					}
					setAction("");
					handleActionChange();
				}}
			/>
			<FaX
				cursor={"pointer"}
				display={!enabledAction ? "none" : "block"}
				onClick={() => {
					setAction("");
					handleActionChange();
					enableEdit(false);
				}}
			/>
		</div>
	);
}

export default ConfirmCancelActionButton;
