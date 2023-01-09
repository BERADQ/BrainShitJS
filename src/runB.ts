const readLine = require('readline');

module.exports = (stream: Buffer, name: string, rl: typeof readLine.Interface): Buffer => {
	const mainBuffer: Buffer = Buffer.alloc(1024);
	let mainIndex: number = 0;
	let ABuffer: number[] = [];
	let BBuffer: Buffer = Buffer.alloc(1024);
	let temp: number = 0;
	
	let codFormat: BufferEncoding;
	
	switch (stream[0]) {
		case 0xF1:
			codFormat = 'ascii';
			break;
		case 0xF2:
			codFormat = 'utf-8';
			break;
		case 0xF3:
			codFormat = 'base64';
			break;
		default:
			codFormat = 'ascii';
	}
	
	
	stream[0] = 0xEE;
	const codeNums: number[] = runBode(stream);
	//console.log(name, codeNums);
	
	let i = 0;
	while (i < codeNums.length) {
		let xMainIndex = mainIndex % 1024;
		xMainIndex = (mainIndex < 0) ? 1024 + mainIndex : mainIndex;
		let xI = (i < 0) ? codeNums.length + i : i;
		//console.log(i, xI, mainIndex, codeNums[xI], mainBuffer, temp, mainBuffer[1023]);
		
		switch (codeNums[xI]) {
			case 0x0: {//当前Byte的值增加1。
				mainBuffer[xMainIndex]++;
			}
				break;
			case 0x1: {//当前Byte的值减少1。
				mainBuffer[xMainIndex]--;
			}
				break;
			case 0x2: {//将指针向左移动一位。
				mainIndex--;
			}
				break;
			case 0x3: {//将指针向右移动一位。
				mainIndex++;
			}
				break;
			case 0x4: {//标记这个指令在代码中的的位置到当前Byte中。
				mainBuffer[xMainIndex] = xI;
			}
				break;
			case 0x5: {//如果当前Byte的下一位不为0，则跳到当前Byte值所对应的指令位置继续执行。需要注意的是，值所指向的指令本身不会被执行。
				if (mainBuffer[(xMainIndex + 1) % 1024]) i = mainBuffer[xMainIndex];
			}
				break;
			case 0x6: {//缓存当前Byte的值到唯一的独立Byte中。
				temp = mainBuffer[xMainIndex];
			}
				break;
			case 0x7: {//读取独立Byte的值写到当前Byte。
				mainBuffer[xMainIndex] = temp;
			}
				break;
			case 0x8: {//将当前Byte的值存进A-Buffer尾部。
				ABuffer.push(mainBuffer[xMainIndex]);
			}
				break;
			case 0x9: {//清空A-Buffer。
				ABuffer = [];
			}
				break;
			case 0xA: {//获取输入的字串，将当前Byte作为index，输入字串到B-Buffer对应位置中。
				rl.question(`${name} >`, (answer) => {
					BBuffer.write(answer, mainBuffer[xMainIndex]);
				});
			}
				break;
			case 0xB: {//将当前Byte作为index，读取A-Buffer中对应的值覆盖当前Byte。
				mainBuffer[xMainIndex] = ABuffer[mainBuffer[xMainIndex]];
			}
				break;
			case 0xC: {//将当前Byte作为index，读取B-Buffer中对应的值覆盖当前Byte。
				mainBuffer[xMainIndex] = BBuffer[mainIndex[xMainIndex]];
			}
				break;
			case 0xD: {//将A-Buffer中的数据根据指定的字符编码一次性输出。
				console.log(`${name}: `, Buffer.from(ABuffer).toString(codFormat));
			}
				break;
		}
		i++;
	}
	
	return mainBuffer;
	
	function runBode(buffer: Buffer): number[] {
		let first: number = 0xE;
		let next: number = 0xE;
		let result: number[] = [];
		for (let i = 0; i < buffer.length; i++) {
			first = (buffer[i] & 0xF0) >> 4;
			next = buffer[i] & 0xF;
			result.push(first);
			result.push(next);
		}
		return result;
	}
};