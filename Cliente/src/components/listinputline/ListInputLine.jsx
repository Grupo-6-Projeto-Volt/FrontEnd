import { useState } from "react";
import ConfirmCancelActionButton from "../confirmcancelactionbutton/ConfirmCancelActionButton";
import styles from "./ListInputLine.module.css";

function ListInputLine({ id, nome, handleEdit, handleDelete }) {
	const [disabled, setDisabled] = useState(true);
	const [valor, setValor] = useState(nome);

	return (
		<div className={styles["ListInputLine"]}>
			<tr className={styles["tr"]}>
				<td className={styles["td"]}>{id}</td>
				<td className={styles["td"]}>
					<input
						value={valor}
						disabled={disabled}
						type="text"
						className={styles[disabled ? "ipt-editable-field" : "ipt-field"]}
						onChange={(e) => setValor(e.target.value)}
					/>
				</td>
				<td className={styles["td"]}>
					<ConfirmCancelActionButton
						onEdit={() => handleEdit(id, valor)}
						onDelete={() => handleDelete(id)}
						enableEdit={(e) => setDisabled(!e)}
					/>
				</td>
			</tr>
		</div>
	);
}

export default ListInputLine;
