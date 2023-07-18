/** @format */

class DataSet {
	get date() {
		return this._date;
	}
	set date(value) {
		this._date = value;
	}
	get time() {
		return this._time;
	}
	set time(value) {
		this._time = value;
	}
	get height() {
		return this._height;
	}
	set height(value) {
		this._height = value;
	}
	get uncertainty() {
		return this._uncertainty;
	}
	set uncertainty(value) {
		this._uncertainty = value;
	}
	constructor(date, time, height, uncertainty) {
		this._date = date || "";
		this._time = time || "";
		this._height = height || 0;
		this._uncertainty = uncertainty || 0;
	}
}
exports.DataSet = DataSet;
