import moment from 'moment';
import { datetime } from '@utils/dateFormats';

export default class Transaction {
	constructor({ id, userId, comment, date, amount, categoryId }) {
		this._id = id;
		this._userId = userId;
		this._comment = comment;
		this._date = moment(date)
			.format(datetime);
		this._amount = amount;
		this._categoryId = categoryId;
	}

	get id() {
		return this._id;
	}

	set id(id) {
		this._id = id;
	}

	get userId() {
		return this._userId;
	}

	set userId(id) {
		this._userId = id;
	}

	get comment() {
		return this._comment;
	}

	set comment(c) {
		this._comment = c;
	}

	get date() {
		return this._date;
	}

	set date(d) {
		this._date = d;
	}

	get amount() {
		return this._amount;
	}

	set amount(a) {
		this._amount = a;
	}

	get categoryId() {
		return this._categoryId;
	}

	set categoryId(id) {
		this._categoryId = id;
	}
}
