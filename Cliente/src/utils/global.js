export const formatPhoneNumber = (value) => {
	return value
		.replace(/\D/g, "")
		.replace(/(\d{2})(\d)/, "($1) $2")
		.replace(/(\d{4})(\d)/, "$1-$2");
};

export const formatDateTime = (value) => {
	return value.replace(
		/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/,
		"$3/$2/$1 $4:$5"
	);
};
