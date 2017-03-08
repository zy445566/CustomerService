# CustomerService
Question & Answer'Ai
* <a href="#chinese">中文文档</a>
* <a href="#english">english</a>
* <a href="#api">API</a>

<a name="chinese"></a>
中文文档
-------------------------
  * <a href="#intro-zh">介绍</a>
  * <a href="#req-zh">要求</a>
  * <a href="#install-zh">安装</a>
  * <a href="#use-zh">使用</a>


<a name="intro-zh"></a>
### 介绍
-------------------------
CustomerService是一个可以从句子里面拆出词汇,并且可以实现问题和回答的相似度匹配的AI系统.
理论上只要词库(中文已有部分)和问答库(未导入)足够的大,就可以实现非常完美的问答.Power By NodeJs.

<a name="req-zh"></a>
### 要求
-------------------------
由于使用了async和await,所以nodejs版本要在7.7.1以上.或使用babel.

<a name="install-zh"></a>
### 安装
-------------------------
```sh
npm install customer-service
```

<a name="use-zh"></a>
### 使用
-------------------------
#### 初始化工具
```node
const CustomerService = require("customer-service");
var customerService = new CustomerService('mylang',2,13);
var sw = customerService.getSplitWord();
var ie = customerService.getImportExport();
var qa = customerService.getQuestionAnswer();
```

#### 拆词
```node
sw.collisionWord(sw.sentenceToList('我在洗澡，你在干嘛'))
.then((res)=>{
console.log(res);
/* will print
[ { key: 'word:b7669c4218782c0035b6383623e19b29',
    word: '我在',
    questionList: {} },
  { key: 'word:5ac500cfcc1fe66f7243cad4039281d1',
    word: '洗澡',
    questionList: {} },
  { key: 'word:9d63b7094c5a502e66fccc79e5fe1f69',
    word: '你在',
    questionList: {} },
  { key: 'word:c44a42f209fa03606e607994c2321ebd',
    word: '干嘛',
    questionList: {} } ]
*/
});


```
#### 库的导入和打印
```
//导入词库字符串
var chunk = "你好\r\n智能";
ie.stringToLevel(chunk,'word')
.then((res)=>{
	console.log(res);
})
.catch((err)=>{
	console.log(err);
});

//导入问答字符串
var chunk = "你在洗澡吗？===>>>然而并没有.\r\n你是屌丝吗？===>>>不是屌丝写什么代码.";
ie.stringToLevel(chunk,'word')
.then((res)=>{
	console.log(res);
})
.catch((err)=>{
	console.log(err);
});

//导入问答字符串

const path = require('path');
//导入词库
ie.readWordToLevel(path.join(__dirname,'word.log'),'word')
.then((res)=>{
	console.log(res);
})
.catch((err)=>{
	console.log(err);
});
//导入问答
ie.readWordToLevel(path.join(__dirname,'qa.log'),'qa')
.then((res)=>{
	console.log(res);
})
.catch((err)=>{
	console.log(err);
});
//print data
ie.printData({start:'word',limit:10});
```
#### 获取回答
```node
//获取最佳回答
qa.getAnswer('你是屌丝吗')
.then((res)=>{
	console.log(res);
})
.catch((err)=>{
	console.log(err);
});
```


<a name="english"></a>
Document
-------------------------
  * <a href="#intro-en">intro</a>
  * <a href="#req-en">req</a>
  * <a href="#install-en">install</a>
  * <a href="#use-en">use</a>


<a name="intro-en"></a>
### intro
-------------------------
CustomerService is a down words from a sentence, and can realize question and answer the similarity matching of AI system.
Theoretically as long as the word library (Chinese existing part) and q&a library (import) not enough big, can achieve very perfect answers. The Power By NodeJs.


<a name="req-en"></a>
### req
-------------------------
nodejs'version>7.7.1 or use babel.

<a name="install-en"></a>
### install
-------------------------
```sh
npm install customer-service
```

