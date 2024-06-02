import { useEffect, useState } from "react";
import styles from "./Table.module.css";

function Table({ headers, values, limit }) {
	let [firstIndex, setFirstIndex] = useState(0);
	let [lastIndex, setLastIndex] = useState(
		values.length < limit ? values.length : limit
	);
	let [selectedIndex, setSelectedIndex] = useState(0);

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
					<tr>
						{Object.keys(values[index]).map((key) => (
							<td>
								{typeof values[index][key] === "function"
									? values[index][key]()
									: values[index][key]}
							</td>
						))}
					</tr>
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
					<tr>
						{headers.map((header) => (
							<th>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>{deployTable()}</tbody>
			</table>
			<div className={styles["table-slider"]}>{deployTableSlider()}</div>
		</div>
	);
}

export default Table;
