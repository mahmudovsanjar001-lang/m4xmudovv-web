export const REPO_URL = 'https://github.com/mahmudovsanjar001-lang/m4xmudovv'
export const RELEASES_URL = `${REPO_URL}/releases/latest`
// GitHub always redirects this to the newest release's installer, so it is never outdated (used while loading or if the API is down).
export const LATEST_DOWNLOAD_URL = `${REPO_URL}/releases/latest/download/m4xmudovv-Setup.exe`
export const NAV = [['Home', '#home'], ['Features', '#features'], ['Showcase', '#showcase'], ['Releases', '#releases'], ['Download', '#download']]
// Real app screenshots live in /public/screens. Replace a file to update the site.
export const SCREENS = [
  { id: 'library', caption: 'Search, filter and preview your whole wallpaper collection.', label: 'Library', src: '/screens/library.webp', alt: 'm4xmudovv wallpaper library with preview panel' },
  { id: 'images', caption: 'Filter the library to static images.', label: 'Images', src: '/screens/images.webp', alt: 'Library filtered to static images' },
  { id: 'videos', caption: 'Filter the library to video wallpapers.', label: 'Videos', src: '/screens/videos.webp', alt: 'Library filtered to video wallpapers' },
  { id: 'favorites', caption: 'Keep your favorite wallpapers together.', label: 'Favorites', src: '/screens/favorites.webp', alt: 'Favorites view with video playback preview' },
  { id: 'playlists', caption: 'Group wallpapers into playlists.', label: 'Playlists', src: '/screens/playlists.webp', alt: 'Playlists view' },
  { id: 'settings', caption: 'Start with Windows, tray behavior, previews and performance options.', label: 'Settings', src: '/screens/settings.webp', alt: 'Settings view' },
]
// Looping background video (files in /public). Set to null to disable.
export const BG_VIDEO = { webm: '/bg.webm', mp4: '/bg.mp4', poster: '/bg-poster.jpg' }
export const SUPPORT_EMAIL = 'sanjarplus14@gmail.com'
export const TELEGRAM_URL = 'https://t.me/m4xmudovvv'
