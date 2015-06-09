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
var ids = [];
var index = [];
var materials = [];

/* page start */
function login()
{
   enterbutton('btnlgn');
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
	var rows = tb.getElementsByTagName("tr");
	if (rows.length > 0)
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
	var rows = tb.getElementsByTagName("tr");
	if (rows.length > 0)
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
	$('.popup2').fadeIn(200,function(){
            $('.info').animate({'top':'35%'},200);
        });
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
/* Daily report*/
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
	var rows = tb.getElementsByTagName("tr");
	if (rows.length > 0)
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
	var rows = tb.getElementsByTagName("tr");
	if (rows.length > 0)
		{
			var line = 0, model = 0, owner = '', lot = 0, sDate = mull, start = false;
			var schedule = [];
			for (var i = 0; i < rows.length; i++)
				{
					line = document.getElementById('line').value;
					model= rows[i].children[1].children[0].value;
					owner = rows[i].children[2].children[0].value.toUpperCase();
					lot = rows[i].children[3].children[0].value;
					sDate = rows[i].children[4].children[0].value;
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
	var rows = tb.getElementsByTagName("tr");
	if (rows.length > 0)
		tb.innerHTML = '';
	for (var i=0; i < schedule.length; i++)
		{
			var tr = tb.insertRow(i);
			tr.insertCell(0).innerHTML =  i+1;
			tr.insertCell(1).innerHTML =  '<input name="all-check" class="all-check" type="checkbox" value="'+schedule[i].id+'"></input>';
			tr.insertCell(2).innerHTML =  '<input type="number" value="'+schedule[i].number+'"></input>';
			tr.insertCell(3).innerHTML =  '<input type="text" value="'+schedule[i].owner+'"></input>';
			tr.insertCell(4).innerHTML =  '<input type="number" value="'+schedule[i].lot+'"></input>';
			tr.insertCell(5).innerHTML =  '<select><option value="'+schedule[i].lineId+'">'+schedule[i].line+'</option><option value="1">A</option><option value="2">B</option><option value="3">C</option><option value="4">H</option></select>';
			tr.insertCell(6).innerHTML =  '<input type="date" value="'+schedule[i].startDate+'"></input>';
		}
	closeprocessing(); 
}
/* Delete Schedule */
function ScheduleDeleteInfo(schedule)
{
	var tb = document.getElementById('schedule-edit');
	var rows = tb.getElementsByTagName("tr");
	if (rows.length > 0)
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
function saveIds()
{
	ids = []; index = [];
	var allcheck = document.getElementsByName('all-check');
	if (allcheck.length > 0)
	{
		for(var i = 0;i < allcheck.length; i++)
		{
			if(allcheck[i].checked == true)
			{ids.push(allcheck[i].value);index.push(i)}
		}
		return ids;
	}
	else
	{
		closeprocessing();
		popInfo('Error', 'There is no data to process it.')
	}
	
}
function ScheduleEditCheck () {
	openprocessing();
	saveIds();
	if (index[0] != null)
	{
		var data = [];
		var tb = document.getElementById('schedule-edit');
		var rows = tb.getElementsByTagName("tr");
		for (var i = 0; i < ids.length; i++)
			{
				id= ids[i];
				model= rows[index[i]].children[2].children[0].value;
				owner = rows[index[i]].children[3].children[0].value.toUpperCase();
				lot = rows[index[i]].children[4].children[0].value;
				line = rows[index[i]].children[5].children[0].value;
				sDate = rows[index[i]].children[6].children[0].value;
				data.push( {id: id, line: line, model : model, owner:owner, lot: lot, date: sDate})

			}
		ScheduleEdit(data);
	}
	else
	{
		closeprocessing();
		popInfo('Error', 'There is no data to process it.')
	}
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
	
	var rows = tb.getElementsByTagName("tr");
	if (rows.length > 0)
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
			tr.insertCell(7).innerHTML =  '<input readonly type="text" value="'+po[i].date+'"></input>';
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
	var rows = document.getElementsByTagName("tr");
	var line = rows[c].cells[6].firstChild;
	if (n=='')
		line.value = '';
	else
		line.value = models[n].line.description;
}
function savePo(){
	openprocessing();
	var tb = document.getElementById('po');
	var rows = tb.getElementsByTagName("tr");
	if (rows.length > 0)
		{
			var po = 0, sapnumber = '', description = '', qty = 0, model = 0, line = 0, date = null, modelId =0, start = false;
			var poArray = [];
			for (var i = 0; i < rows.length; i++)
				{
					po = rows[i].children[1].children[0].value;
					sapnumber = rows[i].children[2].children[0].value;
					description = rows[i].children[3].children[0].value;
					qty = rows[i].children[4].children[0].value;
					model = models[rows[i].children[5].children[0].value];
					if (model != null)
						modelId = model.id
					else 
						modelId = 0;
					line = rows[i].children[6].children[0].value;
					date = rows[i].children[7].children[0].value;
					if (po > 0 & sapnumber != ''  & description != '' & qty > 0 & modelId > 0 & line != '' & date != '' )
						{	
							poArray.push({po: po, sapnumber: sapnumber, description:description, qty: qty, model: modelId, line: line, date: date, subcontractor: sessionStorage.subcontractor});
						}
					else
						{
							closeprocessing();
							popInfo("Error", "Data error, please fill correctly .");
							break;
							
						}
				}
			if (poArray.length > 0)
				{poAdd(poArray);}
			else
				{
					popInfo("Error", "Data error, please fill correctly ."); 
				}
		}
}
/* production confirm / update  */
function productionConfirm(material)
{
	materials = material;
    var tb = document.getElementById('model-pos');
	var rows = tb.getElementsByTagName("tr");
	if (rows.length > 0)
		tb.innerHTML = '';
	for (var i=0; i < material.length; i++)
		{
			var tr = tb.insertRow(i);
			if (sessionStorage.option == 5 || sessionStorage.option == 4)
				tr.insertCell(0).innerHTML =  '<input name="all-check" class="all-check" type="checkbox" value="'+material[i].idMaterial+'"></input>';
			else
				tr.insertCell(0).innerHTML =  '<input name="all-check" class="all-check" type="checkbox" value="'+material[i].id+'"></input>';
			tr.insertCell(1).innerHTML =   '<input type="number" value="'+material[i].poId+'" readonly class="prod"></input>';
			tr.insertCell(2).innerHTML =  '<input type="text" value="'+material[i].number+'" readonly></input>';
			tr.insertCell(3).innerHTML =  '<input type="text" value="'+material[i].description+'" readonly></input>';
			tr.insertCell(4).innerHTML =  '<input type="number" value="'+material[i].qty+'" readonly class="prod"></input>';
			tr.insertCell(5).innerHTML =  '<input type="text" value="'+material[i].line+'" readonly></input>';
            if (sessionStorage.option == 1)
            {
				tr.insertCell(6).innerHTML =  '<input type="date" value="'+material[i].date+'" readonly></input>';
                tr.insertCell(7).innerHTML =  '<input type="number" value="'+material[i].produced+'" readonly class="prod"></input>';
                tr.insertCell(8).innerHTML =  '<input type="number" value="'+material[i].max+'" readonly class="prod"></input>';
                tr.insertCell(9).innerHTML =  '<input type="number" min="0" max="'+material[i].max+'" value="'+material[i].max+'"></input>';
            }
            if (sessionStorage.option == 2)
            {
				tr.insertCell(6).innerHTML =  '<input type="date" value="'+material[i].date+'" readonly></input>';
                tr.insertCell(7).innerHTML =  '<input type="number" value="'+material[i].produced+'" readonly class="prod"></input>';
				tr.insertCell(8).innerHTML =  '<input type="number" value="'+material[i].delivered+'" readonly class="prod"></input>';
                tr.insertCell(9).innerHTML =  '<input type="number" min="'+material[i].delivered+'" max="'+material[i].qty+'" value="'+material[i].delivered+'"></input>';
            }
             if (sessionStorage.option == 3)
            {
				tr.insertCell(6).innerHTML =  '<input type="date" value="'+material[i].date+'" readonly></input>';
                tr.insertCell(7).innerHTML =  '<input type="number" value="'+material[i].produced+'" readonly class="prod"></input>';
                tr.insertCell(8).innerHTML =  '<input type="number" value="'+material[i].delivered+'" readonly></input>';
                tr.insertCell(9).innerHTML =  '<input type="number" value="'+material[i].max+'" readonly></input>';
                tr.insertCell(10).innerHTML =  '<input type="text" ></input>';
				tr.insertCell(11).innerHTML =  '<input type="number" min="'+material[i].delivered+'" max="'+material[i].max+'"></input>';
            }
			if (sessionStorage.option == 4)
            {
				tr.insertCell(6).innerHTML =  '<input type="number" value="'+material[i].produced+'" readonly class="prod"></input>';
				tr.insertCell(7).innerHTML =  '<input type="date" value="'+material[i].date+'" readonly></input>';
                tr.insertCell(8).innerHTML =  '<input type="number" value="'+material[i].devqty+'" readonly></input>';
                tr.insertCell(9).innerHTML =  '<input type="number" value="'+material[i].packingQty+'" readonly></input>';
                tr.insertCell(10).innerHTML =  '<input type="number" value="" min="0"></input>';
            }
            if (sessionStorage.option == 5)
            {
				tr.insertCell(6).innerHTML =  '<input type="date" value="'+material[i].date+'" readonly></input>';
                tr.insertCell(7).innerHTML =  '<input type="number" value="'+material[i].produced+'" readonly></input>';
                tr.insertCell(8).innerHTML =  '<input type="number" value="'+material[i].devqty+'" readonly></input>';
                tr.insertCell(9).innerHTML =  '<input type="number" value="'+material[i].maxd+'" readonly></input>';
                tr.insertCell(10).innerHTML =  '<input type="text" value="'+material[i].packing+'"></input>';
                 tr.insertCell(11).innerHTML =  '<input type="number" min="0" max="'+material[i].maxd+'" value="'+material[i].packingQty+'" ></input>';
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
/* Production save */
function productionSaveInit(){
	var material = 0, max = 0, min = 0, prod = 0, mq = 0, qty = 0, materials = [];
	var m = document.getElementById('modelNo');
	if (m.value > 0)
	{
		openprocessing();
		var trs = document.getElementsByTagName('tr');
		for (var i = 1; i < trs.length; i++)
		{
			if (trs[i].firstChild.firstChild.checked = true)
			{
				material = trs[i].firstChild.firstChild.value;
				qty = trs[i].children[9].firstChild.value;
				if (sessionStorage.option == 1)
				{
					max = trs[i].children[8].firstChild.value;
					if (parseInt(qty) <= parseInt(max) & parseInt(qty) > 0)
					{
						materials.push({material : material, qty : qty});
						if (materials != null)
							productionSave(materials);
						else
						{
							closeprocessing();
							popInfo('Error', 'No data received');
						}	
					}
					else
					{
						closeprocessing();
						popInfo('Error', '"Qty" must be greater than 0 and lower or equal than "Max Qty"');	
					}
				}
				if (sessionStorage.option == 2)
				{
					min = trs[i].children[8].firstChild.value;
					prod = trs[i].children[7].firstChild.value;
					mq = trs[i].children[4].firstChild.value;
					if (parseInt(qty) >= parseInt(min) & parseInt(qty) <= parseInt(mq))
					{
						materials.push({material : material, qty : (qty - prod)});
						if (materials != null)
							productionSave(materials);
						else
						{
							closeprocessing();
							popInfo('Error', 'No data received');
						}	
					}
					else
					{
						closeprocessing();
						popInfo('Error', '"Adjust Qty" must be greater or equal than "Deliv. Qty" and lower or equal than "PO Qty"');	
					}
				}	
			}
		}
	}
	else
	{
		popInfo('Error', "Please enter a valid model number");
	}
	
}
function ReceivingSaveInit(){
	var material = 0, max = 0, min = 0, packqty = 0, qty = 0, packing = 0, materials = [];
	var p = document.getElementById('p-no');
	if (p.value != '')
	{
		openprocessing();
		var trs = document.getElementsByTagName('tr');
		for (var i = 1; i < trs.length; i++)
		{
			if (trs[i].firstChild.firstChild.checked = true)
			{
				material = trs[i].firstChild.firstChild.value;
				if (sessionStorage.option == 3 || sessionStorage.option == 5)
				{
					qty = trs[i].children[11].firstChild.value;
					max = trs[i].children[9].firstChild.value;
					packing = trs[i].children[10].firstChild.value;
					if (parseInt(qty) <= parseInt(max) & parseInt(qty) > 0)
					{
						materials.push({material : material, qty : qty, packing: packing});
						if (materials != null)
							DeliverySave(materials);
						else
						{
							closeprocessing();
							popInfo('Error', 'No data received');
						}	
					}
					else
					{
						closeprocessing();
						popInfo('Error', '"Qty" must be greater than 0 and lower or equal than "Max Qty"');	
					}
				}
				if (sessionStorage.option == 4)
				{
					qty = trs[i].children[10].firstChild.value;
					max = trs[i].children[4].firstChild.value;
					min = trs[i].children[8].firstChild.value;
					packqty = trs[i].children[9].firstChild.value;
					qty = trs[i].children[10].firstChild.value;
					if (parseInt(qty) >= parseInt(min) & parseInt(qty) <= parseInt(max))
					{
						materials.push({material : material, qty : qty, packqty : packqty, packing: p.value, subcontractor: sessionStorage.subcontractor});
						if (materials != null)
							DeliverySave(materials);
						else
						{
							closeprocessing();
							popInfo('Error', 'No data received');
						}	
					}
					else
					{
						closeprocessing();
						popInfo('Error', '"Actual Qty" must be greater or equal than "Deliv. Qty" and lower or equal than "PO Qty"');	
					}
				}
			}
		}
	}
	else
	{
		if (sessionStorage.option == 3)
			popInfo('Error', "Please enter a valid model number");
		else
			popInfo('Error', "Please enter a valid packing number");
	}
	
}
function clickDelivery()
{
	openprocessing();
    var p = document.getElementById('p-no').value;
	if (sessionStorage.option == 3)
	{
		if (p > 0)
		{
			delivery(p);
		}
		else
		{
			closeprocessing();
			popInfo('Information', 'Please enter a valid PO number.')
		}
	}
	if (sessionStorage.option == 4 || sessionStorage.option == 5)
	{
		if (p != '')
		{
			deliveryConfirm(p);
		}
		else
		{
			closeprocessing();
			popInfo('Information', 'Please enter a valid packing number.')
		}
	}
}
/*  user save */
function validation()
{
	openprocessing();
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
	if (count == 0)
		saveUser();
	else
		closeprocessing();
	
}
function saveUser(){
        var email = '', password = '', name = '', lastname = '', typeId = 0, subcontractor = 0;
        var userArray = [];

        email = document.getElementById('email').value;
        password= document.getElementById('password').value;
        name = document.getElementById('name').value;
        lastname = document.getElementById('lastname').value;
   
        typeId = document.getElementById('selectType').value;
        subcontractor = document.getElementById('selectSubcontractor').value;

  
  
        if (email != '' & password != ''  & name != '' & lastname != '' & typeId > 0 & subcontractor > 0 )
            {	
                userArray.push({email: email, password : password, name: name, lastname: lastname, typeId: typeId, subcontractor: subcontractor});
            }
        else
            {
                closeprocessing();
            }
        if (userArray.length > 0)
        {userAdd(userArray);}
        else
            {
                popInfo("User Information", "Data error, please fill correctly."); 
            }
    
}
/* user delete */
function deleteUser()
{
    userDelete(document.getElementById('f-email').value);
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

function clickUser()
{
    var email = document.getElementById('f-email').value;
    userService(email);
}
function userEdit(user)
{
   
    document.getElementById('name').value = user[0].name;
    document.getElementById('lastname').value = user[0].lastname;
    document.getElementById('email').value = user[0].email;
    if (sessionStorage.option == 1)
    {
        $("#selectType").val(user[0].idType);
        $("#selectSubcontractor").val(user[0].subcontractorId);
    }
    if (sessionStorage.option == 2)
    {
        document.getElementById('type').value = user[0].type;
        document.getElementById('subcontractor').value = user[0].subcontractor;
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
	enterbutton('btn-find');
}
/* delete production schedule */
function scheduleDelete(e){
    ActivarSubMenu(e);
    $(".title").html("Production Schedule Edit");
    $( ".ajax" ).load( "schedule-delete.html");
	window.location.hash = "#sd";
	enterbutton('btn-find');
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
    });
	enterbutton('btn-find');
	sessionStorage.option = 1;
}
/* delete PO */
function PODelete(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "po-delete.html", function() {
    });
	enterbutton('btn-find');
	sessionStorage.option = 2;
}
/* Production confirm */
function ProductionConfirm(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "production-confirm.html", function() {
    });
	enterbutton('btn-find');
	sessionStorage.option = 1;
}
/* Production adjust */
function ProductionAdjust(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "production-adjust.html", function() {
      tooltip('.adjust-th');
    });
	enterbutton('btn-find');
	sessionStorage.option = 2;
}
/* delivery new */
function DeliveryNew(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "delivery-new.html", function() {
    });
	enterbutton('btn-find');
    sessionStorage.option = 3;
}
/* delivery edit */
function DeliveryEdit(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "delivery-edit.html", function() {
    });
	enterbutton('btn-find');
	sessionStorage.option = 5;
}
/* Receiving confirm */
function ReceivingConfirm(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "receiving-confirm.html", function() {
    });
	enterbutton('btn-find');
	sessionStorage.option = 4;
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
	sessionStorage.option = 1;
}
/* user delete */
function UserDelete(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "user-delete.html", function() {
    });
	sessionStorage.option = 2;
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
function openPopup(){
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
function enterbutton(element)
{
    document.onkeypress = keyPress;

        function keyPress(e)
        {
            var x = e || window.event;
            var key = (x.keyCode || x.which);
             if(key == 13 || key == 3){
             //obtenerToken();
             document.getElementById(element).focus();
			document.getElementById(element).onclick();
        }
    }
}
/* Check all */
function checkAll(element)
{	
	if (element.checked == true)
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
