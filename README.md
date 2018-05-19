# Free Jekyll Starter Theme
Jekyll Starter Theme is a boilerplate for your next Jekyll project.   
It allows designers and developers to start a new website or a blog quickly.

## Features
- **Gulp workflow**:
	- **SASS**: compile, prefix, and minify
	- **Critical**: adds critical CSS to <head> to rank better on Google Page Speed Insights
	- **JS**: uglify
	- **HTML**: remove comments and minify
	- **Browser Sync**
	- Splits Development and Production environment

- **Jekyll Plugins**:
	- **jekyll-seo-tag**: adds metadata tags for search engines and social networks
	- **jekyll-paginate-v2**: paginates /blog, /blog/category, and /blog/tag pages
  	- **jekyll-sitemap**: sitemap.xml generator, already removing categories and tags from it
  	- **jekyll-feed**: generates an Atom (RSS-like) feed of blog posts

- **Layouts**:
	- **default.html**: the base file for all other layout files
	- **archive-categories.html**: displays all posts in a specific category
    - **archive-tags.html**: displays all posts in a particular tag
    - **post.html**: layout for you article/ post 

- **Bonus**: 
	- A basic SASS reset and grid (Flexbox, Bootstrap 4 inspired)
	- .htaccess: If you use Apache Server to host your website, this file will take care of your resources compression (gzip), and browser caching

## Getting Started
1. Clone this repo
2. `bundle install`
3. `npm install`
4. `gulp` will run your development environment
5. `gulp --prod` will compile your project for production

---

### IMPORTANT:
- This boilerplate is not compatible with Github Pages.
- Only use this repo Issues tab if you can't make the Getting Started process work. 
- If you need assistance with Ruby, NodeJS, Gulp, Jekyll plugins customizations; or if you never developed a Jekyll website, please [follow me on Twitter](https://twitter.com/elumina_me/) and send a Direct Message. I'll try to help you asap.

---

## License
[Jekyll Starter Theme](https://github.com/robertosimoes/Free-Jekyll-Starter-Theme/blob/master/LICENSE) is released under the [GPL-2.0 License](http://www.gnu.org/licenses/gpl-2.0.html).

> This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License, version 2, as published by the Free Software Foundation.

> This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

> You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA, 02110-1301, USA.

---

Special thanks to [Elumina](https://elumina.me).