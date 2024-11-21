import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import styles from "./Calendar.module.css";
import { useState } from "react";

function Calendar() {
	const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
	const monthsOfYear = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	];
	const currentDate = new Date();
	const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
	const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
	const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
	const calendarDays = [];

	return (
		<div className={styles["Calendar"]}>
			<div className={styles["navigate-date"]}>
				<h2 className={styles["month"]}>Novembro</h2>
				<h2 className={styles["year"]}>2024</h2>
				<div className={styles["buttons"]}>
					<BiLeftArrow />
					<BiRightArrow />
				</div>
			</div>
			<div className={styles["weekdays"]}>
				{daysOfWeek.map((day, index) => (
					<span key={index}>{day}</span>
				))}
			</div>
			<div className={styles["days"]}>
				<span>1</span>
				<span>2</span>
				<span>3</span>
				<span>4</span>
				<span>5</span>
				<span>6</span>
				<span>7</span>
				<span>8</span>
				<span>9</span>
				<span>10</span>
				<span>11</span>
				<span>12</span>
				<span>13</span>
				<span className={styles["current-day"]}>14</span>
				<span>15</span>
				<span>16</span>
				<span>17</span>
				<span>18</span>
				<span>19</span>
				<span>20</span>
				<span>21</span>
				<span>22</span>
				<span>23</span>
				<span>24</span>
				<span>25</span>
				<span>26</span>
				<span>27</span>
				<span>28</span>
				<span>29</span>
				<span>30</span>
				<span>31</span>
			</div>
		</div>
	);
}

export default Calendar;
