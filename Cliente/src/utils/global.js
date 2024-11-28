export const validateAuth = () => {
	const token = sessionStorage.TOKEN;
	if (!token) {
		return false;
	}
	return true;
};

export  const FORMATTER = new Intl.NumberFormat('pt-BR', {
	style: 'decimal',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});

export const formatPhoneNumber = (value) => {
	let regex = /(\d{2})(\d{1})(\d{4})(\d)/;
	return value.replace(regex, "($1) $2 $3-$4");
};

export const formatDateTime = (value) => {
	let regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
	return value.replace(regex, "$3/$2/$1 $4:$5");
};

export const formatIsoString = (value) => {
	let regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})([A-Z])/;
	return value.replace(regex, "$1-$2-$3T$4:$5:$6");
};

export const converterDataParaFusoBrasileiro = (data) => {
	let fullDateList = data.split("T");
	let timeStamp = fullDateList[1];

	let splittedTimeStamp = timeStamp.split(":");

	let hour = Number(splittedTimeStamp[0]);

	if (hour < new Date().getTimezoneOffset() / 60) {
		splittedTimeStamp[0] = String(
			hour + 24 - new Date().getTimezoneOffset() / 60
		);
	} else {
		splittedTimeStamp[0] = String(hour - new Date().getTimezoneOffset() / 60);
	}

	timeStamp = splittedTimeStamp.join(":");
	fullDateList[1] = timeStamp;

	return fullDateList.join("T");
};
