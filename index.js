const path = require("path");
const level = require("level");
const SplitWord = require("./lib/SplitWord");
const ImportExport = require("./lib/ImportExport");
const QuestionAnswer = require("./lib/QuestionAnswer");
class CustomerService
{
	constructor(namespace='mylang',minContinue=1, maxContinue=13)
	{
		this.namespace = namespace;
		this.dbPath = path.join(__dirname,'data',namespace);
		this.db = level(this.dbPath);
		this.splitWord = new SplitWord(this.db,minContinue,maxContinue);
		this.importExport = new ImportExport(this.db,this.splitWord);
		this.questionAnswer = new QuestionAnswer(this.db,this.splitWord);
	}

	getSplitWord()
	{
		return this.splitWord;
	}

	getImportExport()
	{
		return this.importExport;
	}

	getQuestionAnswer()
	{
		return this.questionAnswer;
	}
}

module.exports = CustomerService;