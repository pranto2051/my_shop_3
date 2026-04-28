# আল-আমিন ফার্নিচার

A complete production-ready Bangladeshi furniture e-commerce website.

## Quick Start

```bash
npm install
npm start
```

Open `http://localhost:3000`

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with slider, search, categories |
| `/category/:id` | Category product listing |
| `/search` | Search results with filters |
| `/admin` | Admin panel (Password: `furniture2024`, Demo: `demo123`) |

- Main Password : furniture2024
- Demo Password : demo123
You can now use demo123 to log in to the admin panel at http://localhost:3000/admin .

Completed

Diff

25%

## Tech Stack

- Node.js + Express.js
- EJS templates
- Pure CSS (no frameworks)
- Vanilla JavaScript

## Project Structure

```
furniture-shop/
├── server.js
├── package.json
├── data/
│   ├── categories.js
│   └── products.js
├── public/
│   ├── css/
│   │   ├── style.css
│   │   ├── responsive.css
│   │   └── animations.css
│   └── js/
│       ├── main.js
│       ├── search.js
│       └── modal.js
└── views/
    ├── layout/
    │   ├── header.ejs
    │   └── footer.ejs
    ├── index.ejs
    ├── category.ejs
    ├── search.ejs
    └── admin.ejs
```

## Features

- Fully responsive (320px to 1920px+)
- Hero slider with 5 slides
- Product detail modal with image gallery
- WhatsApp order integration
- Admin panel for product management
- Live search with debouncing
- Recently viewed products (localStorage)
- Sticky category navigation
- Mobile bottom navigation
- Floating WhatsApp button
- 48 products across 8 categories
