import { ManagementClient } from "@kentico/kontent-management";
const KontentDelivery = require("@kentico/kontent-delivery");
import { TypeResolver } from "./TypeResolvers";

export default class Globals {
  static PROJECT_ID: string = "a8474167-b327-009b-5dfa-91d2ab1f96a6";

  static SECURE_API_KEY: string =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYmVmMTEwZDkwODM0MmM5YjUzOTc5MzQ4MDE5NmRkNCIsImlhdCI6MTc0MTkzMjcxOSwibmJmIjoxNzQxOTMyNzE5LCJleHAiOjE3NzM0Njg1NDAsInZlciI6IjIuMC4wIiwic2NvcGVfaWQiOiI0NmQ4NmI2YzA4ZDY0Y2IzOTIzMjAyMTBjNDNjYzM4ZCIsInByb2plY3RfY29udGFpbmVyX2lkIjoiZTY4ZjEyYzYwNjI3MDA2OTAyMzM1MjYwNTgzNGJlNDAiLCJhdWQiOiJkZWxpdmVyLmtvbnRlbnQuYWkifQ.gBOa4Ov3hkHAT1O9jQD_KmJzRbvEuoUnMTLa9tIQGIE";
  
 

  static KontentClient: any = new KontentDelivery.DeliveryClient({
    projectId: Globals.PROJECT_ID,
    globalQueryConfig: {
      useSecuredMode: true,
    },
    secureApiKey: Globals.SECURE_API_KEY,
    typeResolvers: TypeResolver,
  });



  static SITE_NAME = "Arosa RealEstate";

  static BASE_URL: string =
    process.env.NODE_ENV === "production"
      ? "https://arosa-realestate.vercel.app/"
      : "http://localhost:3000/";


  static ALLOW_COOKIE: string = "00f00x-allow-cookie";

  static LANG_COOKIE: string = "00f00x-lang-cookie";

  static CURRENT_LANG: string = "English";

  static CURRENT_LANG_CODENAME: string = "default";

}
