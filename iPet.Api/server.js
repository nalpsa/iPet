'use strict'
const app = require('../iPet.Api/bin/express');
const variables = require('../iPet.Api/bin/configuration/variables');

app.listen(variables.Api.port, () => {
    console.info(`Api inicializada com sucesso na porta ${variables.Api.port}`);
});
