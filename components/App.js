var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'bD0WwE93mSXQj0Fbdi6E5zPW4Fp5WwyE';

App = React.createClass ({
	getInitialState() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},
	
	handleSearch: function (searchingText) {
		this.setState({
			loading: true
		});
		this.getGif(searchingText).then(gif => {
			this.setState({
				loading: false,
				gif: gif,
				searchingText: searchingText
			});
		});
	},
	
	getGif: function(searchingText) {
		return new Promise(
			function (resolve, reject) {
				const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
				const xhr = new XMLHttpRequest();
				xhr.open('GET', url);
				xhr.onload = function() {
					if (xhr.status === 200) {
						let data = JSON.parse(xhr.responseText).data;
						let gif = {
							url: data.fixed_width_downsampled_url,
							sourceUrl: data.url,
							importData: data.import_datetime,
							title: data.title
						};
						resolve(gif);
					} else {
						reject(new Error('Something went wrong'));
					}
				};
				xhr.send();
			}
		);
	},
	
	render: function () {
		const styles = {
			margin: '0 auto',
			textAlign: 'center',
			widht: '90%'
		};
		return (
			<div style={styles}>
				<h1>Gif Engine!</h1>
				<p>Find Gif on <a href='http://giphy.com'> giphy </a> .Press enter to get more gifs.</p>
				<Search onSearch={this.handleSearch}/>
				<Gif
					loading={this.state.loading}
					url={this.state.gif.url}
					sourceUrl={this.state.gif.sourceUrl}
					importData ={this.state.gif.importData}
					title={this.state.gif.title}
				/>
			</div>
		);
	}
});

