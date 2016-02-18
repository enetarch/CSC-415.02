/* Built using the example from:
 * http://www.w3schools.com/html/html5_webworkers.asp
 * https://msdn.microsoft.com/en-us/hh549259.aspx
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
 */

importScripts ("os1.js");
importScripts ("process.js");

// =====================================================================
// =====================================================================
// Individual Assignment
 
var szFName_In = "data.csv";
var szFName_Out = "average.csv";

var myProcess = 
[
	["open", "stdIn", "r", "fp"],
	
	["set", "data", ""],
	
	["do"],
		
		["read", "fp", -1, "buffer"],
		["add", "data", "buffer", "data"],
		["EOF", "fp", "temp"],
		["not", "temp", "temp"],

	["while", "temp", ""],
		
	["close", "fp" ],
	
	// Process Data

	["create", "stdOut", "wo+", "fp2"],
	
	["write", "fp2", "data"],
	
	["close", "fp2"]
];

run (myProcess, szFName_In, szFName_Out);

