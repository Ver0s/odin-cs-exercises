const Tree = require('./tree');

function logNodeData(node) {
	console.log(node.data);
}

function createRandomArray(size, maxNum) {
	const randomArray = [];
	for (let i = 0; i < size; i++) {
		const randomNum = Math.floor(Math.random() * maxNum + 1);
		randomArray.push(randomNum);
	}
	return randomArray;
}

const randomArray = createRandomArray(10, 100);

const bst = new Tree(randomArray);
bst.prettyPrint();
console.log('balanced', bst.isBalanced());
console.log('level order');
bst.levelOrder(logNodeData);
console.log('');
console.log('preorder');
bst.preorder(logNodeData);
console.log('');
console.log('postorder');
bst.postorder(logNodeData);
console.log('');
console.log('inorder');
bst.inorder(logNodeData);
console.log('-------------------------------------------');
bst.insertNode(120);
bst.insertNode(420);
bst.insertNode(2137);
bst.insertNode(997);
bst.insertNode(6969);
bst.prettyPrint();
console.log('balanced', bst.isBalanced());
console.log('-------------------------------------------');
bst.rebalance();
bst.prettyPrint();
console.log('balanced', bst.isBalanced());
console.log('level order');
bst.levelOrder(logNodeData);
console.log('');
console.log('preorder');
bst.preorder(logNodeData);
console.log('');
console.log('postorder');
bst.postorder(logNodeData);
console.log('');
console.log('inorder');
bst.inorder(logNodeData);
