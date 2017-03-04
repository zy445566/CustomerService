var Common = require("./Common");
class SplitWord
{
	constructor(db)
	{
		this.db = db;
	}

	sentenceToList(sentence,minContinue =2, maxContinue=13)
	{
		var singleWordList = {};
		var unsignedSentence = this.sentenceToUnsigned(sentence);
		var usl = unsignedSentence.length;
		var tempStr = '';
		var continueNum = 0;
		for (var i = 0; i < usl; i++) {
			for (var j = 0; j < usl-i; j++) {
				// tempStr+=unsignedSentence[j];
				tempStr = ''
				continueNum = 0;
				for (var k = i; k < usl-j; k++) {
					if (continueNum>=maxContinue)
					{
						break;
					}
					tempStr+=unsignedSentence[k];
					continueNum++;
				}
				if (continueNum < minContinue)
				{
					continue;
				}
				var md5Str = Common.md5Hex(tempStr);
				singleWordList[md5Str] = tempStr;
			}
		};
		return singleWordList;
	}


	async collisionWord(singleWordList)
	{
		var hitWordList = [];
		for (var md5Str in singleWordList) {
			var key = 'word:'+md5Str;
			// console.log(key,'=',singleWordList[md5Str]);
			try{
				var hitWord = await Common.getDataFromLevel(this.db,key);
				hitWordList.push(hitWord);
			}
			catch(err){

			}
		};
		// console.log(hitWordList);
		return hitWordList;
	}

	sentenceToUnsigned(sentence)
	{
		return sentence.replace(/[^A-Za-z0-9_\u4E00-\u9FA5\uF900-\uFA2D]+/g,'');
	}


	

}

module.exports = SplitWord;
