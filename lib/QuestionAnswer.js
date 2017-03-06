var Common = require("./Common");
class QuestionAnswer
{

	constructor(db,splitWord)
	{
		this.db = db;
		this.splitWord = splitWord;
	}

	async getQuestionList(questionQuery)
	{
		var wordList = await this.splitWord.collisionWord(this.splitWord.sentenceToList(questionQuery));
		//命中相等时：命中匹配长度最接近长度
		var questionObject = {totalLength:wordList.length,questionNum:0,answerNum:0,questionList:{}};
		var questionList = questionObject.questionList;
		for (let i = 0; i < wordList.length; i++) {
			var word = await wordList[i];
			for (let questionIndex in word.questionList) {
				//初始化问题属性
				if (!questionList.hasOwnProperty(questionIndex))
				{
					questionObject.questionNum++;
					var questionObj = await Common.getDataFromLevel(this.db,'question:'+questionIndex);
					for (let answerIndex in questionObj.answerList) {
						questionObject.answerNum++;
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
		return questionObject;
	}

	getQuestionWeight(question)
	{
		return question.hitWordNum * question.hitSortNum;
	}

	getAnswerWeight(answer)
	{
		return answer.confirmNum;
	}

	async getAnswer(questionQuery)
	{
		var questionObject = await this.getQuestionList(questionQuery);
		var beQuestion = null;
		var beQuestionWeight = 0;
		var beAnwer = null;
		var beAnwerWeight = 0;
		var questionList = questionObject.questionList;
		//获取最相似问句
		for (var questionIndex in questionList) {
			var questionWeight = this.getQuestionWeight(questionList[questionIndex]);
			if(questionWeight>beQuestionWeight)
			{
				beQuestionWeight = questionWeight;
				beQuestion = questionList[questionIndex];
			}
		};
		var answerList = beQuestion.answerList;
		//获取最相似回答
		for (var answerIndex in answerList) {
			var answerWeight = this.getAnswerWeight(answerList[answerIndex]);
			if(answerWeight>beAnwerWeight)
			{
				beAnwerWeight = answerWeight;
				beAnwer = answerList[answerIndex];
			}
		};
		return {beQuestion:beQuestion,beAnwer:beAnwer}
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