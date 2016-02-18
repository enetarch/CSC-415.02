/* Built using the example from:
 * http://www.w3schools.com/html/html5_webworkers.asp
 * https://msdn.microsoft.com/en-us/hh549259.aspx
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
 * 
 * Search Terms: JS Worker Thread Message Send Recieve
 */
 

var w = null;

function onMessage_P1 (event)
{
	var task = event.data;
	task.pid = 1;
	
//	console.log ("device = " + JSON.stringify (task));	
	
	d.postMessage (task);
}

function onMessage_Dev (event)
{
	var task = event.data;
	
//	console.log ("device = " + JSON.stringify (task));	
	
	w.postMessage (task);
}

function startWorker() 
{
    if (w) return;
    
    w = new Worker("myProcess.js"); // will only load from a web server
	w.onmessage = onMessage_P1;
	
	d = new Worker ("device.js");
	d.onmessage = onMessage_Dev;
}

function stopWorker() 
{ 
    if (!w) return;
    w.terminate();
    w = undefined;
    
    d.terminate();
    d = undefined;
}

