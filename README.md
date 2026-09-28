# Ken — Art Portfolio Website

A static portfolio website designed for GitHub Pages.

## Features

- Original artwork gallery
- Individual page for every artwork
- Process video for every artwork
- Dedicated prints section for every original
- Different print sizes and prices
- WhatsApp inquiry button for the original
- WhatsApp inquiry button for every print
- Responsive mobile layout
- No database or server required

## 1. Add your WhatsApp number

Open `data.js` and change:

```js
const WHATSAPP_NUMBER = "237XXXXXXXXX";
```

For a Cameroon number, use the international number without `+`, spaces, or the first `0`.

## 2. Add artwork images and videos

Put files into:

- `assets/artworks/`
- `assets/prints/`
- `assets/videos/`

The filenames must match the paths in `data.js`.

## 3. Add or remove artworks

Each object inside the `artworks` array represents one original artwork.

Inside it, `prints` contains all the print versions belonging to that original.

Example:

```js
{
  id: "my-new-painting",
  title: "My New Painting",
  year: "2026",
  category: "Original Painting",
  medium: "Oil on canvas",
  dimensions: "50 × 70 cm",
  price: "200,000 FCFA",
  status: "Available",
  image: "assets/artworks/my-new-painting.jpg",
  video: "assets/videos/my-new-painting.mp4",
  description: "Description of the artwork.",
  prints: [
    {
      name: "Fine Art Print — A4",
      size: "A4",
      price: "15,000 FCFA",
      image: "assets/prints/my-new-painting-a4.jpg"
    }
  ]
}
```

## 4. Test it

You can open `index.html` directly in a browser to test most of the site.

For the cleanest local test, use a simple local server such as VS Code Live Server.

## 5. Publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload all files and folders from this project.
3. Go to the repository's **Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save.
7. GitHub will give you the public website address.

## Important note about videos

For small videos, you can keep MP4 files in the repository.

For many large process videos, consider hosting the videos on YouTube/Vimeo and changing the artwork page to embed those videos. This keeps the GitHub repository lighter.
