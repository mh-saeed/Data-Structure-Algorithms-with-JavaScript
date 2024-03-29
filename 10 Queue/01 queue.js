class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // Adding at the end of the Queue!
  enqueue(val) {
    let newNode = new Node(val);

    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }

    return ++this.size;
  }

  // Removing from the beginning of the Queue!
  dequeue() {
    if (!this.first) return null;

    let temp = this.first;

    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;

    return temp.value;
  }
}

let queue = new Queue();

console.log(queue.enqueue("Start"));
console.log(queue.enqueue("0"));
console.log(queue.enqueue("1"));
console.log(queue.enqueue("2"));
console.log(queue.enqueue("3"));
console.log(queue.enqueue("end"));

console.log(queue.dequeue()); // start
console.log(queue.dequeue()); // 0
