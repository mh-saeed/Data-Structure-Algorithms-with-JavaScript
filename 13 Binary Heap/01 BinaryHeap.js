// Implement the following functions on the MaxBinaryHeap/MinBinaryHeap class

// insert
// This function should insert a node in a binary heap.
// Make sure to re-order the heap after insertion if necessary.

// extractMax/Min
// This function should remove the root node in a binary heap.
// Make sure to re-order the heap after removal if necessary.

// heapify
// This function should convert array into a max/min heap.
// Should return the values property on the heap.

// heapSort
// This function should sort array with Time complexity O(n * log n) and
// Space complexity O(1). Should return the values property on the heap.

// Additionally, the following methods are implemented on the class:
// find - returns an array of indexes of items with the given value
// remove - removes all items with the given value
// isHeap - checks if the heap invariant is still being maintained (if the heap is valid)

class BinaryHeap {
  constructor(array = []) {
    if (new.target === BinaryHeap) {
      throw new TypeError("You cannot instantiate BinaryHeap class directly");
    }

    this.values = array;
    this.getItem = this.getItem.bind(this);
    this.heapify();
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  getItem(index) {
    return this.values[index];
  }

  insert(value) {
    this.values.push(value);
    this.bubbleUp();

    return this;
  }

  extract() {
    if (this.isEmpty()) return null;
    if (this.values.length === 1) return this.values.pop();

    this.swap(0, this.values.length - 1);
    const extractedItem = this.values.pop();
    this.sinkDown();

    return extractedItem;
  }

  peek() {
    if (this.isEmpty()) return null;

    return this.values[0];
  }

  find(value, getValueFn = this.getItem) {
    const indexes = [];

    for (let i = 0; i < this.values.length; i++) {
      if (getValueFn(i) === value) indexes.push(i);
    }

    return indexes;
  }

  remove(value, getValueFn = this.getItem) {
    const numberItems = this.find(value, getValueFn).length;

    for (let i = 0; i < numberItems; i++) {
      const itemIndex = this.find(value, getValueFn)[0];

      if (this.values.length === 1 || itemIndex === this.values.length - 1) {
        this.values.pop();
        return this;
      }

      this.swap(itemIndex, this.values.length - 1);
      this.values.pop();
      const swapItemValue = this.getItem(itemIndex);
      const parentIndex = this.getParentIndex(itemIndex);

      if (
        parentIndex >= 0 &&
        this.compare(swapItemValue, this.getItem(parentIndex))
      ) {
        this.bubbleUp(itemIndex);
      } else {
        this.sinkDown(itemIndex);
      }
    }

    return this;
  }

  // Time complexity O(n)
  // http://www.cs.umd.edu/~meesh/351/mount/lectures/lect14-heapsort-analysis-part.pdf
  heapify() {
    for (
      let i = Math.max(0, Math.floor(this.values.length / 2 - 1));
      i >= 0;
      i--
    ) {
      this.sinkDown(i);
    }
  }

  heapSort() {
    const valuesCopy = [...this.values];

    for (let i = this.values.length - 1; i > 0; i--) {
      this.swap(0, i);
      this.sinkDown(0, i);
    }

    const sortedArray = [...this.values];
    this.values = valuesCopy;

    return sortedArray.reverse();
  }

  heapSortViaExtract() {
    const sortedArray = [];
    const valuesCopy = [...this.values];

    while (this.values.length) {
      sortedArray.push(this.extract());
    }
    this.values = [...valuesCopy];

    return sortedArray;
  }

  bubbleUp(idx = this.values.length - 1) {
    let index = idx;
    const value = this.getItem(index);

    while (index > 0) {
      const parentIndex = this.getParentIndex(index);

      if (this.compare(this.getItem(parentIndex), value)) break;

      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  sinkDown(idx = 0, length = this.values.length) {
    let index = idx;

    while (true) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      if (leftChildIndex >= length && leftChildIndex >= length) break;

      if (
        rightChildIndex >= length &&
        this.compare(this.getItem(index), this.getItem(leftChildIndex))
      ) {
        break;
      }

      if (
        this.compare(this.getItem(index), this.getItem(leftChildIndex)) &&
        this.compare(this.getItem(index), this.getItem(rightChildIndex))
      ) {
        break;
      }

      const swapIndex =
        rightChildIndex >= length ||
        this.compare(
          this.getItem(leftChildIndex),
          this.getItem(rightChildIndex)
        )
          ? leftChildIndex
          : rightChildIndex;

      this.swap(index, swapIndex);
      index = swapIndex;
    }
  }

  isHeap(idx = 0) {
    if (idx >= this.values.length) return true;

    const parent = this.getItem(idx);
    const leftChildIndex = this.getLeftChildIndex(idx);
    const rightChildIndex = this.getRightChildIndex(idx);

    if (
      leftChildIndex < this.values.length &&
      !this.compare(parent, this.getItem(leftChildIndex))
    ) {
      return false;
    }
    if (
      rightChildIndex < this.values.length &&
      !this.compare(parent, this.getItem(rightChildIndex))
    ) {
      return false;
    }

    return this.isHeap(leftChildIndex) && this.isHeap(rightChildIndex);
  }

  isEmpty() {
    return !this.values.length;
  }

  swap(indexOne, indexTwo) {
    [this.values[indexOne], this.values[indexTwo]] = [
      this.values[indexTwo],
      this.values[indexOne],
    ];
  }

  compare(firstItem, secondItem) {
    throw new Error(
      "You must implement your own compare method for min or max heap."
    );
  }
}

class MaxBinaryHeap extends BinaryHeap {
  extractMax() {
    return super.extract();
  }

  compare(firstItem, secondItem) {
    return firstItem >= secondItem;
  }
}

const binaryHeap1 = new MaxBinaryHeap()
  .insert(1)
  .insert(2)
  .insert(3)
  .insert(4)
  .insert(5)
  .insert(6)
  .insert(4);

console.log(binaryHeap1.values); // [ 6, 4, 5, 1, 3, 2, 4 ]
console.log(binaryHeap1.heapSort()); // [ 6, 5, 4, 4, 3, 2, 1 ]
console.log(binaryHeap1.find(4)); // [ 1, 6 ]
binaryHeap1.remove(4);
console.log(binaryHeap1.values); // [ 6, 3, 5, 1, 2 ]
binaryHeap1.insert(4);
console.log(binaryHeap1.values); // [ 6, 3, 5, 1, 2, 4 ]
console.log(binaryHeap1.extractMax()); // 6
console.log(binaryHeap1.values); // [ 5, 3, 4, 1, 2 ]
console.log(binaryHeap1.heapSortViaExtract()); // [ 5, 4, 3, 2, 1 ]
console.log(binaryHeap1.values); // [ 5, 3, 4, 1, 2 ]

const binaryHeap2 = new MaxBinaryHeap([7, 4, 9, 6, 1, 8, 4]);

console.log(binaryHeap2.values); // [ 9, 6, 8, 4, 1, 7, 4 ]
console.log(binaryHeap2.isHeap()); // true
console.log(binaryHeap2.heapSort()); // [ 9, 8, 7, 6, 4, 4, 1 ]

class MinBinaryHeap extends BinaryHeap {
  extractMin() {
    return super.extract();
  }

  compare(firstItem, secondItem) {
    return firstItem <= secondItem;
  }
}

if (module.parent) {
  module.exports = MinBinaryHeap;
} else {
  const binaryHeap1 = new MinBinaryHeap()
    .insert(1)
    .insert(2)
    .insert(3)
    .insert(4)
    .insert(5)
    .insert(6)
    .insert(4);

  console.log(binaryHeap1.values); // [ 1, 2, 3, 4, 5, 6, 4 ]
  console.log(binaryHeap1.heapSort()); // [ 1, 2, 3, 4, 4, 5, 6 ]
  console.log(binaryHeap1.find(4)); // [ 3, 6 ]
  binaryHeap1.remove(4);
  console.log(binaryHeap1.values); // [ 1, 2, 3, 6, 5 ]
  binaryHeap1.insert(4);
  console.log(binaryHeap1.values); // [ 1, 2, 3, 6, 5, 4 ]
  console.log(binaryHeap1.extractMin()); // 1
  console.log(binaryHeap1.values); // [ 2, 4, 3, 6, 5 ]
  console.log(binaryHeap1.heapSortViaExtract()); // [ 2, 3, 4, 5, 6 ]
  console.log(binaryHeap1.values); // [ 2, 4, 3, 6, 5 ]

  const binaryHeap2 = new MinBinaryHeap([7, 4, 9, 6, 1, 8, 4]);

  console.log(binaryHeap2.values); // [ 1, 4, 4, 6, 7, 8, 9 ]
  console.log(binaryHeap2.isHeap()); // true
  console.log(binaryHeap2.heapSort()); // [ 1, 4, 4, 6, 7, 8, 9 ]
}
