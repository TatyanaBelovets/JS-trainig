window.List = (function(){
	'use strict';
	function List() {
		this.start = null;
		this.end = null;
		this.length = 0;
		for (var i = 0; i < arguments.length; i++) {
			this.append(arguments[i]);
		}
	}

	List.prototype.head = function(){
		if (this.start !== null){
			return this.start.data;
		}
		return null;
	};

	List.prototype.tail = function(){
		if (this.end !== null){
			return this.end.data;
		}
		return null;
	};

	List.prototype.append = function(data) {
		this.end = {data: data, next: null, prev: this.end};
		if (this.start === null){
			this.start = this.end;
		}
		if (this.end.prev !== null) {
			this.end.prev.next = this.end;
		}
		this.length++;
		return this;
	};

	var iterList = function(list, callback) {
		var i = 0, cur = list.start, res;
		while (cur !== null && res !== false) {
			res = callback(cur, i, list);
			i++;
			cur = cur.next;
		}
	};

	List.prototype.each = function(callback) {
		iterList(this, function(node, index, list) {
			return callback(node.data, index, list);
		});
		return this;
	};

	List.prototype.at = function(index) {
		var dataByIndex;
		this.each(function(data, i) {
			if (i === index) {
				dataByIndex = data;
				return false;
			}
		});
		return dataByIndex;
	};

	List.prototype.reverse = function() {
		var temp = this.start;
		this.start = this.end;
		this.end = temp;
		iterList(this, function(node) {
			var temp = node.prev;
			node.prev = node.next;
			node.next = temp;	
		});
		return this;
	};

	List.prototype.toArray = function() {
		var arr = [];
		this.each(function(val) { arr.push(val); });
		return arr;
	}; //Test method

	List.prototype.insertAt = function(index, data) {
		if (index < 0 || index >= this.length || index != (index | 0)) {
			throw new RangeError('Invalid index: ' + index + ', expected integer between 0 and ' + this.length);
		}
		iterList(this, function(node, i, list) {
			if (i === index) {
				if (node === list.start){
					var newData = {data: data, prev: null, next: list.start};
					list.start.prev = newData;
					list.start = newData;
				}
				else {if (node === list.end){
					var newData = {data: data, prev: list.end, next: null};
					list.end.next = newData;
					list.end = newData; 
				}
				else{
					var newData = {data: data, prev: node.prev, next: node};
					node.prev.next = newData;
					node.prev = newData;
				}}
				return false;
			}
		});
		this.length++;
		return this;
	};

	List.prototype.deleteAt = function(index) {
		if (index < 0 || index >= this.length || index != (index | 0)) {
			throw new RangeError('Invalid index: ' + index + ', expected integer between 0 and ' + this.length);
		}
		iterList(this, function(node, i, list) {
			if (i === index) {
				if (node != list.start){
					node.prev.next = node.next;
				} else {
					list.start = node.next;
				}
				if (node != list.end){
					node.next.prev = node.prev;
				} else {
					list.end = node.prev;
				}
				list.length--;
				return false; 
			}
		});
		return this;
	};

	List.prototype.indexOf = function(data) {
		var indexByData;
		this.each(function(d, index) {
			if (d == data) {
				indexByData = index;
				return false;
			}
		});
		return indexByData;
	};

	return List;
}());
