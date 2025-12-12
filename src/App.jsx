

import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PagePrincipal from './paginas/pageprincipal'
import PageCadastro from './paginas/pagecadastro'
import Gerenciar from './paginas/gerenciar';
import PageEdit from './paginas/pageedit';

/*PALETA DE COR
Blue Jungle:
#011D4D
#034078
#1282A2
#E3DFDA
#63372C
 */

function App() {


 
  return (
    <>
  
    

    <Router> {/*Router envolve TODA PAGINA */}

      <Navbar/>

      <Routes>
        <Route path='/' element={<PagePrincipal/>}/>
        <Route path='/cadastro' element={<PageCadastro/>}/>
        <Route path='/gerenciar/*' element={<Gerenciar/>}/>
        <Route path='/editar' element={<PageEdit/>}/>
      </Routes>
      
    </Router>



    


    </>

    
  )
}

export default App
