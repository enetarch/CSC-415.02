function osMessageHandler (event)
{
	os.msg = event.data;
	console.log ("task = " + JSON.stringify (os.msg));
}

// this.addEventListener('message', osMessageHandler, false);
// this is a test

var os =
{
	TASKS : 
	{
		createfile : "create",
		deletefile : "delete",
		openfile : "open", 
		closefile : "close", 
		readfile : "read", 
		writefile : "write", 
		filelen : "len", 
		filepos : "pos", 
		seekpos : "seek", 
		isEOF : "isEOF", 
	},
	
	msg : null,
	
	file : 
	{
		create : function (name, mode) 
		{
			var task = 
			{ 
				task : os.TASKS.createfile, 
				name : name,
				mode : mode,
			};
			postMessage(task);		
		}, 

		open : function (name, mode) 
		{
			var task = 
			{ 
				task : os.TASKS.openfile, 
				name : name,
				mode : mode,
			};
			postMessage(task);
		}, 

		close : function (fp) 
		{
			var task = 
			{ 
				task : os.TASKS.closefile, 
				fp : fp,
			};
			postMessage(task);
		}, 
		
		read : function (fp, nLen) 
		{
			var task = 
			{ 
				task : os.TASKS.readfile, 
				fp : fp,
				len : nLen,
			};
			postMessage(task);
		}, 
		
		write : function (fp, data) 
		{
			var task = 
			{ 
				task : os.TASKS.writefile, 
				fp : fp,
				data : data,
			};
			postMessage(task);
		}, 
		
		len : function (fp) 
		{
			var task = 
			{ 
				task : os.TASKS.openfile, 
				fp : fp,  
			};
			postMessage(task);
		}, 
		
		pos : function (fp) 
		{
			var task = 
			{ 
				task : os.TASKS.openfile, 
				fp : fp,  
			};
			postMessage(task);
		}, 
		
		seek : function (fp, nPos) 
		{
			var task = 
			{ 
				task : os.TASKS.seekpos, 
				fp : fp,
				pos : nPos,
			};
			postMessage(task);
		}, 
		
		delete : function (name) 
		{
			var task = 
			{ 
				task : os.TASKS.deletefile, 
				name : name,
			};
			postMessage(task);
		}, 
		
		EOF : function (fp)
		{
			var task = 
			{ 
				task : os.TASKS.isEOF, 
				fp : fp,
			};
			postMessage(task);
		}, 
	},
};
