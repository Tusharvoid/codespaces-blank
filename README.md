
  # Revamp travel website

  This is a code bundle for Revamp travel website. The original project is available at https://www.figma.com/design/k8dA4h9ozCjGshzAQUJADu/Revamp-travel-website.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Cloudflare Pages deploy

  Use these settings in Cloudflare Pages:

  - Build command: `pnpm build` or `npm run build`
  - Build output directory: `dist`
  - Node version: 20+ if you can set it

  Before deploying, run a local production build once to catch config issues early.


## Ellora banners

The 21 destination banners in `elloraimages/` were restored from the Desktop
`elloraimages.rar` archive. All appear in the homepage slideshow. Destination
assignments and accessible labels are defined explicitly in `src/app/banners.ts`.
Keep the existing filenames when replacing an image; add a named entry there
when adding a new destination. Banners retain their 16:9 layout so their printed
names remain visible.

Matching tour and featured destination images use the supplied artwork. Kashmir
and Mahabaleshwar retain their existing photos because the archive contains no
artwork for those destinations. The Golden Triangle uses the Rajasthan banner.
