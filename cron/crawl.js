const Nightmare = require('nightmare')
const cron = require('node-cron')
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const nightmare = Nightmare({
	show: true
})

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'xyz@gmail.com',
		pass: ''
	}
})


nightmare
	.goto('https://techmaster.vn')
	.click('.parent-menu li:nth-child(5) a')
	.wait('#search')
	.type('#search', 'Fullstack')
	.click('#frm-search .input-field label i')
	.wait(1000)
	.evaluate(function () {
		var item = document.querySelectorAll('.grid-item .card .card-content h2 a')
		var result = []
		for (var i = 0; i < item.length; i++) {
			var selector = item[ i ]
			result.push({headline: selector.innerText, url: selector.href})
		}
		return result
	})
	.end()
	.then(function (result) {
		console.log(result)
		let content = ''
		result.forEach((index) => {
			content += '<b>' + index.headline + '</b> : ' + index.url + '<br>'
		});


		let mailOptions = {
			from: '"Cuong Trinh" <minhcuong@gmail.com>', // sender address
			to: 'cuong@techmaster.vn', // list of receivers
			subject: 'Tất cả bài viết với từ khóa "Fullstack"', // Subject line
			html: content // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error)
				return
			}
			console.log('Message %s sent: %s', info.messageId, info.response)
		})

	})
	.catch(function (error) {
		console.error('Search failed:', error)
	})