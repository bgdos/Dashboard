/* 
*   @Pagina
*
*
*
*
*/
// Dialogos
var txt; //texto
var imgprocessing = 'images/loading_anim.gif';  // imagen de progreso
//var imgprocessing = 'images/wait_progress.gif';  // imagen de progreso
var imgconfirmation = ''; // imagen de confirmacion

/* Inicio de pagina */
function start()
{
    loadpage();
    validarUsuario();
    if (window.location.href == 'http://localhost:8080/production_dashboard/main.html')
    {
       tablesort('.prod-status')
    }
    if (window.location.href == 'http://localhost:8080/production_dashboard/daily-report.html')
    {
        tablesort('.daily-detail');
        fecha();
    }
    $('#user-name').text(sessionStorage.username + " " + sessionStorage.userlastname);
    closeprocessing();
}

/* desplegar programa de producccion */
function productionSchedule()
{
    txt = 'Processing . . .'; //texto
    openprocessing();
    progress();
    var date = new Date();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    date = year + "-0" + month;
    if (document.getElementById("linea").value == 1 && document.getElementById("month").value == '2015-05')
        document.getElementById("production-status").style.display = "block";
    else
        document.getElementById("production-status").style.display = "none";
    closeprocessing();

}
/* daily report */
function fecha(){ 
    var d = new Date();
    var mes = d.getMonth()+1;
    var dia = d.getDate();
    if (mes < 10)
        mes = '0' + mes;
    if (dia < 10)
        dia = '0' + dia;
    var date = d.getFullYear() + '-' + mes + '-' + dia;
    $('#date').val(date);
}

function Daily()
{
    var d = new Date();
    var mes = d.getMonth()+1;
    var dia = d.getDate();
    if (mes < 10)
        mes = '0' + mes;
    if (dia < 10)
        dia = '0' + dia;
    var date = d.getFullYear() + '-' + mes + '-' + dia;
    if (document.getElementById("subcontractor").value == 'AMEX' && document.getElementById("date").value == date)
        document.getElementById("production-status").style.display = "block";
    else
        document.getElementById("production-status").style.display = "none";

}
/* sub menus*/
var sm; //variable del sub menu
/* activar menu*/ 
/* Agregar produccion al programa*/
function scheduleNew(e)//recibe el elemento
{
    txt = "Processing ...";
    openprocessing();
    ActivarSubMenu(e);
    $(".title").text("Production Schedule Creation");
    $( ".ajax" ).load( "schedule-input.html");
    closeprocessing();
}
/* Editar produccion al programa*/
function scheduleEdit(e){
    txt = "Processing ...";
    openprocessing();
    ActivarSubMenu(e);
    $(".title").html("Production Schedule Edit");
    $( ".ajax" ).load( "schedule-edit.html");
    closeprocessing();
}
/* Eliminar produccion al programa*/
function scheduleDelete(e){
    txt = "Processing ...";
    openprocessing();
    ActivarSubMenu(e);
    $(".title").html("Production Schedule Edit");
    $( ".ajax" ).load( "schedule-delete.html");
    closeprocessing();
}
/* Agregar PO */
function PONew(e)
{
    txt = "Processing ...";
    openprocessing();
    ActivarSubMenu(e);
    $( ".ajax" ).load( "po-new.html", function() {
                      //alert( "Load was performed." );
    });
    closeprocessing();
}
/* Editar PO */
function POEdit(e){
    txt = "Processing ...";
    openprocessing();
    ActivarSubMenu(e);
    $( ".ajax" ).load( "po-edit.html", function() {
      //alert( "Load was performed." );
    });
    closeprocessing();
}
/* Eliminar produccion al programa*/
function PODelete(e){
    txt = "Processing ...";
    openprocessing();
    ActivarSubMenu(e);
    $( ".ajax" ).load( "po-delete.html", function() {
      //alert( "Load was performed." );
    });
    closeprocessing();
}
function ActivarSubMenu(o){
    if (sm != null || sm != undefined)
        DesactivarSubMenu();
    sm = o.parentElement.parentElement;
    $(sm).addClass("sub-active");
}
function DesactivarSubMenu(){
    $(sm).removeClass("sub-active");
}
/* Acaba sub menu*/

/* abrir ventana emergente */
function openPopup(){
     $('.popup').fadeIn(200,function(){
            $('.info').animate({'top':'35%'},200);
        });
        return false;
}
function closePopup(){
    $('.info').animate({'top':'-100%'},500,function(){
            $('.popup').fadeOut('fast');
        });
}
/* abrir tooltip */
function tooltip(elemento, text)
{
    $(elemento).tooltipster({
        animation: 'grow',
        delay: 50,
        content: text,
        theme: 'tooltipster-punk-blue'
    });
}
/* progreso */
function progress()
{
    var values = [25, 50, 75, 90, 68, 45, 22, 30, 45, 15, 27, 52,52, 77, 45,32, 25, 46, 44, 95,60];
    var i = 0;
    $('#progress:first-child').each(function() { 
		$(this).find('div').addClass ="v"+i;
        progressBar(values[i], $(this));
        i++;
    });
}
/* Se agrega el ancho y el estilo al progress bar */
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
	progress.animate({ width: percent + '%' }, 500).html(percent + "%&nbsp;");
}

/* Agregar la funcion para sortear los datos */
function tablesort(tabla) // se recibe el nombre de la tabla '.' para la clase '#' para el id
{
    $(tabla).tablesorter();
}
/* cargar de pagina, informacion, etc*/
function loadpage(){
    txt = 'Loading . . .';
    openprocessing();
}
function openprocessing(){
    $('#msg-text').text(txt);
    $('#msg-img').attr("src", imgprocessing); //cambiar a img
     $('.processing').fadeIn(200,function(){
            $('.message').animate({'top':'35%'},200);
        });//.delay(1000).fadeOut("fast");
        return false;
}
function closeprocessing(){
    $('.message').animate({'top':'-100%'},500,function(){
            $('.processing').fadeOut('fast');
        });
}
/* Desplegar informacion diaria */
function dailydetail()
{
    $('.sumd').toggle('slow');
    $('.sum').slideToggle(500);
}
