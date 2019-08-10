module.exports = {
	siteMetadata: {
		title: `rileyjshaw`,
		description: `gatsby new gatsby-site`,
		author: `@rileyjshaw`,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/posts/`,
				name: `posts`,
			},
		},
		`gatsby-transformer-remark`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/data/`,
				name: `data`,
			},
		},
		`gatsby-transformer-json`,
		{
			resolve: `gatsby-source-atom`,
			options: {
				source: `http://rileyjshaw.commit--blog.com/feed`,
			},
		},
		// HACK(riley): Can I get this source to dynamically use the "next" key?
		...Array.from({length: 5}, (_, i) => ({
			resolve: `gatsby-source-custom-api`,
			options: {
				url: `https://www.dwitter.net/api/dweets/?author=rileyjshaw&limit=10&offset=${i *
					10}`,
				rootKey: `dweets${i}`,
				schemas: {
					dweets: `
						next: String
						results: results
					`,
					results: `
						id: Number
						link: String
						author: author
					`,
					author: `
						username: String
					`,
				},
			},
		})),
		// TODO(riley)
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
};
