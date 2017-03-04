const CustomerService = require("./index");

var customerService = new CustomerService('myTest');

var sw = customerService.getSplitWord();
var ie = customerService.getImportExport();
var qa = customerService.getQuestionAnswer();

// ie.printData({start:'word',limit:10});
// sw.collisionWord(sw.sentenceToList('你是屌丝吗'))
// .then((res)=>{
// 	console.log(res);
// });

// ie.printData({start:'',limit:30});
// ie.readWordToLevel('word1.log','word');

// ie.readWordToLevel('qa1.log','qa');


qa.getAnswer('你是屌丝吗')
.catch((err)=>{
	console.log(err);
});