import { BackgroundImage, Button, MantineProvider } from '@mantine/core';
import React from "react";
import theme from '../theme';
import { isEnvBrowser } from '../utils/misc';
import "./App.css";
import { UI } from './UI/main';
import { SkinMenu } from './UI/skin';
import { SkinMenuList } from './UI/skinmenu';
import { HudUI } from './UI/hud';
const App: React.FC = () => {
  return (  
    <MantineProvider theme={theme} defaultColorScheme='dark'>
      <Wrapper>
        <UI />
        <SkinMenu />
        <SkinMenuList />
        <HudUI />
      </Wrapper>
    </MantineProvider>
  );
};

export default App;

import { useAppVisibilitySkinMenu, useAppVisibilitySkinMenuList, useAppVisibilityStore, useAppVisibilityHud } from '../stores/appVisibilityStore';
function Wrapper({ children }: { children: React.ReactNode }) {
  const { showApp, setVisibility} = useAppVisibilityStore();
  const { showApp: showAppSkin, setVisibility: setVisibilitySkin } = useAppVisibilitySkinMenu();
  const { showApp: showAppSkinList, setVisibility: setVisibilitySkinList } = useAppVisibilitySkinMenuList();
  const { showApp: showAppDeath, setVisibility: setVisibilityDeath } = useAppVisibilityHud();

  return isEnvBrowser() ? ( 
    <BackgroundImage w='100vw' h='100vh' style={{overflow:'hidden'}}
      src="https://i.ibb.co.com/WWV1jtvJ/Screenshot-1485.png"
    >  
      {children}
      <div style={{ position: 'absolute', display: 'flex', gap: 10 }}>
        <Button onClick={() => setVisibility(!showApp)}>Open / Close Indenity</Button>
        <Button onClick={() => setVisibilitySkin(!showAppSkin)}>Open / Close Skin Menu</Button>
        <Button onClick={() => setVisibilitySkinList(!showAppSkinList)}>Open / Close Skin List</Button>
        <Button onClick={() => setVisibilityDeath(!showAppDeath)}>Open / Close Death</Button>
      </div>
    </BackgroundImage>
  ) : (
    <>{children}</>
  )
}
