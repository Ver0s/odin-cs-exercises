function merge(arr1, arr2) {
	const mergedArray = [];
	while (arr1.length && arr2.length) {
		if (arr1[0] < arr2[0]) {
			mergedArray.push(arr1.shift());
		} else {
			mergedArray.push(arr2.shift());
		}
	}
	return [...mergedArray, ...arr1, ...arr2];
}

function mergeSort(arr) {
	if (arr.length <= 1) {
		return arr;
	} else {
		const half = Math.floor(arr.length / 2);
		const leftHalf = arr.slice(0, half);
		const rightHalf = arr.slice(half);
		return merge(mergeSort(leftHalf), mergeSort(rightHalf));
	}
}

console.log(mergeSort([21, 15, 16]));