<a name="use-en"></a>
### use
-------------------------
#### init
```node
const CustomerService = require("customer-service");
var customerService = new CustomerService('mylang',2,13);
var sw = customerService.getSplitWord();
var ie = customerService.getImportExport();
var qa = customerService.getQuestionAnswer();
```

#### split word
```node
sw.collisionWord(sw.sentenceToList('我在洗澡，你在干嘛'))
.then((res)=>{
console.log(res);
/* will print
[ { key: 'word:b7669c4218782c0035b6383623e19b29',
    word: '我在',
    questionList: {} },
  { key: 'word:5ac500cfcc1fe66f7243cad4039281d1',
    word: '洗澡',
    questionList: {} },
  { key: 'word:9d63b7094c5a502e66fccc79e5fe1f69',
    word: '你在',
    questionList: {} },
  { key: 'word:c44a42f209fa03606e607994c2321ebd',
    word: '干嘛',
    questionList: {} } ]
*/
});


```
#### lib import or print
```
//import word by string
var chunk = "你好\r\n智能";
ie.stringToLevel(chunk,'word')
.then((res)=>{
	console.log(res);
})
.catch((err)=>{
	console.log(err);
});

//import q&a by string
var chunk = "你在洗澡吗？===>>>然而并没有.\r\n你是屌丝吗？===>>>不是屌丝写什么代码.";
ie.stringToLevel(chunk,'word')
.then((res)=>{
	console.log(res);
})
.catch((err)=>{
	console.log(err);
});

//import word by file

const path = require('path');
//导入词库
ie.readWordToLevel(path.join(__dirname,'word.log'),'word')
.then((res)=>{
	console.log(res);
})
.catch((err)=>{
	console.log(err);
});

//import q&a by string

ie.readWordToLevel(path.join(__dirname,'qa.log'),'qa')
.then((res)=>{
	console.log(res);
})
.catch((err)=>{
	console.log(err);
});

//print data
ie.printData({start:'word',limit:10});
```


#### get answer
```node
//get best answer
qa.getAnswer('你是屌丝吗')
.then((res)=>{
	console.log(res);
})
.catch((err)=>{
	console.log(err);
});
```

