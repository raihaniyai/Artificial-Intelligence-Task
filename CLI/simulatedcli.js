// Define Max Temperature, Min Temperature, Cooling Rate, Iteration and formula for Acceptance Probability
const suhuMin = 0.000001; // Minimum Temperature
let suhuMaks = 1.0; // Maximum Temperature
const maxTemp = suhuMaks; // Maximum Temperature for display
const coolingRate = 0.99; // Cooling Rate
const iterasi = 17000; // Semakin besar iterasi maka semakin optimal pencarian nilai minimum
let probabilitas = (cost, newCost, t) => Math.exp(-1 * (newCost - cost)/t); // Probability

// Guess a number between -10 to 10 for x1 or x2 or neighbor
const generateRandom = (max, min) => Math.random() * (max-min) + min;

// return function that defined in task 1
const generateCost = (eksSatu, eksDua) => (
  -1 * (Math.abs(Math.sin(eksSatu) * Math.cos(eksDua) * Math.exp(Math.abs(1 - ((Math.sqrt((eksSatu * eksSatu) + (eksDua * eksDua)))/Math.PI)))))
);

var newEksSatu, newEksDua, newCost; // Generate new value for x1, x2, cost
let eksSatu = generateRandom(10, -10); // Value of x1
let eksDua = generateRandom(10, -10); // Value of x2
let cost = generateCost(eksSatu, eksDua); //Calling function generateCost
while (suhuMin < suhuMaks) {
  var indeks = 1; // For iteration
  while (indeks <= iterasi) {
    newCost = generateCost(newEksSatu, newEksDua);
    newEksSatu = generateRandom(10, -10); // Pick Random Number for Neighbor of x1
    newEksDua = generateRandom(10, -10); // Pick Random Number for Neighbor of x2
    let acceptance = probabilitas(cost, newCost, suhuMaks);
    if (Math.random() < acceptance) { // If acceptance is not optimum, change the value
      cost = newCost;
      eksSatu = newEksSatu;
      eksDua = newEksDua;
    }
    indeks++; // Increment of indeks until iterasi
  }
  suhuMaks = suhuMaks * coolingRate; // Current Temperature * Cooling Rate (Penurunan Suhu)
}

// Result For Line Bot, Comment if you Running this program via CLI
return flexSimulated.hasil(userId, eksSatu.toString(), eksDua.toString(), cost.toString());

// Result Log for CLI version
console.log("\nKonfigurasi\n");
console.log("Suhu Minimum\t: " + suhuMin);
console.log("Suhu Maksimum\t: " + maxTemp);
console.log("Cooling Rate\t: " + coolingRate);
console.log("Suhu Sekarang\t: " + suhuMaks);

console.log("\n--------------------------------------\n");

console.log("Hasil Simulated Annealing\n");
console.log("x1\t\t: " + eksSatu);
console.log("x2\t\t: " + eksDua);
console.log("Cost\t\t: " + cost);

console.log("\n--------------------------------------\n");

// Change the value of FR if you wanna know how accurate this program
console.log("Akurasi Hasil SA (Ganti nilai FR pada program)\n");
var FR = -19.2085; // Change this value
console.log("Akurasi\t\t: " + (1 - ((cost - FR)/FR)) * 100 + " %");

console.log("\n--------------------------------------\n");

console.log("Line Bot Version: add @bxx4367b");

console.log(Math.PI);
