const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
//create an instance of the language translator.
const translator = new LanguageTranslatorV3({
  version: '2018-05-01',
  authenticator: new IamAuthenticator({
    apikey: "O_9KnQNAj3r5edUWLOJDVnvObSrZo0FgFc01C34h-CSz",
  }),
  url: "https://api.us-south.language-translator.watson.cloud.ibm.com/instances/71520e26-af24-4dd7-97d9-8e9135217e55",
}, () => console.log(translator));

languageTranslator.translate(
    {
      text: 'A sentence must have a verb',
      source: 'en',
      target: 'es'
    })
    .then(response => {
      console.log(JSON.stringify(response.result, null, 2));
    })
    .catch(err => {
      console.log('error: ', err);
    });

    