import fs from "node:fs";
import path from "node:path";
import { HeroClient } from "@/components/sections/HeroClient";
import { stockMedia } from "@/data/media";

const HERO_PHOTO = "/images/photos/hero.jpg";

function heroPhotoSrc() {
  try {
    if (
      fs.existsSync(path.join(process.cwd(), "public", "images", "photos", "hero.jpg"))
    ) {
      return HERO_PHOTO;
    }
  } catch {
    /* fall through */
  }
  return stockMedia.hero.src;
}

export function Hero() {
  return <HeroClient photoSrc={heroPhotoSrc()} />;
}
