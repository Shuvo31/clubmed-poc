GET
/v2/products
Products
Seasons

Club Med have some mountain resort which are open during summer and winter. Those resort provide totally different services, therefore there is a WINTER product and SUMMER product.

Example

    Punta Cana is a permanent resort, it has one product_id: PCAC.
    Chamonix is open during the winter and the summer, it has two product_id: CHAC_WINTER and CHAC_SUMMER.

Prices

The prices are the best prices available.
Products Pagination

The pagination is not activated by default.
Use of the Pagination
Request

You can require a paginated result with two optional parameters, to be passed in the query string:

    limit: items per page. For example, if limit=10, any call result will contain an array of at most 10 items.
    page: the page you want to reach. By default, page=1 and you get the first items. If there are more than limit items, you may have to repeat the call for pages 2, 3, etc...

Depending on the endpoint, pagination may be activated by default or not, with a default limit parameter.
Response

If the response is paginated, a specific HTTP status code will be sent:

206 Partial Content

The response headers will contain metadata describing the result pagination.
Header 	Description
Accept-Ranges 	The type of the paginated items (example: products).
Content-Range 	The range of paginated items for the current response, on format first-last/total. Example: 0-9/256 means items 0 to 9 over a total of 256.
Link  	Contains the links allowing to navigate to other pages of the same request, typed by the rel. Possible types: self, prev, next, first, last.

Link examples

Link: limit=10&page=2>; rel="self"
Link: limit=10&page=1>; rel="prev"
Link: limit=10&page=3>; rel="next"
Link: limit=10&page=1>; rel="first"
Link: limit=10&page=25>; rel="last"

The client will have to iterate over the pages, sending the same request with an increased page parameter (or following the next Link), in order to fetch the complete result.

The Content-Range header, or the lack of the next Link, indicates that the last page is reached.
Parameters
Name	Description
accept-language *
string
(header)
	

Language/Country, as returned by GET /v0/locales ; e.g. "en-US", "fr-FR", "ja-JP"
fr-FR
x-api-key *
string
(header)
	

Api_key provided by ClubMed API team
201801041426.test.clubmed.com
a minute ago
filter
array<string>
(query)
	

string composed of a field name (can be a path), a comparison operator (>, >=, <=, <, ==, !=) and a value. Logical operator AND applies between filters
limit
integer
(query)
	

Maximum rows count per page
page
integer
(query)
	

Requested page number, starting from 1 (default: 1)
Responses
Snippets
cURL (bash)
cURL (PowerShell)
cURL (CMD)
Axios
Fetch
NodeJs Native

curl -X 'GET' \
  'https://api.clubmed.com/v2/products?limit=3&page=1&timestamp=1772029929003' \
  -H 'accept: application/json' \
  -H 'accept-language: fr-FR' \
  -H 'x-api-key: 201801041426.test.clubmed.com'

Request URL

https://api.clubmed.com/v2/products?limit=3&page=1&timestamp=1772029929003

Server response
Code	Details
206	
Response body

