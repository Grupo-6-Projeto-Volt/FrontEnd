/* eslint-disable no-const-assign */
import { useEffect, useState } from "react";
import styles from "./CrudTable.module.css";
import DefaultButton from "../button/defaultbutton/DefaultButton";
import ListInputLine from "../listinputline/ListInputLine";

function CrudTable({
	headers,
	values,
	limit,
	insertButtonText,
	onInsert,
	placeholder,
}) {
	const [firstIndex, setFirstIndex] = useState(0);
	const [lastIndex, setLastIndex] = useState(
		values.length < limit ? values.length : limit
	);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [insertInputValue, setInsertInputValue] = useState("");

	useEffect(() => {
		setLastIndex(values.length < limit ? values.length : limit);
		setSelectedIndex(0);
		setFirstIndex(0);
	}, [headers, values, limit]);

	function handleBack() {
		if (selectedIndex > 0) {
			setFirstIndex((selectedIndex - 1) * limit);
			setLastIndex(selectedIndex * limit);
			setSelectedIndex(--selectedIndex);
		}
	}

	function handleNext() {
		if ((selectedIndex + 1) * limit < values.length) {
			setSelectedIndex(++selectedIndex);
			setFirstIndex(selectedIndex * limit);
			setLastIndex(
				(selectedIndex + 1) * limit > values.length
					? values.length
					: (selectedIndex + 1) * limit
			);
		}
	}

	function handleClick(index) {
		setFirstIndex(index * limit);
		setLastIndex(
			(index + 1) * limit > values.length ? values.length : (index + 1) * limit
		);
		setSelectedIndex(index);
	}

	function deployTable() {
		const table = [];

		for (let index = firstIndex; index < lastIndex; index++) {
			if (values[index] !== undefined) {
				table.push(
					<ListInputLine
						id={values[index].id}
						nome={values[index].nome}
						handleEdit={(id, value) => values[index].onUpdate(id, value)}
						handleDelete={(id) => values[index].onDelete(id)}
					/>
				);
			}
		}
		return table;
	}

	function deployBtnSlider() {
		const btns = [];
		const lastIndex = values.length / limit;

		for (let index = 0; index < lastIndex; index++) {
			btns.push(
				<button
					className={styles["btn-slider"]}
					style={{
						display:
							(index > selectedIndex - 2 && index < selectedIndex + 2) ||
								index === 0 ||
								index === Math.floor(lastIndex)
								? "block"
								: "none",
					}}
					onClick={() => handleClick(index)}
				>
					{index + 1}
				</button>
			);
		}

		btns[selectedIndex] = (
			<button className={styles["btn-slider-pressed"]}>
				{selectedIndex + 1}
			</button>
		);

		return btns;
	}

	function deployTableSlider() {
		return (
			<>
				<button className={styles["btn-slider"]} onClick={handleBack}>
					{"<"}
				</button>
				{deployBtnSlider()}
				<button className={styles["btn-slider"]} onClick={handleNext}>
					{">"}
				</button>
			</>
		);
	}

	return (
		<div className={styles["Table"]}>
			<table>
				<thead>
					<tr>{headers && headers.map((header) => <th>{header}</th>)}</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td>
							<input
								type="text"
								value={insertInputValue}
								onChange={(e) => setInsertInputValue(e.target.value)}
								className={styles["ipt-field"]}
								placeholder={"Ex: " + placeholder}
							/>
						</td>
						<td className={styles["btn-col"]}>
							<DefaultButton
								text={insertButtonText}
								onClick={() => {
									onInsert(insertInputValue);
									setInsertInputValue("");
								}}
							/>
						</td>
					</tr>
					{deployTable()}
				</tbody>
			</table>
			<div className={styles["table-slider"]}>{deployTableSlider()}</div>
		</div>
	);
}

export default CrudTable;
