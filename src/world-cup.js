import {
  ROUND_16,
  ROUND_8,
  TOP_SCORER,
  ROUND_4,
  ROUND_FINALS,
  ROUND_3x4,
  OTHERS,
  NOT_CHOSEN,
  FINAL_RESULT
} from "./store/actions/types";

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
      name: "Catar",
      iso2: "qa"
    },
    {
      id: 2,
      name: "Equador",
      iso2: "ec"
    },
    {
      id: 3,
      name: "Senegal",
      iso2: "sn"
    },
    {
      id: 4,
      name: "Holanda",
      iso2: "nl"
    },
    {
      id: 5,
      name: "Inglaterra",
      iso2: "gb-eng"
    },
    {
      id: 6,
      name: "Irã",
      iso2: "ir"
    },
    {
      id: 7,
      name: "Estados Unidos",
      iso2: "us"
    },
    {
      id: 8,
      name: "Gales",
      iso2: "gb-wls"
    },
    {
      id: 9,
      name: "Argentina",
      iso2: "ar"
    },
    {
      id: 10,
      name: "Arabia Saudita",
      iso2: "sa"
    },
    {
      id: 11,
      name: "México",
      iso2: "mx"
    },
    {
      id: 12,
      name: "Polônia",
      iso2: "pl"
    },
    {
      id: 13,
      name: "França",
      iso2: "fr"
    },
    {
      id: 14,
      name: "Australia",
      iso2: "au"
    },
    {
      id: 15,
      name: "Dinamarca",
      iso2: "dk"
    },
    {
      id: 16,
      name: "Tunísia",
      iso2: "tn"
    },
    {
      id: 17,
      name: "Espanha",
      iso2: "es"
    },
    {
      id: 18,
      name: "Costa Rica",
      iso2: "cr"
    },
    {
      id: 19,
      name: "Alemanha",
      iso2: "de"
    },
    {
      id: 20,
      name: "Japão",
      iso2: "jp"
    },
    {
      id: 21,
      name: "Bélgica",
      iso2: "be"
    },
    {
      id: 22,
      name: "Canadá",
      iso2: "ca"
    },
    {
      id: 23,
      name: "Marrocos",
      iso2: "ma"
    },
    {
      id: 24,
      name: "Croácia",
      iso2: "hr"
    },
    {
      id: 25,
      name: "Brasil",
      iso2: "br"
    },
    {
      id: 26,
      name: "Sérvia",
      iso2: "rs"
    },
    {
      id: 27,
      name: "Suiça",
      iso2: "ch"
    },
    {
      id: 28,
      name: "Camarões",
      iso2: "cm"
    },
    {
      id: 29,
      name: "Portugal",
      iso2: "pt"
    },
    {
      id: 30,
      name: "Gana",
      iso2: "gh"
    },
    {
      id: 31,
      name: "Uruguai",
      iso2: "uy"
    },
    {
      id: 32,
      name: "Coréia do Sul",
      iso2: "kr"
    }
  ],
  matches: {
    1: {
      name: 1,
      type: "group",
      home_team: 1,
      away_team: 2,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-14T18:00:00+03:00",
      stadium: 1,
      channels: [],
      finished: false,
      group: "a"
    },
    2: {
      name: 2,
      type: "group",
      home_team: 3,
      away_team: 4,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-15T17:00:00+05:00",
      stadium: 12,
      channels: [],
      finished: false,
      group: "a"
    },
    17: {
      name: 17,
      type: "group",
      home_team: 1,
      away_team: 3,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-19T21:00:00+03:00",
      stadium: 3,
      channels: [],
      finished: false,
      group: "a"
    },
    18: {
      name: 18,
      type: "group",
      home_team: 4,
      away_team: 2,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-20T18:00:00+03:00",
      stadium: 10,
      channels: [],
      finished: false,
      group: "a"
    },
    33: {
      name: 33,
      type: "group",
      home_team: 4,
      away_team: 1,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-25T18:00:00+04:00",
      stadium: 7,
      channels: [],
      finished: false,
      group: "a"
    },
    34: {
      name: 34,
      type: "group",
      home_team: 2,
      away_team: 3,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-25T17:00:00+03:00",
      stadium: 8,
      channels: [],
      finished: false,
      group: "a"
    },
    3: {
      name: 3,
      type: "group",
      home_team: 5,
      away_team: 6,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-15T21:00:00+03:00",
      stadium: 11,
      channels: [],
      finished: false,
      group: "b"
    },
    4: {
      name: 4,
      type: "group",
      home_team: 7,
      away_team: 8,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-15T18:00:00+03:00",
      stadium: 3,
      channels: [],
      finished: false,
      group: "b"
    },
    19: {
      name: 19,
      type: "group",
      home_team: 5,
      away_team: 7,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-20T15:00:00+03:00",
      stadium: 1,
      channels: [],
      finished: false,
      group: "b"
    },
    20: {
      name: 20,
      type: "group",
      home_team: 8,
      away_team: 6,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-20T21:00:00+03:00",
      stadium: 5,
      channels: [],
      finished: false,
      group: "b"
    },
    35: {
      name: 35,
      type: "group",
      home_team: 8,
      away_team: 5,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-25T21:00:00+03:00",
      stadium: 9,
      channels: [],
      finished: false,
      group: "b"
    },
    36: {
      name: 36,
      type: "group",
      home_team: 6,
      away_team: 7,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-25T20:00:00+02:00",
      stadium: 4,
      channels: [],
      finished: false,
      group: "b"
    },
    5: {
      name: 5,
      type: "group",
      home_team: 9,
      away_team: 10,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-16T13:00:00+03:00",
      stadium: 5,
      channels: [],
      finished: false,
      group: "c"
    },
    6: {
      name: 6,
      type: "group",
      home_team: 11,
      away_team: 12,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-16T19:00:00+03:00",
      stadium: 9,
      channels: [],
      finished: false,
      group: "c"
    },
    21: {
      name: 21,
      type: "group",
      home_team: 9,
      away_team: 11,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-21T20:00:00+05:00",
      stadium: 12,
      channels: [],
      finished: false,
      group: "c"
    },
    22: {
      name: 22,
      type: "group",
      home_team: 12,
      away_team: 10,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-21T16:00:00+04:00",
      stadium: 7,
      channels: [],
      finished: false,
      group: "c"
    },
    37: {
      name: 37,
      type: "group",
      home_team: 12,
      away_team: 9,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-26T17:00:00+03:00",
      stadium: 1,
      channels: [],
      finished: false,
      group: "c"
    },
    38: {
      name: 38,
      type: "group",
      home_team: 10,
      away_team: 11,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-26T17:00:00+02:00",
      stadium: 11,
      channels: [],
      finished: false,
      group: "c"
    },

    7: {
      name: 7,
      type: "group",
      home_team: 13,
      away_team: 14,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-16T16:00:00+03:00",
      stadium: 2,
      channels: [],
      finished: false,
      group: "d"
    },
    8: {
      name: 8,
      type: "group",
      home_team: 15,
      away_team: 16,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-16T21:00:00+02:00",
      stadium: 4,
      channels: [],
      finished: false,
      group: "d"
    },
    23: {
      name: 23,
      type: "group",
      home_team: 13,
      away_team: 15,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-21T21:00:00+03:00",
      stadium: 6,
      channels: [],
      finished: false,
      group: "d"
    },
    24: {
      name: 24,
      type: "group",
      home_team: 16,
      away_team: 14,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-22T18:00:00+03:00",
      stadium: 8,
      channels: [],
      finished: false,
      group: "d"
    },
    39: {
      name: 39,
      type: "group",
      home_team: 16,
      away_team: 13,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-26T21:00:00+03:00",
      stadium: 3,
      channels: [],
      finished: false,
      group: "d"
    },
    40: {
      name: 40,
      type: "group",
      home_team: 14,
      away_team: 15,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-26T21:00:00+03:00",
      stadium: 10,
      channels: [],
      finished: false,
      group: "d"
    },
    9: {
      name: 9,
      type: "group",
      home_team: 17,
      away_team: 18,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-17T21:00:00+03:00",
      stadium: 10,
      channels: [],
      finished: false,
      group: "e"
    },
    10: {
      name: 10,
      type: "group",
      home_team: 19,
      away_team: 20,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-17T16:00:00+04:00",
      stadium: 7,
      channels: [],
      finished: false,
      group: "e"
    },
    25: {
      name: 25,
      type: "group",
      home_team: 17,
      away_team: 19,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-22T15:00:00+03:00",
      stadium: 3,
      channels: [],
      finished: false,
      group: "e"
    },
    26: {
      name: 26,
      type: "group",
      home_team: 20,
      away_team: 18,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-22T20:00:00+02:00",
      stadium: 4,
      channels: [],
      finished: false,
      group: "e"
    },
    41: {
      name: 41,
      type: "group",
      home_team: 20,
      away_team: 17,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-27T21:00:00+03:00",
      stadium: 2,
      channels: [],
      finished: false,
      group: "e"
    },
    42: {
      name: 42,
      type: "group",
      home_team: 18,
      away_team: 19,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-27T21:00:00+03:00",
      stadium: 6,
      channels: [],
      finished: false,
      group: "e"
    },
    11: {
      name: 11,
      type: "group",
      home_team: 21,
      away_team: 22,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-17T18:00:00+03:00",
      stadium: 1,
      channels: [],
      finished: false,
      group: "f"
    },
    12: {
      name: 12,
      type: "group",
      home_team: 23,
      away_team: 24,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-18T15:00:00+03:00",
      stadium: 6,
      channels: [],
      finished: false,
      group: "f"
    },
    27: {
      name: 27,
      type: "group",
      home_team: 21,
      away_team: 23,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-23T21:00:00+03:00",
      stadium: 11,
      channels: [],
      finished: false,
      group: "f"
    },
    28: {
      name: 28,
      type: "group",
      home_team: 24,
      away_team: 22,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-23T18:00:00+03:00",
      stadium: 10,
      channels: [],
      finished: false,
      group: "f"
    },
    43: {
      name: 43,
      type: "group",
      home_team: 24,
      away_team: 21,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-27T17:00:00+03:00",
      stadium: 5,
      channels: [],
      finished: false,
      group: "f"
    },
    44: {
      name: 44,
      type: "group",
      home_team: 22,
      away_team: 23,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-27T19:00:00+05:00",
      stadium: 12,
      channels: [],
      finished: false,
      group: "f"
    },
    13: {
      name: 13,
      type: "group",
      home_team: 25,
      away_team: 26,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-18T18:00:00+03:00",
      stadium: 11,
      channels: [],
      finished: false,
      group: "g"
    },
    14: {
      name: 14,
      type: "group",
      home_team: 27,
      away_team: 28,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-18T21:00:00+03:00",
      stadium: 8,
      channels: [],
      finished: false,
      group: "g"
    },
    29: {
      name: 29,
      type: "group",
      home_team: 25,
      away_team: 27,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-23T15:00:00+03:00",
      stadium: 2,
      channels: [],
      finished: false,
      group: "g"
    },
    30: {
      name: 30,
      type: "group",
      home_team: 28,
      away_team: 26,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-24T15:00:00+03:00",
      stadium: 6,
      channels: [],
      finished: false,
      group: "g"
    },
    45: {
      name: 45,
      type: "group",
      home_team: 28,
      away_team: 25,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-28T20:00:00+02:00",
      stadium: 4,
      channels: [],
      finished: false,
      group: "g"
    },
    46: {
      name: 46,
      type: "group",
      home_team: 26,
      away_team: 27,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-28T21:00:00+03:00",
      stadium: 9,
      channels: [],
      finished: false,
      group: "g"
    },
    15: {
      name: 15,
      type: "group",
      home_team: 29,
      away_team: 30,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-19T18:00:00+03:00",
      stadium: 2,
      channels: [],
      finished: false,
      group: "h"
    },
    16: {
      name: 16,
      type: "group",
      home_team: 31,
      away_team: 32,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-19T15:00:00+03:00",
      stadium: 9,
      channels: [],
      finished: false,
      group: "h"
    },
    31: {
      name: 31,
      type: "group",
      home_team: 29,
      away_team: 31,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-24T20:00:00+05:00",
      stadium: 5,
      channels: [],
      finished: false,
      group: "h"
    },
    32: {
      name: 32,
      type: "group",
      home_team: 32,
      away_team: 30,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-24T21:00:00+03:00",
      stadium: 12,
      channels: [],
      finished: false,
      group: "h"
    },
    47: {
      name: 47,
      type: "group",
      home_team: 32,
      away_team: 29,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-28T17:00:00+03:00",
      stadium: 8,
      channels: [],
      finished: false,
      group: "h"
    },
    48: {
      name: 48,
      type: "group",
      home_team: 30,
      away_team: 31,
      home_result: ' ',
      away_result: ' ',
      date: "2022-11-28T18:00:00+04:00",
      stadium: 7,
      channels: [],
      finished: false,
      group: "h"
    },
    49: {
      name: 49,
      type: "qualified",
      home_team: NOT_CHOSEN,
      away_team: NOT_CHOSEN,
      home_result: ' ',
      away_result: ' ',
      home_penalty: 0,
      away_penalty: 0,
      winner: 0,
      date: "2022-11-30T17:00:00+03:00",
      stadium: 11,
      channels: [],
      finished: false,
      group: ROUND_16,
      isKnockout: true,
      title: { home: '1A', away: '2B' }
    },
    50: {
      name: 50,
      type: "qualified",
      home_team: NOT_CHOSEN,
      away_team: NOT_CHOSEN,
      home_result: ' ',
      away_result: ' ',
      home_penalty: 0,
      away_penalty: 0,
      winner: 0,
      date: "2022-11-30T21:00:00+03:00",
      stadium: 5,
      channels: [],
      finished: false,
      group: ROUND_16,
      isKnockout: true,
      title: { home: '1C', away: '2D' }
    },
    51: {
      name: 51,
      type: "qualified",
      home_team: NOT_CHOSEN,
      away_team: NOT_CHOSEN,
      home_result: ' ',
      away_result: ' ',
      home_penalty: 0,
      away_penalty: 0,
      winner: 0,
      date: "2022-12-01T17:00:00+03:00",
      stadium: 1,
      channels: [],
      finished: false,
      group: ROUND_16,
      isKnockout: true,
      title: { home: '1B', away: '2A' }
    },
    52: {
      name: 52,
      type: "qualified",
      home_team: NOT_CHOSEN,
      away_team: NOT_CHOSEN,
      home_result: ' ',
      away_result: ' ',
      home_penalty: 0,
      away_penalty: 0,
      winner: 0,
      date: "2022-12-01T21:00:00+03:00",
      stadium: 6,
      channels: [],
      finished: false,
      group: ROUND_16,
      isKnockout: true,
      title: { home: '1D', away: '2C' }
    },
    53: {
      name: 53,
      type: "qualified",
      home_team: NOT_CHOSEN,
      away_team: NOT_CHOSEN,
      home_result: ' ',
      away_result: ' ',
      home_penalty: 0,
      away_penalty: 0,
      winner: 0,
      date: "2022-12-02T18:00:00+04:00",
      stadium: 7,
      channels: [],
      finished: false,
      group: ROUND_16,
      isKnockout: true,
      title: { home: '1E', away: '2F' }
    },
    54: {
      name: 54,
      type: "qualified",
      home_team: NOT_CHOSEN,
      away_team: NOT_CHOSEN,
      home_result: ' ',
      away_result: ' ',
      home_penalty: 0,
      away_penalty: 0,
      winner: 0,
      date: "2022-12-02T21:00:00+03:00",
      stadium: 10,
      channels: [],
      finished: false,
      group: ROUND_16,
      isKnockout: true,
      title: { home: '1G', away: '2H' }
    },
    55: {
      name: 55,
      type: "qualified",
      home_team: NOT_CHOSEN,
      away_team: NOT_CHOSEN,
      home_result: ' ',
      away_result: ' ',
      home_penalty: 0,
      away_penalty: 0,
      winner: 0,
      date: "2022-12-03T17:00:00+03:00",
      stadium: 3,
      channels: [],
      finished: false,
      group: ROUND_16,
      isKnockout: true,
      title: { home: '1F', away: '2E' }
    },
    56: {
      name: 56,
      type: "qualified",
      home_team: NOT_CHOSEN,
      away_team: NOT_CHOSEN,
      home_result: ' ',
      away_result: ' ',
      home_penalty: 0,
      away_penalty: 0,
      winner: 0,
      date: "2022-12-03T21:00:00+03:00",
      stadium: 2,
      channels: [],
      finished: false,
      group: ROUND_16,
      isKnockout: true,
      title: { home: '1H', away: '2G' }
    },
    57: {
      name: 57,
      type: "winner",
      home_team: NOT_CHOSEN,
      away_team: NOT_CHOSEN,
      home_result: ' ',
      away_result: ' ',
      home_penalty: 0,
      away_penalty: 0,
      winner: 0,
      date: "2022-12-06T17:00:00+03:00",
      stadium: 6,
      channels: [],
      finished: false,
      group: ROUND_8,
      isKnockout: true,
      title: { home: 'V49', away: 'V50' }
    },
    58: {
      name: 58,
      type: "winner",
      home_team: NOT_CHOSEN,
      away_team: NOT_CHOSEN,
      home_result: ' ',
      away_result: ' ',
      home_penalty: 0,
      away_penalty: 0,
      winner: 0,
      date: "2022-12-06T21:00:00+03:00",
      stadium: 5,
      channels: [],
      finished: false,
      group: ROUND_8,
      isKnockout: true,
      title: { home: 'V53', away: 'V54' }
    },
    59: {
      name: 59,
      type: "winner",
      home_team: NOT_CHOSEN,
      away_team: NOT_CHOSEN,
      home_result: ' ',
      away_result: ' ',
      home_penalty: 0,
      away_penalty: 0,
      winner: 0,
      date: "2022-12-07T21:00:00+03:00",
      stadium: 11,
      channels: [],
      finished: false,
      group: ROUND_8,
      isKnockout: true,
      title: { home: 'V51', away: 'V52' }
    },
    60: {
      name: 60,
      type: "winner",
      home_team: NOT_CHOSEN,
      away_team: NOT_CHOSEN,
      home_result: ' ',
      away_result: ' ',
      home_penalty: 0,
      away_penalty: 0,
      winner: 0,
      date: "2022-12-07T18:00:00+04:00",
      stadium: 7,
      channels: [],
      finished: false,
      group: ROUND_8,
      isKnockout: true,
      title: { home: 'V55', away: 'V56' }
    },
    61: {
      name: 61,
      type: "winner",
      home_team: NOT_CHOSEN,
      away_team: NOT_CHOSEN,
      home_result: ' ',
      away_result: ' ',
      home_penalty: 0,
      away_penalty: 0,
      winner: 0,
      date: "2022-12-10T21:00:00+03:00",
      stadium: 3,
      channels: [],
      finished: false,
      group: ROUND_4,
      isKnockout: true,
      title: { home: 'V57', away: 'V58' }
    },
    62: {
      name: 62,
      type: "winner",
      home_team: NOT_CHOSEN,
      away_team: NOT_CHOSEN,
      home_result: ' ',
      away_result: ' ',
      home_penalty: 0,
      away_penalty: 0,
      winner: 0,
      date: "2022-12-11T21:00:00+03:00",
      stadium: 1,
      channels: [],
      finished: false,
      group: ROUND_4,
      isKnockout: true,
      title: { home: 'V59', away: 'V60' }
    },
    63: {
      name: 63,
      type: "loser",
      home_team: NOT_CHOSEN,
      away_team: NOT_CHOSEN,
      home_result: ' ',
      away_result: ' ',
      home_penalty: 0,
      away_penalty: 0,
      winner: 0,
      date: "2022-12-14T17:00:00+03:00",
      stadium: 3,
      channels: [],
      finished: false,
      group: ROUND_3x4,
      isKnockout: true,
      title: { home: 'P61', away: 'P62' }
    },
    64: {
      name: 64,
      type: "winner",
      home_team: NOT_CHOSEN,
      away_team: NOT_CHOSEN,
      home_result: ' ',
      away_result: ' ',
      home_penalty: 0,
      away_penalty: 0,
      winner: 0,
      date: "2022-12-15T18:00:00+03:00",
      stadium: 1,
      channels: [],
      finished: false,
      group: ROUND_FINALS,
      isKnockout: true,
      title: { home: 'V61', away: 'V62' }
    },
    'result': {
      first: NOT_CHOSEN,
      second: NOT_CHOSEN,
      third: NOT_CHOSEN,
      fourth: NOT_CHOSEN,
      group: 'result'
    },
    'topscorer': {
      nameOfTopScorer: '',
      goals: 0,
      group: 'topscorer',
      points: 0
    }
  },
  knockout_crossings: {
    ROUND_16: [
      { id: "a", homeTeam: 49, awayTeam: 51 },
      { id: "b", homeTeam: 51, awayTeam: 49 },
      { id: "c", homeTeam: 50, awayTeam: 52 },
      { id: "d", homeTeam: 52, awayTeam: 50 },
      { id: "e", homeTeam: 53, awayTeam: 55 },
      { id: "f", homeTeam: 55, awayTeam: 53 },
      { id: "g", homeTeam: 54, awayTeam: 56 },
      { id: "h", homeTeam: 56, awayTeam: 54 }
    ],
    OTHERS: [
      { id: "49", type: "home", classified: "winner", target: "57" },
      { id: "50", type: "away", classified: "winner", target: "57" },
      { id: "51", type: "home", classified: "winner", target: "59" },
      { id: "52", type: "away", classified: "winner", target: "59" },
      { id: "53", type: "home", classified: "winner", target: "58" },
      { id: "54", type: "away", classified: "winner", target: "58" },
      { id: "55", type: "home", classified: "winner", target: "60" },
      { id: "56", type: "away", classified: "winner", target: "60" },
      { id: "57", type: "home", classified: "winner", target: "61" },
      { id: "58", type: "away", classified: "winner", target: "61" },
      { id: "59", type: "home", classified: "winner", target: "62" },
      { id: "60", type: "away", classified: "winner", target: "62" },
      { id: "61", type: "home", classified: "loser", target: "63" },
      { id: "62", type: "away", classified: "loser", target: "63" },
      { id: "61", type: "home", classified: "winner", target: "64" },
      { id: "62", type: "away", classified: "winner", target: "64" }
    ]
  }
};

export default data;
