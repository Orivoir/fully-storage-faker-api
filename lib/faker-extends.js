/**
 * extends of: faker.date.between, for accept params `from`, `to` as string time with this format: "{time}{unity}" e.g: "-15days"
 */

const faker = require('faker');

const associateUnityTimes = function( unity ) {

    return ({
        "d": "days",
        "h": "hours",
        "y": "years",
        "m": "months"
    })[ unity ] || unity;
};

const getBaseOne = function(unity) {

    const oneMili = 1e3;

    const year = oneMili * 60 * 60 * 24 * 365 + ( oneMili * 60 * 60 * 6 );

    switch( unity ) {

        case "hours":
            return oneMili * 60 * 60;
        case "days":
            return oneMili * 60 * 60 * 24;
        case "months":
            return (year / 12);
        case "years":
            return year;
    }

};

const parseStringTimes = function( stringTime ) {

    stringTime = stringTime.toLocaleLowerCase().trim();

    if( stringTime === "now" ) {

        return Date.now();
    }

    const time = parseInt( stringTime );

    let unity = stringTime.replace( time.toString(), '' ).trim();

    unity = associateUnityTimes( unity );

    const base = getBaseOne( unity );

    const timeMili = (base * time);

    return Date.now() + timeMili;
};

const dateBetweenParent = Object.assign( faker.date.between );

const dateBetweenExtends = function( from, to, isInMili = false ) {

    if( typeof from === "string"  ) {

        from = parseStringTimes( from );
    }

    if( typeof to === "string"  ) {

        to = parseStringTimes( to );
    }

    const date = dateBetweenParent( new Date(from), new Date(to) );

    return  isInMili ? Date.parse( date ): date;

};

faker.date.between = dateBetweenExtends;

module.exports = faker;
