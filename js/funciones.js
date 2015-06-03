/* 
*   @Pagina
*
*
*
*
*/
// Dialog
var txt; //text
var imgprocessing = 'images/loading_anim.gif';  // process image
var imgconfirmation = 'images/loading_anim.gif'; ; // confirmation image
var models = [];

/* page start */
function index() {
   enterbutton();
   passMessage();
}
function start()
{
    loadpage();
    validarUsuario();
    if (window.location.href == 'http://localhost:8080/production_dashboard/main.html')
    {
		productionSchedule();
		tablesort('.prod-status');
    }
    if (window.location.href == 'http://localhost:8080/production_dashboard/daily-report.html')
    {
        date(1);
		tablesort('.daily-detail');
    }
    if (window.location.href == 'http://localhost:8080/production_dashboard/index.html')
    {
        passMessage();
    }
	if (window.location.href == 'http://localhost:8080/production_dashboard/model-detail.html')
    {
        tooltip('.detail-wrap', 'Click here for details');
		loadModelDetail(sessionStorage.model);
    }
    $('#user-name').text(sessionStorage.username + " " + sessionStorage.userlastname);
    closeprocessing();
}
/* 
*   @index
*
*
*
*
*
/*
/* login forgot your password message*/
function passMessage()
{
    if (window.location.hash === "#error"){
        document.getElementById('popheader').innerHTML = 'Invalid email address';
        document.getElementById('pop-message').innerHTML = 'Please type a valid email address.';
        openPopup();
        setTimeout(function(){ window.location = 'index.html'; }, 2000);
        
    }
    if (window.location.hash === "#sent"){
        document.getElementById('popheader').innerHTML = 'Password reset';
        document.getElementById('pop-message').innerHTML = 'We sent you an email with your new password, please check your email.';
        openPopup();
        setTimeout(function(){ window.location = 'index.html'; }, 2000);
    }
    if (window.location.hash === "#mailerror"){
        document.getElementById('popheader').innerHTML = 'Network error';
        document.getElementById('pop-message').innerHTML = 'We are unable to sent you an email.';
        openPopup();
        setTimeout(function(){ window.location = 'index.html'; }, 2000);
    }
    else
        {
        }
}
/* 
*   @main
*
*
*
*
*
*/
/* display production schedule */
function productionSchedule()
{
    txt = 'Processing . . .'; //texto
    
	var date = document.getElementById("month").value;
	var line = document.getElementById("line").value;
	
	if (date != "")
	{
		openprocessing();
		loadSchedules(line, date);
	}
}
function loadScheduleInfo(schedule)
{
	var modelsArray = new Array();
	var tb = document.getElementById('prod-mod');
	var filas = tb.getElementsByTagName("tr");
	if (filas.length > 0)
		tb.innerHTML = '';
	for (var i=0; i < schedule.length; i++)
		{
			var tr = tb.insertRow(i);
			tr.insertCell(0).innerHTML = schedule[i].number;
			tr.insertCell(1).innerHTML = schedule[i].owner;
			tr.insertCell(2).innerHTML = schedule[i].line;
			tr.insertCell(3).innerHTML = schedule[i].lot;
			tr.insertCell(4).innerHTML = schedule[i].startDate;
			if (schedule[i].percent < 100)
				tr.insertCell(5).innerHTML = 'In Progress';
			else
				tr.insertCell(5).innerHTML = 'Finished';
			tr.insertCell(6).innerHTML = '<div id="progress"><div></div></div>';
			tr.setAttribute('onclick', 'onclickSchedule("'+schedule[i].id+'")');
			
			modelsArray.push(schedule[i].percent);
		}
	if (modelsArray.length > 0)
		{
			progress(modelsArray);
			$('.prod-status').trigger('update');
		}
	closeprocessing();
}
function onclickSchedule(model)
{
	sessionStorage.model = model;
	window.location = 'model-detail.html';
}
/* Model produced / delivered details */
function productionStatus(daily)
{
	var detailModelId = document.getElementById('detailModelId');
	detailModelId.innerHTML = daily[0].modelNumber +' x '+daily[0].lot + ' Units' ;
	
	for(var i = 0; i < daily.length; i++)
		{
			if (daily[i].description == 'REAR FRAME')
				{
					document.getElementById('rf-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('rf-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('rf-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('rf-td').innerHTML = " " + daily[i].sumD;
					
				}
			if (daily[i].description == 'REAR BUMPER')
				{
					document.getElementById('rb-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('rb-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('rb-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('rb-td').innerHTML = " " + daily[i].sumD;
					
				}
			if (daily[i].description == 'LANDING GEAR')
				{
					document.getElementById('lg-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('lg-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('lg-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('lg-td').innerHTML = " " + daily[i].sumD;
					
				}
			if (daily[i].description == 'LARGE SLIDER')
				{
					document.getElementById('ls-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('ls-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('ls-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('ls-td').innerHTML = " " + daily[i].sumD;
					
				}
			if (daily[i].description == 'SMALL SLIDER')
				{
					document.getElementById('rbdp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('rbtp').innerHTML = " " + daily[i].sumP;
					document.getElementById('rbdd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('rbtd').innerHTML = " " + daily[i].sumD;
					
				}
			if (daily[i].description == 'X-MEM FWD')
				{
					document.getElementById('rfdp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('rftp').innerHTML = " " + daily[i].sumP;
					document.getElementById('rfdd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('rftd').innerHTML = " " + daily[i].sumD;
					
				}
			if (daily[i].description == 'X-MEM DROP')
				{
					document.getElementById('rfdp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('rftp').innerHTML = " " + daily[i].sumP;
					document.getElementById('rfdd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('rftd').innerHTML = " " + daily[i].sumD;
					
				}
			if (daily[i].description == 'FRONT POST')
				{
					document.getElementById('fp-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('fp-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('fp-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('fp-td').innerHTML = " " + daily[i].sumD;
					
				}
			
		}
}
/* Display model daily detail */
function dailydetail()
{
    $('.sumd').toggle('slow');
    $('.sum').slideToggle(500);
	if ($('.button-detail').text() == 'TODAY')
		$('.button-detail').text('TOTAL')
	else if ($('.button-detail').text() == 'TOTAL')
	$('.button-detail').text('TODAY')
}
/* Sub assy details */
function onclickSubassyDetail(obj)
{
	openprocessing();
	loadSubAssyDetail(sessionStorage.model,obj);
	
}
function loadSubAssyDetailInfo(sub)
{
	var tb = document.getElementById('subassy-detail');
	var filas = tb.getElementsByTagName("tr");
	if (filas.length > 0)
		tb.innerHTML = '';
	for (var i=0; i < sub.length; i++)
		{
			var tr = tb.insertRow(i);
			tr.insertCell(0).innerHTML = sub[i].vendor;
			tr.insertCell(1).innerHTML = sub[i].po;
			tr.insertCell(2).innerHTML = sub[i].sapNo;
			tr.insertCell(3).innerHTML = sub[i].description;
			tr.insertCell(4).innerHTML = sub[i].qty;
		}
	openPopup();
	closeprocessing();
	
}
/* progress bars */
function progress(values)
{
    //var values = [25, 50, 75, 90, 68, 45, 22, 30, 45, 15, 27, 52,52, 77, 45,32, 25, 46, 44, 95,60];
    var i = 0;
    $('#progress:first-child').each(function() { 
		$(this).find('div').addClass ="v"+i;
        progressBar(values[i], $(this));
        i++;
    });
}
/* add the witdh and style to the progress bar */
function progressBar(percent, element) {
    var progress =  element.find('div');
    if (percent <= 25)
        progress.addClass('progress-min');
    else if (percent <= 50 & percent > 25)
        progress.addClass('progress-mid');
    else if (percent <= 75 & percent > 50)
        progress.addClass('progress-average');
    else if(percent > 75)
        progress.addClass('progress');
	progress.animate({ width: percent + '%' }, 700).html(percent + "%&nbsp;");
}
/* 
*   @daily report
*
*
*
*
*
*/
/* Daily repoprt*/
function Daily()
{
	var dailydate = document.getElementById("date").value;
    if (document.getElementById("subcontractor").value != '----------------------' && dailydate)
        {
			 //loadDaily(dailydate,1);
            document.getElementById("production-status").style.display = "block";
        }
    else
        document.getElementById("production-status").style.display = "none";

}
function onclickDailyReport()
{
	
	var date = document.getElementById("date").value;
	var subcontractor = document.getElementById("subcontractor").value;
	if (date != '' & subcontractor != 0)
	{
		openprocessing();
		loadDaily(date,subcontractor);
		$('#subcontractor').tooltipster('destroy')
	}
	else{
		tooltip('#subcontractor', 'Please select a subcontractor');
		$('#subcontractor').tooltipster('show');
	}
}
function loadDailyReport(daily)
{
	var tb = document.getElementById('daily-reportDetail');
	var filas = tb.getElementsByTagName("tr");
	if (filas.length > 0)
		tb.innerHTML = '';
	for (var i=0; i < daily.length; i++)
		{
			var tr = tb.insertRow(i);
			tr.insertCell(0).innerHTML = daily[i].subcontractor;
			tr.insertCell(1).innerHTML = daily[i].model;
			tr.insertCell(2).innerHTML = daily[i].line;
			tr.insertCell(3).innerHTML = daily[i].sapNo;
			tr.insertCell(4).innerHTML = daily[i].description;
			tr.insertCell(5).innerHTML = daily[i].lot;
			tr.insertCell(6).innerHTML = daily[i].produced;
			tr.insertCell(7).innerHTML = daily[i].delivered;
			tr.insertCell(8).innerHTML = daily[i].totalprod;
			tr.insertCell(9).innerHTML = daily[i].totaldeliv;
		}
	$('.daily-detail').trigger('update');
	closeprocessing();
}
/* 
*   @admin
*
*
*
*
*
*/
/* new chedule */
function saveSchedule(){
	openprocessing();
	var tb = document.getElementById('schedule-add');
	var filas = tb.getElementsByTagName("tr");
	if (filas.length > 0)
		{
			var line, model, owner, lot, sDate, start = false;
			var schedule = [];
			for (var i = 0; i < filas.length; i++)
				{
					line = document.getElementById('line').value;
					model= filas[i].children[1].children[0].value;
					owner = filas[i].children[2].children[0].value.toUpperCase();
					lot = filas[i].children[3].children[0].value;
					sDate = filas[i].children[4].children[0].value;
					if (line != '' & model > 0  & owner != '' & lot > 0 & sDate != '' )
						{	
							schedule.push({line: line, model : model, owner:owner, lot: lot, date: sDate});
						}
					else
						{
							closeprocessing();
							break;
						}
				}
			if (schedule.length > 0)
			{ScheduleAdd(schedule);$('#line').tooltipster('destroy');}
			else
				{
					popInfo("Schedule Information", "Data error, please fill correctly (Line and Model information)."); 
					if (line == ""){tooltip('#line', "Please select a line"); $('#line').tooltipster('show');}
					else $('#line').tooltipster('destroy');
				}
		}
}
/* Edit Schedule */
function ScheduleEditInfo(schedule)
{
	var tb = document.getElementById('schedule-edit');
	var filas = tb.getElementsByTagName("tr");
	if (filas.length > 0)
		tb.innerHTML = '';
	for (var i=0; i < schedule.length; i++)
		{
			var tr = tb.insertRow(i);
			tr.insertCell(0).innerHTML =  i+1;
			tr.insertCell(1).innerHTML =  '<input name="all-check" class="all-check" type="checkbox" value="'+schedule[i].id+'"></input>';
			tr.insertCell(2).innerHTML =  '<input type="number" value="'+schedule[i].number+'"></input>';
			tr.insertCell(3).innerHTML =  '<input type="text" value="'+schedule[i].owner+'"></input>';
			tr.insertCell(4).innerHTML =  '<input type="number" value="'+schedule[i].lot+'"></input>';
			tr.insertCell(5).innerHTML =  '<select><option value="">----</option><option value="1">A</option><option value="2">B</option><option value="3">C</option><option value="4">H</option></select>';
			tr.insertCell(6).innerHTML =  '<input type="date" value="'+schedule[i].startDate+'"></input>';
		}
	closeprocessing(); 
}
/* Delete Schedule */
function ScheduleDeleteInfo(schedule)
{
	var tb = document.getElementById('schedule-edit');
	var filas = tb.getElementsByTagName("tr");
	if (filas.length > 0)
		tb.innerHTML = '';
	for (var i=0; i < schedule.length; i++)
		{
			var tr = tb.insertRow(i);
			tr.insertCell(0).innerHTML =  i+1;
			tr.insertCell(1).innerHTML =  '<input name="all-check" class="all-check" type="checkbox" value="'+schedule[i].id+'"></input>';
			tr.insertCell(2).innerHTML =  '<input type="number" readonly value="'+schedule[i].number+'"></input>';
			tr.insertCell(3).innerHTML =  '<input type="text" readonly value="'+schedule[i].owner+'"></input>';
			tr.insertCell(4).innerHTML =  '<input type="number" readonly value="'+schedule[i].lot+'"></input>';
			tr.insertCell(5).innerHTML =  '<input type="text" readonly value="'+schedule[i].line+'"></input>';
			tr.insertCell(6).innerHTML =  '<input type="date" readonly value="'+schedule[i].startDate+'"></input>';
		}
	closeprocessing(); 
}
function saveIdSchedule()
{
	var check = [];
	var index = []
	var allcheck = document.getElementsByName('all-check');
	for(var i = 0;i < allcheck.length; i++)
		{
			if(allcheck[i].checked == true)
			{check.push(allcheck[i].value);index.push(i)}
		}
	sessionStorage.index = JSON.stringify(index);
	return check;
}
	
/* 
*   @purchase order
*
*
*
*
*
*/
function purchaseOrderEdit(po)
{
	var tb;
	if (sessionStorage.option == 1)
			tb = document.getElementById('purchase-edit');
	else if (sessionStorage.option == 2)
	 		tb = document.getElementById('purchase-delete');
	
	var filas = tb.getElementsByTagName("tr");
	if (filas.length > 0)
		tb.innerHTML = '';
	for (var i=0; i < po.length; i++)
		{
			var tr = tb.insertRow(i);
			tr.insertCell(0).innerHTML =  i+1;
			tr.insertCell(1).innerHTML =  '<input readonly type="number" value="'+po[i].id+'"></input>';
			tr.insertCell(2).innerHTML =  '<input type="text" value="'+po[i].material+'"></input>';
			tr.insertCell(3).innerHTML =  '<input readonly type="text" value="'+po[i].description+'"></input>';
			tr.insertCell(4).innerHTML =  '<input type="number" value="'+po[i].qty+'"></input>';
			var option = '<select class="model"><option value="'+po[i].modelId+'">'+po[i].model+'</option>';
			for(var a = 0;a < po[0].models.length; a++)
			{
				option +=  '<option value="' + po[i].models[a].id +'">'+po[i].models[a].number+'</option>';
			}
			option += '</select>';
			tr.insertCell(5).innerHTML = option;
			tr.insertCell(6).innerHTML =  '<input readonly type="text" value="'+po[i].line+'"></input>';
			tr.insertCell(7).innerHTML =  '<input readonly type="date" value="'+po[i].date+'"></input>';
			if (sessionStorage.option == 2)
			{
				if (po[i].produced > 0)
				{
					tr.insertCell(8).innerHTML =  '<input type="text" value="'+po[i].produced+'" class="prod-qty" readonly></input>';
					tr.insertCell(9).innerHTML =  '<button onclick="poDelete('+po[i].materialId+')" disabled><img src="images/delete_32.png" style="height:14px"> Delete</button>';}
				else
				{
					tr.insertCell(8).innerHTML =  '<input type="text" value="'+po[i].produced+'"></input>';
					tr.insertCell(9).innerHTML =  '<button onclick="poDelete('+po[i].materialId+')"><img src="images/delete_32.png" style="height:14px"> Delete</button>';}
			}
			models = po[0].models;
			
			
		}
	var c = 1;
	$('.model').each(function(){	
		onchangeModelSelect($(this), c);
		c++;
	});	
	closeprocessing(); 
}
function loadAssyDescription(materials)
{
	$('.description').each(function(){
		for (var i = 0; i < materials.length; i++)
				{
					
					if (i == 0)
					{
						var option = document.createElement('option');
						option.innerHTML = "------------";
						$(this).append(option);
					}
					var option = document.createElement('option');
					option.innerHTML = materials[i].description;
					$(this).append(option);
				}
	});	
	ModelDescription();
}
function loadModelDescription(mod)
{
	models = mod;
	var select = document.createElement('select');
	var c = 1;
	for (var i = 0; i < models.length; i++)
	{	
		if (i == 0)
		{
			var option = document.createElement('option');
			option.innerHTML = "------------";
			option.value = "";
			$(select).append(option);
		}
		var option = document.createElement('option');
		option.innerHTML = models[i].number;
		option.value = i;
		$(select).append(option);		
	}
	$('.model').each(function(){	
		onchangeModelSelect($(this), c);
		c++;
		$(this).html(select.innerHTML);
	});	
	closeprocessing();
}
function onchangeModelSelect(element, c){
	$(element).change(function() {loadLine(c, $(element).val());});
}
function loadLine(c, n)
{
	var filas = document.getElementsByTagName("tr");
	var line = filas[c].cells[6].firstChild;
	if (n=='')
		line.value = '';
	else
		line.value = models[n].line.description;
}
function savePo(){
	openprocessing();
	var tb = document.getElementById('po');
	var filas = tb.getElementsByTagName("tr");
	if (filas.length > 0)
		{
			var po, sapnumber, description, qty, model, line, date, modelId =0, start = false;
			var poArray = [];
			for (var i = 0; i < filas.length; i++)
				{
					po = filas[i].children[1].children[0].value;
					sapnumber = filas[i].children[2].children[0].value;
					description = filas[i].children[3].children[0].value;
					qty = filas[i].children[4].children[0].value;
					model = models[filas[i].children[5].children[0].value];
					if (model != null)
						modelId = model.id
					else 
						modelId = 0;
					line = filas[i].children[6].children[0].value;
					date = filas[i].children[7].children[0].value;
					if (po > 0 & sapnumber != ''  & description != '' & qty > 0 & modelId > 0 & line != '' & date != '' )
						{	
							poArray.push({po: po, sapnumber: sapnumber, description:description, qty: qty, model: modelId, line: line, date: date, subcontractor: sessionStorage.subcontractor});
						}
					else
						{
							closeprocessing();
							popInfo("Purchase order Information 1", "Data error, please fill correctly .");
							break;
							
						}
				}
			if (poArray.length > 0)
				{poAdd(poArray);}
			else
				{
					popInfo("Purchase order Information 2", "Data error, please fill correctly ."); 
				}
		}
}
/* production confirm / update  */
function productionConfirm(material)
{
    var tb = document.getElementById('model-pos');
	var filas = tb.getElementsByTagName("tr");
	if (filas.length > 0)
		tb.innerHTML = '';
	for (var i=0; i < material.length; i++)
		{
			var tr = tb.insertRow(i);
			tr.insertCell(0).innerHTML =  '<input name="all-check" class="all-check" type="checkbox" value="'+material[i].id+'"></input>';
			tr.insertCell(1).innerHTML =   '<input type="number" value="'+material[i].poId+'" readonly class="prod"></input>';
			tr.insertCell(2).innerHTML =  '<input type="text" value="'+material[i].number+'" readonly></input>';
			tr.insertCell(3).innerHTML =  '<input type="text" value="'+material[i].description+'" readonly></input>';
			tr.insertCell(4).innerHTML =  '<input type="number" value="'+material[i].qty+'" readonly class="prod"></input>';
			tr.insertCell(5).innerHTML =  '<input type="text" value="'+material[i].line+'" readonly></input>';
			tr.insertCell(6).innerHTML =  '<input type="date" value="'+material[i].date+'" readonly></input>';
            
            if (sessionStorage.option == 1)
            {
                tr.insertCell(7).innerHTML =  '<input type="number" value="'+material[i].produced+'" readonly class="prod"></input>';
                tr.insertCell(8).innerHTML =  '<input type="number" value="'+material[i].max+'" readonly class="prod"></input>';
                tr.insertCell(9).innerHTML =  '<input type="number" min="0" max="'+material[i].max+'" value="'+material[i].max+'"></input>';
            }
            if (sessionStorage.option == 2)
            {
                tr.insertCell(7).innerHTML =  '<input type="number" value="'+material[i].produced+'" readonly class="prod"></input>';
				tr.insertCell(8).innerHTML =  '<input type="number" value="'+material[i].max+'" readonly class="prod"></input>';
                tr.insertCell(9).innerHTML =  '<input type="number" min="'+material[i].delivered+'" max="'+material[i].qty+'" value="'+material[i].delivered+'"></input>';
            }
             if (sessionStorage.option == 3)
            {
                tr.insertCell(7).innerHTML =  '<input type="number" value="'+material[i].produced+'" readonly></input>';
                tr.insertCell(8).innerHTML =  '<input type="number" value="'+material[i].delivered+'" readonly></input>';
                tr.insertCell(9).innerHTML =  '<input type="number" value="'+material[i].max+'" readonly></input>';
                tr.insertCell(10).innerHTML =  '<input type="number"></input>';
				tr.insertCell(11).innerHTML =  '<input type="number"></input>';
            }
			
		}
	closeprocessing(); 
}
function clickProduction()
{
	openprocessing();
    var model = document.getElementById('modelNo').value;
	if (model > 0)
    	materialProduction(model);
	else
		{
			closeprocessing();
			popInfo('Information', 'Please enter a valid model number.')
		}
}
function clickDelivery()
{
	openprocessing();
    var po = document.getElementById('po-no').value;
	if (po > 0)
    	delivery(po);
	else
		{
			closeprocessing();
			popInfo('Information', 'Please enter a valid PO number.')
		}
}


/* update profile */
function updateProfile()
{
	popInfo("My profile details", "Name:<br><input type='text' readonly value='" + sessionStorage.username + " " + sessionStorage.userlastname + "'><br><br><label>Change your password.</label><br>New password.<br><input id='pass1' type='password'><p id='p1'>*</p><br>Confirm password.<br><input id='pass2' type='password'></input><p  id='p2'>*</p><button onclick='profileUpdate()'>Save</button>");
}
function profileUpdate()
{
	var pass1 = document.getElementById('pass1').value;
	var pass2 = document.getElementById('pass2').value;
	var p1 = document.getElementById('p1');
					var p2 = document.getElementById('p2');
	if (pass1 != '' && pass2 != '' )
		{
			if (document.getElementById('pass1').value == document.getElementById('pass2').value )
				updateProfilePassword(pass1, sessionStorage.email);
			else
				{
					alert("Passwords don't match");
				}
				
		}
	else
		{
			if (pass1 == '')
				p1.style.display = 'inline';
			else
				p1.style.display = 'none';
			if (pass2 == '')
				p2.style.display = 'inline';
			else
				p2.style.display = 'none';
		}
		
}

/* 
*   @Sub Menus
*
*
*
*
*
/*
/* sub menus*/
var sm; //variable del sub 
function ActivarSubMenu(o){
    if (sm != null || sm != undefined)
        DesactivarSubMenu();
    sm = o.parentElement.parentElement;
    $(sm).addClass("sub-active");
}
function DesactivarSubMenu(){
    $(sm).removeClass("sub-active");
}
/* main menu*/ 
/* add model to schedule*/
function scheduleNew(e)//receive an element
{
    ActivarSubMenu(e);
    $(".title").text("Production Schedule Creation");
    $( ".ajax" ).load( "schedule-input.html");
}
/* Edit production schedule */
function scheduleEdit(e){
    ActivarSubMenu(e);
    $(".title").html("Production Schedule Edit");
    $( ".ajax" ).load( "schedule-edit.html");
	window.location.hash = "#se";
}
/* delete production schedule */
function scheduleDelete(e){
    ActivarSubMenu(e);
    $(".title").html("Production Schedule Edit");
    $( ".ajax" ).load( "schedule-delete.html");
	window.location.hash = "#sd";
 	$(".all-check").attr('display', 'none');
}
/* new PO */
function PONew(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "po-new.html", function() {
		var dates = document.querySelectorAll('input[type=date]')
		for (var i = 0; i < dates.length; i++)
			dates[i].value = date();
		
    });
	 MaterialDescription();
}
/* Edit PO */
function POEdit(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "po-edit.html", function() {
      //alert( "Load was performed." );
    });
	sessionStorage.option = 1;
}
/* delete PO */
function PODelete(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "po-delete.html", function() {
      //alert( "Load was performed." );
    });
	sessionStorage.option = 2;
}
/* Production confirm */
function ProductionConfirm(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "production-confirm.html", function() {
      //alert( "Load was performed." );
    });
	sessionStorage.option = 1;
}
/* Production adjust */
function ProductionAdjust(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "production-adjust.html", function() {
      tooltip('.adjust-th');
    });
	sessionStorage.option = 2;
}
/* delivery new */
function DeliveryNew(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "delivery-new.html", function() {
    });
    sessionStorage.option = 3;
}
/* delivery confirm */
function DeliveryConfirm(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "delivery-confirm.html", function() {
    });
}
/* delivery edit */
function DeliveryEdit(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "delivery-edit.html", function() {
    });
}
/* user new*/
function UserNew(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "user-new.html", function() {
    });
    sessionStorage.option = 3;
}
/* user edit */
function UserEdit(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "user-edit.html", function() {
    });
}
/* user delete */
function UserDelete(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "user-delete.html", function() {
    });
}
/*End sub menus */

/* 
*   @funciones generales
*
*
*
*
*
/*
/* popp ups */
function openPopup(header, message){
     $('.popup').fadeIn(200,function(){
            $('.info').animate({'top':'35%'},200);
        });
        return false;
	
}
function popInfo(header, message, timeout)
{
	document.getElementById('popheader').innerHTML = header;
    document.getElementById('pop-message').innerHTML = message;
	openPopup();
	if (timeout > 0)// to auto close the popup
		setTimeout(function(){closePopup();},timeout);
}
function closePopup(){
    $('.info').animate({'top':'-100%'},500,function(){
            $('.popup').fadeOut('fast');
        });
}
/* open tooltip */
function tooltip(elemento, text, pos)
{
    $(elemento).tooltipster({
        animation: 'grow',
        delay: 50,
        content: text,
		position: pos,
        theme: 'tooltipster-punk-blue', 
    });
}

/* add the table sorter function*/
function tablesort(table) // table received '.' for class '#' for id
{
    $(table).tablesorter();
}
/* loading page, processing info, etc*/
function loadpage(){
    txt = 'Loading . . .';
    openprocessing();
}
function openprocessing(){
    $('#msg-text').text(txt);
    $('#msg-img').attr("src", imgprocessing); //cambiar a img
     $('.processing').fadeIn(200,function(){
            $('.message').animate({'top':'35%'},200);
        });
        return false;
}
function closeprocessing(){
    $('.message').animate({'top':'-100%'},500,function(){
            $('.processing').fadeOut('fast');
        });
}
/* login enter button*/
function enterbutton()
{
    document.onkeypress = keyPress;

        function keyPress(e)
        {
            var x = e || window.event;
            var key = (x.keyCode || x.which);
             if(key == 13 || key == 3){
             obtenerToken();
             document.getElementById('btnlgn').focus();
        }
    }
}
/* Check all */
function checkAll()
{
	var checkSchedule = document.getElementById('checkSchedule');
	
	if (checkSchedule.checked == true)
			$('.all-check').prop("checked", true);
	else
			$('.all-check').prop("checked", false);
}
/* Fecha */
function date(wn){ 
    var d = new Date();
    var mes = d.getMonth()+1;
    var dia = d.getDate();
    if (mes < 10)
        mes = '0' + mes;
    if (dia < 10)
        dia = '0' + dia;
    var date = d.getFullYear() + '-' + mes + '-' + dia;
	if (wn == 1)
		$('#date').val(date);
	sessionStorage.date = date;
	return date;
}
function validation()
{
	var count = 0;
	var inputs = document.getElementById('inputs').querySelectorAll('input');
	for (var i = 0; i < inputs.length; i++) {
		tooltip(inputs[i], '', 'right');
		$(inputs[i]).tooltipster('disable');
		if (inputs[i].checkValidity() == false) {
			$(inputs[i]).tooltipster('content',inputs[i].validationMessage);
			$(inputs[i]).tooltipster('enable');
			$(inputs[i]).tooltipster('show');
			count++;
		}
	}
	var selects = document.getElementById('inputs').querySelectorAll('select');
	for (var i = 0; i < selects.length; i++) {
		tooltip(selects[i], 'Please select a valid option.', 'right');
		$(selects[i]).tooltipster('disable');
		if (selects[i].checkValidity() == false) {
			$(selects[i]).tooltipster('content', 'Please select a valid option.');
			$(selects[i]).tooltipster('enable');
			$(selects[i]).tooltipster('show');
			count++;
		}
	}
	if (inputs[3].value != inputs[4].value)
		{
			$(inputs[3]).tooltipster('content', "Passwords doesn't match.");
			$(inputs[4]).tooltipster('content', "Passwords doesn't match.");
			$(inputs[3]).tooltipster('enable');
			$(inputs[3]).tooltipster('show');
			$(inputs[4]).tooltipster('enable');
			$(inputs[4]).tooltipster('show');
			count++;
		}
	if (inputs[3].value.length < 5 || inputs[3].value.length > 10 || inputs[4].value.length < 5 || inputs[4].value.length > 10)
		{
			$(inputs[3]).tooltipster('content', "Please enter a 5 to 10 characters password.");
			$(inputs[4]).tooltipster('content', "Please enter a 5 to 10 characters password.");
			$(inputs[3]).tooltipster('enable');
			$(inputs[3]).tooltipster('show');
			$(inputs[4]).tooltipster('enable');
			$(inputs[4]).tooltipster('show');
			count++;
		}
	//alert(count);
	
}
