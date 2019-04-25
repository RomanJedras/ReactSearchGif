var GIPHY_API_URL = 'https//api.giphy.com';
var GIPHY_PUB_KEY = 'bD0WwE93mSXQj0Fbdi6E5zPW4Fp5WwyE';

App = React.createClass({
	
	getInitialState() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},
	
	handleSearch: function(searchingText) {  // 1. {/*Pobierz na wejściu wpisywany tekst.*/}
		this.setState({
			loading: true  // 2. {/*Zasygnalizuj, że zaczął się proces ładowania.*/}
		});
		this.getGif(searchingText, function(gif) {  // 3. {/*Rozpocznij pobieranie gifa.*/}
			this.setState({  // 4 Na zakończenie pobierania:
				loading: false,  // a przestań sygnalizować ładowanie,
				gif: gif,  // b ustaw nowego gifa z wyniku pobierania,
				searchingText: searchingText  // c ustaw nowy stan dla wyszukiwanego tekstu
			});
		}.bind(this));
	},
	
	getGif: function(searchingText, callback) {  // 1.
		const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
		let xhr = new XMLHttpRequest();  // 3.
		xhr.open('GET', url);
		xhr.onload = function() {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText).data; // 4.
				let gif = {  // 5.
					url: data.fixed_width_downsampled_url,
					sourceUrl: data.url
				};
				callback(gif);  // 6.
			}
		};
		xhr.send();
	},
	
	render: function () {
		let styles = {
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		};
		
		return (
			<div className={'searchMedia'}>
				<h1> Wyszukiwarka gifów</h1>
				<p>
					Znajdź gifa na <a href={'http://giphy.com'} >Naciskaj ENTER, aby pobrać kolejne gify </a>
				</p>
				<Search onSearch={this.handleSearch} />
				<Gif loading={this.state.loading}  url={this.state.gif.url} sourceUrl={this.state.gif.sourceUrl}
				/>
			</div>
		);
	}
	
});


