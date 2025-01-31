var vCard = require( '..' )
var fs = require( 'fs' )
var assert = require( 'assert' )

suite( 'vCard', function() {

  suite( 'Real World Anomalies', function() {

    test( 'should parse a vCard with empty lines (android)', function() {
      var data = fs.readFileSync( __dirname + '/data/empty-lines.vcf' )
      var card = new vCard().parse( data )
      assert.ok( card.get( 'rev' ) )
      assert.ok( card.get( 'photo' ) )
      assert.strictEqual( card.get( 'tel' ).length, 2 )
    })

    test( 'should parse a vCard with folded line beginning with space', function() {
      var data = fs.readFileSync( __dirname + '/data/vcard-4.0.vcf' )
      var card = new vCard().parse( data )
      assert.strictEqual( card.get( 'adr' ).length, 2 )
      assert.strictEqual( card.get( 'adr' )[1].label, '"42 Plantation St.\\nBaytown, LA 30314\\nUnited States of America"' )
    })

  })

  suite( 'Bugs', function() {

    test( 'should strip quotes from lists (issue #23)', function() {
      var data = fs.readFileSync( __dirname + '/data/quoted-list.vcf' )
      var card = new vCard().parse( data )
      assert.deepEqual( card.get( 'tel' ).type, [ 'voice', 'home' ] )
    })

  })

})
