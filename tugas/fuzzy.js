const bot = require('./../bot.js');
const flexFuzzy = require('./../flex/fuzzy.js');

var self = {
  hasil: function (userId) {
    var csv = bot.csv;
    var fs = bot.fs;
    var path = bot.path;
    var stringify = bot.stringify;

    const data = path.join(__dirname, './DataTugas2.csv');
    var rule = [
      {
        "p": { "jenis": "rendah", "value": "undefined" },
        "h": { "jenis": "rendah", "value": "undefined" },
        "l": { "jenis": "tidak", "value": "undefined" }
      },
      {
        "p": { "jenis": "rendah", "value": "undefined" },
        "h": { "jenis": "sedang", "value": "undefined" },
        "l": { "jenis": "iya", "value": "undefined" }
      },
      {
        "p": { "jenis": "rendah", "value": "undefined" },
        "h": { "jenis": "tinggi", "value": "undefined" },
        "l": { "jenis": "iya", "value": "undefined" }
      },
      {
        "p": { "jenis": "sedang", "value": "undefined" },
        "h": { "jenis": "rendah", "value": "undefined" },
        "l": { "jenis": "tidak", "value": "undefined" }
      },
      {
        "p": { "jenis": "sedang", "value": "undefined" },
        "h": { "jenis": "sedang", "value": "undefined" },
        "l": { "jenis": "tidak", "value": "undefined" }
      },
      {
        "p": { "jenis": "sedang", "value": "undefined" },
        "h": { "jenis": "tinggi", "value": "undefined" },
        "l": { "jenis": "iya", "value": "undefined" }
      },
      {
        "p": { "jenis": "tinggi", "value": "undefined" },
        "h": { "jenis": "rendah", "value": "undefined" },
        "l": { "jenis": "tidak", "value": "undefined" }
      },
      {
        "p": { "jenis": "tinggi", "value": "undefined" },
        "h": { "jenis": "sedang", "value": "undefined" },
        "l": { "jenis": "tidak", "value": "undefined" }
      },
      {
        "p": { "jenis": "tinggi", "value": "undefined" },
        "h": { "jenis": "tinggi", "value": "undefined" },
        "l": { "jenis": "tidak", "value": "undefined" }
      }
    ];

    // const PENGHASILAN = [0, 0.4, 0.9, 1.3, 1.5, 2]
    const PENGHASILAN = [0, 0.35, 0.75, 1.40, 1.75, 2]
    // const HUTANG = [0, 25, 40, 65, 70, 80]
    const HUTANG = [0, 20, 36, 54, 70, 80]
    const ORDER = []

    csv().fromFile(data).then((tugas2)=>{
      main(tugas2)
      stringify(ORDER, function(err, output) {
        fs.writeFile('TebakanTugas2.csv', output, 'utf8', function(err) {
          if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
          } else {
            console.log('It\'s saved!');
          }
        });
      });
      // Result For Line Bot, Comment if you Running this program via CLI
      console.log(ORDER);
      return flexFuzzy.hasil(userId, ORDER);
    })

    const fuzzification = (input, category) => {
    	let tmpArray = [0, 0, 0]
    	if (input <= category[1]) {
    		tmpArray[0] = 1
    	} else if (input <= category[2]) {
    		tmpArray[0] = (category[2] - input)/(category[2] - category[1])
    		tmpArray[1] = (input - category[1])/(category[2] - category[1])
    	} else if (input <= category[3]) {
    		tmpArray[1] = 1
    	} else if (input <= category[4]) {
    		tmpArray[1] = (category[4] - input)/(category[4] - category[3])
    		tmpArray[2] = (input - category[3])/(category[4] - category[3])
    	} else if (input <= category[5]) {
    		tmpArray[2] = 1
    	}
    	return tmpArray
    }

    const inference = (Pendapatan, Hutang) => {
    	let result = rule
    	let count = 0
    	for (var i = 0; i < 3; i++) {
    		for (var j = 0; j < 3; j++) {
    			result[count]['p']['value'] = Pendapatan[i]
    			result[count]['h']['value'] = Hutang[j]
    			result[count]['l']['value'] = Math.min(Pendapatan[i], Hutang[j])
    			count++
    		}
    	}
      // console.log("INFERENCE: " + JSON.stringify(result) + "\n\n");
    	return result
    }

    const defuzzification = (fuzzyset) => {
    	const IYA = []
    	const TIDAK = []
    	for (var i = 0; i < fuzzyset.length; i++) {
    		let layak = fuzzyset[i]['l']

    		layak['jenis'] === 'iya' ? IYA.push(layak['value']) : undefined
    		layak['jenis'] === 'tidak' ? TIDAK.push(layak['value']) : undefined

    	}
    	// console.log({ IYA, TIDAK }

    	const iya = Math.max(...IYA)
    	const tidak = Math.max(...TIDAK)
      return { iya, tidak }
    }

    const proses = (Pendapatan, Hutang, expect) => {
    	let pendapatan = fuzzification(Pendapatan, PENGHASILAN)
    	let hutang = fuzzification(Hutang, HUTANG)
    	let Inference = inference(pendapatan, hutang)
    	let Defuzi = defuzzification(Inference)

      let hasil = (Defuzi['iya'] > Defuzi['tidak']) ? 'ya': 'tidak'
      // ORDER.push({'hasil': hasil, 'iya' : Defuzi['iya'], 'tidak' : Defuzi['tidak']})
    	return (Defuzi['iya'] > Defuzi['tidak']) ? 'ya': 'tidak'
    }

    const main = (rules) => {
      let count = 0
      let iya = 0
      for (var i = 0; i < rules.length; i++) {
        const result = proses(rules[i]['Pendapatan'], rules[i]['Hutang'], rules[i]['layak'])
        console.log(`No: ${i+1} - Pendapatan: ${rules[i].Pendapatan}, Hutang: ${rules[i].Hutang} = ${result}`)
        if (result == 'ya') {
          ORDER.push({'No' : i+1});
        }
        result ? count++ : undefined
        result === 'ya' ? iya++ : undefined
        i === 19 ? console.log('------') : undefined
      }
      console.log(`Yang Layak Menerima BLT : ${iya}`)
      console.log(`Salah : ${rules.length-count}`)
    }

    console.log("\n--------------------------------------\n");

    console.log("Line Bot Version: add @bxx4367b");
  }
}

module.exports = self;
