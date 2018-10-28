const csv=require('csvtojson')
const path = require('path');
const fs = require('fs');
const stringify = require('csv-stringify');

const dataTugas2 = path.join(__dirname, '/DataTugas2.csv');
var rule = JSON.parse(fs.readFileSync('fuzzyRule.json', 'utf8'));

const PENDAPATAN = [0, 0.5, 0.9, 1.3, 1.6, 2]
const HUTANG = [0, 20, 40, 55, 80, 100]
const ORDER = []
const FINAL = []

csv().fromFile(dataTugas2).then((tugas2)=>{
  // Run main program
  main(tugas2)

  // Sort berdasarkan yang paling layak
  ORDER.sort(function(a, b){
      return b.hasil - a.hasil;
  });

  // Push hasil ke FINAL
  for (var i = 0; i < 20; i++) {
    FINAL.push({'No' : ORDER[i].No})
  }

  // Sort berdasarkan nomor, agar mudah terbaca (biar nilainya enak)
  FINAL.sort(function(a, b){
      return a.No - b.No;
  });

  // Save as CSV in the same path
  stringify(FINAL, function(err, output) {
    fs.writeFile('TebakanTugas2.csv', output, 'utf8', function(err) {
      if (err) {
        console.log('Some error occured - file either not saved or corrupted file saved.');
      } else {
        console.log('File TebakanTugas2.csv berhasil disimpan kak :D');
      }
    });
  });

  // console.log(ORDER);
  console.log(FINAL);

  // Return FINAL (For LINE Bot version)
  return FINAL;
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

	const iya = Math.max(...IYA)
	const tidak = Math.max(...TIDAK)
  return { iya, tidak }
}

const proses = (Pendapatan, Hutang, final) => {
  let pendapatan = fuzzification(Pendapatan, PENDAPATAN)
  let hutang = fuzzification(Hutang, HUTANG)
  let Inference = inference(pendapatan, hutang)
  let Defuzzi = defuzzification(Inference)

  if (final) return (Defuzzi['iya'] > Defuzzi['tidak']) ? 'ya': 'tidak'
  else return (Defuzzi['iya'] > Defuzzi['tidak']) ? Defuzzi['iya']: Defuzzi['tidak']
}

const main = (data) => {
  let count = 0
  let iya = 0
  for (var i = 0; i < data.length; i++) {
    const result = proses(data[i]['Pendapatan'], data[i]['Hutang'], true)
    if (result == 'ya') {
      hasil = proses(data[i]['Pendapatan'], data[i]['Hutang'], false)
      ORDER.push({'No' : i+1, 'hasil' : hasil});
    }
  }
}
