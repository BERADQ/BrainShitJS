
module.exports = () => {
	const readLine = require('readline');
	const compileB = require('./compileB');
	const fs = require('fs');
	const pathUtil = require('path');
	const runB = require('./runB');
	
	let rl = readLine.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	console.clear();
	console.info('Enter q to quit');
	rl.setPrompt('BrainShit >');
	rl.prompt(true);
	rl.on('line', (line: string) => {
		let tempCom = line.split(' ');
		let com: string = (tempCom ? tempCom : [line])[0];
		if (line === 'q') {
			rl.close();
			return;
		}
		if (com === 'c') {
			let path = line.match(/".+"|'.+'/gm)[0].replace(/["']/g, '');
			let codeStrBuffer: Buffer = fs.readFileSync(path);
			let isCompile = compileB(codeStrBuffer.toString(), pathUtil.dirname(path), pathUtil.basename(path, '.bs'));
			if (isCompile) console.log('Compiled successfully');
		}
		if (com === 'run') {
			let path = line.match(/".+"|'.+'/gm)[0].replace(/["']/g, '');
			let bnsStrBuffer: Buffer = fs.readFileSync(path);
			let lostBuffer:Buffer = runB(bnsStrBuffer,pathUtil.basename(path, '.bns'),rl)
			console.log('执行结束，返回值:',lostBuffer)
		}
		rl.setPrompt('BrainShit >');
		rl.prompt(true);
	});
	
};

