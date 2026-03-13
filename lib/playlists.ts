export type Playlist = {
  id: string;
  name: string;
  description: string;
  coverColor: string;
  artists: string[];
  codes?: string[];
  songMetadata?: Record<string, string>;
};

export const PLAYLISTS: Playlist[] = [
  {
    id: "disney",
    name: "Disney Songs",
    description: "Magical soundtracks and classic singalongs from your favorite movies.",
    coverColor: "from-blue-500 to-cyan-400",
    artists: [],
    codes: [
      "14-017-26", // Salem Ilese - Mad At Disney
      "99-979-81", // Mrs. Green Apple - Disney Resort
      "97-154-43", // Miriam Peracchi - A Bela E A Fera
      "97-169-67", // Rogério Flausino - Lembre De Mim
      "96-053-83", // Ed Motta - Tarzan
      "97-155-45", // Ed Motta - Tarzan
      "97-019-27", // Rosana - Oração (Disney)
      "97-019-29", // Daniela Mercury - Se Eu Não Te Encontrasse
    ]
  },
  {
    id: "naruto",
    name: "Naruto Openings",
    description: "Believe it! The most iconic anime openings and endings.",
    coverColor: "from-orange-500 to-amber-600",
    artists: [],
    codes: [
      // Original
      "99-005-09", // OP 1: ROCKS
      "99-878-96", // OP 2: Haruka Kanata (or 98-919-98)
      "99-861-23", // OP 3: Kanashimi (or 98-954-18)
      "99-879-52", // OP 4: GO!!! (or 98-855-58)
      "99-940-25", // OP 5: Seishun 
      "99-974-21", // OP 6: No Boy No Cry
      "98-958-49", // OP 7: Namikaze Satellite
      "99-879-53", // OP 8: Re:member
      "99-891-70", // OP 9: Yura Yura
      
      // Shippuden
      "99-892-66", // Shippuden OP 1: Hero's come back
      "99-868-46", // Shippuden OP 2: Distance
      "99-872-73", // Shippuden OP 3: Blue Bird 
      "99-877-25", // Shippuden OP 4: Closer
      "99-891-86", // Shippuden OP 5: Hotaru no Hikari
      "99-521-92", // Shippuden OP 6: Sign
      "99-887-28", // Shippuden OP 7: Tohmei Datta Sekai
      "99-892-62", // Shippuden OP 8: Diver
      "99-892-78", // Shippuden OP 9: Lovers
      "99-533-36", // Shippuden OP 10: Newsong
      "98-891-70", // Shippuden OP 12: Moshimo (closest we had)
    ],
    songMetadata: {
      "99-005-09": "Opening 1 (Episodes 1-25)",
      "99-878-96": "Opening 2 (Episodes 26-53)",
      "98-919-98": "Opening 2 (Episodes 26-53)", // Alt version
      "99-861-23": "Opening 3 (Episodes 54-77)",
      "98-954-18": "Opening 3 (Episodes 54-77)", // Alt version
      "99-879-52": "Opening 4 (Episodes 78-103)",
      "98-855-58": "Opening 4 (Episodes 78-103)", // Alt version
      "99-940-25": "Opening 5 (Episodes 104-128)",
      "99-974-21": "Opening 6 (Episodes 129-153)",
      "98-958-49": "Opening 7 (Episodes 154-178)",
      "99-879-53": "Opening 8 (Episodes 179-202)",
      "98-940-63": "Opening 8 (Episodes 179-202)", // Alt version
      "99-891-70": "Opening 9 (Episodes 203-220)",
      "98-968-66": "Opening 9 (Episodes 203-220)", // Alt version
      
      "99-892-66": "Shippuden OP 1",
      "98-971-57": "Shippuden OP 1", // Alt version
      "99-868-46": "Shippuden OP 2",
      "98-922-23": "Shippuden OP 2", // Alt version
      "99-872-73": "Shippuden OP 3",
      "98-928-31": "Shippuden OP 3", // Alt version
      "99-877-25": "Shippuden OP 4",
      "98-931-98": "Shippuden OP 4", // Alt version
      "99-891-86": "Shippuden OP 5",
      "98-936-50": "Shippuden OP 5", // Alt version
      "99-521-92": "Shippuden OP 6",
      "98-936-05": "Shippuden OP 6", // Alt version
      "99-887-28": "Shippuden OP 7",
      "98-941-04": "Shippuden OP 7", // Alt version
      "99-892-62": "Shippuden OP 8",
      "98-948-19": "Shippuden OP 8", // Alt version
      "99-892-78": "Shippuden OP 9",
      "98-902-77": "Shippuden OP 9", // Alt version
      "99-533-36": "Shippuden OP 10",
      "98-908-09": "Shippuden OP 10", // Alt version
      "98-891-70": "Shippuden OP 12 (Moshimo)", 
    }
  },
  {
    id: "br-hits",
    name: "Músicas Brasileiras",
    description: "Do axé ao funk, os maiores sucessos do Brasil.",
    coverColor: "from-green-500 to-yellow-500",
    artists: [
      "Anitta",
      "Ludmilla",
      "Ivete Sangalo",
      "Pabllo Vittar",
      "Gloria Groove",
      "Sandy",
      "Ed Motta",
      "Daniela Mercury"
    ],
  },
  {
    id: "k-pop",
    name: "K-Pop",
    description: "Get ready to dance to the biggest global k-pop hits.",
    coverColor: "from-fuchsia-400 to-purple-600",
    artists: [
      "BTS",
      "Blackpink",
      "BlackPink",
      "BLACKPINK (kpop)",
      "Twice",
      "2NE1 (kpop)",
      "(G)I-DLE (kpop)",
      "Red Velvet",
      "EXO",
      "Seventeen"
    ],
  },
  {
    id: "pop-divas",
    name: "Pop Divas",
    description: "The queens of pop, perfect for belting it out.",
    coverColor: "from-pink-500 to-rose-500",
    artists: [
      "Beyonce",
      "Taylor Swift",
      "Lady Gaga",
      "Rihanna",
      "Adele",
      "Katy Perry",
      "Britney Spears",
      "Ariana Grande"
    ],
  },
  {
    id: "rock-classics",
    name: "Rock Classics",
    description: "Bring the house down with these legendary rock anthems.",
    coverColor: "from-amber-600 to-red-700",
    artists: [
      "Linkin Park",
      "System Of A Down",
      "Queen",
      "Guns N' Roses",
      "Nirvana",
      "Bon Jovi",
      "Aerosmith",
      "AC/DC"
    ],
  },
  {
    id: "brasil-sertanejo",
    name: "Sertanejo Universitário",
    description: "O melhor do sertanejo para cantar junto com a galera.",
    coverColor: "from-yellow-400 to-orange-500",
    artists: [
      "Marília Mendonça",
      "Jorge & Mateus",
      "Gusttavo Lima",
      "Henrique & Juliano",
      "Maiara & Maraisa",
      "Zé Neto & Cristiano"
    ],
  },
  {
    id: "br-pagode",
    name: "Pagodinho de Domingo",
    description: "Aquela roda de samba e pagode que não pode faltar.",
    coverColor: "from-emerald-400 to-teal-500",
    artists: [
      "Exaltasamba",
      "Thiaguinho",
      "Raça Negra",
      "Sorriso Maroto",
      "Zeca Pagodinho",
      "Pixote"
    ],
  },
  {
    id: "2000s-nostalgia",
    name: "2000s Nostalgia",
    description: "Throwback hits from the turn of the millennium.",
    coverColor: "from-blue-400 to-indigo-500",
    artists: [
      "Avril Lavigne",
      "Black Eyed Peas",
      "Eminem",
      "50 Cent",
      "Coldplay",
      "Maroon 5",
      "Kelly Clarkson"
    ],
  }
];

export function getPlaylist(id: string): Playlist | undefined {
  return PLAYLISTS.find(p => p.id === id);
}
