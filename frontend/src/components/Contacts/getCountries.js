import countryList from 'country-list';

export default function getCountries() {
	const countries = countryList.getNameList();
	const names = Object.keys(countries);
	return names.map((name) => {
		return {
			label: name.toUpperCase(),
			value: name
		};
	});
}
