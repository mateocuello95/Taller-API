document.addEventListener("DOMContentLoaded", function() {
    const entradaTexto = document.getElementById("textToDetect");
    const botonDetectar = document.getElementById("detectButton");
    const elementoResultado = document.getElementById("result");

    botonDetectar.addEventListener("click", async () => {
        const textoADetectar = entradaTexto.value;

        const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect';
        const opciones = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': 'c6b60a6e56mshdeb47985be2a7ccp1fbc95jsne7a36820d0f6',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            body: new URLSearchParams({ q: textoADetectar })
        };

        try {
            const respuesta = await fetch(url, opciones);
            const datos = await respuesta.json();
            const idiomaDetectado = datos?.data?.detections?.[0]?.[0]?.language;

            if (idiomaDetectado) {
                elementoResultado.textContent = `Idioma Detectado: ${idiomaDetectado}`;
            } else {
                elementoResultado.textContent = "No se pudo detectar el idioma.";
            }
        } catch (error) {
            console.error(error);
            elementoResultado.textContent = "Hubo un error al realizar la detección del idioma.";
        }
    });
});

