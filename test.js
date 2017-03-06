const CustomerService = require("./index");

var customerService = new CustomerService('mylang',1,13);

var sw = customerService.getSplitWord();
var ie = customerService.getImportExport();
var qa = customerService.getQuestionAnswer();

// ie.printData({start:'word',limit:10});
// sw.collisionWord(sw.sentenceToList('我在洗澡，你在干嘛'))
// .then((res)=>{
// 	console.log(res);
// });


// ie.printData({start:'',limit:30});
// ie.readWordToLevel('word.log','word');

ie.readWordToLevel('qa.log','qa')
.then((res)=>{
	console.log(res);
})
.catch((err)=>{
	console.log(err);
});


// qa.getAnswer('你是屌丝吗')
// .then((res)=>{
// 	console.log(res);
// })
// .catch((err)=>{
// 	console.log(err);
// });