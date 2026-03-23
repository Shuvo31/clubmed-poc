GET
/v0/destinations
Provides the list of products sorted by geographic commercial segmentation and by country.
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
a few seconds ago
filter
array<string>
(query)
	

string composed of a field name (can be a path), a comparison operator (>, >=, <=, <, ==, !=) and a value. Logical operator AND applies between filters
Responses
Snippets
cURL (bash)
cURL (PowerShell)
cURL (CMD)
Axios
Fetch
NodeJs Native

curl -X 'GET' \
  'https://api.clubmed.com/v0/destinations?timestamp=1772114771599' \
  -H 'accept: application/json' \
  -H 'accept-language: fr-FR' \
  -H 'x-api-key: 201801041426.test.clubmed.com'

Request URL

https://api.clubmed.com/v0/destinations?timestamp=1772114771599

Server response
Code	Details
200	
Response body
Payload to long to be highlighted

[
  {
    "id": "product_geographical_area_africa_middle_east",
    "geographical_area": "Afrique & Moyen-Orient",
    "countries": [
      {
        "id": "MA",
        "label": "Maroc",
        "products": [
          {
            "id": "MPAC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 31.660024,
              "longitude": -7.979626
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MPAC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MPAC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MPAC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MPAC"
              }
            ]
          },
          {
            "id": "YASC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 35.664371,
              "longitude": -5.285186
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/YASC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/YASC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/YASC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/YASC"
              }
            ]
          },
          {
            "id": "MAHEM",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MAHEM",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MAHEM",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MAHEM"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MAHEM"
              }
            ]
          },
          {
            "id": "MAEVI",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MAEVI",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MAEVI",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MAEVI"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MAEVI"
              }
            ]
          },
          {
            "id": "MAESYA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MAESYA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MAESYA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MAESYA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MAESYA"
              }
            ]
          }
        ]
      },
      {
        "id": "TN",
        "label": "Tunisie",
        "products": [
          {
            "id": "DDOC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 33.78022,
              "longitude": 11.048822
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/DDOC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/DDOC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/DDOC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/DDOC"
              }
            ]
          }
        ]
      },
      {
        "id": "ZA",
        "label": "Afrique du Sud",
        "products": [
          {
            "id": "SAFC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": -29.44093,
              "longitude": 31.291967
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SAFC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SAFC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SAFC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SAFC"
              }
            ]
          },
          {
            "id": "SAFL",
            "type": "LODGE",
            "coordinates": {
              "latitude": -27.57962,
              "longitude": 31.666528
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SAFL",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SAFL",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SAFL"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SAFL"
              }
            ]
          },
          {
            "id": "ZAMER",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZAMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZAMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZAMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZAMER"
              }
            ]
          },
          {
            "id": "ZATLCV",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZATLCV",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZATLCV",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZATLCV"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZATLCV"
              }
            ]
          },
          {
            "id": "ZAESCA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZAESCA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZAESCA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZAESCA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZAESCA"
              }
            ]
          }
        ]
      },
      {
        "id": "SN",
        "label": "Sénégal",
        "products": [
          {
            "id": "CSKC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 12.383741,
              "longitude": -16.740413
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CSKC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CSKC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CSKC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CSKC"
              }
            ]
          }
        ]
      },
      {
        "id": "KE",
        "label": "Kenya",
        "products": [
          {
            "id": "KETESA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/KETESA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/KETESA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/KETESA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/KETESA"
              }
            ]
          }
        ]
      },
      {
        "id": "NA",
        "label": "Namibie",
        "products": [
          {
            "id": "NAVFA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/NAVFA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/NAVFA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/NAVFA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/NAVFA"
              }
            ]
          },
          {
            "id": "ZWRFE",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZWRFE",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZWRFE",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZWRFE"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZWRFE"
              }
            ]
          },
          {
            "id": "NAVFAU",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/NAVFAU",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/NAVFAU",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/NAVFAU"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/NAVFAU"
              }
            ]
          }
        ]
      },
      {
        "id": "TZ",
        "label": "Tanzanie",
        "products": [
          {
            "id": "TZPTA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TZPTA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TZPTA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TZPTA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TZPTA"
              }
            ]
          }
        ]
      },
      {
        "id": "BW",
        "label": "Botswana",
        "products": [
          {
            "id": "ZWRFE",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZWRFE",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZWRFE",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZWRFE"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZWRFE"
              }
            ]
          },
          {
            "id": "ZAMER",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZAMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZAMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZAMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZAMER"
              }
            ]
          },
          {
            "id": "ZATLCV",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZATLCV",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZATLCV",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZATLCV"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZATLCV"
              }
            ]
          }
        ]
      },
      {
        "id": "ZW",
        "label": "Zimbabwe",
        "products": [
          {
            "id": "ZWRFE",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZWRFE",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZWRFE",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZWRFE"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZWRFE"
              }
            ]
          },
          {
            "id": "ZAMER",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZAMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZAMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZAMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZAMER"
              }
            ]
          },
          {
            "id": "ZATLCV",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZATLCV",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZATLCV",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ZATLCV"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ZATLCV"
              }
            ]
          }
        ]
      },
      {
        "id": "SC",
        "label": "Les Seychelles",
        "products": [
          {
            "id": "SCEAP",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SCEAP",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SCEAP",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SCEAP"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SCEAP"
              }
            ]
          }
        ]
      },
      {
        "id": "RE",
        "label": "Île de la Réunion",
        "products": [
          {
            "id": "RNCRE",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/RNCRE",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/RNCRE",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/RNCRE"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/RNCRE"
              }
            ]
          },
          {
            "id": "RNERU",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/RNERU",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/RNERU",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/RNERU"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/RNERU"
              }
            ]
          }
        ]
      },
      {
        "id": "AE",
        "label": "Émirats arabes unis",
        "products": [
          {
            "id": "EAESDU",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/EAESDU",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/EAESDU",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/EAESDU"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/EAESDU"
              }
            ]
          },
          {
            "id": "EADEF",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/EADEF",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/EADEF",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/EADEF"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/EADEF"
              }
            ]
          },
          {
            "id": "OMFSUL",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/OMFSUL",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/OMFSUL",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/OMFSUL"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/OMFSUL"
              }
            ]
          }
        ]
      },
      {
        "id": "EG",
        "label": "Egypte",
        "products": [
          {
            "id": "EGRAMS",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/EGRAMS",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/EGRAMS",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/EGRAMS"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/EGRAMS"
              }
            ]
          },
          {
            "id": "EGNIDA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/EGNIDA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/EGNIDA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/EGNIDA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/EGNIDA"
              }
            ]
          },
          {
            "id": "EGNET",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/EGNET",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/EGNET",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/EGNET"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/EGNET"
              }
            ]
          }
        ]
      },
      {
        "id": "IL",
        "label": "Israël",
        "products": [
          {
            "id": "ILCDT",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ILCDT",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ILCDT",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ILCDT"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ILCDT"
              }
            ]
          }
        ]
      },
      {
        "id": "JO",
        "label": "Jordanie",
        "products": [
          {
            "id": "JOROJ",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/JOROJ",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/JOROJ",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/JOROJ"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/JOROJ"
              }
            ]
          }
        ]
      },
      {
        "id": "OM",
        "label": "Oman",
        "products": [
          {
            "id": "EADEF",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/EADEF",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/EADEF",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/EADEF"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/EADEF"
              }
            ]
          },
          {
            "id": "OMFSUL",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/OMFSUL",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/OMFSUL",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/OMFSUL"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/OMFSUL"
              }
            ]
          }
        ]
      },
      {
        "id": "MG",
        "label": "Madagascar",
        "products": [
          {
            "id": "MGILE",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MGILE",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MGILE",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MGILE"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MGILE"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "product_geographical_area_europe_mediterranean_coasts",
    "geographical_area": "Europe & Côtes Méditerranéennes",
    "countries": [
      {
        "id": "ES",
        "label": "Espagne",
        "products": [
          {
            "id": "MMAC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 36.525705,
              "longitude": -4.892989
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MMAC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MMAC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MMAC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MMAC"
              }
            ]
          },
          {
            "id": "ESESSE",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ESESSE",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ESESSE",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ESESSE"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ESESSE"
              }
            ]
          },
          {
            "id": "ESESMA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ESESMA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ESESMA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ESESMA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ESESMA"
              }
            ]
          },
          {
            "id": "ESHIA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ESHIA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ESHIA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ESHIA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ESHIA"
              }
            ]
          },
          {
            "id": "CM2C_20260423_20260430",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260423_20260430",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260423_20260430",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260423_20260430"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260423_20260430"
              }
            ]
          },
          {
            "id": "CM2C_20260829_20260910",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260829_20260910",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260829_20260910",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260829_20260910"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260829_20260910"
              }
            ]
          },
          {
            "id": "CM2C_20261029_20261105",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261029_20261105",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261029_20261105",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261029_20261105"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261029_20261105"
              }
            ]
          }
        ]
      },
      {
        "id": "PT",
        "label": "Portugal",
        "products": [
          {
            "id": "DBAC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 37.090809,
              "longitude": -8.203356
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/DBAC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/DBAC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/DBAC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/DBAC"
              }
            ]
          },
          {
            "id": "PTBDF",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PTBDF",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PTBDF",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PTBDF"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PTBDF"
              }
            ]
          },
          {
            "id": "PTESLI",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PTESLI",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PTESLI",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PTESLI"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PTESLI"
              }
            ]
          }
        ]
      },
      {
        "id": "FR",
        "label": "France",
        "products": [
          {
            "id": "OPIC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 43.651004,
              "longitude": 6.997074
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/OPIC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/OPIC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/OPIC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/OPIC"
              }
            ]
          },
          {
            "id": "LPAC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.677346,
              "longitude": -1.163404
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LPAC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LPAC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LPAC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LPAC"
              }
            ]
          },
          {
            "id": "VERC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 48.212009,
              "longitude": 5.949611
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VERC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VERC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VERC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VERC"
              }
            ]
          },
          {
            "id": "CM2C_20260423_20260430",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260423_20260430",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260423_20260430",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260423_20260430"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260423_20260430"
              }
            ]
          },
          {
            "id": "CM2C_20260430_20260504",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260430_20260504",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260430_20260504",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260430_20260504"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260430_20260504"
              }
            ]
          },
          {
            "id": "CM2C_20260504_20260507",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260504_20260507",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260504_20260507",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260504_20260507"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260504_20260507"
              }
            ]
          },
          {
            "id": "CM2C_20260507_20260510",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260507_20260510",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260507_20260510",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260507_20260510"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260507_20260510"
              }
            ]
          },
          {
            "id": "CM2C_20260510_20260517",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260510_20260517",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260510_20260517",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260510_20260517"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260510_20260517"
              }
            ]
          },
          {
            "id": "CM2C_20260517_20260521",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260517_20260521",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260517_20260521",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260517_20260521"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260517_20260521"
              }
            ]
          },
          {
            "id": "CM2C_20260521_20260525",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260521_20260525",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260521_20260525",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260521_20260525"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260521_20260525"
              }
            ]
          },
          {
            "id": "CM2C_20260525_20260529",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260525_20260529",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260525_20260529",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260525_20260529"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260525_20260529"
              }
            ]
          },
          {
            "id": "CM2C_20260604_20260608",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260604_20260608",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260604_20260608",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260604_20260608"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260604_20260608"
              }
            ]
          },
          {
            "id": "CM2C_20260612_20260616",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260612_20260616",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260612_20260616",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260612_20260616"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260612_20260616"
              }
            ]
          },
          {
            "id": "CM2C_20260619_20260704",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260619_20260704",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260619_20260704",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260619_20260704"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260619_20260704"
              }
            ]
          },
          {
            "id": "CM2C_20260619_20260627",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260619_20260627",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260619_20260627",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260619_20260627"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260619_20260627"
              }
            ]
          },
          {
            "id": "CM2C_20260829_20260910",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260829_20260910",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260829_20260910",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260829_20260910"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260829_20260910"
              }
            ]
          },
          {
            "id": "CM2C_20260916_20260918",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260916_20260918",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260916_20260918",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260916_20260918"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260916_20260918"
              }
            ]
          },
          {
            "id": "CM2C_20260918_20260921",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260918_20260921",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260918_20260921",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260918_20260921"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260918_20260921"
              }
            ]
          },
          {
            "id": "CM2C_20260921_20260924",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260921_20260924",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260921_20260924",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260921_20260924"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260921_20260924"
              }
            ]
          },
          {
            "id": "CM2C_20260928_20261001",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260928_20261001",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260928_20261001",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260928_20261001"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260928_20261001"
              }
            ]
          },
          {
            "id": "CM2C_20261001_20261004",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261001_20261004",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261001_20261004",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261001_20261004"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261001_20261004"
              }
            ]
          },
          {
            "id": "CM2C_20261007_20261012",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261007_20261012",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261007_20261012",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261007_20261012"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261007_20261012"
              }
            ]
          },
          {
            "id": "CM2C_20261012_20261015",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261012_20261015",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261012_20261015",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261012_20261015"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261012_20261015"
              }
            ]
          },
          {
            "id": "CM2C_20261015_20261017",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261015_20261017",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261015_20261017",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261015_20261017"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261015_20261017"
              }
            ]
          },
          {
            "id": "CM2C_20261017_20261024",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261017_20261024",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261017_20261024",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261017_20261024"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261017_20261024"
              }
            ]
          },
          {
            "id": "CM2C_20261024_20261029",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261024_20261029",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261024_20261029",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261024_20261029"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261024_20261029"
              }
            ]
          },
          {
            "id": "CM2C_20261029_20261105",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261029_20261105",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261029_20261105",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261029_20261105"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261029_20261105"
              }
            ]
          }
        ]
      },
      {
        "id": "TR",
        "label": "Turquie",
        "products": [
          {
            "id": "PALC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 36.636552,
              "longitude": 30.556147
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PALC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PALC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PALC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PALC"
              }
            ]
          },
          {
            "id": "PAHC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 36.634478,
              "longitude": 30.55516
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PAHC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PAHC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PAHC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PAHC"
              }
            ]
          },
          {
            "id": "BODC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 36.989252,
              "longitude": 27.536564
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/BODC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/BODC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/BODC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/BODC"
              }
            ]
          },
          {
            "id": "TRCVS",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TRCVS",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TRCVS",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TRCVS"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TRCVS"
              }
            ]
          },
          {
            "id": "TREIS",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TREIS",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TREIS",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TREIS"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TREIS"
              }
            ]
          },
          {
            "id": "CM2C_20260711_20260718",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260711_20260718",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260711_20260718",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260711_20260718"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260711_20260718"
              }
            ]
          },
          {
            "id": "CM2C_20260718_20260725",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260718_20260725",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260718_20260725",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260718_20260725"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260718_20260725"
              }
            ]
          },
          {
            "id": "CM2C_20260725_20260801",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260725_20260801",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260725_20260801",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260725_20260801"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260725_20260801"
              }
            ]
          },
          {
            "id": "CM2C_20260801_20260808",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260801_20260808",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260801_20260808",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260801_20260808"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260801_20260808"
              }
            ]
          },
          {
            "id": "CM2C_20260808_20260815",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260808_20260815",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260808_20260815",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260808_20260815"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260808_20260815"
              }
            ]
          }
        ]
      },
      {
        "id": "GR",
        "label": "Grèce ",
        "products": [
          {
            "id": "GREC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 38.834146,
              "longitude": 22.940592
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GREC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GREC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GREC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GREC"
              }
            ]
          },
          {
            "id": "GRLEDI",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GRLEDI",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GRLEDI",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GRLEDI"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GRLEDI"
              }
            ]
          },
          {
            "id": "GRESAI",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GRESAI",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GRESAI",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GRESAI"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GRESAI"
              }
            ]
          },
          {
            "id": "GRNCRE",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GRNCRE",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GRNCRE",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GRNCRE"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GRNCRE"
              }
            ]
          },
          {
            "id": "CM2C_20260711_20260718",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260711_20260718",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260711_20260718",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260711_20260718"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260711_20260718"
              }
            ]
          },
          {
            "id": "CM2C_20260718_20260725",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260718_20260725",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260718_20260725",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260718_20260725"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260718_20260725"
              }
            ]
          },
          {
            "id": "CM2C_20260725_20260801",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260725_20260801",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260725_20260801",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260725_20260801"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260725_20260801"
              }
            ]
          },
          {
            "id": "CM2C_20260801_20260808",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260801_20260808",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260801_20260808",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260801_20260808"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260801_20260808"
              }
            ]
          },
          {
            "id": "CM2C_20260808_20260815",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260808_20260815",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260808_20260815",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260808_20260815"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260808_20260815"
              }
            ]
          },
          {
            "id": "CM2C_20260815_20260822",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260815_20260822",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260815_20260822",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260815_20260822"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260815_20260822"
              }
            ]
          },
          {
            "id": "GRMCYC",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GRMCYC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GRMCYC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GRMCYC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GRMCYC"
              }
            ]
          }
        ]
      },
      {
        "id": "IT",
        "label": "Italie",
        "products": [
          {
            "id": "CFAC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 38.033301,
              "longitude": 13.999138
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CFAC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CFAC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CFAC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CFAC"
              }
            ]
          },
          {
            "id": "ITNAP",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ITNAP",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ITNAP",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ITNAP"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ITNAP"
              }
            ]
          },
          {
            "id": "ITSAV",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ITSAV",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ITSAV",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ITSAV"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ITSAV"
              }
            ]
          },
          {
            "id": "ITVSS",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ITVSS",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ITVSS",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ITVSS"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ITVSS"
              }
            ]
          },
          {
            "id": "ITESS",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ITESS",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ITESS",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ITESS"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ITESS"
              }
            ]
          },
          {
            "id": "ITLACI",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ITLACI",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ITLACI",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ITLACI"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ITLACI"
              }
            ]
          },
          {
            "id": "ITMTO",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ITMTO",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ITMTO",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ITMTO"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ITMTO"
              }
            ]
          },
          {
            "id": "CM2C_20260430_20260504",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260430_20260504",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260430_20260504",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260430_20260504"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260430_20260504"
              }
            ]
          },
          {
            "id": "CM2C_20260504_20260507",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260504_20260507",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260504_20260507",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260504_20260507"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260504_20260507"
              }
            ]
          },
          {
            "id": "CM2C_20260507_20260510",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260507_20260510",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260507_20260510",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260507_20260510"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260507_20260510"
              }
            ]
          },
          {
            "id": "CM2C_20260510_20260517",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260510_20260517",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260510_20260517",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260510_20260517"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260510_20260517"
              }
            ]
          },
          {
            "id": "CM2C_20260517_20260521",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260517_20260521",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260517_20260521",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260517_20260521"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260517_20260521"
              }
            ]
          },
          {
            "id": "CM2C_20260521_20260525",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260521_20260525",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260521_20260525",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260521_20260525"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260521_20260525"
              }
            ]
          },
          {
            "id": "CM2C_20260525_20260529",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260525_20260529",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260525_20260529",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260525_20260529"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260525_20260529"
              }
            ]
          },
          {
            "id": "CM2C_20260604_20260608",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260604_20260608",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260604_20260608",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260604_20260608"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260604_20260608"
              }
            ]
          },
          {
            "id": "CM2C_20260612_20260616",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260612_20260616",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260612_20260616",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260612_20260616"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260612_20260616"
              }
            ]
          },
          {
            "id": "CM2C_20260619_20260704",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260619_20260704",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260619_20260704",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260619_20260704"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260619_20260704"
              }
            ]
          },
          {
            "id": "CM2C_20260619_20260627",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260619_20260627",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260619_20260627",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260619_20260627"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260619_20260627"
              }
            ]
          },
          {
            "id": "CM2C_20260627_20260704",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260627_20260704",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260627_20260704",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260627_20260704"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260627_20260704"
              }
            ]
          },
          {
            "id": "CM2C_20260704_20260711",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260704_20260711",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260704_20260711",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260704_20260711"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260704_20260711"
              }
            ]
          },
          {
            "id": "CM2C_20260711_20260718",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260711_20260718",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260711_20260718",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260711_20260718"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260711_20260718"
              }
            ]
          },
          {
            "id": "CM2C_20260815_20260822",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260815_20260822",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260815_20260822",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260815_20260822"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260815_20260822"
              }
            ]
          },
          {
            "id": "CM2C_20260822_20260829",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260822_20260829",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260822_20260829",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260822_20260829"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260822_20260829"
              }
            ]
          },
          {
            "id": "CM2C_20260829_20260910",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260829_20260910",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260829_20260910",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260829_20260910"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260829_20260910"
              }
            ]
          },
          {
            "id": "CM2C_20260916_20260918",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260916_20260918",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260916_20260918",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260916_20260918"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260916_20260918"
              }
            ]
          },
          {
            "id": "CM2C_20260918_20260921",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260918_20260921",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260918_20260921",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260918_20260921"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260918_20260921"
              }
            ]
          },
          {
            "id": "CM2C_20260921_20260924",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260921_20260924",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260921_20260924",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260921_20260924"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260921_20260924"
              }
            ]
          },
          {
            "id": "CM2C_20260928_20261001",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260928_20261001",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260928_20261001",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260928_20261001"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260928_20261001"
              }
            ]
          },
          {
            "id": "CM2C_20261001_20261004",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261001_20261004",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261001_20261004",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261001_20261004"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261001_20261004"
              }
            ]
          },
          {
            "id": "CM2C_20261007_20261012",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261007_20261012",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261007_20261012",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261007_20261012"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261007_20261012"
              }
            ]
          },
          {
            "id": "CM2C_20261012_20261015",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261012_20261015",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261012_20261015",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261012_20261015"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261012_20261015"
              }
            ]
          },
          {
            "id": "CM2C_20261015_20261017",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261015_20261017",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261015_20261017",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261015_20261017"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261015_20261017"
              }
            ]
          },
          {
            "id": "CM2C_20261017_20261024",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261017_20261024",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261017_20261024",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261017_20261024"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261017_20261024"
              }
            ]
          },
          {
            "id": "CM2C_20261024_20261029",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261024_20261029",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261024_20261029",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20261024_20261029"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20261024_20261029"
              }
            ]
          }
        ]
      },
      {
        "id": "NO",
        "label": "Norvège",
        "products": [
          {
            "id": "NOODE",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/NOODE",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/NOODE",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/NOODE"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/NOODE"
              }
            ]
          }
        ]
      },
      {
        "id": "PT-30",
        "label": "Madère ",
        "products": [
          {
            "id": "PTMFO",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PTMFO",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PTMFO",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PTMFO"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PTMFO"
              }
            ]
          }
        ]
      },
      {
        "id": "SE",
        "label": "Suède",
        "products": [
          {
            "id": "SELAP",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SELAP",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SELAP",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SELAP"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SELAP"
              }
            ]
          }
        ]
      },
      {
        "id": "CZ",
        "label": "République Tchèque",
        "products": [
          {
            "id": "CZCDD",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CZCDD",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CZCDD",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CZCDD"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CZCDD"
              }
            ]
          }
        ]
      },
      {
        "id": "AT",
        "label": "Autriche",
        "products": [
          {
            "id": "CZCDD",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CZCDD",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CZCDD",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CZCDD"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CZCDD"
              }
            ]
          }
        ]
      },
      {
        "id": "SK",
        "label": "Slovaquie",
        "products": [
          {
            "id": "CZCDD",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CZCDD",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CZCDD",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CZCDD"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CZCDD"
              }
            ]
          }
        ]
      },
      {
        "id": "HU",
        "label": "Hongrie",
        "products": [
          {
            "id": "CZCDD",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CZCDD",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CZCDD",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CZCDD"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CZCDD"
              }
            ]
          }
        ]
      },
      {
        "id": "GB-SCT",
        "label": "Ecosse",
        "products": [
          {
            "id": "GBRECO",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GBRECO",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GBRECO",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GBRECO"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GBRECO"
              }
            ]
          }
        ]
      },
      {
        "id": "IE",
        "label": "Irlande",
        "products": [
          {
            "id": "IEINCE",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/IEINCE",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/IEINCE",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/IEINCE"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/IEINCE"
              }
            ]
          }
        ]
      },
      {
        "id": "SI",
        "label": "Slovénie",
        "products": [
          {
            "id": "CM2C_20260619_20260704",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260619_20260704",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260619_20260704",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260619_20260704"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260619_20260704"
              }
            ]
          },
          {
            "id": "CM2C_20260627_20260704",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260627_20260704",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260627_20260704",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260627_20260704"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260627_20260704"
              }
            ]
          }
        ]
      },
      {
        "id": "HR",
        "label": "Croatie",
        "products": [
          {
            "id": "CM2C_20260704_20260711",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260704_20260711",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260704_20260711",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260704_20260711"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260704_20260711"
              }
            ]
          },
          {
            "id": "CM2C_20260815_20260822",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260815_20260822",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260815_20260822",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260815_20260822"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260815_20260822"
              }
            ]
          }
        ]
      },
      {
        "id": "ME",
        "label": "Monténégro",
        "products": [
          {
            "id": "CM2C_20260704_20260711",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260704_20260711",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260704_20260711",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260704_20260711"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260704_20260711"
              }
            ]
          }
        ]
      },
      {
        "id": "MT",
        "label": "Malte",
        "products": [
          {
            "id": "CM2C_20260822_20260829",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260822_20260829",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260822_20260829",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260822_20260829"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260822_20260829"
              }
            ]
          },
          {
            "id": "CM2C_20260829_20260910",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260829_20260910",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260829_20260910",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260829_20260910"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260829_20260910"
              }
            ]
          }
        ]
      },
      {
        "id": "TN",
        "label": "Tunisie",
        "products": [
          {
            "id": "CM2C_20260829_20260910",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260829_20260910",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260829_20260910",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260829_20260910"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260829_20260910"
              }
            ]
          }
        ]
      },
      {
        "id": "IS",
        "label": "Islande",
        "products": [
          {
            "id": "ISSYI",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ISSYI",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ISSYI",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ISSYI"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ISSYI"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "product_geographical_area_asia_indian_ocean",
    "geographical_area": "Océan Indien & Asie",
    "countries": [
      {
        "id": "MU",
        "label": "Ile Maurice",
        "products": [
          {
            "id": "MAUC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": -20.004722,
              "longitude": 57.553835
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MAUC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MAUC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MAUC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MAUC"
              }
            ]
          },
          {
            "id": "ALBC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": -20.217505,
              "longitude": 57.398998
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ALBC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ALBC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ALBC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ALBC"
              }
            ]
          },
          {
            "id": "ALBV",
            "type": "VILLA",
            "coordinates": {
              "latitude": -20.219407,
              "longitude": 57.394631
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ALBV",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ALBV",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ALBV"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ALBV"
              }
            ]
          }
        ]
      },
      {
        "id": "SC",
        "label": "Les Seychelles",
        "products": [
          {
            "id": "SEYC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": -4.61275,
              "longitude": 55.497417
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SEYC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SEYC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SEYC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SEYC"
              }
            ]
          },
          {
            "id": "SCJOS",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SCJOS",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SCJOS",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SCJOS"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SCJOS"
              }
            ]
          }
        ]
      },
      {
        "id": "MV",
        "label": "Maldives",
        "products": [
          {
            "id": "KANC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 4.342659,
              "longitude": 73.606974
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/KANC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/KANC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/KANC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/KANC"
              }
            ]
          },
          {
            "id": "KANV",
            "type": "VILLA",
            "coordinates": {
              "latitude": 4.361575,
              "longitude": 73.626201
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/KANV",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/KANV",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/KANV"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/KANV"
              }
            ]
          }
        ]
      },
      {
        "id": "JP",
        "label": "Japon",
        "products": [
          {
            "id": "TOMC_SUMMER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 43.064081,
              "longitude": 142.61988
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TOMC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TOMC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TOMC_SUMMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TOMC_SUMMER"
              }
            ]
          },
          {
            "id": "SAOC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 43.16997,
              "longitude": 142.809316
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SAOC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SAOC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SAOC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SAOC_WINTER"
              }
            ]
          },
          {
            "id": "TOMC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 43.064081,
              "longitude": 142.61988
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TOMC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TOMC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TOMC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TOMC_WINTER"
              }
            ]
          },
          {
            "id": "KIPC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 43.067572,
              "longitude": 140.989007
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/KIPC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/KIPC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/KIPC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/KIPC_WINTER"
              }
            ]
          },
          {
            "id": "KABC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 24.480472,
              "longitude": 124.120324
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/KABC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/KABC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/KABC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/KABC"
              }
            ]
          },
          {
            "id": "JPVOTA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/JPVOTA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/JPVOTA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/JPVOTA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/JPVOTA"
              }
            ]
          },
          {
            "id": "KIGC_SUMMER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 43.075232,
              "longitude": 140.982956
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/KIGC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/KIGC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/KIGC_SUMMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/KIGC_SUMMER"
              }
            ]
          },
          {
            "id": "KIGC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 43.075232,
              "longitude": 140.982956
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/KIGC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/KIGC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/KIGC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/KIGC_WINTER"
              }
            ]
          }
        ]
      },
      {
        "id": "TH",
        "label": "Thaïlande",
        "products": [
          {
            "id": "PHUC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 7.822306,
              "longitude": 98.298121
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PHUC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PHUC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PHUC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PHUC"
              }
            ]
          },
          {
            "id": "THBKRK",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/THBKRK",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/THBKRK",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/THBKRK"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/THBKRK"
              }
            ]
          },
          {
            "id": "THORCA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/THORCA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/THORCA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/THORCA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/THORCA"
              }
            ]
          },
          {
            "id": "THESNK",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/THESNK",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/THESNK",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/THESNK"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/THESNK"
              }
            ]
          },
          {
            "id": "THESBA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/THESBA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/THESBA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/THESBA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/THESBA"
              }
            ]
          }
        ]
      },
      {
        "id": "ID",
        "label": "Indonésie",
        "products": [
          {
            "id": "BALC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": -8.790546,
              "longitude": 115.228501
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/BALC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/BALC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/BALC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/BALC"
              }
            ]
          },
          {
            "id": "RBIC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 1.199388,
              "longitude": 104.406663
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/RBIC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/RBIC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/RBIC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/RBIC"
              }
            ]
          },
          {
            "id": "IDESBA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/IDESBA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/IDESBA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/IDESBA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/IDESBA"
              }
            ]
          },
          {
            "id": "IDBAKI",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/IDBAKI",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/IDBAKI",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/IDBAKI"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/IDBAKI"
              }
            ]
          }
        ]
      },
      {
        "id": "MY",
        "label": "Malaisie",
        "products": [
          {
            "id": "CHEC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 4.138393,
              "longitude": 103.40792
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CHEC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CHEC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CHEC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CHEC"
              }
            ]
          },
          {
            "id": "MYESPI",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MYESPI",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MYESPI",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MYESPI"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MYESPI"
              }
            ]
          }
        ]
      },
      {
        "id": "CN",
        "label": "Chine",
        "products": [
          {
            "id": "CBAC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 41.96718,
              "longitude": 127.51839
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CBAC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CBAC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CBAC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CBAC_WINTER"
              }
            ]
          },
          {
            "id": "YABC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 44.7864,
              "longitude": 128.4818
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/YABC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/YABC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/YABC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/YABC_WINTER"
              }
            ]
          },
          {
            "id": "GUIC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 25.044995,
              "longitude": 110.334078
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GUIC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GUIC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GUIC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GUIC"
              }
            ]
          },
          {
            "id": "CNPAMA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CNPAMA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CNPAMA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CNPAMA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CNPAMA"
              }
            ]
          },
          {
            "id": "LJIC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 26.982279,
              "longitude": 100.218946
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LJIC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LJIC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LJIC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LJIC"
              }
            ]
          },
          {
            "id": "CBAC_SUMMER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 41.96718,
              "longitude": 127.51839
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CBAC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CBAC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CBAC_SUMMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CBAC_SUMMER"
              }
            ]
          },
          {
            "id": "BEIC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 43.42109,
              "longitude": 126.628713
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/BEIC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/BEIC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/BEIC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/BEIC_WINTER"
              }
            ]
          }
        ]
      },
      {
        "id": "VN",
        "label": "Vietnam",
        "products": [
          {
            "id": "VNPIND",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VNPIND",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VNPIND",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VNPIND"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VNPIND"
              }
            ]
          },
          {
            "id": "LAVICA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LAVICA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LAVICA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LAVICA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LAVICA"
              }
            ]
          }
        ]
      },
      {
        "id": "KH",
        "label": "Cambodge",
        "products": [
          {
            "id": "VNPIND",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VNPIND",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VNPIND",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VNPIND"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VNPIND"
              }
            ]
          },
          {
            "id": "LAVICA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LAVICA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LAVICA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LAVICA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LAVICA"
              }
            ]
          }
        ]
      },
      {
        "id": "LK",
        "label": "Sri Lanka",
        "products": [
          {
            "id": "LKESSR",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LKESSR",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LKESSR",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LKESSR"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LKESSR"
              }
            ]
          },
          {
            "id": "LKSRIL",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LKSRIL",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LKSRIL",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LKSRIL"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LKSRIL"
              }
            ]
          }
        ]
      },
      {
        "id": "IN",
        "label": "Inde",
        "products": [
          {
            "id": "INSPRA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/INSPRA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/INSPRA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/INSPRA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/INSPRA"
              }
            ]
          },
          {
            "id": "INGSD",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/INGSD",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/INGSD",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/INGSD"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/INGSD"
              }
            ]
          }
        ]
      },
      {
        "id": "NP",
        "label": "Népal",
        "products": [
          {
            "id": "NPSANH",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/NPSANH",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/NPSANH",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/NPSANH"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/NPSANH"
              }
            ]
          }
        ]
      },
      {
        "id": "BT",
        "label": "Bhoutan",
        "products": [
          {
            "id": "NPSANH",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/NPSANH",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/NPSANH",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/NPSANH"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/NPSANH"
              }
            ]
          }
        ]
      },
      {
        "id": "KR",
        "label": "Corée du Sud",
        "products": [
          {
            "id": "KRCSON",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/KRCSON",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/KRCSON",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/KRCSON"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/KRCSON"
              }
            ]
          }
        ]
      },
      {
        "id": "LA",
        "label": "Laos",
        "products": [
          {
            "id": "LAVICA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LAVICA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LAVICA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LAVICA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LAVICA"
              }
            ]
          }
        ]
      },
      {
        "id": "UZ",
        "label": "Ouzbékistan",
        "products": [
          {
            "id": "UZCHE",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/UZCHE",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/UZCHE",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/UZCHE"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/UZCHE"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "product_geographical_area_alps",
    "geographical_area": "les Alpes",
    "countries": [
      {
        "id": "FR",
        "label": "France",
        "products": [
          {
            "id": "GMAC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 46.054303,
              "longitude": 6.696667
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GMAC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GMAC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GMAC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GMAC_WINTER"
              }
            ]
          },
          {
            "id": "LROC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.62983,
              "longitude": 6.856679
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LROC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LROC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LROC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LROC_WINTER"
              }
            ]
          },
          {
            "id": "ALHC_SUMMER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.08912,
              "longitude": 6.081218
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ALHC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ALHC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ALHC_SUMMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ALHC_SUMMER"
              }
            ]
          },
          {
            "id": "PVAC_SUMMER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.552831,
              "longitude": 6.763305
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PVAC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PVAC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PVAC_SUMMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PVAC_SUMMER"
              }
            ]
          },
          {
            "id": "VMOC_SUMMER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.456088,
              "longitude": 6.444722
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VMOC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VMOC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VMOC_SUMMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VMOC_SUMMER"
              }
            ]
          },
          {
            "id": "SECC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 44.945823,
              "longitude": 6.55092
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SECC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SECC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SECC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SECC_WINTER"
              }
            ]
          },
          {
            "id": "TIGC_SUMMER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.4539,
              "longitude": 6.89756
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TIGC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TIGC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TIGC_SUMMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TIGC_SUMMER"
              }
            ]
          },
          {
            "id": "ARPC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.596767,
              "longitude": 6.800975
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ARPC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ARPC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ARPC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ARPC_WINTER"
              }
            ]
          },
          {
            "id": "VMOC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.456088,
              "longitude": 6.444722
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VMOC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VMOC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VMOC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VMOC_WINTER"
              }
            ]
          },
          {
            "id": "TIGC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.4539,
              "longitude": 6.89756
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TIGC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TIGC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TIGC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TIGC_WINTER"
              }
            ]
          },
          {
            "id": "ALHC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.08912,
              "longitude": 6.081218
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ALHC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ALHC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ALHC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ALHC_WINTER"
              }
            ]
          },
          {
            "id": "PVAC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.552831,
              "longitude": 6.763305
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PVAC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PVAC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PVAC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PVAC_WINTER"
              }
            ]
          },
          {
            "id": "VTHC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.298609,
              "longitude": 6.578728
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VTHC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VTHC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VTHC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VTHC"
              }
            ]
          },
          {
            "id": "VDIC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.441918,
              "longitude": 6.976552
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VDIC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VDIC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VDIC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VDIC_WINTER"
              }
            ]
          },
          {
            "id": "VMOV_WINTER",
            "type": "VILLA",
            "coordinates": {
              "latitude": 45.548498,
              "longitude": 6.310855
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VMOV_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VMOV_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VMOV_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VMOV_WINTER"
              }
            ]
          },
          {
            "id": "GMAV_WINTER",
            "type": "VILLA",
            "coordinates": {
              "latitude": 46.0321,
              "longitude": 6.422
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GMAV_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GMAV_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GMAV_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GMAV_WINTER"
              }
            ]
          },
          {
            "id": "LROC_SUMMER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.62983,
              "longitude": 6.856679
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LROC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LROC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LROC_SUMMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LROC_SUMMER"
              }
            ]
          },
          {
            "id": "LROV_SUMMER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.62983,
              "longitude": 6.856679
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LROV_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LROV_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LROV_SUMMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LROV_SUMMER"
              }
            ]
          },
          {
            "id": "VMOV_SUMMER",
            "type": "VILLA",
            "coordinates": {
              "latitude": 45.548498,
              "longitude": 6.310855
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VMOV_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VMOV_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VMOV_SUMMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VMOV_SUMMER"
              }
            ]
          },
          {
            "id": "GMAC_SUMMER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 46.054303,
              "longitude": 6.696667
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GMAC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GMAC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GMAC_SUMMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GMAC_SUMMER"
              }
            ]
          },
          {
            "id": "VDIC_SUMMER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.441918,
              "longitude": 6.976552
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VDIC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VDIC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/VDIC_SUMMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/VDIC_SUMMER"
              }
            ]
          },
          {
            "id": "SECC_SUMMER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 44.945823,
              "longitude": 6.55092
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SECC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SECC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SECC_SUMMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SECC_SUMMER"
              }
            ]
          },
          {
            "id": "PLAC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.509334,
              "longitude": 6.668202
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PLAC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PLAC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PLAC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PLAC"
              }
            ]
          },
          {
            "id": "LROV_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 45.62983,
              "longitude": 6.856679
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LROV_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LROV_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LROV_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LROV_WINTER"
              }
            ]
          }
        ]
      },
      {
        "id": "IT",
        "label": "Italie",
        "products": [
          {
            "id": "PRAC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 44.988584,
              "longitude": 6.919152
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PRAC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PRAC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PRAC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PRAC_WINTER"
              }
            ]
          },
          {
            "id": "PRAC_SUMMER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 44.988584,
              "longitude": 6.919152
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PRAC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PRAC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PRAC_SUMMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PRAC_SUMMER"
              }
            ]
          }
        ]
      },
      {
        "id": "CH",
        "label": "Suisse",
        "products": [
          {
            "id": "SMRC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 46.484459,
              "longitude": 9.838593
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SMRC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SMRC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/SMRC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/SMRC"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "product_geographical_area_caribbean_north_america",
    "geographical_area": "Caraïbes & Amérique du Nord",
    "countries": [
      {
        "id": "BS",
        "label": "Bahamas",
        "products": [
          {
            "id": "COLC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 24.070996,
              "longitude": -74.533151
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/COLC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/COLC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/COLC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/COLC"
              }
            ]
          }
        ]
      },
      {
        "id": "GP",
        "label": "Guadeloupe - Antilles Françaises",
        "products": [
          {
            "id": "CARC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 16.219761,
              "longitude": -61.397151
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CARC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CARC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CARC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CARC"
              }
            ]
          },
          {
            "id": "GDODC",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GDODC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GDODC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GDODC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GDODC"
              }
            ]
          },
          {
            "id": "CM2C_20260221_20260228",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260221_20260228",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260221_20260228",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260221_20260228"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260221_20260228"
              }
            ]
          },
          {
            "id": "CM2C_20260228_20260307",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260228_20260307",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260228_20260307",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260228_20260307"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260228_20260307"
              }
            ]
          },
          {
            "id": "CM2C_20260307_20260314",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260307_20260314",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260307_20260314",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260307_20260314"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260307_20260314"
              }
            ]
          },
          {
            "id": "CM2C_20260314_20260325",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260314_20260325",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260314_20260325",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260314_20260325"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260314_20260325"
              }
            ]
          },
          {
            "id": "CM2C_20260325_20260402",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260325_20260402",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260325_20260402",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260325_20260402"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260325_20260402"
              }
            ]
          }
        ]
      },
      {
        "id": "DO",
        "label": "République Dominicaine",
        "products": [
          {
            "id": "PCAC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 18.545213,
              "longitude": -68.350668
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PCAC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PCAC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PCAC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PCAC"
              }
            ]
          },
          {
            "id": "MPEC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 19.01473,
              "longitude": -69.00967
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MPEC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MPEC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MPEC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MPEC"
              }
            ]
          },
          {
            "id": "CM2C_20260314_20260325",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260314_20260325",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260314_20260325",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260314_20260325"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260314_20260325"
              }
            ]
          },
          {
            "id": "CM2C_20260325_20260402",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260325_20260402",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260325_20260402",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260325_20260402"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260325_20260402"
              }
            ]
          }
        ]
      },
      {
        "id": "CA",
        "label": "Canada",
        "products": [
          {
            "id": "QCHC_WINTER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 47.28569,
              "longitude": -70.570503
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/QCHC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/QCHC_WINTER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/QCHC_WINTER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/QCHC_WINTER"
              }
            ]
          },
          {
            "id": "QCHC_SUMMER",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 47.28569,
              "longitude": -70.570503
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/QCHC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/QCHC_SUMMER",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/QCHC_SUMMER"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/QCHC_SUMMER"
              }
            ]
          },
          {
            "id": "CAGRN",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CAGRN",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CAGRN",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CAGRN"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CAGRN"
              }
            ]
          },
          {
            "id": "CAESMO",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CAESMO",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CAESMO",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CAESMO"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CAESMO"
              }
            ]
          },
          {
            "id": "CAESQU",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CAESQU",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CAESQU",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CAESQU"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CAESQU"
              }
            ]
          },
          {
            "id": "CAESTO",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CAESTO",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CAESTO",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CAESTO"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CAESTO"
              }
            ]
          }
        ]
      },
      {
        "id": "MQ",
        "label": "Martinique - Antilles Françaises",
        "products": [
          {
            "id": "BUCC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 14.446572,
              "longitude": -60.884758
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/BUCC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/BUCC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/BUCC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/BUCC"
              }
            ]
          },
          {
            "id": "CM2C_20260221_20260228",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260221_20260228",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260221_20260228",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260221_20260228"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260221_20260228"
              }
            ]
          },
          {
            "id": "CM2C_20260228_20260307",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260228_20260307",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260228_20260307",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260228_20260307"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260228_20260307"
              }
            ]
          },
          {
            "id": "CM2C_20260307_20260314",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260307_20260314",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260307_20260314",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260307_20260314"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260307_20260314"
              }
            ]
          },
          {
            "id": "CM2C_20260325_20260402",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260325_20260402",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260325_20260402",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260325_20260402"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260325_20260402"
              }
            ]
          }
        ]
      },
      {
        "id": "TC",
        "label": "Turks et Caicos",
        "products": [
          {
            "id": "TURC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 21.803613,
              "longitude": -72.168328
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TURC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TURC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TURC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TURC"
              }
            ]
          }
        ]
      },
      {
        "id": "MX",
        "label": "Mexique",
        "products": [
          {
            "id": "CANC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 21.035714,
              "longitude": -86.778388
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CANC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CANC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CANC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CANC"
              }
            ]
          },
          {
            "id": "MXESYU",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MXESYU",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MXESYU",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MXESYU"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MXESYU"
              }
            ]
          },
          {
            "id": "MXGTY",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MXGTY",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MXGTY",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MXGTY"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MXGTY"
              }
            ]
          },
          {
            "id": "MXMPLC",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MXMPLC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MXMPLC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/MXMPLC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/MXMPLC"
              }
            ]
          }
        ]
      },
      {
        "id": "VG",
        "label": "Îles Vierges Britanniques",
        "products": [
          {
            "id": "CM2C_20260221_20260228",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260221_20260228",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260221_20260228",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260221_20260228"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260221_20260228"
              }
            ]
          },
          {
            "id": "CM2C_20260307_20260314",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260307_20260314",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260307_20260314",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260307_20260314"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260307_20260314"
              }
            ]
          },
          {
            "id": "CM2C_20260314_20260325",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260314_20260325",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260314_20260325",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260314_20260325"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260314_20260325"
              }
            ]
          },
          {
            "id": "CM2C_20260325_20260402",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260325_20260402",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260325_20260402",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260325_20260402"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260325_20260402"
              }
            ]
          }
        ]
      },
      {
        "id": "AI",
        "label": "Anguilla",
        "products": [
          {
            "id": "CM2C_20260221_20260228",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260221_20260228",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260221_20260228",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260221_20260228"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260221_20260228"
              }
            ]
          },
          {
            "id": "CM2C_20260307_20260314",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260307_20260314",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260307_20260314",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260307_20260314"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260307_20260314"
              }
            ]
          },
          {
            "id": "CM2C_20260314_20260325",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260314_20260325",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260314_20260325",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260314_20260325"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260314_20260325"
              }
            ]
          }
        ]
      },
      {
        "id": "BL",
        "label": "Saint Barthélemy",
        "products": [
          {
            "id": "CM2C_20260221_20260228",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260221_20260228",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260221_20260228",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260221_20260228"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260221_20260228"
              }
            ]
          },
          {
            "id": "CM2C_20260307_20260314",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260307_20260314",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260307_20260314",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260307_20260314"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260307_20260314"
              }
            ]
          },
          {
            "id": "CM2C_20260314_20260325",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260314_20260325",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260314_20260325",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260314_20260325"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260314_20260325"
              }
            ]
          }
        ]
      },
      {
        "id": "KN",
        "label": "Saint Kitts and Nevis",
        "products": [
          {
            "id": "CM2C_20260221_20260228",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260221_20260228",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260221_20260228",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260221_20260228"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260221_20260228"
              }
            ]
          },
          {
            "id": "CM2C_20260307_20260314",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260307_20260314",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260307_20260314",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260307_20260314"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260307_20260314"
              }
            ]
          },
          {
            "id": "CM2C_20260314_20260325",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260314_20260325",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260314_20260325",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260314_20260325"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260314_20260325"
              }
            ]
          },
          {
            "id": "CM2C_20260325_20260402",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260325_20260402",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260325_20260402",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260325_20260402"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260325_20260402"
              }
            ]
          }
        ]
      },
      {
        "id": "AG",
        "label": "Antigua-et-Barbuda",
        "products": [
          {
            "id": "CM2C_20260221_20260228",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260221_20260228",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260221_20260228",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260221_20260228"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260221_20260228"
              }
            ]
          },
          {
            "id": "CM2C_20260307_20260314",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260307_20260314",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260307_20260314",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260307_20260314"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260307_20260314"
              }
            ]
          },
          {
            "id": "CM2C_20260325_20260402",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260325_20260402",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260325_20260402",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260325_20260402"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260325_20260402"
              }
            ]
          }
        ]
      },
      {
        "id": "LC",
        "label": "Sainte Lucie",
        "products": [
          {
            "id": "CM2C_20260228_20260307",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260228_20260307",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260228_20260307",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260228_20260307"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260228_20260307"
              }
            ]
          }
        ]
      },
      {
        "id": "BB",
        "label": "Barbade",
        "products": [
          {
            "id": "CM2C_20260228_20260307",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260228_20260307",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260228_20260307",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260228_20260307"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260228_20260307"
              }
            ]
          }
        ]
      },
      {
        "id": "VC",
        "label": "Saint Vincent et les Grenadines",
        "products": [
          {
            "id": "CM2C_20260228_20260307",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260228_20260307",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260228_20260307",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260228_20260307"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260228_20260307"
              }
            ]
          }
        ]
      },
      {
        "id": "DM",
        "label": "Dominique",
        "products": [
          {
            "id": "CM2C_20260307_20260314",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260307_20260314",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260307_20260314",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260307_20260314"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260307_20260314"
              }
            ]
          }
        ]
      },
      {
        "id": "MF",
        "label": "Saint Martin (France)",
        "products": [
          {
            "id": "CM2C_20260314_20260325",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260314_20260325",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260314_20260325",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260314_20260325"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260314_20260325"
              }
            ]
          }
        ]
      },
      {
        "id": "US",
        "label": "Etats-Unis",
        "products": [
          {
            "id": "USCAPO",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/USCAPO",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/USCAPO",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/USCAPO"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/USCAPO"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "product_geographical_area_central_south_america",
    "geographical_area": "Amérique du Sud et Centrale",
    "countries": [
      {
        "id": "BR",
        "label": "Brésil",
        "products": [
          {
            "id": "RDPC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": -22.997029,
              "longitude": -44.097946
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/RDPC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/RDPC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/RDPC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/RDPC"
              }
            ]
          },
          {
            "id": "TRAC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": -16.545206,
              "longitude": -39.08431
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TRAC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TRAC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/TRAC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/TRAC"
              }
            ]
          },
          {
            "id": "LAPC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": -23.594967,
              "longitude": -46.257355
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LAPC",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LAPC",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/LAPC"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/LAPC"
              }
            ]
          },
          {
            "id": "BRESRI",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/BRESRI",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/BRESRI",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/BRESRI"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/BRESRI"
              }
            ]
          },
          {
            "id": "BRESIG",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/BRESIG",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/BRESIG",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/BRESIG"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/BRESIG"
              }
            ]
          },
          {
            "id": "BRETRI",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/BRETRI",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/BRETRI",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/BRETRI"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/BRETRI"
              }
            ]
          }
        ]
      },
      {
        "id": "CR",
        "label": "Costa Rica",
        "products": [
          {
            "id": "CRNATV",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CRNATV",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CRNATV",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CRNATV"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CRNATV"
              }
            ]
          }
        ]
      },
      {
        "id": "CO",
        "label": "Colombie",
        "products": [
          {
            "id": "COHOCO",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/COHOCO",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/COHOCO",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/COHOCO"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/COHOCO"
              }
            ]
          }
        ]
      },
      {
        "id": "CL",
        "label": "Chili",
        "products": [
          {
            "id": "CLPAT2",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CLPAT2",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CLPAT2",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CLPAT2"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CLPAT2"
              }
            ]
          },
          {
            "id": "CLATAI",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CLATAI",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CLATAI",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CLATAI"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CLATAI"
              }
            ]
          }
        ]
      },
      {
        "id": "AR",
        "label": "Argentine",
        "products": [
          {
            "id": "CLPAT2",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CLPAT2",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CLPAT2",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CLPAT2"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CLPAT2"
              }
            ]
          },
          {
            "id": "ARATFE",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ARATFE",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ARATFE",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ARATFE"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ARATFE"
              }
            ]
          }
        ]
      },
      {
        "id": "PE",
        "label": "Pérou",
        "products": [
          {
            "id": "PEMON",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PEMON",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PEMON",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PEMON"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PEMON"
              }
            ]
          }
        ]
      },
      {
        "id": "BO",
        "label": "Bolivie",
        "products": [
          {
            "id": "PEMON",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PEMON",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PEMON",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/PEMON"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/PEMON"
              }
            ]
          }
        ]
      },
      {
        "id": "GT",
        "label": "Guatemala",
        "products": [
          {
            "id": "GTMMAY",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GTMMAY",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GTMMAY",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GTMMAY"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GTMMAY"
              }
            ]
          }
        ]
      },
      {
        "id": "HN",
        "label": "Honduras",
        "products": [
          {
            "id": "GTMMAY",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GTMMAY",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GTMMAY",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/GTMMAY"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/GTMMAY"
              }
            ]
          }
        ]
      },
      {
        "id": "EC",
        "label": "Equateur",
        "products": [
          {
            "id": "ECEGA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ECEGA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ECEGA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ECEGA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ECEGA"
              }
            ]
          }
        ]
      },
      {
        "id": "EC-W",
        "label": "Galapagos",
        "products": [
          {
            "id": "ECEGA",
            "type": "TOUR",
            "coordinates": null,
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ECEGA",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ECEGA",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/ECEGA"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/ECEGA"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "product_geographical_area_atlantic",
    "geographical_area": "Atlantique",
    "countries": [
      {
        "id": "MQ",
        "label": "Martinique",
        "products": [
          {
            "id": "CM2C_20260402_20260416",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260402_20260416",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260402_20260416",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260402_20260416"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260402_20260416"
              }
            ]
          }
        ]
      },
      {
        "id": "LC",
        "label": "Sainte Lucie",
        "products": [
          {
            "id": "CM2C_20260402_20260416",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260402_20260416",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260402_20260416",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260402_20260416"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260402_20260416"
              }
            ]
          }
        ]
      },
      {
        "id": "BB",
        "label": "Barbade",
        "products": [
          {
            "id": "CM2C_20260402_20260416",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260402_20260416",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260402_20260416",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260402_20260416"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260402_20260416"
              }
            ]
          }
        ]
      },
      {
        "id": "ES",
        "label": "Espagne",
        "products": [
          {
            "id": "CM2C_20260402_20260416",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260402_20260416",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260402_20260416",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260402_20260416"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260402_20260416"
              }
            ]
          },
          {
            "id": "CM2C_20260416_20260423",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260416_20260423",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260416_20260423",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260416_20260423"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260416_20260423"
              }
            ]
          }
        ]
      },
      {
        "id": "MA",
        "label": "Maroc",
        "products": [
          {
            "id": "CM2C_20260416_20260423",
            "type": "CRUISE",
            "coordinates": {
              "latitude": 14.603401,
              "longitude": -61.060515
            },
            "_links": [
              {
                "rel": "product",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260416_20260423",
                "deprecated_rel": true
              },
              {
                "rel": "product_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260416_20260423",
                "deprecated_rel": true
              },
              {
                "rel": "products_id_v1",
                "method": "GET",
                "href": "https://api.clubmed.com/v1/products/CM2C_20260416_20260423"
              },
              {
                "rel": "products_id_v2",
                "method": "GET",
                "href": "https://api.clubmed.com/v2/products/CM2C_20260416_20260423"
              }
            ]
          }
        ]
      }
    ]
  }
]

Response headers

 access-control-allow-credentials: true 
 access-control-expose-headers: Content-Range,Link,Accept-Ranges,x-request-id 
 cache-control: max-age=600,must-revalidate 
 connection: keep-alive 
 content-encoding: gzip 
 content-length: 8208 
 content-type: application/json; charset=utf-8 
 date: Thu,26 Feb 2026 14:06:12 GMT 
 last-modified: Thu,26 Feb 2026 07:58:21 GMT 
 server: nginx 
 vary: Accept-Encoding 
 x-request-id: 6141b7a9b879b1221f2349f8d9b6da54 

Responses
Code	Description	Links
200	

ok
Media type
Controls Accept header.

[
  {
    "id": "product_geographical_area_europe_mediterranean_coasts",
    "geographical_area": "Europe & Côtes Méditerranéennes",
    "countries": [
      {
        "id": "FR",
        "label": "France",
        "products": [
          {
            "id": "MPAC",
            "type": "VILLAGE",
            "coordinates": {
              "latitude": 31.661306,
              "longitude": -7.978791
            },
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
      }
    ]
  }
]

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
404	

not_found
Media type

{
  "status_code": 404,
  "error": "not_found",
  "error_description": "reason"
}