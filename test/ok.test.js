const Koa = require('koa')
const chai = require('chai')
const request = require('supertest')
const responseHandler = require('../')
const statusCodes = require('../statusCodes')

const expect = chai.expect()
const should = chai.should()

describe('q respond: ok', () => {
	it('should return default ok type response without params when option "merge" is true', done => {
		var app = App()
		app.use(ctx => {
			ctx.res.ok()
		})
		const res = request(app.listen())
			.get('/')
			.expect(200)
			.expect({
				data: null,
				status: 'success',
				code: statusCodes.OK,
				message: successMessage
			})
			.end(done)
	})

	it('should return empty response when option "merge" is false without params', done => {
		var app = App({ merge: false })
		app.use(ctx => {
			ctx.res.ok()
		})
		const res = request(app.listen())
			.get('/')
			.expect(200)
			.expect({})
			.end(done)
	})

	it('should return params response when option "merge" is false', done => {
		var app = App({ merge: false })
		app.use(ctx => {
			ctx.res.ok({ customizedKey: 'customized value' })
		})
		const res = request(app.listen())
			.get('/')
			.expect(200)
			.expect({ customizedKey: 'customized value' })
			.end(done)
	})
})

function done(err, res) {
	if (err) {
		throw new Error()
	}
}

const successMessage = 'operate successfully'
const failureMessage = 'operate failure'

function App(options = { merge: true }) {
	const app = new Koa()
	app.use(
		responseHandler({
			merge: options.merge,
			successMessage,
			failureMessage
		})
	)
	return app
}
