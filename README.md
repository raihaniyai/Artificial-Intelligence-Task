# Artificial Intelligence Task

Repository ini ditujukan untuk memenuhi Tugas Artificial Intelligence (CCH3F3)

## Getting Started

Program ini dapat dijalankan dengan menggunakan Line Bot atau Command Line Interface (CLI).

Untuk menjalankan program via Line Bot, tambahkan Official Account 'Tugas AI' sebagai teman pada akun Line. Lalu pilih tugas yang akan diperiksa.
ID Line: @bxx4367b

Untuk menjalankan program via Command Line Interface, clone project ini dan ikuti langkah-langkah pada readme.md ini

### Prerequisites

What things you need to install the software and how to install them

```
Git Bash (Command Line) & Node.js
```

You can Install the latest version of Node.js [Here](https://nodejs.org/en/download/)

### Installing

A step by step series of examples that tell you how to get a development env running

```
$ git clone https://github.com/raihaniyai/Artificial-Intelligence-Task.git
$ cd Artificial-Intelligence-Task/CLI
```

Running Simulated Annealing Program

```
$ node simulatedcli.js
```

## Running the Program via CLI

### Configuratoin of Simulated Annealing

```
let SuhuMax = 1.0; // Suhu Maksimum
let SuhuMin = 0.000001; // Suhu Minimum
let coolingRate = 0.99; // Cooling Rate
let iterasi = 17000; // Semakin besar iterasi maka semakin optimal pencarian nilai minimum
let acceptanceProbability = (cost, newCost, t) => Math.exp(-1 * (newCost - cost)/t);
```

You can edit the value for optimum result of Simulated Annealing Algorithm

### Accuration of Simulated Annealing

If you wanna know how accurate is this program, you can change the value of FR into the accurate value

```
console.log("\nAkurasi Hasil SA (Ganti nilai FR pada program)");
var FR = 0;
console.log("Akurasi: " + (1 - ((cost - FR)/FR)) * 100 + " %");
```

Example:
If  the accurate value is -19.208450121, then you should change the code into

```
console.log("\nAkurasi Hasil SA (Ganti nilai FR pada program)");
var FR = -19.208450121;
console.log("Akurasi: " + (1 - ((cost - FR)/FR)) * 100 + " %");
```

## Running the Program via Line Bot



## Built With

* [Node.js](https://nodejs.org/en/)
* [Heroku](https://heroku.com) - The web app used
* [Line Messaging API](https://developers.line.me/en/services/messaging-api/) - Used to integrate with Line Bot

## Authors

* **Raihan Iyai** - *Initial work* - [raihaniyai](https://github.com/raihaniyai)
