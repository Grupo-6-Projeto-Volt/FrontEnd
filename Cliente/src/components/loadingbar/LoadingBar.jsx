import { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./LoadingBar.module.css";

const LoadingBar = forwardRef((props, ref) => {
	const [progress, setProgress] = useState(0);
	const [hidden, setHidden] = useState(true);

	function addProgress(progress) {
		setProgress((prevProgress) => prevProgress + progress);
	}

	function show() {
		setHidden(false);
	}

	function hide() {
		setHidden(true);
	}

	useImperativeHandle(ref, () => ({
		addProgress,
		show,
		hide,
	}));

	return (
		<div
			className={styles["LoadingBar"]}
			style={{
				visibility: hidden ? "hidden" : "visible",
			}}
		>
			<div className={styles["container"]}>
				<img
					src="./loading.svg"
					alt="loading"
					className={styles["spin-icon"]}
				/>
				<span style={{ display: props.showPercentage ? "block" : "none" }}>
					Carregando: {progress}%
				</span>
				<span
					style={{ display: !props.showPercentage ? "block" : "none" }}
					className={styles["three-dot-loading"]}
				>
					Cadastrando produto...
				</span>
			</div>
		</div>
	);
});

export default LoadingBar;
