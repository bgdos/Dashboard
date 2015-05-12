/* desplegar programa de producccion */
function production()
{
    var date = new Date();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    date = year + "-0" + month;
    var x = document.getElementById("month").value;
    if (document.getElementById("linea").value == 1 && document.getElementById("month").value == '2015-04')
        document.getElementById("production-status").style.display = "block";
    else
        document.getElementById("production-status").style.display = "none";

}
/* sub menus*/
var sm; //variable del sub menu
/* Agregar produccion al programa*/
function scheduleAdd(o)//recibe el elemento
{
    ActivarSubMenu(o);
    $(".title").text("Production Schedule Creation");
    $( ".ajax" ).load( "schedule-input.html", function() {
                      //alert( "Load was performed." );
    });
}
function scheduleEdit(o){
    ActivarSubMenu(o);
    $(".title").html("Production Schedule Edit");
    $( ".ajax" ).load( "schedule-edit.html", function() {
      //alert( "Load was performed." );
    });
}
function subAssyAdd(o)
{
    ActivarSubMenu(o);
    $( ".ajax" ).load( "schedule-input.html", function() {
                      //alert( "Load was performed." );
    });
}
function subAssyEdit(o){
    ActivarSubMenu(o);
    $( ".ajax" ).load( "schedule-edit.html", function() {
      //alert( "Load was performed." );
    });
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
function abrirPopUp(){
     $('.popup').fadeIn(200,function(){
            $('.info').animate({'top':'35%'},200);
        });
        return false;
}
function cerrarPopUp(){
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
