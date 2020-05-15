Realizzare un server che fornisca le API necessarie alla gestione di una lista di TODO.
Con riferimento al codice di partenza alla repo https://github.com/battistaar/UC_06_2-es1 e alla definizione delle api nel file api_definition.yaml:
- Implementare la definizione dello schema nel file todo.schema.js
- Implementare i metodi necessari nel file todo.model.js
- Implementare i metodi necessari nel file todo.controller.js
- Completare i file todo.router.js e router.js
- Creare e implementare i middleware per la gestione degli errori nella cartella Errors
- Configurare l’app sul file app.js con
    - Connessione a Mongo
    - Body parser
    - Error handling

Testare le api sviluppate con postman o con swagger (https://editor.swagger.io), caricare su classroom un file zip con l’intero progetto, escludendo la cartella `node_modules`.

Parametro `showCompleted`:
I queryparams sono interpretati come string, il controllo da fare è `=== ‘true’` oppure `=== ‘false’`

Campo expired:
L’implementazione del campo `expired` è opzionale, ci sono due modi di implementarlo:
- Usando un virtual nello schema e impostando le opportune opzioni nello schema per tornare anche i virtual https://mongoosejs.com/docs/guide.html#toObject
- Aggiungendo manualmente una proprietà ai dati tornati dalle query: non è possibile aggiungere proprietà agli oggetti tornati da mongoose, per farlo è necessario prima convertirli usando il metodo `.toObject()` (vedi commento nel file todo.model.js)
