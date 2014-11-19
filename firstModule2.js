/**
 * Author : Sampath
 * Created by Sampath on 11/17/14.
 * Purpose : Testing
 * Description : Node module
 * Use : www17.js
 * Factory pattern
 */

exports.version = "0.1.0";

//Added Object oriented features
function FirstModule(lang){
    this.language = lang;
    this.greet = function(){
        if (this.language == 'en')
            return 'Hello World!';
        else if (this.language == 'de')
            return 'Hallo Weit!';
        else if (this.language == 'fr')
            return 'Bonjour tout le monde!';
        return 'We don\'t speak that language';
    }
}

//Factory pattern
exports.createGreeter = function(lang){
    return new FirstModule(lang);
};


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