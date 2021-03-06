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

function run() {
	window.addEventListener('resize', () => {
		sizeText();
	});
	sizeText();
	typeWelcomeMessage();
}

sizeText = () => {
	let messages = Array.from(document.getElementsByClassName('message'));
	messages.forEach(message => {
		if(window.innerWidth > window.innerHeight){
			message.style.fontSize = window.innerWidth / window.innerHeight + 'em';
		} else{
			message.style.fontSize = window.innerHeight / window.innerWidth + 'em';
		}
	})
};

typeWelcomeMessage = () => {
	const messageQueue = [
		// {text: 'Hey there!', elementId: 'message-greeting'},
		{text: 'My name is David. My name is David. My name is David. My name is David. My name is David. My name is David. My name is David. My name is David. My name is David. ', elementId: 'message-body'},
		// {text: 'Sincerely,', elementId: 'message-salutation-line-one'},
		// {text: 'Me', elementId: 'message-salutation-line-two'},
	]

	typeMessagesSynchronously(messageQueue)
};

typeMessagesSynchronously = (messageQueue) => {
	if(messageQueue.length > 0){
		getTypeWriterFunction(messageQueue, 0)();
	}
};

getTypeWriterFunction = (messageQueue, index) => {
	const nextIndex = index + 1;
	const message = messageQueue[index];
	if(messageQueue[nextIndex]){
		return () => {typeWriter(message.text, document.getElementById(message.elementId), 30, 0, getTypeWriterFunction(messageQueue, nextIndex))};
	} else{
		return () => {typeWriter(message.text, document.getElementById(message.elementId), 30, 0, null)};
	}
};

typeWriter = (text, component, speed = 50, i = 0, callback) => {
	component.innerHTML += text.charAt(i);
    if (i < text.length) {
        i++;
        setTimeout(() => {
            this.typeWriter(text, component, speed, i, callback);
        }, speed);
    } else if(callback){
		setTimeout(callback, 500);
	}
};