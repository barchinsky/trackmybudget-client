export default class Category {
	constructor({ _name, _userId, _color, _id } = {}) {
		this._name = _name;
		this._userId = _userId;
		this._color = _color;
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

	serialize() {
		return JSON.stringify(this);
	}

	static deserialize(data) {
		return new Category(JSON.parse(data));
	}
}
