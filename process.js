// =====================================================================
// =====================================================================
// Process Control Block

var pc = 0;
var foo_len = 0;
var loops = [];
var state = "ready"; // ready, running, waiting, stopped
var response = null;

var foo_code = null;
var threadvars =
{
	stdIn : null,
	stdOut : null,
	temp : null,
};

// =====================================================================
// Capture messages passed from main thread.

function onMessage (event)
{
	response = event.data;
	console.log ("response = " + JSON.stringify (response));

	var cmd = foo_code [pc];
	
	switch (cmd [0])
	{
		case "create" :  
		case "open" :  
		{ 
			threadvars [cmd[3]] = response.fp; 
			state = "ready";
			pc++; 
		} break;
		
		case "close" : 
		{ 
			threadvars [cmd[1]] = response.fp; 
			state = "ready";
			pc++; 
		} break;
		
		case "read" : 
		{ 
			threadvars [cmd[3]] = response.data; 
			state = "ready";
			pc++; 
		} break;
		
		case "write" : 
		{ 
			threadvars [cmd[3]] = response.len; 
			state = "ready";
			pc++; 
		} break;
		
		case "EOF" : 
		{ 
			threadvars [cmd[2]] = response.EOF;
			state = "ready"; 
			pc++; 
		} break;
	}	
}

// =====================================================================
// Run the Process

function run (foo, stdIn, stdOut)
{
	this.addEventListener('message', onMessage, false);

	foo_code = foo;
	foo_len = foo.length;
	console.log ("process len = " + foo_len);
	
	threadvars ["stdIn"] = stdIn;
	threadvars ["stdOut"] = stdOut;
	runTime();
}

function runTime ()
{
	if (pc == foo_len)
		state = "stopped";
		
	switch (state)
	{
		case "loaded" : { state = "running"; } break; 
		case "ready" : { state = "running"; } break;
		case "waiting" : { setTimeout("runTime ()", 500); return; } break; 
		case "running" : { } break; 
		case "stopped" : { return; } break; 
	}
	
	var cmd = foo_code [pc];
	console.log (pc + ": cmd = " + JSON.stringify (cmd));
	
	switch (cmd [0])
	{
		case "create" :  { os.file.create (threadvars [cmd[1]], cmd[2]); state="waiting"; } break;
		case "open" :  { os.file.open (threadvars [cmd[1]], cmd[2]); state="waiting"; } break;
		case "close" : { os.file.close (threadvars [cmd[1]]); state="waiting"; } break;
		case "read" : { os.file.read (threadvars [cmd[1]], cmd[2]); state="waiting"; } break;
		case "write" : { os.file.write (threadvars [cmd[1]], threadvars [cmd[2]]); state="waiting"; } break;
		case "EOF" : { os.file.EOF (threadvars [cmd[1]]); state="waiting"; } break;

		case "set" : { threadvars [cmd[1]] = cmd[2]; pc++; } break;
		case "do" : { loops.push (pc); pc++; } break;
		case "while" : 
		{ 
			if (threadvars [cmd[1]])
			{
				pc = loops.pop(); 
				loops.push (pc);
			}
			else
			{
				loops.pop ();
				pc++;
			}
		} break;
		case "not" : { threadvars [cmd[2]] = ! threadvars [cmd[1]]; pc++; } break;
		case "add" : 
		{ 
			threadvars [cmd[3]] = threadvars [cmd[1]] + threadvars [cmd[2]]; 
			pc++;
		} break;

		default :
		{
			console.log ("unknow command " + JSON.stringify (cmd) + " on line " + pc);
			return;
		}
	}
	
    setTimeout("runTime ()", 500);
}
