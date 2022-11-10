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

	levelOrder(callback, root = this.root) {
		if (root === null) {
			return;
		}
		const queue = [];
		const values = [];
		queue.push(root);
		while (queue.length !== 0) {
			const currentNode = queue[0];
			if (callback) {
				callback(currentNode);
			} else {
				values.push(currentNode.data);
			}

			if (currentNode.left !== null) {
				queue.push(currentNode.left);
			}
			if (currentNode.right !== null) {
				queue.push(currentNode.right);
			}
			queue.shift();
		}
		if (!callback) return values;
	}

	inorder(callback, root = this.root) {
		if (root === null) {
			return;
		}
		this.inorder(callback, root.left);
		callback(root);
		this.inorder(callback, root.right);
	}

	preorder(callback, root = this.root) {
		if (root === null) {
			return;
		}
		callback(root);
		this.preorder(callback, root.left);
		this.preorder(callback, root.right);
	}

	postorder(callback, root = this.root) {
		if (root === null) {
			return;
		}
		this.postorder(callback, root.left);
		this.postorder(callback, root.right);
		callback(root);
	}

	height(node) {
		if (node === null) {
			return -1;
		}
		const leftHeight = this.height(node.left);
		const rightHeight = this.height(node.right);
		return Math.max(leftHeight, rightHeight) + 1;
	}

	// fix this
	depth(node) {
		if (node === null) {
			return 0;
		}
		const left = this.depth(node.left);
		const right = this.depth(node.right);
		return Math.max(left, right) + 1;
	}

	isBalanced(root = this.root) {
		if (root === null) return false;

		const leftHeight = this.height(root.left);
		const rightHeight = this.height(root.right);

		return Math.abs(leftHeight - rightHeight) < 1;
	}

	rebalance() {
		const rebalancedArray = [];
		this.inorder((item) => {
			rebalancedArray.push(item.data);
		});
		this.root = this.buildTree(
			rebalancedArray,
			0,
			rebalancedArray.length - 1
		);
	}

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

module.exports = Tree;
