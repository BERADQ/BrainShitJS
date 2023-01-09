module.exports = (code: string, cPath: string, name: string): boolean => {
	const fs = require('fs');
	const pathUtil = require('path');
	let codFormat: number = 0xF1;
	console.log(code.substring(0, 3));
	switch (code.substring(0, 3)) {
		case '(A)':
			codFormat = 0xF1;
			break;
		case '(U)':
			codFormat = 0xF2;
			break;
		case '(B)':
			codFormat = 0xF3;
			break;
		default: {
			console.log('未指定输出字符编码');
			return false;
		}
	}
	code = code
		.substring(2)
		.replace(/0/g, 'LX-FR-SL-JY-R')
		.replace(/\/\*[\s\S]*?\*\//g, '')
		.replace(/[^slrfjxyociabp10]/gi, '')
		.toUpperCase();
	
	if (code.length % 2 !== 0) {
		code += '-';
	}
	
	console.log(code);
	
	let theStream: string[] = code.match(/.{2}?/g);
	
	console.log(theStream);
	let sCode: Buffer = getSCode(theStream,codFormat);
	
	let ws = fs.createWriteStream(pathUtil.join(cPath, `${name}.bns`));
	ws.write(sCode);
	ws.end();
	console.log(sCode);
	return true;
	
	function getSCode(str2: string[],codFormat:number): Buffer {
		const getto = (char: string): number => {
			let temp: number = 0xD;
			switch (char) {
				case '1':
					temp = 0x0;
					break;
				case 'S':
					temp = 0x1;
					break;
				case 'L':
					temp = 0x2;
					break;
				case 'R':
					temp = 0x3;
					break;
				case 'F':
					temp = 0x4;
					break;
				case 'J':
					temp = 0x5;
					break;
				case 'X':
					temp = 0x6;
					break;
				case 'Y':
					temp = 0x7;
					break;
				case 'O':
					temp = 0x8;
					break;
				case 'C':
					temp = 0x9;
					break;
				case 'I':
					temp = 0xA;
					break;
				case 'A':
					temp = 0xB;
					break;
				case 'B':
					temp = 0xC;
					break;
				case 'P':
					temp = 0xD;
					break;
				case '-':
					temp = 0xE;
					break;
			}
			return temp;
		};
		let first: string = '-';
		let next: string = '-';
		let theStream: number[] = [codFormat];
		for (let item of str2) {
			first = item.charAt(0);
			next = item.charAt(1);
			theStream.push(getto(first) * 0x10 + getto(next));
		}
		return Buffer.from(theStream);
	}
};

