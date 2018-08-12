import formatBinaryTree from 'format-binary-tree';

const defaultComparator = (first, second) => first < second;

const simplePriorityQueue = ({ comparator = defaultComparator } = {}) => {
  const heap = [null];

  const getParentIndex = index => Math.floor(index / 2);
  const getLeftChildIndex = index => index * 2;
  const getRightChildIndex = index => index * 2 + 1;
  const toString = () => formatBinaryTree({ values: heap.slice(1) });

  const swap = ({ fromIndex, toIndex }) => {
    const fromValue = heap[fromIndex];
    const toValue = heap[toIndex];

    heap[fromIndex] = toValue;
    heap[toIndex] = fromValue;
  };

  const peek = () => heap[1];

  const pop = () => {
    const firstElement = heap[1];

    if (firstElement) {
      let elementIndex = 1;
      const newFirstElement = heap.pop();
      const heapMaxIndex = heap.length - 1;
      heap[elementIndex] = newFirstElement;

      const leftChildIndex = getLeftChildIndex(elementIndex);
      const rightChildIndex = getRightChildIndex(elementIndex);

      const leftChild = heap[leftChildIndex];
      const rightChild = heap[rightChildIndex];

      let largerChildIndex = comparator(leftChild, rightChild) ? rightChildIndex : leftChildIndex;
      const largerChild = comparator(leftChild, rightChild) ? rightChild : leftChild;

      while (comparator(largerChild, newFirstElement) && elementIndex < heapMaxIndex) {
        swap({
          fromIndex: elementIndex,
          toIndex: largerChildIndex
        });
        elementIndex = largerChildIndex;
        const leftChildIndex = getLeftChildIndex(elementIndex);
        const rightChildIndex = getRightChildIndex(elementIndex);

        const leftChild = heap[leftChildIndex];
        const rightChild = heap[rightChildIndex];

        largerChildIndex = comparator(leftChild, rightChild) ? rightChildIndex : leftChildIndex;
      }
    }

    return firstElement;
  };

  const add = (value) => {
    heap.push(value);
    let valueIndex = heap.length - 1;
    let parentIndex = getParentIndex(valueIndex);
    let parentValue = heap[parentIndex];
    while (comparator(parentValue, value) && parentIndex >= 1) {
      swap({
        fromIndex: valueIndex,
        toIndex: parentIndex,
      });
      valueIndex = parentIndex;
      parentIndex = getParentIndex(valueIndex);
      parentValue = heap[parentIndex];
    }
  };

  return {
    add,
    toString,
  };
};

export default simplePriorityQueue;
