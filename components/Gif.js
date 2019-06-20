const GIPHY_LOADING_URL = 'https://www.ifmo.ru/images/loader.gif';
const styles = {
	minHeight: '310px',
	margin: '0.5em'
};

Gif = React.createClass({
	getUrl: function() {
		return this.props.sourceUrl || GIPHY_LOADING_URL;
	},
	render: function() {
		let url = this.props.loading ? GIPHY_LOADING_URL : this.props.url;
		let importData = this.props.importData;
		let title = this.props.title;
		return (
			<div style={styles}>
				<h3>{title}</h3>
				<a href={this.getUrl()} title='view this on giphy' target='new'>
					<img id='gif' src={url} style={{width: '100%', maxWidth: '350px'}}/>
				</a>
				<p>Date import: {importData}</p>
			</div>
		);
	}
});

