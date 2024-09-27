import lume from "lume/mod.ts";
import theme from "./mod.ts";
import ogimages from "lume/plugins/og_images.ts";
import metas from "lume/plugins/metas.ts";
import json from "lume/plugins/json.ts";



const site = lume({
  src: "./src",
});

site.use(json({
  extensions: [".json"],
}));

site.use(theme());
site.use(ogimages());
site.use(metas());

export default site;
