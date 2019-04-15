import { createStackNavigator, createAppContainer } from "react-navigation";

import Inicio from './pages/inicio/Inicio';
import ColetarDados from './pages/coletarDados/ColetarDados';
import Relatorios from './pages/relatorios/Relatorios';
import RelatorioDetail from './pages/relatorios/relatorio/detail/Detail';

export default createAppContainer(
  createStackNavigator({
    Inicio, 
    ColetarDados,
    Relatorios,
    RelatorioDetail
  }, {
    initialRouteName: 'Inicio'
  })
);
