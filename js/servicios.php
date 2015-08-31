/**
 * Production Dashboard
 *
 * @version 1 (06. 23 June 2015)
 * @authors Fausto Serrano & Juan Salgado
 * @requires jQuery, progress, highcharts, jquery.datatables, tooltipster, weather widget (http://www.theweather.com/)
 * @ 
 *
 * 
 * 
 */
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
var urlSaveUser = 'servicios/saveuser.php';
var urlUpdatePo = 'servicios/updatepo.php';
var urlSaveProduction = 'servicios/saveproduction.php';
var urlSaveDelivery = 'servicios/savedelivery.php';
var urlUpdateUser = 'servicios/updateuser.php';
var urlDeletePo = 'servicios/deletepo.php';
var urlMaterialProduction = 'servicios/getmaterialproduction.php';
var urlDelivery = 'servicios/getdelivery.php';
var urlDeliveryUpdate = 'servicios/updatedelivery.php';
var urlConfirmDelivery = 'servicios/confirmdelivery.php';
var urlDeliveryConfirm = 'servicios/getdeliveryconfirm.php';
var urlGetDiscrepancy = 'servicios/getdiscrepancy.php';
var urlUser = 'servicios/getuser.php';
var urlDeleteUser = 'servicios/deleteuser.php';
var urlGetPackingList = 'servicios/getpackinglist.php';
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
					if (window.location.hash == '')
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
    var detailModelId = document.getElementById('detailModelId');
	detailModelId.innerHTML = sessionStorage.modelnumber +' x '+sessionStorage.lot + ' Units' ;
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
					 popInfo('Information', response.message, 3000);
			 		
				 }
				});
}
function ScheduleEdit(data)
{
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
	var deleteschedule = saveIds();
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
								if (sessionStorage.option == 1)
									purchaseOrderEdit(po);
								if (sessionStorage.option == 2)
									purchaseOrderDelete(po);
								
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
					 {
					 	$( ".ajax" ).load( "po-new.html", function() {
							var dates = document.querySelectorAll('input[type=date]')
							for (var i = 0; i < dates.length; i++)
								dates[i].value = date();

						});
						MaterialDescription();
					 }
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
	if (filas.length > 1)
	{
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
	else
	{
		closeprocessing();
		popInfo('Error', 'PO information not found.');
	}
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
function materialProduction(po)
{
        var url = urlServer + urlMaterialProduction + "?po=" + po +"&subcontractor=" + sessionStorage.subcontractor;
			x.open('GET', url, true);
			x.onreadystatechange = function()
			{
				if (x.status == 200 & x.readyState == 4)
				{
					var respuesta = x.responseText;
					//parsear a JSON
					var respuestaJSON = JSON.parse(respuesta);
					if (respuestaJSON.materials.length > 0)
					{
						var materials = respuestaJSON.materials;
                    	productionConfirm(materials);
					}
					else
					{
						closeprocessing();
						popInfo('Information','PO not found!');
					}
				}
			}
				x.send();
}
/* save production */
function productionSave (data) {
	var url = urlServer + urlSaveProduction;
	$.ajax({ type: "POST",
	url: url,
	data: {materials : data},//no need to call JSON.stringify etc... jQ does this for you
	cache: false,
	success: function(response){//check response: it's always good to check server output when developing...
			 response = JSON.parse(response);
			 console.log(response.message);
			 closeprocessing();
			 if (response.status == 0)
				{
					if (sessionStorage.option == 1)
						$( ".ajax" ).load( "production-confirm.html");
					if (sessionStorage.option == 2)
						$( ".ajax" ).load( "production-adjust.html");
				}
			 popInfo('Information', response.message, 3000);
			 }
		});
}
function DeliverySave (data) {
	var url;
		if (sessionStorage.option == 3)
			url = urlServer + urlSaveDelivery;
		if (sessionStorage.option == 5)
			url = urlServer + urlDeliveryUpdate;
		if (sessionStorage.option == 4)
			url = urlServer + urlConfirmDelivery;//cambiar
	
	$.ajax({ type: "POST",
	url: url,
	data: {materials : data},//no need to call JSON.stringify etc... jQ does this for you
	cache: false,
	success: function(response){//check response: it's always good to check server output when developing...
			 response = JSON.parse(response);
			 console.log(response.message);
			 closeprocessing();
			 if (response.status == 0)
				{
					if (sessionStorage.option == 3)
						$( ".ajax" ).load( "delivery-new.html");
					if (sessionStorage.option == 5)
						$( ".ajax" ).load( "delivery-edit.html");
					if (sessionStorage.option == 4)
					{
						var packing = data[0]["packing"];
						$( ".ajax" ).load( "receiving-confirm.html", function() {
                            enterbutton('btn-find');
                            packingList();
                        });
					}
				}
			 popInfo('Information', response.message, 3000);
			 }
		});
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
                    if (materials.length > 0)
                    	productionConfirm(materials);
					else
					{
						closeprocessing();
						popInfo('Information', 'PO not found or is closed.');
					}
				}
			}
				x.send();
}
function deliveryConfirm(packing)
{
    var url = urlServer + urlDeliveryConfirm + "?packing="+packing;
			x.open('GET', url, true);
			x.onreadystatechange = function()
			{
				if (x.status == 200 & x.readyState == 4)
				{
					var respuesta = x.responseText;
					//parsear a JSON
					var respuestaJSON = JSON.parse(respuesta);
					var materials = respuestaJSON.materials;
					if (materials.length > 0)
                    	productionConfirm(materials);
					else
					{
						closeprocessing();
						popInfo('Information', 'Packing list not found or is closed.');
					}
				}
			}
				x.send();
}

