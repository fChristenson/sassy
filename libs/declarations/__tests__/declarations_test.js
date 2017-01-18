var D = require('../');
var path = require('path');
var walk = require('../../directories').walk;
var expect = require('chai').expect;

describe('declarations', function() {
  it('has a module', function() {
    expect(D).to.be.ok;
  });

  describe('findDeclarations', function() {
    it('walks the ast node tree and finds all declarations', function() {
      var data = walk(path.join(__dirname, 'testing_dir'));
      var stats = D.findDeclarations(data);
      expect(stats.length).to.equal(3);
      expect(stats).to.include({type: 'variable', name: 'foo'});
      expect(stats).to.include({type: 'function', name: 'bar'});
      expect(stats).to.include({type: 'mixin', name: 'baz'});
    });

    it('only picks up declaration', function() {
      var data = walk(path.join(__dirname, 'testing_dir2'));
      var stats = D.findDeclarations(data);
      expect(stats.length).to.equal(3);
      expect(stats).to.include({type: 'variable', name: 'foo'});
      expect(stats).to.include({type: 'function', name: 'bar'});
      expect(stats).to.include({type: 'mixin', name: 'baz'});
    });
  });

  describe('findUnusedDeclaration', function() {
    it('returns a list of unused declarations', function() {
      var data = walk(path.join(__dirname, 'testing_dir3'));
      var stats = D.findUnusedDeclaration(data);
      expect(stats.length).to.equal(1);
      expect(stats[0]).to.deep.equal({type: 'variable', name: 'foo'});
    });
  });
});