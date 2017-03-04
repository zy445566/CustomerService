var crypto = require('crypto');
class Common
{
	static md5Hex(str)
	{
		var md5 = crypto.createHash('md5');
		var md5Str = md5.update(str).digest('hex');
		return md5Str;
	}

	static getDataFromLevel(db,key)
	{
		return new Promise((reslove,reject)=>{
			db.get(key, {valueEncoding:'json'}, (err, value)=> {
				if(err)reject(key);
				reslove(value);
			});
		});
		
	}
}

module.exports = Common;