<a name="api"></a>
API
-------------------------
  * <a href="#customer-service">CustomerService</a>
  * <a href="#split-word">SplitWord</a>
  * <a href="#import-export">ImportExport</a>
  * <a href="#question-answer">QuestionAnswer</a>

  <a name="customer-service"></a>
  ### CustomerService
  -------------------------

  >FunctionName  constructor
  >>* Return  void
  >>* Description  构造函数
  >>* Param

  name        | type |require |default    |Description
  ------------|------|--------|-----------|------------
  namespace   |string|option  |'mylang'   |选择的命名空间
  minContinue |number|option  |1          |拆词的最小长度
  maxContinue |number|option  |13         |拆词的最大长度

  -------------------------

  >FunctionName  getSplitWord
  >>* Return  <SplitWord>splitWord
  >>* Description  获取分词工具
  >>* Param empty

  -------------------------

  >FunctionName  getImportExport
  >>* Return  <ImportExport>importExport
  >>* Description  获取导入导出工具
  >>* Param empty
  -------------------------

  >FunctionName  getQuestionAnswer
  >>* Return  <QuestionAnswer>questionAnswer
  >>* Description  获取提问回答工具
  >>* Param empty

  <a name="split-word"></a>
  ### SplitWord
  -------------------------
  >FunctionName  sentenceToList
  >>* Return  <Object>singleWordList
  >>* Description  将句子拆成所有可能的词汇
  >>* Param

  name        | type |require |default    |Description
  ------------|------|--------|-----------|------------
  sentence   |string|must  |empty   |要拆的句子
  -------------------------
  >FunctionName  collisionWord
  >>* Return  <Array>hitWordList
  >>* Description  将句子所有可能的词汇去碰撞词库得到正确的词汇
  >>* Param

  name        | type |require |default    |Description
  ------------|------|--------|-----------|------------
  singleWordList   |Object|must  |empty   |句子所有可能的词汇
  -------------------------
  >FunctionName  sentenceToUnsigned
  >>* Return  <String>sentence
  >>* Description  将句子去除所有符号
  >>* Param

  name        | type |require |default    |Description
  ------------|------|--------|-----------|------------
  sentence   |string|must  |empty   |要去除符号的句子

  <a name="import-export"></a>
  ### ImportExport
  -------------------------
  >FunctionName  getData
  >>* Return  <Promise>tmpData
  >>* Description  获取当前数据库数据
  >>* attend 这个方法可能回导致内存溢出,请务必传option
  >>* Param

  name        | type |require |default    |Description
  ------------|------|--------|-----------|------------
  option   |Object|option  |{}   |筛选选项


  Additionally, you can supply an options object as the first parameter to `createReadStream()` with the following options:

  * `'gt'` (greater than), `'gte'` (greater than or equal) define the lower bound of the range to be streamed. Only records where the key is greater than (or equal to) this option will be included in the range. When `reverse=true` the order will be reversed, but the records streamed will be the same.

  * `'lt'` (less than), `'lte'` (less than or equal) define the higher bound of the range to be streamed. Only key/value pairs where the key is less than (or equal to) this option will be included in the range. When `reverse=true` the order will be reversed, but the records streamed will be the same.
    
  * `'start', 'end'` legacy ranges - instead use `'gte', 'lte'`

  * `'reverse'` *(boolean, default: `false`)*: a boolean, set true and the stream output will be reversed. Beware that due to the way LevelDB works, a reverse seek will be slower than a forward seek.

  * `'keys'` *(boolean, default: `true`)*: whether the `'data'` event should contain keys. If set to `true` and `'values'` set to `false` then `'data'` events will simply be keys, rather than objects with a `'key'` property. Used internally by the `createKeyStream()` method.

  * `'values'` *(boolean, default: `true`)*: whether the `'data'` event should contain values. If set to `true` and `'keys'` set to `false` then `'data'` events will simply be values, rather than objects with a `'value'` property. Used internally by the `createValueStream()` method.

  * `'limit'` *(number, default: `-1`)*: limit the number of results collected by this stream. This number represents a *maximum* number of results and may not be reached if you get to the end of the data first. A value of `-1` means there is no limit. When `reverse=true` the highest keys will be returned instead of the lowest keys.

  * `'fillCache'` *(boolean, default: `false`)*: whether LevelDB's LRU-cache should be filled with data read.

  * `'keyEncoding'` / `'valueEncoding'` *(string)*: the encoding applied to each read piece of data.
  
  -------------------------
  >FunctionName  readWordToLevel
  >>* Return  <Promise>true
  >>* Description  将文件读入数据库
  >>* Param

  name        | type |require |default    |Description
  ------------|------|--------|-----------|------------
  libPath   |string|option  |empty   |文件地址
  type   |string|option  |'word'   |词使用'word',提问回答使用'qa'

  -------------------------
  >FunctionName  stringToLevel
  >>* Return  <Promise>true
  >>* Description  将字符串导入数据库
  >>* Param

  name        | type |require |default    |Description
  ------------|------|--------|-----------|------------
  chunk   |string|must  |empty   |要导入的字符串
  type    |string|option  |'word'   |词使用'word',提问回答使用'qa'

  <a name="question-answer"></a>
  ### QuestionAnswer
  -------------------------
  >FunctionName  getQuestionList
  >>* Return  <Promise>questionObject
  >>* Description  通过问句获取所有被碰撞中的问题和回答
  >>* Param

  name        | type |require |default    |Description
  ------------|------|--------|-----------|------------
  questionQuery   |string|must  |empty   |提问的语句

  -------------------------
  >FunctionName  getAnswer
  >>* Return  <Promise>beQuestion
  >>* Description  通过问句获取最大可能的问题和回答
  >>* Param

  name        | type |require |default    |Description
  ------------|------|--------|-----------|------------
  questionQuery   |string|must  |empty   |提问的语句

