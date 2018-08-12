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

    if (typeof firstElement !== 'undefined') {
      let elementIndex = 1;
      const newFirstElement = heap.pop();
      const heapMaxIndex = heap.length;

      if (heapMaxIndex !== elementIndex) {
        heap[elementIndex] = newFirstElement;

        let leftChildIndex = getLeftChildIndex(elementIndex);
        let rightChildIndex = getRightChildIndex(elementIndex);

        let leftChild = heap[leftChildIndex];
        let rightChild = heap[rightChildIndex];

        let largerChildIndex = comparator(leftChild, rightChild) ? rightChildIndex : leftChildIndex;
        let largerChild = heap[largerChildIndex];

        while (comparator(newFirstElement, largerChild) && elementIndex < heapMaxIndex) {
          swap({
            fromIndex: elementIndex,
            toIndex: largerChildIndex,
          });
          elementIndex = largerChildIndex;
          leftChildIndex = getLeftChildIndex(elementIndex);
          rightChildIndex = getRightChildIndex(elementIndex);

          leftChild = heap[leftChildIndex];
          rightChild = heap[rightChildIndex];

          largerChildIndex = comparator(leftChild, rightChild) ? rightChildIndex : leftChildIndex;
          largerChild = heap[largerChildIndex];
        }
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
    pop,
    peek,
    toString,
  };
};

export default simplePriorityQueue;
