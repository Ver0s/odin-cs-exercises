const TreeNode = require('./tree-node');

class Tree {
	constructor(array) {
		this.array = [...new Set(array)].sort((a, b) => a - b);
		this.root = this.buildTree(this.array, 0, this.array.length - 1);
	}

	#minValue(root) {
		let minv = root.data;
		while (root.left !== null) {
			minv = root.left.data;
			root = root.left;
		}
		return minv;
	}

	buildTree(arr, start, end) {
		if (start > end) return null;

		const mid = Math.floor((start + end) / 2);
		const root = new TreeNode(arr[mid]);

		root.left = this.buildTree(arr, start, mid - 1);
		root.right = this.buildTree(arr, mid + 1, end);

		return root;
	}

	insertNode(value, root = this.root) {
		if (root === null) {
			root = new TreeNode(value);
			return root;
		}

		if (value < root.data) {
			root.left = this.insertNode(value, root.left);
		} else if (value > root.data) {
			root.right = this.insertNode(value, root.right);
		}
		return root;
	}

	deleteNode(value, root = this.root) {
		if (root === null) {
			return root;
		}

		if (value < root.data) {
			root.left = this.deleteNode(value, root.left);
		} else if (value > root.data) {
			root.right = this.deleteNode(value, root.right);
		} else {
			if (root.left === null) {
				return root.right;
			} else if (root.right === null) {
				return root.left;
			}

			root.data = this.#minValue(root.right);
			root.right = this.deleteNode(root.data, root.right);
		}
		return root;
	}

	find(value, root = this.root) {
		if (root === null || value === root.data) {
			return root;
		}

		if (value < root.data) {
			return this.find(value, root.left);
		} else if (value > root.data) {
			return this.find(value, root.right);
		}

		// return root;
	}

	levelOrder(callback) {}

	prettyPrint(node = this.root, prefix = '', isLeft = true) {
		if (node.right !== null) {
			this.prettyPrint(
				node.right,
				`${prefix}${isLeft ? '│   ' : '    '}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
		if (node.left !== null) {
			this.prettyPrint(
				node.left,
				`${prefix}${isLeft ? '    ' : '│   '}`,
				true
			);
		}
	}
}

const newTree = new Tree([1, 2, 3, 4, 5, 6]);
newTree.prettyPrint();
console.log(newTree.find(1));
