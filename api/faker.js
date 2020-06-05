const faker = require('./../lib/faker-extends');

/**
 * @description generator fixtures
 */
class GeneratorFixtures {

    /**
     * @var DEFAULT_LOCALITY {string} - default value of langague use for generator data fixtures
     */
    static DEFAULT_LOCALITY = "en_US";

    /**
     * @var DEFAULT_MANY_TIMES {number} - default value of generator loop constraint
     */
    static DEFAULT_MANY_TIMES = 5;

    /**
     * @var DEFAULT_IS_APPEND_ONE_TIME {boolean} - if data fixtures generated should be append only after `forEach`
     */
    static DEFAULT_IS_APPEND_ONE_TIME = false;

    /**
     * @var LOCALITIES_LIST {string[]} - locality support by `faker` package
     */
    static LOCALITIES_LIST = require('./localities-list');

    constructor( {
        locality,
        onAppend,
        options,
        isAppendOneTime
    } ) {

        this.locality = locality;
        this.onAppend = onAppend;
        this.isAppendOneTime = isAppendOneTime;

        /**
         * arbitrary value, not setter
         */
        this.options = options;

        faker.locale = locality;
    }

    get locality() {
        return this._locality;
    }
    set locality(locality) {

        this._locality = ( typeof locality === "string" ) ? locality: DEFAULT_LOCALITY;

        if( !GeneratorFixtures.LOCALITIES_LIST.includes(this._locality) ) {

            this._locality = GeneratorFixtures.DEFAULT_LOCALITY;
        }
    }

    get onAppend() {
        return this._onAppend;
    }
    set onAppend(onAppend) {

        this._onAppend = onAppend instanceof Function ? onAppend: null;

        if( !this._onAppend ) {

            throw new RangeError('Generator Fixtures, error: onAppend should be a function');
        }

    }

    presetGenerator( manyTimes, onGenerator ) {

        if( manyTimes instanceof Function ) {

            this.onGenerator = manyTimes;
            this.manyTimes = GeneratorFixtures.DEFAULT_MANY_TIMES;
        } else {

            this.manyTimes = manyTimes;
            this.onGenerator = onGenerator;
        }
    }

    forEach( manyTimes, onGenerator ) {

        this.presetGenerator( manyTimes, onGenerator );

        this.stateGenerated = this.onGenerator( faker );

        if( !this.isAppendOneTime ) {

            this.onAppend({
                options: this.options,
                state: this.stateGenerated
            });
        } else {

            this.statesGeneratedPersist.push( this.stateGenerated );
        }

        if( --this.manyTimes > 0 ) {

            this.forEach( this.manyTimes, onGenerator );
        }

        if( this.isAppendOneTime ) {

            this.onAppend({
                options: this.options,
                states: this.statesGeneratedPersist
            });
        }
    }

    get stateGenerated() {
        return this._stateGenerated;
    }
    set stateGenerated(stateGenerated) {
        this._stateGenerated = typeof stateGenerated === "object" ? stateGenerated: null;

        if( !this._stateGenerated ) {
            throw new RangeError('Generator Fixtures, error: value return by forEach method should be object generated');
        }
    }

    get manyTimes() {
        return this._manyTimes;
    }
    set manyTimes(manyTimes) {

        this._manyTimes = parseInt( manyTimes );

        if( isNaN( manyTimes ) ) {

            this._manyTimes = GeneratorFixtures.DEFAULT_MANY_TIMES;
        }
    }

    get onGenerator() {
        return this._onGenerator;
    }
    set onGenerator(onGenerator) {
        this._onGenerator = onGenerator instanceof Function ? onGenerator: null;

        if( !this._onGenerator ) {

            throw new RangeError('Generator Fixtures, error: forEach arg2: onGenerator, should be a function');
        }
    }

    get isAppendOneTime() {
        return this._isAppendOneTime;
    }
    set isAppendOneTime(isAppendOneTime) {
        this._isAppendOneTime = typeof isAppendOneTime === "boolean" ? isAppendOneTime: GeneratorFixtures.DEFAULT_IS_APPEND_ONE_TIME;

        if( this._isAppendOneTime ) {

            this.statesGeneratedPersist = [];
        }
    }

};


module.exports = GeneratorFixtures;


/*
createFaker( locality ) {

    const faker = new GeneratorFixtures({
        locakity,
        isAppendOneTime: false,
        onAppend: ( {
            options,
            state
        } ) => {

            this.addDoc( options.collectionName, state, options.AUTO_SAVE_ID );
        }
    });

    return faker;
}


const faker = fullyStorage.createFaker("en_US");

faker.options = {
    collectionName: "articles",
    AUTO_SAVE_ID: fullyStorage.AUTO_SAVE_ID
};



faker.forEach( 10, generator => {

    const article = {};
    article.title = generator.lorem.words
    return articles;
} );

*/