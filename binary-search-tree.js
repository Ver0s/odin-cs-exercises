const Node = (data, left = null, right = null) => {
	return {
		data,
		left,
		right,
	};
};

const Tree = (arr) => {
	const removeDupes = [...new Set(arr)];
	const sortedArr = removeDupes.sort((a, b) => a - b);

	const buildTree = (array, start, end) => {
		if (start > end) return null;

		const mid = Math.floor((start + end) / 2);
		const root = Node(arr[mid]);

		root.left = buildTree(array, start, mid - 1);
		root.right = buildTree(array, mid + 1, end);

		return root;
	};

	const prettyPrint = (node, prefix = '', isLeft = true) => {
		if (node.right !== null) {
			prettyPrint(
				node.right,
				`${prefix}${isLeft ? '│   ' : '    '}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
		if (node.left !== null) {
			prettyPrint(
				node.left,
				`${prefix}${isLeft ? '    ' : '│   '}`,
				true
			);
		}
	};

	return {
		buildTree,
		prettyPrint,
		sortedArr,
	};
};

const newTree = Tree([1, 2, 3, 4]);
const root = newTree.buildTree(
	newTree.sortedArr,
	0,
	newTree.sortedArr.length - 1
);

newTree.prettyPrint(root);
