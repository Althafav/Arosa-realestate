
import { Homepage } from "@/models/homepage";
import { Menu } from "@/models/menu";
import { Projectpage } from "@/models/projectpage";






const KontentDelivery = require("@kentico/kontent-delivery");





export const TypeResolver = [
  new KontentDelivery.TypeResolver("Menu", (rawData: any) => new Menu()),
  new KontentDelivery.TypeResolver("Homepage", (rawData: any) => new Homepage()),
  new KontentDelivery.TypeResolver("Projectpage", (rawData: any) => new Projectpage()),


];
