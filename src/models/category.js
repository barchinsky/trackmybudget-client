export default class Category {
	constructor({ name, userId, color, _id } = {}) {
		this._name = name;
		this._userId = userId;
		this._color = color;
		this._id = _id;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	set name(name) {
		this._name = name;
	}

	get color() {
		return this._color;
	}

	set color(color) {
		this._color = color;
	}

	get userId() {
		return this._userId;
	}
}
