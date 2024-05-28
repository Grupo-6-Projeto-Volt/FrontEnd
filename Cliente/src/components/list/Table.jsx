import { useState } from "react";
import styles from "./Table.module.css";

function Table({ headers, values, limit }) {
	let [firstIndex, setFirstIndex] = useState(0);
	let [lastIndex, setLastIndex] = useState(
		values.length < limit ? values.length : limit
	);
	let [selectedIndex, setSelectedIndex] = useState(0);

	return (
		<div className={styles["Table"]}>
			<table className={styles["table"]}>
				<thead>
					<tr>
						{headers.map((header) => (
							<th>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{(() => {
						const table = [];
						for (let index = firstIndex; index < lastIndex; index++) {
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
						return table;
					})()}
				</tbody>
			</table>
			<div className={styles["table-slider"]}>
				<button
					className={styles["btn-slider"]}
					onClick={() => {
						if (selectedIndex > 0) {
							setFirstIndex((selectedIndex - 1) * limit);
							setLastIndex(selectedIndex * limit);
							setSelectedIndex(--selectedIndex);
						}
					}}
				>
					{"<"}
				</button>
				{(() => {
					const btns = [];
					const lastIndex = values.length / limit;

					for (let index = 0; index < lastIndex; index++) {
						btns.push(
							<button
								className={styles["btn-slider"]}
								onClick={() => {
									setFirstIndex(index * limit);
									setLastIndex(
										(index + 1) * limit > values.length
											? values.length
											: (index + 1) * limit
									);
									setSelectedIndex(index);
								}}
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
				})()}
				<button
					className={styles["btn-slider"]}
					onClick={() => {
						if ((selectedIndex + 1) * limit < values.length) {
							setSelectedIndex(++selectedIndex);
							setFirstIndex(selectedIndex * limit);
							setLastIndex(
								(selectedIndex + 1) * limit > values.length
									? values.length
									: (selectedIndex + 1) * limit
							);
						}
					}}
				>
					{">"}
				</button>
			</div>
		</div>
	);
}

export default Table;
