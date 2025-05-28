
import { Aboutpage } from "@/models/aboutpage";
import { Basiccontent } from "@/models/basiccontent";
import { Contactpage } from "@/models/contactpage";
import { Homepage } from "@/models/homepage";
import { Meettheteampage } from "@/models/meettheteampage";
import { Menu } from "@/models/menu";
import { Projectitem } from "@/models/projectitem";
import { Projectpage } from "@/models/projectpage";






const KontentDelivery = require("@kentico/kontent-delivery");





export const TypeResolver = [
  new KontentDelivery.TypeResolver("Menu", (rawData: any) => new Menu()),
  new KontentDelivery.TypeResolver("Homepage", (rawData: any) => new Homepage()),
  new KontentDelivery.TypeResolver("Projectpage", (rawData: any) => new Projectpage()),
  new KontentDelivery.TypeResolver("Projectitem", (rawData: any) => new Projectitem()),
  new KontentDelivery.TypeResolver("Contactpage", (rawData: any) => new Contactpage()),
  new KontentDelivery.TypeResolver("Aboutpage", (rawData: any) => new Aboutpage()),
  new KontentDelivery.TypeResolver("Meettheteampage", (rawData: any) => new Meettheteampage()),
  new KontentDelivery.TypeResolver("Basiccontent", (rawData: any) => new Basiccontent()),



];
