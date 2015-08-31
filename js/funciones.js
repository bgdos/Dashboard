/**
 * Production Dashboard
 *
 * @version 1 (06. 23 June 2015)
 * @authors Fausto Serrano & Juan Salgado
 * @requires jQuery, progress, highcharts, jquery.datatables, tooltipster, weather widget (http://www.theweather.com/)
 * @see http://workshop.rs
 *
 * @param  {Number} percent
 * @param  {Number} $element progressBar DOM element
 */
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
var imgconfirmation = 'images/loading_anim.gif'; // confirmation image
var models = [];
var ids = [];
var index = [];
var materials;
var ie;

/* page start */
function login()
{
    validarNavegador();
    enterbutton('btnlgn');
    passMessage();
}
function start()
{
	document.getElementById('menuAdmin').style.display = 'none';
    browser = sessionStorage.browser;
    loadpage();
    validarUsuario();
    if (window.location.href == urlServer + 'main.html')
    {
        $('.prod-status').dataTable({paging:false,order: []});
		date(2);
		productionSchedule();
	}
    if (window.location.href == urlServer + 'daily-report.html')
    {
        date(1);
        $('.daily-detail').dataTable({paging:false,order: []});
    }
	if (window.location.href == urlServer + 'model-detail.html')
    {
        tooltip('.detail-wrap', 'Click here for details');
		loadModelDetail(sessionStorage.model);
    }
	if (window.location == urlServer + 'schedule.html')
		setTimeout(function(){ closeprocessing();}, 2500);
	else
		closeprocessing();
    $('#user-name').text(sessionStorage.username + " " + sessionStorage.userlastname);
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
    try{document.getElementById('checkSchedule').checked = false;}
    catch(err){}
    
    txt = 'Processing . . .'; //texto
	if (window.location.href == urlServer + 'main.html')
		$('.prod-status').dataTable().fnDestroy();
    
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
			tr.setAttribute('onclick', 'onclickSchedule('+schedule[i].id +', '+ schedule[i].number + ', '+ schedule[i].lot +')');
			
			modelsArray.push(schedule[i].percent);
		}
	if (modelsArray.length > 0)
		{
			progress(modelsArray);
            if (!sessionStorage.browser)
            {
                $('.prod-status').dataTable({paging: false, "order": [[ 4, "asc" ]]});
                //$('tbody').css({height: '59vh'});
            }
            else
            {$('.prod-status').dataTable({paging: false, "sScrollY": 600, "bScrollCollapse": true, "bSortCellsTop": true, "sScrollX": false, "order": [[ 4, "asc" ]]});
            }
		}
	closeprocessing();
}
function onclickSchedule(model, number, lot)
{
	sessionStorage.model = model;
    sessionStorage.modelnumber = number;
    sessionStorage.lot = lot;
	window.location = 'model-detail.html';
}
/* Model produced / delivered details */
function productionStatus(daily)
{	
	for(var i = 0; i < daily.length; i++)
		{
			if (daily[i].description == 'REAR FRAME')
				{
                    document.getElementById('rf-dp').parentNode.parentNode.parentNode.style.display = 'inline';
					document.getElementById('rf-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('rf-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('rf-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('rf-td').innerHTML = " " + daily[i].sumD;
					
				}
			if (daily[i].description == 'REAR BUMPER')
				{
                    document.getElementById('rb-dp').parentNode.parentNode.parentNode.style.display = 'inline';
					document.getElementById('rb-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('rb-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('rb-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('rb-td').innerHTML = " " + daily[i].sumD;
					
				}
			if (daily[i].description == 'LANDING GEAR')
				{
                    document.getElementById('lg-dp').parentNode.parentNode.parentNode.style.display = 'inline';
					document.getElementById('lg-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('lg-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('lg-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('lg-td').innerHTML = " " + daily[i].sumD;
					
				}
			if (daily[i].description == 'LARGE SLIDER')
				{
                    document.getElementById('ls-dp').parentNode.parentNode.parentNode.style.display = 'inline';
					document.getElementById('ls-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('ls-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('ls-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('ls-td').innerHTML = " " + daily[i].sumD;
					
				}
			if (daily[i].description == 'SMALL SLIDER')
				{
                    document.getElementById('sl-dp').parentNode.parentNode.parentNode.style.display = 'inline';
					document.getElementById('sl-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('sl-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('sl-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('sl-td').innerHTML = " " + daily[i].sumD;
					
				}
			if (daily[i].description == 'X-MEM FWD')
				{
                    document.getElementById('xf-dp').parentNode.parentNode.parentNode.style.display = 'inline';
					document.getElementById('xf-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('xf-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('xf-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('xf-td').innerHTML = " " + daily[i].sumD;
					
				}
			if (daily[i].description == 'X-MEM DROP')
				{
                    document.getElementById('xd-dp').parentNode.parentNode.parentNode.style.display = 'inline';
					document.getElementById('xd-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('xd-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('xd-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('xd-td').innerHTML = " " + daily[i].sumD;
					
				}
			if (daily[i].description == 'FRONT POST')
				{
                    document.getElementById('fp-dp').parentNode.parentNode.parentNode.style.display = 'inline';
					document.getElementById('fp-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('fp-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('fp-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('fp-td').innerHTML = " " + daily[i].sumD;
					
				}
            if (daily[i].description == 'PINTLE HOOK')
				{
                    document.getElementById('ph-dp').parentNode.parentNode.parentNode.style.display = 'inline';
					document.getElementById('ph-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('ph-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('ph-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('ph-td').innerHTML = " " + daily[i].sumD;
					
				}
            if (daily[i].description == 'X-MEMBER ASSY')
				{
                    document.getElementById('xa-dp').parentNode.parentNode.parentNode.style.display = 'inline';
					document.getElementById('xa-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('xa-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('xa-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('xa-td').innerHTML = " " + daily[i].sumD;
					
				}
            if (daily[i].description == 'TRANSITION ASSY')
				{
                    document.getElementById('ta-dp').parentNode.parentNode.parentNode.style.display = 'inline';
					document.getElementById('ta-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('ta-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('ta-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('ta-td').innerHTML = " " + daily[i].sumD;
					
				}
            if (daily[i].description == 'TIRE BOX')
				{
                    document.getElementById('tb-dp').parentNode.parentNode.parentNode.style.display = 'inline';
					document.getElementById('tb-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('tb-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('tb-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('tb-td').innerHTML = " " + daily[i].sumD;
					
				}
            if (daily[i].description == 'ROLLER CONVEYOR')
				{
                    document.getElementById('rc-dp').parentNode.parentNode.parentNode.style.display = 'inline';
					document.getElementById('document.removeChild(elem);-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('rc-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('rc-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('rc-td').innerHTML = " " + daily[i].sumD;
					
				}
            if (daily[i].description == 'BASE ASSY')
				{
                    document.getElementById('ba-dp').parentNode.parentNode.parentNode.style.display = 'inline';
					document.getElementById('ba-dp').innerHTML = daily[i].dailyP + " /";
					document.getElementById('ba-tp').innerHTML = " " + daily[i].sumP;
					document.getElementById('ba-dd').innerHTML = daily[i].dailyD  + " /";
					document.getElementById('ba-td').innerHTML = " " + daily[i].sumD;
					
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
	loadSubAssyDetail(sessionStorage.model, obj);
	
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
        try{
            $('#subcontractor').tooltipster('destroy')
        }
		catch(err){
            
        }
	}
	else{
		tooltip('#subcontractor', 'Please select a subcontractor');
		$('#subcontractor').tooltipster('show');
	}
}
function loadDailyReport(daily)
{
    $('.daily-detail').dataTable().fnDestroy();
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
    $('.daily-detail').dataTable({ paging : false, order: [] });
    if (daily.length>0)
        createExportButton('DataTables_Table_0');
	closeprocessing();
}
/* Discrepancy Report */
function discrepancyChart (subcontractors, date, date2) {
	var amex = 0, ata = 0, clave = 0, gluz = 0, jem = 0, sanwon = 0, yient = 0, aver = 0, count = 0, series =[], data = [], pie = [];
	for (var i = 0; i < subcontractors.length; i++)
	{
		if (subcontractors[i].id == 1)
			amex = subcontractors[i].discrepancies.length;
		if (subcontractors[i].id == 2)
			ata = subcontractors[i].discrepancies.length;
		if (subcontractors[i].id == 3)
			clave = subcontractors[i].discrepancies.length;
		if (subcontractors[i].id == 5)
			gluz = subcontractors[i].discrepancies.length;
		if (subcontractors[i].id == 9)
			jem = subcontractors[i].discrepancies.length;
		if (subcontractors[i].id == 12)
			sanwon = subcontractors[i].discrepancies.length;
		if (subcontractors[i].id == 14)
			yient = subcontractors[i].discrepancies.length;
	}
	if (amex > 0)
	{
		aver += amex;
		count++;
		data.push(['Amex', amex]);
	}
	if (ata > 0)
	{
		aver += ata;
		count++;
		data.push(['Ata', ata]);
	}
	if (clave > 0)
	{
		aver += clave;
		count++;
		data.push(['Clave', clave]);
	}
	if (gluz > 0)
	{
		aver += gluz;
		count++;
		data.push(['GLuz', gluz]);
	}
	if (jem > 0)
	{
		aver += jem;
		count++;
		data.push(['JEM', jem]);
	}
	if (sanwon > 0)
	{
		aver += sanwon;
		count++;
		data.push(['Sanwon', sanwon]);
	}
	if (yient > 0)
	{
		aver += yient;
		count++;
		data.push(['Yient', yient]);
	}
	aver = aver / count;
	/* datos para las barras*/
	for (var i = 0; i < count; i++)
	{
		series.push(
			{
            type: 'column',
            name: data[i][0],
            data: [data[i][1]]
			});
	}
	/* datos para el promedio */
	series.push({
            type: 'spline',
            name: 'Average',
            data: [aver],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }});
	/* datos para el pie */
	for (var i = 0; i < count; i++)
	{
		pie.push(
			{
                name: data[i][0],
                y: data[i][1],
                color: Highcharts.getOptions().colors[i] // Jane's color
            });
	}
	/* crear pie */
	series.push({
            type: 'pie',
            name: 'Total Discrepancies',
			center: [120, 150],
            size: 140,
            showInLegend: false,
			allowPointSelect: true,
            dataLabels: {
                enabled: true,
				format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
			data: pie});
	aver = aver / count;
	$('#graph').highcharts({
        title: {
            text: 'Subcontractor Discrepancies'
        },
        /*xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep','Oct','Nov', 'Dic']
        },*/
		xAxis: {
            categories: ['From: ' + date + ' to: ' + date2]
        },
        labels: {
            items: [{
                html: 'Total discrepancies by subcontractor',
                style: {
                    left: '50px',
                    top: '18px',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        },
        series: series
    });
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
	var line = document.getElementById('line').value;
	if (line != '')
		{
			var model = 0, owner = '', lot = 0, sDate = null, start = false;
			var schedule = [];
			for (var i = 0; i < rows.length; i++)
				{
					
					model= rows[i].children[1].children[0].value;
					owner = rows[i].children[2].children[0].value.toUpperCase();
					lot = rows[i].children[3].children[0].value;
					sDate = rows[i].children[4].children[0].value;
					if (line != '' & model > 0  & owner != '' & lot > 0 & sDate != '' )
						{	
							schedule.push({line: line, model : model, owner:owner, lot: lot, date: sDate});
						}
					else
							break;
				}
			if (schedule.length > 0)
				{ScheduleAdd(schedule);$('#line').tooltipster('destroy');}
			else
				{
					closeprocessing();
					popInfo("Information", "Error! please fill correctly."); 
					if (line == ""){tooltip('#line', "Please select a line"); $('#line').tooltipster('show');}
					else $('#line').tooltipster('destroy');
				}
		}
	else
	{
		closeprocessing();
		popInfo("Information", "Error! please fill correctly (Line and Model information).");
	}
}
/* Edit Schedule */
function ScheduleEditInfo(schedule)
{
    document.getElementById('checkSchedule').className = 'check-all'
	var tb = document.getElementById('schedule-edit');
	var rows = tb.getElementsByTagName("tr");
	if (rows.length > 0)
		tb.innerHTML = '';
	for (var i=0; i < schedule.length; i++)
		{
			var tr = tb.insertRow(i);
			tr.insertCell(0).innerHTML =  i+1;
			tr.insertCell(1).innerHTML =  '<input name="all-check" class="all-check" onclick="checkCheckBoxes()" type="checkbox" value="'+schedule[i].id+'"></input>';
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
    document.getElementById('checkSchedule').className = 'check-all'
	var tb = document.getElementById('schedule-edit');
	var rows = tb.getElementsByTagName("tr");
	if (rows.length > 0)
		tb.innerHTML = '';
	for (var i=0; i < schedule.length; i++)
		{
			var tr = tb.insertRow(i);
			tr.insertCell(0).innerHTML =  i+1;
			tr.insertCell(1).innerHTML =  '<input name="all-check" class="all-check" onclick="checkCheckBoxes()" type="checkbox" value="'+schedule[i].id+'"></input>';
			tr.insertCell(2).innerHTML =  schedule[i].number;
			tr.insertCell(3).innerHTML =  schedule[i].owner;
			tr.insertCell(4).innerHTML =  schedule[i].lot;
			tr.insertCell(5).innerHTML =  schedule[i].line;
			tr.insertCell(6).innerHTML =  schedule[i].startDate;
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
		popInfo('Information', 'Error! there is no data to process it.')
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
		popInfo('Information', 'Error! there is no data to process it.')
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
	tb = document.getElementById('purchase-edit');
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
			models = po[0].models;
		}
	var c = 1;
	$('.model').each(function(){	
		onchangeModelSelect($(this), c);
		c++;
	});	
	closeprocessing(); 
}
function purchaseOrderDelete(po)
{
	var tb;
	tb = document.getElementById('purchase-delete');
	
	var rows = tb.getElementsByTagName("tr");
	if (rows.length > 0)
		tb.innerHTML = '';
	for (var i=0; i < po.length; i++)
		{
			var tr = tb.insertRow(i);
			tr.insertCell(0).innerHTML =  i+1;
			tr.insertCell(1).innerHTML =  po[i].id;
			tr.insertCell(2).innerHTML =  po[i].material;
			tr.insertCell(3).innerHTML =  po[i].description ;
			tr.insertCell(4).innerHTML =  po[i].qty;
			tr.insertCell(5).innerHTML = po[i].model;
			tr.insertCell(6).innerHTML = po[i].line;
			tr.insertCell(7).innerHTML = po[i].date;
			if (po[i].produced > 0)
			{
				var qty = tr.insertCell(8);
				qty.innerHTML =  po[i].produced;
				qty.className = "prod-qty";
				tr.insertCell(9).innerHTML =  '<button onclick="poDelete('+po[i].materialId+')" disabled><img src="images/delete_32.png" style="height:14px"> Delete</button>';}
			else
			{
				tr.insertCell(8).innerHTML =  po[i].produced;
				tr.insertCell(9).innerHTML =  '<button onclick="poDelete('+po[i].materialId+')"><img src="images/delete_32.png" style="height:14px"> Delete</button>';}
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
                sapnumber = rows[i].children[2].children[0].value.toUpperCase();
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
            }
			if (poArray.length > 0)
				{poAdd(poArray);}
			else
				{
					popInfo("Information", "Error! please fill correctly ."); 
				}
		}
}
/* production confirm / update  */
function productionConfirm(material)
{
    $(":checkbox").prop('checked', false);
    $(":checkbox").addClass('check-all');
	materials = material;
    var tb = document.getElementById('model-pos');
	var rows = tb.getElementsByTagName("tr");
	if (rows.length > 0)
		tb.innerHTML = '';
	for (var i=0; i < material.length; i++)
		{
			var tr = tb.insertRow(i);
			if (sessionStorage.option == 5 || sessionStorage.option == 4)
				tr.insertCell(0).innerHTML =  '<input name="all-check" class="all-check" onclick="checkCheckBoxes()" type="checkbox" value="'+material[i].idMaterial+'"></input>';
			else
				tr.insertCell(0).innerHTML =  '<input name="all-check" onclick="checkCheckBoxes()" class="all-check" type="checkbox" value="'+material[i].id+'"></input>';
			tr.insertCell(1).innerHTML = material[i].poId;
            if (sessionStorage.option == 1)
            {
                tr.insertCell(2).innerHTML = material[i].number;
                tr.insertCell(3).innerHTML = material[i].description;
                tr.insertCell(4).innerHTML = material[i].qty;
                tr.insertCell(5).innerHTML = material[i].line;
				tr.insertCell(6).innerHTML = material[i].date;
                tr.insertCell(7).innerHTML = material[i].produced;
                tr.insertCell(8).innerHTML = material[i].max;
                tr.insertCell(9).innerHTML =  '<input type="number" min="0" max="'+material[i].max+'" value="'+material[i].max+'"></input>';
            }
            if (sessionStorage.option == 2)
            {
                tr.insertCell(2).innerHTML = material[i].number;
                tr.insertCell(3).innerHTML = material[i].description;
                tr.insertCell(4).innerHTML = material[i].qty;
                tr.insertCell(5).innerHTML = material[i].line;
				tr.insertCell(6).innerHTML = material[i].date;
                tr.insertCell(7).innerHTML = material[i].produced;
				tr.insertCell(8).innerHTML = material[i].delivered;
                tr.insertCell(9).innerHTML =  '<input type="number" min="'+material[i].delivered+'" max="'+material[i].qty+'" value="'+material[i].delivered+'"></input>';
            }
             if (sessionStorage.option == 3)
            {
                tr.insertCell(2).innerHTML = material[i].number;
                tr.insertCell(3).innerHTML = material[i].description;
                tr.insertCell(4).innerHTML = material[i].qty;
                tr.insertCell(5).innerHTML = material[i].line;
				tr.insertCell(6).innerHTML = material[i].date;
                tr.insertCell(7).innerHTML = material[i].produced;
                tr.insertCell(8).innerHTML = material[i].delivered;
                tr.insertCell(9).innerHTML = material[i].max;
                tr.insertCell(10).innerHTML =  '<input type="text" ></input>';
				tr.insertCell(11).innerHTML =  '<input type="number" min="'+material[i].delivered+'" max="'+material[i].max+'"></input>';
            }
			if (sessionStorage.option == 4)
            {
                tr.insertCell(2).innerHTML = material[i].subcontractor;
                tr.insertCell(3).innerHTML = material[i].number;
                tr.insertCell(4).innerHTML = material[i].description;
                tr.insertCell(5).innerHTML = material[i].qty;
                tr.insertCell(6).innerHTML = material[i].line;
				tr.insertCell(7).innerHTML = material[i].produced;
				tr.insertCell(8).innerHTML = material[i].date;
                tr.insertCell(9).innerHTML = material[i].devqty;
                tr.insertCell(10).innerHTML = material[i].packingQty;
                tr.insertCell(11).innerHTML =  '<input type="number" value="" min="0"></input>';
            }
            if (sessionStorage.option == 5)
            {
                tr.insertCell(2).innerHTML = material[i].number;
                tr.insertCell(3).innerHTML = material[i].description;
                tr.insertCell(4).innerHTML = material[i].qty;
                tr.insertCell(5).innerHTML = material[i].line;
				tr.insertCell(6).innerHTML = material[i].date;
                tr.insertCell(7).innerHTML = material[i].produced;
                tr.insertCell(8).innerHTML = material[i].devqty;
                tr.insertCell(9).innerHTML = material[i].maxd;
                tr.insertCell(10).innerHTML =  '<input type="text" value="'+material[i].packing+'" oninput="onlyTextAndNumber(event, this)"></input>';
                 tr.insertCell(11).innerHTML =  '<input type="number" min="0" max="'+material[i].maxd+'" value="'+material[i].packingQty+'" ></input>';
            }
			
		}
	closeprocessing(); 
}
function clickProduction()
{
	openprocessing();
    var po = document.getElementById('poNo').value;
	if (po > 0)
    	materialProduction(po);
	else
		{
			closeprocessing();
			popInfo('Information', 'Please enter a valid PO number.')
		}
}
/* Production save */
function productionSaveInit(){
	var material = 0, max = 0, min = 0, prod = 0, mq = 0, qty = 0, materials = [];
	var p = document.getElementById('poNo');
	if (p.value > 0)
	{
		openprocessing();
		var trs = document.getElementsByTagName('tr');
		for (var i = 1; i < trs.length; i++)
		{
			if (trs[i].firstChild.firstChild.checked == true)
			{
				material = trs[i].firstChild.firstChild.value;
				qty = trs[i].children[9].firstChild.value;
				if (sessionStorage.option == 1)
				{
					max = trs[i].children[8].innerHTML;
					if (parseInt(qty) <= parseInt(max) & parseInt(qty) > 0)
					{
						materials.push({material : material, qty : qty});	
					}
					else
					{
						closeprocessing();
						popInfo("Information", 'Error! "Qty" must be greater than 0 and lower or equal than "Max Qty"');	
					}
				}
				if (sessionStorage.option == 2)
				{
					min = trs[i].children[8].innerHTML;
					prod = trs[i].children[7].innerHTML;
					mq = trs[i].children[4].innerHTML;
					if (parseInt(qty) >= parseInt(min) & parseInt(qty) <= parseInt(mq))
					{
						materials.push({material : material, qty : (qty - prod)});
					}
					else
					{
						closeprocessing();
						popInfo("Information", 'Error! "Adjust Qty" must be greater or equal than "Deliv. Qty" and lower or equal than "PO Qty"');	
					}
				}	
			}
		}
		if (materials != null)
			productionSave(materials);
		else
		{
			closeprocessing();
			popInfo("Information", 'Error! no data received');
		}
	}
	else
	{
		popInfo("Information", 'Error! please enter a valid model number');
	}
	
}
function ReceivingSaveInit(){
	var material = 0, max = 0, min = 0, packqty = 0, qty = 0, packing = 0, poq = 0, paq= 0, materialsrec = [], po = 0;
	var p = document.getElementById('p-no');
	if (p.value != '')
	{
		openprocessing();
		var trs = document.getElementsByTagName('tr');
		for (var i = 1; i < trs.length; i++)
		{
			if (trs[i].firstChild.firstChild.checked == true)
			{
				material = trs[i].firstChild.firstChild.value;
				if (sessionStorage.option == 3 || sessionStorage.option == 5)
				{
					qty = trs[i].children[11].firstChild.value;
					max = trs[i].children[9].innerHTML;
					packing = trs[i].children[10].firstChild.value;
					if (parseInt(qty) <= parseInt(max) & parseInt(qty) > 0)
					{
						materialsrec.push({material : material, qty : qty, packing: packing});
					}
					else
					{
						closeprocessing();
						popInfo("Information", 'Error! "Qty" must be greater than 0 and lower or equal than "Max Qty"');	
					}
				}
				if (sessionStorage.option == 4)
				{
					qty = trs[i].children[11].firstChild.value;
					poq = parseInt(trs[i].children[5].innerHTML);
                    po = parseInt(trs[i].children[1].innerHTML);
					paq = parseInt(trs[i].children[9].innerHTML);
					packqty = trs[i].children[10].innerHTML;
					if (qty <= (poq-paq) & qty >= 0)
					{
						materialsrec.push({material : material, qty : qty, packqty : packqty, packing: materials[i-1].packingId, packingno: materials[i-1].packing, subcontractor: materials[i-1].subcontractorId, po : po});
					}
					else
					{
						closeprocessing();
						popInfo("Information", 'Error!"Actual Qty" must be greater or equal than "Deliv. Qty" and lower or equal than "PO Qty"');	
					}
				}
			}
		}
		if (materialsrec != null)
		{
			/*if (sessionStorage.option == 4)
			{
				if (qty != packqty)
				{
					sendMail(materialsrec[0].material.qty, materialsrec[0].material.packqty, materialsrec[0].material.packingno, materialsrec[0].subcontractor);
				}
			}*/
			DeliverySave(materialsrec);
		}
		else
		{
			closeprocessing();
			popInfo("Information", 'Error! no data received');
		}	
	}
	else
	{
		if (sessionStorage.option == 3)
			popInfo("Information", 'Error! please enter a valid model number');
		else
			popInfo("Information", 'Error! please enter a valid packing number');
	}
}
/*function sendMail(qty, packqty, packingno, sub) {
	var dif = qty - packqty;
   $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'XS8_tuhP9GeYBNoUDWXa_w',
        'message': {
          'from_email': 'OD@translead.com',
		  "from_name": "Outsourcing Dashboard",
          'to': [
              {
                'email': 'juans@translead.com',
                'name': 'Juan Salgado',
                'type': 'to'
              },
			  {
                'email': 'faustos@translead.com',
                'name': 'Fasuto Serrano',
                'type': 'to'
              }
            ],
          'autotext': 'true',
          'subject': 'Discrepancy '+ packingno +'!',
          'html': 'Please review and take the proper action...<br><br><table>'+
			'<thead><tr style="background:#3e5b7c; color:#fff;padding:5px;"><th>Packing</th><th>Pack Qty</th><th>Act. Qty</th><th>Discrepancy</th><th>Subcontractor</th></tr></thead>'+
			'<tbody><tr style="background:#ccc; padding:5px;"><td>'+ packingno +'</td><td>'+packqty+'</td><td></td>'+qty+'<td>'+dif+'</td><td>'+sub+'</td></tr></tbody></table>'
        }
      }
     }).done(function(response) {
       console.log(response); // if you're into that sorta thing
     });
}*/

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
	var p = document.getElementById('password');
	var c = document.getElementById('confirm');
	var selects = document.getElementById('inputs').querySelectorAll('select');
	if (sessionStorage.option == 3)
	{
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
		if (document.getElementById('div-subcontractor').style.display == 'inline')
		{
			for (var i = 0; i < selects.length; i++) 
			{
				tooltip(selects[i], 'Please select a valid option.', 'right');
				$(selects[i]).tooltipster('disable');
				if (selects[i].checkValidity() == false) {
					$(selects[i]).tooltipster('content', 'Please select a valid option.');
					$(selects[i]).tooltipster('enable');
					$(selects[i]).tooltipster('show');
					count++;
				}
			}
		}
		else
			{
				tooltip(selects[0], 'Please select a valid option.', 'right');
				$(selects[0]).tooltipster('disable');
				if (selects[0].checkValidity() == false) {
					$(selects[0]).tooltipster('content', 'Please select a valid option.');
					$(selects[0]).tooltipster('enable');
					$(selects[0]).tooltipster('show');
					count++;
				}
			}
		
		if (p.value != c.value)
		{
			$(p).tooltipster('content', "Passwords doesn't match.");
			$(c).tooltipster('content', "Passwords doesn't match.");
			$(p).tooltipster('enable');
			$(p).tooltipster('show');
			$(c).tooltipster('enable');
			$(c).tooltipster('show');
			count++;
		}
	if (p.value.length < 5 || p.value.length > 10 || c.value.length < 5 || c.value.length > 10)
		{
			$(p).tooltipster('content', "Please enter a 5 to 10 characters password.");
			$(c).tooltipster('content', "Please enter a 5 to 10 characters password.");
			$(p).tooltipster('enable');
			$(p).tooltipster('show');
			$(c).tooltipster('enable');
			$(c).tooltipster('show');
			count++;
		}
	}
	if (sessionStorage.option == 1)
	{
			tooltip(p, '', 'right');
			$(p).tooltipster('disable');
			tooltip(c, '', 'right');
			$(c).tooltipster('disable');
		if (inputs[1].value == '' || inputs[2].value == '' || inputs[3].value == '' || selects[0].value == '' || selects[1].value == '')
		{
			closeprocessing();
			popInfo('Information', 'Error! select a valid user.');
		}
		else
		{
			if (p.value != '' || c.value != '')
			{
				if (p.value != c.value)
				{
					$(p).tooltipster('content', "Passwords doesn't match.");
					$(c).tooltipster('content', "Passwords doesn't match.");
					$(p).tooltipster('enable');
					$(p).tooltipster('show');
					$(c).tooltipster('enable');
					$(c).tooltipster('show');
					count++;
				}
			if (p.value.length < 5 || p.value.length > 10 || c.value.length < 5 || c.value.length > 10)
				{
					$(p).tooltipster('content', "Please enter a 5 to 10 characters password.");
					$(c).tooltipster('content', "Please enter a 5 to 10 characters password.");
					$(p).tooltipster('enable');
					$(p).tooltipster('show');
					$(c).tooltipster('enable');
					$(c).tooltipster('show');
					count++;
				}	
			}
		}
	}
	if (count == 0)
	{
		if (sessionStorage.option == 3)
		saveUser();
		if (sessionStorage.option == 1)
		editUser()
	}	
	else
		closeprocessing();
	
}
function saveUser(){
	var email = '', password = '', name = '', lastname = '', typeId = 0, subcontractor = 0;
	var userArray = [];

	email = document.getElementById('email').value;
	password= document.getElementById('password').value;
	name = toTitleCase(document.getElementById('name').value);
	lastname = toTitleCase(document.getElementById('lastname').value);
	typeId = document.getElementById('selectType').value;
	subcontractor = document.getElementById('selectSubcontractor').value;
	if (document.getElementById('div-subcontractor').style.display == 'none')
		subcontractor = '0';

	if (email != '' & password != ''  & name != '' & lastname != '' & parseInt(typeId) > 0 & subcontractor != '' )
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
			popInfo("Information", 'Error! data error, please fill correctly.'); 
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
		if(user[0].idType == 3)
       	{
			document.getElementById('div-subcontractor').style.display = 'inline';
       	}
		else
		{
			document.getElementById('div-subcontractor').style.display = 'none';
		}
		$("#selectType").val(user[0].idType);
        $("#selectSubcontractor").val(user[0].subcontractorId);
    }
    if (sessionStorage.option == 2)
    {
        document.getElementById('type').value = user[0].type;
        document.getElementById('subcontractor').value = user[0].subcontractor;
    }
}
function userListInfo(users)
{
	var tb = document.getElementById('tbuser-list');
	var rows = tb.getElementsByTagName('tr');
	if (rows.length > 0)
		tb.innerHTML = '';
	for (var i=0; i < users.length; i++)
		{
			var tr = tb.insertRow(i);
			tr.insertCell(0).innerHTML =  users[i].name;
			tr.insertCell(1).innerHTML =  users[i].lastname;
			tr.insertCell(2).innerHTML =  users[i].subcontractor;
			tr.insertCell(3).innerHTML =  users[i].email;
			tr.insertCell(4).innerHTML =  users[i].type;
		}
    $('#user-list').dataTable({paging: false, "order": [[ 2, "asc" ]], "aLengthMenu": [[15, 30, 45, , 60, -1], [15, 30, 45, 60,  "All"]]});
    createExportButton('user-list');
	closeprocessing(); 
}
function createExportButton(table){
    var btnExport = document.createElement("input"); btnExport.type = 'button'; btnExport.value = "Export";
    btnExport.className = 'btn-save'; btnExport.setAttribute("onclick", "exportToExcel('"+table+"');");
    $('.dataTables_filter').append(btnExport);
}
/* exportar a excel */
function exportToExcel(table) {
    var name = 'W3C Example Table';
    table = document.getElementById(table);
    var uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        window.location.href = uri + base64(format(template, ctx))
}
function changeSelect()
{
	var index =  document.getElementById('selectType').selectedIndex;
    if(index == 3)
		document.getElementById('div-subcontractor').style.display = 'inline';
	else
		document.getElementById('div-subcontractor').style.display = 'none';
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
       enterbutton('btn-find');
	   sessionStorage.option = 1;
    });
}
/* delete PO */
function PODelete(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "po-delete.html", function() {
       enterbutton('btn-find');
	   sessionStorage.option = 2;
    });
}
/* Production confirm */
function ProductionConfirm(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "production-confirm.html", function() {
       enterbutton('btn-find');
	   sessionStorage.option = 1;
    });
}
/* Production adjust */
function ProductionAdjust(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "production-adjust.html", function() {
        tooltip('.adjust-th');
        enterbutton('btn-find');
        sessionStorage.option = 2;
    });
}
/* delivery new */
function DeliveryNew(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "delivery-new.html", function() {
        enterbutton('btn-find');
        sessionStorage.option = 3;
    });
}
/* delivery edit */
function DeliveryEdit(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "delivery-edit.html", function() {
        enterbutton('btn-find');
        sessionStorage.option = 5;
    });
}
/* Receiving confirm */
function ReceivingConfirm(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "receiving-confirm.html", function() {
        enterbutton('btn-find');
        sessionStorage.option = 4;
        packingList();
    });
}
/* user new*/
function UserNew(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "user-new.html", function() {
        sessionStorage.option = 3;
    });
}
/* user edit */
function UserEdit(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "user-edit.html", function() {
        enterbutton('btn-find');
        sessionStorage.option = 1;
    });
}
/* user delete */
function UserDelete(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "user-delete.html", function() {
        enterbutton('btn-find');
        sessionStorage.option = 2;
    });
}
/* user list */
function UserList(e){
    ActivarSubMenu(e);
    $( ".ajax" ).load( "user-list.html", function() {
        loadUsers();
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
function openPopup(){
     $('.popup').fadeIn(200,function(){
		 if (document.documentElement.clientWidth < 640)
			$('.info').animate({'top':'25%'},200);
	 	else
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
function checkCheckBoxes()
{
    var check = document.getElementsByClassName('all-check');
    var count = 0;
    for (var i = 0; i < check.length; i++)
        {
            if (check[i].checked == true)
                count++;
            else
                break;
        }
    if (count == check.length)
        $('.check-all').prop("checked", true);
    else
        $('.check-all').prop("checked", false);
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
	if (wn == 2)
		document.getElementById('month').value = d.getFullYear() + '-' + mes;
	return date;
}
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
function weather() {
	$(".weather").toggleClass("active");
}
/* Validar Navegador */
function validarNavegador()
{
    // Obtenemos el nombre del navegador
    var nav = navigator.appName;

    // Detectamos si nos visitan desde IE
    if(nav == "Microsoft Internet Explorer"){
        // variable global
        sessionStorage.browser = true;
        //mostramos mensaje
        window.showModalDialog('IE-compatibility.html', 'Information', "dialogWidth:500px;dialogHeight:250px;scroll:off");
        /*window.open('http://localhost:8080/production_dashboard/prueba-detalle.html', 'popup', "width=500px,height=250px, left=200px, top=200px,scrollbars=no");*/
        // Convertimos en minusculas la cadena que devuelve userAgent
        ie = navigator.userAgent.toLowerCase();
        // Extraemos de la cadena la version de IE
        var version = parseInt(ie.split('msie')[1]);

        // Dependiendo de la version mostramos un resultado
        /*switch(version){
            case 6:
                alert("Estas usando IE 6, es obsoleto");
                break;
            case 7:
                alert("Estas usando IE 7, es obsoleto");
                break;
            case 8:
                alert("Estas usando IE 8, es obsoleto");
                break;
            case 9:
                alert("Estas usando IE 9, mas o menos compatible");
                break;
            default:
                alert("Usas una version compatible");
                break;
        }*/
    }
}
function onlyText(event , obj){
    rule = /[^a-zA-Z]/g,'_';
    obj.value =  obj.value.replace(rule,"");
 }
function onlyTextAndNumber(event , obj){
    rule = /[^a-zA-Z0-9]/g,'_';
    obj.value =  obj.value.replace(rule,"");
 }
function onlyNumber(event , obj){
    rule = /[^0-9]/g,'_';
    obj.value =  obj.value.replace(rule,"");
 }
 function NumAndTwoDecimals(event , obj) {
    var val = obj.value;
    var re = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)$/g;
    var re1 = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)/g;
    if (re.test(val)) {
        //do something here

    } else {
        val = re1.exec(val);
        if (val) {
            obj.value = val[0];
        } else {
            obj.value = "";
        }
    }
}
