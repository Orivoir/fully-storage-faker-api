# [fully-storage-faker-api](https://github.com/Orivoir/fully-storage-faker-api)

## This API is a *generator fixtures* based on [faker](https://npmjs.com/package/faker) and a implement for [fully-storage](https://npmjs.com/package/fully-storage) package

> **fully-storage** is a simple no-sql data store with an HTTP session manager implemented.


## fully-storage should implement this usage:

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

## User [fully-storage](https://npmjs.com/package/fully-storage) should implement this usage:

```js

const faker = fullyStorage.createFaker("en_US");

faker.options = {

    collectionName: "articles",

    AUTO_SAVE_ID: fullyStorage.AUTO_SAVE_ID
};

const manyTimes = 10;

faker.forEach(  manyTimes, generator => {

    const article = {};

    article.title = generator.lorem.words( 7 ) ;

    const sentenceCount = 3;
    const separator = ' ';

    articles.contentText = generator.lorem.sentences( sentenceCount , separator );

    articles.createAt = generate.date.between( 'now', '-15days' );

    return articles;
} );


```

## Extends `faker.date.between`

[fully-storage-faker-api](https://github.com/Orivoir/fully-storage-faker-api) have extends the native method `faker.date.between`
for allow params time as string value:

with native code:

```js

const from = new Date(); // now


const oneHours = 1000 * 60 * 60;
const oneDay = onHours * 24;

const _15days = oneDay * 15;

const to = Date.now() - _15Days;

const randomDate = faker.date.between( from, new Date( to ) );

console.log( randomDate );

```

with extends:

```js

const randomDate = faker.date.between( 'now', '-15days' );

console.log( randomDate );

```