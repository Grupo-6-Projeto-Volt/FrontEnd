import styles from "./Kpi.module.css"

export const Kpi = (props) => {
    const head = props.title;
    const content = props.paragraph;
    return(
        <div className={styles['container']}>
            <div className={styles["header"]}>
                <title>{head}</title>
            </div>
                <div className={styles["main"]}>
                    <p>{content}</p>
                </div>
        </div>
    )
}