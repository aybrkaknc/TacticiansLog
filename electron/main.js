import { app, BrowserWindow, ipcMain, protocol, shell } from 'electron';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check for portable mode
const exeDir = path.dirname(app.getPath('exe'));
const portableMarkerLocal = path.join(exeDir, '.portable');
const portableMarkerResources = path.join(process.resourcesPath, '.portable');

if (fs.existsSync(portableMarkerLocal) || fs.existsSync(portableMarkerResources)) {
  const portableDataPath = path.join(exeDir, 'tactician_data');
  if (!fs.existsSync(portableDataPath)) {
    fs.mkdirSync(portableDataPath);
  }
  app.setPath('userData', portableDataPath);
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: false, // Frameless window
    backgroundColor: '#000000',
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: (process.env.NODE_ENV === 'development' || !app.isPackaged)
      ? path.join(__dirname, '../public/favicon.ico')
      : path.join(__dirname, '../dist/favicon.ico')
  });

  // Window Controls IPC
  ipcMain.on('window-minimize', () => win.minimize());
  ipcMain.on('window-maximize', () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });
  ipcMain.on('window-close', () => win.close());

  // Hide menu bar
  win.setMenuBarVisibility(false);

  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  // Register protocol for secure local file access
  protocol.registerFileProtocol('safe-file', (request, callback) => {
    const url = request.url.replace('safe-file://', '');
    try {
      return callback(decodeURIComponent(url));
    } catch (error) {
      console.error(error);
      return callback(404);
    }
  });

  createWindow();

  // Open External URL IPC
  ipcMain.handle('open-external', async (event, url) => {
    try {
      await shell.openExternal(url);
    } catch (error) {
      console.error('Failed to open external link:', error);
    }
  });

  // IPC Handlers
  ipcMain.handle('read-data', async () => {
    try {
      const userDataPath = app.getPath('userData');
      // Define path to seeded data (in public/data)
      // In development this is 'public/data', in production it is in resources
      const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
      const seedDataPath = isDev
        ? path.join(__dirname, '../public/data')
        : path.join(process.resourcesPath, 'data'); // Need to ensure we copy this in build

      const charPath = path.join(userDataPath, 'characters.json');
      const pairPath = path.join(userDataPath, 'pairings.json');
      const supportsPath = path.join(userDataPath, 'supportRanks.json');
      const todoPath = path.join(userDataPath, 'todo.json');
      const chatsPath = path.join(userDataPath, 'chats.json');
      const inventoryPath = path.join(userDataPath, 'inventory.json'); // Added inventory path

      const seedCharPath = path.join(seedDataPath, 'characters.json');
      const seedPairPath = path.join(seedDataPath, 'pairings.json');
      const seedTodoPath = path.join(seedDataPath, 'todo.json');
      const seedChatsPath = path.join(seedDataPath, 'chats.json');
      // Assuming seed data might not have inventory, or we default to empty. 
      // If there is seedInventory, add it here. For now default to []

      // Helper: Read from UserData, if fail or EMPTY, try Seed, then Default
      const readWithSeed = async (userPath, seedPath, defaultVal) => {
        try {
          // 1. Try UserData
          const content = await fs.promises.readFile(userPath, 'utf-8');
          const data = JSON.parse(content);

          // If data is just an empty array/object, maybe we should seed?
          // Let's check if it's truly empty
          const isEmpty = (Array.isArray(data) && data.length === 0) ||
            (data && Object.keys(data).length === 0 && data.constructor === Object);

          if (!isEmpty) return data;

          // If empty, proceed to check seed
          // console.log(`Data at ${userPath} is empty, checking seed at ${seedPath}`);
        } catch (err) {
          // File doesn't exist, proceed to check seed
        }

        // 2. Try Seed
        if (seedPath) {
          try {
            const seedContent = await fs.promises.readFile(seedPath, 'utf-8');
            const parsed = JSON.parse(seedContent);
            // Write to UserData for next time
            await fs.promises.writeFile(userPath, seedContent, 'utf-8');
            console.log(`Seeded data from ${seedPath} to ${userPath}`);
            return parsed;
          } catch (seedErr) {
            // Ignore seed error
          }
        }

        // 3. Return Default
        return defaultVal;
      };

      const [characters, pairings, supportRanks, todoLists, chats, inventory] = await Promise.all([
        readWithSeed(charPath, seedCharPath, []),
        readWithSeed(pairPath, seedPairPath, []),
        readWithSeed(supportsPath, null, {}),
        readWithSeed(todoPath, seedTodoPath, [{ title: 'Genel', items: [] }]),
        readWithSeed(chatsPath, seedChatsPath, []),
        readWithSeed(inventoryPath, null, []) // Read inventory, no seed path yet
      ]);

      return { characters, pairings, supportRanks, todoLists, chats, inventory };
    } catch (error) {
      console.error('Error reading data:', error);
      return { characters: [], pairings: [], todoLists: [], inventory: [] };
    }
  });

  ipcMain.handle('save-data', async (event, key, data) => {
    try {
      const userDataPath = app.getPath('userData');
      const filePath = path.join(userDataPath, `${key}.json`);
      await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
      return { success: true };
    } catch (error) {
      console.error('Error saving data:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('save-image', async (event, { data }) => {
    try {
      const userDataPath = app.getPath('userData');
      const imagesDir = path.join(userDataPath, 'custom_portraits');

      if (!fs.existsSync(imagesDir)) {
        await fs.promises.mkdir(imagesDir, { recursive: true });
      }

      // data is base64 string
      const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
      }

      const buffer = Buffer.from(matches[2], 'base64');
      const fileName = `portrait_${Date.now()}.png`;
      const filePath = path.join(imagesDir, fileName);

      await fs.promises.writeFile(filePath, buffer);

      // Return custom protocol URL
      // Use forward slashes for URL
      const normalizedPath = filePath.replace(/\\/g, '/');
      return `safe-file://${normalizedPath}`;
    } catch (error) {
      console.error('Error saving image:', error);
      throw error;
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
