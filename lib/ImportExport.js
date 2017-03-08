var Common = require("./Common");
var fs = require("fs");

class ImportExport
{
	constructor(db,splitWord)
	{
		this.db = db;
		this.splitWord = splitWord;
		this.toLevelData = [];
	}

	getData(options = {})
	{
		var tmpData = {};
		return new Promise((resolve,reject)=>{
			this.db.createReadStream(options)
			  .on('data', function (data) {
			  	tmpData[data.key] = data.value;
			    // console.log(data.key, '===>>>', data.value)
			  })
			  .on('error', function (err) {
			  	reject(err);
			    // console.log('Oh my!', err)
			  })
			  // .on('close', function () {
			  // 	// resolve(data);
			  //   // console.log('Stream closed')
			  // })
			  .on('end', function () {
			  	resolve(tmpData);
			    // console.log('Stream ended')
			  });
		});
	}


	readWordToLevel(libPath,type = 'word')
	{
		return new Promise((resolve,reject)=>{
			var readerStream = fs.createReadStream(libPath);
			readerStream.setEncoding('UTF8');
			readerStream.on('data', async (chunk) => {
				await this.stringToLevel(chunk,type);
			});
			readerStream.on('end',function(){
			   resolve(true);
			});
			readerStream.on('error', function(err){
				if(err) reject(err);
			});
		});

	}

	async stringToLevel(chunk,type)
	{
		var wordList = chunk.split(/\s+/);
		this.toLevelData = [];
	   	for (var i = 0; i < wordList.length; i++) {
			await this.chooseType(wordList[i],type);
	   	};
	   	this.db.batch(this.toLevelData, (err) => {
	   		if(err) throw err;
	   		// console.log('###sucess###');
	   	});
	   	return true;
	}

	async chooseType(row,type)
	{
		switch(type)
		{
			case 'word':
				this.wordToLevel(row);
				break;
			case 'qa':
				await this.qaToLevel(row);
				break;
			default:
				break;
		}
	}

	wordToLevel(row)
	{
		var md5Str = Common.md5Hex(row);
		var word = {
			'key':'word:'+md5Str,
			'word':row,
			'questionList':{}
		};
		// console.log(word);process.exit();
		this.toLevelData.push({ 'type': 'put', 'key': word.key, 'value': word, 'valueEncoding':'json'});
	}



	async qaToLevel(row)
	{
		var qa = row.split('===>>>');
		var question  = qa[0];
		var answer  = qa[1];
		var md5QuestionStr = Common.md5Hex(question);
		var md5AnswerStr = Common.md5Hex(answer);
		var wordList = await this.splitWord.collisionWord(this.splitWord.sentenceToList(question));

		for (let i = 0; i < wordList.length; i++) {
			var word = wordList[i];
			word.questionList[md5QuestionStr] = {sort:i};
			this.toLevelData.push({ 'type': 'put', 'key': word.key, 'value': word, 'valueEncoding':'json'});
		};
		var questionKey = 'question:'+md5QuestionStr;
		try{
			var questionObj = await Common.getDataFromLevel(this.db,questionKey);
		}catch(err)
		{
			var questionObj = {
				'key':questionKey,
				'question':question,
				'answerList':{},
			}
			questionObj.answerList[md5AnswerStr] = {confirmNum:0};
		}
		questionObj.answerList[md5AnswerStr].confirmNum++;
		var answerKey = 'answer:'+md5AnswerStr;
		var answerObj = {
			key:answerKey,
			answer:answer
		}
		// console.log(questionObj);console.log(answerObj);process.exit();
		this.toLevelData.push({ 'type': 'put', 'key': questionObj.key, 'value': questionObj, 'valueEncoding':'json'});
		this.toLevelData.push({ 'type': 'put', 'key': answerObj.key, 'value': answerObj, 'valueEncoding':'json'});
	}
}

module.exports = ImportExport;
