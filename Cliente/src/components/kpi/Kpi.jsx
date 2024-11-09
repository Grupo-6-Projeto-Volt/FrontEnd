import styles from "./Kpi.module.css";
export const Kpi = (props) => {
	return (
		<div className={styles["container"]}>
			<div className={styles["content"]}>
				<p>{props.text.title}</p>
				<h3>{props.text.paragraph}</h3>
			</div>
		</div>
	);
};
