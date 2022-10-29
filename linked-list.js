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
			while (lastNode) {
				if (lastNode.nextNode === null) {
					break;
				}
				lastNode = lastNode.nextNode;
			}
			lastNode.nextNode = newNode;
		}
	};

	const prepend = (value) => {
		const newNode = Node(value, head);
		head = newNode;
	};

	const size = () => {
		let temp = head;
		let counter = 0;
		while (temp) {
			counter++;
			temp = temp.nextNode;
		}
		return counter;
	};

	const toString = () => {
		let temp = head;
		let output = '';
		while (temp) {
			output += `( ${temp.value} ) -> `;
			temp = temp.nextNode;
		}
		output += ' null ';
		return output;
	};

	return {
		append,
		prepend,
		size,
		toString,
	};
};

const linkedList = LinkedList();
linkedList.append(1);
linkedList.append(1);
linkedList.append(1);
linkedList.append(1);
linkedList.prepend('xd');
console.log(linkedList.toString());
console.log(linkedList.size());
// console.log(linkedList.size());
