var contextSearch = require('./..');

describe('context-search', function () {
	it('should exist', function () {
		expect(contextSearch).to.be.ok;
	});

	describe('on a table', function () {
		beforeEach(function () {
			fixture.base = 'test/fixtures';
			this.fixture = fixture.load('table.html');

			contextSearch(this.fixture[0], 'Some');
		});

		it('should filter the table', function () {
			this.fixture[0].className.should.contain('context-search--filtered');
			this.fixture[0].querySelectorAll('tr')[0].className.should.contain('context-search--match');
			this.fixture[0].querySelectorAll('tr')[1].className.should.contain('context-search--match');
			this.fixture[0].querySelectorAll('tr')[2].className.should.not.contain('context-search--match');
			this.fixture[0].querySelectorAll('tr')[3].className.should.not.contain('context-search--match');
		});

		it('should highlight the search text in the lowest possible nodes', function () {
			this.fixture[0].querySelectorAll('tr .context-search--highlight')[0].innerText.should.equal('Some');
		});

		it('should still read the same text', function () {
			this.fixture[0].querySelectorAll('tr .context-search--highlight')[0].parentNode.innerText.should.equal('Something');
		});
	});
});

// var contextSearchControl = $('.context-search--control');
// var filterTable = $('.table-communities').get(0);
// contextSearchControl.on('keyup', function (event) {
// 	contextSearch(filterTable, $(this).val());
// });
