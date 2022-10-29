const Node = (value = null, nextNode = null) => {
	return {
		value,
		nextNode,
	};
};

const LinkedList = (head = null) => {
	const append = (value) => {
		const newNode = Node(value);
		if (head === null) {
			head = newNode;
		} else {
			let lastNode = head;
			while (lastNode.nextNode !== null) {
				lastNode = lastNode.nextNode;
			}
			lastNode.nextNode = newNode;
		}
	};

	const prepend = (value) => {
		const newNode = Node(value, head);
		head = newNode;
	};

	const getSize = () => {
		let temp = head;
		let counter = 0;
		while (temp) {
			counter++;
			temp = temp.nextNode;
		}
		return counter;
	};

	const getHead = () => {
		return head === null ? null : `( ${head.value} )`;
	};

	const getTail = () => {
		if (head === null) {
			return null;
		} else {
			let lastNode = head;
			while (lastNode.nextNode !== null) {
				lastNode = lastNode.nextNode;
			}
			return `( ${lastNode.value} )`;
		}
	};

	const at = (index) => {
		if (index < 0) return 'Provide an index that is greater or equal to 0';
		let temp = head;
		let currentIndex = 0;

		while (temp) {
			if (currentIndex === index) {
				return `( ${temp.value} )`;
			} else {
				temp = temp.nextNode;
				currentIndex++;
			}
		}
		return 'Provided index is greater than list size';
	};

	const pop = () => {
		let secondToLastNode = head;
		while (secondToLastNode.nextNode.nextNode !== null) {
			secondToLastNode = secondToLastNode.nextNode;
		}
		secondToLastNode.nextNode = null;
	};

	const contains = (value) => {
		let temp = head;
		while (temp) {
			if (temp.value === value) {
				return true;
			} else {
				temp = temp.nextNode;
			}
		}
		return false;
	};

	const find = (value) => {
		let temp = head;
		let currentIndex = 0;

		while (temp) {
			if (temp.value === value) {
				return currentIndex;
			} else {
				temp = temp.nextNode;
				currentIndex++;
			}
		}
		return null;
	};

	const toString = () => {
		let temp = head;
		let output = '';
		while (temp) {
			output += `( ${temp.value} ) -> `;
			temp = temp.nextNode;
		}
		output += 'null';
		return output;
	};

	return {
		append,
		prepend,
		getSize,
		getHead,
		getTail,
		at,
		pop,
		contains,
		find,
		toString,
	};
};

const linkedList = LinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
console.log(linkedList.toString());
console.log(linkedList.at(2));
