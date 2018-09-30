import moment from 'moment';
import { datetime } from '@utils/dateFormats';

export default class Transaction {
	constructor({ _id, _userId, _comment, _date, _amount, _categoryId } = {}) {
		this._id = _id;
		this._userId = _userId;
		this._comment = _comment;
		this._date = moment(_date)
			.format(datetime);
		this._amount = _amount;
		this._categoryId = _categoryId;
		this._category = null;
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

	get category() {
		return this._category;
	}

	set category(c) {
		this._category = c;
	}

	serialize() {
		return JSON.stringify(this);
	}

	static deserialize(data) {
		// console.log('Transaciton:datatodeser:', data);
		const deserData = JSON.parse(data);
		// console.log('deserData:', deserData);
		return new Transaction(deserData);
	}
}
