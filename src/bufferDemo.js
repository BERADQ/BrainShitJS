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
    rl.on('line', (line) => {
        let tempCom = line.split(' ');
        let com = (tempCom ? tempCom : [line])[0];
        if (line === 'q') {
            rl.close();
            return;
        }
        if (com === 'c') {
            let path = line.match(/".+"|'.+'/gm)[0].replace(/["']/g, '');
            let codeStrBuffer = fs.readFileSync(path);
            let isCompile = compileB(codeStrBuffer.toString(), pathUtil.dirname(path), pathUtil.basename(path, '.bs'));
            if (isCompile)
                console.log('Compiled successfully');
        }
        if (com === 'run') {
            let path = line.match(/".+"|'.+'/gm)[0].replace(/["']/g, '');
            let bnsStrBuffer = fs.readFileSync(path);
            let lostBuffer = runB(bnsStrBuffer, pathUtil.basename(path, '.bns'), rl);
            console.log('执行结束，返回值:', lostBuffer);
        }
        rl.setPrompt('BrainShit >');
        rl.prompt(true);
    });
};