[
  {
    "id": "MPAC",
    "access_conditions": {
      "is_for_adult_only": false,
      "min_authorized_age_in_months": 0
    },
    "areas": [
      {
        "id": "area_MPAC_4T",
        "label": "Espace principal ",
        "comfort": {
          "level": 4,
          "label": "4 Tridents"
        }
      },
      {
        "id": "area_MPAC_EC_space",
        "label": "Espace Exclusive Collection",
        "comfort": {
          "level": 5,
          "label": "5 Tridents"
        }
      },
      {
        "id": "area_MPAC_family_oasis",
        "label": "Oasis Famille",
        "comfort": null
      }
    ],
    "associated_product_id": "",
    "available_services": [
      "SPA",
      "PLANNING",
      "ROOM_INTERVENTION",
      "ROOM_SERVICE",
      "DRESSCODE",
      "ROOM_READY"
    ],
    "category": {
      "id": "sun",
      "label": "Soleil"
    },
    "clubmed_mobile_app": {
      "is_available": true,
      "description": "Tout ce dont vous avez besoin est dans l’Application My Club Med – votre compagnon de voyage idéal pour préparer et organiser votre séjour. Découvrez le plan du Resort, les infrastructures et les activités , et bénéficiez de services dédiés pour profiter un maximum de votre séjour.\nTéléchargez My Club Med App sur l’App Store ou Google Play"
    },
    "easy_arrival": {
      "is_available": true,
      "description": "Service \"Easy Arrival \"* (Faciliter mon arrivée)\nEnregistrez et gérez vos détails en ligne, nous préparons tout pour faciliter votre arrivée :\nEasy Check in – check out\nRenseignements pour l’encadrement enfant\nCompte Club Med en ligne\nDisponible sur votre Espace Membre\n*Sélection des services en fonction des Resorts"
    },
    "comfort": {
      "level": 4,
      "label": "Premium"
    },
    "trip_details": {
      "departure_details": null,
      "arrival_details": null,
      "duration": null
    },
    "media": {
      "immersive_image": "https://assets.dream.clubmed/pm_7531_65_65434-jlhj85leed-swhr.jpg",
      "surroundings_images": [],
      "map": "https://assets.dream.clubmed/pm_7531_536_536752-lmp2cp1c38-swhr.jpg",
      "fact_sheet_url": "https://factsheets.clubmed/fr-fr/factsheet_mpac.pdf"
    },
    "description_title": "Un havre de paix aux portes de la ville rouge",
    "destination": {
      "countries": [
        {
          "id": "MA",
          "label": "Maroc",
          "description": "Le  Maroc  en quelques mots\n\n\n\n- Superficie : 446 550 km2 (710 850  km2 avec le Sahara occidental)\n\n- Capitale : Rabat\n\n- Langue officielle : L’Arabe (littéraire) et l’Amazighe (berbère). Le français reste très présent.\n\n- Monnaie : Le Dirham.\n\n\n\nProfitez des environs du Village de Marrakech la Palmeraie pour découvrir au cours de votre séjour au Maroc, la beauté et les richesses culturelles de la région.\n\nMarrakech connue sous le nom de «la Perle du Sud» est située dans l’intérieur des terres.\nElle est composée de deux parties distinctes : la médina ou ville historique et la ville nouvelle dont les quartiers principaux sont Gueliz et Hivernage. Gueliz, fondé par les français lors du protectorat, constitue le centre-ville commercial et celui de l’Hivernage le quartier chic et résidentiel.\n\n\nLe Club Med de Marrakech la Palmeraie est situé :\n\n- à 5 km du centre-ville et de la grouillante place djema-el-fna et de ses souks \n\n- à 70 km du Parc National de Toubkal\n\n- à 75 km d'Oukaimeden, principale station de ski du Maroc (3 200m d'altitude)\n\n- à 260 km d’Agadir, capitale du Souss."
        }
      ],
      "geographical_area": {
        "id": "product_geographical_area_africa_middle_east",
        "label": "Afrique & Moyen-Orient"
      },
      "region": {
        "id": "REGION_upper_atlas",
        "label": ""
      }
    },
    "full_title": "Marrakech la Palmeraie",
    "opening_status": "OPEN",
    "type": {
      "id": "VILLAGE",
      "label": "Resorts"
    },
    "price": {
      "initial_price": {
        "per_trip": 1365.5,
        "per_trip_with_fees": 1385.5,
        "per_night": 196,
        "per_night_with_fees": 198
      },
      "best_price": {
        "per_trip": 1162.5,
        "per_trip_with_fees": 1182.5,
        "per_night": 167,
        "per_night_with_fees": 169
      },
      "fee": {
        "per_trip": 20,
        "per_night": 3
      },
      "currency": "EUR",
      "terms_and_conditions": {
        "price_per": "ADULT",
        "package": "ALL_INCLUSIVE",
        "departure_date": "20261114",
        "arrival_date": "20261114",
        "stay_duration": 7,
        "total_duration": 7,
        "number_of_rooms_available_for_this_comfort": 134,
        "number_of_adults": 2,
        "accomodation": {
          "id": "C3",
          "label": "Chambre Supérieure"
        },
        "departure_city": null,
        "departure_location": null,
        "instalment_count": null,
        "default_price_display": "per_trip",
        "fees_included": true,
        "offers": [
          {
            "id": "ROL",
            "label": "*Les Beaux Plans"
          }
        ]
      }
    },
    "resort_id": "MPAC",
    "range": null,
    "seasons": [
      "SUMMER",
      "WINTER"
    ],
    "seo_description": "",
    "sibling_id": "",
    "title": "Marrakech la Palmeraie",
    "capacity_max": 1285,
    "accommodations_introduction": {
      "description": "Au cœur de jardins luxuriants aux fontaines apaisantes, les chambres célèbrent l’élégance de l’artisanat marocain. \nL'Espace Exclusive Collection propose des Suites au charme raffiné, tandis que l'espace Oasis Famille offre des logements spacieux pour des séjours sur mesure avec vos enfants. \nUn cadre parfait alliant confort, tradition et convivialité\n",
      "short_description": "La chambre idéale pour votre séjour\n",
      "images": [
        "https://assets.dream.clubmed/pm_7531_66_66190-pc8s2kbwuo-swhr.jpg"
      ],
      "rooms_count": 426
    },
    "product_line": [
      "CORE",
      "EXCLUSIVE_COLLECTION"
    ],
    "tags": [
      {
        "title": "Espaces rénovés",
        "text_color_id": "#924833",
        "background_color_id": "#FFFFFF"
      }
    ],
    "_links": [
      {
        "rel": "web_seo_url",
        "method": "GET",
        "href": "https://www.clubmed.com/r/marrakech-la-palmeraie/y",
        "external": true
      }
    ]
  },
  {
    "id": "MMAC",
    "access_conditions": {
      "is_for_adult_only": false,
      "min_authorized_age_in_months": 0
    },
    "areas": [
      {
        "id": "AREA_MMAC_4T",
        "label": "Espace principal ",
        "comfort": {
          "level": 4,
          "label": "4 Tridents"
        }
      }
    ],
    "associated_product_id": "",
    "available_services": [
      "SPA",
      "PLANNING",
      "ROOM_INTERVENTION",
      "ROOM_SERVICE",
      "DRESSCODE",
      "ROOM_READY"
    ],
    "category": {
      "id": "sun",
      "label": "Soleil"
    },
    "clubmed_mobile_app": {
      "is_available": true,
      "description": "Tout ce dont vous avez besoin est dans l’Application My Club Med – votre compagnon de voyage idéal pour préparer et organiser votre séjour. Découvrez le plan du Resort, les infrastructures et les activités , et bénéficiez de services dédiés pour profiter un maximum de votre séjour.\nTéléchargez My Club Med App sur l’App Store ou Google Play"
    },
    "easy_arrival": {
      "is_available": false,
      "description": "Service \"Easy Arrival \"* (Faciliter mon arrivée)\nEnregistrez et gérez vos détails en ligne, nous préparons tout pour faciliter votre arrivée :\nEasy Check in – check out\nRenseignements pour l’encadrement enfant\nCompte Club Med en ligne\nDisponible sur votre Espace Membre\n*Sélection des services en fonction des Resorts"
    },
    "comfort": {
      "level": 4,
      "label": "Premium"
    },
    "trip_details": {
      "departure_details": null,
      "arrival_details": null,
      "duration": null
    },
    "media": {
      "immersive_image": "https://assets.dream.clubmed/pm_7531_359_359653-okh0rf7c72-swhr.jpg",
      "surroundings_images": [
        "https://assets.dream.clubmed/pm_7531_171_171709-acpvrmon2v-swhr.jpg"
      ],
      "map": "https://assets.dream.clubmed/pm_7531_480_480480-4c785q5kxk-swhr.jpg",
      "fact_sheet_url": "https://factsheets.clubmed/fr-fr/factsheet_mmac.pdf"
    },
    "description_title": "Une oasis de verdure à l’heure andalouse",
    "destination": {
      "countries": [
        {
          "id": "ES",
          "label": "Espagne",
          "description": "L'Espagne en quelques mots.\nSuperficie : 505 990 km²\nCapitale : Madrid\nLangue officielle : L'espagnol\nMonnaie : Euro\n\nProfitez des environs du Resort pour découvrir au cours de votre séjour en Andalousie, la beauté et les richesses culturelles de la région.\n \nLa province de Malaga est l'une des destinations phares pour les golfeurs.\n \nA proximité du Resort :\n\nEstepona : située à 32 km (25 minutes environ). \n\nTorremolinos :  située à 46 km (35 minutes environ).\n\nRonda :  située à  60 km (1h10 environ). \n"
        }
      ],
      "geographical_area": {
        "id": "product_geographical_area_europe_mediterranean_coasts",
        "label": "Europe & Côtes Méditerranéennes"
      },
      "region": {
        "id": "REGION_andalusia",
        "label": ""
      }
    },
    "full_title": "Magna Marbella",
    "opening_status": "OPEN",
    "type": {
      "id": "VILLAGE",
      "label": "Resorts"
    },
    "price": {
      "initial_price": {
        "per_trip": 1589,
        "per_trip_with_fees": 1609,
        "per_night": 227,
        "per_night_with_fees": 230
      },
      "best_price": {
        "per_trip": 1351,
        "per_trip_with_fees": 1371,
        "per_night": 193,
        "per_night_with_fees": 196
      },
      "fee": {
        "per_trip": 20,
        "per_night": 3
      },
      "currency": "EUR",
      "terms_and_conditions": {
        "price_per": "ADULT",
        "package": "ALL_INCLUSIVE",
        "departure_date": "20260306",
        "arrival_date": "20260306",
        "stay_duration": 7,
        "total_duration": 7,
        "number_of_rooms_available_for_this_comfort": 20,
        "number_of_adults": 2,
        "accomodation": {
          "id": "C2",
          "label": "Chambre Supérieure"
        },
        "departure_city": null,
        "departure_location": null,
        "instalment_count": null,
        "default_price_display": "per_trip",
        "fees_included": true,
        "offers": [
          {
            "id": "LMO",
            "label": "*Offre Départ dernière minute"
          }
        ]
      }
    },
    "resort_id": "MMAC",
    "range": null,
    "seasons": [
      "SUMMER",
      "WINTER"
    ],
    "seo_description": "Magna Marbella vous ouvre ses portes dès le premier semestre 2020.",
    "sibling_id": "",
    "title": "Magna Marbella",
    "capacity_max": 1036,
    "accommodations_introduction": {
      "description": "Au pied de la Sierra Blanca, la façade de cette oasis Andalouse se pare de larges baies vitrées. Des chambres au design moderne, aux teintes rafraichissantes et balcons avec vue.\n\n",
      "short_description": "La chambre idéale pour votre séjour\n",
      "images": [],
      "rooms_count": 485
    },
    "product_line": [
      "CORE"
    ],
    "tags": [],
    "_links": [
      {
        "rel": "web_seo_url",
        "method": "GET",
        "href": "https://www.clubmed.com/r/magna-marbella/y",
        "external": true
      }
    ]
  },
  {
    "id": "DDOC",
    "access_conditions": {
      "is_for_adult_only": false,
      "min_authorized_age_in_months": 0
    },
    "areas": [
      {
        "id": "area_DDOC_4T_calypso",
        "label": "Espace Hôtel - Calypso",
        "comfort": {
          "level": 4,
          "label": "4 Tridents"
        }
      },
      {
        "id": "area_DDOC_4T_aziza",
        "label": "Espace Hôtel - Aziza",
        "comfort": {
          "level": 4,
          "label": "4 Tridents"
        }
      },
      {
        "id": "area_DDOC_4T_menzel",
        "label": "Espace Bungalows - Menzel",
        "comfort": {
          "level": 4,
          "label": "4 Tridents"
        }
      }
    ],
    "associated_product_id": "",
    "available_services": [
      "SPA",
      "PLANNING",
      "ROOM_INTERVENTION",
      "DRESSCODE",
      "ROOM_READY"
    ],
    "category": {
      "id": "sun",
      "label": "Soleil"
    },
    "clubmed_mobile_app": {
      "is_available": true,
      "description": "Tout ce dont vous avez besoin est dans l’Application My Club Med – votre compagnon de voyage idéal pour préparer et organiser votre séjour. Découvrez le plan du Resort, les infrastructures et les activités , et bénéficiez de services dédiés pour profiter un maximum de votre séjour.\nTéléchargez My Club Med App sur l’App Store ou Google Play"
    },
    "easy_arrival": {
      "is_available": true,
      "description": "Service \"Easy Arrival \"* (Faciliter mon arrivée)\nEnregistrez et gérez vos détails en ligne, nous préparons tout pour faciliter votre arrivée :\nEasy Check in – check out\nRenseignements pour l’encadrement enfant\nCompte Club Med en ligne\nDisponible sur votre Espace Membre\n*Sélection des services en fonction des Resorts"
    },
    "comfort": {
      "level": 4,
      "label": "Premium"
    },
    "trip_details": {
      "departure_details": null,
      "arrival_details": null,
      "duration": null
    },
    "media": {
      "immersive_image": "https://assets.dream.clubmed/pm_7531_170_170770-w78vqx94n8-swhr.jpg",
      "surroundings_images": [
        "https://assets.dream.clubmed/pm_7531_170_170770-w78vqx94n8-swhr.jpg"
      ],
      "map": "https://assets.dream.clubmed/pm_7531_536_536758-sx0f6cemif-swhr.jpg",
      "fact_sheet_url": "https://factsheets.clubmed/fr-fr/factsheet_ddoc.pdf"
    },
    "description_title": "Laissez-vous surprendre par l’île aux sables d’or",
    "destination": {
      "countries": [
        {
          "id": "TN",
          "label": "Tunisie",
          "description": "La Tunisie en quelques mots\n\n\n- Superficie: 163 610 km2 dont 25 000 km2 de désert\n\n- Capitale : Tunis\n\n- Langue officielle : L’Arabe\n \n- Monnaie : Le Dinar Tunisien.\n\n\n\nProfitez des environs du Village Club Med de Djerba pour découvrir au cours de votre séjour en Tunisie, la beauté et les richesses culturelles de la région.\n\n\nLe Club Med de Djerba est situé :\n\n\n- à 9km de Midoun, gros bourg animé concentré autour de ses souks et de son  moulin à huile\n  \n- à 24 km d’Houmt Souk, la ville la plus importante de l’île, à découvrir pour ses souks disséminés suivant les différents corps de métiers et se promener le long du port ou encore se balader dans les vieux quartiers..."
        }
      ],
      "geographical_area": {
        "id": "product_geographical_area_africa_middle_east",
        "label": "Afrique & Moyen-Orient"
      },
      "region": {
        "id": "REGION_djerba_island",
        "label": ""
      }
    },
    "full_title": "Djerba La Douce",
    "opening_status": "OPEN",
    "type": {
      "id": "VILLAGE",
      "label": "Resorts"
    },
    "price": {
      "initial_price": {
        "per_trip": 1049.5,
        "per_trip_with_fees": 1069.5,
        "per_night": 150,
        "per_night_with_fees": 153
      },
      "best_price": {
        "per_trip": 1049.5,
        "per_trip_with_fees": 1069.5,
        "per_night": 150,
        "per_night_with_fees": 153
      },
      "fee": {
        "per_trip": 20,
        "per_night": 3
      },
      "currency": "EUR",
      "terms_and_conditions": {
        "price_per": "ADULT",
        "package": "ALL_INCLUSIVE",
        "departure_date": "20260913",
        "arrival_date": "20260913",
        "stay_duration": 7,
        "total_duration": 7,
        "number_of_rooms_available_for_this_comfort": 4,
        "number_of_adults": 2,
        "accomodation": {
          "id": "C2B",
          "label": "Chambre Standard - Menzel"
        },
        "departure_city": null,
        "departure_location": null,
        "instalment_count": null,
        "default_price_display": "per_trip",
        "fees_included": true,
        "offers": []
      }
    },
    "resort_id": "DDOC",
    "range": null,
    "seasons": [
      "SUMMER"
    ],
    "seo_description": "",
    "sibling_id": "",
    "title": "Djerba La Douce",
    "capacity_max": 1129,
    "accommodations_introduction": {
      "description": "Les logements évoquent le charme de Djerba, du romantique Aziza, à côté de la plage, à l'artistique Calypso, en passant par les pittoresques Menzel nichés dans des allées fleuries.",
      "short_description": "La chambre idéale pour votre séjour\n",
      "images": [
        "https://assets.dream.clubmed/pm_7531_24_24109-9sivn1igoh-swhr.jpg"
      ],
      "rooms_count": 508
    },
    "product_line": [
      "CORE"
    ],
    "tags": [
      {
        "title": "Espaces rénovés",
        "text_color_id": "#924833",
        "background_color_id": "#FFFFFF"
      }
    ],
    "_links": [
      {
        "rel": "web_seo_url",
        "method": "GET",
        "href": "https://www.clubmed.com/r/djerba-la-douce/y",
        "external": true
      }
    ]
  }
]

