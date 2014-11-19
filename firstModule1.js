/**
 * Created by test on 11/16/14.
 */

/**
 * Author : Sampath
 * Created by Sampath on 11/17/14.
 * Purpose : Testing
 * Description : My first node module
 * Use : www16.js
 */

exports.version = "0.1.0";


exports.helloWorld = function (lang) {
    if (lang == 'en')
        return 'Hello World!';
    else if (lang == 'de')
        return 'Hallo Weit!'
    else if (lang == 'fr')
        return 'Bonjour tout le monde!';
    return 'We don\'t speak that language';
};

exports.goodbye = function (lang) {
    if (lang == 'en')
        return 'Good Bye!';
    else if (lang == 'de')
        return 'Tschuss!'
    else if (lang == 'fr')
        return 'Au revoir!';
    return 'We don\'t speak that language';
};