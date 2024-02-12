// Obtener el elemento del div de colisión
const colisionDiv = document.getElementById('colisionDiv');
const colisionDiv2 = document.getElementById('colisionDiv2');
const colisionDiv3 = document.getElementById('colisionDiv3');
const colisionDiv4 = document.getElementById('colisionDiv4');
const textarea = document.getElementById('text');

function positionsCol() {

    // Establecer la posición inicial
    colisionDiv.style.left = 450 + 'px';
    colisionDiv.style.top = 200 + 'px';

    colisionDiv2.style.left = 450 + 'px';
    colisionDiv2.style.top = 350 + 'px';

    colisionDiv3.style.left = 700 + 'px';
    colisionDiv3.style.top = 200 + 'px';

    colisionDiv4.style.left = 700 + 'px';
    colisionDiv4.style.top = 350 + 'px';

    // tecla1.style.left = 900 + 'px';
    // tecla1.style.top = 210 + 'px';
}

function crearJdiv(time, color, h, w) {

    // Crear un objeto JSON con la información obtenida
    var informacionDiv = {
        tiempo: time,
        color: color,
        height: h,
        width: w
    };

    // Convertir el objeto JSON a una cadena JSON
    var jsonInformacionDiv = JSON.stringify(informacionDiv);

    //Pasar a textarea
    textarea.value += jsonInformacionDiv + '\n';
}

// Llamar a la función para establecer la posición inicial
positionsCol();

// Agrega un event listener para el evento keydown (tecla presionada)
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'z':
            document.getElementById('colisionDiv').style.backgroundColor = 'rgb(255, 0, 0)';
            //JSON del div que se creara
            crearJdiv(actual, 'R', 100, 100);
            break;
        case 'x':
            document.getElementById('colisionDiv2').style.backgroundColor = 'rgb(0, 0, 255)';
            break;
        case 'n':
            document.getElementById('colisionDiv3').style.backgroundColor = 'rgb(0, 255, 0)';
            break;
        case 'm':
            document.getElementById('colisionDiv4').style.backgroundColor = 'rgb(255, 255, 0)';
            break;
    }
});

// Agrega un event listener para el evento keyup (tecla liberada)
document.addEventListener('keyup', function (event) {
    switch (event.key) {
        case 'z':
            document.getElementById('colisionDiv').style.backgroundColor = 'rgb(197, 0, 0)';
            break;
        case 'x':
            document.getElementById('colisionDiv2').style.backgroundColor = 'rgb(0, 0, 197)';
            break;
        case 'n':
            document.getElementById('colisionDiv3').style.backgroundColor = 'rgb(0, 197, 0)';
            break;
        case 'm':
            document.getElementById('colisionDiv4').style.backgroundColor = 'rgb(197, 197, 0)';
            break;
    }
});



const songs = [
    'jpn-Bloom.mp3',
    'Sweden.mp3'
];

var indiceA = new Array(1);

function crearPlayList() {
    const listado = document.createElement('ol')
    listado.setAttribute("id", 'listadoMusica')
    for (var i = 0; i < songs.length; i++) {
        const item = document.createElement('li')
        item.appendChild(document.createTextNode(songs[i]))
        item.setAttribute("id", songs.indexOf(songs[i]))
        listado.appendChild(item)
    }
    return listado
}
document.getElementById('playList').appendChild(crearPlayList())

var listadoMusica = document.getElementById('listadoMusica')
listadoMusica.onclick = (e) => {
    const itemClick = e.target
    removeActive()
    itemClick.classList.add("active");
    reproduccionActual("Reproduciendo: " + itemClick.innerText)
    loadMusic(itemClick.innerText)
    player.play()
    indiceA[0] = e.target.id
    classIconPlay();

}

//Funcion para cambiar el icono del reprodutor
function classIconPlay() {
    var element = document.getElementById("iconPlay")
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
}
//Funcion para control del volumen
const volumen = document.getElementById("volumen")
volumen.oninput = (e) => {
    const vol = e.target.value
    player.volume = vol
}

