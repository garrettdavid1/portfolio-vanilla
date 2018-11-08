function run() {
    console.log('DOM is ready.');
}

if (document.readyState!='loading'){
    run();
} else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', run);
} else {
    document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') run();
    });
}

/*
    document ready listener from
    https://plainjs.com/javascript/events/running-code-when-the-document-is-ready-15/
*/