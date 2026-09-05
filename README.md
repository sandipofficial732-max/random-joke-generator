# Random Joke Generator 😂

A fun, interactive web application that fetches random jokes from an external API and displays them with a beautiful, modern interface.

## Features

✅ **Random Jokes** - Fetch jokes from official API  
✅ **Multiple Categories** - General, Programming, Knock Knock jokes  
✅ **Share Jokes** - Share jokes via Web Share API or copy to clipboard  
✅ **Favorite System** - Save your favorite jokes locally  
✅ **Local Storage** - Favorites persist across sessions  
✅ **Beautiful UI** - Modern gradient design with smooth animations  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Error Handling** - Graceful fallbacks for network issues  

## Getting Started

### Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/sandipofficial732-max/random-joke-generator.git
   cd random-joke-generator
   ```

2. Open `index.html` in your browser:
   ```bash
   # macOS
   open index.html

   # Linux
   xdg-open index.html

   # Windows
   start index.html
   ```

### Using a Local Server (Recommended)

**Python 3:**
```bash
python3 -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js:**
```bash
npx http-server
```

Then open `http://localhost:8000` in your browser.

## How to Use

1. **Get a Joke**: Click the "Get New Joke" button to fetch a random joke
2. **Change Category**: Use the dropdown to filter by joke type:
   - General
   - Programming
   - Knock Knock
3. **Share**: Click "Share Joke" to share on social media or copy to clipboard
4. **Favorite**: Click the heart button to save jokes you love
5. **Manage Favorites**: View, remove, or clear all favorite jokes

## Project Structure

```
random-joke-generator/
├── index.html          # HTML structure
├── styles.css          # Styling and animations
├── script.js           # JavaScript functionality
├── README.md           # This file
└── package.json        # Project metadata
```

## API Details

This application uses the **Official Joke API**:
- **Base URL**: https://official-joke-api.appspot.com/
- **Endpoints Used**:
  - `/random_joke` - Random general joke
  - `/jokes/programming/random` - Random programming joke
  - `/jokes/knock-knock/random` - Random knock-knock joke

**No API key required!** The API is free to use.

## Joke Format

The API returns jokes in two formats:

**Setup/Delivery Format:**
```json
{
  "type": "general",
  "setup": "Why don't scientists trust atoms?",
  "delivery": "Because they make up everything!",
  "id": 1
}
```

**Single Line Format:**
```json
{
  "joke": "Why did the scarecrow win an award?",
  "type": "general",
  "id": 2
}
```

## Technical Details

### Local Storage
- Favorites are saved to `localStorage` with key `jokesFavorites`
- Data persists across browser sessions
- Each favorite includes full joke data

### Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE 11: ⚠️ Limited support (localStorage works, but some modern CSS features may not)

### Features

**JokeGenerator Class:**
- `fetchJoke()` - Fetches joke from API
- `displayJoke()` - Renders joke on screen
- `toggleFavorite()` - Add/remove from favorites
- `shareJoke()` - Share via Web Share API or clipboard
- `renderFavorites()` - Display saved favorites
- `saveFavorites()` - Persist to localStorage
- `loadFavorites()` - Restore from localStorage

## Customization

### Add More Joke Categories
Edit the `apiUrls` object in `script.js`:
```javascript
this.apiUrls = {
    general: 'https://official-joke-api.appspot.com/random_joke',
    programming: 'https://official-joke-api.appspot.com/jokes/programming/random',
    'knock-knock': 'https://official-joke-api.appspot.com/jokes/knock-knock/random',
    // Add more:
    custom: 'https://api.example.com/jokes/random'
};
```

### Change Colors
Edit the gradient in `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modify Favorite Storage Key
Change in `script.js`:
```javascript
localStorage.setItem('yourCustomKey', JSON.stringify(this.favorites));
```

## Future Enhancements

- 🌙 Dark mode toggle
- 🔍 Search jokes by keyword
- 📊 Joke statistics and analytics
- 🎨 Custom themes/color schemes
- 📱 PWA support for offline usage
- 🌍 Multi-language support
- 💾 Export favorites as PDF
- ⭐ Rating system for jokes
- 📅 Daily joke notifications

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Click Button | Get new joke |

## Error Handling

The app handles:
- ❌ Network failures - Shows friendly error message
- ❌ API timeouts - Retries automatically
- ❌ Invalid responses - Displays fallback message

## Performance

- Lazy loading of jokes
- Efficient local storage usage
- Minimal dependencies (vanilla JavaScript)
- Fast loading time (<1s on average)

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have suggestions, please open an issue on GitHub.

---

**Made with 😂 by Your Dev Team**
