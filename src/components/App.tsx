import { BackgroundImage, Button, MantineProvider } from '@mantine/core';
import React from "react";
import theme from '../theme';
import { isEnvBrowser } from '../utils/misc';
import "./App.css";
import { UI } from './UI/main';
import { SkinMenu } from './UI/skin';

const App: React.FC = () => {
  return (  
    <MantineProvider theme={theme} defaultColorScheme='dark'>
      <Wrapper>
        <UI />
        <SkinMenu />
      </Wrapper>
    </MantineProvider>
  );
};

export default App;

import { useAppVisibilitySkinMenu, useAppVisibilityStore } from '../stores/appVisibilityStore';

function Wrapper({ children }: { children: React.ReactNode }) {
  const { showApp, setVisibility} = useAppVisibilityStore();
  const { showApp: showAppSkin, setVisibility: setVisibilitySkin } = useAppVisibilitySkinMenu();
  return isEnvBrowser() ? ( 
    <BackgroundImage w='100vw' h='100vh' style={{overflow:'hidden'}}
      src="https://media.discordapp.net/attachments/1350824457274527764/1398911188909162638/Screenshot_20250727_122550_SAMP_Mobile.jpg?ex=688dac91&is=688c5b11&hm=0f9b5e8cf0ca7215b9073d489d138cf68326af1112d4f4d848d58c82614fe123&=&format=webp&width=1755&height=810"
    >  
      {children}
      <div style={{ position: 'absolute', display: 'flex', gap: 10 }}>

        <Button onClick={() => setVisibility(!showApp)}>Open / Close Indenity</Button>
        <Button onClick={() => setVisibilitySkin(!showAppSkin)}>Open / Close Skin Menu</Button>
      </div>
    </BackgroundImage>
  ) : (
    <>{children}</>
  )
}
