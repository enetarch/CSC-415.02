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
};

var files =
{
	"data.csv" : "20, 89, 73, 24, 56 ,48 ,12 ,34 ,95, 25",
};

var openFiles = 
[
	{ pid : 0, file: "null", mode: "wo", pos : 0, len : 0, },
];

var cMAXREADLEN = 10;

function onMessage (event)
{
	var task = event.data;
	
	console.log ("device = " + JSON.stringify (task));	
	console.log ("files = " + JSON.stringify (files));
	console.log ("openFiles = " + JSON.stringify (openFiles));

	switch (task.task)
	{
		case os.TASKS.createfile : 
		{ 
			files [task.name] = "";
			openFiles.push 
			({
				pid : task.pid,
				file : task.name,
				mode : task.mode,
				pos : 0,
				len : 0
			});
			
			task.fp = openFiles.length -1; 
			postMessage (task); 
		} break;
		
		case os.TASKS.deletefile : 
		{ 
			delete files [task.name];
			postMessage (task); 
		} break;
		
		case os.TASKS.openfile : 
		{ 
			openFiles.push 
			({
				pid : task.pid,
				file : task.name,
				mode : task.mode,
				pos : 0,
				len : files[task.name].length
			});
			
			task.fp = openFiles.length -1; 
			postMessage (task); 
		} break;
		
		case os.TASKS.closefile : 
		{ 
			delete openFiles [task.fp];
			task.fp = 0; 
			postMessage (task); 
		} break;
		
		case os.TASKS.readfile : 
		{ 
			opnFl = openFiles [task.fp];
			console.log ("opnFl [" + task.fp + "] = " + JSON.stringify (opnFl));
			// check mode .. make sure READ is enabled
			pos = opnFl.pos;
			
			data = files[opnFl.file].substr (pos, cMAXREADLEN);
			opnFl.pos += data.length;
			
			task.data = data; 
			task.len = data.length; 
			task.pos = opnFl.pos;
			
			postMessage (task); 
		} break;
		
		case os.TASKS.writefile : 
		{ 
			opnFl = openFiles [task.fp];
			console.log ("opnFl [" + task.fp + "] = " + JSON.stringify (opnFl));
			
			// in the future when writing to a file, this will need to
			// splice the data into the right area of the file for 
			// random position writing.
			
			files [opnFl.file] += task.data;
			
			opnFl.len = files [opnFl.file].length;
			opnFl.pos = files [opnFl.file].length;
			
			task.len = task.data.length;
			task.pos = opnFl.pos;
			
			postMessage (task); 
		} break;
		
		case os.TASKS.filelen : 
		{ 
			opnFl = openFiles [task.fp];
			console.log ("opnFl [" + task.fp + "] = " + JSON.stringify (opnFl));
			task.len = opnFl.len; 
			postMessage (task); 
		} break;
		
		case os.TASKS.filepos : 
		{ 
			opnFl = openFiles [task.fp];
			console.log ("opnFl [" + task.fp + "] = " + JSON.stringify (opnFl));
			task.pos = opnFl.pos; 
			postMessage (task); 
		} break;
		
		case os.TASKS.seekpos : 
		{ 
			opnFl = openFiles [task.fp];
			console.log ("opnFl [" + task.fp + "] = " + JSON.stringify (opnFl));
			// what should happen when task.pos is > opnFl.len?
			opnFl.pos = task.pos; 
			postMessage (task); 
		} break;
		
		case os.TASKS.isEOF : 
		{ 
			opnFl = openFiles [task.fp];
			console.log ("opnFl [" + task.fp + "] = " + JSON.stringify (opnFl));
			
			task.EOF = (opnFl.len == opnFl.pos); 
			postMessage (task); 
		} break;
	}
}

this.addEventListener('message', onMessage, false);


// Note: the task pid and file pid are not being checked, atm.  If they
// don't match, what should happen?
