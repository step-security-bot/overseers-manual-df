import { Container, Navbar, Nav, NavDropdown, Tabs, Tab, Button, Stack } from 'solid-bootstrap';
import { appWindow } from '@tauri-apps/api/window';
import { Component, createEffect, createResource, For } from 'solid-js';
import Listing from './components/Listing';
import { init as initStore, get as getFromStore, set as saveToStore, SAVES_PATH, LAST_SAVE } from './settings';
import { getVersion } from '@tauri-apps/api/app';
import ScrollToTopBtn from './components/ScrollToTopBtn';
import { useDirectoryProvider } from './components/DirectoryProvider';
import { STS_IDLE, useRawsProvider } from './components/RawsProvider';
import { useSearchProvider } from './components/SearchProvider';
import SearchBox from './components/SearchBox';

// App name for title
const APP_NAME = "Overseer's Reference Manual";
// App url for github link
// const APP_REPO = "https://github.com/nwesterhausen/overseers-manual-df"

const App: Component = () => {
  const directoryContext = useDirectoryProvider();
  const rawsContext = useRawsProvider();
  const searchContext = useSearchProvider();
  // Tauri provides the app version in a promise, so we use a resource for it
  const [appVersion] = createResource(async () => {
    return await getVersion();
  });
  // When we update the currently selected save, we want to save it so we remember next time the app opens
  // Also update the title depending on the current save or app version changing
  createEffect(() => {
    if (directoryContext.currentSave() !== '') {
      appWindow.setTitle(`${APP_NAME} ${appVersion()} - ${directoryContext.currentSave()}`);
      saveToStore(LAST_SAVE, directoryContext.currentSave());
      rawsContext.setLoadRaws(true);
    } else {
      appWindow.setTitle(`${APP_NAME} ${appVersion()}`);
    }
  });

  setTimeout(() => {
    // Setting up the settings storage.
    initStore()
      // After its setup, try to get the save directory from the settings
      .then(() => {
        return getFromStore(SAVES_PATH);
      })
      // With the save folder, set it as the drag and drop path, since that's the path we set programmatically
      // and let the effects do the rest.
      .then((val) => {
        if (val !== '') {
          directoryContext.setDragAndDropPath(val);
        }
      })
      .catch(console.error);
  }, 10);

  return (
    <>
      <Navbar variant='dark'>
        <Container>
          <Nav>
            <NavDropdown title='Save Folder'>
              <NavDropdown.Header>{directoryContext.saveFolderPath().join('/')}</NavDropdown.Header>
              <NavDropdown.Item
                onClick={() => {
                  directoryContext.setManualFolderSelect(true);
                }}>
                Pick new folder..
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Change Save' id='basic-nav-dropdown'>
              <For
                each={directoryContext.saveDirectoryOptions()}
                fallback={<NavDropdown.Header>No saves found in directory.</NavDropdown.Header>}>
                {(save) => (
                  <NavDropdown.Item
                    active={save === directoryContext.currentSave()}
                    onClick={() => directoryContext.setCurrentSave(save)}>
                    {save}
                  </NavDropdown.Item>
                )}
              </For>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      <Container class='p-2'>
        {directoryContext.saveFolderPath().length == 0 ? (
          <>
            <Stack gap={2}>
              <h2>Dwarf Fortress save directory path is unset!</h2>
              <p>
                To set the path to your Dwarf Fortress Save, drag and drop a <code>world.dat</code> file from any of the
                saves in your save folder onto this window, or use the button below to pull up a folder selection
                dialog.
              </p>
              <Container class='p-3'>
                <Button
                  variant='secondary'
                  onClick={() => {
                    directoryContext.setManualFolderSelect(true);
                  }}>
                  Set Save Directory
                </Button>
              </Container>
            </Stack>
          </>
        ) : (
          <>
            <SearchBox />
            {rawsContext.jsonRawsResource().length === 0 || rawsContext.parsingStatus() !== STS_IDLE ? (
              <></>
            ) : (
              <Tabs defaultActiveKey='bestiary' class='my-3'>
                {/* A bestiary (from bestiarum vocabulum) is a compendium of beasts. */}
                <Tab eventKey='bestiary' title='Bestiary'>
                  <Listing data={rawsContext.jsonRawsResource()} searchString={searchContext.searchString()} />
                </Tab>
                <Tab disabled title='More to come in the future!'></Tab>
              </Tabs>
            )}
          </>
        )}
      </Container>
      <ScrollToTopBtn />
    </>
  );
};

export default App;
