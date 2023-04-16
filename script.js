function calculateMinCost() {
  //your code here
	 ropes = ropes.split(",").map(Number);
  
  // Initialize the cost and totalCost variables
  let cost = 0;
  let totalCost = 0;
  
  // Create a min heap from the given array of ropes
  const heap = new MinHeap(ropes);
  
  // Keep merging ropes until there's only one rope left in the heap
  while (heap.size() > 1) {
    // Extract the two smallest ropes from the heap
    const rope1 = heap.extractMin();
    const rope2 = heap.extractMin();
    
    // Add the cost of merging these two ropes to the total cost
    cost = rope1 + rope2;
    totalCost += cost;
    
    // Insert the new rope (result of merging the two smallest ropes) back into the heap
    heap.insert(cost);
  }
  
  // Return the total cost
  return totalCost;
}

// Define the MinHeap class
class MinHeap {
  constructor(array) {
    this.heap = this.buildHeap(array);
  }
  
  buildHeap(array) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }
  
  siftDown(currentIdx, endIdx, heap) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (childTwoIdx !== -1 && heap[childTwoIdx] < heap[childOneIdx]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (heap[idxToSwap] < heap[currentIdx]) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }
  
  siftUp(currentIdx, heap) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }
  
  peek() {
    return this.heap[0];
  }
  
  insert(value) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1, this.heap);
  }
  
  extractMin() {
    this.swap(0, this.heap.length - 1, this.heap);
    const min = this.heap.pop();
    this.siftDown(0, this.heap.length - 1, this.heap);
    return min;
  }
  
  swap(i, j, heap) {
    const temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  }
  
  size() {
    return this.heap.length;
  }
  
  
  
}  
