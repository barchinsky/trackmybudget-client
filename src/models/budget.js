import moment from 'moment';
import { datetime } from '@utils/dateFormats';

export default class Budget {
	constructor(raw_data = {}) {
		this.id = raw_data.id;
		this.name = raw_data.name;
		this.startDate = moment(raw_data.startDate)
			.format(datetime);
		this.endDate = moment(raw_data.endDate)
			.format(datetime);
		this.spentAmount = raw_data.spentAmount || 0;
		this.estimate = raw_data.estimate || 0;
	}

	serialize = () => {
		return JSON.stringify(this);
	};

	static deserialize = str => {
		const deserialized = JSON.parse(str);
		return new Budget(deserialized);
	};
}