Response headers

 access-control-allow-credentials: true 
 access-control-expose-headers: Content-Range,Link,Accept-Ranges,x-request-id 
 cache-control: max-age=600,must-revalidate 
 connection: keep-alive 
 content-length: 13508 
 content-range: 0-2/782 
 content-type: application/json; charset=utf-8 
 date: Wed,25 Feb 2026 14:32:09 GMT 
 last-modified: Wed,25 Feb 2026 11:42:48 GMT 
 link: <https://api.clubmed.com/v2/products?limit=3&page=1&timestamp=1772029929003&api_key=201801041426.test.clubmed.com>; rel="self",<https://api.clubmed.com/v2/products?limit=3&page=1&timestamp=1772029929003&api_key=201801041426.test.clubmed.com>; rel="first",<https://api.clubmed.com/v2/products?limit=3&page=261&timestamp=1772029929003&api_key=201801041426.test.clubmed.com>; rel="last",<https://api.clubmed.com/v2/products?limit=3&page=2&timestamp=1772029929003&api_key=201801041426.test.clubmed.com>; rel="next" 
 server: nginx 
 x-request-id: 59db74f50329d9922e2f969d6421431b 

Responses
Code	Description	Links
200	

ok
Media type
Controls Accept header.

[
  {
    "id": "CHAC_WINTER",
    "access_conditions": {
      "is_for_adult_only": false,
      "min_authorized_age_in_months": 24
    },
    "areas": [
      {
        "id": "area_comfort_level_5_tridents",
        "label": "5 tridents area",
        "comfort": {
          "level": 5,
          "label": "5 tridents"
        }
      }
    ],
    "associated_product_id": "VMOV_WINTER",
    "available_services": [
      "WINTER_SPORTS"
    ],
    "category": {
      "id": "product_type_sun",
      "label": "Village soleil"
    },
    "clubmed_mobile_app": {
      "is_available": true,
      "description": "description"
    },
    "easy_arrival": {
      "is_available": true,
      "description": "description"
    },
    "comfort": {
      "level": 4,
      "label": "4 tridents"
    },
    "trip_details": {
      "departure_details": {
        "country": "Guadeloupe",
        "city": "Guadeloupe",
        "date": "20100430"
      },
      "arrival_details": {
        "country": "Guadeloupe",
        "city": "Guadeloupe",
        "date": "20180102"
      },
      "duration": {
        "in_nights": 8,
        "in_days": 9
      }
    },
    "description_title": "A stay at Chamonix, to enjoy the elegance of a legendary ski resort",
    "destination": {
      "geographical_area": {
        "id": "product_geographical_area_alps",
        "label": "Alps"
      },
      "countries": [
        {
          "id": "FR",
          "label": "France",
          "description": "France in brief\n\n\n- Surface area: 632,834 sq km\n\n- Capital: Paris\n\n- Official language: French\n \n- Currency: the Euro."
        }
      ],
      "region": {
        "id": "REG_000393",
        "label": "string"
      }
    },
    "full_title": "Clubmed Chamonix Mont-Blanc",
    "media": {
      "immersive_image": "http://mypicture",
      "surroundings_images": [
        "http:myresortsurroundingpicture"
      ],
      "map": "http://mymapsurl",
      "fact_sheet_url": "https://ns.clubmed.com/icp/factsheet/Factsheet.pdf"
    },
    "opening_status": "OPEN",
    "type": {
      "id": "VILLAGE",
      "label": "string"
    },
    "price": {
      "initial_price": {
        "per_trip": 975,
        "per_trip_with_fees": 1002.5,
        "per_night": 140,
        "per_night_with_fees": 144
      },
      "best_price": {
        "per_trip": 824,
        "per_trip_with_fees": 851.5,
        "per_night": 118,
        "per_night_with_fees": 122
      },
      "fee": {
        "per_trip": 27.5,
        "per_night": 4
      },
      "currency": "EUR",
      "terms_and_conditions": {
        "price_per": "ADULT",
        "package": "ALL_INCLUSIVE",
        "departure_date": "20171115",
        "arrival_date": "20171115",
        "stay_duration": 7,
        "total_duration": 7,
        "number_of_rooms_available_for_this_comfort": 2,
        "number_of_adults": 2,
        "accomodation": {
          "id": "C",
          "label": "Club Room"
        },
        "departure_city": {
          "id": "PAR",
          "label": "Paris"
        },
        "departure_location": {
          "id": "CDG",
          "label": "Charles de Gaulle airport"
        },
        "default_price_display": "per_trip",
        "fees_included": true,
        "instalment_count": 8,
        "offers": [
          {
            "id": "EBB",
            "label": "Early Booking Bonus"
          }
        ]
      }
    },
    "resort_id": "CHAC",
    "range": {
      "id": "range_escapade",
      "label": "Escapade"
    },
    "seasons": [
      "WINTER"
    ],
    "seo_description": "Enjoy a luxury all-inclusive ski holiday in our France resort. For ski holidays, activity holidays and spa holidays, our Chamonix resort has it all.",
    "sibling_id": "CHAC_SUMMER",
    "title": "Chamonix Mont-Blanc",
    "capacity_max": 1234,
    "accommodations_introduction": {
      "short_description": "Discover the richness of North African life",
      "description": "The Resort has 249 rooms in a hotel with several wings, less than 5 minutes walking distance from the centre of Chamonix...",
      "images": [
        "http://image.jpg"
      ],
      "rooms_count": 249
    },
    "tags": [
      {
        "title": "Tag Title",
        "text_color_id": "#FFFFFF",
        "background_color_id": "#000000"
      }
    ],
    "product_line": [
      "CORE"
    ],
    "_links": [
      {
        "rel": "self",
        "deprecated_rel": true,
        "external": false,
        "method": "GET",
        "href": "https://api.clubmed.com/products",
        "label": "A label"
      }
    ]
  }
]

	No links
206	

partial_content
	No links
400	

    bad_request
    validation_error

Media type

{
  "status_code": 400,
  "error": "bad_request",
  "error_description": "reason",
  "errors": [
    {
      "error_code": "FIELD_REQUIRED",
      "concerned_key": "product_id",
      "error_description": "product_id is required"
    }
  ]
}

	No links
416	

Requested range not satisfiable
Media type

{
  "status_code": 416,
  "error": "Requested range not satisfiable",
  "error_description": "reason"
}