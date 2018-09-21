// Define Max Temperature, Min Temperature, Cooling Rate, Iteration and formula for Acceptance Probability
let SuhuMax = 1.0; // Suhu Maksimum
let SuhuMin = 0.000001; // Suhu Minimum
let coolingRate = 0.99; // Cooling Rate
let iterasi = 17000; // Semakin besar iterasi maka semakin optimal pencarian nilai minimum
let acceptanceProbability = (cost, newCost, t) => Math.exp((cost - newCost)/t);

// Guess a number between -10 to 10 for x1 or x2 or neighbor
const randomOneNumber = (max, min) => Math.random() * (max-min) + min;

// return function that defined in task 1
const hitungCost = (eksSatu, eksDua) => (
  -1 * (Math.abs(Math.sin(eksSatu) * Math.cos(eksDua) * Math.exp(Math.abs(1 - ((Math.sqrt((eksSatu * eksSatu) + (eksDua * eksDua)))/Math.PI)))))
);

let eksSatu = randomOneNumber(10, -10); // Nilai x1
let eksDua = randomOneNumber(10, -10); // Nilai x2

var newEksSatu, newEksDua, newCost; // Generate new value for x1, x2, cost

let cost = hitungCost(eksSatu, eksDua); //Calling function hitungCost
while (SuhuMax > SuhuMin) {
  var i = 1;
  while (i <= iterasi) {
    newEksSatu = randomOneNumber(10, -10);
    newEksDua = randomOneNumber(10, -10);
    newCost = hitungCost(newEksSatu, newEksDua);
    let acceptance = acceptanceProbability(cost, newCost, SuhuMax);
    if (acceptance > Math.random()) {
      cost = newCost;
      eksSatu = newEksSatu;
      eksDua = newEksDua;
    }
    i++;
  }
  SuhuMax = SuhuMax * coolingRate; // Current Temperature * Cooling Rate
}

// Result For Line Bot, Comment if you Running this program via CLI
// return flexSimulated.hasil(userId, eksSatu.toString(), eksDua.toString(), cost.toString());

// Result Log for CLI version
console.log("Hasil Simulated Annealing: \n");
console.log("x1: " + eksSatu);
console.log("x2: " + eksDua);
console.log("Cost: " + cost);

// Change FR if you wanna know how accurate this program
console.log("\nAkurasi Hasil SA (Ganti nilai FR pada program)");
var FR = 0;
console.log("Akurasi: " + (1 - ((cost - FR)/FR)) * 100 + " %");
