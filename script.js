// Random Joke Generator Application

class JokeGenerator {
    constructor() {
        this.currentJoke = null;
        this.favorites = this.loadFavorites();
        this.category = 'general';
        this.apiUrls = {
            general: 'https://official-joke-api.appspot.com/random_joke',
            programming: 'https://official-joke-api.appspot.com/jokes/programming/random',
            'knock-knock': 'https://official-joke-api.appspot.com/jokes/knock-knock/random'
        };
        this.init();
    }

    init() {
        this.cacheElements();
        this.attachEventListeners();
        this.renderFavorites();
    }

    cacheElements() {
        this.jokeContent = document.getElementById('jokeContent');
        this.jokeType = document.getElementById('jokeType');
        this.getJokeBtn = document.getElementById('getJokeBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.favoriteBtn = document.getElementById('favoriteBtn');
        this.categorySelect = document.getElementById('jokeCategory');
        this.favoritesList = document.getElementById('favoritesList');
        this.clearFavBtn = document.getElementById('clearFavBtn');
    }

    attachEventListeners() {
        this.getJokeBtn.addEventListener('click', () => this.fetchJoke());
        this.shareBtn.addEventListener('click', () => this.shareJoke());
        this.favoriteBtn.addEventListener('click', () => this.toggleFavorite());
        this.categorySelect.addEventListener('change', (e) => {
            this.category = e.target.value;
            this.fetchJoke();
        });
        this.clearFavBtn.addEventListener('click', () => this.clearFavorites());
    }

    async fetchJoke() {
        this.getJokeBtn.disabled = true;
        this.jokeContent.innerHTML = '<p class="loading loading-text">Loading joke...</p>';
        this.jokeType.textContent = '';

        try {
            const apiUrl = this.apiUrls[this.category];
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error('Failed to fetch joke');
            }

            const data = await response.json();
            this.currentJoke = data;
            this.displayJoke(data);
            this.updateFavoriteButton();
        } catch (error) {
            console.error('Error:', error);
            this.jokeContent.innerHTML = `
                <p style="color: #ff6b6b;">😞 Oops! Couldn't load a joke. Please check your internet connection and try again.</p>
            `;
            this.showToast('Failed to load joke. Please try again.');
        } finally {
            this.getJokeBtn.disabled = false;
        }
    }

    displayJoke(joke) {
        let jokeText = '';
        let jokeTypeText = 'Joke';

        // Handle different joke APIs
        if (joke.type === 'knock-knock') {
            jokeText = `<strong>${joke.setup}</strong><br><br>${joke.delivery}`;
            jokeTypeText = '🚪 Knock Knock';
        } else if (joke.setup && joke.delivery) {
            jokeText = `<strong>${joke.setup}</strong><br><br>${joke.delivery}`;
            jokeTypeText = joke.type === 'programming' ? '💻 Programming' : '😂 General';
        } else if (joke.joke) {
            jokeText = `<strong>${joke.joke}</strong>`;
            jokeTypeText = '😂 General';
        } else {
            jokeText = joke.content || 'Something went wrong!';
        }

        this.jokeContent.innerHTML = `<p>${jokeText}</p>`;
        this.jokeType.textContent = jokeTypeText;
    }

    toggleFavorite() {
        if (!this.currentJoke) {
            this.showToast('Please load a joke first!');
            return;
        }

        const jokeId = this.getJokeId(this.currentJoke);
        const index = this.favorites.findIndex(fav => this.getJokeId(fav) === jokeId);

        if (index > -1) {
            this.favorites.splice(index, 1);
            this.showToast('Removed from favorites');
        } else {
            this.favorites.unshift(this.currentJoke);
            this.showToast('Added to favorites! ❤️');
        }

        this.saveFavorites();
        this.updateFavoriteButton();
        this.renderFavorites();
    }

    updateFavoriteButton() {
        if (!this.currentJoke) return;

        const jokeId = this.getJokeId(this.currentJoke);
        const isFavorited = this.favorites.some(fav => this.getJokeId(fav) === jokeId);
        
        this.favoriteButton.textContent = isFavorited ? '❤️ Favorited' : '❤️ Favorite';
        this.favoriteBtn.style.background = isFavorited ? '#ff6b6b' : 'white';
        this.favoriteBtn.style.color = isFavorited ? 'white' : '#667eea';
        this.favoriteBtn.style.borderColor = isFavorited ? '#ff6b6b' : '#667eea';
    }

    getJokeId(joke) {
        return joke.id || JSON.stringify(joke).hashCode();
    }

    shareJoke() {
        if (!this.currentJoke) {
            this.showToast('Please load a joke first!');
            return;
        }

        let jokeText = '';
        if (this.currentJoke.setup && this.currentJoke.delivery) {
            jokeText = `${this.currentJoke.setup}\n\n${this.currentJoke.delivery}`;
        } else if (this.currentJoke.joke) {
            jokeText = this.currentJoke.joke;
        }

        // Check if Web Share API is available
        if (navigator.share) {
            navigator.share({
                title: '😂 Check out this joke!',
                text: jokeText,
                url: window.location.href
            }).catch(err => console.log('Share cancelled'));
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(jokeText).then(() => {
                this.showToast('Joke copied to clipboard!');
            });
        }
    }

    renderFavorites() {
        this.favoritesList.innerHTML = '';

        if (this.favorites.length === 0) {
            this.favoritesList.innerHTML = '<li class="empty-favorites">No favorite jokes yet! Add one to get started.</li>';
            return;
        }

        this.favorites.forEach((joke, index) => {
            const li = document.createElement('li');
            li.className = 'favorite-item';
            
            let jokeText = '';
            if (joke.setup && joke.delivery) {
                jokeText = `${joke.setup} - ${joke.delivery}`;
            } else if (joke.joke) {
                jokeText = joke.joke;
            }

            li.innerHTML = `
                <p>${this.escapeHtml(jokeText)}</p>
                <button class="remove-fav-btn" onclick="app.removeFavorite(${index})">Remove</button>
            `;
            this.favoritesList.appendChild(li);
        });
    }

    removeFavorite(index) {
        this.favorites.splice(index, 1);
        this.saveFavorites();
        this.updateFavoriteButton();
        this.renderFavorites();
        this.showToast('Removed from favorites');
    }

    clearFavorites() {
        if (this.favorites.length === 0) {
            this.showToast('No favorites to clear!');
            return;
        }

        if (confirm('Are you sure you want to clear all favorites?')) {
            this.favorites = [];
            this.saveFavorites();
            this.updateFavoriteButton();
            this.renderFavorites();
            this.showToast('All favorites cleared');
        }
    }

    saveFavorites() {
        localStorage.setItem('jokesFavorites', JSON.stringify(this.favorites));
    }

    loadFavorites() {
        const stored = localStorage.getItem('jokesFavorites');
        return stored ? JSON.parse(stored) : [];
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.remove(), 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is ready
const app = new JokeGenerator();
