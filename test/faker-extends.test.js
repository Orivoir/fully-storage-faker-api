const
    {expect, assert} = require('chai')
    ,fakerDateExtends = require('./../lib/faker-extends')
    ,faker = require('faker')
;

describe('`faker-extends` module', () => {


    it('fakerExtends.date.between should be a function', () => {

        assert.isFunction( fakerDateExtends.date.between );
    } );

    it('faker.date.between should be a function', () => {

        assert.isFunction( faker.date.between );

    } );

    it('should be instance of Date object', () => {

        const dateRandom = fakerDateExtends.date.between( "now", "-2days" );

        expect( dateRandom ).to.be.instanceOf( Date );

    } );

    it('should be a integer (POSIX Timestamp)', () => {

        const isMili = true;

        const dateRandom = fakerDateExtends.date.between( "-10days", "+10days", isMili )

        assert.isNumber( dateRandom );
    } );

} );