//Funcion para actualizar la barra de progreso del reprodutor
const updateProgress = () => {
    if (player.currentTime > 0) {
        const barra = document.getElementById('progress')
        barra.value = (player.currentTime / player.duration) * 100

        var duracionSegundos = player.duration;
        dura = secondsToString(duracionSegundos);
        var actualSegundos = player.currentTime;
        actual = secondsToString(actualSegundos);

        duracion = actual + ' / ' + dura
        document.getElementById('timer').innerText = duracion
    }
    if (player.ended) {
        nextMusic(); // Reproducir la siguiente pista
    }
}

//Funcion para reproducir la proxima cancion
function nextMusic() {
    const source = document.getElementById('source');
    var musicaActual = Number(indiceA[0]);
    if (songs.length == (musicaActual + 1)) {
        var siguiente = 0
    } else {
        var siguiente = musicaActual + 1
    }
    removeActive()
    var item = document.getElementById(siguiente)
    item.classList.add("active");
    loadMusic(songs[siguiente]);
    player.play()
    indiceA[0] = siguiente
    reproduccionActual("Reproduciendo: " + songs[siguiente])
    classIconPlay()
}

//Funcion para reproducir la cancion anterior
function prevMusic() {
    const source = document.getElementById('source');
    var musicaActual = Number(indiceA[0]);
    if (musicaActual == 0) {
        var anterior = songs.length - 1
    } else {
        var anterior = musicaActual - 1
    }
    removeActive()
    var item = document.getElementById(anterior)
    item.classList.add("active");
    loadMusic(songs[anterior]);
    player.play()
    indiceA[0] = anterior
    reproduccionActual("Reproduciendo: " + songs[anterior])
    classIconPlay()
}

//Funcion para remover todas las clases css activas
function removeActive() {
    var elems = document.querySelectorAll(".active");
    [].forEach.call(elems, function (el) {
        el.classList.remove("active");
    });
    return elems
}
//Funcion para mostrar el nombre del arhivo actual en reproduccion
function reproduccionActual(texto) {
    document.getElementById('currentPlay').innerText = texto
}
//Funcion para cargar las songs en el reproductor
function loadMusic(ruta) {
    var source = document.getElementById('source')
    var folder = "audio";//Carpeta donde tenemos almancenada la musica
    source.src = folder + "/" + ruta
    var index = indiceA[0] = songs.indexOf(ruta)
    removeActive()
    var item = document.getElementById(index)
    item.classList.add("active");
    reproduccionActual("Reproduciendo: " + ruta)
    player.load()
}
//Funcion para pausar o darle play 
function togglePlay() {
    if (player.paused) {
        toggleIcon();
        return player.play();
    } else {
        toggleIcon();
        return player.pause();
    }
}
//Funcion para cambiar el icono play o pause
function toggleIcon() {
    var element = document.getElementById("iconPlay");
    element.classList.toggle("fa-pause-circle");
    element.classList.toggle("fa-play-circle");
}
//Funcion para que al dar click sobre la barra de progreso se permita adelantar
progress.addEventListener('click', adelantar);
function adelantar(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
    player.currentTime = scrubTime;
    sonsole.log(e);
}

//Funcion para convertir segundos a minutos y horas
function secondsToString(seconds) {
    var hour = "";
    var micro = seconds % 1;
    micro = Math.floor(micro * 1000000); // Convertir a microsegundos

    if (seconds > 3600) {
        hour = Math.floor(seconds / 3600);
        hour = (hour < 10) ? '0' + hour : hour;
        hour += ":";
    }
    var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10) ? '0' + minute : minute;
    var second = Math.floor(seconds % 60);
    second = (second < 10) ? '0' + second : second;

    micro = (micro < 100000) ? '0' + micro : micro; // Asegurar que los microsegundos tengan al menos 6 dígitos

    return hour + minute + ':' + second + '.' + micro;
}
loadMusic(songs[0])