function userService(email)
{
    var url = urlServer + urlUser + "?user="+email;
			x.open('GET', url, true);
			x.onreadystatechange = function()
			{
				if (x.status == 200 & x.readyState == 4)
				{
					var respuesta = x.responseText;
					//parsear a JSON
					var respuestaJSON = JSON.parse(respuesta);
					var users = respuestaJSON.user;
                    userEdit(users);
				}
			}
				x.send();
}
function userAdd(data)
{
	var url = urlServer + urlSaveUser;
	$.ajax({ type: "POST",
	url: url,
	data: {users : data},//no need to call JSON.stringify etc... jQ does this for you
	cache: false,
	success: function(response){//check response: it's always good to check server output when developing...
			 response = JSON.parse(response);
			 console.log(response.message);
			 closeprocessing();
			 if (response.status ==0)
				{$( ".ajax" ).load( "user-new.html");}
			 popInfo('Information', response.message, 3000);
			 }
		});
}
function userDelete(id)
{
	openprocessing();
	var url = urlServer + urlDeleteUser + '?id='+id;
	 x.open('GET', url, true);
			x.onreadystatechange = function()
			{
				if (x.status == 200 & x.readyState == 4)
				{
					var respuesta = x.responseText;
					//parsear a JSON
					var response = JSON.parse(respuesta);
					if (response.status == 0)
						{$( ".ajax" ).load( "user-delete.html");}
					closeprocessing();
					popInfo('Information', response.message);
				}
			}
				x.send();
}

function editUser()
{
	 var email = document.getElementById('f-email').value;
	
	var email2,  password, name, lastname, typeId, subcontractor;
        var userArray = [];

        if (document.getElementById('password').value != null)
            password= document.getElementById('password').value;
        else
            password = '';
	
	email2 = document.getElementById('email').value;
	name = toTitleCase(document.getElementById('name').value);
	lastname = toTitleCase(document.getElementById('lastname').value);
	typeId = document.getElementById('selectType').value;
	subcontractor = document.getElementById('selectSubcontractor').value;
	if (document.getElementById('div-subcontractor').style.display == 'none')
		subcontractor = '0';
	
	

	if (email != '' & email2 != ''  & name != '' & lastname != '' & typeId > 0 & subcontractor != '' )
		{	
			userArray.push({email: email, password : password, name: name, lastname: lastname, typeId: typeId, subcontractor: subcontractor, email2 : email2});
		}
	else
		{
			closeprocessing();
		}
var url = urlServer + urlUpdateUser;
	 $.ajax({ type: "POST",
	 url: url,
	 data: {user : userArray},//no need to call JSON.stringify etc... jQ does this for you
	 cache: false,
	 success: function(response){//check response: it's always good to check server output when developing...
				 response = JSON.parse(response);
				 console.log(response.message);
				if (response.status ==0)
					{$( ".ajax" ).load( "user-edit.html")}
				 closeprocessing();
				 popInfo('Information', response.message);

			 }
			});
}
function loadUsers()
{
    openprocessing();
    var url = urlServer + urlUser;
        x.open('GET', url, true);
        x.onreadystatechange = function()
        {
            if (x.status == 200 & x.readyState == 4)
            {
                var respuesta = x.responseText;
                //parsear a JSON
                var respuestaJSON = JSON.parse(respuesta);
                var users = respuestaJSON.users;
                userListInfo(users);

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
function discrepancyReport()
{
	var date = document.getElementById('date').value;
	var date2 = document.getElementById('date2').value;
	if (date == '')
		popInfo('Error', 'Please select a date or a range')
	if (date2 != '')
        var url = urlServer + urlGetDiscrepancy + "?date=" + date + "&date2=" + date2;
	else
		var url = urlServer + urlGetDiscrepancy + "?date=" + date;
			x.open('GET', url, true);
			x.onreadystatechange = function()
			{
				if (x.status == 200 & x.readyState == 4)
				{
					var respuesta = x.responseText;
					//parsear a JSON
					var respuestaJSON = JSON.parse(respuesta);
					discrepancyChart(respuestaJSON.subcontractors, date, date2);
				}
			}
				x.send();
}
function packingList()
{
        var url = urlServer + urlGetPackingList;
			x.open('GET', url, true);
			x.onreadystatechange = function()
			{
				if (x.status == 200 & x.readyState == 4)
				{
					var respuesta = x.responseText;
					//parsear a JSON
					var respuestaJSON = JSON.parse(respuesta);
                    if (respuestaJSON.status > 0)
                    {
                        var po = document.getElementById('p-no');
                        var packings = respuestaJSON.packings;
                        for (var i=0; i < packings.length; i++)
                        {
                            var option = document.createElement ("option");
                            option.innerHTML = packings[i].packing;
                            po.appendChild(option);
                        }
                    }
				}
			}
				x.send();
}
