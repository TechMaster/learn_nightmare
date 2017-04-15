const cron = require('node-cron')

const task = cron.schedule('0 52 20 * * *', function () {
	require('./crawl.js')
})

task.start()