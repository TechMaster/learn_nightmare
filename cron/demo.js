const cron = require('node-cron')

function displayCurrentTime() {
	let date = new Date()
	let hour = date.getHours()
	hour =  hour < 10 ? "0" + hour : hour

	let minute = date.getMinutes()
	minute = minute < 10 ? "0" + minute : minute

	let second = date.getSeconds()
	second = second < 10 ? "0" + second : second

	return hour + ":" + minute + ":" + second

}

cron.schedule('*/2 * * * * *', function () {
	console.log('running a task every two seconds ' + displayCurrentTime())
});