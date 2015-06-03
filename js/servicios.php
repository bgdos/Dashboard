

//variables
var urlServer = 'http://localhost:8080/production_dashboard/';
var urlSchedules = 'servicios/getschedule.php';
var urlProductionStatus = 'servicios/getproductionstatus.php';
var urlSaveSchedule = 'servicios/saveschedule.php';
var urlSubAssyDetail = 'servicios/getsubassydetail.php';
var urlDailyReport = 'servicios/getdailyreport.php';
var urlModelDescription = 'servicios/getmodeldescription.php';
var urlMaterialDescription = 'servicios/getmaterialdescription.php';
var urlPurchaseOrder = 'servicios/getpo.php';
var urlUpdateProfile = 'servicios/updateprofile.php';
var urlDeleteSchedule = 'servicios/deleteschedule.php';
var urlEditSchedule = 'servicios/updateschedule.php';
var urlSavePo = 'servicios/savepo.php';
var urlUpdatePo = 'servicios/updatepo.php';
var urlDeletePo = 'servicios/deletepo.php';
var urlMaterialProduction = 'servicios/getmaterialproduction.php';
var urlDelivery = 'servicios/getdelivery.php';
var prueba = 'prueba.php';
var token ='';
var x = new XMLHttpRequest();
var po = [];


function loadSchedules(line, date)
{
	if (date != null)
		{
			if (line !='')
				var url = urlServer + urlSchedules +'?line='+line+'&date='+date;
			else
				 var url = urlServer + urlSchedules +'?date='+date;
			x.open('GET', url, true);
			x.onreadystatechange = function()
			{
				if (x.status == 200 & x.readyState == 4)
				{
					var respuesta = x.responseText;
					//parsear a JSON
					var respuestaJSON = JSON.parse(respuesta);
					var models = respuestaJSON.models;
					if (window.location.href == 'http://localhost:8080/production_dashboard/main.html')
						loadScheduleInfo(models);
					else if (window.location.hash == "#se")
						ScheduleEditInfo(models);
					else if (window.location.hash == "#sd")
						ScheduleDeleteInfo(models);
				}
			}
				x.send();
			
		}
}

