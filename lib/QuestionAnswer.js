var Common = require("./Common");
class QuestionAnswer
{

	constructor(db,splitWord)
	{
		this.db = db;
		this.splitWord = splitWord;
	}

	async getAnswer(question)
	{
		var wordList = await this.splitWord.collisionWord(this.splitWord.sentenceToList(question));
		//命中相等时：命中匹配长度最接近长度
		var questionList = {totalLength:wordList.length};
		for (let i = 0; i < wordList.length; i++) {
			var word = await wordList[i];
			for (let questionIndex in word.questionList) {
				//初始化问题属性
				if (!questionList.hasOwnProperty(questionIndex))
				{
					var questionObj =await Common.getDataFromLevel(this.db,'question:'+questionIndex);
					for (let answerIndex in questionObj.answerList) {
						var answerObj = await Common.getDataFromLevel(this.db,'answer:'+answerIndex);
						questionObj.answerList[answerIndex].answer=answerObj.answer;
					};
					questionList[questionIndex]={
						hitWordNum:0,
						hitSortNum:0,
						SortList:[],
						answerList:questionObj.answerList,
						question:questionObj.question
					};
				}
				//获取词库命中数量
				questionList[questionIndex].hitWordNum++;
				//获取顺序命中率(相似度)
				questionList[questionIndex].SortList.push(word.questionList[questionIndex].sort);
				questionList[questionIndex].hitSortNum = this.gethitSortNum(questionList[questionIndex].SortList);
			};
		};
		console.log(questionList);
		console.log('');
		console.log(questionList['e01c99bf9054e3a994f6381e7b4bdb7c'].answerList);
		return questionList;
	}

	gethitSortNum(originSortList)
	{
		originSortList.length
		var hitSortNum = 0;
		for (let i = 0; i < originSortList.length; i++) {
			for (let j = i+1; j < originSortList.length; j++) {
				if(originSortList[i]<originSortList[j])
				{
					hitSortNum++;
				}
			};
		};
		return hitSortNum;
	}
}

module.exports = QuestionAnswer;