import { useState }  from 'react';
import GlobalStyles from './components/GlobalStyles';
import Router from './Router';
import { HelmetProvider } from 'react-helmet-async';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme ,lightTheme} from './theme';

const ToggleButton = styled.button`
  position: absolute; 
  left: 20px; 
  top: 20px; 
  background: ${props => props.theme.boxColor};
  color: ${props => props.theme.textColor};
  border-radius: 3px; 
  border: none; 
  padding: 5px 8px; 
  cursor: pointer; 
  box-shadow: 0 0 10px rgba(0,0,0,.05);
`

function App() {
  const [isDark,setDark] = useState<boolean>(false)
  
  const toggleTheme = () => {
    setDark((prev)=> !prev)
  }
  return (
 
    <>
      <ThemeProvider theme={isDark? darkTheme : lightTheme}>
        <GlobalStyles />
        <HelmetProvider>
          <ToggleButton onClick={toggleTheme}>{isDark? 'Light Mode': 'Dark Mode'}</ToggleButton>
          <Router/>
        </HelmetProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
