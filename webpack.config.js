const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './js/index.js', // Точка входа (главный JS-файл)
	output: {
		filename: 'bundle.js', // Итоговый собранный файл
		path: path.resolve(__dirname, 'dist') // Папка для выхода
	},
	module: {
		rules: [
			{
				test: /\.js$/, // Поддержка ES6
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.scss$/, // Компиляция SCSS → CSS
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	resolve: {
		extensions: ['.js', '.json'], // Webpack будет искать файлы с этими расширениями
	},


	plugins: [
		new HtmlWebpackPlugin({
			template: './html/index.html', // шаблон для генерации HTML
			filename: 'index.html', // имя сгенерированного HTML файла
		})
	],
	mode: 'development'
};
