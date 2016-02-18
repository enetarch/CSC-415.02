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
		createfile : 1,
		deletefile : 2,
		openfile : 3, 
		closefile : 4,
		readfile : 5,
		writefile : 6,
		filelen : 7,
		filepos : 8,
		seekpos : 9
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
			return (os.msg.fp);
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
			return (os.msg.fp);
		}, 

		close : function (fp) 
		{
			var task = 
			{ 
				task : os.TASKS.closefile, 
				fp : fp,
			};
			postMessage(task);
			return (os.msg.fp);
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
			return (os.msg.len);
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
			return (os.msg.len);
		}, 
		
		len : function (fp) 
		{
			var task = 
			{ 
				task : os.TASKS.openfile, 
				fp : fp,  
			};
			postMessage(task);
			return (os.msg.len);
		}, 
		
		pos : function (fp) 
		{
			var task = 
			{ 
				task : os.TASKS.openfile, 
				fp : fp,  
			};
			postMessage(task);
			return (os.msg.pos);
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
			return (os.msg.pos);
		}, 
		
		delete : function (name) 
		{
			var task = 
			{ 
				task : os.TASKS.deletefile, 
				name : name,
			};
			postMessage(task);
			return (os.msg.succeded);
		}, 
		
		EOF : function (fp)
		{
			var l = os.len (fp);
			var p = os.pos (fp);
			return (p < l);
		}, 
	},
};
