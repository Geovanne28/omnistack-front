import React from 'react'; //Importar sempre que usar jsx(js + xml para usar 'html' no código )
import {BrowserRouter, Route, Switch} from 'react-router-dom' //Biblioteca de rotas https://reacttraining.com/react-router/web/guides/quick-start

import Main from './pages/Main'; //Não precisa colocar o index.js pois já pega automaticamente
import Box from './pages/Box'; //Não precisa colocar o index.js pois já pega automaticamente

//Colacado como constyante pois não tem estado, ou seja, não oprecisa declaraR COMO COMPONENT
//<BrowserRouter> = USADO PARA OS LINKS SEREM DE FORMAS E /LINK/LINK E NÃO USANDO #
//Switch = usado para ser chamada apenas uma rota para cada link
//Route = o link e o component a ser chamada
    // exact = para a url ser exatamente igual ao path , caso nao tenha ele verificará sde começa com o path 
const Routes = () => (
    <BrowserRouter> 
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/box/:id" component={Box} />
        </Switch>
    </BrowserRouter>
);


export default Routes;
