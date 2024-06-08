export const validateAuth = () => {
	const token = sessionStorage.TOKEN;
	if (!token) {
		return false;
	}
	return true;
};

export const formatPhoneNumber = (value) => {
	let regex = /(\d{2})(\d{1})(\d{4})(\d)/;
	return value.replace(regex, "($1) $2 $3-$4");
};

export const formatDateTime = (value) => {
	let regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
	return value.replace(regex, "$3/$2/$1 $4:$5");
};
