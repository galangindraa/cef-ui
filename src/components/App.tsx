import { BackgroundImage, Button, MantineProvider } from '@mantine/core';
import { MantineEmotionProvider } from '@mantine/emotion';
import React from "react";
import theme from '../theme';
import { isEnvBrowser } from '../utils/misc';
import "./App.css";
import { UI } from './UI/main';
import { SkinMenu } from './UI/skin';
import { SkinMenuList } from './UI/skinmenu';
import { HudUI } from './UI/hud';
import { HudUISpeedometer } from './UI/spedometer';
import Notifications from './UI/notify';
import { Inventory } from './UI/inventory';
const App: React.FC = () => {
  return (  
    <MantineEmotionProvider>
      <MantineProvider theme={theme} defaultColorScheme='dark'>
        <Wrapper>
          <Inventory />
          <Notifications />
          <UI />
          <SkinMenu />
          <SkinMenuList />
          <HudUI />
          <HudUISpeedometer />
        </Wrapper>
      </MantineProvider>
    </MantineEmotionProvider>
  );
};

export default App;

import Notify from './UI/notify';
import { useAppVisibilitySkinMenu, useAppVisibilitySkinMenuList, useAppVisibilityStore, useAppVisibilityHud, useAppVisibilitySpeedometer, useAppVisibilityInventory } from '../stores/appVisibilityStore';
function Wrapper({ children }: { children: React.ReactNode }) {
  const { showApp, setVisibility} = useAppVisibilityStore();
  const { showApp: showAppSkin, setVisibility: setVisibilitySkin } = useAppVisibilitySkinMenu();
  const { showApp: showAppSkinList, setVisibility: setVisibilitySkinList } = useAppVisibilitySkinMenuList();
  const { showApp: showAppDeath, setVisibility: setVisibilityDeath } = useAppVisibilityHud();
  const { showApp: showAppSpeedometer, setVisibility: setVisibilitySpeedometer } = useAppVisibilitySpeedometer();
  const { showApp: showAppInventory, setVisibility: setVisibilityInventory } = useAppVisibilityInventory();
  return isEnvBrowser() ? ( 
    <BackgroundImage w='100vw' h='100vh' style={{overflow:'hidden'}}
      src="https://i.ibb.co.com/WWV1jtvJ/Screenshot-1485.png"
    >  
      {children}
      <div style={{ position: 'absolute', display: 'flex', gap: 10 }}>
        <Button onClick={() => setVisibility(!showApp)}>Open / Close Indenity</Button>
        <Button onClick={() => setVisibilitySkin(!showAppSkin)}>Open / Close Skin Menu</Button>
        <Button onClick={() => setVisibilitySkinList(!showAppSkinList)}>Open / Close Skin List</Button>
        <Button onClick={() => setVisibilityDeath(!showAppDeath)}>Open / Close Hud</Button>
        <Button onClick={() => setVisibilitySpeedometer(!showAppSpeedometer)}>Open / Close Speedometer</Button>
        <Button onClick={() => setVisibilityInventory(!showAppInventory)}>Open / Close Inventory</Button>
      </div>
    </BackgroundImage>
  ) : (
    <>{children}</>
  )
}
