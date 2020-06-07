# [fully-storage-faker-api](https://github.com/Orivoir/fully-storage-faker-api)

## This API is a *generator fixtures* based on [faker](https://npmjs.com/package/faker) and a implement for [fully-storage](https://npmjs.com/package/fully-storage) package

> **fully-storage** is a simple no-sql data store with an HTTP session manager implemented.

## fully-storage-faker-api is usable outside fully storage

- [installation](#installation)
- [usage](#usage)
- [options](#options)
- [usage with fully-storage](#usage-with-fully-storage)
- [extends faker.date.between](#extends-faker.date.between)

## installation

```bash

> npm install fully-storage-faker-api --save

> yarn add fully-storage-faker-api

```

## usage

```js

const GeneratorFixtures = require('fully-storage-faker-api');

const faker = new GeneratorFixtures({

    locality: 'en_US',
    onAppend: function( { state } ) {

        // state is fixtures object generated
        // you can push inside any storage here
        console.log( state );
    }
});


const numberObjectFixtures = 10;

faker.forEach( numberObjectFixtures, function( generator ) {

    const objectFixtures = {};

    // generator is a `faker` object
    // based on package https://npmjs.com/package/faker
    // you can generated factory data with this here

    objectFixtures.title = generator.lorem.words( 5 );

    objectFixtures.createAt = generator.date.between( 'now', '-90days' );

    // the object fixtures return is give to `onAppend` method
    // this is the object append inside your storage
    return objectFixtures;

} );

```

## options

From the `GeneratorFixtures` constructor or instance object you can define a *arbitrary* value for a `options`
attribute this data is transfert to your `onAppend` method

*e.g:*
```js

const GeneratorFixtures = require('fully-storage-faker-api');

const faker = new GeneratorFixtures({

    locality: 'en_US',
    onAppend: function( { state, options } ) {

        console.log( 'should push:', state, ' inside', options.table );
    }
});

// define a options object transfer to `onAppend` method
faker.options.table = "articles";

const numberObjectFixtures = 10;

faker.forEach( numberObjectFixtures, function( generator ) {

    const objectFixtures = {};

    objectFixtures.title = generator.lorem.words( 5 );

    objectFixtures.createAt = generator.date.between( 'now', '-90days' );

    return objectFixtures;

} );

```

# usage with fully-storage

[fully-storage](https://npmjs.com/package/fully-storage) implement this API,
and auto add `fixtures object` inside collection define by the `options` attribute


fully-storage should implement a code equal to below

```js

const GeneratorFixtures = require('fully-storage-faker-api');

const faker = new GeneratorFixtures({

    locality: "en_US",

    onAppend: ( {
        options,
        state
    } ) => {

        Storage.addDoc(
            options.collectionName,

            state,

            options.AUTO_SAVE_ID
        );
    }
});

```

User [fully-storage](https://npmjs.com/package/fully-storage) should access to this usage:

```js

const faker = fullyStorage.createFaker("en_US");

faker.options = {

    collectionName: "articles",

    AUTO_SAVE_ID: fullyStorage.AUTO_SAVE_ID
};

const numberArticlesFixtures = 10;

faker.forEach(  numberArticlesFixtures, function(generator) {

    const article = {};

    article.title = generator.lorem.words( 7 ) ;

    const sentenceCount = 3;
    const separator = ' ';

    articles.contentText = generator.lorem.sentences( sentenceCount , separator );

    articles.createAt = generate.date.between( 'now', '-15days' );

    return articles;
} );

```

## extends faker.date.between

[fully-storage-faker-api](https://github.com/Orivoir/fully-storage-faker-api) have extends the native method `faker.date.between`
for allow params time as string value.

with native code:

```js

const from = new Date(); // now


const oneHours = 1000 * 60 * 60;
const oneDay = onHours * 24;

const _15days = oneDay * 15; // timestamp MS 15days

const to = Date.now() - _15Days; // 'now' - '15days'

// random date between: now and now-15days
const randomDate = faker.date.between( from, new Date( to ) );

console.log( randomDate );

```

with extends:

```js

const randomDate = faker.date.between( 'now', '-15days' );

console.log( randomDate );

```