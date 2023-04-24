function minimumCostOfRopes(arr) {
  // Sort the array in non-decreasing order
  arr.sort((a, b) => a - b);
  
  let cost = 0;
  
  while (arr.length > 1) {
    // Take the two shortest ropes
    const a = arr.shift();
    const b = arr.shift();
    
    // Connect them to form a new rope
    const newRope = a + b;
    
    // Add the cost of this operation to the total
    cost += newRope;
    
    // Insert the new rope back into the sorted array
    let i = 0;
    while (i < arr.length && arr[i] < newRope) {
      i++;
    }
    arr.splice(i, 0, newRope);
  }
  
  return cost;
}

const input = document.querySelector('input[type="text"]');
const resultDiv = document.querySelector('#result');

input.addEventListener('change', () => {
  const ropes = input.value.split(',').map(Number);
  const minCost = minimumCostOfRopes(ropes);
  resultDiv.textContent = `Minimum cost of ropes: ${minCost}`;
});