function loadDaily(date,subcontractor)
{
        var url = urlServer + urlDailyReport +'?date='+date+'&subcontractor='+subcontractor;
			x.open('GET', url, true);
			x.onreadystatechange = function()
			{
				if (x.status == 200 & x.readyState == 4)
				{
					var respuesta = x.responseText;
					//parsear a JSON
					var respuestaJSON = JSON.parse(respuesta);
					var materials = respuestaJSON.materials;
					loadDailyReport(materials);
				}
			}
				x.send();
}
function loadModelDetail(idModel)
{
		date();
        var url = urlServer + urlProductionStatus +'?date='+sessionStorage.date+'&Model='+idModel;
			x.open('GET', url, true);
			x.onreadystatechange = function()
			{
				if (x.status == 200 & x.readyState == 4)
				{
					var respuesta = x.responseText;
					//parsear a JSON
					var respuestaJSON = JSON.parse(respuesta);
					var materials = respuestaJSON.materials;
					productionStatus(materials);
                    
				}
			}
				x.send();
}
function loadSubAssyDetail(idmodel, description)
{
		date();
        var url = urlServer + urlSubAssyDetail +'?idModel='+idmodel+'&material='+description;
			x.open('GET', url, true);
			x.onreadystatechange = function()
			{
				if (x.status == 200 & x.readyState == 4)
				{
					var respuesta = x.responseText;
					//parsear a JSON
					var respuestaJSON = JSON.parse(respuesta);
					var materials = respuestaJSON.materials;
					loadSubAssyDetailInfo(materials);
                    
				}
			}
				x.send();
}
function ScheduleAdd(data)
{
	var url = urlServer + urlSaveSchedule;
		 $.ajax({ type: "POST",
		 url: url,
		 data: {models : data},//no need to call JSON.stringify etc... jQ does this for you
		 cache: false,
		 success: function(response){//check response: it's always good to check server output when developing...
			 		 response = JSON.parse(response);
					 console.log(response.message);
			 		 closeprocessing();
					 $( ".ajax" ).load( "schedule-input.html");
					 popInfo('Schedule Information', response.message, 3000);
			 		
				 }
				});
}
function ScheduleEdit()
{
	openprocessing();
	var position = saveIdSchedule();
	var data = [];
	var tb = document.getElementById('schedule-edit');
	var filas = tb.getElementsByTagName("tr");
	var index = JSON.parse(sessionStorage.index)
	for (var i = 0; i < position.length; i++)
		{
			id= position[i];
			model= filas[index[i]].children[2].children[0].value;
			owner = filas[index[i]].children[3].children[0].value.toUpperCase();
			lot = filas[index[i]].children[4].children[0].value;
			line = filas[index[i]].children[5].children[0].value;
			sDate = filas[index[i]].children[6].children[0].value;
			data.push( {id: id, line: line, model : model, owner:owner, lot: lot, date: sDate})
			
		}
	
	var url = urlServer + urlEditSchedule;
		 $.ajax({ type: "POST",
		 url: url,
		 data: {models : data},//no need to call JSON.stringify etc... jQ does this for you
		 cache: false,
		 success: function(response){//check response: it's always good to check server output when developing...
			 		 response = JSON.parse(response);
					 console.log(response.message);
			 		 closeprocessing();
					 document.getElementById('checkSchedule').checked = false;
			 	 	 if (response.status == 0)
			 		 	productionSchedule();
			 		 closeprocessing();
					 popInfo('Information', response.message);
			 		
				 }
				});
}
function ScheduleDelete()
{
	openprocessing();
	var deleteschedule = saveIdSchedule();
	var url = urlServer + urlDeleteSchedule;
	 $.ajax({ type: "POST",
		 url: url,
		 data: {models : deleteschedule},//no need to call JSON.stringify etc... jQ does this for you
		 cache: false,
		 success: function(response){//check response: it's always good to check server output when developing...
			 		 response = JSON.parse(response);
					 console.log(response.message);
			 		 document.getElementById('checkSchedule').checked = false;
			 		 productionSchedule();
			 		 closeprocessing();
					 popInfo('Information', response.message);
			 		
				 }
				});
}
function MaterialDescription()
{
        var url = urlServer + urlMaterialDescription;
			x.open('GET', url, true);
			x.onreadystatechange = function()
			{
				if (x.status == 200 & x.readyState == 4)
				{
					var respuesta = x.responseText;
					//parsear a JSON
					var respuestaJSON = JSON.parse(respuesta);
					var materials = respuestaJSON.materials;
					loadAssyDescription(materials);
                    
				}
			}
				x.send();
}
function ModelDescription()
{
        var url = urlServer + urlModelDescription;
			x.open('GET', url, true);
			x.onreadystatechange = function()
			{
				if (x.status == 200 & x.readyState == 4)
				{
					var respuesta = x.responseText;
					//parsear a JSON
					var respuestaJSON = JSON.parse(respuesta);
					var models = respuestaJSON.models;
					loadModelDescription(models);
                    
				}
			}
				x.send();
}
function purchaseOrder()
{
	openprocessing();
	var idPo = document.getElementById('po-number').value;
	if (idPo > 0)
	{
		var url = urlServer + urlPurchaseOrder +'?idPo='+idPo;
			x.open('GET', url, true);
			x.onreadystatechange = function()
			{
				if (x.status == 200 & x.readyState == 4)
				{
					var respuesta = x.responseText;
					//parsear a JSON
					var respuestaJSON = JSON.parse(respuesta);
					po = respuestaJSON.po;
					closeprocessing();
					if (po[0].status == 0)
					{
						if (sessionStorage.subcontractor == po[0].subcontractor)
							{
								openprocessing();
								//alert(po[0].subcontractor);
								purchaseOrderEdit(po);
							}
						else
							popInfo('Information','PO not found!');
					} 
					else
						popInfo('Information','PO not found!');
				}
			}
				x.send();
	}
	else
	{
		closeprocessing();
		popInfo('Information','Please enter a valid PO number.');
	}
}
function poAdd(data)
{
	var url = urlServer + urlSavePo;
		 $.ajax({ type: "POST",
		 url: url,
		 data: {pos : data},//no need to call JSON.stringify etc... jQ does this for you
		 cache: false,
		 success: function(response){//check response: it's always good to check server output when developing...
			 		 response = JSON.parse(response);
					 console.log(response.message);
			 		 closeprocessing();
			 		 if (response.status ==0)
					 	{$( ".ajax" ).load( "po-new.html");MaterialDescription();}
					 popInfo('Information', response.message, 3000);
			 		
				 }
				});
}
function editPo()
{
	openprocessing();
	
	var data = [];
	var tb = document.getElementById('purchase-edit');
	var filas = tb.getElementsByTagName("tr");
	id= po[0].id;
	for (var i = 0; i < filas.length; i++)
		{
			numberId = po[i].materialId;
			number = filas[i].children[2].children[0].value;
			qty = filas[i].children[4].children[0].value;
			model = filas[i].children[5].children[0].value;
			data.push( {id: numberId, number: number, qty : qty, model:model})
			
		}
	
	var url = urlServer + urlUpdatePo;
		 $.ajax({ type: "POST",
		 url: url,
		 data: {pos : data},//no need to call JSON.stringify etc... jQ does this for you
		 cache: false,
		 success: function(response){//check response: it's always good to check server output when developing...
			 		 response = JSON.parse(response);
					 console.log(response.message);
			 		if (response.status ==0)
					 	{$( ".ajax" ).load( "po-edit.html");MaterialDescription();}
			 		 closeprocessing();
					 popInfo('Information', response.message);
			 		
				 }
				});
}
function poDelete(id)
{
	openprocessing();
	var url = urlServer + urlDeletePo + '?id='+id;
	 x.open('GET', url, true);
			x.onreadystatechange = function()
			{
				if (x.status == 200 & x.readyState == 4)
				{
					var respuesta = x.responseText;
					//parsear a JSON
					var response = JSON.parse(respuesta);
					if (response.status == 0)
						{$( ".ajax" ).load( "po-delete.html");}
					closeprocessing();
					popInfo('Information', response.message);
				}
			}
				x.send();
}
function updateProfilePassword(password, email)
{
        var url = urlServer + urlUpdateProfile + "?email=" + email + "&password=" + password;
			x.open('GET', url, true);
			x.onreadystatechange = function()
			{
				if (x.status == 200 & x.readyState == 4)
				{
					var respuesta = x.responseText;
					//parsear a JSON
					var respuestaJSON = JSON.parse(respuesta);
					popInfo('My Profile', respuestaJSON.message);
				}
			}
				x.send();
}
function materialProduction(model)
{
        var url = urlServer + urlMaterialProduction + "?model=" + model;
			x.open('GET', url, true);
			x.onreadystatechange = function()
			{
				if (x.status == 200 & x.readyState == 4)
				{
					var respuesta = x.responseText;
					//parsear a JSON
					var respuestaJSON = JSON.parse(respuesta);
					if (respuestaJSON.length > 0)
					{
						var materials = respuestaJSON.materials;
                    	productionConfirm(materials);
					}
					else
					{
						closeprocessing();
						popInfo('Information','Model not found!');
					}
				}
			}
				x.send();
}
function delivery(po)
{
    var url = urlServer + urlDelivery + "?po=" + po +"&sub=" +sessionStorage.subcontractor;
			x.open('GET', url, true);
			x.onreadystatechange = function()
			{
				if (x.status == 200 & x.readyState == 4)
				{
					var respuesta = x.responseText;
					//parsear a JSON
					var respuestaJSON = JSON.parse(respuesta);
					var materials = respuestaJSON.materials;
                    productionConfirm(materials);
				}
			}
				x.send();
}
