import { Linechart } from "../../components/Linechart";
import styles from "./Dashboard.module.css"

export default function Dashboard(){
    return(
        <div className={styles["container"]}>
            <Linechart></Linechart>
        </div>
    )

}