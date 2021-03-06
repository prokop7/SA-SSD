// Notification service for Google Firebase and Google Cloud Messaging
export function setupPush() {
	console.log('calling push init');
	var push = PushNotification.init({
		"android": {
			"senderID": "356133547542"
		},
		"browser": {},
		"ios": {
			"sound": true,
			"vibration": true,
			"badge": true
		},
		"windows": {}
	});
	console.log('after init');

	push.on('registration', function (data) {
		console.log('registration event: ' + data.registrationId);

		var oldRegId = localStorage.getItem('registrationId');
		if (oldRegId !== data.registrationId) {
			// Save new registration ID
			localStorage.setItem('registrationId', data.registrationId);
		}
		var parentElement = document.getElementById('registration');
		var listeningElement = parentElement.querySelector('.waiting');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');
	});

	push.on('error', function (e) {
		console.log("push error = " + e.message);
	});

	// Setup listener on receiving notification.
	// Implemented by Observer pattern
	push.on('notification', function (data) {
		window.f7.addNotification({
			title: data.title,
			message: data.message
		})
	});
}
