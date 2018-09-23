# Artificial Intelligence Task

Repository ini ditujukan untuk memenuhi Tugas Artificial Intelligence (CCH3F3)

## Getting Started

Program ini dapat dijalankan dengan menggunakan Line Bot atau Command Line Interface (CLI).

Untuk menjalankan program via Line Bot, tambahkan Official Account 'Tugas AI' sebagai teman pada akun Line. Lalu pilih tugas yang akan diperiksa.
ID Line: @bxx4367b

Untuk menjalankan program via Command Line Interface, clone project ini dan ikuti langkah-langkah pada README.md ini

## Run the Program via CLI

### Prerequisites

What things you need to install to run the program

```
Git Bash (Command Line) & Node.js
```

You can Install the latest version of Node.js [Here](https://nodejs.org/en/download/)

### Installing

Step to run the Simulated Annealing program via Comman Line Interface

```
$ git clone https://github.com/raihaniyai/Artificial-Intelligence-Task.git
$ cd Artificial-Intelligence-Task/CLI
```

Running Simulated Annealing Program

```
$ node simulatedcli.js
```

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

## Run the Program via Line Bot

### Prerequisites

You need to add @bxx4367b on Line App, or click to add [Tugas AI](http://line.me/ti/p/@bxx4367b)

### Greeting Message

This message will shown after you add 'Tugas AI' on Line App
You may choose which task that you wanna check.

Tugas 1: Simulated Annealing

Tugas 2: Soon

Tugas 3: Soon

Tugas 4: Soon

<img src="https://github.com/raihaniyai/Artificial-Intelligence-Task/blob/master/image/greeting.jpg"  width="250">

### Menu of Simulated Annealing

After you choose Tugas 1, the bot will reply with flex message that show the Menu of Simulated Annealing.
If you wanna start the program, just tap 'Start Simulated Annealing' and wait a second, at most 15 seconds.

<img src="https://github.com/raihaniyai/Artificial-Intelligence-Task/blob/master/image/simulated.jpg"  width="250">

### Result of Simulated Annealing

After you wait a second, the bot will reply with flex message that show the Result of Simulated Annealing, and also the parameters of the function

<img src="https://github.com/raihaniyai/Artificial-Intelligence-Task/blob/master/image/hasil.jpg"  width="250">

## Built With

* [Node.js](https://nodejs.org/en/)
* [Heroku](https://heroku.com) - The web app used
* [Line Messaging API](https://developers.line.me/en/services/messaging-api/) - Used to integrate with Line Bot

## Authors

* **Raihan Iyai** - *Initial work* - [raihaniyai](https://github.com/raihaniyai)
