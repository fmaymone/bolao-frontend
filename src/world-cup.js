import { ROUND_16, ROUND_8, ROUND_4, ROUND_FINALS, ROUND_3x4, OTHERS } from './store/actions/types';

const data = {
  stadiums: [
    {
      id: 1,
      name: "Luzhniki Stadium",
      city: "Moscow"
    },
    {
      id: 2,
      name: "Otkrytiye Arena",
      city: "Moscow"
    },
    {
      id: 3,
      name: "Krestovsky Stadium",
      city: "Saint Petersburg"
    },
    {
      id: 4,
      name: "Kaliningrad Stadium",
      city: "Kaliningrad"
    },
    {
      id: 5,
      name: "Kazan Arena",
      city: "Kazan"
    },
    {
      id: 6,
      name: "Nizhny Novgorod Stadium",
      city: "Nizhny Novgorod"
    },
    {
      id: 7,
      name: "Cosmos Arena",
      city: "Samara"
    },
    {
      id: 8,
      name: "Volgograd Arena",
      city: "Volgograd"
    },
    {
      id: 9,
      name: "Mordovia Arena",
      city: "Saransk"
    },
    {
      id: 10,
      name: "Rostov Arena",
      city: "Rostov-on-Don"
    },
    {
      id: 11,
      name: "Fisht Olympic Stadium",
      city: "Sochi"
    },
    {
      id: 12,
      name: "Central Stadium",
      city: "Yekaterinburg"
    }
  ],
  tvchannels: [
    {
      id: 1,
      name: "DR1 Danmark",
      icon: ""
    },
    {
      id: 2,
      name: "TV2 Danmark",
      icon: ""
    }
  ],
  teams: [
    {
      id: 1,
      name: "Russia",
      iso2: "ru"
    },
    {
      id: 2,
      name: "Arabia Saudita",
      iso2: "sa"
    },
    {
      id: 3,
      name: "Egito",
      iso2: "eg"
    },
    {
      id: 4,
      name: "Uruguai",
      iso2: "uy"
    },
    {
      id: 5,
      name: "Portugal",
      iso2: "pt"
    },
    {
      id: 6,
      name: "Espanha",
      iso2: "es"
    },
    {
      id: 7,
      name: "Marrocos",
      iso2: "ma"
    },
    {
      id: 8,
      name: "Irã",
      iso2: "ir"
    },
    {
      id: 9,
      name: "França",
      iso2: "fr"
    },
    {
      id: 10,
      name: "Austrália",
      iso2: "au"
    },
    {
      id: 11,
      name: "Peru",
      iso2: "pe"
    },
    {
      id: 12,
      name: "Dinamarca",
      iso2: "dk"
    },
    {
      id: 13,
      name: "Argentina",
      iso2: "ar"
    },
    {
      id: 14,
      name: "Islândia",
      iso2: "is"
    },
    {
      id: 15,
      name: "Croácia",
      iso2: "hr"
    },
    {
      id: 16,
      name: "Nigéria",
      iso2: "ng"
    },
    {
      id: 17,
      name: "Brasil",
      iso2: "br"
    },
    {
      id: 18,
      name: "Suiça",
      iso2: "ch"
    },
    {
      id: 19,
      name: "Costa Rica",
      iso2: "cr"
    },
    {
      id: 20,
      name: "Sérvia",
      iso2: "rs"
    },
    {
      id: 21,
      name: "Alemanha",
      iso2: "de"
    },
    {
      id: 22,
      name: "México",
      iso2: "mx"
    },
    {
      id: 23,
      name: "Suécia",
      iso2: "se"
    },
    {
      id: 24,
      name: "Coréia do Sul",
      iso2: "kr"
    },
    {
      id: 25,
      name: "Bélgica",
      iso2: "be"
    },
    {
      id: 26,
      name: "Panamá",
      iso2: "pa"
    },
    {
      id: 27,
      name: "Tunísia",
      iso2: "tn"
    },
    {
      id: 28,
      name: "Inglaterra",
      iso2: "gb"
    },
    {
      id: 29,
      name: "Polônia",
      iso2: "pl"
    },
    {
      id: 30,
      name: "Senegal",
      iso2: "sn"
    },
    {
      id: 31,
      name: "Colômbia",
      iso2: "co"
    },
    {
      id: 32,
      name: "Japão",
      iso2: "jp"
    }
  ],
  "matches": {

    1:
      {
        "name": 1,
        "type": "group",
        "home_team": 1,
        "away_team": 2,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-14T18:00:00+03:00",
        "stadium": 1,
        "channels": [],
        "finished": false,
        "group": "a"
      },
    2:
      {
        "name": 2,
        "type": "group",
        "home_team": 3,
        "away_team": 4,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-15T17:00:00+05:00",
        "stadium": 12,
        "channels": [],
        "finished": false,
        "group": "a"
      },
    17:
      {
        "name": 17,
        "type": "group",
        "home_team": 1,
        "away_team": 3,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-19T21:00:00+03:00",
        "stadium": 3,
        "channels": [],
        "finished": false,
        "group": "a"
      },
    18:
      {
        "name": 18,
        "type": "group",
        "home_team": 4,
        "away_team": 2,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-20T18:00:00+03:00",
        "stadium": 10,
        "channels": [],
        "finished": false,
        "group": "a"
      },
    33:
      {
        "name": 33,
        "type": "group",
        "home_team": 4,
        "away_team": 1,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-25T18:00:00+04:00",
        "stadium": 7,
        "channels": [],
        "finished": false,
        "group": "a"
      },
    34:
      {
        "name": 34,
        "type": "group",
        "home_team": 2,
        "away_team": 3,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-25T17:00:00+03:00",
        "stadium": 8,
        "channels": [],
        "finished": false,
        "group": "a"
      }
    ,
    3:
      {
        "name": 3,
        "type": "group",
        "home_team": 5,
        "away_team": 6,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-15T21:00:00+03:00",
        "stadium": 11,
        "channels": [],
        "finished": false,
        "group": "b"
      },
    4:
      {
        "name": 4,
        "type": "group",
        "home_team": 7,
        "away_team": 8,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-15T18:00:00+03:00",
        "stadium": 3,
        "channels": [],
        "finished": false,
        "group": "b"
      },
    19:
      {
        "name": 19,
        "type": "group",
        "home_team": 5,
        "away_team": 7,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-20T15:00:00+03:00",
        "stadium": 1,
        "channels": [],
        "finished": false,
        "group": "b"
      },
    20:
      {
        "name": 20,
        "type": "group",
        "home_team": 8,
        "away_team": 6,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-20T21:00:00+03:00",
        "stadium": 5,
        "channels": [],
        "finished": false,
        "group": "b"
      },
    35:
      {
        "name": 35,
        "type": "group",
        "home_team": 8,
        "away_team": 5,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-25T21:00:00+03:00",
        "stadium": 9,
        "channels": [],
        "finished": false,
        "group": "b"
      },
    36:
      {
        "name": 36,
        "type": "group",
        "home_team": 6,
        "away_team": 7,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-25T20:00:00+02:00",
        "stadium": 4,
        "channels": [],
        "finished": false,
        "group": "b"
      }
    , 5:
      {
        "name": 5,
        "type": "group",
        "home_team": 9,
        "away_team": 10,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-16T13:00:00+03:00",
        "stadium": 5,
        "channels": [],
        "finished": false,
        "group": "c"
      },
    6:
      {
        "name": 6,
        "type": "group",
        "home_team": 11,
        "away_team": 12,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-16T19:00:00+03:00",
        "stadium": 9,
        "channels": [],
        "finished": false,
        "group": "c"
      },
    21:
      {
        "name": 21,
        "type": "group",
        "home_team": 9,
        "away_team": 11,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-21T20:00:00+05:00",
        "stadium": 12,
        "channels": [],
        "finished": false,
        "group": "c"
      },
    22:
      {
        "name": 22,
        "type": "group",
        "home_team": 12,
        "away_team": 10,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-21T16:00:00+04:00",
        "stadium": 7,
        "channels": [],
        "finished": false,
        "group": "c"
      },
    37:
      {
        "name": 37,
        "type": "group",
        "home_team": 12,
        "away_team": 9,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-26T17:00:00+03:00",
        "stadium": 1,
        "channels": [],
        "finished": false,
        "group": "c"
      },
    38:
      {
        "name": 38,
        "type": "group",
        "home_team": 10,
        "away_team": 11,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-26T17:00:00+02:00",
        "stadium": 11,
        "channels": [],
        "finished": false,
        "group": "c"
      },

    7:

      {
        "name": 7,
        "type": "group",
        "home_team": 13,
        "away_team": 14,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-16T16:00:00+03:00",
        "stadium": 2,
        "channels": [],
        "finished": false,
        "group": "d"
      },
    8:
      {
        "name": 8,
        "type": "group",
        "home_team": 15,
        "away_team": 16,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-16T21:00:00+02:00",
        "stadium": 4,
        "channels": [],
        "finished": false,
        "group": "d"
      },
    23:
      {
        "name": 23,
        "type": "group",
        "home_team": 13,
        "away_team": 15,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-21T21:00:00+03:00",
        "stadium": 6,
        "channels": [],
        "finished": false,
        "group": "d"
      },
    24:
      {
        "name": 24,
        "type": "group",
        "home_team": 16,
        "away_team": 14,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-22T18:00:00+03:00",
        "stadium": 8,
        "channels": [],
        "finished": false,
        "group": "d"
      },
    39:
      {
        "name": 39,
        "type": "group",
        "home_team": 16,
        "away_team": 13,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-26T21:00:00+03:00",
        "stadium": 3,
        "channels": [],
        "finished": false,
        "group": "d"
      },
    40:
      {
        "name": 40,
        "type": "group",
        "home_team": 14,
        "away_team": 15,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-26T21:00:00+03:00",
        "stadium": 10,
        "channels": [],
        "finished": false,
        "group": "d"
      },
    9:
      {
        "name": 9,
        "type": "group",
        "home_team": 17,
        "away_team": 18,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-17T21:00:00+03:00",
        "stadium": 10,
        "channels": [],
        "finished": false,
        "group": "e"

      },
    10:
      {
        "name": 10,
        "type": "group",
        "home_team": 19,
        "away_team": 20,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-17T16:00:00+04:00",
        "stadium": 7,
        "channels": [],
        "finished": false,
        "group": "e"
      },
    25:
      {
        "name": 25,
        "type": "group",
        "home_team": 17,
        "away_team": 19,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-22T15:00:00+03:00",
        "stadium": 3,
        "channels": [],
        "finished": false,
        "group": "e"
      },
    26:
      {
        "name": 26,
        "type": "group",
        "home_team": 20,
        "away_team": 18,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-22T20:00:00+02:00",
        "stadium": 4,
        "channels": [],
        "finished": false,
        "group": "e"
      },
    41:
      {
        "name": 41,
        "type": "group",
        "home_team": 20,
        "away_team": 17,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-27T21:00:00+03:00",
        "stadium": 2,
        "channels": [],
        "finished": false,
        "group": "e"
      },
    42:
      {
        "name": 42,
        "type": "group",
        "home_team": 18,
        "away_team": 19,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-27T21:00:00+03:00",
        "stadium": 6,
        "channels": [],
        "finished": false,
        "group": "e"
      },
    11:
      {
        "name": 11,
        "type": "group",
        "home_team": 21,
        "away_team": 22,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-17T18:00:00+03:00",
        "stadium": 1,
        "channels": [],
        "finished": false,
        "group": "f"
      },
    12:
      {
        "name": 12,
        "type": "group",
        "home_team": 23,
        "away_team": 24,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-18T15:00:00+03:00",
        "stadium": 6,
        "channels": [],
        "finished": false,
        "group": "f"
      }, 27:
      {
        "name": 27,
        "type": "group",
        "home_team": 21,
        "away_team": 23,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-23T21:00:00+03:00",
        "stadium": 11,
        "channels": [],
        "finished": false,
        "group": "f"
      },
    28:
      {
        "name": 28,
        "type": "group",
        "home_team": 24,
        "away_team": 22,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-23T18:00:00+03:00",
        "stadium": 10,
        "channels": [],
        "finished": false,
        "group": "f"
      }, 43:
      {
        "name": 43,
        "type": "group",
        "home_team": 24,
        "away_team": 21,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-27T17:00:00+03:00",
        "stadium": 5,
        "channels": [],
        "finished": false,
        "group": "f"
      },
    44:
      {
        "name": 44,
        "type": "group",
        "home_team": 22,
        "away_team": 23,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-27T19:00:00+05:00",
        "stadium": 12,
        "channels": [],
        "finished": false,
        "group": "f"
      }
    , 13:
      {
        "name": 13,
        "type": "group",
        "home_team": 25,
        "away_team": 26,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-18T18:00:00+03:00",
        "stadium": 11,
        "channels": [],
        "finished": false,
        "group": "g"
      },
    14:
      {
        "name": 14,
        "type": "group",
        "home_team": 27,
        "away_team": 28,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-18T21:00:00+03:00",
        "stadium": 8,
        "channels": [],
        "finished": false,
        "group": "g"
      },
    29:
      {
        "name": 29,
        "type": "group",
        "home_team": 25,
        "away_team": 27,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-23T15:00:00+03:00",
        "stadium": 2,
        "channels": [],
        "finished": false,
        "group": "g"
      },
    30:
      {
        "name": 30,
        "type": "group",
        "home_team": 28,
        "away_team": 26,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-24T15:00:00+03:00",
        "stadium": 6,
        "channels": [],
        "finished": false,
        "group": "g"
      },
    45:
      {
        "name": 45,
        "type": "group",
        "home_team": 28,
        "away_team": 25,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-28T20:00:00+02:00",
        "stadium": 4,
        "channels": [],
        "finished": false,
        "group": "g"
      },
    46:
      {
        "name": 46,
        "type": "group",
        "home_team": 26,
        "away_team": 27,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-28T21:00:00+03:00",
        "stadium": 9,
        "channels": [],
        "finished": false,
        "group": "g"
      },
    15:
      {
        "name": 15,
        "type": "group",
        "home_team": 29,
        "away_team": 30,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-19T18:00:00+03:00",
        "stadium": 2,
        "channels": [],
        "finished": false,
        "group": "h"
      },
    16:
      {
        "name": 16,
        "type": "group",
        "home_team": 31,
        "away_team": 32,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-19T15:00:00+03:00",
        "stadium": 9,
        "channels": [],
        "finished": false,
        "group": "h"
      }, 31:
      {
        "name": 31,
        "type": "group",
        "home_team": 29,
        "away_team": 31,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-24T20:00:00+05:00",
        "stadium": 5,
        "channels": [],
        "finished": false,
        "group": "h"
      },
    32:
      {
        "name": 32,
        "type": "group",
        "home_team": 32,
        "away_team": 30,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-24T21:00:00+03:00",
        "stadium": 12,
        "channels": [],
        "finished": false,
        "group": "h"
      },
    47:
      {
        "name": 47,
        "type": "group",
        "home_team": 32,
        "away_team": 29,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-28T17:00:00+03:00",
        "stadium": 8,
        "channels": [],
        "finished": false,
        "group": "h"
      },
    48:
      {
        "name": 48,
        "type": "group",
        "home_team": 30,
        "away_team": 31,
        "home_result": 0,
        "away_result": 0,
        "date": "2018-06-28T18:00:00+04:00",
        "stadium": 7,
        "channels": [],
        "finished": false,
        "group": "h"

      }, 49:
      {
        "name": 49,
        "type": "qualified",
        "home_team": "winner_a",
        "away_team": "runner_b",
        "home_result": 0,
        "away_result": 0,
        "home_penalty": 0,
        "away_penalty": 0,
        "winner": 0,
        "date": "2018-06-30T17:00:00+03:00",
        "stadium": 11,
        "channels": [],
        "finished": false,
        "group": "round_16",
        "isKnockout": true
      }, 50:
      {
        "name": 50,
        "type": "qualified",
        "home_team": "winner_c",
        "away_team": "runner_d",
        "home_result": 0,
        "away_result": 0,
        "home_penalty": 0,
        "away_penalty": 0,
        "winner": 0,
        "date": "2018-06-30T21:00:00+03:00",
        "stadium": 5,
        "channels": [],
        "finished": false,
        "group": "round_16",
        "isKnockout": true
      }, 51:
      {
        "name": 51,
        "type": "qualified",
        "home_team": "winner_b",
        "away_team": "runner_a",
        "home_result": 0,
        "away_result": 0,
        "home_penalty": 0,
        "away_penalty": 0,
        "winner": 0,
        "date": "2018-07-01T17:00:00+03:00",
        "stadium": 1,
        "channels": [],
        "finished": false,
        "group": "round_16",
        "isKnockout": true
      },
    52:
      {
        "name": 52,
        "type": "qualified",
        "home_team": "winner_d",
        "away_team": "runner_c",
        "home_result": 0,
        "away_result": 0,
        "home_penalty": 0,
        "away_penalty": 0,
        "winner": 0,
        "date": "2018-07-01T21:00:00+03:00",
        "stadium": 6,
        "channels": [],
        "finished": false,
        "group": "round_16",
        "isKnockout": true
      },
    53:
      {
        "name": 53,
        "type": "qualified",
        "home_team": "winner_e",
        "away_team": "runner_f",
        "home_result": 0,
        "away_result": 0,
        "home_penalty": 0,
        "away_penalty": 0,
        "winner": 0,
        "date": "2018-07-02T18:00:00+04:00",
        "stadium": 7,
        "channels": [],
        "finished": false,
        "group": "round_16",
        "isKnockout": true
      }, 54:
      {
        "name": 54,
        "type": "qualified",
        "home_team": "winner_g",
        "away_team": "runner_h",
        "home_result": 0,
        "away_result": 0,
        "home_penalty": 0,
        "away_penalty": 0,
        "winner": 0,
        "date": "2018-07-02T21:00:00+03:00",
        "stadium": 10,
        "channels": [],
        "finished": false,
        "group": "round_16",
        "isKnockout": true
      }, 55:
      {
        "name": 55,
        "type": "qualified",
        "home_team": "winner_f",
        "away_team": "runner_e",
        "home_result": 0,
        "away_result": 0,
        "home_penalty": 0,
        "away_penalty": 0,
        "winner": 0,
        "date": "2018-07-03T17:00:00+03:00",
        "stadium": 3,
        "channels": [],
        "finished": false,
        "group": "round_16",
        "isKnockout": true
      }, 56:
      {
        "name": 56,
        "type": "qualified",
        "home_team": "winner_h",
        "away_team": "runner_g",
        "home_result": 0,
        "away_result": 0,
        "home_penalty": 0,
        "away_penalty": 0,
        "winner": 0,
        "date": "2018-07-03T21:00:00+03:00",
        "stadium": 2,
        "channels": [],
        "finished": false,
        "group": "round_16",
        "isKnockout": true
      }, 57:
      {
        "name": 57,
        "type": "winner",
        "home_team": 49,
        "away_team": 50,
        "home_result": 0,
        "away_result": 0,
        "home_penalty": 0,
        "away_penalty": 0,
        "winner": 0,
        "date": "2018-07-06T17:00:00+03:00",
        "stadium": 6,
        "channels": [],
        "finished": false,
        "group": "round_8",
        "isKnockout": true
      }, 58:
      {
        "name": 58,
        "type": "winner",
        "home_team": 53,
        "away_team": 54,
        "home_result": 0,
        "away_result": 0,
        "home_penalty": 0,
        "away_penalty": 0,
        "winner": 0,
        "date": "2018-07-06T21:00:00+03:00",
        "stadium": 5,
        "channels": [],
        "finished": false,
        "group": "round_8",
        "isKnockout": true
      }, 59:
      {
        "name": 59,
        "type": "winner",
        "home_team": 51,
        "away_team": 52,
        "home_result": 0,
        "away_result": 0,
        "home_penalty": 0,
        "away_penalty": 0,
        "winner": 0,
        "date": "2018-07-07T21:00:00+03:00",
        "stadium": 11,
        "channels": [],
        "finished": false,
        "group": "round_8",
        "isKnockout": true
      },
    60:
      {
        "name": 60,
        "type": "winner",
        "home_team": 55,
        "away_team": 56,
        "home_result": 0,
        "away_result": 0,
        "home_penalty": 0,
        "away_penalty": 0,
        "winner": 0,
        "date": "2018-07-07T18:00:00+04:00",
        "stadium": 7,
        "channels": [],
        "finished": false,
        "group": "round_8",
        "isKnockout": true
      },
    61:
      {
        "name": 61,
        "type": "winner",
        "home_team": 57,
        "away_team": 58,
        "home_result": 0,
        "away_result": 0,
        "home_penalty": 0,
        "away_penalty": 0,
        "winner": 0,
        "date": "2018-07-10T21:00:00+03:00",
        "stadium": 3,
        "channels": [],
        "finished": false,
        "group": "round_4",
        "isKnockout": true
      },
    62:
      {
        "name": 62,
        "type": "winner",
        "home_team": 59,
        "away_team": 60,
        "home_result": 0,
        "away_result": 0,
        "home_penalty": 0,
        "away_penalty": 0,
        "winner": 0,
        "date": "2018-07-11T21:00:00+03:00",
        "stadium": 1,
        "channels": [],
        "finished": false,
        "group": "round_4",
        "isKnockout": true
      },
    63:
      {
        "name": 63,
        "type": "loser",
        "home_team": 61,
        "away_team": 62,
        "home_result": 0,
        "away_result": 0,
        "home_penalty": 0,
        "away_penalty": 0,
        "winner": 0,
        "date": "2018-07-14T17:00:00+03:00",
        "stadium": 3,
        "channels": [],
        "finished": false,
        "group": "round2_loser",
        "isKnockout": true
      },
    64:
      {
        "name": 64,
        "type": "winner",
        "home_team": 61,
        "away_team": 62,
        "home_result": 0,
        "away_result": 0,
        "home_penalty": 0,
        "away_penalty": 0,
        "winner": 0,
        "date": "2018-07-15T18:00:00+03:00",
        "stadium": 1,
        "channels": [],
        "finished": false,
        "group": "round2_winner",
        "isKnockout": true
      }

  },
  knockout_crossings:{ 
  ROUND_16:
  [
    
      {id:'a', homeTeam: 49, awayTeam: 51},
      {id:'b', homeTeam: 51, awayTeam: 49},
      {id:'c', homeTeam: 50, awayTeam: 52},
      {id:'d', homeTeam: 52, awayTeam: 50},
      {id:'e', homeTeam: 53, awayTeam: 55},
      {id:'f', homeTeam: 55, awayTeam: 53},
      {id:'g', homeTeam: 54, awayTeam: 56},
      {id:'h', homeTeam: 56, awayTeam: 54}  
  ],
  OTHERS:[

    {id:'49', type:'home', classified:'winner', target:'57'},
    {id:'50', type:'away', classified:'winner', target:'57'},
    {id:'51', type:'home', classified:'winner', target:'59'},
    {id:'52', type:'away', classified:'winner', target:'59'},
    {id:'53', type:'home', classified:'winner', target:'58'},
    {id:'54', type:'away', classified:'winner', target:'58'},
    {id:'55', type:'home', classified:'winner', target:'60'},
    {id:'56', type:'away', classified:'winner', target:'60'},
    {id:'57', type:'home', classified:'winner', target:'61'},
    {id:'58', type:'away', classified:'winner', target:'61'},
    {id:'59', type:'home', classified:'winner', target:'62'},
    {id:'60', type:'away', classified:'winner', target:'62'},
    {id:'61', type:'home', classified:'loser', target:'63'},
    {id:'62', type:'away', classified:'loser', target:'63'},
    {id:'61', type:'home', classified:'winner', target:'64'},
    {id:'62', type:'away', classified:'winner', target:'64'},
   ]
}
  

};

export default data;
