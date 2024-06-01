import BarData from "../../components/barchart/Barchart.jsx"
import ColumnData from "../../components/columnchart/Columnchart.jsx"
import { column_data, column_options} from "../../components/columnchart/Columndata.js"
import { bar_data, bar_options} from "../../components/barchart/Bardata.js"
import styles from "./Dashboard.module.css"
import {Kpi} from "../../components/kpi/Kpi.jsx"


export const text = {
  title : "Total de visitantes nos últimos 7 dias",
  paragraph: '304 pessoas'
}

export default function Dashboard(){
    return(
        <div className={styles['container']}>
            <div className={styles["header"]}>
                <h1>Gráfico de coluna</h1>
                <ColumnData data={column_data} options={column_options}></ColumnData>
            </div>
            <div className={styles["header"]}>
                <h1>Gráfico de barra</h1>
                <BarData data={bar_data} options={bar_options}></BarData>
            </div>
            <div className={styles["header"]}>
                <h1>Kpis</h1>
                <Kpi text={text}></Kpi>
            </div>

        </div>
    )

}