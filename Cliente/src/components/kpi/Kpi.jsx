import styles from "./Kpi.module.css";
export const Kpi = (props) => {
	return (
		<div className={styles["container"]}>
			<div className={styles["content"]}>
				<h3 className={styles["title"]}>{props.text.title}</h3>
				<p className={styles["paragraph"]}>{props.text.paragraph}</p>
			</div>
		</div>
	);
};
