export default class Budget {
	constructor(raw_data = {}) {
		this.id = raw_data.id;
		this.name = raw_data.name;
		this.startDate = raw_data.startDate;
		this.endDate = raw_data.endDate;
		this.spentAmount = raw_data.spentAmount || 0;
		this.estimate = raw_data.estimate || 0;
		this.categoryIdToEstimateMap = raw_data.categoryIdToEstimateMap || {};
	}

	serialize = () => {
		return JSON.stringify(this);
	};

	static deserialize = str => {
		const deserialized = JSON.parse(str);
		return new Budget(deserialized);
	};
}
