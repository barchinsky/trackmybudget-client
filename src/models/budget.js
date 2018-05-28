import moment from 'moment';

export default class Budget {
	constructor(raw_data) {
		this.id = raw_data._id;
		this.name = raw_data.name;
		this.startDate = moment(raw_data.startDate);
		this.endDate = moment(raw_data.endDate);
		this.spentAmount = raw_data.spentAmount;
		this.estimate = raw_data.estimate;
	}
}
