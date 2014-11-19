/**
 * Author : Sampath
 * Created by Sampath on 11/17/14.
 * Purpose : Testing
 * Description : Node module
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

module.exports = FirstModule;