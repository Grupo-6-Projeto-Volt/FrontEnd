import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import styles from "./Calendar.module.css";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const Calendar = forwardRef((props, ref) => {
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

	const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
	const [selectedMonth, setSelectedMonth] = useState(currentMonth);
	const [selectedYear, setSelectedYear] = useState(currentYear);

	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

	function getSelectedDate() {
		return `${selectedYear}-${selectedMonth + 1}-${selectedDay}`;
	}

	function prevMonth() {
		setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
		setCurrentYear((prevYear) =>
			currentMonth === 0 ? prevYear - 1 : prevYear
		);
	}

	function nextMonth() {
		setCurrentMonth((nextMonth) => (nextMonth === 11 ? 0 : nextMonth + 1));
		setCurrentYear((nextYear) =>
			currentMonth === 11 ? nextYear + 1 : nextYear
		);
	}

	function changeSelectedDate(day) {
		setSelectedDay(day + 1);
		setSelectedMonth(currentMonth);
		setSelectedYear(currentYear);
	}

	function decreaseDays(days) {
		setSelectedDay((day) =>
			day < days ? day - (daysInMonth - days) : selectedDay - days
		);

		if (selectedDay - days < 1) {
			if (selectedMonth === 0) {
				setCurrentMonth(11);
				setCurrentYear(currentYear - 1);
			} else {
				setCurrentMonth(selectedMonth - 1);
				setCurrentYear(currentYear);
			}
		} else {
			setCurrentMonth(selectedMonth);
			setCurrentYear(currentYear);
		}
	}

	useImperativeHandle(ref, () => ({
		getSelectedDate,
		decreaseDays,
	}));

	useEffect(() => {
		props.onClick();
	}, [changeSelectedDate]);

	return (
		<div className={styles["Calendar"]}>
			<div className={styles["navigate-date"]}>
				<h2 className={styles["month"]}>{monthsOfYear[currentMonth]},</h2>
				<h2 className={styles["year"]}>{currentYear}</h2>
				<div className={styles["buttons"]}>
					<BiLeftArrow onClick={prevMonth} cursor={"pointer"} />
					<BiRightArrow onClick={nextMonth} cursor={"pointer"} />
				</div>
			</div>
			<div className={styles["weekdays"]}>
				{daysOfWeek.map((day) => (
					<span key={day}>{day}</span>
				))}
			</div>
			<div className={styles["days"]}>
				{[...Array(firstDayOfMonth).keys()].reverse().map((day, index) => (
					<span className={styles["deactivated-day"]} key={`empty-${index}`}>
						{daysInMonth - day}
					</span>
				))}
				{[...Array(daysInMonth).keys()].map((day) => (
					<span
						className={
							styles[
								day + 1 === selectedDay &&
								currentMonth === selectedMonth &&
								currentYear === selectedYear
									? "selected-day"
									: ""
							]
						}
						key={day + 1}
						onClick={() => {
							changeSelectedDate(day);
						}}
					>
						{day + 1}
					</span>
				))}
			</div>
		</div>
	);
});

export default Calendar;
