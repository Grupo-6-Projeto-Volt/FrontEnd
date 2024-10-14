import { useState } from "react";
import ConfirmCancelActionButton from "../confirmcancelactionbutton/ConfirmCancelActionButton";
import styles from "./ListInputLine.module.css";

function ListInputLine({ id, nome, handleEdit, handleDelete }) {
	const [disabled, setDisabled] = useState(true);
	const [valor, setValor] = useState(nome);

	return (
		<tr className={styles["ListInputLine"]}>
			<td className={styles["td-id"]}>{id}</td>
			<td className={styles["td-name"]}>
				<input
					value={valor}
					disabled={disabled}
					type="text"
					className={styles[disabled ? "ipt-editable-field" : "ipt-field"]}
					onChange={(e) => setValor(e.target.value)}
				/>
			</td>
			<td className={styles["td-buttons"]}>
				<div className={styles["btn-area"]}>
					<ConfirmCancelActionButton
						onEdit={() => handleEdit(id, valor)}
						onDelete={() => handleDelete(id)}
						enableEdit={(e) => setDisabled(!e)}
					/>
				</div>
			</td>
		</tr>
	);
}

export default ListInputLine;
